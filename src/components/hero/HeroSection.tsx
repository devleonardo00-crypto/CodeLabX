import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { HeroTypography } from './HeroTypography';
import { HeroActions } from './HeroActions';
import { ProjectShowcase } from './ProjectShowcase';
import { AmbientCanvas } from './AmbientCanvas';

export const HeroSection: React.FC = () => {
  const [mouseParallax, setMouseParallax] = useState({ rotX: 0, rotY: 0, glowX: 0, glowY: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  const targetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const currentRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const animFrameRef = useRef<number | null>(null);

  // 1. Sequência de Entrada GSAP
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.hero-line-anim',
        { y: '120%' },
        { y: '0%', duration: 1.1, stagger: 0.14, delay: 0.15 }
      )
      .fromTo(
        '.hero-fade-anim',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.85, stagger: 0.2 },
        '-=0.6'
      )
      .fromTo(
        '.hero-showcase-anim',
        { opacity: 0, scale: 0.96, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'power2.out' },
        '-=0.9'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 2. Parallax Damped com rAF (Cleaned up on unmount)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || window.innerWidth < 1024) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetRef.current = {
        x: (e.clientX / innerWidth - 0.5) * 2,
        y: (e.clientY / innerHeight - 0.5) * 2,
      };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const updateParallax = () => {
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.05;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.05;

      // Base: rotX=4 rotY=-5; delta adicionado pelo mouse
      setMouseParallax({
        rotY: -5 + currentRef.current.x * 4.5,
        rotX: 4 + (-currentRef.current.y * 3),
        glowX: currentRef.current.x * 30,
        glowY: currentRef.current.y * 30,
      });

      animFrameRef.current = requestAnimationFrame(updateParallax);
    };

    animFrameRef.current = requestAnimationFrame(updateParallax);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="inicio" 
      className="relative min-h-screen flex items-center pt-32 pb-20 px-6 sm:px-12 max-w-[1560px] mx-auto z-10 overflow-hidden"
      aria-labelledby="main-title"
    >
      <AmbientCanvas glowX={mouseParallax.glowX} glowY={mouseParallax.glowY} />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] items-center gap-16 xl:gap-20 w-full relative z-10">
        <div>
          <HeroTypography />
          <HeroActions />
        </div>

        <div className="w-full">
          <ProjectShowcase rotX={mouseParallax.rotX} rotY={mouseParallax.rotY} />
        </div>
      </div>
    </section>
  );
};
