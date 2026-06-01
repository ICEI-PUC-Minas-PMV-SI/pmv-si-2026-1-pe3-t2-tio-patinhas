import React from "react";
import { ArrowUpRight, TrendingUp, Bitcoin, WalletCards } from "lucide-react";
import Link from "next/link";
import { getBalanceSummary, getCategoryExpenses, getMonthlyEvolution, getInvestments } from "@/lib/actions";
import { formatBtcAmount, sumBtcAmount } from "@/lib/investments";
import { getGoals } from "@/lib/goalsActions";
import { EvolutionChart } from "@/components/charts/EvolutionChart";
import { ExpenseChart } from "@/components/charts/ExpenseChart";
import { Flag } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const { income, expense, balance } = await getBalanceSummary();
  const categoryData = await getCategoryExpenses();
  const evolutionData = await getMonthlyEvolution();
  const investments = await getInvestments();
  const goals = await getGoals();

  // Simple hardcoded BTC price for MVP visualization purposes
  const currentBtcPrice = 340000;
  
  const totalBtc = sumBtcAmount(investments);

  const totalBtcValue = totalBtc * currentBtcPrice;
  const totalPatrimony = balance + totalBtcValue;

  const formattedTotalPatrimony = `R$ ${totalPatrimony.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;
  const formattedIncome = `R$ ${income.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;
  const formattedExpense = `R$ ${expense.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-serif font-bold text-[#1A237E] tracking-tight">
            Resumo do Patrimônio
          </h1>
          <p className="text-gray-500 mt-1">Bem-vindo à sua Caixa-Forte.</p>
        </div>
        <Link href="/transactions">
          <button className="bg-[#1A237E] hover:bg-[#111756] text-[#FFD700] hover:text-[#FFD700] font-bold py-2 px-6 rounded-lg shadow-md transition-colors flex items-center gap-2">
            <span>+ Nova Transação</span>
          </button>
        </Link>
      </header>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Nível da Caixa-Forte" 
          value={formattedTotalPatrimony} 
          subtitle={`Liquidez: R$ ${balance.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`}
          icon={<WalletCards className="text-[#FFD700]" size={24} />}
          primary
        />
        <StatCard 
          title="Patrimônio Bitcoin" 
          value={`${formatBtcAmount(totalBtc)} BTC`} 
          subtitle={`Aprox: R$ ${totalBtcValue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`} 
          icon={<Bitcoin className="text-[#F7931A]" size={24} />}
        />
        <StatCard 
          title="Receitas Totais" 
          value={formattedIncome} 
          trend="" 
          icon={<ArrowUpRight className="text-green-500" size={24} />}
        />
        <StatCard 
          title="Despesas Totais" 
          value={formattedExpense} 
          trend="" 
          icon={<TrendingUp className="text-red-500" size={24} />}
        />
      </section>

      {/* Content Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gráfico principal ocupar 2 colunas */}
        <div className="bg-white rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 p-6 lg:col-span-2 min-h-[400px]">
           <EvolutionChart data={evolutionData} totalBalance={balance} />
        </div>

        {/* Gráfico secundário 1 coluna */}
        <div className="bg-white rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 p-6 min-h-[400px] flex flex-col">
           <ExpenseChart data={categoryData} />
        </div>
      </section>

      {/* Goals Summary Grid */}
      <section className="bg-white rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-[#1A237E] flex items-center gap-2">
            <Flag className="text-[#FFD700]" size={20} />
            Metas em Andamento
          </h2>
          <Link href="/goals" className="text-sm font-medium text-[#1A237E] hover:underline">
            Ver todas
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {goals.slice(0, 4).map((goal: any) => {
            const current_amount = Number(goal.currentAmount ?? goal.current_amount ?? 0);
            const target_amount = Number(goal.targetAmount ?? goal.target_amount ?? 0);
            const progress = Math.min((current_amount / target_amount) * 100, 100);
            return (
              <div key={goal.id} className="border border-gray-100 rounded-lg p-4 hover:border-[#FFD700]/50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-gray-800">{goal.title}</h3>
                  <span className="text-xs px-2 py-1 bg-gray-100 rounded-md text-gray-500 font-medium">
                    {goal.type === 'short_term' ? 'Curto Prazo' : 'Longo Prazo'}
                  </span>
                </div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500">Progresso</span>
                  <span className="font-bold text-[#1A237E]">{progress.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                  <div 
                    className="bg-[#1A237E] h-2 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>R$ {current_amount.toLocaleString("pt-BR")}</span>
                  <span>Alvo: R$ {target_amount.toLocaleString("pt-BR")}</span>
                </div>
              </div>
            );
          })}
          {goals.length === 0 && (
            <p className="text-gray-500 text-sm">Nenhuma meta definida. Comece a planejar seu futuro!</p>
          )}
        </div>
      </section>
    </div>
  );
}

function StatCard({ 
  title, 
  value, 
  subtitle, 
  trend, 
  icon,
  primary = false
}: { 
  title: string, 
  value: string, 
  subtitle?: string, 
  trend?: string, 
  icon: React.ReactNode,
  primary?: boolean 
}) {
  return (
    <div className={`${primary ? 'bg-[#1A237E] text-white' : 'bg-white text-gray-800'} rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border ${primary ? 'border-[#111756]' : 'border-gray-100'} p-6 relative overflow-hidden group`}>
      {primary && (
        <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors" />
      )}
      <div className="flex justify-between items-start mb-4 relative z-10">
        <h3 className={`font-medium ${primary ? 'text-white/80' : 'text-gray-500'}`}>{title}</h3>
        <div className={`p-2 rounded-lg ${primary ? 'bg-white/10' : 'bg-gray-50'}`}>
          {icon}
        </div>
      </div>
      <div className="relative z-10">
        <p className={`text-3xl font-bold font-sans tracking-tight ${primary ? 'text-[#FFD700]' : 'text-[#1A237E]'}`}>
          {value}
        </p>
        {trend && (
          <p className={`text-sm mt-2 font-medium ${trend.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>
            {trend}
          </p>
        )}
        {subtitle && (
          <p className={`text-sm mt-2 ${primary ? 'text-white/60' : 'text-gray-400'}`}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

function CategoryRow({ color, name, value, percent }: { color: string, name: string, value: string, percent: string }) {
  return (
    <div className="flex justify-between items-center text-sm">
      <div className="flex items-center gap-2">
        <div className={`w-3 h-3 rounded-full ${color}`} />
        <span className="text-gray-600 font-medium">{name}</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="font-bold text-[#1A237E]">{value}</span>
        <span className="text-gray-400 w-8 text-right">{percent}</span>
      </div>
    </div>
  );
}
