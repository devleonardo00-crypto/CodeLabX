import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Bot, 
  Database, 
  Send, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  Zap
} from 'lucide-react';
import { useIntersectionVisibility } from '../hooks/useIntersectionVisibility';

interface AutomationNode {
  id: number;
  title: string;
  subtitle: string;
  activeStatus: string;
  icon: React.ReactNode;
  detail: string;
}

const NODES: AutomationNode[] = [
  {
    id: 0,
    title: 'Novo lead',
    subtitle: 'Webhook Inbound',
    activeStatus: 'Recebido',
    icon: <Zap className="w-4 h-4 text-amber-400" />,
    detail: 'Lead recebido via Webhook: ACME Corp • Orçamento R$ 80k',
  },
  {
    id: 1,
    title: 'Análise com IA',
    subtitle: 'LLM Multi-Agent',
    activeStatus: 'Analisando...',
    icon: <Bot className="w-4 h-4 text-purple-400" />,
    detail: 'IA avaliando perfil e ICP • Match score: 96%',
  },
  {
    id: 2,
    title: 'Qualificação',
    subtitle: 'Score de Decisão',
    activeStatus: 'Qualificando...',
    icon: <Sparkles className="w-4 h-4 text-indigo-400" />,
    detail: 'Lead qualificado como Tier 1 Enterprise • Roteamento VIP',
  },
  {
    id: 3,
    title: 'Atualização CRM',
    subtitle: 'Postgres / CRM',
    activeStatus: 'Sincronizando...',
    icon: <Database className="w-4 h-4 text-cyan-400" />,
    detail: 'Oportunidade criada no CRM #8492 • Contato vinculado',
  },
  {
    id: 4,
    title: 'Notificação',
    subtitle: 'Slack & WhatsApp',
    activeStatus: 'Disparando...',
    icon: <Send className="w-4 h-4 text-emerald-400" />,
    detail: 'Notificação enviada ao canal de vendas #deals com resumo',
  },
];

