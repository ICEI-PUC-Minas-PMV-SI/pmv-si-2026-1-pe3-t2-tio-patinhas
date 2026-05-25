"use client";

import React, { useState } from "react";
import { ArrowUpRight, ArrowDownLeft, Pencil, Trash2, Check, X } from "lucide-react";
import { deleteTransaction, updateTransaction } from "@/lib/actions";

export function TransactionRow({ tx }: { tx: any }) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const isIncome = tx.type === "income";

  async function handleDelete() {
    if (confirm("Tem certeza que deseja excluir esta transação?")) {
      setLoading(true);
      await deleteTransaction(tx.id);
      setLoading(false);
    }
  }

  async function handleSave(formData: FormData) {
    setLoading(true);
    // Add type artificially since it might not be in the form simple view or handle it dynamically
    formData.append("type", tx.type);
    
    await updateTransaction(tx.id, formData);
    setIsEditing(false);
    setLoading(false);
  }

  if (isEditing) {
    return (
      <tr className="bg-gray-50 border-y border-gray-200">
        <td colSpan={5} className="p-0">
          <form action={handleSave} className="flex items-center w-full px-6 py-3 gap-4">
            <div className="flex-[2]">
              <input 
                type="text" 
                name="description" 
                defaultValue={tx.description} 
                required 
                className="w-full bg-white border border-gray-300 rounded px-2 py-1 text-sm focus:ring-[#FFD700] focus:border-[#FFD700]"
              />
            </div>
            <div className="flex-1">
              <input 
                type="text" 
                name="category" 
                defaultValue={tx.category} 
                required 
                className="w-full bg-white border border-gray-300 rounded px-2 py-1 text-sm focus:ring-[#FFD700] focus:border-[#FFD700]"
              />
            </div>
            <div className="flex-1">
              <input 
                type="date" 
                name="date" 
                defaultValue={new Date(tx.date).toISOString().split('T')[0]} 
                required 
                className="w-full bg-white border border-gray-300 rounded px-2 py-1 text-sm focus:ring-[#FFD700] focus:border-[#FFD700]"
              />
            </div>
            <div className="flex-1 relative">
              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">R$</span>
              <input 
                type="number" 
                name="amount" 
                step="0.01" 
                defaultValue={tx.amount} 
                required 
                className="w-full bg-white border border-gray-300 rounded pl-7 pr-2 py-1 text-sm font-mono focus:ring-[#FFD700] focus:border-[#FFD700]"
              />
            </div>
            <div className="flex items-center justify-end gap-2 shrink-0 w-24">
              <button disabled={loading} type="submit" className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded transition-colors disabled:opacity-50">
                <Check size={18} />
              </button>
              <button disabled={loading} type="button" onClick={() => setIsEditing(false)} className="p-1.5 text-gray-500 hover:bg-gray-100 rounded transition-colors disabled:opacity-50">
                <X size={18} />
              </button>
            </div>
          </form>
        </td>
      </tr>
    );
  }

  return (
    <tr className="hover:bg-gray-50/50 transition-colors group">
      <td className="py-4 px-6">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isIncome ? 'bg-emerald-50 text-emerald-500' : 'bg-red-50 text-red-500'}`}>
            {isIncome ? <ArrowUpRight size={16} /> : <ArrowDownLeft size={16} />}
          </div>
          <span className="font-medium text-[#1A237E] line-clamp-1">{tx.description}</span>
        </div>
      </td>
      <td className="py-4 px-6 text-gray-500">{tx.category}</td>
      <td className="py-4 px-6 text-gray-500 text-sm">
        {new Date(tx.date).toLocaleDateString("pt-BR", { timeZone: 'UTC' })}
      </td>
      <td className={`py-4 px-6 text-right font-bold font-sans tracking-tight ${isIncome ? 'text-emerald-500' : 'text-[#1A237E]'}`}>
        {isIncome ? '+' : '-'} R$ {Number(tx.amount).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
      </td>
      <td className="py-4 px-6 text-right">
        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => setIsEditing(true)} className="p-2 text-gray-400 hover:text-[#1A237E] hover:bg-gray-100 rounded-lg transition-colors">
            <Pencil size={16} />
          </button>
          <button disabled={loading} onClick={handleDelete} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}
