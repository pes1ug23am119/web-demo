import { useScrollProgress } from '../hooks/useScrollProgress';
import { useGyroscope } from '../hooks/useGyroscope';
import { COMPANY, STATS, TRUST_SIGNALS } from '../data/operatory';
import ChairAssembly from './chair/ChairAssembly';
import Timeline from './Timeline';
import PrecisionMarquee from './PrecisionMarquee';
import ContactTray from './ContactTray';
import { Phone, MessageCircle } from 'lucide-react';

export default function OperatoryExperience() {
  const progress = useScrollProgress();
  const { gamma } = useGyroscope();

  // Headline reveal phases
  const showCompany = progress < 0.15;
  const showHeadline = progress >= 0.08 && progress < 0.35;
  const showExplosionCopy = progress >= 0.30 && progress < 0.70;
  const showReassemblyCopy = progress >= 0.78;

  // Background gradient shift with scroll
  const bgOpacity = 0.3 + progress * 0.4;

  return (
    <div className="relative">
      {/* Scroll track */}
      <div className="scroll-track" />

      {/* Fixed viewport stage */}
      <div
        className="fixed inset-0 w-full h-dvh overflow-hidden"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, rgba(var(--accent-color-rgb), ${bgOpacity * 0.15}) 0%, var(--bg-page) 70%)`,
        }}
      >
        {/* Grid overlay for X-ray / technical feel */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: `linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Chair */}
        <ChairAssembly scrollProgress={progress} gyroGamma={gamma} />

        {/* Timeline on the left */}
        <Timeline progress={progress} />

        {/* Precision marquee */}
        <PrecisionMarquee />

        {/* Hero headline - behind headrest, revealed at 15% */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-center z-0 transition-opacity duration-700"
          style={{ opacity: showCompany ? 1 - progress / 0.15 : 0 }}
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
          className="absolute top-[15%] left-0 right-0 px-6 md:px-[8vw] text-center md:text-left pointer-events-none z-10 transition-opacity duration-700"
          style={{ opacity: showHeadline ? 1 : 0 }}
        >
          <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] text-[var(--accent-color)] mb-3">
            Moradabad · Since 2000
          </p>
          <h2 className="font-display text-[clamp(1.5rem,5vw,4rem)] leading-[1.1] max-w-[700px] mx-auto md:mx-0 text-[var(--text-primary)]">
            {COMPANY.headline}
          </h2>
          <p className="font-body text-sm md:text-base text-[var(--text-secondary)] max-w-[500px] mt-4 mx-auto md:mx-0">
            {COMPANY.subheadline}
          </p>
        </div>

        {/* Explosion copy */}
        <div
          className="absolute top-[12%] left-0 right-0 px-6 md:px-[8vw] text-center pointer-events-none z-10 transition-opacity duration-700"
          style={{ opacity: showExplosionCopy ? 1 : 0 }}
        >
          <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] text-[var(--accent-color)] mb-3">
            Exploded View
          </p>
          <h2 className="font-display text-[clamp(1.4rem,4vw,3rem)] leading-[1.15] max-w-[600px] mx-auto text-[var(--text-primary)]">
            Every product category was inside the chair the whole time.
          </h2>
        </div>

        {/* Reassembly / contact copy */}
        <div
          className="absolute top-[12%] left-0 right-0 px-6 md:px-[8vw] text-center pointer-events-none z-10 transition-opacity duration-700"
          style={{ opacity: showReassemblyCopy ? 1 : 0 }}
        >
          <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] text-[var(--accent-color)] mb-3">
            Reassembly Complete
          </p>
          <h2 className="font-display text-[clamp(1.4rem,4vw,3rem)] leading-[1.15] max-w-[600px] mx-auto text-[var(--text-primary)]">
            Ready to equip your practice?
          </h2>
        </div>

        {/* Floating stats labels */}
        <div
          className="absolute bottom-[18%] left-[8%] pointer-events-none hidden lg:block"
          style={{ opacity: progress > 0.35 && progress < 0.85 ? 1 : 0, transition: 'opacity 0.5s ease' }}
        >
          <div className="holo-label">{STATS[0].value}{STATS[0].suffix} {STATS[0].label}</div>
        </div>
        <div
          className="absolute bottom-[28%] right-[10%] pointer-events-none hidden lg:block"
          style={{ opacity: progress > 0.45 && progress < 0.85 ? 1 : 0, transition: 'opacity 0.5s ease' }}
        >
          <div className="holo-label">{STATS[1].value}{STATS[1].suffix} {STATS[1].label}</div>
        </div>

        {/* Trust signals band */}
        <div
          className="absolute bottom-8 left-0 right-0 flex flex-wrap justify-center gap-4 md:gap-8 px-4 pointer-events-none"
          style={{ opacity: progress > 0.5 && progress < 0.85 ? 1 : 0, transition: 'opacity 0.5s ease' }}
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
          className="absolute bottom-8 right-8 hidden md:flex flex-col gap-3 pointer-events-auto z-50"
          style={{ opacity: progress < 0.75 ? 1 : 0, transition: 'opacity 0.5s ease' }}
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
      <ContactTray progress={progress} />
    </div>
  );
}
