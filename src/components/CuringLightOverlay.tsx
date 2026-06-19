import { useEffect, useRef, useState } from 'react';

export default function CuringLightOverlay() {
  const [active, setActive] = useState(false);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const timeoutRef = useRef<number>(0);

  useEffect(() => {
    // Only on touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (!isTouchDevice) return;

    const handleStart = (e: TouchEvent) => {
      const t = e.touches[0];
      setPos({ x: t.clientX, y: t.clientY });
      setActive(true);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };

    const handleMove = (e: TouchEvent) => {
      const t = e.touches[0];
      setPos({ x: t.clientX, y: t.clientY });
    };

    const handleEnd = () => {
      timeoutRef.current = window.setTimeout(() => {
        setActive(false);
      }, 2000);
    };

    window.addEventListener('touchstart', handleStart, { passive: true });
    window.addEventListener('touchmove', handleMove, { passive: true });
    window.addEventListener('touchend', handleEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleStart);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[85] transition-opacity duration-500 ${active ? 'opacity-100' : 'opacity-0'}`}
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.22)',
        WebkitMaskImage: `radial-gradient(circle 110px at ${pos.x}px ${pos.y}px, transparent 0%, black 70%)`,
        maskImage: `radial-gradient(circle 110px at ${pos.x}px ${pos.y}px, transparent 0%, black 70%)`,
      }}
    />
  );
}
