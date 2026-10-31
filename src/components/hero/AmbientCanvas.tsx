import React from 'react';

interface AmbientCanvasProps {
  glowX?: number;
  glowY?: number;
}

export const AmbientCanvas: React.FC<AmbientCanvasProps> = ({ glowX = 0, glowY = 0 }) => {
  return (
    <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden" aria-hidden="true">
      {/* Grade arquitetural discreta */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(circle at 60% 40%, black 15%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(circle at 60% 40%, black 15%, transparent 75%)',
        }}
      />

      {/* Brilho radial focado com moderação */}
      <div 
        className="absolute top-[15%] right-[5%] w-[700px] h-[700px] rounded-full blur-[80px] transition-transform duration-300 ease-out"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, rgba(88, 28, 135, 0.05) 50%, transparent 70%)',
          transform: `translate3d(${glowX}px, ${glowY}px, 0)`,
        }}
      />
    </div>
  );
};
