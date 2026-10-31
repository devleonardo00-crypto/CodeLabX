import { useEffect, useState, useRef } from 'react';

interface ParallaxState {
  x: number;
  y: number;
  rotX: number;
  rotY: number;
}

export function useMouseParallax(intensity: number = 1) {
  const [coords, setCoords] = useState<ParallaxState>({ x: 0, y: 0, rotX: 0, rotY: 0 });
  const targetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const currentRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches || window.innerWidth < 768) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetRef.current = {
        x: (e.clientX / innerWidth - 0.5) * 2,
        y: (e.clientY / innerHeight - 0.5) * 2,
      };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const updateFrame = () => {
      currentRef.current.x = lerp(currentRef.current.x, targetRef.current.x, 0.06);
      currentRef.current.y = lerp(currentRef.current.y, targetRef.current.y, 0.06);

      setCoords({
        x: currentRef.current.x * intensity,
        y: currentRef.current.y * intensity,
        rotX: -currentRef.current.y * 6 * intensity,
        rotY: currentRef.current.x * 7.5 * intensity,
      });

      animFrameRef.current = requestAnimationFrame(updateFrame);
    };

    animFrameRef.current = requestAnimationFrame(updateFrame);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [intensity]);

  return coords;
}
