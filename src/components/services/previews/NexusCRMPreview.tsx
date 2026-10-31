import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  TrendingUp, 
  Bell, 
  CheckCircle2
} from 'lucide-react';
import { useIntersectionVisibility } from '../hooks/useIntersectionVisibility';

interface Deal {
  id: string;
  client: string;
  segment: string;
  value: string;
  stage: 'Qualificação' | 'Proposta Enviada' | 'Em Negociação' | 'Fechado Ganho';
  stageColor: string;
}

const INITIAL_DEALS: Deal[] = [
  {
    id: '1',
    client: 'Vanguard Logistics',
    segment: 'Supply Chain Enterprise',
    value: 'R$ 145.000',
    stage: 'Em Negociação',
    stageColor: 'bg-amber-500/20 border-amber-500/40 text-amber-300',
  },
  {
    id: '2',
    client: 'Fintech Aurora',
    segment: 'Banking API',
    value: 'R$ 82.500',
    stage: 'Fechado Ganho',
    stageColor: 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300',
  },
  {
    id: '3',
    client: 'HyperRetail Brasil',
    segment: 'E-commerce Omnichannel',
    value: 'R$ 64.000',
    stage: 'Proposta Enviada',
    stageColor: 'bg-purple-500/20 border-purple-500/40 text-purple-300',
  },
];

