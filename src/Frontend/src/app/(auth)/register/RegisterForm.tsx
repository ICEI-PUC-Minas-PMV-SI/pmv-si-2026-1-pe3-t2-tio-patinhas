"use client";

import React, { useState } from "react";
import { registerUser } from "@/lib/authActions";
import { useRouter } from "next/navigation";

export function RegisterForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await registerUser(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } else {
      // Se sucesso, deve ter setado a sessão e pode ir pro dashboard
      router.push("/");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-200 text-sm p-3 rounded-lg text-center">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">Nome Completo</label>
        <input 
          name="name"
          type="text" 
          required
          placeholder="Ex: Tio Patinhas"
          className="w-full bg-[#0a0f40] border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] transition-colors"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">E-mail</label>
        <input 
          name="email"
          type="email" 
          required
          placeholder="seu@email.com"
          className="w-full bg-[#0a0f40] border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] transition-colors"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">Chave Mestra (Senha)</label>
        <input 
          name="password"
          type="password" 
          required
          placeholder="••••••••"
          className="w-full bg-[#0a0f40] border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] transition-colors font-mono"
        />
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="w-full mt-2 bg-gradient-to-r from-[#FFD700] to-[#B8860B] hover:to-[#FFD700] text-[#1A237E] font-bold py-3 px-4 rounded-lg transition-all transform hover:scale-[1.02] shadow-[0_0_15px_rgba(255,215,0,0.3)] disabled:opacity-50 disabled:transform-none"
      >
        {loading ? 'FORJANDO COFRE...' : 'CRIAR MEU COFRE'}
      </button>
    </form>
  );
}
