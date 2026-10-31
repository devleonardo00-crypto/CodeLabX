import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { MaisonPreview } from './MaisonPreview';

export const ProjectMaison: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const animatedRef = useRef<boolean>(false);
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // 1. Revelação cinematográfica do Projeto 01 ao entrar na viewport
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const el = containerRef.current;
    if (!el || animatedRef.current) return;

    if (prefersReducedMotion) {
      gsap.set('.maison-meta-anim, .maison-title-anim, .maison-desc-anim, .maison-frame-anim', {
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
              '.maison-meta-anim',
              { opacity: 0, y: 14 },
              { opacity: 1, y: 0, duration: 0.6 }
            )
            // Título MAISON
            .fromTo(
              '.maison-title-anim',
              { opacity: 0, y: 24 },
              { opacity: 1, y: 0, duration: 0.75 },
              '-=0.4'
            )
            // Descrição e especificações
            .fromTo(
              '.maison-desc-anim',
              { opacity: 0, y: 18 },
              { opacity: 1, y: 0, duration: 0.65 },
              '-=0.45'
            )
            // Revelação da interface cinematográfica
            .fromTo(
              '.maison-frame-anim',
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

  // 2. Parallax de profundidade sutil e controlado com o mouse (apenas desktop)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 1024) return;
    const rect = showcaseRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    // Movimento extremamente sutil e controlado (máx 3 graus)
    setTilt({
      x: -(y * 2.5),
      y: x * 2.5,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <article
      ref={containerRef}
      id="projeto-maison"
      className="project-maison relative z-10 mb-28 sm:mb-36 lg:mb-44"
      aria-labelledby="maison-title"
    >
      {/* ── Dossier Editorial Superior (Preservado e Animado) ── */}
      <header className="mb-8 sm:mb-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-white/[0.08]">
          {/* Identificação Principal */}
          <div className="space-y-3">
            <div className="maison-meta-anim flex flex-wrap items-center gap-3">
              <span className="font-mono text-xs sm:text-sm font-bold text-white tracking-wider">
                01 / 03
              </span>
              <span className="text-white/20">|</span>
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-white/60">
                Website institucional · Arquitetura
              </span>
              <span className="text-white/20">|</span>
              <span className="inline-flex items-center gap-1.5 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-purple-300 bg-purple-500/10 border border-purple-500/20 px-2.5 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                Projeto conceitual
              </span>
            </div>

            <div className="maison-title-anim flex flex-wrap items-baseline gap-4 sm:gap-6">
              <h3
                id="maison-title"
                className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-[-0.04em] text-white"
              >
                MAISON
              </h3>
              <p className="text-sm sm:text-base text-white/50 font-serif italic tracking-wide">
                Espaço, Matéria e Silêncio
              </p>
            </div>
          </div>

          {/* Contexto do Caso & Metadados */}
          <div className="maison-desc-anim max-w-xl text-left lg:text-right space-y-2">
            <p className="text-xs sm:text-sm text-[#9696A6] leading-relaxed">
              Website institucional autoral desenvolvido para um estúdio fictício de arquitetura contemporânea de alto padrão.
              Navegue pelas obras, explore a filosofia construtiva e teste o fluxo de agendamento de consulta.
            </p>
            <div className="flex items-center gap-2 lg:justify-end text-[0.6875rem] font-mono text-white/40">
              <span>Proporção: Panorâmica Expandida</span>
              <span>·</span>
              <span>Design Editorial Suíço</span>
              <span>·</span>
              <span>Interface React Navegável</span>
            </div>
          </div>
        </div>
      </header>

      {/* ── Área de Apresentação Cinematográfica (Full Width com Parallax Sutil) ── */}
      <div 
        ref={showcaseRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="maison-frame-anim relative rounded-2xl border border-white/[0.1] bg-[#0A090D] overflow-hidden shadow-2xl transition-all duration-300 hover:border-white/20 will-change-transform"
      >
        {/* Barra superior de controle editorial minimalista (Chrome do Estúdio) */}
        <div className="flex items-center justify-between px-5 sm:px-8 py-3.5 border-b border-white/[0.07] bg-[#0D0C12]/90 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
            </div>
            <div className="h-3 w-[1px] bg-white/10 hidden sm:block" />
            <span className="font-mono text-[0.6875rem] text-white/50 tracking-wider hidden sm:inline-block">
              maison-atelier.arch · index / 2026
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono text-[0.625rem] text-[#9696A6] tracking-widest uppercase hidden md:inline-block">
              Demonstração Interativa
            </span>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/[0.04] border border-white/[0.08] font-mono text-[0.625rem] text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_5px_rgba(52,211,153,0.6)]" />
              <span>Website Ativo</span>
            </div>
          </div>
        </div>

        {/* ── Container da Aplicação Real MAISON ── */}
        <div className="p-3 sm:p-5 lg:p-6 bg-[#0B0A10]">
          <MaisonPreview />
        </div>
      </div>
    </article>
  );
};
