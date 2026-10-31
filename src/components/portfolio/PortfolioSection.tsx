import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { PortfolioIntro } from './PortfolioIntro';
import { ProjectMaison } from './ProjectMaison';
import { ProjectAura } from './ProjectAura';
import { ProjectOrbit } from './ProjectOrbit';
import { PortfolioClosing } from './PortfolioClosing';

export const PortfolioSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const animatedRef = useRef<boolean>(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const el = sectionRef.current;
    if (!el || animatedRef.current) return;

    if (prefersReducedMotion) {
      gsap.set(
        '.portfolio-eyebrow-anim, .portfolio-heading-anim, .portfolio-desc-anim, .portfolio-divider-anim, .portfolio-sep-anim, .portfolio-closing-divider-anim, .portfolio-closing-content-anim',
        {
          opacity: 1,
          y: 0,
          scaleX: 1,
        }
      );
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          observer.disconnect();

          const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            // 1. Entrada progressiva do Eyebrow
            tl.fromTo(
              '.portfolio-eyebrow-anim',
              { opacity: 0, y: 16 },
              { opacity: 1, y: 0, duration: 0.6 }
            )
            // 2. Revelação do título editorial
            .fromTo(
              '.portfolio-heading-anim',
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.8 },
              '-=0.35'
            )
            // 3. Descrição e manifesto
            .fromTo(
              '.portfolio-desc-anim',
              { opacity: 0, y: 22 },
              { opacity: 1, y: 0, duration: 0.7 },
              '-=0.45'
            )
            // 4. Divisória horizontal sendo desenhada
            .fromTo(
              '.portfolio-divider-anim',
              { scaleX: 0, opacity: 0 },
              { scaleX: 1, opacity: 1, duration: 0.85, ease: 'power2.inOut' },
              '-=0.4'
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
      id="projetos"
      className="portfolio-section relative pt-24 pb-32 sm:pt-32 sm:pb-40 px-6 sm:px-12 max-w-[1560px] mx-auto z-10 overflow-hidden"
      aria-labelledby="portfolio-heading"
    >
      {/* ── Atmosfera de Iluminação Sutil e Estruturada ── */}
      <div
        className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-purple-950/[0.05] rounded-full blur-[140px] pointer-events-none -translate-y-1/2 translate-x-1/4"
        aria-hidden="true"
      />
      <div
        className="absolute top-2/3 left-0 w-[450px] h-[450px] bg-purple-900/[0.04] rounded-full blur-[130px] pointer-events-none -translate-x-1/4"
        aria-hidden="true"
      />

      {/* ── Divisória de Transição Superior ── */}
      <div
        className="absolute top-0 inset-x-6 sm:inset-x-12 h-[1px] bg-gradient-to-r from-transparent via-white/[0.07] to-transparent"
        aria-hidden="true"
      />

      {/* ── 1. Introdução Editorial ── */}
      <PortfolioIntro />

      {/* ── 2. Sequência de Vitrines dos Projetos ── */}
      <div className="portfolio-showcase space-y-4">
        {/* Projeto 01: MAISON (Apresentação Panorâmica Cinematográfica) */}
        <ProjectMaison />

        {/* Separador Rítmico 01 -> 02 */}
        <div
          className="relative py-8 flex items-center justify-between"
          aria-hidden="true"
        >
          <div className="flex items-center gap-3">
            <span className="w-8 h-[1px] bg-white/20" />
            <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-[#A39E93]">
              Transição · Formato 02
            </span>
          </div>
          <div className="portfolio-sep-anim flex-1 mx-6 h-[1px] bg-gradient-to-r from-white/[0.08] via-white/[0.03] to-transparent" />
          <span className="font-mono text-[0.625rem] text-white/30">
            [ E-Commerce & Landing Page ]
          </span>
        </div>

        {/* Projeto 02: AURA (Composição Editorial Deslocada Desktop + Mobile) */}
        <ProjectAura />

        {/* Separador Rítmico 02 -> 03 */}
        <div
          className="relative py-8 flex items-center justify-between"
          aria-hidden="true"
        >
          <div className="flex items-center gap-3">
            <span className="w-8 h-[1px] bg-white/20" />
            <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-[#A39E93]">
              Transição · Formato 03
            </span>
          </div>
          <div className="portfolio-sep-anim flex-1 mx-6 h-[1px] bg-gradient-to-r from-white/[0.08] via-white/[0.03] to-transparent" />
          <span className="font-mono text-[0.625rem] text-white/30">
            [ Plataforma Web & SaaS ]
          </span>
        </div>

        {/* Projeto 03: ORBIT (Composição Técnica de Sistema & Dashboard) */}
        <ProjectOrbit />
      </div>

      {/* ── 3. CTA Final do Portfólio ── */}
      <PortfolioClosing />
    </section>
  );
};

export default PortfolioSection;
