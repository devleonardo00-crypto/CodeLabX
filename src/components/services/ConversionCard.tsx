import React from 'react';
import { ArrowUpRight, MessageSquare } from 'lucide-react';

export const ConversionCard: React.FC = () => {
  return (
    <div className="relative mt-12 sm:mt-16 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#111019] to-[#0A090F] border border-white/[0.08] p-8 sm:p-12 lg:p-14 overflow-hidden">
      {/* Subtle Ambient Radial Glow */}
      <div 
        className="absolute top-1/2 right-10 -translate-y-1/2 w-80 h-80 rounded-full bg-purple-600/[0.08] blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-purple-400 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            <span>CONSULTORIA & ESCOPO SOB MEDIDA</span>
          </div>

          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-4">
            Seu projeto não se encaixa em uma categoria?
          </h3>

          <p className="text-base sm:text-lg text-[#9696A6] leading-relaxed">
            Conte sua ideia. Podemos encontrar a solução ideal para o seu negócio.
          </p>
        </div>

        <div className="flex-shrink-0">
          <a
            href="#orcamento"
            className="group relative inline-flex items-center gap-3.5 px-8 sm:px-10 py-4 sm:py-4.5 rounded-full bg-white text-[#070609] text-sm sm:text-base font-bold tracking-tight hover:bg-[#EFEFF6] hover:-translate-y-0.5 hover:shadow-[0_10px_25px_-5px_rgba(255,255,255,0.2)] transition-all duration-300 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-[#070609]" strokeWidth={2.2} />
            <span>Conversar sobre meu projeto</span>
            <span className="flex items-center justify-center transition-transform duration-250 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowUpRight className="w-4 h-4 text-[#070609]" strokeWidth={2.5} />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};