export const FlowEnginePreview: React.FC = () => {
  // currentStep: 0 to 4 = nodes, 5 = completed summary pause
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const isVisible = useIntersectionVisibility(containerRef);

  // Exact 9-Step Sequential Progression with Pause & Loop
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !isPlaying || !isVisible) return;

    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < NODES.length) {
          return prev + 1;
        } else {
          return 0; // restarts after completed state
        }
      });
    }, currentStep === NODES.length ? 2400 : 1600);

    return () => clearInterval(timer);
  }, [isPlaying, isVisible, currentStep]);

  const getNodeState = (nodeIndex: number) => {
    if (currentStep === NODES.length) return 'completed';
    if (nodeIndex < currentStep) return 'completed';
    if (nodeIndex === currentStep) return 'processing';
    return 'waiting';
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setIsPlaying(true);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[270px] sm:h-[295px] rounded-xl overflow-hidden border border-white/[0.1] bg-[#07060B] flex flex-col justify-between p-4 sm:p-5 text-white select-none transition-all duration-300 shadow-xl"
      aria-label="Demonstração interativa de Automação com IA: Flow Engine"
    >
      {/* Top Header Bar & Control Buttons */}
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] z-10">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-purple-500/20 border border-purple-500/35 font-mono text-[10px] text-purple-300 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
            <span>FLOW ENGINE v2.4</span>
          </div>
          <span className="hidden sm:inline font-mono text-[10px] text-white/50">
            Pipeline IA • 5 Etapas Ativas
          </span>
        </div>

        {/* Interactive Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.12] font-mono text-[9px] font-semibold text-white transition-colors cursor-pointer"
            title={isPlaying ? 'Pausar animação' : 'Continuar animação'}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3 h-3 text-amber-400" />
                <span>Pausar</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 text-emerald-400" />
                <span>Play</span>
              </>
            )}
          </button>

          <button
            onClick={handleRestart}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.12] font-mono text-[9px] font-semibold text-white transition-colors cursor-pointer"
            title="Reiniciar fluxo do início"
          >
            <RotateCcw className="w-3 h-3 text-purple-400" />
            <span>Reiniciar</span>
          </button>
        </div>
      </div>

      {/* 5-Step Visual Flow Diagram */}
      <div className="relative my-auto py-2 z-10 overflow-x-auto scrollbar-none">
        <div className="min-w-[460px] flex items-center justify-between relative px-2">
          {/* Background Connecting Line with Moving Pulse */}
          <div className="absolute top-[22px] left-8 right-8 h-[2.5px] bg-white/[0.1] z-0">
            {/* Animated Progress Gradient */}
            <div
              className="h-full bg-gradient-to-r from-purple-500 via-emerald-400 to-cyan-400 transition-all duration-700 ease-out"
              style={{
                width: `${Math.min(100, (currentStep / (NODES.length - 1)) * 100)}%`,
              }}
            />
            {/* Moving Luminous Packet traveling between nodes */}
            <div 
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-purple-400 shadow-[0_0_15px_#A855F7] transition-all duration-700 ease-out -ml-2"
              style={{
                left: `${Math.min(100, (currentStep / (NODES.length - 1)) * 100)}%`,
              }}
            />
          </div>

          {/* Nodes Map */}
          {NODES.map((node, idx) => {
            const state = getNodeState(idx);

            return (
              <div
                key={node.id}
                onClick={() => setCurrentStep(idx)}
                className="relative z-10 flex flex-col items-center gap-2 cursor-pointer group"
              >
                {/* Node Box */}
                <div
                  className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all duration-500 relative ${
                    state === 'processing'
                      ? 'bg-purple-900/60 border-2 border-purple-400 shadow-[0_0_25px_rgba(168,85,247,0.6)] scale-115'
                      : state === 'completed'
                      ? 'bg-emerald-950/60 border border-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                      : 'bg-[#100F18] border border-white/[0.1] opacity-65 group-hover:opacity-100'
                  }`}
                >
                  {state === 'completed' ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : (
                    node.icon
                  )}

                  {/* Pulsing Ping Ring when Active */}
                  {state === 'processing' && (
                    <span className="absolute -inset-1 rounded-xl border border-purple-400/80 animate-ping opacity-75 pointer-events-none" />
                  )}
                </div>

                {/* Step Name */}
                <div className="text-center">
                  <span className="font-bold text-[10px] sm:text-[11px] text-white block whitespace-nowrap leading-tight">
                    {node.title}
                  </span>
                  <span className="font-mono text-[8px] text-white/50 block">
                    {node.subtitle}
                  </span>
                </div>

                {/* State Tag */}
                <span
                  className={`font-mono text-[8px] uppercase px-2 py-0.5 rounded border font-semibold ${
                    state === 'processing'
                      ? 'bg-purple-500/25 border-purple-500/50 text-purple-200 animate-pulse'
                      : state === 'completed'
                      ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                      : 'bg-white/[0.04] border-white/[0.08] text-white/40'
                  }`}
                >
                  {state === 'processing'
                    ? node.activeStatus
                    : state === 'completed'
                    ? 'Concluído'
                    : 'Aguardando'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Stage Detail Card / Real-time Simulation Feed */}
      <div className="p-3 rounded-lg bg-black/50 border border-white/[0.08] flex items-center justify-between gap-3 z-10">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div
            className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
              currentStep === NODES.length
                ? 'bg-emerald-400 shadow-[0_0_10px_#10B981]'
                : 'bg-purple-400 animate-ping shadow-[0_0_8px_#A855F7]'
            }`}
          />
          <div className="flex flex-col truncate">
            {currentStep === NODES.length ? (
              <>
                <span className="font-mono text-[9px] text-emerald-300 uppercase tracking-wider font-bold">
                  ✓ FLUXO CONCLUÍDO COM SUCESSO
                </span>
                <span className="font-mono text-xs text-white/90 truncate font-semibold">
                  Todas as 5 etapas processadas de ponta a ponta sem intervenção humana.
                </span>
              </>
            ) : (
              <>
                <span className="font-mono text-[9px] text-purple-300 uppercase tracking-wider font-bold">
                  {NODES[currentStep].title} — EXECUÇÃO ATIVA
                </span>
                <span className="font-mono text-xs text-white/90 truncate font-medium">
                  {NODES[currentStep].detail}
                </span>
              </>
            )}
          </div>
        </div>

        <span className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[9px] text-emerald-400 bg-emerald-500/15 px-2.5 py-1 rounded border border-emerald-500/25 whitespace-nowrap font-bold">
          <Clock className="w-3 h-3" />
          <span>LATÊNCIA: 18ms</span>
        </span>
      </div>
    </div>
  );
};
