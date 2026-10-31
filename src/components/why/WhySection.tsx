import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { FormaCommonDemo } from './FormaCommonDemo';
import { FormaClxDemo } from './FormaClxDemo';
import { ComparativeCriteria } from './ComparativeCriteria';

/* ─────────────────────────────────────────────
   WhySection — "Por que escolher a CodelabX?"
   Seção 03 · Direção de Arte Editorial & Refinamento Autoral
───────────────────────────────────────────── */

const DIFERENCIAIS = [
  {
    num: '01',
    category: 'ARQUITETURA DE MARCA',
    title: 'Design sob medida',
    description:
      'Cada interface é desenvolvida para refletir a identidade e os objetivos do seu negócio.',
    tags: ['Figma to Code', 'Design System Proprietário', 'UX Estratégico'],
  },
  {
    num: '02',
    category: 'ENGENHARIA FRONT-END',
    title: 'Performance e SEO',
    description:
      'Construímos experiências rápidas, responsivas e preparadas para serem encontradas.',
    tags: ['Core Web Vitals', 'SEO Semântico On-Page', 'Carregamento Ultra-rápido'],
  },
  {
    num: '03',
    category: 'AUTOMAÇÃO & ECOSSISTEMA',
    title: 'Integrações inteligentes',
    description:
      'Conectamos ferramentas, dados e processos para simplificar sua operação.',
    tags: ['APIs & Webhooks', 'Fluxos com IA', 'CRMs & Pagamentos'],
  },
  {
    num: '04',
    category: 'RELACIONAMENTO TÉCNICO',
    title: 'Suporte direto',
    description:
      'Você conversa diretamente com quem desenvolve e acompanha seu projeto.',
    tags: ['Dev-to-Client Direto', 'Sem Intermediários', 'Acompanhamento Contínuo'],
  },
];

