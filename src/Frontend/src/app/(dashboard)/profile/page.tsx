import React from "react";
import { UserCircle, ShieldCheck } from "lucide-react";
import { getUserProfile } from "@/lib/profileActions";
import { GeneralInfoForm } from "./GeneralInfoForm";
import { SecurityForm } from "./SecurityForm";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const user = await getUserProfile();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <header className="flex justify-between items-end border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-3xl font-serif font-bold text-[#1A237E] tracking-tight">
            Perfil & Segurança
          </h1>
          <p className="text-gray-500 mt-1">Gerencie suas credenciais de acesso à Caixa-Forte.</p>
        </div>
      </header>

      <section className="bg-white rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden">
        <div className="border-b border-gray-100 p-6 flex flex-col items-center sm:flex-row sm:justify-start gap-6 bg-gray-50/50">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#1A237E] to-[#111756] flex items-center justify-center text-[#FFD700] shadow-inner">
            <UserCircle size={48} />
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold text-[#1A237E]">{user.name}</h2>
            <p className="text-gray-500 flex items-center justify-center sm:justify-start gap-1 mt-1">
              <ShieldCheck size={14} className="text-emerald-500" /> Mestre da Caixa-Forte
            </p>
          </div>
        </div>

        <div className="p-8 space-y-8">
          
          <GeneralInfoForm user={{ name: user.name, email: user.email }} />

          <hr className="border-gray-100" />

          <SecurityForm />

        </div>
      </section>
    </div>
  );
}
