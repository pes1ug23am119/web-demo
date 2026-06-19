import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TIMELINE } from '../data/operatory';

gsap.registerPlugin(ScrollTrigger);

export default function Timeline() {
  const lineRef = useRef<SVGLineElement>(null);
  const nodeRef = useRef<SVGCircleElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { strokeDashoffset: 400 },
          {
            strokeDashoffset: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: document.body,
              start: '15% top',
              end: '85% top',
              scrub: true,
            },
          }
        );
      }

      if (nodeRef.current) {
        gsap.fromTo(
          nodeRef.current,
          { cy: 0 },
          {
            cy: 400,
            ease: 'none',
            scrollTrigger: {
              trigger: document.body,
              start: '15% top',
              end: '85% top',
              scrub: true,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="fixed left-4 md:left-8 top-1/2 -translate-y-1/2 h-[60vh] w-12 md:w-16 z-20 pointer-events-none hidden sm:flex flex-col items-center">
      <svg
        className="h-full w-full"
        viewBox="0 0 40 400"
        preserveAspectRatio="none"
        style={{ overflow: 'visible' }}
      >
        {/* Background line */}
        <line x1="20" y1="0" x2="20" y2="400" className="timeline-line" />
        {/* Glowing progress line */}
        <line
          ref={lineRef}
          x1="20"
          y1="0"
          x2="20"
          y2="400"
          stroke="var(--accent-color)"
          strokeWidth="2"
          strokeDasharray="400"
          strokeDashoffset="400"
          style={{ filter: 'drop-shadow(0 0 6px var(--glow-color))' }}
        />
        {/* Traveling node */}
        <circle
          ref={nodeRef}
          cx="20"
          cy="0"
          r="6"
          className="timeline-node"
        />
      </svg>

      {/* Year labels */}
      <div className="absolute inset-0 flex flex-col justify-between py-2">
        {TIMELINE.map((event) => (
          <div
            key={event.year}
            className="absolute left-8 md:left-10"
            style={{ top: `${event.progress * 100}%`, transform: 'translateY(-50%)' }}
          >
            <div className="font-mono text-xs md:text-sm font-bold tracking-wider text-[var(--text-secondary)] timeline-year-label">
              {event.year}
            </div>
            <div className="font-body text-[10px] md:text-xs text-[var(--text-secondary)] mt-0.5 max-w-[140px] opacity-60">
              {event.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
