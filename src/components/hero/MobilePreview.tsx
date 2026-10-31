import React from 'react';

interface MobilePreviewProps {
  mouseX?: number;
  mouseY?: number;
}

export const MobilePreview: React.FC<MobilePreviewProps> = ({ mouseX = 0, mouseY = 0 }) => {
  return (
    <div 
      className="absolute bottom-[8%] -right-4 w-[155px] h-[290px] bg-[#0c0c14] rounded-[26px] border-2 border-white/15 p-1.5 shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_35px_rgba(168,85,247,0.35)] z-40 overflow-hidden transition-transform duration-300 ease-out hidden md:block"
      style={{
        transformStyle: 'preserve-3d',
        transform: `translate3d(${mouseX * 12}px, ${mouseY * 12}px, 60px) rotateY(${-22 + mouseX * 4}deg) rotateX(${10 - mouseY * 4}deg)`,
      }}
    >
      {/* Dynamic Island */}
      <div className="w-11 h-2.5 bg-black rounded-full mx-auto mb-1.5 z-10 relative" />

      {/* Viewport Mobile com scroll animado contínuo */}
      <div className="w-full h-[calc(100%-18px)] bg-[#07070e] rounded-[20px] overflow-hidden relative">
        <div 
          className="absolute inset-x-0 top-0 p-2 text-left"
          style={{
            animation: 'phoneSimulatedScroll 10s ease-in-out infinite',
          }}
        >
          <div className="text-[9px] font-extrabold text-white mb-1">CodelabX Mobile</div>
          <div className="text-[10.5px] font-extrabold leading-tight text-white mb-1.5">
            Experiências digitais que <span className="text-purple-400">geram resultados</span>
          </div>

          <div className="bg-[#161622]/90 border border-purple-500/25 rounded-md p-1.5 mb-1.5">
            <div className="text-[8px] font-bold text-white">Mobile First</div>
            <div className="text-[6px] text-zinc-400 mt-0.5">Design responsivo impecável em todos os aparelhos.</div>
          </div>

          <div className="bg-[#161622]/90 border border-purple-500/25 rounded-md p-1.5 mb-1.5">
            <div className="text-[8px] font-bold text-purple-400">Navegação Fluida</div>
            <div className="text-[6px] text-zinc-400 mt-0.5">Velocidade máxima para transformar visitantes em clientes reais.</div>
          </div>

          <div className="bg-purple-600/30 border border-purple-500/30 rounded-md p-1.5 text-center mt-2">
            <div className="text-[7.5px] font-bold text-white">Solicitar Orçamento ↗</div>
          </div>
        </div>
      </div>
    </div>
  );
};