/* ── Bloco A: Composição tipográfica de introdução ─────────── */
const BlockIntro: React.FC = () => (
  <div className="why-block-intro relative z-10 mb-20 sm:mb-28 lg:mb-32">
    <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-x-16 xl:gap-x-20 gap-y-6 items-start">
      {/* Coluna esquerda: Eyebrow vertical */}
      <div className="why-anim-intro flex items-center gap-4 lg:flex-col lg:items-start lg:pt-2">
        <span className="block w-8 h-[1px] bg-purple-400/50 lg:hidden" />
        <span className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-purple-400/90">
          02 / O Diferencial
        </span>
        <span className="hidden lg:block w-[1px] h-14 bg-gradient-to-b from-purple-400/60 via-purple-500/20 to-transparent mt-3 origin-top" />
      </div>

      {/* Coluna direita: Título + descrição */}
      <div>
        <h2
          id="why-heading"
          className="why-anim-intro text-3xl sm:text-5xl lg:text-[3.75rem] xl:text-[4.25rem] font-extrabold leading-[1.06] tracking-[-0.04em] text-white mb-6 max-w-4xl"
        >
          O seu negócio merece{' '}
          <br className="hidden sm:block" />
          mais do que{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#EDE9FE] to-purple-300">
            estar online.
          </span>
        </h2>

        <div className="why-anim-intro max-w-xl lg:ml-8 xl:ml-12">
          <p className="text-base sm:text-lg leading-relaxed text-[#9696A6] font-normal">
            A diferença está em como cada detalhe é pensado, desenvolvido e
            conectado aos seus objetivos de negócio.
          </p>
        </div>
      </div>
    </div>
  </div>
);

/* ── Bloco B: Comparativo visual interativo ────────────────── */
const BlockComparative: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'both' | 'common' | 'clx'>('both');

  return (
    <div className="why-block-comparative relative z-10 mb-24 sm:mb-32 lg:mb-36">
      {/* Label de seção e controles de alternância */}
      <div className="why-anim-elem flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <span className="w-8 h-[1px] bg-white/20" />
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-[#A39E93]">
            Estudo Comparativo · Caso: Estúdio FORMA
          </span>
          <span className="hidden md:block w-10 h-[1px] bg-white/[0.05]" />
        </div>

        {/* Controles de visualização acessíveis */}
        <div
          className="inline-flex p-1 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md self-start sm:self-auto shadow-sm"
          role="tablist"
          aria-label="Controle de visualização do comparativo de websites"
        >
          {/* Opção Lado a Lado (Desktop) */}
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'both'}
            onClick={() => setActiveTab('both')}
            className={`hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-400 ${
              activeTab === 'both'
                ? 'bg-white/10 text-white font-semibold shadow-sm border border-white/10'
                : 'text-[#9696A6] hover:text-white'
            }`}
          >
            <span>Lado a Lado</span>
          </button>

          {/* Opção O Comum */}
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'common'}
            onClick={() => setActiveTab('common')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-400 ${
              activeTab === 'common'
                ? 'bg-white/15 text-white font-semibold shadow-sm border border-white/15'
                : 'text-[#9696A6] hover:text-white'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
            <span>O comum</span>
          </button>

          {/* Opção Abordagem CodelabX */}
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'clx'}
            onClick={() => setActiveTab('clx')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-400 ${
              activeTab === 'clx'
                ? 'bg-purple-600/30 text-purple-200 font-semibold shadow-sm border border-purple-500/40'
                : 'text-[#9696A6] hover:text-white'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_6px_rgba(168,85,247,0.8)]" />
            <span>A abordagem CodelabX</span>
          </button>
        </div>
      </div>

      {/* Grade comparativa com transições refinadas */}
      <div
        className={`why-anim-elem grid gap-5 sm:gap-6 transition-all duration-300 ${
          activeTab === 'both'
            ? 'grid-cols-1 lg:grid-cols-2'
            : 'grid-cols-1 lg:grid-cols-2'
        }`}
      >
        {/* ── Lado A: O comum ─────────────────── */}
        <div
          className={`why-comparative-panel why-panel-common group relative rounded-2xl overflow-hidden border bg-[#0A090F] flex flex-col shadow-xl transition-all duration-300 ${
            activeTab === 'common'
              ? 'border-white/20 lg:scale-[1.008] z-10 opacity-100'
              : activeTab === 'clx'
              ? 'hidden lg:flex border-white/[0.04] opacity-50 lg:scale-[0.985] pointer-events-none lg:pointer-events-auto'
              : 'border-white/[0.07] opacity-100'
          }`}
        >
          {/* Header do navegador simulado */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06] bg-[#0D0C12]">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5" aria-hidden="true">
                <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
              </div>
              <div className="px-2.5 py-0.5 rounded bg-black/40 border border-white/5 font-mono text-[10px] text-[#5E5E6E] truncate max-w-[140px] sm:max-w-[200px]">
                https://forma-arquitetura.com.br
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 font-mono text-[9px] text-[#9696A6] uppercase tracking-wider bg-white/[0.03] px-2 py-0.5 rounded border border-white/[0.05]">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
              Solução Padronizada
            </span>
          </div>

          {/* Viewport real do website Comum */}
          <div
            className="why-comparative-content relative h-[440px] sm:h-[480px] bg-white overflow-hidden"
            data-slot="common-interface"
            aria-label="Interface demonstrativa real — O comum: Estúdio FORMA"
          >
            <FormaCommonDemo />
          </div>

          {/* Footer do painel com análise crítica */}
          <div className="p-5 border-t border-white/[0.05] bg-[#0A090F] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-auto">
            <div className="space-y-1">
              <div className="font-mono text-[9.5px] text-[#5E5E6E] uppercase tracking-wider">
                Diagnóstico de Mercado
              </div>
              <h3 className="text-sm font-semibold text-white/70">
                Estrutura convencional de template
              </h3>
              <p className="text-xs text-[#9696A6] leading-relaxed max-w-sm">
                Elementos genéricos sem narrativa autoral, hierarquia plana e comunicação que não transmite autoridade técnica.
              </p>
            </div>

            {/* Indicadores */}
            <div className="flex flex-col gap-1.5 shrink-0">
              {['Sem personalização de marca', 'Hierarquia visual previsível', 'Contato isolado sem contexto'].map(
                (item) => (
                  <div key={item} className="flex items-center gap-2">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      aria-hidden="true"
                      className="shrink-0"
                    >
                      <circle cx="6" cy="6" r="5" stroke="#3F3F4E" strokeWidth="1" />
                      <path
                        d="M4 4l4 4M8 4l-4 4"
                        stroke="#71717A"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="font-mono text-[9.5px] text-[#71717A] tracking-tight">
                      {item}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* ── Lado B: Abordagem CodelabX ──────── */}
        <div
          className={`why-comparative-panel why-panel-clx group relative rounded-2xl overflow-hidden border bg-[#0A090F] flex flex-col shadow-xl transition-all duration-300 ${
            activeTab === 'clx'
              ? 'border-purple-500/40 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(168,85,247,0.15)] lg:scale-[1.008] z-10 opacity-100'
              : activeTab === 'common'
              ? 'hidden lg:flex border-purple-500/15 opacity-55 lg:scale-[0.985] pointer-events-none lg:pointer-events-auto'
              : 'border-purple-500/25 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_20px_rgba(168,85,247,0.08)] opacity-100'
          }`}
        >
          {/* Linha discreta de destaque no topo */}
          <div
            className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-purple-400/50 to-transparent z-30"
            aria-hidden="true"
          />

          {/* Header do navegador simulado */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-purple-500/15 bg-[#0F0D17]">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5" aria-hidden="true">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500/40" />
                <span className="w-2.5 h-2.5 rounded-full bg-purple-400/20" />
                <span className="w-2.5 h-2.5 rounded-full bg-purple-300/15" />
              </div>
              <div className="px-2.5 py-0.5 rounded bg-black/50 border border-purple-500/20 font-mono text-[10px] text-purple-300/90 truncate max-w-[140px] sm:max-w-[200px]">
                https://forma.studio/arquitetura
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 font-mono text-[9px] text-purple-300 uppercase tracking-wider bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_6px_rgba(168,85,247,0.8)] animate-pulse" />
              Experiência Sob Medida
            </span>
          </div>

          {/* Viewport real do website CodelabX */}
          <div
            className="why-comparative-content relative h-[440px] sm:h-[480px] bg-[#0C0B0A] overflow-hidden"
            data-slot="clx-interface"
            aria-label="Interface demonstrativa real — Abordagem CodelabX: Estúdio FORMA"
          >
            <FormaClxDemo />
          </div>

          {/* Footer do painel com análise do diferencial */}
          <div className="p-5 border-t border-purple-500/15 bg-[#0C0B12] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-auto">
            <div className="space-y-1">
              <div className="font-mono text-[9.5px] text-purple-400/80 uppercase tracking-wider">
                A Abordagem CodelabX
              </div>
              <h3 className="text-sm font-semibold text-white">
                Identidade autoral & Direção de arte
              </h3>
              <p className="text-xs text-[#9696A6] leading-relaxed max-w-sm">
                Tipografia editorial, composição assimétrica e jornada projetada para valorizar o portfólio e qualificar os contatos recebidos.
              </p>
            </div>

            {/* Indicadores */}
            <div className="flex flex-col gap-1.5 shrink-0">
              {['Direção de arte personalizada', 'Composição editorial e imersiva', 'Jornada orientada à conversão'].map(
                (item) => (
                  <div key={item} className="flex items-center gap-2">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      aria-hidden="true"
                      className="shrink-0"
                    >
                      <circle cx="6" cy="6" r="5" stroke="rgba(168,85,247,0.4)" strokeWidth="1" />
                      <path
                        d="M3.5 6l2 2 3-3"
                        stroke="#A855F7"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="font-mono text-[9.5px] text-purple-300 tracking-tight font-medium">
                      {item}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 4 Critérios objetivos de diferenciação */}
      <div className="why-anim-elem">
        <ComparativeCriteria />
      </div>
    </div>
  );
};

/* ── Bloco C: Diferenciais em Grid 2x2 Editorial ────────── */
const BlockDiferenciais: React.FC = () => (
  <div className="why-block-diferenciais relative z-10 mb-24 sm:mb-32 lg:mb-36">
    {/* Header Editorial do Bloco C */}
    <div className="why-anim-elem mb-10 sm:mb-12">
      <div className="flex items-center gap-4 mb-4">
        <span className="w-8 h-[1px] bg-white/20" />
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-[#A39E93]">
          03 / Pilares Estratégicos
        </span>
        <span className="flex-1 h-[1px] bg-white/[0.05]" />
      </div>
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white max-w-xl leading-[1.15]">
          Quatro compromissos que definem a{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#EDE9FE] to-purple-300">
            nossa entrega.
          </span>
        </h3>
        <p className="text-sm sm:text-base text-[#9696A6] max-w-md leading-relaxed">
          Cada decisão de engenharia e design é tomada para gerar impacto mensurável e posicionamento de destaque para o seu negócio.
        </p>
      </div>
    </div>

    {/* Grade 2x2 de Cards Sofisticados */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
      {DIFERENCIAIS.map((item) => (
        <div
          key={item.num}
          className="why-anim-elem group relative rounded-2xl border border-white/[0.07] bg-gradient-to-b from-white/[0.025] to-white/[0.008] p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-purple-500/35 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5),0_0_25px_rgba(168,85,247,0.08)] overflow-hidden"
        >
          {/* Shimmer superior */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent group-hover:via-purple-400/60 transition-colors duration-300" />

          {/* Glow suave no hover */}
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-purple-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          <div>
            <div className="flex items-center justify-between gap-4 mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.06]">
                <span className="font-mono text-xs font-bold text-purple-400">
                  {item.num}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#9696A6]">
                  {item.category}
                </span>
              </div>

              <div className="w-8 h-8 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-[#71717A] group-hover:text-purple-200 group-hover:border-purple-400/40 group-hover:bg-purple-500/15 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </div>
            </div>

            <h4 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2.5 group-hover:text-purple-100 transition-colors">
              {item.title}
            </h4>
            <p className="text-sm sm:text-[0.925rem] text-[#9696A6] leading-relaxed mb-6 font-normal">
              {item.description}
            </p>
          </div>

          <div className="pt-4 border-t border-white/[0.05] flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[9.5px] text-[#71717A] bg-white/[0.02] border border-white/[0.05] px-2.5 py-0.5 rounded group-hover:text-purple-300/80 group-hover:border-purple-500/15 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* ── Bloco D: Fechamento com Microinterações Refinadas no CTA ── */
const BlockClosing: React.FC = () => (
  <div className="why-block-closing relative z-10">
    <div className="why-anim-elem w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent mb-14 sm:mb-18" />

    <div className="why-anim-elem flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8">
      <div className="max-w-xl">
        <p className="text-2xl sm:text-3xl lg:text-[2.25rem] font-bold tracking-tight text-white leading-[1.25]">
          Seu próximo projeto merece ser{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#EDE9FE] to-purple-300">
            pensado nos detalhes.
          </span>
        </p>
      </div>

      {/* CTA sóbrio e editorial */}
      <div className="shrink-0">
        <a
          href="#contato"
          className="why-cta-link group relative inline-flex items-center gap-3.5 px-7 py-3.5 rounded-full border border-white/12 bg-white/[0.03] hover:bg-white/[0.08] hover:border-purple-400/40 transition-all duration-200 hover:-translate-y-0.5 shadow-sm active:translate-y-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-400"
          aria-label="Iniciar conversa com a equipe da CodelabX sobre seu projeto"
        >
          <span className="text-sm font-semibold text-white tracking-[-0.01em] group-hover:text-purple-100 transition-colors">
            Vamos conversar
          </span>
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-500/15 border border-purple-500/25 group-hover:bg-purple-500/25 group-hover:border-purple-400/50 transition-all duration-200">
            <svg
              width="11"
              height="11"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden="true"
              className="text-purple-300 group-hover:translate-x-0.5 transition-transform duration-200"
            >
              <path
                d="M2 6h8M7 3l3 3-3 3"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </a>
      </div>
    </div>
  </div>
);

/* ── Componente principal com entrada cinematográfica ───────── */
export const WhySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const el = sectionRef.current;
    if (!el || animatedRef.current) return;

    if (prefersReducedMotion) {
      gsap.set('.why-anim-intro, .why-anim-elem, .why-diferencial-item', {
        opacity: 1,
        y: 0,
        scale: 1,
      });
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          observer.disconnect();

          const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            // 1. Entrada progressiva do Bloco Intro
            tl.fromTo(
              '.why-anim-intro',
              { opacity: 0, y: 24 },
              { opacity: 1, y: 0, duration: 0.75, stagger: 0.1 }
            )
            // 2. Revelação suave do comparativo e controles
            .fromTo(
              '.why-anim-elem',
              { opacity: 0, y: 28 },
              { opacity: 1, y: 0, duration: 0.8, stagger: 0.12 },
              '-=0.4'
            )
            // 3. Stagger elegante nos 4 diferenciais
            .fromTo(
              '.why-diferencial-item',
              { opacity: 0, y: 18 },
              { opacity: 1, y: 0, duration: 0.65, stagger: 0.08, ease: 'power2.out' },
              '-=0.3'
            );
          }, el);

          return () => ctx.revert();
        }
      },
      { threshold: 0.08 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="diferenciais"
      className="relative pt-24 pb-32 sm:pt-32 sm:pb-36 px-6 sm:px-12 max-w-[1560px] mx-auto z-10 overflow-hidden"
      aria-labelledby="why-heading"
    >
      {/* ── Atmosfera de luz sutil e refinada (sem neon exagerado) ── */}
      <div
        className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-purple-950/[0.06] rounded-full blur-[140px] pointer-events-none -translate-y-1/2 translate-x-1/3"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-purple-900/[0.04] rounded-full blur-[110px] pointer-events-none translate-y-1/4 -translate-x-1/4"
        aria-hidden="true"
      />

      {/* ── Linha divisória superior sutil ── */}
      <div
        className="absolute top-0 inset-x-6 sm:inset-x-12 h-[1px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent"
        aria-hidden="true"
      />

      {/* ── Conteúdo da seção ── */}
      <BlockIntro />
      <BlockComparative />
      <BlockDiferenciais />
      <BlockClosing />
    </section>
  );
};

export default WhySection;
