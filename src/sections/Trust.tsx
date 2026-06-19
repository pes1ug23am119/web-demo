import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, UserCheck, TrendingDown, Handshake } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Trust = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const signalsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current?.children || [],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
          },
        }
      );

      // Interactive grid tiles animation
      const tiles = gridRef.current?.querySelectorAll('.trust-tile');
      if (tiles) {
        gsap.fromTo(
          tiles,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            stagger: {
              each: 0.02,
              from: 'center',
            },
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 75%',
            },
          }
        );
      }

      gsap.fromTo(
        textRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        signalsRef.current?.children || [],
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: signalsRef.current,
            start: 'top 85%',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  // Generate grid tiles with varying opacity for depth
  const tiles = Array.from({ length: 144 }, (_, i) => {
    const row = Math.floor(i / 12);
    const col = i % 12;
    const distFromCenter = Math.sqrt(
      Math.pow(row - 5.5, 2) + Math.pow(col - 5.5, 2)
    );
    const baseOpacity = Math.max(0.03, 0.25 - distFromCenter * 0.02);
    const isHighlighted = Math.random() > 0.85;

    return {
      id: i,
      opacity: baseOpacity,
      highlighted: isHighlighted,
      highlightColor: ['#2b6cb0', '#63b3ed', '#4a5568'][Math.floor(Math.random() * 3)],
    };
  });

  const trustSignals = [
    { icon: Clock, text: 'Quick supply turnarounds' },
    { icon: UserCheck, text: 'Face-to-face dealer interactions' },
    { icon: TrendingDown, text: 'Bulk order reductions' },
    { icon: Handshake, text: 'Personalized pricing' },
  ];

  return (
    <section ref={sectionRef} className="section-warm py-[12vh] md:py-[20vh] overflow-hidden">
      <div className="px-5 md:px-[6vw] max-w-[1400px] mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-10 md:mb-16">
          <p className="font-body text-[12px] md:text-[14px] uppercase tracking-[0.2em] text-[#00000073] mb-3 md:mb-4">
            Our Network
          </p>
          <h2 className="font-display text-[clamp(1.8rem,5vw,4rem)] text-[#232325]">
            Trusted By
          </h2>
        </div>

        {/* Interactive Grid */}
        <div className="relative mb-10 md:mb-16">
          <div
            ref={gridRef}
            className="grid grid-cols-12 gap-[2px] md:gap-1 max-w-[320px] md:max-w-[600px] mx-auto aspect-square"
          >
            {tiles.map((tile) => (
              <div
                key={tile.id}
                className="trust-tile aspect-square rounded-sm transition-all duration-500 hover:scale-110 hover:opacity-80 cursor-crosshair"
                style={{
                  backgroundColor: tile.highlighted
                    ? tile.highlightColor
                    : '#2b6cb0',
                  opacity: tile.opacity,
                }}
              />
            ))}
          </div>

          {/* Centered overlay text */}
          <div
            ref={textRef}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div className="text-center">
              <p className="font-display text-[clamp(1.5rem,7vw,5rem)] text-[#232325] leading-[1]">
                500+
              </p>
              <p className="font-body text-[11px] md:text-[14px] text-[#00000073] mt-1 md:mt-2 uppercase tracking-[0.15em]">
                Dental Professionals
              </p>
            </div>
          </div>
        </div>

        {/* Trust Signals */}
        <div
          ref={signalsRef}
          className="flex flex-wrap justify-center items-center gap-4 md:gap-8"
        >
          {trustSignals.map((signal, index) => (
            <div key={signal.text} className="flex items-center gap-2">
              {index > 0 && (
                <span className="hidden md:inline text-[#00000073] mr-4">·</span>
              )}
              <signal.icon size={14} className="text-[#2b6cb0] flex-shrink-0" />
              <span className="font-body text-[12px] md:text-[15px] text-[#00000073]">
                {signal.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trust;
