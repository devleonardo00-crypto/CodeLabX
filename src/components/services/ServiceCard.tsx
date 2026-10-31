import React from 'react';
import { 
  Globe, 
  Target, 
  Cpu, 
  Layers, 
  Blocks, 
  ArrowUpRight 
} from 'lucide-react';
import { ServiceItem } from './types';
import { DemoStageCanvas } from './DemoStageCanvas';
import { useCard3DTilt } from './hooks/useCard3DTilt';

interface ServiceCardProps {
  service: ServiceItem;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const cardRef = useCard3DTilt<HTMLElement>();

  const getIcon = () => {
    switch (service.demoVariant) {
      case 'website':
        return <Globe className="w-4 h-4 text-purple-400 group-hover:rotate-12 transition-transform duration-300" strokeWidth={1.8} />;
      case 'landing':
        return <Target className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.8} />;
      case 'automation':
        return <Cpu className="w-4 h-4 text-purple-400 group-hover:rotate-45 transition-transform duration-300" strokeWidth={1.8} />;
      case 'system':
        return <Layers className="w-4 h-4 text-purple-400 group-hover:-translate-y-0.5 transition-transform duration-300" strokeWidth={1.8} />;
      case 'saas':
        return <Blocks className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.8} />;
      default:
        return <ArrowUpRight className="w-4 h-4 text-purple-400" strokeWidth={1.8} />;
    }
  };

  return (
    <article
      ref={cardRef}
      className={`bento-card-item group relative flex flex-col justify-between rounded-2xl sm:rounded-3xl bg-[#0E0D13] border border-white/[0.08] p-6 sm:p-8 lg:p-9 transition-colors duration-300 hover:border-purple-500/50 hover:bg-[#12111A] ${
        service.colSpanDesktop
      } ${service.colSpanTablet || ''}`}
      style={{
        transform: 'perspective(1100px) rotateX(var(--rot-x, 0deg)) rotateY(var(--rot-y, 0deg)) translateY(var(--trans-y, 0px))',
        transformStyle: 'preserve-3d',
        boxShadow: 'var(--card-shadow, 0 10px 30px -15px rgba(0, 0, 0, 0.5))',
        willChange: 'transform',
      }}
    >
      {/* 3D Spotlight Dynamic Illumination */}
      <div 
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300 z-0 overflow-hidden"
        style={{
          opacity: 'var(--spotlight-opacity, 0)',
          background: 'radial-gradient(450px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(168, 85, 247, 0.22), transparent 75%)',
        }}
        aria-hidden="true"
      />

      {/* Ambient Radial Corner Glow */}
      <div 
        className="absolute -top-20 -right-20 w-44 h-44 rounded-full bg-purple-600/[0.08] blur-3xl pointer-events-none group-hover:bg-purple-600/[0.18] transition-all duration-500" 
        aria-hidden="true" 
      />

      {/* Top Meta & Content */}
      <div className="relative z-10" style={{ transform: 'translateZ(15px)' }}>
        {/* Eyebrow & Category Strip */}
        <div className="flex items-center justify-between gap-3 mb-5">
          <div className="inline-flex items-center gap-2 font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-purple-400">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.9)]" />
            <span>{service.category}</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center transition-all duration-300 group-hover:border-purple-500/50 group-hover:bg-purple-500/20 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.35)]">
              {getIcon()}
            </div>
          </div>
        </div>

        {/* Title H3 */}
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2.5">
          {service.title}
        </h3>

        {/* Description with enhanced legibility */}
        <p className="text-sm sm:text-[0.9375rem] text-[#9696A6] leading-relaxed mb-6 font-normal">
          {service.description}
        </p>
      </div>

      {/* Demonstration Space with Parallax Depth */}
      <div 
        className="relative z-10 mt-auto pt-2"
        style={{ 
          transform: 'translate3d(var(--inner-px, 0px), var(--inner-py, 0px), 24px)',
          transition: 'transform 0.15s ease-out',
        }}
      >
        <DemoStageCanvas 
          variant={service.demoVariant} 
          isFeatured={service.isFeatured} 
        />
      </div>
    </article>
  );
};
