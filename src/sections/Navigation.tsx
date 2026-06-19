import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: 'Home', id: 'hero' },
    { label: 'Products', id: 'products' },
    { label: 'About', id: 'about' },
    { label: 'Gallery', id: 'gallery' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 h-[60px] md:h-[80px] transition-all duration-500 ${
          isScrolled ? 'bg-[#080809]/95 backdrop-blur-md shadow-lg' : 'bg-[#080809]'
        }`}
      >
        <div className="h-full px-4 md:px-[6vw] flex items-center justify-between max-w-[1600px] mx-auto">
          {/* Company Name */}
          <button onClick={() => scrollTo('hero')} className="flex-shrink-0">
            <span className="font-display text-[15px] md:text-[20px] text-white tracking-[-0.01em]">
              ELECTRODENT <span className="text-[#63b3ed]">TRADERS</span>
            </span>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="nav-link"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:9219635447"
              className="flex items-center gap-2 text-white/80 hover:text-[#63b3ed] transition-colors text-sm font-semibold"
            >
              <Phone size={16} />
              9219635447
            </a>
            <a
              href="https://wa.me/919219635447"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm py-2 px-5"
            >
              WhatsApp Us
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden text-white p-2"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[100] bg-[#080809] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col px-8 py-6">
          <div className="flex justify-between items-center mb-16">
            <span className="font-display text-[24px] text-white">
              ELECTRODENT <span className="text-[#63b3ed]">TRADERS</span>
            </span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white p-2"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex flex-col gap-6 flex-1">
            {navLinks.map((link, index) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-left font-display text-[36px] text-white hover:text-[#63b3ed] transition-colors"
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <a href="tel:9219635447" className="btn-primary text-center">
              <Phone size={18} className="inline mr-2" />
              Call: 9219635447
            </a>
            <a
              href="https://wa.me/919219635447"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline text-center"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
