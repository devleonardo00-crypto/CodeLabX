import React, { useState, useEffect } from 'react';

interface FloatingPanelsProps {
  mouseX?: number;
  mouseY?: number;
}

const CAROUSEL_SLIDES = [
  {
    badge: 'Landing Page',
    title: 'Plataforma SaaS B2B',
    meta: '+340% em conversão',
  },
  {
    badge: 'FinTech Studio',
    title: 'Design System & App',
    meta: 'UX/UI Internacional',
  },
  {
    badge: 'E-Commerce',
    title: 'Marca Premium Direct',
    meta: 'Performance Imersiva',
  },
];

export const FloatingPanels: React.FC<FloatingPanelsProps> = ({ mouseX = 0, mouseY = 0 }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* 1. PAINEL: ALTA PERFORMANCE (Gauge Circular) */}
      <div 
        className="absolute top-[6%] left-0 w-[220px] p-4 rounded-2xl bg-[#101018]/70 backdrop-blur-xl border border-purple-500/25 shadow-[0_20px_50px_rgba(0,0,0,0.65),0_0_30px_rgba(168,85,247,0.15)] z-35 transition-transform duration-300 ease-out hover:border-purple-400"
        style={{
          transform: `translate3d(${mouseX * -8}px, ${mouseY * -8}px, 30px) rotate(-3deg)`,
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-[13px] font-bold text-white tracking-tight">Alta performance</span>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
            Otimizado
          </span>
        </div>
        <div className="flex items-center gap-3.5">
          <div className="relative w-14 h-14 shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 60 60">
              <circle cx="30" cy="30" r="25" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="5" />
              <circle 
                cx="30" 
                cy="30" 
                r="25" 
                fill="none" 
                stroke="#A855F7" 
                strokeWidth="5" 
                strokeLinecap="round" 
                strokeDasharray="157" 
                strokeDashoffset="15" 
                className="drop-shadow-[0_0_8px_#A855F7]"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-sm font-extrabold text-white font-mono">
              100%
            </div>
          </div>
          <div className="text-[12px] text-[#B4B4C4] leading-snug">
            Carregamento instantâneo e arquitetura ultra fluida.
          </div>
        </div>
      </div>

      {/* 2. PAINEL: PROJETOS (Design que Converte - Carousel) */}
      <div 
        className="absolute -top-2 right-[8%] w-[235px] p-3.5 rounded-2xl bg-[#101018]/70 backdrop-blur-xl border border-purple-500/25 shadow-[0_20px_50px_rgba(0,0,0,0.65),0_0_30px_rgba(168,85,247,0.15)] z-30 transition-transform duration-300 ease-out hover:border-purple-400 hidden sm:block"
        style={{
          transform: `translate3d(${mouseX * 10}px, ${mouseY * 10}px, 20px) rotate(4deg)`,
        }}
      >
        <div className="text-[12px] font-bold text-white mb-2.5 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_#A855F7] animate-pulse" />
          <span>Design que converte</span>
        </div>
        <div className="relative h-20 overflow-hidden rounded-lg bg-[#0d0d16] border border-white/5 p-2.5 flex flex-col justify-between">
          {CAROUSEL_SLIDES.map((slide, idx) => {
            const isActive = idx === currentSlide;
            return (
              <div 
                key={slide.title}
                className={`absolute inset-0 p-2.5 flex flex-col justify-between transition-all duration-500 ${
                  isActive ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-3 pointer-events-none'
                }`}
              >
                <span className="self-start text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-600/30 text-purple-200">
                  {slide.badge}
                </span>
                <div>
                  <div className="text-[13px] font-bold text-white leading-tight">{slide.title}</div>
                  <div className="text-[11px] text-[#B4B4C4]">{slide.meta}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. PAINEL: TECNOLOGIA (Soluções Sob Medida) */}
      <div 
        className="absolute bottom-[12%] -left-2 w-[215px] p-3.5 rounded-2xl bg-[#101018]/70 backdrop-blur-xl border border-purple-500/25 shadow-[0_20px_50px_rgba(0,0,0,0.65),0_0_30px_rgba(168,85,247,0.15)] z-35 transition-transform duration-300 ease-out hover:border-purple-400 hidden sm:block"
        style={{
          transform: `translate3d(${mouseX * -6}px, ${mouseY * -6}px, 40px) rotate(-2deg)`,
        }}
      >
        <div className="text-[12px] font-bold text-white mb-2">Soluções sob medida</div>
        <svg className="w-full h-11" viewBox="0 0 180 40">
          <line x1="20" y1="20" x2="60" y2="10" stroke="rgba(168,85,247,0.4)" strokeWidth="1.5" strokeDasharray="2 2" />
          <line x1="60" y1="10" x2="110" y2="30" stroke="rgba(168,85,247,0.6)" strokeWidth="1.5" />
          <line x1="110" y1="30" x2="160" y2="18" stroke="rgba(168,85,247,0.4)" strokeWidth="1.5" />
          <circle cx="20" cy="20" r="3.5" fill="#9333EA" className="animate-pulse" />
          <circle cx="60" cy="10" r="4" fill="#A855F7" />
          <circle cx="110" cy="30" r="4.5" fill="#C084FC" className="animate-pulse" />
          <circle cx="160" cy="18" r="3.5" fill="#A855F7" />
        </svg>
        <div className="flex gap-1.5 mt-2">
          {['Next.js', 'React', 'TypeScript', 'WebGL'].map((tech) => (
            <span key={tech} className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-white/5 text-[#B4B4C4] border border-white/10">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* 4. PAINEL: MÉTRICAS (+150 Projetos Entregues) */}
      <div 
        className="absolute bottom-[2%] left-[30%] w-[185px] p-3 px-4 rounded-2xl bg-[#101018]/70 backdrop-blur-xl border border-purple-500/25 shadow-[0_20px_50px_rgba(0,0,0,0.65),0_0_30px_rgba(168,85,247,0.15)] z-35 transition-transform duration-300 ease-out hover:border-purple-400"
        style={{
          transform: `translate3d(${mouseX * 5}px, ${mouseY * 5}px, 35px) rotate(1deg)`,
        }}
      >
        <div className="flex justify-between items-baseline mb-1.5">
          <span className="text-[1.35rem] font-extrabold text-white font-mono tracking-tight">+150</span>
          <span className="text-[10px] text-[#B4B4C4] uppercase tracking-wider font-semibold">Entregues</span>
        </div>
        <div className="flex items-end gap-1 h-6 pt-1">
          {[35, 55, 45, 80, 65, 100, 75].map((height, i) => {
            const isHighlight = i === 3 || i === 5;
            return (
              <div 
                key={i} 
                className={`flex-1 rounded-[2px] transition-all duration-300 ${
                  isHighlight ? 'bg-purple-500 shadow-[0_0_8px_#A855F7]' : 'bg-purple-900/40'
                }`}
                style={{ height: `${height}%` }}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};
