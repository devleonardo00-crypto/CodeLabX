import React, { useState, useEffect, useRef } from 'react';
import { 
  TrendingUp, 
  Users, 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownRight, 
  BarChart3, 
  FileText, 
  Settings as SettingsIcon,
  Layers,
  Activity,
  Calendar,
  CheckCircle2,
  Clock,
  Play,
  Pause
} from 'lucide-react';

type TimeRange = '7d' | '30d' | '90d';
type OrbitModule = 'overview' | 'analytics' | 'customers' | 'reports' | 'settings';

interface PeriodData {
  revenue: string;
  revenueDelta: string;
  revenuePositive: boolean;
  activeUsers: string;
  usersDelta: string;
  usersPositive: boolean;
  conversions: string;
  conversionsDelta: string;
  conversionsPositive: boolean;
  churnRate: string;
  churnDelta: string;
  churnPositive: boolean;
  chartPoints: { label: string; value: number; formatted: string }[];
  channels: { name: string; percentage: number; amount: string; color: string }[];
}

const ORBIT_DATA: Record<TimeRange, PeriodData> = {
  '7d': {
    revenue: 'R$ 84.320',
    revenueDelta: '+14.2%',
    revenuePositive: true,
    activeUsers: '1.420',
    usersDelta: '+6.8%',
    usersPositive: true,
    conversions: '342',
    conversionsDelta: '+18.4%',
    conversionsPositive: true,
    churnRate: '0.8%',
    churnDelta: '-0.2%',
    churnPositive: true,
    chartPoints: [
      { label: 'Seg', value: 9200, formatted: 'R$ 9.200' },
      { label: 'Ter', value: 11400, formatted: 'R$ 11.400' },
      { label: 'Qua', value: 10800, formatted: 'R$ 10.800' },
      { label: 'Qui', value: 14200, formatted: 'R$ 14.200' },
      { label: 'Sex', value: 13900, formatted: 'R$ 13.900' },
      { label: 'Sáb', value: 11800, formatted: 'R$ 11.800' },
      { label: 'Dom', value: 13020, formatted: 'R$ 13.020' },
    ],
    channels: [
      { name: 'Tráfego Orgânico / SEO', percentage: 42, amount: 'R$ 35.414', color: '#06B6D4' },
      { name: 'Vendas Diretas & B2B', percentage: 28, amount: 'R$ 23.609', color: '#3B82F6' },
      { name: 'Campanhas de Mídia Paga', percentage: 18, amount: 'R$ 15.177', color: '#8B5CF6' },
      { name: 'Parcerias & Afiliados', percentage: 12, amount: 'R$ 10.120', color: '#10B981' },
    ],
  },
  '30d': {
    revenue: 'R$ 348.950',
    revenueDelta: '+21.5%',
    revenuePositive: true,
    activeUsers: '3.890',
    usersDelta: '+12.4%',
    usersPositive: true,
    conversions: '1.480',
    conversionsDelta: '+15.6%',
    conversionsPositive: true,
    churnRate: '1.1%',
    churnDelta: '-0.4%',
    churnPositive: true,
    chartPoints: [
      { label: 'Semana 1', value: 72000, formatted: 'R$ 72.000' },
      { label: 'Semana 2', value: 84500, formatted: 'R$ 84.500' },
      { label: 'Semana 3', value: 91200, formatted: 'R$ 91.200' },
      { label: 'Semana 4', value: 101250, formatted: 'R$ 101.250' },
    ],
    channels: [
      { name: 'Tráfego Orgânico / SEO', percentage: 46, amount: 'R$ 160.517', color: '#06B6D4' },
      { name: 'Vendas Diretas & B2B', percentage: 26, amount: 'R$ 90.727', color: '#3B82F6' },
      { name: 'Campanhas de Mídia Paga', percentage: 16, amount: 'R$ 55.832', color: '#8B5CF6' },
      { name: 'Parcerias & Afiliados', percentage: 12, amount: 'R$ 41.874', color: '#10B981' },
    ],
  },
  '90d': {
    revenue: 'R$ 1.120.400',
    revenueDelta: '+28.7%',
    revenuePositive: true,
    activeUsers: '5.640',
    usersDelta: '+24.1%',
    usersPositive: true,
    conversions: '4.820',
    conversionsDelta: '+22.3%',
    conversionsPositive: true,
    churnRate: '1.3%',
    churnDelta: '-0.1%',
    churnPositive: true,
    chartPoints: [
      { label: 'Mês 01', value: 310000, formatted: 'R$ 310.000' },
      { label: 'Mês 02', value: 375400, formatted: 'R$ 375.400' },
      { label: 'Mês 03', value: 435000, formatted: 'R$ 435.000' },
    ],
    channels: [
      { name: 'Tráfego Orgânico / SEO', percentage: 48, amount: 'R$ 537.792', color: '#06B6D4' },
      { name: 'Vendas Diretas & B2B', percentage: 25, amount: 'R$ 280.100', color: '#3B82F6' },
      { name: 'Campanhas de Mídia Paga', percentage: 15, amount: 'R$ 168.060', color: '#8B5CF6' },
      { name: 'Parcerias & Afiliados', percentage: 12, amount: 'R$ 134.448', color: '#10B981' },
    ],
  },
};

