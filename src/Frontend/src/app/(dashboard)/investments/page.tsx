import React from "react";
import { Bitcoin, Plus } from "lucide-react";
import { getInvestments } from "@/lib/actions";
import { formatBtcAmount, sumBtcAmount } from "@/lib/investments";
import { InvestmentForm } from "./InvestmentForm";
import { InvestmentRow } from "./InvestmentRow";

export const dynamic = "force-dynamic";

export default async function InvestmentsPage() {
  const investments = await getInvestments();

  // Simple hardcoded BTC price for MVP visualization purposes
  const currentBtcPrice = 340000;
  
  const totalBtc = sumBtcAmount(investments);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <header className="flex justify-between items-end border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-3xl font-serif font-bold text-[#1A237E] tracking-tight">
            Investimentos
          </h1>
          <p className="text-gray-500 mt-1">Gestão de patrimônio alocado em ativos.</p>
        </div>
      </header>
      
      <section className="bg-[#1A237E] rounded-xl shadow-xl p-8 text-white relative overflow-hidden">
        {/* Glow */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#FFD700]/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 flex items-center gap-6">
          <div className="w-20 h-20 bg-[#FFD700] text-[#1A237E] rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(255,215,0,0.3)]">
            <Bitcoin size={48} />
          </div>
          <div>
            <h2 className="text-white/80 font-medium text-lg">Saldo em Bitcoin</h2>
            <div className="flex items-baseline gap-4 mt-1">
              <span className="text-5xl font-bold font-sans tracking-tight text-[#FFD700]">{formatBtcAmount(totalBtc)}</span>
              <span className="text-xl font-bold text-[#FFD700]/70">BTC</span>
            </div>
            <p className="text-white/60 mt-2">Valor Estimado: R$ {(totalBtc * currentBtcPrice).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-[#FFD700]/30 p-6">
        <h2 className="text-lg font-bold text-[#1A237E] mb-4 flex items-center gap-2">
          <Plus size={18} className="text-[#FFD700]" />
          Registrar Novo Aporte
        </h2>
        <InvestmentForm />
      </section>

      {/* List Area */}
      <section className="bg-white rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden mt-8">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-sm text-gray-500 font-medium whitespace-nowrap">
              <th className="py-4 px-6">Ativo</th>
              <th className="py-4 px-6">Quantidade</th>
              <th className="py-4 px-6">Preço Pago (Unid.)</th>
              <th className="py-4 px-6">Preço Atual (Aprox.)</th>
              <th className="py-4 px-6">Data</th>
              <th className="py-4 px-6 text-right">Total Atual</th>
              <th className="py-4 px-6 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {investments.length === 0 && (
              <tr>
                <td colSpan={7} className="py-8 text-center text-gray-400">
                  Nenhum investimento registrado. A caixa-forte está aguardando aportes.
                </td>
              </tr>
            )}
            
            {investments.map((inv) => (
              <InvestmentRow key={inv.id} inv={inv} currentBtcPrice={currentBtcPrice} />
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
