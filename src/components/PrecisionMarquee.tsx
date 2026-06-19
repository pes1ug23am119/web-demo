import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function PrecisionMarquee() {
  const textRef = useRef<HTMLDivElement>(null);

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
        decay = decay * 0.88 + rawVelocity * 0.12;

        const scaleX = Math.max(0.85, Math.min(1.15, 1 - decay * 0.12));
        const skewX = Math.max(-6, Math.min(6, decay * 1.5));
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
    <div className="fixed top-1/2 left-0 right-0 -translate-y-1/2 z-0 pointer-events-none overflow-hidden opacity-[0.07]">
      <div
        ref={textRef}
        className="precision-marquee flex justify-center"
      >
        <span className="px-8">
          Precision engineered for the dentist who accepts nothing less than perfection
        </span>
      </div>
    </div>
  );
}
