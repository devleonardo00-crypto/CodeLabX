import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, ChevronDown, Compass, Eye, MoveRight } from 'lucide-react';
import { useIntersectionVisibility } from '../hooks/useIntersectionVisibility';

export const AtelierNoirPreview: React.FC = () => {
  const [scrollSection, setScrollSection] = useState<'hero' | 'gallery'>('hero');
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isVisible = useIntersectionVisibility(containerRef);

  // Auto-scroll demo simulation: visibly cycles between Hero and Gallery
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !isVisible || isHovered) return;

    const interval = setInterval(() => {
      setScrollSection((prev) => (prev === 'hero' ? 'gallery' : 'hero'));
    }, 4500);

    return () => clearInterval(interval);
  }, [isVisible, isHovered]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[340px] sm:h-[370px] lg:h-[395px] rounded-xl overflow-hidden border border-white/[0.1] bg-[#07060A] flex flex-col select-none text-white transition-all duration-300 shadow-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Demonstração interativa de Site Profissional: Atelier Noir Arquitetura"
    >
      {/* Top Browser Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#0C0B12] border-b border-white/[0.08] z-20">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
        </div>

        <div className="flex items-center gap-2 px-3 py-0.5 rounded-md bg-black/50 border border-white/[0.08] font-mono text-[11px] text-white/60">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
          <span>atelier-noir.arch</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setScrollSection((prev) => (prev === 'hero' ? 'gallery' : 'hero'))}
            className="flex items-center gap-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-amber-200 bg-amber-400/15 hover:bg-amber-400/25 px-2.5 py-0.5 rounded border border-amber-400/35 transition-colors cursor-pointer"
            title="Alternar entre seções do site"
          >
            <span>{scrollSection === 'hero' ? 'Ver Galeria ↓' : 'Início ↑'}</span>
          </button>
        </div>
      </div>

      {/* Visible Animated Progress Bar */}
      <div className="w-full h-[2.5px] bg-white/[0.06] relative z-20 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-amber-400 via-purple-400 to-amber-300 transition-all duration-1000 ease-out"
          style={{ width: scrollSection === 'hero' ? '35%' : '100%' }}
        />
      </div>

      {/* Site Header */}
      <header className="relative z-20 px-5 sm:px-8 py-3 bg-[#07060A]/95 backdrop-blur-md border-b border-white/[0.08] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-sm sm:text-base font-black tracking-[0.2em] text-white">
            ATELIER NOIR
          </span>
          <span className="text-[10px] font-mono text-amber-300/90 px-1.5 py-0.5 rounded bg-amber-400/10 border border-amber-400/25">
            AUTORAL
          </span>
        </div>

        <nav className="hidden sm:flex items-center gap-6 font-mono text-xs text-white/70">
          <span 
            onClick={() => setScrollSection('gallery')}
            className={`transition-colors cursor-pointer ${scrollSection === 'gallery' ? 'text-amber-300 font-bold' : 'hover:text-white'}`}
          >
            Obras
          </span>
          <span className="hover:text-white transition-colors cursor-pointer">Filosofia</span>
          <span className="hover:text-white transition-colors cursor-pointer">Monografias</span>
        </nav>

        <button 
          onClick={() => setScrollSection((prev) => (prev === 'hero' ? 'gallery' : 'hero'))}
          className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono text-white bg-white/[0.08] border border-white/[0.14] hover:bg-white/[0.15] transition-colors cursor-pointer"
        >
          <span>{scrollSection === 'hero' ? 'Explorar' : 'Início'}</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-amber-300" />
        </button>
      </header>

      {/* Smooth CSS Transform Scroll Stage */}
      <div className="relative flex-1 overflow-hidden">
        <div 
          className="transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform"
          style={{
            transform: scrollSection === 'hero' ? 'translateY(0px)' : 'translateY(-210px)',
          }}
        >
          {/* SECTION 1: HERO EDITORIAL */}
          <section className="px-5 sm:px-8 pt-5 pb-7 relative">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Left Column: Typography & Story */}
              <div className="md:col-span-7 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 font-mono text-[11px] font-bold tracking-[0.18em] text-amber-300 uppercase mb-2.5">
                  <span className="w-5 h-[1.5px] bg-amber-300" />
                  <span>ARQUITETURA CONTEMPORÂNEA</span>
                </div>

                <h4 className="text-2xl sm:text-[1.85rem] font-extrabold tracking-[-0.035em] text-white leading-[1.15] mb-3">
                  Espaços que contam <span className="italic font-serif font-normal text-amber-200">histórias</span>.
                </h4>

                <p className="text-xs sm:text-sm text-white/75 leading-relaxed mb-4.5 max-w-[430px]">
                  Arquitetura autoral para experiências extraordinárias. Estruturas em balanço, concreto aparente e integração sensorial com a paisagem natural.
                </p>

                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setScrollSection('gallery')}
                    className="group/btn inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-bold text-xs sm:text-sm tracking-tight hover:bg-amber-100 transition-all cursor-pointer shadow-lg hover:scale-105 active:scale-95"
                  >
                    <span>Explorar projetos</span>
                    <MoveRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>

                  <div className="flex items-center gap-2 pl-3 border-l border-white/[0.12] font-mono text-[11px] text-white/50">
                    <Compass className="w-4 h-4 text-amber-300" />
                    <span>São Paulo • Zurique</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Architectural Photography Frame */}
              <div className="md:col-span-5 relative">
                <div className="relative rounded-xl overflow-hidden border border-white/[0.14] bg-[#111] group/img shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85"
                    alt="Residência Monolith — Atelier Noir"
                    className="w-full h-[165px] sm:h-[185px] object-cover object-center transform transition-transform duration-1000 group-hover/img:scale-108"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent pointer-events-none" />

                  {/* Architecture Spec Card */}
                  <div className="absolute bottom-2.5 inset-x-2.5 p-2 rounded-lg bg-[#0A090E]/90 backdrop-blur-md border border-white/[0.1] flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="font-mono text-[11px] font-bold text-white tracking-wide">
                        Residência Monolith
                      </span>
                      <span className="text-[10px] text-amber-200 font-mono">
                        1.480 m² • Jardins, SP
                      </span>
                    </div>
                    <span className="font-mono text-[9px] text-white/50 border border-white/[0.12] px-2 py-0.5 rounded">
                      2026
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Scroll Navigation Hint */}
            <div className="mt-5 flex items-center justify-between pt-3 border-t border-white/[0.08] text-white/50 font-mono text-[10px]">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>ROLANDO AUTOMATICAMENTE ENTRE SEÇÕES</span>
              </span>
              <button
                onClick={() => setScrollSection((prev) => (prev === 'hero' ? 'gallery' : 'hero'))}
                className="flex items-center gap-1 text-white/70 hover:text-white transition-colors cursor-pointer font-bold"
              >
                <span>{scrollSection === 'hero' ? 'Ver Obras Abaixo ↓' : 'Voltar ao Topo ↑'}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${scrollSection === 'gallery' ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </section>

          {/* SECTION 2: GALERIA DE OBRAS REAIS */}
          <section className="px-5 sm:px-8 py-5 bg-[#0B0A11] border-t border-white/[0.1]">
            <div className="flex items-center justify-between mb-3.5">
              <div>
                <span className="font-mono text-[10px] text-amber-300 uppercase tracking-widest block font-bold">
                  02 / ACERVO SELECIONADO
                </span>
                <h5 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Coleção de Obras Autorais
                </h5>
              </div>
              <button
                onClick={() => setScrollSection('hero')}
                className="font-mono text-[10px] text-amber-300 hover:underline cursor-pointer"
              >
                ↑ Retornar ao Topo
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              <div className="rounded-lg overflow-hidden border border-white/[0.1] bg-black/40 group/card">
                <div className="relative h-24 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80"
                    alt="Pavilhão Horizonte"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-108"
                    loading="lazy"
                  />
                  <span className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/80 font-mono text-[8px] text-white">
                    Trancoso
                  </span>
                </div>
                <div className="p-2.5">
                  <span className="font-bold text-xs text-white block">Pavilhão Horizonte</span>
                  <span className="text-[10px] text-white/60 font-mono">2.100 m² • Concreto Protendido</span>
                </div>
              </div>

              <div className="rounded-lg overflow-hidden border border-white/[0.1] bg-black/40 group/card">
                <div className="relative h-24 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80"
                    alt="Villa Neblina"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-108"
                    loading="lazy"
                  />
                  <span className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/80 font-mono text-[8px] text-white">
                    Nova Lima
                  </span>
                </div>
                <div className="p-2.5">
                  <span className="font-bold text-xs text-white block">Villa Neblina</span>
                  <span className="text-[10px] text-white/60 font-mono">920 m² • Estrutura Suspensa</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Viewport Footer Status */}
      <div className="px-4 py-1.5 bg-[#050408] border-t border-white/[0.07] flex items-center justify-between font-mono text-[9px] text-white/40 z-20">
        <span className="flex items-center gap-1.5">
          <Eye className="w-3 h-3 text-purple-400" />
          <span>PRODUTO REAL CODELABX • HIGH-END WEB ARCHITECTURE</span>
        </span>
        <span className="text-emerald-400 font-bold">100/100 SPEED INDEX</span>
      </div>
    </div>
  );
};
