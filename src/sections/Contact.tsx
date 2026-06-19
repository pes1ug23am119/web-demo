import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, MessageCircle, MapPin, Clock, Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const left = leftRef.current;
    const right = rightRef.current;

    if (!section || !left || !right) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        left.children,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
          },
        }
      );

      gsap.fromTo(
        right,
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-dark py-[20vh] min-h-[80vh]"
    >
      <div className="px-5 md:px-[6vw] max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20">
          {/* Left Column */}
          <div ref={leftRef}>
            <p className="font-body text-[12px] md:text-[14px] uppercase tracking-[0.2em] text-[#ffffff99] mb-4 md:mb-6">
              Visit Us
            </p>

            <h2 className="font-display text-[clamp(2rem,7vw,4.5rem)] text-[#fdfdfd] leading-[1.1]">
              Civil Lines, Moradabad
            </h2>

            <div className="mt-6 md:mt-8 space-y-4 md:space-y-6">
              {/* Address */}
              <div className="flex items-start gap-3 md:gap-4">
                <MapPin size={18} className="text-[#63b3ed] mt-1 flex-shrink-0" />
                <p className="font-body text-[15px] md:text-[18px] text-[#ffffff99] leading-[1.6]">
                  Shop No-32, Near Kapoor Company Chowk,
                  <br />
                  Hallet Road, Civil Lines,
                  <br />
                  Moradabad, Uttar Pradesh 244001
                </p>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3 md:gap-4">
                <Clock size={18} className="text-[#63b3ed] mt-1 flex-shrink-0" />
                <div>
                  <p className="font-body text-[14px] md:text-[16px] text-[#ffffff99]">
                    Monday – Saturday: 10:30 AM – 8:00 PM
                  </p>
                  <p className="font-body text-[14px] md:text-[16px] text-[#ef4444] mt-1 flex items-center gap-2">
                    <Calendar size={14} />
                    Closed on Tuesdays
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3 md:gap-4">
                <Phone size={18} className="text-[#63b3ed] flex-shrink-0" />
                <a
                  href="tel:9219635447"
                  className="font-body text-[20px] md:text-[24px] font-bold text-[#63b3ed] hover:text-white transition-colors"
                >
                  9219635447
                </a>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 md:mt-10 flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4">
              <a
                href="tel:9219635447"
                className="btn-primary inline-flex items-center justify-center gap-2 text-[14px] md:text-[16px] py-2.5 md:py-3 px-5 md:px-8"
              >
                <Phone size={16} />
                Call Now
              </a>
              <a
                href="https://wa.me/919219635447"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline inline-flex items-center justify-center gap-2 text-[14px] md:text-[16px] py-2.5 md:py-3 px-5 md:px-8"
              >
                <MessageCircle size={16} />
                WhatsApp
              </a>
            </div>

            {/* Additional info */}
            <div className="mt-8 md:mt-10 pt-6 md:pt-8 border-t border-[#ffffff1a]">
              <p className="font-body text-[13px] md:text-[14px] text-[#ffffff73] leading-[1.7]">
                We serve dental professionals across Civil Lines, Budh Bazar,
                Kanth Road, Line Par, and Station Road. Bulk orders welcome.
                Personalized pricing available for registered clinics and
                institutes.
              </p>
            </div>
          </div>

          {/* Right Column - Map Placeholder */}
          <div ref={rightRef} className="opacity-0">
            <div className="relative h-full min-h-[300px] md:min-h-[400px] rounded-xl md:rounded-2xl overflow-hidden shadow-lg bg-[#141417]">
              {/* Stylized map representation */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] to-[#141417]">
                {/* Grid lines */}
                <div className="absolute inset-0 opacity-10">
                  {Array.from({ length: 20 }, (_, i) => (
                    <div
                      key={`h-${i}`}
                      className="absolute left-0 right-0 h-px bg-white"
                      style={{ top: `${(i + 1) * 5}%` }}
                    />
                  ))}
                  {Array.from({ length: 20 }, (_, i) => (
                    <div
                      key={`v-${i}`}
                      className="absolute top-0 bottom-0 w-px bg-white"
                      style={{ left: `${(i + 1) * 5}%` }}
                    />
                  ))}
                </div>

                {/* Location marker */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="w-4 h-4 rounded-full bg-[#2b6cb0] animate-ping absolute inset-0" />
                    <div className="w-4 h-4 rounded-full bg-[#2b6cb0] relative" />
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                      <p className="font-body text-[12px] text-[#63b3ed] font-semibold">
                        Electrodent Traders
                      </p>
                      <p className="font-body text-[11px] text-[#ffffff73]">
                        Kapoor Company Chowk
                      </p>
                    </div>
                  </div>
                </div>

                {/* Road labels */}
                <div className="absolute bottom-[30%] left-[10%]">
                  <p className="font-body text-[10px] text-[#ffffff40] uppercase tracking-wider">
                    Hallet Road
                  </p>
                </div>
                <div className="absolute top-[25%] right-[15%]">
                  <p className="font-body text-[10px] text-[#ffffff40] uppercase tracking-wider">
                    Civil Lines
                  </p>
                </div>
                <div className="absolute top-[60%] right-[10%]">
                  <p className="font-body text-[10px] text-[#ffffff40] uppercase tracking-wider">
                    Kapoor Company Chowk
                  </p>
                </div>
              </div>

              {/* Bottom info bar */}
              <div className="absolute bottom-0 left-0 right-0 bg-[#080809]/80 backdrop-blur-sm p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-[#63b3ed]" />
                    <span className="font-body text-[12px] text-[#ffffff99]">
                      Located at Kapoor Company Chowk flyover intersection
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
