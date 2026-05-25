import React from "react";
import Link from "next/link";
import { UserCircle, LayoutDashboard, Wallet, Target, Flag } from "lucide-react";
import { getSession } from "@/lib/session";
import { LogoutButton } from "./LogoutButton";
import logo from "../../assets/img/logo02_dark.svg";
import Image from "next/image";
 

export default async function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await getSession();
  return (
    <div className="flex h-screen bg-[#F4F6F9] font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1A237E] text-white flex flex-col shadow-2xl z-10">
        <div className="p-6 flex-row items-center gap-3 border-b border-white/10">
          <Image src={logo} alt="Logo Tio Patinhas" width={200} height={200} />
          <span className="text-center font-serif font-bold text-xs tracking-wide">Transforme centavos em fortunas</span>
        </div>        

        <nav className="flex-1 px-4 py-8 space-y-2">
          <SidebarLink href="/" icon={<LayoutDashboard size={20} />} label="Dashboard" />
          <SidebarLink href="/transactions" icon={<Wallet size={20} />} label="Transações" />
          <SidebarLink href="/investments" icon={<Target size={20} />} label="Investimentos" />
          <SidebarLink href="/goals" icon={<Flag size={20} />} label="Metas" />
        </nav>

        <div className="p-4 border-t border-white/10 space-y-2">
          <SidebarLink href="/profile" icon={<UserCircle size={20} />} label="Perfil" />
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto bg-[#F4F6F9]">
        {children}
      </main>
    </div>
  );
}

function SidebarLink({ href, icon, label }: Readonly<{ href: string; icon: React.ReactNode; label: string }>) {
  return (
    <Link 
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium text-white/80 hover:text-white hover:bg-[#FFD700]/10 border border-transparent hover:border-[#FFD700]/20`}
    >
      <span className="text-[#FFD700]/80 group-hover:text-[#FFD700]">{icon}</span>
      <span>{label}</span>
    </Link>
  );
}
