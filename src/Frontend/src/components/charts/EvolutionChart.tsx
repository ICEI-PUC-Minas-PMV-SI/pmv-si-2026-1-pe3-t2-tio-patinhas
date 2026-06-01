"use client";

import React, { useMemo, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface DataItem {
  name: string;
  income: number;
  expense: number;
  balance: number;
}

type ChartPoint = DataItem & {
  incomeMonth: number;
  expenseMonth: number;
  monthNet: number;
};

/**
 * Saldo acumulado = patrimônio líquido até aquele mês.
 * Usa totalBalance (liquidez do resumo) para incluir transações fora da janela de 6 meses.
 */
function buildChartData(data: DataItem[], totalBalance?: number): ChartPoint[] {
  const monthNets = data.map((item) => item.income - item.expense);
  const sumInWindow = monthNets.reduce((sum, net) => sum + net, 0);
  let runningBalance =
    totalBalance != null ? totalBalance - sumInWindow : 0;

  let accIncome = 0;
  let accExpense = 0;

  return data.map((item, index) => {
    const monthNet = monthNets[index];
    accIncome += item.income;
    accExpense += item.expense;
    runningBalance += monthNet;

    return {
      name: item.name,
      incomeMonth: item.income,
      expenseMonth: item.expense,
      monthNet,
      income: accIncome,
      expense: accExpense,
      balance: runningBalance,
    };
  });
}

const METRIC_LABELS: Record<string, string> = {
  balance: "Saldo acumulado",
  income: "Receitas acumuladas",
  expense: "Despesas acumuladas",
};

export function EvolutionChart({
  data,
  totalBalance,
}: {
  data: DataItem[];
  /** Liquidez total (summary.balance) para alinhar o saldo acumulado ao resumo */
  totalBalance?: number;
}) {
  const [metric, setMetric] = useState("balance");
  const chartData = useMemo(
    () => buildChartData(data, totalBalance),
    [data, totalBalance]
  );

  return (
    <div className="h-full w-full min-h-[350px] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-[#1A237E] font-serif">Evolução (6 Meses)</h2>
        <select 
          className="bg-gray-50 border border-gray-200 text-[#1A237E] font-medium rounded-md px-3 py-1.5 text-sm outline-none focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700]/50 transition-all cursor-pointer shadow-sm"
          value={metric}
          onChange={(e) => setMetric(e.target.value)}
        >
          <option value="balance">Saldo acumulado (patrimônio)</option>
          <option value="income">Receitas acumuladas</option>
          <option value="expense">Despesas acumuladas</option>
        </select>
      </div>
      
      <div className="flex-1 w-full min-h-[300px]">
        {data.length === 0 ? (
          <div className="h-full w-full flex items-center justify-center text-gray-400 bg-gray-50/50 rounded-lg border border-dashed border-gray-200">
            Sem dados suficientes no período
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                dy={10} 
                tick={{ fill: '#6B7280', fontSize: 12, fontWeight: 500 }} 
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                dx={-10} 
                tick={{ fill: '#6B7280', fontSize: 12, fontWeight: 500 }}
                tickFormatter={(value) => `R$ ${value >= 1000 ? (value / 1000).toFixed(0) + 'k' : value}`}
              />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                formatter={(value: any, _name: any, props: { payload?: ChartPoint }) => {
                  const row = props.payload;
                  const label = METRIC_LABELS[metric] ?? "Valor";
                  const monthNet = row?.monthNet ?? 0;
                  const monthHint =
                    row && metric === "income" && row.incomeMonth > 0
                      ? ` (mês: R$ ${row.incomeMonth.toLocaleString("pt-BR", { minimumFractionDigits: 2 })})`
                      : row && metric === "expense" && row.expenseMonth > 0
                        ? ` (mês: R$ ${row.expenseMonth.toLocaleString("pt-BR", { minimumFractionDigits: 2 })})`
                        : row && metric === "balance" && monthNet !== 0
                          ? ` (mês: R$ ${monthNet.toLocaleString("pt-BR", { minimumFractionDigits: 2 })})`
                          : "";
                  return [
                    `R$ ${Number(value).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}${monthHint}`,
                    label,
                  ];
                }}
                labelStyle={{ fontWeight: 'bold', color: '#1A237E', marginBottom: '8px' }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />
              {metric === "balance" && <Line type="monotone" dataKey="balance" name="Saldo acumulado" stroke="#1A237E" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 6, fill: '#1A237E', stroke: '#FFD700', strokeWidth: 2 }} animationDuration={1000} />}
              {metric === "income" && <Line type="monotone" dataKey="income" name="Receitas acumuladas" stroke="#10B981" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 6, fill: '#10B981', stroke: '#fff', strokeWidth: 2 }} animationDuration={1000} />}
              {metric === "expense" && <Line type="monotone" dataKey="expense" name="Despesas acumuladas" stroke="#EF4444" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 6, fill: '#EF4444', stroke: '#fff', strokeWidth: 2 }} animationDuration={1000} />}
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
