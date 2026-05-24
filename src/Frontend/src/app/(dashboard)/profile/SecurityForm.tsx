"use client";

import React, { useState, useRef } from "react";
import { KeyRound } from "lucide-react";
import { updatePassword } from "@/lib/profileActions";

export function SecurityForm() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const newPassword = formData.get("newPassword");
    const confirmPassword = formData.get("confirmPassword");

    if (newPassword !== confirmPassword) {
      setError("A nova chave e a confirmação não coincidem.");
      setLoading(false);
      return;
    }

    const result = await updatePassword(formData);

    if (result?.error) {
      setError(result.error);
    } else {
      setSuccess(true);
      formRef.current?.reset();
    }
    setLoading(false);
  }

  return (
    <section className="bg-white rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 p-6">
      <h2 className="text-lg font-bold text-[#1A237E] mb-6 flex items-center gap-2">
        <KeyRound size={18} className="text-gray-400" />
        Alterar Chave Mestra
      </h2>
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 max-w-md">
        {error && <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">{error}</div>}
        {success && <div className="text-emerald-500 text-sm bg-emerald-50 p-3 rounded-lg">Chave de acesso atualizada com sucesso. O novo acesso já está ativo.</div>}
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Chave Mestra Atual</label>
          <input 
            name="currentPassword"
            type="password" 
            required
            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:border-[#1A237E] focus:ring-1 focus:ring-[#1A237E] transition-colors font-mono"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nova Chave Mestra</label>
          <input 
            name="newPassword"
            type="password" 
            required
            minLength={6}
            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:border-[#1A237E] focus:ring-1 focus:ring-[#1A237E] transition-colors font-mono"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Confirmar Nova Chave</label>
          <input 
            name="confirmPassword"
            type="password" 
            required
            minLength={6}
            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:border-[#1A237E] focus:ring-1 focus:ring-[#1A237E] transition-colors font-mono"
          />
        </div>

        <div className="pt-4 flex justify-end">
           <button 
             type="submit" 
             disabled={loading}
             className="bg-[#1A237E] hover:bg-[#111756] text-[#FFD700] font-bold py-2.5 px-6 rounded-lg shadow-md transition-all transform hover:scale-[1.02] flex items-center gap-2 disabled:opacity-50 disabled:transform-none"
           >
              <KeyRound size={18} />
              <span>{loading ? 'Atualizando Segurança...' : 'Atualizar Segurança'}</span>
           </button>
        </div>
      </form>
    </section>
  );
}
