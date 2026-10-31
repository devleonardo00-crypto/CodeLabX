import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { AuraPreview } from './AuraPreview';

export const ProjectAura: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const animatedRef = useRef<boolean>(false);
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // 1. Sequência cinematográfica de entrada progressiva (Desktop -> Mobile escalonado)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const el = containerRef.current;
    if (!el || animatedRef.current) return;

    if (prefersReducedMotion) {
      gsap.set(
        '.aura-meta-anim, .aura-title-anim, .aura-desc-anim, .aura-desktop-frame-anim, .aura-mobile-frame-anim',
        {
          opacity: 1,
          y: 0,
          scale: 1,
        }
      );
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
              '.aura-meta-anim',
              { opacity: 0, y: 14 },
              { opacity: 1, y: 0, duration: 0.6 }
            )
            // Título AURA
            .fromTo(
              '.aura-title-anim',
              { opacity: 0, y: 24 },
              { opacity: 1, y: 0, duration: 0.75 },
              '-=0.4'
            )
            // Descrição e especificações
            .fromTo(
              '.aura-desc-anim',
              { opacity: 0, y: 18 },
              { opacity: 1, y: 0, duration: 0.65 },
              '-=0.45'
            )
            // Desktop entra suavemente primeiro
            .fromTo(
              '.aura-desktop-frame-anim',
              { opacity: 0, y: 35, scale: 0.985 },
              { opacity: 1, y: 0, scale: 1, duration: 0.85, ease: 'power2.out' },
              '-=0.35'
            )
            // Composição Mobile surge logo em seguida em um segundo tempo rítmico
            .fromTo(
              '.aura-mobile-frame-anim',
              { opacity: 0, y: 40, scale: 0.97 },
              { opacity: 1, y: 0, scale: 1, duration: 0.85, ease: 'power2.out' },
              '-=0.55'
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
      id="projeto-aura"
      className="project-aura relative z-10 mb-28 sm:mb-36 lg:mb-44"
      aria-labelledby="aura-title"
    >
      {/* ── Dossier Editorial Superior (Preservado da Etapa 1) ── */}
      <header className="mb-8 sm:mb-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-white/[0.08]">
          {/* Identificação Principal */}
          <div className="space-y-3">
            <div className="aura-meta-anim flex flex-wrap items-center gap-3">
              <span className="font-mono text-xs sm:text-sm font-bold text-white tracking-wider">
                02 / 03
              </span>
              <span className="text-white/20">|</span>
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-white/60">
                Landing Page · Beleza & Skincare
              </span>
              <span className="text-white/20">|</span>
              <span className="inline-flex items-center gap-1.5 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-purple-300 bg-purple-500/10 border border-purple-500/20 px-2.5 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                Projeto conceitual
              </span>
            </div>

            <div className="aura-title-anim flex flex-wrap items-baseline gap-4 sm:gap-6">
              <h3
                id="aura-title"
                className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-[-0.04em] text-white"
              >
                AURA
              </h3>
              <p className="text-sm sm:text-base text-white/50 font-serif italic tracking-wide">
                Fórmulas Bioativas & Conversão Estratégica
              </p>
            </div>
          </div>

          {/* Contexto do Caso & Metadados */}
          <div className="aura-desc-anim max-w-xl text-left lg:text-right space-y-2">
            <p className="text-xs sm:text-sm text-[#9696A6] leading-relaxed">
              Landing page D2C de alta conversão estruturada com jornada persuasiva, prova social
              integrada e arquitetura fluida sincronizada entre desktop e mobile.
            </p>
            <div className="flex items-center gap-2 lg:justify-end text-[0.6875rem] font-mono text-white/40">
              <span>Paleta: Alabaster & Argila Quente</span>
              <span>·</span>
              <span>Checkout Demonstrativo</span>
              <span>·</span>
              <span>Mobile-First Sync</span>
            </div>
          </div>
        </div>
      </header>

      {/* ── Composição Editorial Deslocada (Desktop Principal + Mobile Companion) ── */}
      <div 
        ref={showcaseRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start will-change-transform"
      >
        {/* Coluna Principal: Interface Desktop AURA */}
        <div className="aura-desktop-frame-anim lg:col-span-8 rounded-2xl border border-white/[0.1] bg-[#0E0D12] overflow-hidden shadow-2xl transition-all duration-300 hover:border-white/20">
          {/* Top Bar Desktop Chrome */}
          <div className="flex items-center justify-between px-5 sm:px-6 py-3 border-b border-white/[0.08] bg-[#121118]">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5" aria-hidden="true">
                <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
              </div>
              <span className="font-mono text-[0.65rem] text-[#9696A6] hidden sm:inline">
                https://aura-botanicals.com/ritual-cellular
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[0.5625rem] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                CRO Otimizado
              </span>
              <span className="font-mono text-[0.5625rem] text-white/50 bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.06]">
                Desktop Viewport
              </span>
            </div>
          </div>

          {/* Área da Interface Desktop AURA Real */}
          <div className="p-3 sm:p-5 bg-[#121118]">
            <AuraPreview variant="desktop" />
          </div>
        </div>

        {/* Coluna Lateral: Interface Mobile Companion & Insights Estratégicos */}
        <div className="aura-mobile-frame-anim lg:col-span-4 space-y-6">
          {/* Card Mobile Simulado (Device Viewport sem mockup 3D artificial) */}
          <div className="rounded-2xl border border-white/[0.1] bg-[#0E0D12] overflow-hidden shadow-2xl hover:border-white/20 transition-all duration-300">
            {/* Mobile Header Bar */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.08] bg-[#121118]">
              <span className="font-mono text-[0.625rem] text-[#9696A6]">
                Mobile Viewport · 390px
              </span>
              <div className="flex items-center gap-1.5 font-mono text-[0.5625rem] text-purple-300">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                <span>Conversão Mobile</span>
              </div>
            </div>

            {/* Viewport Mobile com Interface AURA Real */}
            <div className="p-3 bg-[#121118]">
              <AuraPreview variant="mobile" />
            </div>
          </div>

          {/* Ficha Estratégica da Landing Page (CodelabX Engineering Dossier) */}
          <div className="p-5 rounded-2xl border border-white/[0.08] bg-white/[0.02] space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              <h4 className="font-mono text-xs uppercase tracking-wider text-white font-semibold">
                Estratégia de Conversão Integrada
              </h4>
            </div>

            <ul className="space-y-2.5 text-xs text-[#9696A6]">
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-0.5 font-bold">›</span>
                <span>Hierarquia visual desenhada para guiar o olhar diretamente à prova social e ao checkout.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-0.5 font-bold">›</span>
                <span>Identidade neutra e pura, preservando a essência da marca sem poluição visual.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-0.5 font-bold">›</span>
                <span>Seletor de volume dinâmico com atualização imediata de valores e sacola reativa.</span>
              </li>
            </ul>

            <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[0.625rem] font-mono text-white/40">
              <span>Status: Demonstração Interativa</span>
              <span>·</span>
              <span>Aura Pure Skincare</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