export const NexusCRMPreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'deals'>('overview');
  const [deals, setDeals] = useState<Deal[]>(INITIAL_DEALS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [pipelineTotal, setPipelineTotal] = useState('R$ 482.000');
  const [graphDrawn, setGraphDrawn] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isVisible = useIntersectionVisibility(containerRef);

  // Exact 8-Step Sequential Cycle:
  // 1. Dashboard aparece
  // 2. Indicadores são revelados
  // 3. Gráfico é desenhado
  // 4. Uma oportunidade muda de status
  // 5. A tabela é atualizada (+R$ 145k no pipeline)
  // 6. Uma notificação aparece
  // 7. O sistema alterna para a área de oportunidades
  // 8. Retorna à visão geral
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !isVisible || userInteracted) return;

    const timeouts: NodeJS.Timeout[] = [];

    const runCrmSequence = () => {
      // 1 & 2: Start on Overview with initial indicators
      setActiveTab('overview');
      setGraphDrawn(false);
      setToastMessage(null);
      setDeals(INITIAL_DEALS);
      setPipelineTotal('R$ 482.000');

      // 3: Draw graph at 1.2s
      timeouts.push(
        setTimeout(() => {
          setGraphDrawn(true);
        }, 1200)
      );

      // 4 & 5 & 6: Opportunity status changes + notification at 3.0s
      timeouts.push(
        setTimeout(() => {
          setPipelineTotal('R$ 627.000');
          setDeals((prev) =>
            prev.map((d) =>
              d.id === '1'
                ? {
                    ...d,
                    stage: 'Fechado Ganho',
                    stageColor: 'bg-emerald-500/25 border-emerald-500/50 text-emerald-300',
                  }
                : d
            )
          );
          setToastMessage('✓ Oportunidade Atualizada: Vanguard Logistics fechou contrato (+R$ 145.000)');
        }, 3000)
      );

      // 7: Switch to Deals view at 5.2s
      timeouts.push(
        setTimeout(() => {
          setActiveTab('deals');
        }, 5200)
      );

      // 8: Return to Overview at 9.0s
      timeouts.push(
        setTimeout(() => {
          setToastMessage(null);
          setActiveTab('overview');
        }, 9000)
      );
    };

    runCrmSequence();
    const loopInterval = setInterval(runCrmSequence, 12500);

    return () => {
      clearInterval(loopInterval);
      timeouts.forEach(clearTimeout);
    };
  }, [isVisible, userInteracted]);

  const handleAdvanceDeal = (dealId: string) => {
    setUserInteracted(true);
    setDeals((prev) =>
      prev.map((deal) => {
        if (deal.id === dealId) {
          const nextStage: Deal['stage'] = 'Fechado Ganho';
          setToastMessage(`✓ ${deal.client}: Status atualizado manualmente para Fechado Ganho (${deal.value})`);
          setTimeout(() => setToastMessage(null), 3500);
          return {
            ...deal,
            stage: nextStage,
            stageColor: 'bg-emerald-500/25 border-emerald-500/50 text-emerald-300',
          };
        }
        return deal;
      })
    );
  };

  const handleTabChange = (tab: 'overview' | 'deals') => {
    setUserInteracted(true);
    setActiveTab(tab);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[270px] sm:h-[295px] rounded-xl overflow-hidden border border-white/[0.1] bg-[#0A0A10] text-white flex select-none transition-all duration-300 shadow-xl"
      aria-label="Demonstração interativa de Sistema Web: Nexus CRM"
    >
      {/* Compact Sidebar */}
      <aside className="w-11 sm:w-13 bg-[#0E0E16] border-r border-white/[0.08] flex flex-col items-center py-3 justify-between flex-shrink-0 z-10">
        <div className="flex flex-col items-center gap-3.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center font-bold text-xs shadow-md">
            N
          </div>

          <nav className="flex flex-col items-center gap-2.5 pt-2">
            <button
              onClick={() => handleTabChange('overview')}
              className={`w-8 h-8 rounded-md flex items-center justify-center transition-colors cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-purple-500/25 text-purple-300 border border-purple-500/40 shadow-xs'
                  : 'text-white/45 hover:text-white'
              }`}
              title="Visão Geral"
            >
              <LayoutDashboard className="w-4 h-4" />
            </button>

            <button
              onClick={() => handleTabChange('deals')}
              className={`w-8 h-8 rounded-md flex items-center justify-center transition-colors cursor-pointer ${
                activeTab === 'deals'
                  ? 'bg-purple-500/25 text-purple-300 border border-purple-500/40 shadow-xs'
                  : 'text-white/45 hover:text-white'
              }`}
              title="Oportunidades"
            >
              <Briefcase className="w-4 h-4" />
            </button>

            <div className="w-8 h-8 rounded-md flex items-center justify-center text-white/30 cursor-not-allowed">
              <Users className="w-4 h-4" />
            </div>
          </nav>
        </div>

        <div className="w-6 h-6 rounded-full bg-purple-500/30 border border-purple-400/40 text-[10px] font-mono flex items-center justify-center font-bold">
          CX
        </div>
      </aside>

      {/* Main Workspace Area */}
      <main className="flex-1 flex flex-col overflow-hidden p-3.5 sm:p-4.5 justify-between">
        {/* Topbar */}
        <header className="flex items-center justify-between pb-2.5 border-b border-white/[0.08] mb-2">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs sm:text-sm font-bold text-white tracking-wide">
              NEXUS CRM
            </span>

            {/* View Switcher Pills */}
            <div className="flex items-center p-0.5 rounded-lg bg-black/50 border border-white/[0.08]">
              <button
                onClick={() => handleTabChange('overview')}
                className={`px-2.5 py-1 rounded-md text-[10px] font-mono transition-colors cursor-pointer font-semibold ${
                  activeTab === 'overview'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                Visão Geral
              </button>
              <button
                onClick={() => handleTabChange('deals')}
                className={`px-2.5 py-1 rounded-md text-[10px] font-mono transition-colors cursor-pointer font-semibold ${
                  activeTab === 'deals'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                Oportunidades
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[9px] text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded-full border border-emerald-500/30 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Sincronizado
            </span>
            <div className="w-6 h-6 rounded bg-white/[0.05] border border-white/[0.1] flex items-center justify-center text-white/60">
              <Bell className="w-3 h-3" />
            </div>
          </div>
        </header>

        {/* Dynamic Toast Feedback */}
        {toastMessage && (
          <div className="mb-2 p-2 rounded-lg bg-emerald-950/90 border border-emerald-500/50 text-[10px] font-mono text-emerald-200 flex items-center gap-2 animate-fade-in shadow-lg">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            <span className="truncate font-semibold">{toastMessage}</span>
          </div>
        )}

        {/* TAB 1: VISÃO GERAL */}
        {activeTab === 'overview' && (
          <div className="flex-1 flex flex-col justify-between overflow-hidden">
            {/* 3 Metric KPI Cards with High Legibility */}
            <div className="grid grid-cols-3 gap-2.5 mb-2.5">
              <div className="p-2.5 rounded-lg bg-white/[0.035] border border-white/[0.08] flex flex-col justify-between">
                <span className="font-mono text-[9px] text-white/50 uppercase font-semibold">Pipeline Ativo</span>
                <span className="font-mono text-sm sm:text-base font-bold text-white tracking-tight">
                  {pipelineTotal}
                </span>
                <span className="font-mono text-[9px] text-emerald-400 flex items-center gap-1 font-bold">
                  <TrendingUp className="w-2.5 h-2.5" /> +22.4%
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-white/[0.035] border border-white/[0.08] flex flex-col justify-between">
                <span className="font-mono text-[9px] text-white/50 uppercase font-semibold">Taxa Conversão</span>
                <span className="font-mono text-sm sm:text-base font-bold text-purple-300 tracking-tight">28.4%</span>
                <span className="font-mono text-[9px] text-purple-400 font-bold">+3.1% meta</span>
              </div>

              <div className="p-2.5 rounded-lg bg-white/[0.035] border border-white/[0.08] flex flex-col justify-between">
                <span className="font-mono text-[9px] text-white/50 uppercase font-semibold">Ciclo Médio</span>
                <span className="font-mono text-sm sm:text-base font-bold text-cyan-300 tracking-tight">12 dias</span>
                <span className="font-mono text-[9px] text-emerald-400 font-bold">-2.4d SLA</span>
              </div>
            </div>

            {/* Micro Activity Chart & Recent Log */}
            <div className="p-3 rounded-lg bg-black/50 border border-white/[0.08] flex items-center justify-between gap-3">
              <div className="flex-1 flex flex-col gap-1.5">
                <div className="flex items-center justify-between font-mono text-[9px] text-white/50">
                  <span className="font-semibold">VELOCIDADE DO PIPELINE</span>
                  <span className="text-white font-bold">Semana 42</span>
                </div>
                {/* SVG Curve Line Animated */}
                <div className="h-10 w-full relative">
                  <svg className="w-full h-full" viewBox="0 0 200 40" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="crmGrad4" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#A855F7" stopOpacity="0.45" />
                        <stop offset="100%" stopColor="#A855F7" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 0,35 Q 30,28 60,32 T 120,18 T 160,12 T 200,6 L 200,40 L 0,40 Z"
                      fill="url(#crmGrad4)"
                      className="transition-opacity duration-700"
                      style={{ opacity: graphDrawn ? 1 : 0.2 }}
                    />
                    <path
                      d="M 0,35 Q 30,28 60,32 T 120,18 T 160,12 T 200,6"
                      fill="none"
                      stroke="#A855F7"
                      strokeWidth="2.5"
                      strokeDasharray="250"
                      strokeDashoffset={graphDrawn ? '0' : '250'}
                      style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.16,1,0.3,1)' }}
                    />
                  </svg>
                </div>
              </div>

              <div className="border-l border-white/[0.1] pl-3.5 flex flex-col gap-1 text-[9px] font-mono">
                <span className="text-white/50 font-semibold">ÚLTIMO REGISTRO</span>
                <span className="text-white font-bold text-xs truncate max-w-[130px]">Vanguard Logistics</span>
                <span className="text-emerald-400 font-bold">Contrato fechado (+R$ 145k)</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: OPORTUNIDADES / DEALS */}
        {activeTab === 'deals' && (
          <div className="flex-1 flex flex-col justify-between overflow-hidden">
            <div className="flex items-center justify-between pb-2 font-mono text-[9px] text-white/50 border-b border-white/[0.08] font-semibold">
              <span>CLIENTE / SEGMENTO</span>
              <span>VALOR</span>
              <span>ETAPA (CLIQUE P/ AVANÇAR)</span>
            </div>

            <div className="space-y-2 overflow-y-auto pr-1">
              {deals.map((deal) => (
                <div
                  key={deal.id}
                  onClick={() => handleAdvanceDeal(deal.id)}
                  className="p-2 rounded-lg bg-white/[0.035] hover:bg-white/[0.08] border border-white/[0.08] flex items-center justify-between text-[10px] transition-colors cursor-pointer group"
                >
                  <div className="flex flex-col truncate pr-2">
                    <span className="font-bold text-white text-xs group-hover:text-purple-300 transition-colors">
                      {deal.client}
                    </span>
                    <span className="font-mono text-[8px] text-white/50 font-medium">
                      {deal.segment}
                    </span>
                  </div>

                  <span className="font-mono font-bold text-white text-xs px-2">
                    {deal.value}
                  </span>

                  <span
                    className={`font-mono text-[8px] font-bold px-2 py-0.5 rounded border whitespace-nowrap transition-transform group-hover:scale-105 ${deal.stageColor}`}
                  >
                    {deal.stage}
                  </span>
                </div>
              ))}
            </div>

            <span className="font-mono text-[8px] text-white/50 text-center pt-1.5">
              Demonstração: Clique em qualquer oportunidade para simular o fechamento de contrato.
            </span>
          </div>
        )}

        {/* Footer Bar */}
        <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between text-[9px] font-mono text-white/50 font-medium">
          <span>ARQUITETURA DE DADOS SEGURA</span>
          <span className="text-purple-300 font-bold">REACT + NODE ENTERPRISE</span>
        </div>
      </main>
    </div>
  );
};
