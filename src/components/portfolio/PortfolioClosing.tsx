import React from 'react';

export const PortfolioClosing: React.FC = () => {
  return (
    <div className="portfolio-closing relative z-10 pt-16 sm:pt-20">
      {/* Divisória superior refinada animável */}
      <div className="portfolio-closing-divider-anim w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.1] to-transparent mb-16 sm:mb-20 origin-left" />

      {/* Composição editorial do fechamento */}
      <div className="portfolio-closing-content-anim relative rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.025] to-transparent p-8 sm:p-14 lg:p-16 overflow-hidden transition-all duration-300 hover:border-white/15">
        {/* Luz de atmosfera profunda e controlada */}
        <div
          className="absolute -top-24 right-1/4 w-[400px] h-[300px] bg-purple-950/[0.06] rounded-full blur-[140px] pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Headline e Descrição */}
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.2em] text-purple-400/90">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              <span>Inicie seu projeto com a CodelabX</span>
            </div>

            <h3 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] text-white leading-[1.12]">
              O próximo projeto pode ser o seu.
            </h3>

            <p className="text-base sm:text-lg text-[#9696A6] font-normal leading-relaxed max-w-2xl">
              Vamos transformar sua ideia em uma experiência digital feita para o seu negócio.
            </p>
          </div>

          {/* Chamada para Ação */}
          <div className="lg:col-span-4 flex lg:justify-end">
            <a
              href="#contato"
              className="portfolio-closing-cta-anim group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white text-[#070609] font-semibold text-sm sm:text-base tracking-[-0.01em] shadow-[0_8px_25px_rgba(0,0,0,0.6)] hover:bg-[#F3F0FF] hover:border-purple-300/40 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
              aria-label="Quero criar meu projeto com a CodelabX"
            >
              <span>Quero criar meu projeto</span>
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#070609]/10 group-hover:bg-[#070609]/15 transition-transform duration-200 group-hover:translate-x-1">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  aria-hidden="true"
                  className="text-[#070609]"
                >
                  <path
                    d="M2.5 6h7M6.5 3l3 3-3 3"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </a>
          </div>
        </div>

        {/* Metadados Editoriais do Fechamento */}
        <div className="relative z-10 mt-12 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-white/40">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Consultoria de Arquitetura e Engenharia de Software</span>
          </div>
          <div>
            <span>Atendimento Direto com Liderança Técnica · Sem Intermediários</span>
          </div>
        </div>
      </div>
    </div>
  );
};
