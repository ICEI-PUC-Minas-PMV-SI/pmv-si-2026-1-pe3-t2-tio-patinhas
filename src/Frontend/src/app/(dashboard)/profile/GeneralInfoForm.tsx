"use client";

import React, { useState } from "react";
import { Save, Mail } from "lucide-react";
import { updateProfile } from "@/lib/profileActions";

export function GeneralInfoForm({ user }: { user: { name: string, email: string } }) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const result = await updateProfile(formData);

    if (result?.error) {
      setError(result.error);
    } else {
      setSuccess(true);
    }
    setLoading(false);
  }

  return (
    <section className="bg-white rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 p-6">
      <h2 className="text-lg font-bold text-[#1A237E] mb-6 flex items-center gap-2">
        <Mail size={18} className="text-gray-400" />
        Informações Gerais
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">{error}</div>}
        {success && <div className="text-emerald-500 text-sm bg-emerald-50 p-3 rounded-lg">Perfil atualizado com sucesso.</div>}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nome de Exibição</label>
          <input 
            name="name"
            type="text" 
            required
            defaultValue={user.name}
            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:border-[#1A237E] focus:ring-1 focus:ring-[#1A237E] transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">E-mail (Recuperação e Login)</label>
          <input 
            name="email"
            type="email" 
            required
            defaultValue={user.email}
            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:border-[#1A237E] focus:ring-1 focus:ring-[#1A237E] transition-colors"
          />
        </div>

        <div className="pt-4 flex justify-end">
           <button 
             type="submit" 
             disabled={loading}
             className="bg-linear-to-r from-[#FFD700] to-[#B8860B] hover:to-[#FFD700] text-[#1A237E] font-bold py-2.5 px-6 rounded-lg transition-transform transform hover:scale-[1.02] flex items-center gap-2 shadow-md disabled:opacity-50 disabled:transform-none"
           >
              <Save size={18} />
              <span>{loading ? 'Salvando...' : 'Salvar Alterações'}</span>
           </button>
        </div>
      </form>
    </section>
  );
}
