import React, { useState, useEffect, useRef } from 'react';
import { 
  Building2, 
  Compass, 
  ArrowUpRight, 
  MapPin, 
  ChevronRight, 
  Check, 
  Sparkles, 
  Layers, 
  Play, 
  Pause 
} from 'lucide-react';

interface ArchitecturalProject {
  id: string;
  name: string;
  subtitle: string;
  location: string;
  area: string;
  year: string;
  materials: string;
  concept: string;
  imageUrl: string;
}

const MAISON_PROJECTS: ArchitecturalProject[] = [
  {
    id: 'horizonte',
    name: 'Residência Horizonte',
    subtitle: 'Intersecção entre relevo e concreto aparente',
    location: 'Serra da Mantiqueira · SP',
    area: '1.240 m²',
    year: '2025',
    materials: 'Concreto pigmentado, aço corten e vidro termoacústico',
    concept:
      'Projetada sobre uma encosta suave, a residência se desdobra em planos horizontais que emolduram a linha dos vales. O piso em pedra travertino flui dos ambientes sociais para o deck suspenso sem degraus ou rupturas visuais.',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'essencia',
    name: 'Casa Essência',
    subtitle: 'Estrutura monolítica em clareira nativa',
    location: 'Curitiba · Bosque São Lourenço',
    area: '860 m²',
    year: '2024',
    materials: 'Madeira laminada colada (MLC), basalto escovado e concreto branco',
    concept:
      'Uma volumetria silenciosa organizada ao redor de um pátio central zenital. A luz natural atua como matéria-prima principal, desenhando sombras geométricas dinâmicas ao longo das estações do ano.',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
  },
];

