import React from "react";
import Link from "next/link";
import { LoginForm } from "./LoginForm";
import Image from "next/image";
import logo from "../../../assets/img/Tio patinhas.png"; // Importe a imagem usando o caminho correto

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#F2F0E6] flex items-center justify-center p-4 font-sans text-[#111756]">
      <div className="w-full max-w-md bg-[#111756] rounded-xl shadow-2xl p-8 border border-white/10 relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-[#FFD700]/10 blur-3xl rounded-full" />
        
        <div className="text-center mb-10 relative z-10 flex flex-col items-center">
          <Image src={logo} alt="Logo Tio Patinhas" width={200} height={200} />

          <p className="text-white/60 mt-2 text-sm">Controle financeiro seguro</p>
        </div>

        <LoginForm />

        <div className="mt-8 text-center text-sm text-white/50 relative z-10">
          Novo gestor por aqui? <Link href="/register" className="text-[#FFD700] hover:underline font-medium">Forje seu cofre.</Link>
        </div>
      </div>
    </div>
  );
}
