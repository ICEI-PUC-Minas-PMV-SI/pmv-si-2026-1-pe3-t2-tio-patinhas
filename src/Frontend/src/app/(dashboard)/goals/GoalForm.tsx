"use client";

import React, { useRef, useTransition } from "react";
import { addGoal } from "@/lib/goalsActions";

export function GoalForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();

  const action = async (formData: FormData) => {
    startTransition(async () => {
      await addGoal(formData);
      formRef.current?.reset();
    });
  };

  return (
    <form ref={formRef} action={action} className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
      <div className="md:col-span-2">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Título da Meta
        </label>
        <input
          type="text"
          id="title"
          name="title"
          required
          placeholder="Ex: Viagem, Carro, Aposentadoria"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A237E] focus:border-transparent"
        />
      </div>

      <div className="md:col-span-1">
        <label htmlFor="target_amount" className="block text-sm font-medium text-gray-700 mb-1">
          Valor Alvo (R$)
        </label>
        <input
          type="number"
          id="target_amount"
          name="target_amount"
          step="0.01"
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A237E] focus:border-transparent"
        />
      </div>

      <div className="md:col-span-1">
        <label htmlFor="current_amount" className="block text-sm font-medium text-gray-700 mb-1">
          Valor Atual (R$)
        </label>
        <input
          type="number"
          id="current_amount"
          name="current_amount"
          step="0.01"
          defaultValue="0"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A237E] focus:border-transparent"
        />
      </div>

      <div className="md:col-span-1">
        <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-1">
          Prazo (Data)
        </label>
        <input
          type="date"
          id="deadline"
          name="deadline"
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A237E] focus:border-transparent"
        />
      </div>

      <div className="md:col-span-1">
        <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
          Tipo
        </label>
        <select
          id="type"
          name="type"
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A237E] focus:border-transparent"
        >
          <option value="short_term">Curto Prazo (Meses)</option>
          <option value="long_term">Longo Prazo (Anos)</option>
        </select>
      </div>

      <div className="md:col-span-6 flex justify-end mt-2">
        <button
          type="submit"
          disabled={isPending}
          className="bg-[#1A237E] hover:bg-[#111756] text-[#FFD700] hover:text-[#FFD700] font-bold py-2 px-6 rounded-lg transition-colors disabled:opacity-70 flex items-center justify-center w-full md:w-auto"
        >
          {isPending ? "Adicionando..." : "Adicionar Meta"}
        </button>
      </div>
    </form>
  );
}
