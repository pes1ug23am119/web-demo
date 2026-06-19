import { useEffect, useState } from 'react';

interface TouchPosition {
  x: number;
  y: number;
  active: boolean;
}

export function useTouchPosition() {
  const [touch, setTouch] = useState<TouchPosition>({ x: 0, y: 0, active: false });

  useEffect(() => {
    const update = (clientX: number, clientY: number, active: boolean) => {
      setTouch({ x: clientX, y: clientY, active });
    };

    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      update(t.clientX, t.clientY, true);
    };
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      update(t.clientX, t.clientY, true);
    };
    const onTouchEnd = () => {
      setTouch((prev) => ({ ...prev, active: false }));
    };

    const onMouseMove = (e: MouseEvent) => {
      update(e.clientX, e.clientY, true);
    };

    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return touch;
}