const RECENT_TRANSACTIONS = [
  { id: 'TX-9401', client: 'Artemis Health Inc.', plan: 'Enterprise Pro', amount: 'R$ 14.800', status: 'Processado', date: 'Hoje, 11:42' },
  { id: 'TX-9400', client: 'Vanguard Logistics', plan: 'Growth Tier', amount: 'R$ 8.400', status: 'Processado', date: 'Hoje, 09:15' },
  { id: 'TX-9399', client: 'Lumina Studio Design', plan: 'Team Plan', amount: 'R$ 3.200', status: 'Concluído', date: 'Ontem, 17:30' },
  { id: 'TX-9398', client: 'Krypton Labs SP', plan: 'Enterprise Custom', amount: 'R$ 22.000', status: 'Processado', date: 'Ontem, 14:10' },
];

export const OrbitPreview: React.FC = () => {
  const [activeModule, setActiveModule] = useState<OrbitModule>('overview');
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');
  const [hoveredPointIndex, setHoveredPointIndex] = useState<number | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const userInteractedRef = useRef<boolean>(false);
  const isVisibleRef = useRef<boolean>(false);

  const currentData = ORBIT_DATA[timeRange];

  // Interrupção manual do ciclo automático
  const handleUserInteraction = () => {
    if (!userInteractedRef.current) {
      userInteractedRef.current = true;
      setIsAutoPlaying(false);
    }
  };

  const handleManualPeriodChange = (rangeKey: TimeRange) => {
    handleUserInteraction();
    setTimeRange(rangeKey);
    setHoveredPointIndex(null);
  };

  const handleManualModuleChange = (module: OrbitModule) => {
    handleUserInteraction();
    setActiveModule(module);
  };

  // Monitorar visibilidade na viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Demonstração automática determinística do software vivo
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsAutoPlaying(false);
      userInteractedRef.current = true;
      return;
    }

    const periodsSequence: TimeRange[] = ['30d', '7d', '90d'];
    let stepIndex = 0;

    const interval = setInterval(() => {
      if (document.hidden || userInteractedRef.current || !isVisibleRef.current) {
        return;
      }

      stepIndex = (stepIndex + 1) % periodsSequence.length;
      setTimeRange(periodsSequence[stepIndex]);
      setHoveredPointIndex(null);
    }, 5400);

    return () => clearInterval(interval);
  }, []);

  // Cálculo SVG do gráfico suave
  const maxVal = Math.max(...currentData.chartPoints.map((p) => p.value));
  const minVal = Math.min(...currentData.chartPoints.map((p) => p.value)) * 0.75;
  const range = maxVal - minVal || 1;

  const pointsCount = currentData.chartPoints.length;
  const svgWidth = 650;
  const svgHeight = 170;
  const paddingX = 40;
  const paddingY = 25;

  const coords = currentData.chartPoints.map((p, i) => {
    const x = paddingX + (i / (pointsCount - 1 || 1)) * (svgWidth - paddingX * 2);
    const normalizedY = (p.value - minVal) / range;
    const y = svgHeight - paddingY - normalizedY * (svgHeight - paddingY * 2);
    return { x, y, ...p };
  });

  // Criar SVG path suave
  const linePath = coords.reduce((acc, curr, idx) => {
    if (idx === 0) return `M ${curr.x} ${curr.y}`;
    const prev = coords[idx - 1];
    const midX = (prev.x + curr.x) / 2;
    return `${acc} C ${midX} ${prev.y}, ${midX} ${curr.y}, ${curr.x} ${curr.y}`;
  }, '');

  const areaPath = `${linePath} L ${coords[coords.length - 1].x} ${svgHeight} L ${coords[0].x} ${svgHeight} Z`;

  return (
    <div 
      ref={containerRef}
      onClick={handleUserInteraction}
      className="orbit-saas-platform bg-[#09080F] text-[#F3F4F6] font-sans rounded-xl overflow-hidden shadow-2xl flex flex-col h-[620px] sm:h-[680px] lg:h-[720px] border border-white/[0.08] transition-all duration-300"
    >
      {/* ── 1. HEADER DO SISTEMA ORBIT ── */}
      <header className="orbit-header-anim shrink-0 bg-[#0D0C16] px-5 sm:px-6 py-3 border-b border-white/[0.08] flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-sm">
            <span className="w-2 h-2 rounded-full bg-white/95 shadow-[0_0_6px_rgba(6,182,212,0.7)]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold tracking-wider text-white">
                ORBIT PLATFORM
              </span>
              <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                PROD v3.4
              </span>
            </div>
            <span className="text-[10px] text-white/40 font-mono block">
              {activeModule === 'overview' && 'Overview / Performance Comercial'}
              {activeModule === 'analytics' && 'Analytics / Retenção & Cohorts'}
              {activeModule === 'customers' && 'Customers / Gestão de Contas Ativas'}
              {activeModule === 'reports' && 'Reports / Exportação Auditada'}
              {activeModule === 'settings' && 'Settings / Configurações de API & Webhooks'}
            </span>
          </div>
        </div>

        {/* Seletor de Período e Perfil do Usuário */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[9px] font-mono text-white/60 hidden sm:inline-flex">
            {isAutoPlaying ? (
              <>
                <Play className="w-2.5 h-2.5 text-cyan-400 fill-cyan-400" />
                <span>Auto-Sync</span>
              </>
            ) : (
              <>
                <Pause className="w-2.5 h-2.5 text-white/70" />
                <span>Manual</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-1 p-1 bg-white/[0.03] rounded-lg border border-white/[0.08]">
            <Calendar className="w-3 h-3 text-white/40 ml-1.5 hidden sm:block" />
            {(['7d', '30d', '90d'] as TimeRange[]).map((rangeKey) => (
              <button
                key={rangeKey}
                type="button"
                onClick={() => handleManualPeriodChange(rangeKey)}
                className={`px-2.5 py-1 rounded text-[11px] font-mono transition-all duration-200 ${
                  timeRange === rangeKey
                    ? 'bg-cyan-500 text-black font-bold shadow'
                    : 'text-white/60 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {rangeKey === '7d' ? '7 dias' : rangeKey === '30d' ? '30 dias' : '90 dias'}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2.5 pl-3 border-l border-white/[0.08]">
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center font-bold text-xs text-white shadow">
              CR
            </div>
            <div className="text-left text-xs font-mono">
              <span className="block text-white font-medium leading-none">Camila Ramos</span>
              <span className="text-[9px] text-emerald-400 font-normal">Online · Admin</span>
            </div>
          </div>
        </div>
      </header>

      {/* ── 2. LAYOUT DO DASHBOARD (SIDEBAR + WORKSPACE) ── */}
      <div className="flex-1 flex overflow-hidden">
        {/* SIDEBAR DO SISTEMA */}
        <aside className="orbit-sidebar-anim w-16 sm:w-48 lg:w-52 shrink-0 bg-[#0B0A13] border-r border-white/[0.07] p-3 sm:p-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="hidden sm:block px-2 text-[10px] font-mono uppercase tracking-widest text-white/30">
              Módulos do Sistema
            </div>

            <nav className="space-y-1">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'analytics', label: 'Analytics', icon: Activity },
                { id: 'customers', label: 'Clientes', icon: Users },
                { id: 'reports', label: 'Relatórios', icon: FileText },
                { id: 'settings', label: 'Ajustes', icon: SettingsIcon },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleManualModuleChange(item.id as OrbitModule)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-mono transition-colors text-left ${
                    activeModule === item.id
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-semibold'
                      : 'text-white/50 hover:text-white hover:bg-white/[0.03]'
                  }`}
                >
                  <item.icon className="w-4 h-4 shrink-0" />
                  <span className="hidden sm:inline">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="hidden sm:block p-3 rounded-lg bg-white/[0.02] border border-white/[0.06] text-[10px] font-mono text-white/40 space-y-1">
            <div className="flex items-center justify-between text-white/70">
              <span>SLA do Cluster</span>
              <span className="text-emerald-400 font-bold">99.98%</span>
            </div>
            <div className="w-full bg-white/[0.06] h-1 rounded-full overflow-hidden">
              <div className="bg-emerald-400 h-full w-[99%]" />
            </div>
            <span className="text-[9px] text-white/30 block pt-1">Tempo de resposta: 18ms</span>
          </div>
        </aside>

        {/* WORKSPACE PRINCIPAL NAVEGÁVEL COM SCROLL */}
        <main 
          className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6 lg:p-8 space-y-6 bg-[#08070E]"
          tabIndex={0}
          aria-label="Painel analítico do ORBIT"
          onScroll={handleUserInteraction}
        >
          {activeModule === 'overview' && (
            <>
              {/* GRADE DE 4 INDICADORES COM TRANSIÇÃO DETERMINÍSTICA */}
              <div className="orbit-kpi-grid-anim grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {[
                  {
                    label: 'Receita Total',
                    val: currentData.revenue,
                    delta: currentData.revenueDelta,
                    positive: currentData.revenuePositive,
                    icon: CreditCard,
                  },
                  {
                    label: 'Usuários Ativos',
                    val: currentData.activeUsers,
                    delta: currentData.usersDelta,
                    positive: currentData.usersPositive,
                    icon: Users,
                  },
                  {
                    label: 'Novas Conversões',
                    val: currentData.conversions,
                    delta: currentData.conversionsDelta,
                    positive: currentData.conversionsPositive,
                    icon: TrendingUp,
                  },
                  {
                    label: 'Taxa de Churn',
                    val: currentData.churnRate,
                    delta: currentData.churnDelta,
                    positive: currentData.churnPositive,
                    icon: Layers,
                  },
                ].map((kpi, idx) => (
                  <div
                    key={idx}
                    className="orbit-kpi-card-item p-3.5 sm:p-4 rounded-xl bg-[#0F0E18] border border-white/[0.07] flex flex-col justify-between shadow-sm transition-all duration-300 hover:border-cyan-500/30"
                  >
                    <div className="flex items-center justify-between text-white/40 mb-2">
                      <span className="font-mono text-[10px] uppercase tracking-wider">
                        {kpi.label}
                      </span>
                      <kpi.icon className="w-3.5 h-3.5 text-cyan-400/80" />
                    </div>

                    <div className="my-1">
                      <span className="font-mono text-base sm:text-xl lg:text-2xl font-bold text-white block transition-all duration-300">
                        {kpi.val}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-[10px] font-mono">
                      {kpi.positive ? (
                        <ArrowUpRight className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <ArrowDownRight className="w-3 h-3 text-rose-400" />
                      )}
                      <span className={kpi.positive ? 'text-emerald-400 font-semibold' : 'text-rose-400 font-semibold'}>
                        {kpi.delta}
                      </span>
                      <span className="text-white/30 hidden sm:inline">vs período anterior</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* GRÁFICO PRINCIPAL DE EVOLUÇÃO DE RECEITA */}
              <div className="orbit-chart-card-anim p-4 sm:p-5 rounded-xl bg-[#0F0E18] border border-white/[0.07] space-y-3 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <span>Curva de Faturamento & Receita Recorrente</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-normal">
                        Intervalo: {timeRange === '7d' ? '7 dias' : timeRange === '30d' ? '30 dias' : '90 dias'}
                      </span>
                    </h3>
                    <p className="text-xs text-white/40">
                      Passe o cursor sobre os pontos para inspecionar os valores registrados.
                    </p>
                  </div>

                  {hoveredPointIndex !== null && (
                    <div className="p-1.5 px-3 rounded bg-cyan-500/20 border border-cyan-400/30 text-xs font-mono text-cyan-300 flex items-center gap-2 animate-fadeIn">
                      <span>{coords[hoveredPointIndex].label}:</span>
                      <span className="font-bold text-white">{coords[hoveredPointIndex].formatted}</span>
                    </div>
                  )}
                </div>

                {/* Canvas SVG Reativo com Transição Suave */}
                <div className="relative w-full h-44 sm:h-52 bg-[#08070D] rounded-lg border border-white/[0.04] p-3 flex flex-col justify-between overflow-hidden">
                  <svg
                    className="w-full h-full"
                    viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient id="orbitAreaGradAnim" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.32" />
                        <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Linhas de Grade Horizontais */}
                    <line x1="0" y1="30" x2={svgWidth} y2="30" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                    <line x1="0" y1="80" x2={svgWidth} y2="80" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                    <line x1="0" y1="130" x2={svgWidth} y2="130" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />

                    {/* Área Preenchida com Gradiente */}
                    <path 
                      d={areaPath} 
                      fill="url(#orbitAreaGradAnim)" 
                      className="transition-all duration-700 ease-in-out"
                    />

                    {/* Linha Curva Principal */}
                    <path
                      d={linePath}
                      fill="none"
                      stroke="#06B6D4"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-all duration-700 ease-in-out"
                    />

                    {/* Nós Interativos do Gráfico com Hit Area Expandida para Touch */}
                    {coords.map((pt, i) => (
                      <g key={i} className="cursor-pointer">
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r={16}
                          fill="transparent"
                          onMouseEnter={() => {
                            handleUserInteraction();
                            setHoveredPointIndex(i);
                          }}
                          onClick={() => {
                            handleUserInteraction();
                            setHoveredPointIndex(i);
                          }}
                        />
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r={hoveredPointIndex === i ? 6 : 4}
                          fill={hoveredPointIndex === i ? '#FFFFFF' : '#06B6D4'}
                          stroke="#08070D"
                          strokeWidth="2"
                          className="transition-all duration-300 pointer-events-none"
                        />
                      </g>
                    ))}
                  </svg>
                        />
                      </g>
                    ))}
                  </svg>

                  {/* Eixo X com Labels do Período */}
                  <div className="flex justify-between px-3 pt-1 border-t border-white/[0.06] text-[10px] font-mono text-white/40">
                    {coords.map((c, i) => (
                      <span
                        key={i}
                        className={`cursor-pointer transition-colors ${
                          hoveredPointIndex === i ? 'text-cyan-300 font-bold' : 'hover:text-white'
                        }`}
                        onMouseEnter={() => {
                          handleUserInteraction();
                          setHoveredPointIndex(i);
                        }}
                      >
                        {c.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* DISTRIBUIÇÃO POR CANAL & ATIVIDADE RECENTE */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                {/* Distribuição por Canal (Barra Proporcional) */}
                <div className="lg:col-span-5 p-4 rounded-xl bg-[#0F0E18] border border-white/[0.07] space-y-3">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-white/60 font-semibold">
                    Receita por Canal de Ingestão
                  </h3>

                  <div className="space-y-2.5 pt-1">
                    {currentData.channels.map((chan) => (
                      <div key={chan.name} className="space-y-1">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-white/70">{chan.name}</span>
                          <span className="text-white font-semibold">{chan.amount} ({chan.percentage}%)</span>
                        </div>
                        <div className="w-full bg-white/[0.05] h-1.5 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500 ease-out"
                            style={{
                              width: `${chan.percentage}%`,
                              backgroundColor: chan.color,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tabela de Atividade Recente */}
                <div className="lg:col-span-7 p-4 rounded-xl bg-[#0F0E18] border border-white/[0.07] space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-white/60 font-semibold">
                      Últimas Transações Fictícias
                    </h3>
                    <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Tempo Real
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left font-mono text-xs">
                      <thead>
                        <tr className="border-b border-white/[0.06] text-white/40 text-[10px] uppercase">
                          <th className="pb-2 font-normal">Cliente</th>
                          <th className="pb-2 font-normal">Plano</th>
                          <th className="pb-2 font-normal">Valor</th>
                          <th className="pb-2 font-normal text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/[0.04]">
                        {RECENT_TRANSACTIONS.map((tx) => (
                          <tr key={tx.id} className="hover:bg-white/[0.02] transition-colors">
                            <td className="py-2.5 font-medium text-white">{tx.client}</td>
                            <td className="py-2.5 text-white/50 text-[11px]">{tx.plan}</td>
                            <td className="py-2.5 text-white/80 font-bold">{tx.amount}</td>
                            <td className="py-2.5 text-right">
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                <CheckCircle2 className="w-2.5 h-2.5" />
                                {tx.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* MÓDULO ALTERNATIVO: ANALYTICS */}
          {activeModule === 'analytics' && (
            <div className="p-6 rounded-xl bg-[#0F0E18] border border-white/[0.07] space-y-4 animate-fadeIn">
              <h3 className="text-base font-bold text-white font-mono">
                Funil de Aquisição & Retenção de Clientes
              </h3>
              <p className="text-xs text-white/50">
                Visualização detalhada da taxa de ativação por coorte e tempo médio de onboarding.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                  <span className="text-[10px] font-mono uppercase text-white/40 block">Taxa de Ativação</span>
                  <span className="text-xl font-bold font-mono text-cyan-400 mt-1 block">78.4%</span>
                  <span className="text-[10px] text-white/30">+4.2% pós atualização de onboarding</span>
                </div>
                <div className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                  <span className="text-[10px] font-mono uppercase text-white/40 block">LTV Médio</span>
                  <span className="text-xl font-bold font-mono text-emerald-400 mt-1 block">R$ 18.420</span>
                  <span className="text-[10px] text-white/30">Ciclo médio de 14.2 meses</span>
                </div>
                <div className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                  <span className="text-[10px] font-mono uppercase text-white/40 block">NPS Operacional</span>
                  <span className="text-xl font-bold font-mono text-purple-400 mt-1 block">+82</span>
                  <span className="text-[10px] text-white/30">Amostra de 420 feedbacks</span>
                </div>
              </div>
            </div>
          )}

          {/* MÓDULO ALTERNATIVO: CUSTOMERS */}
          {activeModule === 'customers' && (
            <div className="p-6 rounded-xl bg-[#0F0E18] border border-white/[0.07] space-y-4 animate-fadeIn">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-bold text-white font-mono">
                  Base de Clientes Ativos (Amostra Demonstrativa)
                </h3>
                <span className="text-xs font-mono text-cyan-400">Total: {currentData.activeUsers} contas</span>
              </div>
              <div className="space-y-2">
                {RECENT_TRANSACTIONS.map((c, i) => (
                  <div key={i} className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.05] flex justify-between items-center text-xs font-mono">
                    <div>
                      <span className="font-bold text-white block">{c.client}</span>
                      <span className="text-white/40 text-[10px]">{c.plan} · Ativo desde Jan/2026</span>
                    </div>
                    <span className="px-2 py-1 rounded bg-white/[0.04] text-white/70">{c.amount}/mês</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MÓDULO ALTERNATIVO: REPORTS */}
          {activeModule === 'reports' && (
            <div className="p-6 rounded-xl bg-[#0F0E18] border border-white/[0.07] space-y-4 text-center py-10 animate-fadeIn">
              <FileText className="w-8 h-8 text-cyan-400 mx-auto" />
              <h3 className="text-sm font-bold text-white font-mono">
                Módulo de Exportação Auditada de Dados
              </h3>
              <p className="text-xs text-white/50 max-w-md mx-auto">
                Relatórios consolidados em formatos CSV, JSON e PDF para prestação de contas fiscais e reuniões de diretoria.
              </p>
              <button
                type="button"
                onClick={handleUserInteraction}
                className="px-4 py-2 rounded-lg bg-cyan-500 text-black text-xs font-mono font-bold hover:bg-cyan-400 transition-colors shadow"
              >
                Gerar Relatório do Trimestre ({timeRange})
              </button>
            </div>
          )}

          {/* MÓDULO ALTERNATIVO: SETTINGS */}
          {activeModule === 'settings' && (
            <div className="p-6 rounded-xl bg-[#0F0E18] border border-white/[0.07] space-y-4 animate-fadeIn">
              <h3 className="text-base font-bold text-white font-mono">
                Configurações da Plataforma ORBIT
              </h3>
              <div className="space-y-3 max-w-md text-xs font-mono text-white/70">
                <div className="flex justify-between items-center p-3 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                  <span>Webhooks em Tempo Real</span>
                  <span className="text-emerald-400 font-bold">Ativo (2 endpoints)</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                  <span>Autenticação de Dois Fatores</span>
                  <span className="text-cyan-400 font-bold">Obrigatória</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                  <span>Chaves de API</span>
                  <span className="text-white/40">3 ativas</span>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ── 3. FOOTER DO SISTEMA ORBIT ── */}
      <footer className="shrink-0 bg-[#0B0A13] px-5 py-2.5 border-t border-white/[0.07] flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] font-mono text-white/40">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>SISTEMA ORBIT CONCEITUAL · DADOS FICTÍCIOS DETERMINÍSTICOS</span>
        </div>
        <div>
          <span>MOTOR DE TELEMETRIA REATIVO DA CODELABX</span>
        </div>
      </footer>
    </div>
  );
};
