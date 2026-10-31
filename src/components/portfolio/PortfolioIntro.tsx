import React from 'react';

export const PortfolioIntro: React.FC = () => {
  return (
    <div className="portfolio-intro relative z-10 mb-20 sm:mb-28 lg:mb-32">
      {/* Composição editorial assimétrica */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 lg:gap-x-12 items-start">
        {/* Coluna 1: Eyebrow e Marcador de Seção */}
        <div className="lg:col-span-3 flex lg:flex-col items-center lg:items-start gap-4 lg:gap-3 lg:pt-2">
          <div className="portfolio-eyebrow-anim flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400/90 shadow-[0_0_6px_rgba(168,85,247,0.4)]" />
            <span className="font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-purple-400/90">
              04 / PROJETOS SELECIONADOS
            </span>
          </div>
          <span className="portfolio-vertical-line-anim hidden lg:block w-[1px] h-14 bg-gradient-to-b from-purple-400/50 via-purple-500/20 to-transparent mt-2 origin-top" />
          <span className="lg:hidden flex-1 h-[1px] bg-white/[0.08]" />
        </div>

        {/* Coluna 2: Headline Editorial Sem Gradientes Artificiais */}
        <div className="lg:col-span-9 xl:col-span-6">
          <h2
            id="portfolio-heading"
            className="portfolio-heading-anim text-3xl sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-extrabold leading-[1.08] tracking-[-0.035em] text-white"
          >
            Projetos que mostram o que é possível.
          </h2>
        </div>

        {/* Coluna 3: Descrição e Manifesto Editorial */}
        <div className="lg:col-span-12 xl:col-span-3 lg:pt-2">
          <div className="portfolio-desc-anim space-y-4">
            <p className="text-base sm:text-lg leading-relaxed text-[#9696A6] font-normal max-w-md xl:max-w-none">
              Uma seleção de experiências digitais que combinam design, tecnologia e estratégia.
            </p>

            <div className="pt-4 border-t border-white/[0.07] flex items-center justify-between xl:flex-col xl:items-start gap-3">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
                <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-[#A39E93]">
                  Vitrine Editorial · 3 Formatos
                </span>
              </div>
              <span className="font-mono text-[0.625rem] text-[#5E5E6E] tracking-wider">
                [ 01 Institucional · 02 Conversão · 03 SaaS ]
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Divisória refinada com animação scaleX */}
      <div className="portfolio-divider-anim mt-14 sm:mt-20 w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.1] to-transparent origin-left" />
    </div>
  );
};
