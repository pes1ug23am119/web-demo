import { useEffect, useRef, useState } from 'react';

export function useScrollVelocity() {
  const [velocity, setVelocity] = useState(0);
  const lastScrollRef = useRef(0);
  const lastTimeRef = useRef(0);
  const rafRef = useRef<number>(0);
  const decayRef = useRef<number>(0);
  const initializedRef = useRef(false);

  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      if (!initializedRef.current) {
        lastScrollRef.current = window.scrollY || document.documentElement.scrollTop;
        lastTimeRef.current = now;
        initializedRef.current = true;
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const dt = now - lastTimeRef.current;
      if (dt > 0) {
        const currentScroll = window.scrollY || document.documentElement.scrollTop;
        const delta = currentScroll - lastScrollRef.current;
        const rawVelocity = delta / dt; // px per ms
        // Smooth decay
        decayRef.current = decayRef.current * 0.85 + rawVelocity * 0.15;
        setVelocity(decayRef.current);
        lastScrollRef.current = currentScroll;
        lastTimeRef.current = now;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return velocity;
}
