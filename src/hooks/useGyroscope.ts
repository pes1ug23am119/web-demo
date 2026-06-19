import { useEffect, useState } from 'react';

interface GyroscopeState {
  gamma: number; // left/right tilt (-90 to 90)
  beta: number;  // front/back tilt (-180 to 180)
  supported: boolean;
}

export function useGyroscope() {
  const [state, setState] = useState<GyroscopeState>({
    gamma: 0,
    beta: 0,
    supported: false,
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !('DeviceOrientationEvent' in window)) return;

    const handler = (e: DeviceOrientationEvent) => {
      setState((prev) => ({
        ...prev,
        gamma: e.gamma ?? 0,
        beta: e.beta ?? 0,
        supported: true,
      }));
    };

    window.addEventListener('deviceorientation', handler, { passive: true });
    return () => window.removeEventListener('deviceorientation', handler);
  }, []);

  return state;
}
