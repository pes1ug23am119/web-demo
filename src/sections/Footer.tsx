import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, MessageCircle, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        footer.querySelectorAll('.footer-animate'),
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footer,
            start: 'top 90%',
          },
        }
      );
    }, footer);

    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      ref={footerRef}
      className="bg-[#080809] border-t border-[#ffffff1a] py-10 md:py-12 px-5 md:px-[6vw]"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-8">
          {/* Company Name & Tagline */}
          <div className="footer-animate">
            <button onClick={() => scrollTo('hero')}>
              <p className="font-display text-[20px] md:text-[24px] text-white mb-2">
                ELECTRODENT <span className="text-[#63b3ed]">TRADERS</span>
              </p>
            </button>
            <p className="font-body text-[13px] md:text-[14px] text-[#ffffff73]">
              House of Dental Excellence
            </p>
            <p className="font-body text-[12px] md:text-[13px] text-[#ffffff73] mt-3 md:mt-4 leading-[1.7] max-w-[280px]">
              Serving dentists, dental students, and laboratory technicians
              across Moradabad since 2000.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-animate">
            <p className="font-body text-[13px] md:text-[14px] uppercase tracking-[0.15em] text-white mb-4 md:mb-6">
              Quick Links
            </p>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Home', id: 'hero' },
                { label: 'Products', id: 'products' },
                { label: 'About', id: 'about' },
                { label: 'Gallery', id: 'gallery' },
                { label: 'Contact', id: 'contact' },
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="font-body text-[14px] text-[#ffffff73] hover:text-white transition-colors text-left"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div className="footer-animate sm:col-span-2 md:col-span-1">
            <p className="font-body text-[13px] md:text-[14px] uppercase tracking-[0.15em] text-white mb-4 md:mb-6">
              Connect
            </p>
            <div className="flex flex-col gap-4">
              <a
                href="tel:9219635447"
                className="flex items-center gap-3 text-[#ffffff73] hover:text-[#63b3ed] transition-colors"
              >
                <Phone size={16} />
                <span className="font-body text-[14px]">9219635447</span>
              </a>
              <a
                href="https://wa.me/919219635447"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[#ffffff73] hover:text-[#63b3ed] transition-colors"
              >
                <MessageCircle size={16} />
                <span className="font-body text-[14px]">WhatsApp Us</span>
              </a>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="flex items-center gap-3 text-[#ffffff73] hover:text-[#63b3ed] transition-colors"
              >
                <ExternalLink size={16} />
                <span className="font-body text-[14px]">Find Us on JD Mart</span>
              </a>

              <div className="mt-4 pt-4 border-t border-[#ffffff1a]">
                <p className="font-body text-[12px] text-[#ffffff73] leading-[1.7]">
                  Shop No-32, Near Kapoor Company Chowk,
                  <br />
                  Hallet Road, Civil Lines,
                  <br />
                  Moradabad, UP 244001
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-animate mt-12 pt-8 border-t border-[#ffffff1a] text-center">
          <p className="font-body text-[13px] text-[#ffffff73]">
            &copy; 2000–2025 Electrodent Traders. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
