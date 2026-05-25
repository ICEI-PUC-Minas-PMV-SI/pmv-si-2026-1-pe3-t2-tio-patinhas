import React from "react";
import Link from "next/link";
import { RegisterForm } from "./RegisterForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#F2F0E6] flex items-center justify-center p-4 font-sans text-white">
      <div className="w-full max-w-md bg-[#111756] rounded-xl shadow-2xl p-8 border border-white/10 relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-[#FFD700]/10 blur-3xl rounded-full" />
        
        <div className="text-center mb-8 relative z-10">
          <div className="w-16 h-16 bg-gradient-to-br from-[#FFD700] to-[#B8860B] rounded-lg mx-auto flex items-center justify-center mb-4 shadow-lg shadow-[#FFD700]/20">
             <svg 
               xmlns="http://www.w3.org/2000/svg" 
               fill="none" viewBox="0 0 24 24" 
               strokeWidth={2} 
               stroke="#1A237E" 
               className="w-8 h-8"
             >
               <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
             </svg>
          </div>
          <h1 className="text-2xl font-serif font-bold text-white tracking-wide">
            Criar Caixa-Forte
          </h1>
          <p className="text-white/60 mt-1 text-sm">Cadastre-se para assumir o controle</p>
        </div>

        <RegisterForm />

        <div className="mt-8 text-center text-sm text-white/50 relative z-10">
          Já possui um cofre? <Link href="/login" className="text-[#FFD700] hover:underline font-medium">Acesse aqui.</Link>
        </div>
      </div>
    </div>
  );
}
