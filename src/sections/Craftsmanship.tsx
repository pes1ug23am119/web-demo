import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WORD = 'PRECISION';
const REPETITIONS = 12;

const Craftsmanship = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const vortexRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const vortex = vortexRef.current;
    const content = contentRef.current;

    if (!section || !vortex || !content) return;

    const ctx = gsap.context(() => {
      // Vortex scroll-driven animation
      const leftItems = leftColumnRef.current?.querySelectorAll('[data-vortex-item]');
      const rightItems = rightColumnRef.current?.querySelectorAll('[data-vortex-item]');

      if (leftItems && rightItems) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });

        tl.addLabel('start')
          .fromTo(
            leftItems,
            { x: '0vw' },
            { x: '-35vw', stagger: 0.05, ease: 'none' },
            'start'
          )
          .fromTo(
            rightItems,
            { x: '0vw' },
            { x: '35vw', stagger: 0.05, ease: 'none' },
            'start'
          );
      }

      // Content entrance
      gsap.fromTo(
        content.children,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: content,
            start: 'top 80%',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const renderVortexColumn = (_isLeft: boolean) => {
    return Array.from({ length: REPETITIONS }, (_, i) => {
      const isEven = i % 2 === 0;
      const progress = (isEven ? i : REPETITIONS - i) / REPETITIONS;
      const rotateY = (1 - progress) * 90 * (isEven ? 1 : -1);
      const y = isEven ? 8 : -8;

      return (
        <div
          key={i}
          data-vortex-item
          className="font-display text-[clamp(1.2rem,5vw,6rem)] font-normal uppercase text-[#fdfdfd]/[0.08] leading-[1.1] whitespace-nowrap transition-transform duration-[1.25s] ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            transform: `translate3d(0, ${y}px, ${-i}px) rotateX(0deg) rotateY(${rotateY}deg) rotateZ(0deg)`,
          }}
        >
          {WORD}
        </div>
      );
    });
  };

  return (
    <section
      ref={sectionRef}
      className="section-dark py-[12vh] md:py-[20vh] min-h-[60vh] md:min-h-[100vh] flex flex-col items-center justify-center overflow-hidden relative"
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, #141417 0%, #080809 100%)',
        }}
      />

      {/* 3D Vortex */}
      <div
        ref={vortexRef}
        className="relative z-10 w-full h-[35vh] md:h-[50vh] flex items-center justify-center overflow-hidden"
        style={{ perspective: '100vw' }}
      >
        <div className="flex items-center justify-center gap-[6vw] md:gap-[10vw]">
          {/* Left Column */}
          <div
            ref={leftColumnRef}
            className="flex flex-col items-center"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {renderVortexColumn(true)}
          </div>

          {/* Right Column */}
          <div
            ref={rightColumnRef}
            className="flex flex-col items-center"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {renderVortexColumn(false)}
          </div>
        </div>
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 text-center mt-8 md:mt-12 px-5 md:px-[6vw] max-w-[800px]"
      >
        <p className="font-body text-[14px] uppercase tracking-[0.2em] text-[#ffffff99] mb-4">
          Precision in Every Detail
        </p>
        <h2 className="font-display text-[clamp(2rem,3.5vw,4rem)] text-[#fdfdfd] leading-[1.1]">
          Authorized Distributor of Leading Global Brands
        </h2>
        <p className="font-body text-[16px] text-[#ffffff99] mt-6 leading-[1.7]">
          We bridge the gap between major global and national dental manufacturers
          and localized practitioners across Civil Lines, Budh Bazar, Kanth Road,
          Line Par, and Station Road.
        </p>
      </div>
    </section>
  );
};

export default Craftsmanship;
