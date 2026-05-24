"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface CategoryData {
  name: string;
  value: number;
}

const COLORS = ['#1A237E', '#FFD700', '#F97316', '#3B82F6', '#10B981', '#8B5CF6', '#EF4444', '#64748B'];

export function ExpenseChart({ data }: { data: CategoryData[] }) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="flex flex-col h-full w-full min-h-[350px]">
      <h2 className="text-xl font-bold text-[#1A237E] font-serif mb-6">Gastos por Categoria</h2>
      
      {data.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-gray-400 min-h-[200px] bg-gray-50/50 rounded-lg border border-dashed border-gray-200">
          Sem despesas registradas
        </div>
      ) : (
        <>
          <div className="flex-1 w-full min-h-[220px] mb-6 relative">
             <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                 <Pie
                   data={data}
                   cx="50%"
                   cy="50%"
                   innerRadius={65}
                   outerRadius={90}
                   paddingAngle={3}
                   dataKey="value"
                   stroke="none"
                   animationDuration={800}
                 >
                   {data.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} className="hover:opacity-80 transition-opacity outline-none" />
                   ))}
                 </Pie>
                 <Tooltip 
                   formatter={(value: any) => `R$ ${Number(value).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`}
                   contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                   itemStyle={{ fontWeight: 600 }}
                 />
               </PieChart>
             </ResponsiveContainer>
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none flex-col">
               <span className="text-xs text-gray-500 font-medium tracking-wider uppercase">Despesas</span>
               <span className="text-lg font-bold text-[#1A237E]">
                 R$ {total >= 1000 ? (total / 1000).toFixed(1) + 'k' : total.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
               </span>
             </div>
          </div>

          <div className="space-y-3 mt-auto flex-1 max-h-[160px] overflow-y-auto pr-2 custom-scrollbar">
            {data.map((item, index) => {
              const percent = total > 0 ? Math.round((item.value / total) * 100) : 0;
              return (
                <div key={item.name} className="flex justify-between items-center text-sm p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-default">
                  <div className="flex items-center gap-3">
                    <div className="w-3.5 h-3.5 rounded-full shadow-sm" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                    <span className="text-gray-700 font-medium truncate max-w-[120px]" title={item.name}>{item.name}</span>
                  </div>
                  <div className="flex items-center justify-end gap-3 flex-1 lg:flex-none">
                    <span className="font-bold text-[#1A237E]">
                      R$ {item.value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </span>
                    <span className="text-gray-500 w-9 text-right text-xs bg-gray-100 py-1 px-1.5 rounded-md font-medium">{percent}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
