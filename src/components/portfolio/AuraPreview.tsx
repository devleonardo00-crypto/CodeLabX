import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  ShoppingBag, 
  Check, 
  Star, 
  Leaf, 
  ShieldCheck, 
  SunMedium, 
  Play, 
  Pause 
} from 'lucide-react';

interface AuraPreviewProps {
  variant?: 'desktop' | 'mobile';
}

export const AuraPreview: React.FC<AuraPreviewProps> = ({ variant = 'desktop' }) => {
  const [activeTab, setActiveTab] = useState<'ativos' | 'uso' | 'clinico'>('ativos');
  const [selectedSize, setSelectedSize] = useState<'30ml' | '50ml'>('50ml');
  const [bagCount, setBagCount] = useState<number>(0);
  const [addedToast, setAddedToast] = useState<boolean>(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const userInteractedRef = useRef<boolean>(false);
  const isVisibleRef = useRef<boolean>(false);

  const price = selectedSize === '50ml' ? 'R$ 289' : 'R$ 219';
  const isMobile = variant === 'mobile';

  // Interrupção manual ao primeiro clique do usuário
  const handleUserInteraction = () => {
    if (!userInteractedRef.current) {
      userInteractedRef.current = true;
      setIsAutoPlaying(false);
    }
  };

  const handleAddToCart = () => {
    handleUserInteraction();
    setBagCount((prev) => prev + 1);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3500);
  };

  // Monitorar visibilidade na viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Demonstração automática editorial (apenas se visível e sem interação manual)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsAutoPlaying(false);
      userInteractedRef.current = true;
      return;
    }

    const sequence = [
      { tab: 'ativos' as const, size: '50ml' as const, scroll: 0 },
      { tab: 'clinico' as const, size: '50ml' as const, scroll: 240 },
      { tab: 'ativos' as const, size: '30ml' as const, scroll: 240 },
      { tab: 'ativos' as const, size: '50ml' as const, scroll: 0 },
    ];

    let stepIndex = 0;

    const timer = setInterval(() => {
      if (document.hidden || userInteractedRef.current || !isVisibleRef.current) {
        return;
      }

      stepIndex = (stepIndex + 1) % sequence.length;
      const current = sequence[stepIndex];

      setActiveTab(current.tab);
      setSelectedSize(current.size);

      if (scrollRef.current) {
        scrollRef.current.scrollTo({
          top: current.scroll,
          behavior: 'smooth',
        });
      }
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div 
      ref={containerRef}
      onClick={handleUserInteraction}
      className={`aura-real-landing bg-[#FAF8F5] text-[#292524] font-sans selection:bg-[#292524] selection:text-[#FAF8F5] flex flex-col ${
        isMobile ? 'h-[500px] rounded-xl overflow-hidden' : 'h-[540px] sm:h-[620px] lg:h-[680px] rounded-xl overflow-hidden shadow-inner'
      } border border-[#E7E2DA] transition-all duration-300`}
    >
      {/* ── 1. HEADER DA LANDING PAGE AURA ── */}
      <header className={`shrink-0 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E7E2DA] flex items-center justify-between z-20 ${
        isMobile ? 'px-4 py-2.5' : 'px-5 sm:px-8 py-3.5'
      }`}>
        <div className="flex items-center gap-2">
          <span className="font-serif text-base sm:text-lg font-bold tracking-[0.25em] text-[#1C1917] uppercase">
            A U R A
          </span>
          {!isMobile && (
            <span className="text-[0.5625rem] font-mono uppercase tracking-[0.18em] text-[#78716C] border-l border-[#D6D0C7] pl-2.5 hidden sm:inline">
              Pure Skincare
            </span>
          )}
        </div>

        {!isMobile && (
          <nav className="hidden md:flex items-center gap-6 font-mono text-xs text-[#57534E]">
            <a 
              href="#aura-produto" 
              onClick={(e) => {
                e.preventDefault();
                handleUserInteraction();
                scrollRef.current?.scrollTo({ top: 320, behavior: 'smooth' });
              }}
              className="hover:text-[#1C1917] transition-colors"
            >
              O Sérum
            </a>
            <a 
              href="#aura-beneficios" 
              onClick={(e) => {
                e.preventDefault();
                handleUserInteraction();
                scrollRef.current?.scrollTo({ top: 620, behavior: 'smooth' });
              }}
              className="hover:text-[#1C1917] transition-colors"
            >
              Benefícios
            </a>
            <a 
              href="#aura-filosofia" 
              onClick={(e) => {
                e.preventDefault();
                handleUserInteraction();
                scrollRef.current?.scrollTo({ top: 880, behavior: 'smooth' });
              }}
              className="hover:text-[#1C1917] transition-colors"
            >
              Filosofia
            </a>
          </nav>
        )}

        <div className="flex items-center gap-2 sm:gap-3">
          {!isMobile && (
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#EFECE6] border border-[#DDD8CF] text-[9px] font-mono text-[#78716C] hidden sm:inline-flex">
              {isAutoPlaying ? (
                <>
                  <Play className="w-2 h-2 text-emerald-600" />
                  <span>Demonstração</span>
                </>
              ) : (
                <>
                  <Pause className="w-2 h-2 text-[#1C1917]" />
                  <span>Manual</span>
                </>
              )}
            </div>
          )}

          <button
            type="button"
            onClick={handleAddToCart}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1C1917] text-[#FAF8F5] text-xs font-mono font-medium hover:bg-[#292524] transition-all active:scale-95 shadow-sm"
            aria-label="Adicionar AURA Sérum Essencial à sacola"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Sacola</span>
            <span className="w-4 h-4 rounded-full bg-[#FAF8F5] text-[#1C1917] text-[10px] font-bold flex items-center justify-center">
              {bagCount}
            </span>
          </button>
        </div>
      </header>

      {/* Toast Feedback de Adição Demonstrativa */}
      {addedToast && (
        <div className="bg-[#1C1917] text-[#FAF8F5] px-4 py-2 text-xs font-mono flex items-center justify-between shrink-0 shadow-md animate-fadeIn">
          <div className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span>Sérum Essencial ({selectedSize}) adicionado · Demonstração</span>
          </div>
          <span className="text-[10px] text-white/50">Sacola atualizada</span>
        </div>
      )}

      {/* ── 2. VIEWPORT COM SCROLL DA LANDING PAGE ── */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto overscroll-contain scroll-smooth"
        tabIndex={0}
        aria-label="Conteúdo navegável da landing page AURA"
        onScroll={() => {
          if (!userInteractedRef.current) {
            handleUserInteraction();
          }
        }}
      >
        {/* SEÇÃO HERO */}
        <section className={`border-b border-[#E7E2DA] ${isMobile ? 'p-4 sm:p-5 space-y-4' : 'p-6 sm:p-10 lg:p-12'}`}>
          <div className={`grid grid-cols-1 ${isMobile ? 'gap-5' : 'lg:grid-cols-12 gap-8 lg:gap-12'} items-center`}>
            {/* Texto Hero */}
            <div className={isMobile ? 'space-y-3' : 'lg:col-span-7 space-y-4'}>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#EFECE6] border border-[#DDD8CF] text-[0.625rem] font-mono text-[#57534E]">
                <Sparkles className="w-3 h-3 text-[#B45309]" />
                <span>Edição Limitada · Biotecnologia Botânica</span>
              </div>

              {/* H3 Semântico para preservar H1 da página */}
              <h3 className={`font-serif text-[#1C1917] font-normal leading-[1.1] tracking-[-0.025em] ${
                isMobile ? 'text-2xl' : 'text-3xl sm:text-4xl lg:text-5xl'
              }`}>
                Seu ritual. Sua essência.
              </h3>

              <p className={`text-[#57534E] leading-relaxed font-light ${
                isMobile ? 'text-xs' : 'text-xs sm:text-sm max-w-lg'
              }`}>
                Uma experiência de cuidado pensada para acompanhar a beleza natural da sua pele.
                Fórmula bioativa ultraconcentrada para hidratação e luminosidade duradoura.
              </p>

              {/* Avaliação e Prova Social */}
              <div className="flex items-center gap-3 pt-1">
                <div className="flex items-center gap-0.5 text-[#B45309]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#B45309]" />
                  ))}
                </div>
                <span className="font-mono text-xs font-bold text-[#1C1917]">4.9 / 5.0</span>
                <span className="text-xs text-[#78716C] font-mono">(920+ clientes)</span>
              </div>

              {/* Botão de Conversão Principal */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="px-6 py-2.5 rounded-lg bg-[#1C1917] text-[#FAF8F5] text-xs font-mono font-semibold hover:bg-[#292524] transition-all shadow-md flex items-center gap-2"
                >
                  <span>Adquirir Ritual</span>
                  <span className="opacity-70 font-normal">· {price}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleUserInteraction();
                    scrollRef.current?.scrollTo({ top: 320, behavior: 'smooth' });
                  }}
                  className="px-4 py-2.5 rounded-lg border border-[#D6D0C7] text-[#1C1917] text-xs font-mono hover:bg-[#EFECE6] transition-colors"
                >
                  Conheça a Coleção
                </button>
              </div>
            </div>

            {/* Imagem Editorial do Produto Principal */}
            <div className={isMobile ? 'w-full' : 'lg:col-span-5'}>
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden border border-[#DCD8D0] bg-[#EAE5DC] shadow-md group">
                <img
                  src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80"
                  alt="Frasco de vidro âmbar do AURA Sérum Essencial"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />

                <div className="absolute top-3 left-3 bg-[#FAF8F5]/90 backdrop-blur-md px-2.5 py-1 rounded font-mono text-[0.625rem] text-[#1C1917]">
                  Fórmula N° 07 · Sérum Essencial
                </div>

                <div className="absolute bottom-3 right-3 bg-[#FAF8F5]/90 backdrop-blur-md px-2.5 py-1 rounded font-mono text-[0.625rem] text-[#1C1917]">
                  100% Vegano
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SEÇÃO PRODUTO PRINCIPAL DETALHADO */}
        <section id="aura-produto" className={`border-b border-[#E7E2DA] ${isMobile ? 'p-4 sm:p-5 space-y-4' : 'p-6 sm:p-10 lg:p-12 space-y-6'}`}>
          <div className="max-w-2xl">
            <span className="font-mono text-[0.625rem] uppercase tracking-widest text-[#78716C] block mb-1">
              Fórmula Bioativa
            </span>
            <h4 className="font-serif text-2xl sm:text-3xl text-[#1C1917]">
              AURA — Sérum Essencial
            </h4>
            <p className="text-xs sm:text-sm text-[#57534E] mt-1.5 leading-relaxed">
              Desenvolvido com bakuchiol botânico (alternativa suave ao retinol), peptídeos biomiméticos e esqualano vegetal puro.
            </p>
          </div>

          {/* Seletor de Volume (Interativo) */}
          <div className="space-y-2">
            <span className="font-mono text-[0.625rem] uppercase text-[#78716C] block">
              Selecione o Volume:
            </span>
            <div className="inline-flex p-1 bg-[#EFECE6] rounded-lg border border-[#DDD8CF]">
              <button
                type="button"
                onClick={() => {
                  handleUserInteraction();
                  setSelectedSize('30ml');
                }}
                className={`px-3 py-1 rounded text-xs font-mono transition-all ${
                  selectedSize === '30ml'
                    ? 'bg-[#1C1917] text-[#FAF8F5] font-semibold'
                    : 'text-[#57534E] hover:text-[#1C1917]'
                }`}
              >
                30 ml · R$ 219
              </button>
              <button
                type="button"
                onClick={() => {
                  handleUserInteraction();
                  setSelectedSize('50ml');
                }}
                className={`px-3 py-1 rounded text-xs font-mono transition-all ${
                  selectedSize === '50ml'
                    ? 'bg-[#1C1917] text-[#FAF8F5] font-semibold'
                    : 'text-[#57534E] hover:text-[#1C1917]'
                }`}
              >
                50 ml · R$ 289 (Mais Escolhido)
              </button>
            </div>
          </div>

          {/* Abas Informativas do Produto (Fórmula, Uso, Clínico) */}
          <div className="p-4 sm:p-6 rounded-xl bg-[#F4F1EB] border border-[#E2DDD4] space-y-4">
            <div className="flex border-b border-[#DDD8CF] pb-2 gap-4 font-mono text-xs">
              {[
                { id: 'ativos', label: 'Fórmula & Ativos' },
                { id: 'uso', label: 'Modo de Aplicação' },
                { id: 'clinico', label: 'Eficácia Comprovada' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    handleUserInteraction();
                    setActiveTab(tab.id as typeof activeTab);
                  }}
                  className={`pb-1 transition-all ${
                    activeTab === tab.id
                      ? 'text-[#1C1917] font-bold border-b-2 border-[#1C1917]'
                      : 'text-[#78716C] hover:text-[#1C1917]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {activeTab === 'ativos' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs animate-fadeIn">
                <div className="p-2.5 rounded bg-[#FAF8F5] border border-[#DDD8CF]">
                  <span className="font-mono font-bold block text-[#1C1917]">Bakuchiol 2.5%</span>
                  <span className="text-[#57534E] text-[11px]">Estimula colágeno sem causar fotossensibilidade.</span>
                </div>
                <div className="p-2.5 rounded bg-[#FAF8F5] border border-[#DDD8CF]">
                  <span className="font-mono font-bold block text-[#1C1917]">Esqualano da Cana</span>
                  <span className="text-[#57534E] text-[11px]">Hidratação biocompatível idêntica aos lipídios da pele.</span>
                </div>
                <div className="p-2.5 rounded bg-[#FAF8F5] border border-[#DDD8CF]">
                  <span className="font-mono font-bold block text-[#1C1917]">Niacinamida Pura 5%</span>
                  <span className="text-[#57534E] text-[11px]">Uniformização do tom e controle de poros visíveis.</span>
                </div>
              </div>
            )}

            {activeTab === 'uso' && (
              <div className="space-y-2 text-xs text-[#57534E] animate-fadeIn">
                <p>1. Pela manhã e à noite, higienize suavemente o rosto.</p>
                <p>2. Aplique de 3 a 4 gotas na palma da mão e pressione delicadamente sobre rosto e pescoço.</p>
                <p>3. Pela manhã, finalize sempre com seu protetor solar de preferência.</p>
              </div>
            )}

            {activeTab === 'clinico' && (
              <div className="grid grid-cols-3 gap-2 text-center text-xs animate-fadeIn">
                <div className="p-2 rounded bg-[#FAF8F5] border border-[#DDD8CF]">
                  <span className="font-mono text-base font-bold text-[#1C1917] block">94%</span>
                  <span className="text-[10px] text-[#78716C]">Sentiram hidratação imediata</span>
                </div>
                <div className="p-2 rounded bg-[#FAF8F5] border border-[#DDD8CF]">
                  <span className="font-mono text-base font-bold text-[#1C1917] block">89%</span>
                  <span className="text-[10px] text-[#78716C]">Notaram linhas atenuadas em 28d</span>
                </div>
                <div className="p-2 rounded bg-[#FAF8F5] border border-[#DDD8CF]">
                  <span className="font-mono text-base font-bold text-[#1C1917] block">97%</span>
                  <span className="text-[10px] text-[#78716C]">Aprovaram a textura sedosa</span>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* SEÇÃO TRÊS BENEFÍCIOS */}
        <section id="aura-beneficios" className={`border-b border-[#E7E2DA] ${isMobile ? 'p-4 sm:p-5 space-y-4' : 'p-6 sm:p-10 lg:p-12 space-y-6'}`}>
          <div className="max-w-xl">
            <span className="font-mono text-[0.625rem] uppercase tracking-widest text-[#78716C] block mb-1">
              Resultados Visíveis
            </span>
            <h4 className="font-serif text-2xl sm:text-3xl text-[#1C1917]">
              Três pilares de transformação cutânea.
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                icon: Leaf,
                title: 'Nutrição Celular Profunda',
                desc: 'Reposição de lipídios essenciais sem obstruir os poros nem deixar resíduo oleoso.',
              },
              {
                icon: ShieldCheck,
                title: 'Barreira Cutânea Fortalecida',
                desc: 'Proteção ativa contra o estresse oxidativo, poluição urbana e radiação azul.',
              },
              {
                icon: SunMedium,
                title: 'Luminosidade Natural',
                desc: 'Restauração do viço e brilho saudável desde as primeiras semanas de aplicação contínua.',
              },
            ].map((ben, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#F4F1EB] border border-[#E2DDD4] space-y-2">
                <ben.icon className="w-5 h-5 text-[#B45309]" />
                <h5 className="font-serif text-sm font-bold text-[#1C1917]">{ben.title}</h5>
                <p className="text-xs text-[#57534E] leading-relaxed">{ben.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SEÇÃO NOSSA FILOSOFIA */}
        <section id="aura-filosofia" className={`border-b border-[#E7E2DA] ${isMobile ? 'p-4 sm:p-5 space-y-4' : 'p-6 sm:p-10 lg:p-12 space-y-6'}`}>
          <div className="max-w-2xl space-y-3">
            <span className="font-mono text-[0.625rem] uppercase tracking-widest text-[#78716C] block">
              Nossa Filosofia
            </span>
            <blockquote className="font-serif text-lg sm:text-2xl text-[#1C1917] italic leading-snug">
              &ldquo;Acreditamos na simplicidade radical: menos passos, maior concentração e respeito absoluto aos ciclos biológicos da pele.&rdquo;
            </blockquote>
            <p className="text-xs text-[#78716C] font-mono">
              Fórmulas limpas · Sem fragrâncias sintéticas · Cruelty-free verificado.
            </p>
          </div>
        </section>

        {/* SEÇÃO CTA FINAL */}
        <section className={`bg-[#EFECE6] text-center ${isMobile ? 'p-6 space-y-3' : 'p-8 sm:p-12 space-y-4'}`}>
          <h4 className="font-serif text-2xl sm:text-3xl text-[#1C1917]">
            Descubra seu novo ritual.
          </h4>
          <p className="text-xs sm:text-sm text-[#57534E] max-w-md mx-auto">
            Experimente o AURA Sérum Essencial e sinta o equilíbrio e a pureza botânica na sua pele.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={handleAddToCart}
              className="px-8 py-3 rounded-full bg-[#1C1917] text-[#FAF8F5] font-mono text-xs font-semibold hover:bg-[#292524] transition-all shadow-md inline-flex items-center gap-2"
            >
              <span>Comprar Agora ({price})</span>
              <Sparkles className="w-3.5 h-3.5" />
            </button>
          </div>
        </section>
      </div>

      {/* FOOTER DA LANDING PAGE AURA */}
      <footer className="shrink-0 bg-[#F4F1EB] px-5 py-2.5 border-t border-[#E7E2DA] flex items-center justify-between text-[0.625rem] font-mono text-[#78716C]">
        <span>AURA BOTANICALS CO. · DEMO CONCEITUAL</span>
        <span>ENVIO EM 24H · FRETE GRÁTIS</span>
      </footer>
    </div>
  );
};
