"use client";

import React, { useMemo, useRef, useState } from "react";
import { addTransaction } from "@/lib/actions";

const DEFAULT_CATEGORIES: { name: string; type: "income" | "expense" }[] = [
  { name: "Receitas Principais", type: "income" },
  { name: "Lucros e Dividendos", type: "income" },
  { name: "Investimentos (Saída)", type: "expense" },
  { name: "Moradia", type: "expense" },
  { name: "Alimentação", type: "expense" },
  { name: "Transporte", type: "expense" },
  { name: "Outros", type: "expense" },
];

export function TransactionForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [type, setType] = useState<"income" | "expense">("expense");

  const options = useMemo(
    () => DEFAULT_CATEGORIES.filter((c) => c.type === type),
    [type]
  );

  const handleSubmit = async (formData: FormData) => {
    await addTransaction(formData);
    formRef.current?.reset();
    setType("expense");
  };

  return (
    <form
      ref={formRef}
      action={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end bg-gray-50/50 p-4 rounded-lg border border-gray-100"
    >
      <div className="md:col-span-1">
        <label className="block text-xs font-bold text-[#1A237E] mb-1">Tipo</label>
        <select
          name="type"
          required
          value={type}
          onChange={(e) => setType(e.target.value as "income" | "expense")}
          className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700]"
        >
          <option value="income">Entrada (+)</option>
          <option value="expense">Saída (-)</option>
        </select>
      </div>

      <div className="md:col-span-1">
        <label className="block text-xs font-bold text-[#1A237E] mb-1">Data</label>
        <input
          type="date"
          name="date"
          required
          defaultValue={new Date().toISOString().split("T")[0]}
          className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700]"
        />
      </div>

      <div className="md:col-span-1">
        <label className="block text-xs font-bold text-[#1A237E] mb-1">Categoria</label>
        <select
          name="category"
          required
          className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700]"
        >
          {options.map((cat) => (
            <option key={cat.name} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="md:col-span-1">
        <label className="block text-xs font-bold text-[#1A237E] mb-1">Valor (R$)</label>
        <input
          type="number"
          name="amount"
          step="0.01"
          min="0.01"
          placeholder="0,00"
          required
          className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] font-mono"
        />
      </div>

      <div className="md:col-span-2 md:col-start-1">
        <label className="block text-xs font-bold text-[#1A237E] mb-1">Descrição</label>
        <input
          type="text"
          name="description"
          placeholder="Descrição da transação..."
          required
          className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700]"
        />
      </div>

      <div className="md:col-span-3">
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#1A237E] to-[#111756] hover:opacity-90 text-[#FFD700] font-bold py-2 px-4 rounded-md transition-all shadow-md mt-2 md:mt-0 text-sm"
        >
          Adicionar Transação
        </button>
      </div>
    </form>
  );
}
