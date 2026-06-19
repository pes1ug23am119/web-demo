import { useEffect, useState } from 'react';

interface WindowSize {
  width: number;
  height: number;
}

export function useWindowSize() {
  const [size, setSize] = useState<WindowSize>({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize, { passive: true });
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}
