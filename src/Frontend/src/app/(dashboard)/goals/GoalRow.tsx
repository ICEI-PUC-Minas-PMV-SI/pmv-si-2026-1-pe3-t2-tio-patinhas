"use client";

import React, { useTransition, useState, useRef } from "react";
import { Trash2, Pencil, Flag, X, Check } from "lucide-react";
import { deleteGoal, updateGoal } from "@/lib/goalsActions";

export function GoalRow({ goal }: { goal: any }) {
  const [isPending, startTransition] = useTransition();
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const current_amount = Number(goal.currentAmount ?? goal.current_amount ?? 0);
  const target_amount = Number(goal.targetAmount ?? goal.target_amount ?? 0);
  const progress = Math.min((current_amount / target_amount) * 100, 100);

  const handleDelete = () => {
    if (confirm("Deseja realmente remover esta meta?")) {
      startTransition(() => {
        deleteGoal(goal.id);
      });
    }
  };

  const handleUpdate = async (formData: FormData) => {
    startTransition(async () => {
      await updateGoal(goal.id, formData);
      setIsEditing(false);
    });
  };

  if (isEditing) {
    return (
      <div className="bg-white p-6 rounded-xl border border-[#FFD700]/50 shadow-md transition-colors">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-[#1A237E] flex items-center gap-2">
            <Pencil size={18} className="text-[#FFD700]" />
            Editar Meta
          </h3>
          <button
            onClick={() => setIsEditing(false)}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
            title="Cancelar"
          >
            <X size={18} />
          </button>
        </div>
        <form ref={formRef} action={handleUpdate} className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Título</label>
            <input type="text" name="title" defaultValue={goal.title} required className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A237E]" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Valor Atual (R$)</label>
              <input type="number" name="current_amount" step="0.01" defaultValue={current_amount} required className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A237E]" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Valor Alvo (R$)</label>
              <input type="number" name="target_amount" step="0.01" defaultValue={target_amount} required className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A237E]" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Prazo</label>
              <input type="date" name="deadline" defaultValue={goal.deadline.split('T')[0]} required className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A237E]" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Tipo</label>
              <select name="type" defaultValue={goal.type} required className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A237E]">
                <option value="short_term">Curto Prazo</option>
                <option value="long_term">Longo Prazo</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isPending}
              className="bg-[#1A237E] hover:bg-[#111756] text-[#FFD700] hover:text-[#FFD700] font-bold py-2 px-4 rounded-lg transition-colors disabled:opacity-70 flex items-center gap-2 text-sm"
            >
              <Check size={16} />
              {isPending ? "Salvando..." : "Salvar Alterações"}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:border-[#1A237E]/20 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#1A237E]/5 text-[#1A237E] rounded-lg">
            <Flag size={20} />
          </div>
          <div>
            <h3 className="font-bold text-gray-800">{goal.title}</h3>
            <p className="text-sm text-gray-500">
              Prazo: {new Date(goal.deadline).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
            </p>
          </div>
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => setIsEditing(true)}
            disabled={isPending}
            className="p-2 text-gray-400 hover:text-[#1A237E] hover:bg-[#1A237E]/10 rounded-lg transition-colors disabled:opacity-50"
            title="Editar meta"
          >
            <Pencil size={18} />
          </button>
          <button
            onClick={handleDelete}
            disabled={isPending}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
            title="Remover meta"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500 font-medium">Progresso</span>
          <span className="font-bold text-[#1A237E]">
            {progress.toFixed(1)}%
          </span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
          <div 
            className="bg-[#1A237E] h-2.5 rounded-full transition-all duration-500 relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-white/20 w-full h-full" style={{ backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,.15) 50%, rgba(255,255,255,.15) 75%, transparent 75%, transparent)', backgroundSize: '1rem 1rem' }} />
          </div>
        </div>
        <div className="flex justify-between text-sm pt-1">
          <span className="text-gray-600">
            Atual: R$ {current_amount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </span>
          <span className="text-gray-600">
            Alvo: R$ {target_amount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>
    </div>
  );
}
