import React from "react";
import { Plus, ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { getTransactions } from "@/lib/actions";
import { TransactionForm } from "./TransactionForm";
import { TransactionRow } from "./TransactionRow";

export const dynamic = "force-dynamic";

export default async function TransactionsPage() {
  const transactions = await getTransactions();

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <header className="flex justify-between items-end border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-3xl font-serif font-bold text-[#1A237E] tracking-tight">
            Transações
          </h1>
          <p className="text-gray-500 mt-1">Histórico completo de entradas e saídas.</p>
        </div>
      </header>

      {/* Insert Form Area */}
      <section className="bg-white rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-[#FFD700]/30 p-6">
        <h2 className="text-lg font-bold text-[#1A237E] mb-4 flex items-center gap-2">
          <Plus size={18} className="text-[#FFD700]" />
          Registrar Nova Transação
        </h2>
        <TransactionForm />
      </section>

      {/* List Area */}
      <section className="bg-white rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden mt-8">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-sm text-gray-500 font-medium">
              <th className="py-4 px-6 min-w-[200px]">Descrição</th>
              <th className="py-4 px-6">Categoria</th>
              <th className="py-4 px-6">Data</th>
              <th className="py-4 px-6 text-right">Valor</th>
              <th className="py-4 px-6 text-right w-24">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {transactions.length === 0 && (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-400">
                  Nenhuma transação registrada. O cofre está vazio.
                </td>
              </tr>
            )}
            
            {transactions.map((tx: any) => (
              <TransactionRow key={tx.id} tx={tx} />
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