export const MaisonPreview: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'inicio' | 'projetos' | 'estudio' | 'contato'>('inicio');
  const [selectedProjectId, setSelectedProjectId] = useState<string>('horizonte');
  const [consultationSent, setConsultationSent] = useState<boolean>(false);
  const [clientType, setClientType] = useState<'residencial' | 'institucional'>('residencial');
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const userInteractedRef = useRef<boolean>(false);
  const isVisibleRef = useRef<boolean>(false);

  const currentProject = MAISON_PROJECTS.find((p) => p.id === selectedProjectId) || MAISON_PROJECTS[0];

  // Interrupção manual do usuário
  const handleUserInteraction = () => {
    if (!userInteractedRef.current) {
      userInteractedRef.current = true;
      setIsAutoPlaying(false);
    }
  };

  const handleManualSectionChange = (section: 'inicio' | 'projetos' | 'estudio' | 'contato') => {
    handleUserInteraction();
    setActiveSection(section);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleManualProjectSelect = (id: string) => {
    handleUserInteraction();
    setSelectedProjectId(id);
  };

  const handleConsultation = (e: React.FormEvent) => {
    e.preventDefault();
    handleUserInteraction();
    setConsultationSent(true);
    setTimeout(() => setConsultationSent(false), 5000);
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

  // Ciclo de demonstração automática cinematográfica
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsAutoPlaying(false);
      userInteractedRef.current = true;
      return;
    }

    const steps: { section: 'inicio' | 'projetos' | 'estudio' | 'contato'; project?: string; scrollTop?: number }[] = [
      { section: 'inicio', scrollTop: 0 },
      { section: 'inicio', scrollTop: 220 },
      { section: 'projetos', project: 'horizonte', scrollTop: 0 },
      { section: 'projetos', project: 'essencia', scrollTop: 0 },
      { section: 'estudio', scrollTop: 0 },
    ];

    let currentStepIndex = 0;

    const interval = setInterval(() => {
      if (document.hidden || userInteractedRef.current || !isVisibleRef.current) {
        return;
      }

      currentStepIndex = (currentStepIndex + 1) % steps.length;
      const step = steps[currentStepIndex];

      setActiveSection(step.section);
      if (step.project) {
        setSelectedProjectId(step.project);
      }

      if (scrollContainerRef.current && typeof step.scrollTop === 'number') {
        scrollContainerRef.current.scrollTo({
          top: step.scrollTop,
          behavior: 'smooth',
        });
      }
    }, 5500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="maison-real-website bg-[#F5F4EF] text-[#141416] font-sans rounded-xl overflow-hidden shadow-inner flex flex-col h-[540px] sm:h-[620px] lg:h-[680px] border border-[#E5E3DB] transition-all duration-300"
      onClick={handleUserInteraction}
    >
      {/* ── 1. HEADER DO WEBSITE MAISON ── */}
      <header className="shrink-0 bg-[#F5F4EF]/95 backdrop-blur-md px-5 sm:px-8 py-3.5 border-b border-[#E5E3DB] flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleManualSectionChange('inicio')}
            className="text-left group focus-visible:outline-none"
          >
            <span className="font-serif text-lg sm:text-xl font-bold tracking-[0.28em] text-[#141416] uppercase block">
              M A I S O N
            </span>
            <span className="text-[0.5625rem] font-mono uppercase tracking-[0.22em] text-[#8E8D8A] block">
              Architecture & Spatial Design
            </span>
          </button>
        </div>

        {/* Navegação Interna do Website */}
        <nav className="flex items-center gap-1 sm:gap-2">
          {[
            { id: 'inicio', label: 'Início' },
            { id: 'projetos', label: 'Projetos' },
            { id: 'estudio', label: 'O Estúdio' },
            { id: 'contato', label: 'Contato' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleManualSectionChange(tab.id as typeof activeSection)}
              className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-200 ${
                activeSection === tab.id
                  ? 'bg-[#141416] text-[#F5F4EF] font-semibold shadow-sm'
                  : 'text-[#6B6A66] hover:text-[#141416] hover:bg-[#EAE8E0]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Indicador de Status da Demonstração */}
        <div className="hidden md:flex items-center gap-2.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#EAE8DF] border border-[#DCDAD0] text-[0.625rem] font-mono text-[#6B6A66]">
            {isAutoPlaying ? (
              <>
                <Play className="w-2.5 h-2.5 text-emerald-600" />
                <span>Tour Ativo</span>
              </>
            ) : (
              <>
                <Pause className="w-2.5 h-2.5 text-[#141416]" />
                <span>Manual</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-1 text-[0.625rem] font-mono text-[#8E8D8A] pl-2 border-l border-[#DCDAD0] hidden lg:flex">
            <MapPin className="w-3 h-3 text-[#141416]" />
            <span>SP · ZRH</span>
          </div>
        </div>
      </header>

      {/* ── 2. VIEWPORT COM SCROLL INTERNO NAVEGÁVEL ── */}
      <div 
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto overscroll-contain scroll-smooth selection:bg-[#141416] selection:text-[#F5F4EF]"
        tabIndex={0}
        aria-label="Conteúdo navegável do website MAISON"
        onScroll={() => {
          if (!userInteractedRef.current) {
            handleUserInteraction();
          }
        }}
      >
        {/* SEÇÃO A: HERO INICIAL */}
        {activeSection === 'inicio' && (
          <div className="p-6 sm:p-10 lg:p-12 space-y-10">
            {/* Bloco Editorial de Entrada */}
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 text-[0.625rem] font-mono uppercase tracking-[0.2em] text-[#8E8D8A] bg-[#EAE8DF] px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#141416]" />
                <span>Prática Arquitetônica Contemporânea</span>
              </div>

              {/* H3 Semântico para preservar H1 da página */}
              <h3 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#141416] font-normal leading-[1.08] tracking-[-0.03em] transition-opacity duration-300">
                Arquitetura que transcende o espaço.
              </h3>

              <p className="text-sm sm:text-base text-[#575652] leading-relaxed max-w-xl font-light">
                Projetamos ambientes que traduzem identidade, propósito e permanência. Cada obra é
                um diálogo silencioso entre terreno, luz natural e pureza material.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => handleManualSectionChange('projetos')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#141416] text-[#F5F4EF] text-xs font-mono font-medium hover:bg-[#2C2B30] transition-colors shadow-sm"
                >
                  <span>Explorar Obras Selecionadas</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleManualSectionChange('estudio')}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#D5D3C9] text-[#141416] text-xs font-mono hover:bg-[#EAE8E0] transition-colors"
                >
                  Conheça a Filosofia
                </button>
              </div>
            </div>

            {/* Fotografia Arquitetônica Hero com Especificações */}
            <div className="relative rounded-xl overflow-hidden border border-[#DCDAD0] shadow-md group">
              <div className="aspect-[16/9] sm:aspect-[21/9] w-full bg-[#E5E3DB] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85"
                  alt="Residência Horizonte projetada pelo estúdio MAISON"
                  className="w-full h-full object-cover object-[center_35%] transition-transform duration-1000 ease-out group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* Placa de Especificação Flutuante */}
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-[#F5F4EF]/92 backdrop-blur-md p-4 rounded-lg border border-[#E5E3DB] shadow-lg max-w-md">
                <div className="flex items-center justify-between gap-4 mb-1">
                  <span className="font-serif text-sm font-bold text-[#141416]">
                    Residência Horizonte
                  </span>
                  <span className="font-mono text-[0.625rem] text-[#8E8D8A]">
                    2025 · 1.240 m²
                  </span>
                </div>
                <p className="text-xs text-[#6B6A66] leading-snug">
                  Concreto aparente e planos de vidro contínuos com orientação solar norte.
                </p>
              </div>
            </div>

            {/* Destaque Curto de Projetos no Início */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div 
                onClick={() => {
                  handleManualProjectSelect('horizonte');
                  handleManualSectionChange('projetos');
                }}
                className="p-5 rounded-xl border border-[#E2E0D6] bg-[#EFECE4] hover:border-[#141416]/40 cursor-pointer transition-all duration-200"
              >
                <span className="font-mono text-[0.625rem] uppercase text-[#8E8D8A] block mb-2">Obra 01</span>
                <h4 className="font-serif text-lg font-bold text-[#141416] mb-1">Residência Horizonte</h4>
                <p className="text-xs text-[#575652] mb-3">Serra da Mantiqueira · Concreto e aço corten.</p>
                <span className="inline-flex items-center gap-1 text-xs font-mono font-medium text-[#141416]">
                  Ver estudo de caso <ChevronRight className="w-3 h-3" />
                </span>
              </div>

              <div 
                onClick={() => {
                  handleManualProjectSelect('essencia');
                  handleManualSectionChange('projetos');
                }}
                className="p-5 rounded-xl border border-[#E2E0D6] bg-[#EFECE4] hover:border-[#141416]/40 cursor-pointer transition-all duration-200"
              >
                <span className="font-mono text-[0.625rem] uppercase text-[#8E8D8A] block mb-2">Obra 02</span>
                <h4 className="font-serif text-lg font-bold text-[#141416] mb-1">Casa Essência</h4>
                <p className="text-xs text-[#575652] mb-3">Curitiba · Madeira laminada e basalto escovado.</p>
                <span className="inline-flex items-center gap-1 text-xs font-mono font-medium text-[#141416]">
                  Ver estudo de caso <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>
        )}

        {/* SEÇÃO B: PROJETOS SELECIONADOS (INTERATIVO) */}
        {activeSection === 'projetos' && (
          <div className="p-6 sm:p-10 lg:p-12 space-y-8 animate-fadeIn">
            {/* Header da Seção de Projetos */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#E0DED5]">
              <div>
                <span className="font-mono text-[0.625rem] uppercase tracking-widest text-[#8E8D8A] block mb-1">
                  Catálogo Monográfico
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#141416]">
                  Projetos Selecionados
                </h3>
              </div>

              {/* Seletor entre Projetos */}
              <div className="flex items-center gap-2 p-1 bg-[#EAE8DF] rounded-full border border-[#DCDAD0]">
                {MAISON_PROJECTS.map((proj) => (
                  <button
                    key={proj.id}
                    type="button"
                    onClick={() => handleManualProjectSelect(proj.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
                      selectedProjectId === proj.id
                        ? 'bg-[#141416] text-[#F5F4EF] font-semibold shadow'
                        : 'text-[#6B6A66] hover:text-[#141416]'
                    }`}
                  >
                    {proj.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Visualização Detalhada do Projeto Selecionado */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Imagem do Projeto com Transição Suave */}
              <div className="lg:col-span-7 rounded-xl overflow-hidden border border-[#D5D3CA] bg-[#E8E6DE] shadow">
                <div className="aspect-[16/10] w-full relative overflow-hidden group">
                  <img
                    key={currentProject.id}
                    src={currentProject.imageUrl}
                    alt={currentProject.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute top-3 left-3 bg-[#141416]/85 backdrop-blur-md text-[#F5F4EF] font-mono text-[0.625rem] px-2.5 py-1 rounded">
                    {currentProject.location}
                  </div>
                </div>
              </div>

              {/* Ficha Técnica & Memorial Descritivo */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <h4 className="font-serif text-2xl sm:text-3xl text-[#141416] font-bold">
                    {currentProject.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#73726E] font-serif italic mt-1">
                    {currentProject.subtitle}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-[#4A4945] leading-relaxed">
                  {currentProject.concept}
                </p>

                {/* Grade de Especificações */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#E0DED5]">
                  <div>
                    <span className="font-mono text-[0.5625rem] uppercase text-[#8E8D8A] block">Área Construída</span>
                    <span className="font-mono text-sm font-semibold text-[#141416]">{currentProject.area}</span>
                  </div>
                  <div>
                    <span className="font-mono text-[0.5625rem] uppercase text-[#8E8D8A] block">Ano de Conclusão</span>
                    <span className="font-mono text-sm font-semibold text-[#141416]">{currentProject.year}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="font-mono text-[0.5625rem] uppercase text-[#8E8D8A] block">Materialidade Principal</span>
                    <span className="font-mono text-xs text-[#2A292C]">{currentProject.materials}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => handleManualSectionChange('contato')}
                    className="w-full py-2.5 rounded-lg bg-[#141416] text-[#F5F4EF] font-mono text-xs font-semibold hover:bg-[#2C2B30] transition-colors"
                  >
                    Solicitar Dossiê Completo Desta Obra
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SEÇÃO C: O ESTÚDIO (SOBRE) */}
        {activeSection === 'estudio' && (
          <div className="p-6 sm:p-10 lg:p-12 space-y-8 animate-fadeIn">
            <div className="max-w-2xl space-y-3">
              <span className="font-mono text-[0.625rem] uppercase tracking-widest text-[#8E8D8A] block">
                Manifesto & Método
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#141416] leading-tight">
                Espaço concebido como permanência, não como efemeridade.
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              {[
                {
                  icon: Compass,
                  num: '01',
                  title: 'Rigor Geométrico',
                  desc: 'Proporções matemáticas áureas que harmonizam a relação entre escala humana e vastidão da paisagem.',
                },
                {
                  icon: Layers,
                  num: '02',
                  title: 'Verdade dos Materiais',
                  desc: 'Utilizamos matéria crua — concreto, pedra natural e madeira — que envelhece com nobreza e dignidade.',
                },
                {
                  icon: Building2,
                  num: '03',
                  title: 'Luz como Estrutura',
                  desc: 'Aberturas orientadas para capturar a luz solar sem necessidade de artifícios térmicos ou ornamentos ocos.',
                },
              ].map((pillar) => (
                <div key={pillar.num} className="p-5 rounded-xl bg-[#EFECE4] border border-[#E0DED5] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#141416]">{pillar.num}</span>
                    <pillar.icon className="w-4 h-4 text-[#73726E]" />
                  </div>
                  <h4 className="font-serif text-base font-bold text-[#141416]">{pillar.title}</h4>
                  <p className="text-xs text-[#575652] leading-relaxed">{pillar.desc}</p>
                </div>
              ))}
            </div>

            {/* Imagem Editorial Institucional */}
            <div className="relative rounded-xl overflow-hidden border border-[#D5D3CA] h-52 bg-[#E0DED5]">
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
                alt="Detalhe de concreto e luz no estúdio MAISON"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141416]/70 via-transparent to-transparent flex items-end p-6">
                <p className="text-xs text-[#F5F4EF] font-mono">
                  Ateliê MAISON · São Paulo & Zurique · Mais de 40 obras concluídas em 4 países.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SEÇÃO D: CONTATO (CTA INSTITUCIONAL) */}
        {activeSection === 'contato' && (
          <div className="p-6 sm:p-10 lg:p-12 space-y-6 animate-fadeIn">
            <div className="max-w-xl">
              <span className="font-mono text-[0.625rem] uppercase tracking-widest text-[#8E8D8A] block mb-1">
                Iniciar um Diálogo
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#141416]">
                Vamos criar algo extraordinário.
              </h3>
              <p className="text-xs sm:text-sm text-[#575652] mt-2">
                Atendemos um número restrito de projetos por ano para assegurar dedicação autoral integral.
              </p>
            </div>

            {consultationSent ? (
              <div className="p-6 rounded-xl bg-[#E8F0E8] border border-[#C5DDC5] text-[#1E3B1E] space-y-2">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-emerald-600" />
                  <span className="font-mono text-sm font-bold">Solicitação de Consulta Registrada</span>
                </div>
                <p className="text-xs leading-relaxed">
                  Agradecemos seu interesse na MAISON. Nossa equipe de arquitetura entrará em contato para agendar uma reunião inicial.
                </p>
              </div>
            ) : (
              <form onSubmit={handleConsultation} className="space-y-4 max-w-lg">
                <div>
                  <label className="font-mono text-[0.625rem] uppercase text-[#6B6A66] block mb-1.5">
                    Natureza da Obra
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        handleUserInteraction();
                        setClientType('residencial');
                      }}
                      className={`py-2 px-3 rounded-lg text-xs font-mono text-center border transition-all ${
                        clientType === 'residencial'
                          ? 'bg-[#141416] text-[#F5F4EF] border-[#141416]'
                          : 'bg-[#EFECE4] text-[#141416] border-[#DCDAD0] hover:bg-[#E5E3DB]'
                      }`}
                    >
                      Residência Privada
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        handleUserInteraction();
                        setClientType('institucional');
                      }}
                      className={`py-2 px-3 rounded-lg text-xs font-mono text-center border transition-all ${
                        clientType === 'institucional'
                          ? 'bg-[#141416] text-[#F5F4EF] border-[#141416]'
                          : 'bg-[#EFECE4] text-[#141416] border-[#DCDAD0] hover:bg-[#E5E3DB]'
                      }`}
                    >
                      Espaço Institucional
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-mono text-[0.625rem] uppercase text-[#6B6A66] block mb-1">
                      Localização do Terreno
                    </label>
                    <input
                      type="text"
                      defaultValue="São Paulo, SP"
                      className="w-full px-3 py-2 text-xs rounded-lg bg-[#EFECE4] border border-[#D5D3CA] text-[#141416] focus:outline-none focus:border-[#141416]"
                      required
                      onChange={handleUserInteraction}
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[0.625rem] uppercase text-[#6B6A66] block mb-1">
                      Área Estimada (m²)
                    </label>
                    <input
                      type="text"
                      defaultValue="800 - 1.200 m²"
                      className="w-full px-3 py-2 text-xs rounded-lg bg-[#EFECE4] border border-[#D5D3CA] text-[#141416] focus:outline-none focus:border-[#141416]"
                      required
                      onChange={handleUserInteraction}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-[#141416] text-[#F5F4EF] font-mono text-xs font-semibold hover:bg-[#2C2B30] transition-colors flex items-center justify-center gap-2 shadow"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Enviar Solicitação de Consulta de Projeto</span>
                </button>
              </form>
            )}
          </div>
        )}
      </div>

      {/* ── 3. FOOTER DO SITE MAISON ── */}
      <footer className="shrink-0 bg-[#EFECE4] px-5 sm:px-8 py-3 border-t border-[#E0DED5] flex flex-col sm:flex-row items-center justify-between gap-2 text-[0.625rem] font-mono text-[#8E8D8A]">
        <div>
          <span>MAISON ATELIER ARCHITECTURE © 2026</span>
          <span className="mx-2">·</span>
          <span>TODOS OS DIREITOS RESERVADOS</span>
        </div>
        <div className="flex items-center gap-3">
          <button 
            type="button" 
            onClick={() => handleManualSectionChange('inicio')} 
            className="hover:text-[#141416] transition-colors"
          >
            Voltar ao Início ↑
          </button>
        </div>
      </footer>
    </div>
  );
};
