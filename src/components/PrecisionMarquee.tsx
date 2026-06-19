import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function PrecisionMarquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const velocityRef = useRef(0);

  useEffect(() => {
    const text = textRef.current;
    if (!text) return;

    const setScaleX = gsap.quickSetter(text, 'scaleX');
    const setSkewX = gsap.quickSetter(text, 'skewX', 'deg');

    let lastScroll = window.scrollY || document.documentElement.scrollTop;
    let lastTime = performance.now();
    let decay = 0;
    let rafId = 0;

    const tick = () => {
      const now = performance.now();
      const dt = now - lastTime;
      if (dt > 0) {
        const currentScroll = window.scrollY || document.documentElement.scrollTop;
        const delta = currentScroll - lastScroll;
        const rawVelocity = delta / dt;
        decay = decay * 0.85 + rawVelocity * 0.15;
        velocityRef.current = decay;

        const scaleX = Math.max(0.7, Math.min(1.3, 1 - decay * 0.15));
        const skewX = Math.max(-8, Math.min(8, decay * 2));
        setScaleX(scaleX);
        setSkewX(skewX);

        lastScroll = currentScroll;
        lastTime = now;
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed top-1/2 left-0 right-0 -translate-y-1/2 z-0 pointer-events-none overflow-hidden opacity-15"
    >
      <div
        ref={textRef}
        className="precision-marquee flex justify-center"
      >
        <span className="px-8">
          Precision engineered for the dentist who accepts nothing less than perfection
        </span>
        <span className="px-8 opacity-50">·</span>
        <span className="px-8">
          Precision engineered for the dentist who accepts nothing less than perfection
        </span>
      </div>
    </div>
  );
}
