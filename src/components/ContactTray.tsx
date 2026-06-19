import { useState } from 'react';
import { COMPANY } from '../data/operatory';
import { Phone, MessageCircle, MapPin, Clock, Calendar, Send } from 'lucide-react';

interface ContactTrayProps {
  progress: number;
}

export default function ContactTray({ progress }: ContactTrayProps) {
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  // Show contact tray at final 10% of scroll, fixed center
  const visible = progress > 0.82;
  const opacity = Math.max(0, Math.min(1, (progress - 0.82) / 0.1));
  const scale = 0.8 + opacity * 0.2;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div
      className="fixed inset-0 z-30 flex items-center justify-center p-4 pointer-events-none"
      style={{ opacity, pointerEvents: visible ? 'auto' : 'none' }}
    >
      <div
        className="contact-tray w-full max-w-[900px] p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8"
        style={{ transform: `scale(${scale})`, transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        {/* Left: Contact info */}
        <div>
          <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] text-[var(--accent-color)] mb-3">
            Visit Us
          </p>
          <h2 className="font-display text-[clamp(1.8rem,4vw,2.5rem)] leading-[1.1] text-[var(--text-primary)] mb-6">
            Civil Lines, Moradabad
          </h2>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin size={18} className="text-[var(--accent-color)] mt-1 flex-shrink-0" />
              <p className="font-body text-sm md:text-base text-[var(--text-secondary)] leading-[1.6]">
                {COMPANY.address}
              </p>
            </div>

            <div className="flex items-start gap-3">
              <Clock size={18} className="text-[var(--accent-color)] mt-1 flex-shrink-0" />
              <div>
                <p className="font-body text-sm md:text-base text-[var(--text-secondary)]">
                  {COMPANY.hours}
                </p>
                <p className="font-body text-sm text-red-500 mt-1 flex items-center gap-2">
                  <Calendar size={14} />
                  {COMPANY.closedNote}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone size={18} className="text-[var(--accent-color)] flex-shrink-0" />
              <a
                href={`tel:${COMPANY.phone}`}
                className="font-body text-xl md:text-2xl font-bold text-[var(--accent-color)] hover:opacity-80 transition-opacity"
              >
                {COMPANY.phone}
              </a>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={`tel:${COMPANY.phone}`}
              className="btn-primary inline-flex items-center gap-2 text-sm py-2 px-4"
            >
              <Phone size={14} />
              Call Now
            </a>
            <a
              href={`https://wa.me/${COMPANY.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline inline-flex items-center gap-2 text-sm py-2 px-4"
            >
              <MessageCircle size={14} />
              WhatsApp
            </a>
          </div>
        </div>

        {/* Right: Form */}
        <div className="relative">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
                Name
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-[var(--bg-page)] border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-color)] focus:ring-1 focus:ring-[var(--accent-color)] transition-colors"
                placeholder="Dr. Your Name"
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
                Phone
              </label>
              <input
                type="tel"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full bg-[var(--bg-page)] border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-color)] focus:ring-1 focus:ring-[var(--accent-color)] transition-colors"
                placeholder="91XXXXXXXXXX"
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
                Message
              </label>
              <textarea
                rows={3}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-[var(--bg-page)] border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-color)] focus:ring-1 focus:ring-[var(--accent-color)] transition-colors resize-none"
                placeholder="Tell us what equipment you need..."
              />
            </div>
            <button
              type="submit"
              className="w-full btn-primary inline-flex items-center justify-center gap-2 text-sm py-3"
            >
              <Send size={14} />
              {submitted ? 'Sent!' : 'Send Inquiry'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
