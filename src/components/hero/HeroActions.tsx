import React from 'react';

export const HeroActions: React.FC = () => {
  return (
    <div className="hero-fade-anim">
      {/* Grupo de CTAs */}
      <div className="flex flex-wrap items-center gap-5 mb-14">
        <a 
          href="#orcamento"
          className="group relative inline-flex items-center gap-3.5 px-9 py-4 rounded-full bg-white text-[#070609] text-[0.9375rem] font-bold tracking-tight hover:bg-[#EFEFF6] hover:-translate-y-0.5 hover:shadow-[0_10px_25px_-5px_rgba(255,255,255,0.2)] transition-all duration-300 cursor-pointer"
        >
          <span>Solicitar orçamento</span>
          <span className="flex items-center justify-center transition-transform duration-250 group-hover:translate-x-1">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
        </a>

        <a 
          href="#projetos"
          className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-white/[0.03] border border-white/[0.08] text-white text-[0.9375rem] font-semibold tracking-tight hover:bg-white/[0.08] hover:border-white/20 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
        >
          <span>Explorar projetos</span>
        </a>
      </div>

      {/* Credenciais de Engenharia & Design */}
      <div className="flex flex-wrap items-center gap-10 pt-8 border-t border-white/[0.07]">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[0.8125rem] font-bold text-white tracking-wide">99/100</span>
          <span className="text-[0.75rem] text-[#5E5E6E] uppercase tracking-wider">Performance Core Web Vitals</span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="font-mono text-[0.8125rem] font-bold text-white tracking-wide">Zero Templates</span>
          <span className="text-[0.75rem] text-[#5E5E6E] uppercase tracking-wider">Design Autoral e Exclusivo</span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="font-mono text-[0.8125rem] font-bold text-white tracking-wide">Full Stack</span>
          <span className="text-[0.75rem] text-[#5E5E6E] uppercase tracking-wider">Next.js • React • WebGL</span>
        </div>
      </div>
    </div>
  );
};
