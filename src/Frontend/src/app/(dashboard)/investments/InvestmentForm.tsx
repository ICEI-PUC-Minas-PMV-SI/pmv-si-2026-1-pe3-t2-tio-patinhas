"use client";

import React, { useRef, useState } from "react";
import { addInvestment } from "@/lib/actions";
import { Plus } from "lucide-react";

export function InvestmentForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);

    // Se quiser ver os valores, extraia-os do formData aqui:
    const asset = formData.get("asset");
    const amount = formData.get("amount");
    const purchase_price = formData.get("purchase_price");
    const date = formData.get("date");
    console.log("Adicionando:", { asset, amount, purchase_price, date });
    
    await addInvestment(formData);
    formRef.current?.reset();
    setLoading(false);
  }

  return (
    <form ref={formRef} action={handleSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-4">
      <div className="md:col-span-1">
        <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wider">Ativo (Símbolo)</label>
        <input 
          type="text" 
          name="asset" 
          required 
          placeholder="Ex: BTC"
          className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-lg px-4 py-2 outline-none focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700]/50 transition-all uppercase"
        />
      </div>
      
      <div className="md:col-span-1">
        <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wider">Quantidade</label>
        <input 
          type="number" 
          name="amount" 
          step="0.00000001" 
          required 
          placeholder="0.00"
          className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-lg px-4 py-2 outline-none focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700]/50 transition-all font-mono"
        />
      </div>

      <div className="md:col-span-1">
        <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wider">Preço Pago (Por Unid.)</label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">R$</span>
          <input 
            type="number" 
            name="purchase_price" 
            step="0.01" 
            required 
            placeholder="0.00"
            className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-lg pl-10 pr-4 py-2 outline-none focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700]/50 transition-all font-mono"
          />
        </div>
      </div>

      <div className="md:col-span-1">
        <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wider">Data da Compra</label>
        <input 
          type="date" 
          name="date" 
          required 
          defaultValue={new Date().toISOString().split('T')[0]}
          className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-lg px-4 py-2 outline-none focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700]/50 transition-all"
        />
      </div>

      <div className="md:col-span-1 flex items-end">
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-[#1A237E] hover:bg-[#111756] disabled:bg-gray-400 text-[#FFD700] hover:text-[#FFD700] font-bold py-2 px-4 rounded-lg shadow-md transition-colors flex items-center justify-center gap-2 h-[42px]"
        >
          <Plus size={18} />
          {loading ? 'Salvando...' : 'Adicionar'}
        </button>
      </div>
    </form>
  );
}
