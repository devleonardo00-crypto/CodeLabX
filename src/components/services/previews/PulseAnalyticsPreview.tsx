import React, { useState, useEffect, useRef } from 'react';
import { 
  Activity, 
  Shield, 
  TrendingUp, 
  ArrowUpRight 
} from 'lucide-react';
import { useIntersectionVisibility } from '../hooks/useIntersectionVisibility';

type Period = '7d' | '30d' | '90d';

interface AnalyticsData {
  periodLabel: string;
  mrr: string;
  mrrDelta: string;
  activeUsers: string;
  usersDelta: string;
  retention: string;
  reportSummary: string;
  chartPath: string;
  chartArea: string;
  points: { x: number; y: number; val: string }[];
}

const DATA_BY_PERIOD: Record<Period, AnalyticsData> = {
  '7d': {
    periodLabel: 'Últimos 7 dias',
    mrr: 'R$ 142.500',
    mrrDelta: '+4.8% vs semana anterior',
    activeUsers: '18.420',
    usersDelta: '+1.240 novos',
    retention: '94.8%',
    reportSummary: 'Crescimento semanal estável com pico de ativação na sexta-feira.',
    chartPath: 'M 10,48 Q 40,40 70,44 T 130,24 T 180,18 T 240,10',
    chartArea: 'M 10,48 Q 40,40 70,44 T 130,24 T 180,18 T 240,10 L 240,58 L 10,58 Z',
    points: [
      { x: 10, y: 48, val: 'Seg: R$ 136k' },
      { x: 70, y: 44, val: 'Qua: R$ 138k' },
      { x: 130, y: 24, val: 'Sex: R$ 140k' },
      { x: 240, y: 10, val: 'Dom: R$ 142.5k' },
    ],
  },
  '30d': {
    periodLabel: 'Últimos 30 dias',
    mrr: 'R$ 184.200',
    mrrDelta: '+12.6% vs mês anterior',
    activeUsers: '42.150',
    usersDelta: '+4.890 novos',
    retention: '96.2%',
    reportSummary: 'Aceleração consistente de MRR e expansão de contas Pro/Enterprise.',
    chartPath: 'M 10,52 Q 50,46 90,34 T 150,28 T 200,16 T 240,6',
    chartArea: 'M 10,52 Q 50,46 90,34 T 150,28 T 200,16 T 240,6 L 240,58 L 10,58 Z',
    points: [
      { x: 10, y: 52, val: 'Semana 1: R$ 162k' },
      { x: 90, y: 34, val: 'Semana 2: R$ 171k' },
      { x: 150, y: 28, val: 'Semana 3: R$ 178k' },
      { x: 240, y: 6, val: 'Semana 4: R$ 184.2k' },
    ],
  },
  '90d': {
    periodLabel: 'Últimos 90 dias',
    mrr: 'R$ 268.000',
    mrrDelta: '+34.2% vs trimestre anterior',
    activeUsers: '89.600',
    usersDelta: '+14.200 novos',
    retention: '97.5%',
    reportSummary: 'Visão executiva: Meta trimestral batida com 118% de atingimento.',
    chartPath: 'M 10,54 Q 60,50 100,30 T 160,20 T 210,10 T 240,3',
    chartArea: 'M 10,54 Q 60,50 100,30 T 160,20 T 210,10 T 240,3 L 240,58 L 10,58 Z',
    points: [
      { x: 10, y: 54, val: 'Mês 1: R$ 198k' },
      { x: 100, y: 30, val: 'Mês 2: R$ 230k' },
      { x: 160, y: 20, val: 'Mês 3: R$ 254k' },
      { x: 240, y: 3, val: 'Fechamento: R$ 268k' },
    ],
  },
};

