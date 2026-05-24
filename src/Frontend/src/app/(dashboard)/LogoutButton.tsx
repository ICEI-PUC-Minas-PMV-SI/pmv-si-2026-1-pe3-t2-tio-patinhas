"use client";

import React from "react";
import { LogOut } from "lucide-react";
import { logoutUser } from "@/lib/authActions";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await logoutUser();
    router.push("/login");
  }

  return (
    <button 
      onClick={handleLogout}
      className="flex w-full items-center gap-3 px-4 py-3 text-red-300 hover:bg-black/20 hover:text-red-400 rounded-lg transition-colors font-medium"
    >
      <LogOut size={20} />
      <span>Sair</span>
    </button>
  );
}
