import React from 'react';
import { AnimatedWebsitePreview } from './AnimatedWebsitePreview';

interface LaptopSceneProps {
  mouseX?: number;
  mouseY?: number;
}

export const LaptopScene: React.FC<LaptopSceneProps> = ({ mouseX = 0, mouseY = 0 }) => {
  return (
    <div 
      className="absolute top-[48%] left-[45%] w-[530px] h-[345px] z-20 origin-center transition-transform duration-200 ease-out"
      style={{
        transformStyle: 'preserve-3d',
        transform: `translate3d(-50%, -50%, 0) rotateX(${14 + mouseY * 4}deg) rotateY(${-18 + mouseX * 5}deg) rotateZ(3deg)`,
      }}
    >
      {/* 1. TELA / TAMPA DO LAPTOP */}
      <div 
        className="relative w-[520px] h-[330px] bg-[#0c0c14] rounded-2xl p-2.5 shadow-[0_0_0_1.5px_rgba(255,255,255,0.12),0_0_0_3px_rgba(168,85,247,0.22),0_30px_80px_-15px_rgba(0,0,0,0.95),0_0_60px_rgba(147,51,234,0.35)] origin-bottom"
        style={{
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden',
        }}
      >
        {/* Reflexo chanfrado e notch de câmera */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-purple-500/10 pointer-events-none z-10" />
        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#050508] rounded-full border border-white/20 z-15" />

        {/* Display ativo com site vivo */}
        <div className="relative w-full h-full rounded-lg overflow-hidden shadow-[inset_0_0_25px_rgba(0,0,0,0.85)]">
          <AnimatedWebsitePreview />
        </div>
      </div>

      {/* 2. BASE DE ALUMÍNIO E TECLADO EM PERSPECTIVA */}
      <div 
        className="absolute top-[305px] -left-3 w-[550px] h-[280px] bg-gradient-to-b from-[#181824] via-[#0d0d15] to-[#08080d] rounded-b-3xl px-9 py-4 flex flex-col items-center shadow-[0_15px_45px_rgba(0,0,0,0.9),0_0_50px_rgba(147,51,234,0.25),inset_0_2px_4px_rgba(255,255,255,0.2)] origin-top"
        style={{
          transform: 'rotateX(74deg)',
        }}
      >
        {/* Recuo do teclado */}
        <div className="w-[92%] h-[135px] bg-[#09090f] rounded-lg border border-white/5 shadow-[inset_0_3px_10px_rgba(0,0,0,0.7)] p-1.5 grid grid-rows-5 gap-1">
          {Array.from({ length: 5 }).map((_, rIdx) => (
            <div key={rIdx} className="flex gap-1 w-full">
              {Array.from({ length: rIdx === 4 ? 6 : 12 }).map((_, kIdx) => (
                <div 
                  key={kIdx} 
                  className={`bg-[#14141e] rounded-[2px] shadow-sm border-t border-white/10 ${rIdx === 4 && kIdx === 2 ? 'flex-[4]' : 'flex-1'}`} 
                />
              ))}
            </div>
          ))}
        </div>

        {/* Trackpad metálico */}
        <div className="w-36 h-18 mt-3 bg-[#12121c] rounded-md border border-white/10 shadow-[inset_0_1px_3px_rgba(0,0,0,0.6)]" />
      </div>
    </div>
  );
};
