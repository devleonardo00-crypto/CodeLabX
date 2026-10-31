import React from 'react';

interface AmbientLightingProps {
  mouseX?: number;
  mouseY?: number;
}

export const AmbientLighting: React.FC<AmbientLightingProps> = ({ mouseX = 0, mouseY = 0 }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]" aria-hidden="true">
      {/* Grid técnico sutil e elegante */}
      <div 
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(168, 85, 247, 0.035) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(168, 85, 247, 0.035) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 90% 70% at 50% 30%, black 20%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 70% at 50% 30%, black 20%, transparent 85%)',
        }}
      />

      {/* Aura de luz roxa primária com resposta dinâmica ao mouse */}
      <div 
        className="absolute -top-[15%] right-[5%] w-[850px] h-[850px] rounded-full blur-[85px] transition-transform duration-300 ease-out"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.28) 0%, rgba(147, 51, 234, 0.16) 42%, rgba(88, 28, 135, 0.04) 65%, transparent 75%)',
          transform: `translate3d(${mouseX * 25}px, ${mouseY * 25}px, 0)`,
        }}
      />

      {/* Aura secundária no rodapé */}
      <div 
        className="absolute bottom-[5%] right-[15%] w-[650px] h-[650px] rounded-full blur-[90px]"
        style={{
          background: 'radial-gradient(circle, rgba(147, 51, 234, 0.22) 0%, rgba(88, 28, 135, 0.12) 45%, transparent 70%)',
        }}
      />

      {/* Halo circular translúcido atrás do notebook 3D */}
      <div 
        className="absolute top-[10%] right-[2%] w-[680px] h-[680px] rounded-full border border-purple-500/20 opacity-60 pointer-events-none -rotate-12"
        style={{
          boxShadow: '0 0 80px rgba(168, 85, 247, 0.18), inset 0 0 60px rgba(147, 51, 234, 0.12)',
        }}
      />
    </div>
  );
};
