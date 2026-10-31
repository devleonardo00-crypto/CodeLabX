import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Check, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { useIntersectionVisibility } from '../hooks/useIntersectionVisibility';

export const LumierePreview: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<'serum' | 'creme'>('serum');
  const [ctaPulse, setCtaPulse] = useState(false);
  const [formFocused, setFormFocused] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isVisible = useIntersectionVisibility(containerRef);

  // Automated 7-Step Sequence strictly matching requirements:
  // 1. O produto principal aparece.
  // 2. O título é revelado.
  // 3. O CTA recebe uma microinteração.
  // 4. A composição muda para outro produto.
  // 5. Um formulário demonstrativo aparece com foco.
  // 6. Um campo é preenchido visualmente com confirmação.
  // 7. A interface retorna ao estado inicial.
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !isVisible || userInteracted) return;

    let timer: NodeJS.Timeout;
    const timeouts: NodeJS.Timeout[] = [];

    const runSequence = () => {
      // Step 1 & 2: Main product (Sérum) and Title are in place
      setActiveTab('serum');
      setIsSubmitted(false);
      setEmail('');
      setFormFocused(false);
      setCtaPulse(false);

      // Step 3: CTA microinteraction at 1.8s
      timeouts.push(
        setTimeout(() => {
          setCtaPulse(true);
          timeouts.push(setTimeout(() => setCtaPulse(false), 900));
        }, 1800)
      );

      // Step 4: Composition changes to second product (Creme) at 3.4s
      timeouts.push(
        setTimeout(() => {
          setActiveTab('creme');
        }, 3400)
      );

      // Step 5: Demonstrative form highlights at 5.0s
      timeouts.push(
        setTimeout(() => {
          setFormFocused(true);

          // Step 6: Field is visually typed
          const sampleEmail = 'cliente@empresa.com.br';
          let charIdx = 0;
          const typingTimer = setInterval(() => {
            if (charIdx < sampleEmail.length) {
              setEmail(sampleEmail.slice(0, charIdx + 1));
              charIdx++;
            } else {
              clearInterval(typingTimer);
              timeouts.push(
                setTimeout(() => {
                  setIsSubmitted(true);
                  setFormFocused(false);
                }, 400)
              );
            }
          }, 65);
          timeouts.push(typingTimer as unknown as NodeJS.Timeout);
        }, 5000)
      );

      // Step 7: Returns smoothly to initial state at 10.5s
      timeouts.push(
        setTimeout(() => {
          setIsSubmitted(false);
          setEmail('');
          setActiveTab('serum');
        }, 10500)
      );
    };

    runSequence();
    const sequenceInterval = setInterval(runSequence, 11500);

    return () => {
      clearInterval(sequenceInterval);
      timeouts.forEach(clearTimeout);
      if (timer) clearTimeout(timer);
    };
  }, [isVisible, userInteracted]);

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUserInteracted(true);
    if (!email) setEmail('contato@exemplo.com');
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3500);
  };

  const handleManualTab = (tab: 'serum' | 'creme') => {
    setUserInteracted(true);
    setActiveTab(tab);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[270px] sm:h-[295px] rounded-xl overflow-hidden border border-stone-700 bg-[#FAF8F5] text-stone-900 flex flex-col select-none transition-all duration-300 shadow-xl"
      aria-label="Demonstração interativa de Landing Page: Lumière Skincare"
    >
      {/* Top Browser Bar */}
      <div className="flex items-center justify-between px-3.5 py-1.5 bg-[#F2EFE9] border-b border-stone-300 z-20">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-stone-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-stone-300" />
          <span className="w-2.5 h-2.5 rounded-full bg-stone-300" />
        </div>

        <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-white border border-stone-300 font-mono text-[10px] text-stone-700 font-semibold shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
          <span>lumiere-skincare.com</span>
        </div>

        <div className="flex items-center gap-1 font-mono text-[9px] font-bold text-amber-900 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded">
          <span>CONVERSÃO 28.4%</span>
        </div>
      </div>

      {/* Landing Page Content */}
      <div className="relative flex-1 overflow-hidden p-4 sm:p-5 flex flex-col justify-between">
        {/* Header */}
        <header className="flex items-center justify-between pb-2.5 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <span className="font-serif text-sm sm:text-base font-black tracking-[0.22em] text-stone-900">
              LUMIÈRE
            </span>
            <span className="text-[8px] font-mono tracking-widest text-stone-600 uppercase px-1.5 py-0.5 rounded bg-stone-200 font-bold">
              PARIS
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleManualTab(activeTab === 'serum' ? 'creme' : 'serum')}
              className="text-[10px] font-mono font-bold text-stone-700 bg-stone-200/90 hover:bg-stone-300 px-2.5 py-0.5 rounded-full transition-colors cursor-pointer"
            >
              {activeTab === 'serum' ? 'Ver Creme Noturno →' : '← Ver Sérum Radiance'}
            </button>
            <span className="flex items-center gap-1 text-[10px] font-mono font-bold text-amber-900 bg-amber-200/70 px-2 py-0.5 rounded-full">
              <Sparkles className="w-3 h-3 text-amber-800" />
              <span>Alta Conversão</span>
            </span>
          </div>
        </header>

        {/* Hero Section Split Layout */}
        <div className="grid grid-cols-12 gap-3.5 items-center my-auto">
          {/* Left: Copy & Form */}
          <div className="col-span-7 flex flex-col justify-center pr-1">
            <div className="inline-flex items-center gap-1.5 text-[9px] font-mono font-bold uppercase tracking-wider text-amber-800 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
              <span>FÓRMULA BOTÂNICA BIOATIVA</span>
            </div>

            <h4 className="text-base sm:text-lg font-serif font-extrabold text-stone-900 leading-tight tracking-tight mb-1.5">
              Uma nova forma de cuidar de você.
            </h4>

            <p className="text-xs sm:text-[12.5px] text-stone-600 leading-relaxed mb-3 font-normal">
              Skincare essencial, desenvolvido para sua rotina com ativos biotecnológicos.
            </p>

            {/* Demonstrative Lead Capture Form */}
            <form onSubmit={handleManualSubmit} className="relative mb-2.5">
              <div
                className={`flex items-center gap-1.5 p-1 rounded-full bg-white border transition-all duration-300 ${
                  formFocused
                    ? 'border-amber-600 ring-2 ring-amber-400/40 shadow-md'
                    : 'border-stone-300 shadow-sm'
                }`}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setUserInteracted(true);
                    setEmail(e.target.value);
                  }}
                  placeholder="Seu melhor e-mail..."
                  className="flex-1 bg-transparent px-3 text-xs text-stone-900 placeholder-stone-400 focus:outline-none"
                  aria-label="E-mail para demonstração de cadastro"
                />
                <button
                  type="submit"
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap shadow-xs hover:scale-105 active:scale-95 ${
                    ctaPulse
                      ? 'bg-amber-800 text-amber-100 ring-4 ring-amber-400/50 scale-105 shadow-md'
                      : 'bg-stone-900 text-white hover:bg-black'
                  }`}
                >
                  {isSubmitted ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-300" />
                      <span>Cadastrado!</span>
                    </>
                  ) : (
                    <>
                      <span>Conhecer coleção</span>
                      <ArrowRight className="w-3 h-3" />
                    </>
                  )}
                </button>
              </div>

              {/* Toast Feedback */}
              {isSubmitted && (
                <div className="absolute -top-7 left-0 right-0 text-center text-[9px] font-mono font-bold text-emerald-900 bg-emerald-200 border border-emerald-400 px-2 py-0.5 rounded shadow-md animate-fade-in">
                  ✓ Demonstração de captura: Lead registrado no funil!
                </div>
              )}
            </form>

            <div className="flex items-center gap-3 text-[9px] font-mono text-stone-600 font-medium">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Dermatologicamente testado
              </span>
              <span className="flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-rose-500" />
                100% Vegano
              </span>
            </div>
          </div>

          {/* Right: Product Photo & Benefit Tag */}
          <div className="col-span-5 relative">
            <div className="relative rounded-lg overflow-hidden border border-stone-300 bg-white shadow-md p-1 group">
              <img
                src={
                  activeTab === 'serum'
                    ? 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=85'
                    : 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=85'
                }
                alt="Frasco de cosmético Lumière"
                className="w-full h-[125px] sm:h-[135px] object-cover rounded transition-all duration-700 group-hover:scale-105"
                loading="lazy"
              />

              <div className="absolute bottom-2 left-2 right-2 bg-white/95 backdrop-blur-sm p-1.5 rounded border border-stone-200 flex items-center justify-between shadow-xs">
                <div>
                  <span className="block font-serif text-[10px] font-bold text-stone-900 leading-none">
                    {activeTab === 'serum' ? 'Sérum Radiance' : 'Creme Noturno'}
                  </span>
                  <span className="text-[8px] font-mono text-stone-500 font-semibold">
                    {activeTab === 'serum' ? 'Ácido Hialurônico 2%' : 'Biopeptídeos 5%'}
                  </span>
                </div>
                <span className="text-[9px] font-mono font-bold text-amber-900 bg-amber-100 px-1.5 py-0.5 rounded border border-amber-300">
                  {activeTab === 'serum' ? 'R$ 189' : 'R$ 215'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bar */}
        <div className="pt-2 border-t border-stone-200 flex items-center justify-between text-[9px] font-mono text-stone-600 font-medium">
          <span>FUNIL ESTRATÉGICO DE CAPTAÇÃO</span>
          <span className="text-stone-900 font-bold">CORE WEB VITALS 100/100</span>
        </div>
      </div>
    </div>
  );
};
