import { useRef, useEffect } from 'react';

/**
 * Hook de Interatividade 3D dos Bento Cards
 * - Rotação máxima: 4 graus nos eixos X e Y
 * - Elevação suave: 6px
 * - Retorno amortecido: 500ms
 * - Parallax independente de 3 camadas
 * - Zero re-renderizações React durante o mousemove (direto via CSS custom properties)
 */
export function useCard3DTilt<T extends HTMLElement>() {
  const cardRef = useRef<T>(null);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (prefersReducedMotion || isTouch) return;

    // Target values from mouse
    let targetRotX = 0;
    let targetRotY = 0;
    let targetInnerPx = 0;
    let targetInnerPy = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    // Current interpolated values (lerp)
    let currentRotX = 0;
    let currentRotY = 0;
    let currentInnerPx = 0;
    let currentInnerPy = 0;

    let isHovering = false;

    const updateFrame = () => {
      if (!isHovering) return;

      // Smooth linear interpolation (lerp factor 0.14 for natural editorial feel)
      currentRotX += (targetRotX - currentRotX) * 0.14;
      currentRotY += (targetRotY - currentRotY) * 0.14;
      currentInnerPx += (targetInnerPx - currentInnerPx) * 0.14;
      currentInnerPy += (targetInnerPy - currentInnerPy) * 0.14;

      card.style.setProperty('--rot-x', `${currentRotX.toFixed(2)}deg`);
      card.style.setProperty('--rot-y', `${currentRotY.toFixed(2)}deg`);
      card.style.setProperty('--trans-y', '-6px');
      card.style.setProperty('--inner-px', `${currentInnerPx.toFixed(1)}px`);
      card.style.setProperty('--inner-py', `${currentInnerPy.toFixed(1)}px`);
      card.style.setProperty('--mouse-x', `${targetMouseX.toFixed(1)}px`);
      card.style.setProperty('--mouse-y', `${targetMouseY.toFixed(1)}px`);
      card.style.setProperty('--spotlight-opacity', '1');
      card.style.setProperty(
        '--card-shadow',
        '0 22px 44px -12px rgba(0, 0, 0, 0.75), 0 0 32px -4px rgba(168, 85, 247, 0.28)'
      );

      rafId.current = requestAnimationFrame(updateFrame);
    };

    const handleMouseEnter = () => {
      isHovering = true;
      card.style.transition = 'border-color 0.3s ease, box-shadow 0.3s ease, background 0.3s ease';
      card.style.setProperty('--spotlight-opacity', '1');
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(updateFrame);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovering) isHovering = true;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      targetMouseX = x;
      targetMouseY = y;

      // Normalized coordinates (-1 to 1 from card center)
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const normX = (x - centerX) / centerX;
      const normY = (y - centerY) / centerY;

      // Exact 4.0 degrees maximum tilt
      targetRotX = normY * -4.0;
      targetRotY = normX * 4.0;

      // Inner demonstration layer parallax offset: 7px
      targetInnerPx = normX * -7;
      targetInnerPy = normY * -7;
    };

    const handleMouseLeave = () => {
      isHovering = false;
      if (rafId.current) cancelAnimationFrame(rafId.current);

      targetRotX = 0;
      targetRotY = 0;
      targetInnerPx = 0;
      targetInnerPy = 0;
      currentRotX = 0;
      currentRotY = 0;
      currentInnerPx = 0;
      currentInnerPy = 0;

      // Damped spring return within 500ms
      card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease, box-shadow 0.4s ease, background 0.4s ease';
      card.style.setProperty('--rot-x', '0deg');
      card.style.setProperty('--rot-y', '0deg');
      card.style.setProperty('--trans-y', '0px');
      card.style.setProperty('--inner-px', '0px');
      card.style.setProperty('--inner-py', '0px');
      card.style.setProperty('--spotlight-opacity', '0');
      card.style.setProperty('--card-shadow', '0 10px 30px -15px rgba(0, 0, 0, 0.5)');
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mousemove', handleMouseMove, { passive: true });
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return cardRef;
}