export const PulseAnalyticsPreview: React.FC = () => {
  const [period, setPeriod] = useState<Period>('7d');
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [chartDrawn, setChartDrawn] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isVisible = useIntersectionVisibility(containerRef);

  // Exact 9-Step Sequential SaaS Experience:
  // 1. Painéis entram progressivamente
  // 2. O gráfico principal é desenhado
  // 3. Indicadores aparecem (7d)
  // 4. O período muda para 30 dias
  // 5. O gráfico apresenta transição suave
  // 6. Os indicadores são atualizados
  // 7. O período muda para 90 dias
  // 8. A interface apresenta visão de relatórios executivos
  // 9. Retorna à visão inicial (7d)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !isVisible || userInteracted) return;

    const timeouts: NodeJS.Timeout[] = [];

    const runPulseSequence = () => {
      // 1, 2, 3: Start at 7d and draw graph
      setPeriod('7d');
      setChartDrawn(false);

      timeouts.push(
        setTimeout(() => {
          setChartDrawn(true);
        }, 800)
      );

      // 4, 5, 6: Transition to 30d at 3.5s
      timeouts.push(
        setTimeout(() => {
          setPeriod('30d');
        }, 3500)
      );

      // 7, 8: Transition to 90d (relatório executivo) at 7.2s
      timeouts.push(
        setTimeout(() => {
          setPeriod('90d');
        }, 7200)
      );

      // 9: Return to 7d at 11.0s
      timeouts.push(
        setTimeout(() => {
          setPeriod('7d');
        }, 11000)
      );
    };

    runPulseSequence();
    const cycleInterval = setInterval(runPulseSequence, 12500);

    return () => {
      clearInterval(cycleInterval);
      timeouts.forEach(clearTimeout);
    };
  }, [isVisible, userInteracted]);

  const handlePeriodChange = (p: Period) => {
    setUserInteracted(true);
    setPeriod(p);
  };

  const currentData = DATA_BY_PERIOD[period];

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[270px] sm:h-[295px] rounded-xl overflow-hidden border border-white/[0.1] bg-[#070710] text-white flex flex-col justify-between p-4 sm:p-5 select-none transition-all duration-300 shadow-xl"
      aria-label="Demonstração interativa de Plataforma SaaS: Pulse Analytics"
    >
      {/* Top Header Bar & Workspace Status */}
      <div className="flex items-center justify-between pb-2.5 border-b border-white/[0.08] z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-md">
            <Activity className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-mono text-xs sm:text-sm font-bold text-white tracking-wider">
            PULSE
          </span>
          <span className="font-mono text-[9px] text-purple-300 bg-purple-500/15 px-2 py-0.5 rounded border border-purple-500/30 font-bold">
            ENTERPRISE PRO
          </span>
        </div>

        {/* Period Selector Buttons (Interactive) */}
        <div className="flex items-center p-0.5 rounded-lg bg-black/60 border border-white/[0.1]">
          {(['7d', '30d', '90d'] as Period[]).map((p) => (
            <button
              key={p}
              onClick={() => handlePeriodChange(p)}
              className={`px-2.5 py-1 rounded-md text-[9px] font-mono transition-all cursor-pointer font-semibold ${
                period === p
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              {p === '7d' ? '7 dias' : p === '30d' ? '30 dias' : '90 dias'}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Stats Grid with High Legibility */}
      <div className="grid grid-cols-3 gap-2.5 my-1.5 z-10">
        <div className="p-2.5 rounded-lg bg-white/[0.035] border border-white/[0.08] flex flex-col justify-between">
          <span className="font-mono text-[9px] text-white/50 uppercase font-semibold">MRR Recorrente</span>
          <span className="font-mono text-sm sm:text-base font-bold text-white tracking-tight">
            {currentData.mrr}
          </span>
          <span className="font-mono text-[8px] text-emerald-400 font-bold flex items-center gap-0.5">
            <TrendingUp className="w-2.5 h-2.5" />
            {currentData.mrrDelta}
          </span>
        </div>

        <div className="p-2.5 rounded-lg bg-white/[0.035] border border-white/[0.08] flex flex-col justify-between">
          <span className="font-mono text-[9px] text-white/50 uppercase font-semibold">Usuários Ativos</span>
          <span className="font-mono text-sm sm:text-base font-bold text-indigo-300 tracking-tight">
            {currentData.activeUsers}
          </span>
          <span className="font-mono text-[8px] text-indigo-400 font-bold">
            {currentData.usersDelta}
          </span>
        </div>

        <div className="p-2.5 rounded-lg bg-white/[0.035] border border-white/[0.08] flex flex-col justify-between">
          <span className="font-mono text-[9px] text-white/50 uppercase font-semibold">Taxa Retenção</span>
          <span className="font-mono text-sm sm:text-base font-bold text-cyan-300 tracking-tight">
            {currentData.retention}
          </span>
          <span className="font-mono text-[8px] text-cyan-400 font-bold">
            Churn &lt; 0.8% SLA
          </span>
        </div>
      </div>

      {/* Interactive SVG Area Chart with Tooltips */}
      <div className="relative p-3 rounded-lg bg-black/50 border border-white/[0.08] flex flex-col justify-between z-10">
        <div className="flex items-center justify-between mb-1.5 font-mono text-[9px] text-white/50">
          <span className="flex items-center gap-1.5 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            EVOLUÇÃO DA RECEITA ({currentData.periodLabel})
          </span>
          <span className="text-white font-bold">
            {activeTooltip || currentData.reportSummary}
          </span>
        </div>

        {/* Chart Canvas */}
        <div className="h-14 w-full relative">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 250 60" preserveAspectRatio="none">
            <defs>
              <linearGradient id="saasAreaGrad5" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Gradient Fill Area */}
            <path
              d={currentData.chartArea}
              fill="url(#saasAreaGrad5)"
              className="transition-all duration-700 ease-out"
              style={{ opacity: chartDrawn ? 1 : 0.2 }}
            />

            {/* Stroke Line */}
            <path
              d={currentData.chartPath}
              fill="none"
              stroke="#A855F7"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="transition-all duration-700 ease-out"
            />

            {/* Interactive Points with Tooltips */}
            {currentData.points.map((pt, i) => (
              <circle
                key={i}
                cx={pt.x}
                cy={pt.y}
                r={activeTooltip === pt.val ? 5.5 : 3.5}
                fill="#FFFFFF"
                stroke="#8B5CF6"
                strokeWidth="2.5"
                className="cursor-pointer transition-all duration-200 hover:scale-125"
                onMouseEnter={() => setActiveTooltip(pt.val)}
                onMouseLeave={() => setActiveTooltip(null)}
              />
            ))}
          </svg>
        </div>
      </div>

      {/* Footer Info / Executive Summary */}
      <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between text-[9px] font-mono text-white/50 font-medium z-10">
        <span className="flex items-center gap-1.5">
          <Shield className="w-3 h-3 text-emerald-400" />
          <span>MICROSERVICES &bull; MULTI-TENANT CLUSTER</span>
        </span>
        <span className="text-emerald-400 font-bold flex items-center gap-1">
          <span>99.98% UPTIME SLA</span>
          <ArrowUpRight className="w-3 h-3" />
        </span>
      </div>
    </div>
  );
};
