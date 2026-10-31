import { useState, useEffect, RefObject } from 'react';

interface UseIntersectionVisibilityOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useIntersectionVisibility(
  targetRef: RefObject<HTMLElement>,
  options: UseIntersectionVisibilityOptions = { threshold: 0.05 }
): boolean {
  // Default to true so animations start immediately without waiting for edge-case observer triggers
  const [isInViewport, setIsInViewport] = useState(true);
  const [isTabVisible, setIsTabVisible] = useState(
    typeof document !== 'undefined' ? document.visibilityState === 'visible' : true
  );

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabVisible(document.visibilityState === 'visible');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  useEffect(() => {
    const el = targetRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setIsInViewport(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      {
        threshold: options.threshold || 0.05,
        rootMargin: options.rootMargin || '50px',
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [targetRef, options.threshold, options.rootMargin]);

  return isInViewport && isTabVisible;
}
