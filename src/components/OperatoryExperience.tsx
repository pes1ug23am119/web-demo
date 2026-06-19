import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { COMPANY } from '../data/operatory';
import ChairAssembly from './chair/ChairAssembly';
import Timeline from './Timeline';
import PrecisionMarquee from './PrecisionMarquee';
import ContactTray from './ContactTray';
import { Phone, MessageCircle, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function OperatoryExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const explosionCopyRef = useRef<HTMLDivElement>(null);
  const reassemblyCopyRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero fades out by 18%
      gsap.fromTo(
        heroRef.current,
        { opacity: 1, y: 0 },
        {
          opacity: 0,
          y: -30,
          scrollTrigger: {
            trigger: document.body,
            start: '5% top',
            end: '20% top',
            scrub: true,
          },
        }
      );

      // Scroll hint fades out quickly
      gsap.fromTo(
        scrollHintRef.current,
        { opacity: 0.6, y: 0 },
        {
          opacity: 0,
          y: 20,
          scrollTrigger: {
            trigger: document.body,
            start: '2% top',
            end: '12% top',
            scrub: true,
          },
        }
      );

      // Headline fades in 10-22%, out 35-48%
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: document.body,
            start: '10% top',
            end: '22% top',
            scrub: true,
          },
        }
      );
      gsap.fromTo(
        headlineRef.current,
        { opacity: 1, y: 0 },
        {
          opacity: 0,
          y: -40,
          scrollTrigger: {
            trigger: document.body,
            start: '35% top',
            end: '48% top',
            scrub: true,
          },
        }
      );

      // Explosion copy in/out
      gsap.fromTo(
        explosionCopyRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: document.body,
            start: '32% top',
            end: '44% top',
            scrub: true,
          },
        }
      );
      gsap.fromTo(
        explosionCopyRef.current,
        { opacity: 1, y: 0 },
        {
          opacity: 0,
          y: -40,
          scrollTrigger: {
            trigger: document.body,
            start: '55% top',
            end: '68% top',
            scrub: true,
          },
        }
      );

      // Reassembly copy in
      gsap.fromTo(
        reassemblyCopyRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: document.body,
            start: '78% top',
            end: '88% top',
            scrub: true,
          },
        }
      );

      // CTAs fade out at end
      gsap.fromTo(
        ctaRef.current,
        { opacity: 1 },
        {
          opacity: 0,
          scrollTrigger: {
            trigger: document.body,
            start: '75% top',
            end: '88% top',
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
        {/* Chair */}
        <ChairAssembly />

        {/* Background marquee */}
        <PrecisionMarquee />

        {/* Hero headline — centered, large */}
        <div
          ref={heroRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-center z-10 w-full px-6"
        >
          <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.35em] text-[var(--text-secondary)] mb-4">
            {COMPANY.subtitle}
          </p>
          <h1 className="font-display text-[clamp(2.8rem,12vw,8rem)] leading-[0.9] tracking-[-0.03em] text-[var(--text-primary)]">
            {COMPANY.name}
            <br />
            <span className="text-[var(--accent-color)]">{COMPANY.tagline}</span>
          </h1>
          <p className="font-body text-sm md:text-base text-[var(--text-secondary)] mt-6 max-w-md mx-auto">
            {COMPANY.subheadline}
          </p>
        </div>

        {/* Scroll hint */}
        <div
          ref={scrollHintRef}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none z-10"
        >
          <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-secondary)]">Scroll</span>
          <ChevronDown size={16} className="text-[var(--accent-color)] animate-bounce" />
        </div>

        {/* Scroll-triggered headline card — top left */}
        <div
          ref={headlineRef}
          className="absolute top-[14%] left-6 md:left-[8vw] max-w-[520px] pointer-events-none z-10 opacity-0"
        >
          <div className="text-card">
            <p className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-[var(--accent-color)] mb-3">
              Moradabad · Since 2000
            </p>
            <h2 className="font-display text-[clamp(1.4rem,4vw,2.5rem)] leading-[1.1] text-[var(--text-primary)]">
              {COMPANY.headline}
            </h2>
          </div>
        </div>

        {/* Explosion copy card — top right */}
        <div
          ref={explosionCopyRef}
          className="absolute top-[16%] right-6 md:right-[8vw] max-w-[420px] pointer-events-none z-10 opacity-0"
        >
          <div className="text-card text-right">
            <p className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-[var(--accent-color)] mb-3">
              Exploded View
            </p>
            <h2 className="font-display text-[clamp(1.3rem,3.5vw,2rem)] leading-[1.15] text-[var(--text-primary)]">
              Every product category was inside the chair the whole time.
            </h2>
          </div>
        </div>

        {/* Reassembly copy card — top center */}
        <div
          ref={reassemblyCopyRef}
          className="absolute top-[14%] left-1/2 -translate-x-1/2 max-w-[520px] w-[90%] md:w-auto pointer-events-none z-10 opacity-0"
        >
          <div className="text-card text-center">
            <p className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-[var(--accent-color)] mb-3">
              Reassembly Complete
            </p>
            <h2 className="font-display text-[clamp(1.4rem,4vw,2.5rem)] leading-[1.1] text-[var(--text-primary)]">
              Ready to equip your practice?
            </h2>
          </div>
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
            {COMPANY.phone}
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

      {/* Timeline on left */}
      <Timeline />

      {/* Contact tray */}
      <ContactTray />
    </div>
  );
}
