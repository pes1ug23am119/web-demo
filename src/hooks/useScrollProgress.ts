import { useEffect, useState, useRef } from 'react';

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);
  const lastUpdateRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const p = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
        if (Math.abs(p - lastUpdateRef.current) > 0.0005) {
          lastUpdateRef.current = p;
          setProgress(p);
        }
        rafRef.current = 0;
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return progress;
}
