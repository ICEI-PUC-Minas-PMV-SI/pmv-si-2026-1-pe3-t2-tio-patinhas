import React from "react";
import { Plus, Flag, Target } from "lucide-react";
import { getGoals } from "@/lib/goalsActions";
import { GoalForm } from "./GoalForm";
import { GoalRow } from "./GoalRow";

export const dynamic = "force-dynamic";

export default async function GoalsPage() {
  const goals = await getGoals();

  const shortTermGoals = goals.filter(g => g.type === 'short_term');
  const longTermGoals = goals.filter(g => g.type === 'long_term');

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <header className="flex justify-between items-end border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-3xl font-serif font-bold text-[#1A237E] tracking-tight">
            Metas
          </h1>
          <p className="text-gray-500 mt-1">Acompanhe seus objetivos de curto e longo prazo.</p>
        </div>
      </header>

      {/* Insert Form Area */}
      <section className="bg-white rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-[#FFD700]/30 p-6">
        <h2 className="text-lg font-bold text-[#1A237E] mb-4 flex items-center gap-2">
          <Plus size={18} className="text-[#FFD700]" />
          Criar Nova Meta
        </h2>
        <GoalForm />
      </section>

      {/* Metas Curto Prazo */}
      <section>
        <h2 className="text-xl font-bold text-[#1A237E] mb-4 flex items-center gap-2">
          <Target size={20} className="text-[#FFD700]" />
          Metas de Curto Prazo <span className="text-sm font-normal text-gray-400">(Meses)</span>
        </h2>
        
        {shortTermGoals.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center text-gray-500 border border-gray-100">
            Nenhuma meta de curto prazo definida.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shortTermGoals.map((goal: any) => (
              <GoalRow key={goal.id} goal={goal} />
            ))}
          </div>
        )}
      </section>

      {/* Metas Longo Prazo */}
      <section>
        <h2 className="text-xl font-bold text-[#1A237E] mb-4 flex items-center gap-2">
          <Flag size={20} className="text-[#FFD700]" />
          Metas de Longo Prazo <span className="text-sm font-normal text-gray-400">(Anos)</span>
        </h2>
        
        {longTermGoals.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center text-gray-500 border border-gray-100">
            Nenhuma meta de longo prazo definida.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {longTermGoals.map((goal: any) => (
              <GoalRow key={goal.id} goal={goal} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
