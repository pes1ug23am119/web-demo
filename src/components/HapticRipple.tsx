import { useEffect, useState } from 'react';

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export default function HapticRipple() {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (!isTouchDevice) return;

    const handleTap = (e: TouchEvent) => {
      const t = e.touches[0] || e.changedTouches[0];
      const id = Date.now() + Math.random();
      setRipples((prev) => [...prev, { id, x: t.clientX, y: t.clientY }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 2000);
    };

    window.addEventListener('touchstart', handleTap, { passive: true });
    return () => window.removeEventListener('touchstart', handleTap);
  }, []);

  return (
    <>
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="haptic-ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 120,
            height: 120,
          }}
        />
      ))}
    </>
  );
}
