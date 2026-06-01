"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Bitcoin, TrendingUp, Pencil, Trash2, Check, X } from "lucide-react";
import { deleteInvestment, updateInvestment } from "@/lib/actions";
import { isBtcAsset, type Investment } from "@/lib/investments";

export function InvestmentRow({ inv, currentBtcPrice }: { inv: Investment; currentBtcPrice: number }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const purchase_price = inv.purchase_price;
  const isBtc = isBtcAsset(inv.asset);
  const currentPrice = isBtc ? currentBtcPrice : purchase_price;
  const totalValue = inv.amount * currentPrice;
  const hasProfit = currentPrice >= purchase_price;

  async function handleDelete() {
    if (confirm("Tem certeza que deseja excluir este investimento?")) {
      setLoading(true);
      await deleteInvestment(inv.id);
      router.refresh();
      setLoading(false);
    }
  }

  async function handleSave(formData: FormData) {
    setLoading(true);
    await updateInvestment(inv.id, formData);
    setIsEditing(false);
    router.refresh();
    setLoading(false);
  }

  if (isEditing) {
    return (
      <tr className="bg-gray-50 border-y border-gray-200">
        <td colSpan={7} className="p-0">
          <form action={handleSave} className="flex items-center w-full px-6 py-3 gap-4">
            <div className="flex-1">
              <input 
                name="asset" 
                defaultValue={inv.asset} 
                required 
                className="w-full bg-white border border-gray-300 rounded px-2 py-1 text-sm uppercase focus:ring-[#FFD700] focus:border-[#FFD700]"
              />
            </div>
            <div className="flex-1">
              <input 
                type="number" 
                name="amount" 
                step="0.00000001" 
                defaultValue={inv.amount} 
                required 
                className="w-full bg-white border border-gray-300 rounded px-2 py-1 text-sm font-mono focus:ring-[#FFD700] focus:border-[#FFD700]"
              />
            </div>
            <div className="flex-1 relative">
              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">R$</span>
              <input 
                type="number" 
                name="purchase_price" 
                step="0.01" 
                defaultValue={purchase_price} 
                required 
                className="w-full bg-white border border-gray-300 rounded pl-7 pr-2 py-1 text-sm font-mono focus:ring-[#FFD700] focus:border-[#FFD700]"
              />
            </div>
            <div className="flex-1 flex justify-center text-gray-400 text-sm">-</div>
            <div className="flex-1">
              <input 
                type="date" 
                name="date" 
                defaultValue={new Date(inv.date).toISOString().split('T')[0]} 
                required 
                className="w-full bg-white border border-gray-300 rounded px-2 py-1 text-sm focus:ring-[#FFD700] focus:border-[#FFD700]"
              />
            </div>
            <div className="flex-1 flex justify-center text-gray-400 text-sm">-</div>
            <div className="flex items-center gap-2">
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
          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isBtc ? 'bg-orange-50 text-[#F7931A]' : 'bg-blue-50 text-[#1A237E]'}`}>
            {isBtc ? <Bitcoin size={16} /> : <TrendingUp size={16} />}
          </div>
          <span className="font-bold text-[#1A237E] uppercase">{inv.asset}</span>
        </div>
      </td>
      <td className="py-4 px-6 text-gray-700 font-mono">
        {inv.amount}
      </td>
      <td className="py-4 px-6 text-gray-500">
        R$ {Number(purchase_price).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
      </td>
      <td className="py-4 px-6 text-gray-500">
        R$ {Number(currentPrice).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
      </td>
      <td className="py-4 px-6 text-gray-500 text-sm">
        {new Date(inv.date).toLocaleDateString("pt-BR", { timeZone: 'UTC' })}
      </td>
      <td className="py-4 px-6 text-right">
        <div className="flex flex-col items-end">
          <span className="font-bold font-sans tracking-tight text-[#1A237E]">
            R$ {totalValue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </span>
          <span className={`text-xs font-medium mt-1 ${hasProfit ? 'text-emerald-500' : 'text-red-500'}`}>
            {hasProfit ? '+' : ''}{(((currentPrice / purchase_price) - 1) * 100).toFixed(2)}%
          </span>
        </div>
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
