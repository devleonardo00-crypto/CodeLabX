import React from 'react';

export const TerrainPedestal: React.FC = () => {
  return (
    <div className="absolute -bottom-9 -right-5 w-[680px] h-[240px] pointer-events-none z-[5]" aria-hidden="true">
      {/* Base radial de fusão com o fundo preto */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 85%, rgba(147, 51, 234, 0.35) 0%, transparent 70%), linear-gradient(180deg, transparent 0%, rgba(10, 10, 18, 0.85) 60%, #050509 100%)',
        }}
      />
      
      {/* Geometria facetada de rocha escura */}
      <div 
        className="absolute bottom-0 inset-x-0 h-[180px]"
        style={{
          background: 'radial-gradient(ellipse at 60% 70%, #151522 0%, #0c0c14 45%, #050509 90%)',
          clipPath: 'polygon(0% 100%, 5% 75%, 12% 82%, 18% 60%, 25% 68%, 34% 50%, 42% 64%, 53% 45%, 62% 58%, 74% 35%, 83% 48%, 91% 38%, 100% 55%, 100% 100%)',
          boxShadow: 'inset 0 2px 20px rgba(168, 85, 247, 0.4)',
          filter: 'drop-shadow(0 -10px 30px rgba(147, 51, 234, 0.25))',
        }}
      />

      {/* Fissura/cratera cristalina fluorescente em roxo elétrico */}
      <div 
        className="absolute bottom-11 right-28 w-[320px] h-[3px] -rotate-3 blur-[1px] animate-pulse"
        style={{
          background: 'linear-gradient(90deg, transparent, #A855F7, #D8B4FE, #9333EA, transparent)',
          boxShadow: '0 0 15px #A855F7, 0 0 35px #9333EA, 0 0 50px rgba(168, 85, 247, 0.8)',
        }}
      />
    </div>
  );
};
