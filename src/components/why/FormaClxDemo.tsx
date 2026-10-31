import React, { useEffect, useRef, useState } from 'react';

interface ProjectSpec {
  id: string;
  name: string;
  location: string;
  area: string;
  year: string;
  category: string;
  materials: string;
  imgUrl: string;
}

const PROJECTS: ProjectSpec[] = [
  {
    id: 'brise',
    name: 'Residência Brise',
    location: 'São Paulo · Jardim Paulistano',
    area: '640 m²',
    year: '2024',
    category: 'Arquitetura Residencial',
    materials: 'Concreto aparente · Madeira freijó · Aço corten',
    imgUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: 'pavilhao',
    name: 'Pavilhão dos Ipês',
    location: 'Ibiúna · Mata Atlântica',
    area: '480 m²',
    year: '2024',
    category: 'Estrutura & Paisagem',
    materials: 'Pedra bruta · Vidro estrutural · Madeira laminada',
    imgUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: 'galeria',
    name: 'Galeria Concreto & Luz',
    location: 'Belo Horizonte · Mangabeiras',
    area: '920 m²',
    year: '2023',
    category: 'Espaço Institucional',
    materials: 'Concreto pigmentado · Aço escovado · Mármore travertino',
    imgUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=85',
  },
];

export const FormaClxDemo: React.FC = () => {
  const [activeProjectId, setActiveProjectId] = useState<string>('brise');
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [mouseParallax, setMouseParallax] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef<boolean>(false);
  const userInteractedRef = useRef<boolean>(false);

  const activeProject = PROJECTS.find((p) => p.id === activeProjectId) || PROJECTS[0];

  // 1. Ciclo demonstrativo automático sincronizado das obras
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      if (document.hidden || isHoveredRef.current || userInteractedRef.current) {
        return;
      }

      setIsTransitioning(true);
      setTimeout(() => {
        setActiveProjectId((curr) => {
          const currentIndex = PROJECTS.findIndex((p) => p.id === curr);
          const nextIndex = (currentIndex + 1) % PROJECTS.length;
          return PROJECTS[nextIndex].id;
        });
        setIsTransitioning(false);
      }, 220);
    }, 4800);

    return () => clearInterval(interval);
  }, []);

  // 2. Scroll demonstrativo interno suave
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let isScrolled = false;
    let scrollTimer: NodeJS.Timeout | null = null;

    const runScroll = () => {
      if (document.hidden || isHoveredRef.current || !scrollContainerRef.current) {
        scrollTimer = setTimeout(runScroll, 2500);
        return;
      }

      isScrolled = !isScrolled;
      scrollContainerRef.current.scrollTo({
        top: isScrolled ? 145 : 0,
        behavior: 'smooth',
      });

      const delay = isScrolled ? 3800 : 4800;
      scrollTimer = setTimeout(runScroll, delay);
    };

    scrollTimer = setTimeout(runScroll, 5200);

    return () => {
      if (scrollTimer) clearTimeout(scrollTimer);
    };
  }, []);

  // 3. Parallax sutil no hover sobre a imagem
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 5;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 5;
    setMouseParallax({ x, y });
  };

  const handleMouseLeaveImage = () => {
    setMouseParallax({ x: 0, y: 0 });
  };

  const handleManualProjectSelect = (id: string) => {
    userInteractedRef.current = true;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveProjectId(id);
      setIsTransitioning(false);
    }, 180);

    // Retoma ciclo automático após 8 segundos de inatividade
    setTimeout(() => {
      userInteractedRef.current = false;
    }, 8000);
  };

  return (
    <div
      ref={scrollContainerRef}
      onMouseEnter={() => { isHoveredRef.current = true; }}
      onMouseLeave={() => { isHoveredRef.current = false; }}
      className="w-full h-full bg-[#0C0B0A] text-[#F8F6F1] font-sans overflow-y-auto overflow-x-hidden text-[11px] leading-normal select-none scroll-smooth"
    >
      {/* Header editorial minimalista */}
      <header className="sticky top-0 z-20 bg-[#0C0B0A]/95 backdrop-blur-md border-b border-white/[0.07] px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-extrabold tracking-[0.24em] text-white">
            FORMA
          </span>
          <span className="hidden sm:inline-block w-[1px] h-3 bg-white/20" />
          <span className="hidden sm:inline-block font-mono text-[8.5px] uppercase tracking-wider text-[#9E988D]">
            Studio de Arquitetura Contemporânea
          </span>
        </div>

        <div className="flex items-center gap-4">
          <nav className="hidden sm:flex items-center gap-3 text-[9.5px] text-[#9E988D] font-mono tracking-wider" aria-label="Navegação da demonstração CodelabX">
            <span className="text-white font-semibold">01 OBRAS</span>
            <span className="hover:text-white transition-colors cursor-default">02 MANIFESTO</span>
            <span className="hover:text-white transition-colors cursor-default">03 CONTATO</span>
          </nav>
          <button
            type="button"
            className="group inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#0C0B0A] text-[9.5px] font-semibold tracking-tight hover:bg-[#D4CAB8] active:scale-95 transition-all shadow-sm"
          >
            <span>Iniciar diálogo</span>
            <span className="text-[8px] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </button>
        </div>
      </header>

      {/* Hero com composição assimétrica editorial */}
      <section className="p-4 sm:p-5 border-b border-white/[0.06]">
        {/* Eyebrow de série e coordenadas */}
        <div className="flex items-center justify-between text-[8.5px] font-mono uppercase tracking-[0.16em] text-[#D4CAB8] mb-3">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4CAB8]" />
            <span>ENSAIO AUTORAL · EDIÇÃO 2024–2025</span>
          </div>
          <span className="text-white/40 tracking-wider">SÃO PAULO · BR</span>
        </div>

        {/* Título editorial e grid assimétrico com transição */}
        <div className="grid grid-cols-1 sm:grid-cols-[1.15fr_0.85fr] gap-4 items-end mb-4">
          <div>
            <h3 className="text-sm sm:text-[1.125rem] font-bold tracking-tight text-white leading-[1.18] mb-2">
              Arquitetura que transforma matéria, luz e tempo em permanência.
            </h3>
            <p className="text-[10px] text-[#A6A094] leading-relaxed max-w-sm">
              Criamos espaços autorais onde a precisão construtiva encontra o silêncio visual. Cada projeto nasce da escuta e da topografia.
            </p>
          </div>

          <div className="sm:text-right font-mono text-[9px] text-white/60 space-y-0.5 border-l sm:border-l-0 sm:border-r border-white/10 pl-2.5 sm:pl-0 sm:pr-2.5">
            <div className="text-[8px] uppercase tracking-wider text-white/40">Obra em catálogo</div>
            <div className={`text-white font-semibold text-[10px] transition-all duration-300 ${isTransitioning ? 'opacity-40 translate-y-0.5' : 'opacity-100 translate-y-0'}`}>
              {activeProject.name}
            </div>
            <div className={`text-[#D4CAB8] text-[8.5px] transition-all duration-300 ${isTransitioning ? 'opacity-40' : 'opacity-100'}`}>
              {activeProject.location}
            </div>
          </div>
        </div>

        {/* Vitrine visual com fotografia arquitetônica de alta escala */}
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeaveImage}
          className="relative rounded-lg overflow-hidden border border-white/10 aspect-[16/9] max-h-48 sm:max-h-56 w-full group cursor-pointer"
        >
          <img
            src={activeProject.imgUrl}
            alt={activeProject.name}
            style={{
              transform: `scale(${isTransitioning ? 1.04 : 1.01}) translate3d(${mouseParallax.x}px, ${mouseParallax.y}px, 0)`,
              opacity: isTransitioning ? 0.7 : 1,
            }}
            className="w-full h-full object-cover transition-all duration-500 will-change-transform"
            loading="lazy"
          />
          {/* Overlay gradiente técnico e refinado */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

          {/* Tag com dados arquitetônicos da obra */}
          <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-end justify-between pointer-events-none">
            <div className="bg-[#0C0B0A]/90 backdrop-blur-md px-2.5 py-1.5 rounded border border-white/10 transition-all duration-300">
              <span className="font-mono text-[8px] uppercase tracking-wider text-[#D4CAB8] block">
                {activeProject.category}
              </span>
              <span className="text-[10px] font-bold text-white block">
                {activeProject.name} — {activeProject.area}
              </span>
              <span className="font-mono text-[7.5px] text-white/50 block mt-0.5">
                {activeProject.materials}
              </span>
            </div>

            <div className="hidden sm:inline-flex items-center gap-1 bg-white/10 backdrop-blur-md px-2 py-1 rounded text-[8.5px] font-mono text-white/90">
              <span>{activeProject.year}</span>
              <span>·</span>
              <span>Obra Concluída</span>
            </div>
          </div>
        </div>
      </section>

      {/* Seção 02: Catálogo de obras com especificações reais */}
      <section className="p-4 sm:p-5">
        <div className="flex items-center justify-between mb-2.5">
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#D4CAB8]">
            Catálogo de Obras Recentes
          </span>
          <span className="text-[8.5px] font-mono text-white/40">3 de 14 projetos documentados</span>
        </div>

        {/* Tabs de alternância interativa das obras */}
        <div className="grid grid-cols-3 gap-1.5 mb-3">
          {PROJECTS.map((project, idx) => {
            const isSelected = project.id === activeProjectId;
            return (
              <button
                key={project.id}
                type="button"
                onClick={() => handleManualProjectSelect(project.id)}
                className={`text-left p-2 rounded transition-all duration-300 border relative ${
                  isSelected
                    ? 'bg-white/[0.08] border-[#D4CAB8]/50 shadow-sm'
                    : 'bg-white/[0.02] border-white/[0.05] hover:bg-white/[0.05] hover:border-white/10'
                }`}
              >
                {isSelected && (
                  <span className="absolute top-1.5 right-1.5 w-1 h-1 rounded-full bg-[#D4CAB8]" />
                )}
                <div className="font-mono text-[8px] text-[#9E988D] mb-0.5">
                  0{idx + 1}
                </div>
                <div className={`font-semibold text-[9.5px] truncate transition-colors ${isSelected ? 'text-white' : 'text-white/70'}`}>
                  {project.name}
                </div>
                <div className="text-[8px] text-white/40 truncate">{project.area}</div>
              </button>
            );
          })}
        </div>

        {/* Rodapé editorial */}
        <div className="pt-2.5 border-t border-white/[0.06] flex items-center justify-between text-[8.5px] text-[#9E988D]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/90" />
            <span className="text-white/80">Estúdio disponível para novos briefs</span>
          </div>
          <span className="font-mono text-[8px] text-[#D4CAB8]">FORMA STUDIO © 2024</span>
        </div>
      </section>
    </div>
  );
};
