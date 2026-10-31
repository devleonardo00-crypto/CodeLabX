import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ServiceItem } from './types';
import { ServiceCard } from './ServiceCard';
import { ConversionCard } from './ConversionCard';

const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'sites-profissionais',
    category: '01 / WEB DEVELOPMENT',
    title: 'Sites profissionais',
    description: 'Experiências digitais exclusivas, rápidas e projetadas para transformar visitantes em oportunidades.',
    demoVariant: 'website',
    colSpanDesktop: 'lg:col-span-7',
    colSpanTablet: 'md:col-span-12',
    isFeatured: true,
  },
  {
    id: 'landing-pages',
    category: '02 / CONVERSÃO',
    title: 'Landing Pages',
    description: 'Páginas estratégicas para campanhas e captação de leads.',
    demoVariant: 'landing',
    colSpanDesktop: 'lg:col-span-5',
    colSpanTablet: 'md:col-span-12',
    isFeatured: false,
  },
  {
    id: 'automacoes-ia',
    category: '03 / INTELIGÊNCIA',
    title: 'Automações com IA',
    description: 'Processos inteligentes para reduzir tarefas manuais.',
    demoVariant: 'automation',
    colSpanDesktop: 'lg:col-span-4',
    colSpanTablet: 'md:col-span-6',
    isFeatured: false,
  },
  {
    id: 'sistemas-web',
    category: '04 / SOFTWARE',
    title: 'Sistemas Web',
    description: 'Plataformas personalizadas para operações complexas.',
    demoVariant: 'system',
    colSpanDesktop: 'lg:col-span-4',
    colSpanTablet: 'md:col-span-6',
    isFeatured: false,
  },
  {
    id: 'desenvolvimento-saas',
    category: '05 / PRODUTOS DIGITAIS',
    title: 'Desenvolvimento SaaS',
    description: 'Produtos digitais escaláveis, do conceito à plataforma.',
    demoVariant: 'saas',
    colSpanDesktop: 'lg:col-span-4',
    colSpanTablet: 'md:col-span-12',
    isFeatured: false,
  },
];

export const ServicesSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const el = sectionRef.current;
    if (!el || animatedRef.current) return;

    if (prefersReducedMotion) {
      // Show immediately without motion
      gsap.set('.services-anim-elem, .bento-card-item, .services-cta-item', {
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

            // 1. Header sequence
            tl.fromTo(
              '.services-eyebrow-anim',
              { opacity: 0, y: 15 },
              { opacity: 1, y: 0, duration: 0.6 }
            )
            .fromTo(
              '.services-heading-anim',
              { opacity: 0, y: 25 },
              { opacity: 1, y: 0, duration: 0.8 },
              '-=0.4'
            )
            .fromTo(
              '.services-desc-anim',
              { opacity: 0, y: 18 },
              { opacity: 1, y: 0, duration: 0.7 },
              '-=0.5'
            )
            // 2. Bento cards staggered entrance
            .fromTo(
              '.bento-card-item',
              { opacity: 0, y: 30, scale: 0.98 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.75,
                stagger: 0.12,
                ease: 'power3.out',
              },
              '-=0.4'
            )
            // 3. CTA item
            .fromTo(
              '.services-cta-item',
              { opacity: 0, y: 24 },
              { opacity: 1, y: 0, duration: 0.8 },
              '-=0.3'
            );
          }, el);

          return () => ctx.revert();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="servicos" 
      className="relative pt-20 pb-28 sm:pt-28 sm:pb-36 px-6 sm:px-12 max-w-[1560px] mx-auto z-10 overflow-hidden"
      aria-labelledby="services-heading"
    >
      {/* Atmosphere Glow Behind Section */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-purple-900/[0.08] rounded-full blur-[130px] pointer-events-none"
        aria-hidden="true" 
      />

      {/* Cabeçalho da Seção com Animação Cinematográfica */}
      <div className="relative z-10 mb-14 sm:mb-20">
        {/* Eyebrow */}
        <div className="services-eyebrow-anim inline-flex items-center gap-3 font-mono text-xs font-semibold uppercase tracking-[0.15em] text-purple-400 mb-6">
          <span className="w-8 h-[1px] bg-purple-400/60" />
          <span>01 / NOSSAS SOLUÇÕES</span>
        </div>

        {/* H2 com revelação e destaque gradiente na palavra "resultados" */}
        <h2 
          id="services-heading"
          className="services-heading-anim text-3xl sm:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.08] tracking-[-0.04em] text-white max-w-4xl mb-6"
        >
          Tecnologia que transforma ideias em{' '}
          <span className="relative inline-block bg-gradient-to-r from-white via-purple-300 via-50% to-purple-500 bg-clip-text text-transparent">
            resultados
            <span className="absolute left-0 bottom-1 sm:bottom-1.5 w-full h-[2px] bg-gradient-to-r from-purple-500 to-transparent opacity-60 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
          </span>
          .
        </h2>

        {/* Descrição */}
        <p className="services-desc-anim text-base sm:text-lg text-[#9696A6] max-w-2xl leading-relaxed font-normal">
          Do primeiro contato com sua marca à automação do seu negócio. Desenvolvemos experiências digitais sob medida para cada desafio.
        </p>
      </div>

      {/* Bento Grid Assimétrico com Stagger */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 lg:gap-7">
        {SERVICES_DATA.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>

      {/* Bloco de Conversão CTA */}
      <div className="services-cta-item relative z-10">
        <ConversionCard />
      </div>
    </section>
  );
};

export default ServicesSection;
