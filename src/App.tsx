import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import OperatoryExperience from './components/OperatoryExperience';
import XRayToggle from './components/XRayToggle';
import CuringLightOverlay from './components/CuringLightOverlay';
import HapticRipple from './components/HapticRipple';
import ThumbNav from './components/ThumbNav';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div className="relative">
      <OperatoryExperience />
      <XRayToggle />
      <CuringLightOverlay />
      <HapticRipple />
      <ThumbNav />
    </div>
  );
}

export default App;
