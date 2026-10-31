import React, { useEffect, useRef } from 'react';

export const FormaCommonDemo: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let isScrolledDown = false;
    let timer: NodeJS.Timeout | null = null;

    const performCycle = () => {
      if (document.hidden || isHoveredRef.current || !scrollContainerRef.current) {
        timer = setTimeout(performCycle, 2000);
        return;
      }

      isScrolledDown = !isScrolledDown;
      const targetScroll = isScrolledDown ? 130 : 0;

      scrollContainerRef.current.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });

      const delay = isScrolledDown ? 3400 : 4400;
      timer = setTimeout(performCycle, delay);
    };

    timer = setTimeout(performCycle, 3600);

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  return (
    <div
      ref={scrollContainerRef}
      onMouseEnter={() => { isHoveredRef.current = true; }}
      onMouseLeave={() => { isHoveredRef.current = false; }}
      className="w-full h-full bg-[#FAFAFA] text-[#1F2937] font-sans overflow-y-auto overflow-x-hidden text-[11px] leading-normal select-none transition-colors scroll-smooth"
    >
      {/* Header institucional padrão */}
      <header className="bg-white border-b border-gray-200 px-4 py-2.5 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-[#1F2937] text-white font-bold flex items-center justify-center text-[10px] rounded-sm">
            F
          </div>
          <span className="font-bold text-xs tracking-tight text-gray-900">
            FORMA ARQUITETURA
          </span>
        </div>

        <nav className="hidden sm:flex items-center gap-4 text-gray-600 text-[10px]" aria-label="Navegação da demonstração comum">
          <span className="text-gray-900 font-medium cursor-default">Início</span>
          <span className="hover:text-gray-900 cursor-default transition-colors">Sobre</span>
          <span className="hover:text-gray-900 cursor-default transition-colors">Projetos</span>
          <span className="hover:text-gray-900 cursor-default transition-colors">Serviços</span>
          <span className="hover:text-gray-900 cursor-default transition-colors">Contato</span>
        </nav>

        <button
          type="button"
          className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-medium px-2.5 py-1 rounded text-[10px] transition-all shadow-sm"
        >
          Fale conosco
        </button>
      </header>

      {/* Hero convencional de template comercial */}
      <section className="p-4 sm:p-5 bg-white border-b border-gray-200">
        <div className="max-w-xl mx-auto text-center mb-4">
          <span className="inline-block text-[9px] font-semibold text-blue-700 uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded border border-blue-100 mb-2">
            Escritório de Arquitetura & Interiores
          </span>
          <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-snug mb-1.5">
            Projetamos espaços modernos com qualidade e compromisso
          </h3>
          <p className="text-[10px] text-gray-500 leading-relaxed max-w-sm mx-auto mb-3">
            Atuamos no desenvolvimento de projetos residenciais, comerciais e reformas com foco no cumprimento de prazos e satisfação de cada cliente.
          </p>
          <div className="flex items-center justify-center gap-2">
            <button
              type="button"
              className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-medium px-3 py-1.5 rounded text-[10px] shadow-sm transition-all"
            >
              Solicitar orçamento
            </button>
            <button
              type="button"
              className="bg-gray-100 hover:bg-gray-200 active:scale-95 text-gray-700 font-medium px-3 py-1.5 rounded text-[10px] border border-gray-200 transition-all"
            >
              Ver portfólio
            </button>
          </div>
        </div>

        {/* Imagem retangular padrão sem enquadramento autoral */}
        <div className="relative rounded overflow-hidden border border-gray-200 aspect-[16/9] max-h-44 sm:max-h-52 w-full">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80"
            alt="Fachada residencial convencional"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute bottom-2 left-2 bg-white/95 backdrop-blur-sm px-2 py-0.5 rounded text-[9px] text-gray-700 border border-gray-200 shadow-sm">
            Residência Modelo 04 · Projeto 2024
          </div>
        </div>
      </section>

      {/* Seção de serviços em 3 colunas tradicionais com ícones vetoriais limpos */}
      <section className="p-4 sm:p-5">
        <div className="text-center mb-3">
          <h4 className="font-bold text-xs text-gray-900">Nossos Serviços</h4>
          <p className="text-[9px] text-gray-500">Soluções completas para sua obra</p>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {/* Card 1 */}
          <div className="bg-white p-2.5 rounded border border-gray-200 text-center transition-all hover:border-gray-300 hover:shadow-sm">
            <div className="w-6 h-6 mx-auto mb-1.5 rounded bg-blue-50 text-blue-600 flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <div className="font-semibold text-[10px] text-gray-800 mb-0.5">Residencial</div>
            <div className="text-[8.5px] text-gray-500 line-clamp-2">Projetos completos de casas e sobrados.</div>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-2.5 rounded border border-gray-200 text-center transition-all hover:border-gray-300 hover:shadow-sm">
            <div className="w-6 h-6 mx-auto mb-1.5 rounded bg-blue-50 text-blue-600 flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
                <path d="M9 22v-4h6v4" />
                <path d="M8 6h.01" />
                <path d="M16 6h.01" />
                <path d="M12 6h.01" />
                <path d="M12 10h.01" />
                <path d="M12 14h.01" />
                <path d="M16 10h.01" />
                <path d="M16 14h.01" />
                <path d="M8 10h.01" />
                <path d="M8 14h.01" />
              </svg>
            </div>
            <div className="font-semibold text-[10px] text-gray-800 mb-0.5">Comercial</div>
            <div className="text-[8.5px] text-gray-500 line-clamp-2">Lojas, salas e ambientes corporativos.</div>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-2.5 rounded border border-gray-200 text-center transition-all hover:border-gray-300 hover:shadow-sm">
            <div className="w-6 h-6 mx-auto mb-1.5 rounded bg-blue-50 text-blue-600 flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.3 8.7 8.7 21.3c-1 1-2.5 1-3.4 0l-2.6-2.6c-1-1-1-2.5 0-3.4L15.3 2.7c1-1 2.5-1 3.4 0l2.6 2.6c1 1 1 2.5 0 3.4Z" />
                <path d="m14.5 3.5 6 6" />
                <path d="m9 9 2 2" />
                <path d="m6 12 2 2" />
                <path d="m3 15 2 2" />
              </svg>
            </div>
            <div className="font-semibold text-[10px] text-gray-800 mb-0.5">Interiores</div>
            <div className="text-[8.5px] text-gray-500 line-clamp-2">Design, marcenaria e paginação.</div>
          </div>
        </div>

        {/* Rodapé institucional */}
        <div className="mt-4 pt-3 border-t border-gray-200 flex items-center justify-between text-[8.5px] text-gray-400">
          <span>© 2024 FORMA Arquitetura. Todos os direitos reservados.</span>
          <span>contato@forma-arq.com.br</span>
        </div>
      </section>
    </div>
  );
};
