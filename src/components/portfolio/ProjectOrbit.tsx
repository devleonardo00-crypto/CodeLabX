import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { OrbitPreview } from './OrbitPreview';

export const ProjectOrbit: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const animatedRef = useRef<boolean>(false);
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // 1. Sequência cinematográfica de entrada tecnológica
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const el = containerRef.current;
    if (!el || animatedRef.current) return;

    if (prefersReducedMotion) {
      gsap.set('.orbit-meta-anim, .orbit-title-anim, .orbit-desc-anim, .orbit-frame-anim', {
        opacity: 1,
        y: 0,
        scale: 1,
      });
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          observer.disconnect();

          const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            // Número, categoria e badge
            tl.fromTo(
              '.orbit-meta-anim',
              { opacity: 0, y: 14 },
              { opacity: 1, y: 0, duration: 0.6 }
            )
            // Título ORBIT
            .fromTo(
              '.orbit-title-anim',
              { opacity: 0, y: 24 },
              { opacity: 1, y: 0, duration: 0.75 },
              '-=0.4'
            )
            // Descrição e especificações
            .fromTo(
              '.orbit-desc-anim',
              { opacity: 0, y: 18 },
              { opacity: 1, y: 0, duration: 0.65 },
              '-=0.45'
            )
            // Entrada do frame do sistema
            .fromTo(
              '.orbit-frame-anim',
              { opacity: 0, y: 35, scale: 0.985 },
              { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power2.out' },
              '-=0.4'
            );
          }, el);

          return () => ctx.revert();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // 2. Parallax de profundidade sutil no mouse (apenas desktop)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 1024) return;
    const rect = showcaseRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    setTilt({
      x: -(y * 2.2),
      y: x * 2.2,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <article
      ref={containerRef}
      id="projeto-orbit"
      className="project-orbit relative z-10 mb-28 sm:mb-36 lg:mb-44"
      aria-labelledby="orbit-title"
    >
      {/* ── Dossier Editorial Superior (Preservado e Animado) ── */}
      <header className="mb-8 sm:mb-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-white/[0.08]">
          {/* Identificação Principal */}
          <div className="space-y-3">
            <div className="orbit-meta-anim flex flex-wrap items-center gap-3">
              <span className="font-mono text-xs sm:text-sm font-bold text-white tracking-wider">
                03 / 03
              </span>
              <span className="text-white/20">|</span>
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-white/60">
                Sistema Web · SaaS
              </span>
              <span className="text-white/20">|</span>
              <span className="inline-flex items-center gap-1.5 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-purple-300 bg-purple-500/10 border border-purple-500/20 px-2.5 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                Projeto conceitual
              </span>
            </div>

            <div className="orbit-title-anim flex flex-wrap items-baseline gap-4 sm:gap-6">
              <h3
                id="orbit-title"
                className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-[-0.04em] text-white"
              >
                ORBIT
              </h3>
              <p className="text-sm sm:text-base text-white/50 font-serif italic tracking-wide">
                Telemetria Operacional & Inteligência de Negócios
              </p>
            </div>
          </div>

          {/* Contexto do Caso & Metadados */}
          <div className="orbit-desc-anim max-w-xl text-left lg:text-right space-y-2">
            <p className="text-xs sm:text-sm text-[#9696A6] leading-relaxed">
              Plataforma conceitual de gestão e análise operacional SaaS.
              Alterne entre os períodos (7, 30 e 90 dias) e explore os módulos na sidebar para inspecionar métricas reais reativas.
            </p>
            <div className="flex items-center gap-2 lg:justify-end text-[0.6875rem] font-mono text-white/40">
              <span>Stack: React + TypeScript</span>
              <span>·</span>
              <span>Curvas SVG Reativas</span>
              <span>·</span>
              <span>Dados Determinísticos</span>
            </div>
          </div>
        </div>
      </header>

      {/* ── Estrutura Visual Tecnológica do Sistema SaaS (Dashboard Interativo com Parallax Sutil) ── */}
      <div 
        ref={showcaseRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="orbit-frame-anim relative rounded-2xl border border-white/[0.1] bg-[#0A0910] overflow-hidden shadow-2xl transition-all duration-300 hover:border-white/20 will-change-transform"
      >
        {/* Top Control Bar do Sistema */}
        <div className="flex items-center justify-between px-5 sm:px-8 py-3.5 border-b border-white/[0.08] bg-[#0D0C15]">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
            </div>
            <div className="h-3 w-[1px] bg-white/10 hidden sm:block" />
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              </div>
              <span className="font-mono text-[0.6875rem] text-white font-semibold tracking-wider">
                ORBIT_SYSTEM // v3.4-PROD
              </span>
            </div>
          </div>

          {/* Status de Rede & Ambiente */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 font-mono text-[0.625rem] text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_5px_rgba(52,211,153,0.6)]" />
              <span>Ambiente: Nominal (99.98% SLA)</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-white/[0.04] border border-white/[0.08] font-mono text-[0.625rem] text-[#9696A6]">
              <span>Região: SA-EAST-1</span>
            </div>
          </div>
        </div>

        {/* ── Renderização da Aplicação Real ORBIT ── */}
        <div className="p-3 sm:p-5 lg:p-6 bg-[#08070D]">
          <OrbitPreview />
        </div>
      </div>
    </article>
  );
};
