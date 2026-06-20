import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { COMPANY } from '../data/operatory';
import ChairAssembly from './chair/ChairAssembly';
import Timeline from './Timeline';
import PrecisionMarquee from './PrecisionMarquee';
import ContactTray from './ContactTray';
import CategoryGrid from './CategoryGrid';
import { Phone, MessageCircle, ChevronDown, Touchpad } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function OperatoryExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const explosionCopyRef = useRef<HTMLDivElement>(null);
  const tapTargetRef = useRef<HTMLDivElement>(null);
  const tapHintRef = useRef<HTMLDivElement>(null);
  const reassemblyCopyRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  const [categoriesOpen, setCategoriesOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero fades out by 20%
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

      // Headline fades in 10-24%, out 30-45%
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: document.body,
            start: '10% top',
            end: '24% top',
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
            start: '30% top',
            end: '45% top',
            scrub: true,
          },
        }
      );

      // Explosion copy + tap hint in/out
      gsap.fromTo(
        explosionCopyRef.current,
        { opacity: 0, y: 30, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          scrollTrigger: {
            trigger: document.body,
            start: '28% top',
            end: '40% top',
            scrub: true,
          },
        }
      );
      gsap.fromTo(
        explosionCopyRef.current,
        { opacity: 1, y: 0, scale: 1 },
        {
          opacity: 0,
          y: -30,
          scale: 0.96,
          scrollTrigger: {
            trigger: document.body,
            start: '52% top',
            end: '65% top',
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        tapHintRef.current,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: document.body,
            start: '32% top',
            end: '42% top',
            scrub: true,
          },
        }
      );
      gsap.fromTo(
        tapHintRef.current,
        { opacity: 1, y: 0 },
        {
          opacity: 0,
          y: -10,
          scrollTrigger: {
            trigger: document.body,
            start: '52% top',
            end: '62% top',
            scrub: true,
          },
        }
      );

      // Tap target visibility
      gsap.fromTo(
        tapTargetRef.current,
        { opacity: 0, pointerEvents: 'none' },
        {
          opacity: 1,
          pointerEvents: 'auto',
          scrollTrigger: {
            trigger: document.body,
            start: '28% top',
            end: '40% top',
            scrub: true,
          },
        }
      );
      gsap.fromTo(
        tapTargetRef.current,
        { opacity: 1, pointerEvents: 'auto' },
        {
          opacity: 0,
          pointerEvents: 'none',
          scrollTrigger: {
            trigger: document.body,
            start: '52% top',
            end: '65% top',
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

      // Close category grid when leaving explosion zone
      ScrollTrigger.create({
        trigger: document.body,
        start: '25% top',
        end: '55% top',
        onLeave: () => setCategoriesOpen(false),
        onLeaveBack: () => setCategoriesOpen(false),
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const openCategories = () => setCategoriesOpen(true);
  const closeCategories = () => setCategoriesOpen(false);

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

        {/* Hero — company name top, tagline bottom */}
        <div
          ref={heroRef}
          className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between py-8 md:py-12 px-6"
        >
          <div className="text-center">
            <h1 className="font-display text-[clamp(2.8rem,12vw,8rem)] leading-[0.9] tracking-[-0.03em] text-[var(--text-primary)]">
              {COMPANY.name}
            </h1>
            <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.35em] text-[var(--text-secondary)] mt-3">
              {COMPANY.subtitle}
            </p>
          </div>

          <div className="text-center">
            <h2 className="font-display text-[clamp(2.8rem,12vw,8rem)] leading-[0.9] tracking-[-0.03em] text-[var(--accent-color)]">
              {COMPANY.tagline}
            </h2>
          </div>
        </div>

        {/* Scroll hint */}
        <div
          ref={scrollHintRef}
          className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none z-10"
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

        {/* Tap target over the chair during explosion */}
        <div
          ref={tapTargetRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[60vh] max-w-[700px] max-h-[600px] rounded-3xl cursor-pointer z-20"
          style={{ opacity: 0, pointerEvents: 'none' }}
          onClick={openCategories}
        />

        {/* Explosion copy + tap hint — center */}
        <div
          ref={explosionCopyRef}
          className="absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[420px] w-[90%] pointer-events-none z-30 opacity-0"
        >
          <div className="text-card text-center">
            <p className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-[var(--accent-color)] mb-3">
              Interactive View
            </p>
            <h2 className="font-display text-[clamp(1.3rem,3.5vw,2rem)] leading-[1.15] text-[var(--text-primary)]">
              Tap to see all product categories
            </h2>
          </div>
        </div>

        <div
          ref={tapHintRef}
          className="absolute top-[66%] left-1/2 -translate-x-1/2 pointer-events-none z-30 opacity-0"
        >
          <div className="flex items-center gap-2 text-[var(--accent-color)] animate-pulse">
            <Touchpad size={16} />
            <span className="font-mono text-[10px] uppercase tracking-widest">Tap the chair</span>
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

      {/* Category grid overlay */}
      <CategoryGrid isOpen={categoriesOpen} onClose={closeCategories} />
    </div>
  );
}
