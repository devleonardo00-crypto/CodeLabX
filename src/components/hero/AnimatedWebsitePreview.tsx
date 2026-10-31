import React, { useState, useEffect } from 'react';

const DEMO_PROJECTS = [
  {
    title: 'FinTech SaaS',
    tag: 'Alta Conversão',
    iconColor: '#A855F7',
  },
  {
    title: 'AI Studio 3D',
    tag: 'WebGL / Motion',
    iconColor: '#D8B4FE',
  },
  {
    title: 'Luxury Brand',
    tag: 'E-Commerce',
    iconColor: '#9333EA',
  },
];

export const AnimatedWebsitePreview: React.FC = () => {
  const [activeProject, setActiveProject] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveProject((prev) => (prev + 1) % DEMO_PROJECTS.length);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-full bg-[#080811] overflow-hidden flex flex-col font-sans select-none">
      {/* Barra do navegador simulado */}
      <div className="h-6 bg-[#11111b] flex items-center px-2.5 gap-1.5 border-b border-white/5 shrink-0">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500/80" />
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500/80" />
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
        <div className="flex-1 max-w-[170px] mx-auto h-4 bg-black/40 rounded flex items-center justify-center text-[9px] text-white/60 font-mono tracking-tight">
          codelabx.com/experience
        </div>
      </div>

      {/* Conteúdo interno com scroll animado contínuo */}
      <div className="relative flex-1 overflow-hidden bg-[radial-gradient(ellipse_at_75%_20%,rgba(147,51,234,0.22)_0%,#080811_75%)]">
        <div 
          className="absolute inset-x-0 top-0 p-3.5 transition-transform duration-1000 ease-in-out"
          style={{
            animation: 'simulatedScroll 12s ease-in-out infinite',
          }}
        >
          {/* Header do site simulado */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-[11px] font-extrabold text-white tracking-tight flex items-center gap-0.5">
              Codelab<span className="text-purple-400">X</span>
            </span>
            <div className="flex gap-2.5 text-[8.5px] text-white/60 font-medium">
              <span className="text-white">Início</span>
              <span>Soluções</span>
              <span>Projetos</span>
            </div>
            <span className="text-[7.5px] font-bold px-2 py-0.5 rounded-full bg-purple-600 text-white shadow-sm shadow-purple-500/50">
              Fale conosco
            </span>
          </div>

          {/* Hero Banner do site simulado */}
          <div className="mb-4">
            <h3 className="text-[15px] font-extrabold leading-tight tracking-tight text-white mb-1.5">
              Soluções digitais para empresas que crescem
            </h3>
            <p className="text-[8px] text-[#B4B4C4] leading-relaxed max-w-[240px] mb-2.5">
              Sites, sistemas e interfaces de alto padrão com tecnologia de ponta e foco absoluto em conversão.
            </p>
            <div className="flex gap-1.5">
              <span className="px-2.5 py-1 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 text-[7.5px] font-bold text-white shadow-md shadow-purple-500/30">
                Começar agora ↗
              </span>
            </div>
          </div>

          {/* Grid de Projetos do site simulado com destaque animado */}
          <div className="grid grid-cols-3 gap-2 mt-2">
            {DEMO_PROJECTS.map((proj, idx) => {
              const isSelected = idx === activeProject;
              return (
                <div 
                  key={proj.title}
                  className={`bg-[#141422]/80 border rounded-md p-2 transition-all duration-300 ${
                    isSelected ? 'border-purple-500/60 shadow-lg shadow-purple-500/20 scale-[1.03]' : 'border-purple-500/20'
                  }`}
                >
                  <div className="h-11 rounded bg-gradient-to-br from-purple-900/40 to-[#0e0e1a] mb-1.5 flex items-center justify-center relative overflow-hidden">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ background: proj.iconColor, filter: 'drop-shadow(0 0 6px currentColor)' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_infinite]" />
                  </div>
                  <div className="text-[8px] font-bold text-white">{proj.title}</div>
                  <div className="text-[6.5px] text-purple-400 font-medium">{proj.tag}</div>
                </div>
              );
            })}
          </div>

          {/* Seção adicional visível durante o scroll */}
          <div className="mt-4 p-2.5 rounded-lg bg-white/[0.03] border border-white/5">
            <div className="text-[8.5px] font-bold text-white mb-1">Arquitetura de Alta Performance</div>
            <div className="text-[7px] text-[#B4B4C4]">
              Design responsivo e interatividade refinada garantem até 4x mais retenção de usuários.
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
