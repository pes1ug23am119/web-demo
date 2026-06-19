import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { COMPANY, STATS, TRUST_SIGNALS } from '../data/operatory';
import ChairAssembly from './chair/ChairAssembly';
import Timeline from './Timeline';
import PrecisionMarquee from './PrecisionMarquee';
import ContactTray from './ContactTray';
import { Phone, MessageCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function OperatoryExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const explosionCopyRef = useRef<HTMLDivElement>(null);
  const reassemblyCopyRef = useRef<HTMLDivElement>(null);
  const statsLeftRef = useRef<HTMLDivElement>(null);
  const statsRightRef = useRef<HTMLDivElement>(null);
  const trustSignalsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero fades out by 15%
      gsap.fromTo(
        heroRef.current,
        { opacity: 1 },
        {
          opacity: 0,
          scrollTrigger: {
            trigger: document.body,
            start: '5% top',
            end: '20% top',
            scrub: true,
          },
        }
      );

      // Scroll headline fades in 8-25%, out 25-40%
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: document.body,
            start: '8% top',
            end: '20% top',
            scrub: true,
          },
        }
      );
      gsap.fromTo(
        headlineRef.current,
        { opacity: 1, y: 0 },
        {
          opacity: 0,
          y: -30,
          scrollTrigger: {
            trigger: document.body,
            start: '25% top',
            end: '40% top',
            scrub: true,
          },
        }
      );

      // Explosion copy in/out
      gsap.fromTo(
        explosionCopyRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: document.body,
            start: '30% top',
            end: '42% top',
            scrub: true,
          },
        }
      );
      gsap.fromTo(
        explosionCopyRef.current,
        { opacity: 1, y: 0 },
        {
          opacity: 0,
          y: -20,
          scrollTrigger: {
            trigger: document.body,
            start: '55% top',
            end: '70% top',
            scrub: true,
          },
        }
      );

      // Reassembly copy in
      gsap.fromTo(
        reassemblyCopyRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: document.body,
            start: '78% top',
            end: '90% top',
            scrub: true,
          },
        }
      );

      // Floating stats labels
      gsap.fromTo(
        statsLeftRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: document.body,
            start: '35% top',
            end: '45% top',
            scrub: true,
          },
        }
      );
      gsap.fromTo(
        statsLeftRef.current,
        { opacity: 1 },
        {
          opacity: 0,
          scrollTrigger: {
            trigger: document.body,
            start: '75% top',
            end: '85% top',
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        statsRightRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: document.body,
            start: '45% top',
            end: '55% top',
            scrub: true,
          },
        }
      );
      gsap.fromTo(
        statsRightRef.current,
        { opacity: 1 },
        {
          opacity: 0,
          scrollTrigger: {
            trigger: document.body,
            start: '80% top',
            end: '90% top',
            scrub: true,
          },
        }
      );

      // Trust signals
      gsap.fromTo(
        trustSignalsRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: document.body,
            start: '50% top',
            end: '60% top',
            scrub: true,
          },
        }
      );
      gsap.fromTo(
        trustSignalsRef.current,
        { opacity: 1 },
        {
          opacity: 0,
          scrollTrigger: {
            trigger: document.body,
            start: '80% top',
            end: '90% top',
            scrub: true,
          },
        }
      );

      // CTA buttons fade out at end
      gsap.fromTo(
        ctaRef.current,
        { opacity: 1 },
        {
          opacity: 0,
          scrollTrigger: {
            trigger: document.body,
            start: '70% top',
            end: '85% top',
            scrub: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Scroll track */}
      <div className="scroll-track" />

      {/* Fixed viewport stage */}
      <div className="fixed inset-0 w-full h-dvh overflow-hidden operatory-bg isolate">
        {/* Subtle vignette for readability */}
        <div
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            background: 'radial-gradient(ellipse at 50% 40%, transparent 0%, var(--bg-page) 85%)',
          }}
        />

        {/* Chair */}
        <ChairAssembly />

        {/* Timeline on the left */}
        <Timeline />

        {/* Precision marquee */}
        <PrecisionMarquee />

        {/* Hero headline */}
        <div
          ref={heroRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-center z-10"
        >
          <h1 className="font-display text-[clamp(2.5rem,14vw,9rem)] leading-[0.9] tracking-[-0.03em] text-gradient">
            {COMPANY.name}
            <br />
            {COMPANY.tagline}
          </h1>
          <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] mt-4 text-[var(--text-secondary)]">
            {COMPANY.subtitle}
          </p>
        </div>

        {/* Scroll-triggered headline */}
        <div
          ref={headlineRef}
          className="absolute top-[15%] left-0 right-0 px-6 md:px-[8vw] text-center md:text-left pointer-events-none z-10"
        >
          <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] text-[var(--accent-color)] mb-3">
            Moradabad · Since 2000
          </p>
          <h2 className="font-display text-[clamp(1.5rem,5vw,4rem)] leading-[1.1] max-w-[700px] mx-auto md:mx-0 text-[var(--text-primary)] drop-shadow-sm">
            {COMPANY.headline}
          </h2>
          <p className="font-body text-sm md:text-base text-[var(--text-secondary)] max-w-[500px] mt-4 mx-auto md:mx-0">
            {COMPANY.subheadline}
          </p>
        </div>

        {/* Explosion copy */}
        <div
          ref={explosionCopyRef}
          className="absolute top-[12%] left-0 right-0 px-6 md:px-[8vw] text-center pointer-events-none z-10"
        >
          <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] text-[var(--accent-color)] mb-3">
            Exploded View
          </p>
          <h2 className="font-display text-[clamp(1.4rem,4vw,3rem)] leading-[1.15] max-w-[600px] mx-auto text-[var(--text-primary)] drop-shadow-sm">
            Every product category was inside the chair the whole time.
          </h2>
        </div>

        {/* Reassembly / contact copy */}
        <div
          ref={reassemblyCopyRef}
          className="absolute top-[12%] left-0 right-0 px-6 md:px-[8vw] text-center pointer-events-none z-10"
        >
          <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] text-[var(--accent-color)] mb-3">
            Reassembly Complete
          </p>
          <h2 className="font-display text-[clamp(1.4rem,4vw,3rem)] leading-[1.15] max-w-[600px] mx-auto text-[var(--text-primary)] drop-shadow-sm">
            Ready to equip your practice?
          </h2>
        </div>

        {/* Floating stats labels */}
        <div
          ref={statsLeftRef}
          className="absolute bottom-[18%] left-[8%] pointer-events-none hidden lg:block z-10"
        >
          <div className="holo-label">{STATS[0].value}{STATS[0].suffix} {STATS[0].label}</div>
        </div>
        <div
          ref={statsRightRef}
          className="absolute bottom-[28%] right-[10%] pointer-events-none hidden lg:block z-10"
        >
          <div className="holo-label">{STATS[1].value}{STATS[1].suffix} {STATS[1].label}</div>
        </div>

        {/* Trust signals band */}
        <div
          ref={trustSignalsRef}
          className="absolute bottom-8 left-0 right-0 flex flex-wrap justify-center gap-4 md:gap-8 px-4 pointer-events-none z-10"
        >
          {TRUST_SIGNALS.map((signal, i) => (
            <div key={signal} className="flex items-center gap-2">
              {i > 0 && <span className="hidden md:inline text-[var(--text-secondary)]">·</span>}
              <span className="font-body text-[10px] md:text-xs text-[var(--text-secondary)] uppercase tracking-wider">
                {signal}
              </span>
            </div>
          ))}
        </div>

        {/* Fixed CTA buttons */}
        <div
          ref={ctaRef}
          className="absolute bottom-8 right-8 hidden md:flex flex-col gap-3 pointer-events-auto z-50"
        >
          <a
            href={`tel:${COMPANY.phone}`}
            className="btn-primary inline-flex items-center justify-center gap-2 text-sm py-2.5 px-5"
          >
            <Phone size={14} />
            Call {COMPANY.phone}
          </a>
          <a
            href={`https://wa.me/${COMPANY.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex items-center justify-center gap-2 text-sm py-2.5 px-5"
          >
            <MessageCircle size={14} />
            WhatsApp
          </a>
        </div>
      </div>

      {/* Contact tray - appears at final scroll phase */}
      <ContactTray />
    </div>
  );
}
