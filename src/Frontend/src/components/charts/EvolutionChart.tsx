"use client";

import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface DataItem {
  name: string;
  income: number;
  expense: number;
  balance: number;
}

export function EvolutionChart({ data }: { data: DataItem[] }) {
  const [metric, setMetric] = useState("balance");

  return (
    <div className="h-full w-full min-h-[350px] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-[#1A237E] font-serif">Evolução (6 Meses)</h2>
        <select 
          className="bg-gray-50 border border-gray-200 text-[#1A237E] font-medium rounded-md px-3 py-1.5 text-sm outline-none focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700]/50 transition-all cursor-pointer shadow-sm"
          value={metric}
          onChange={(e) => setMetric(e.target.value)}
        >
          <option value="balance">Patrimônio / Saldo Líquido</option>
          <option value="income">Apenas Receitas</option>
          <option value="expense">Apenas Despesas</option>
        </select>
      </div>
      
      <div className="flex-1 w-full min-h-[300px]">
        {data.length === 0 ? (
          <div className="h-full w-full flex items-center justify-center text-gray-400 bg-gray-50/50 rounded-lg border border-dashed border-gray-200">
            Sem dados suficientes no período
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
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
                formatter={(value: any) => [`R$ ${Number(value).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`, metric === 'balance' ? 'Saldo' : metric === 'income' ? 'Receita' : 'Despesa']}
                labelStyle={{ fontWeight: 'bold', color: '#1A237E', marginBottom: '8px' }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />
              {metric === "balance" && <Line type="monotone" dataKey="balance" name="Saldo Líquido" stroke="#1A237E" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 6, fill: '#1A237E', stroke: '#FFD700', strokeWidth: 2 }} animationDuration={1000} />}
              {metric === "income" && <Line type="monotone" dataKey="income" name="Receitas" stroke="#10B981" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 6, fill: '#10B981', stroke: '#fff', strokeWidth: 2 }} animationDuration={1000} />}
              {metric === "expense" && <Line type="monotone" dataKey="expense" name="Despesas" stroke="#EF4444" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 6, fill: '#EF4444', stroke: '#fff', strokeWidth: 2 }} animationDuration={1000} />}
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
