import React from 'react';

export const HeroTypography: React.FC = () => {
  return (
    <div className="relative z-10">
      {/* Eyebrow de Estúdio Digital */}
      <div className="inline-flex items-center gap-3 font-mono text-xs font-semibold uppercase tracking-[0.15em] text-purple-400 mb-8">
        <span className="w-8 h-[1px] bg-purple-400/60" />
        <span>Creative Development • High-End Web</span>
      </div>

      {/* Título Monumental com Máscaras de Revelação */}
      <h1 className="text-[clamp(3rem,5.5vw,5.25rem)] font-extrabold leading-[1.02] tracking-[-0.045em] text-white mb-8" id="main-title">
        <span className="block overflow-hidden pb-1">
          <span className="hero-line-anim inline-block">
            Sites que
          </span>
        </span>
        <span className="block overflow-hidden pb-1">
          <span className="hero-line-anim inline-block">
            <span className="relative inline-block bg-gradient-to-r from-white via-purple-300 via-50% to-purple-500 bg-clip-text text-transparent">
              transformam
              <span className="absolute left-0 bottom-1.5 w-full h-[2px] bg-gradient-to-r from-purple-500 to-transparent opacity-50" />
            </span>
          </span>
        </span>
        <span className="block overflow-hidden pb-1">
          <span className="hero-line-anim inline-block">
            negócios reais.
          </span>
        </span>
      </h1>

      {/* Subtítulo com palavra-chave de SEO estruturada */}
      <p className="hero-fade-anim text-lg leading-[1.7] text-[#9696A6] max-w-[500px] mb-12 font-normal">
        Desenvolvemos sites profissionais, rápidos e estratégicos para transformar sua presença digital em uma ferramenta de aquisição de clientes. Design premium, performance e tecnologia em cada projeto.
      </p>
    </div>
  );
};
