import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Products = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const grid = gridRef.current;

    if (!section || !header || !grid) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        header.children,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        grid.children,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: grid,
            start: 'top 80%',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const categories = [
    {
      title: 'Heavy Clinic Equipment',
      description: 'Hydraulic & electrical dental chairs, X-ray machines, air compressors',
      image: '/images/hero-dental-chair.jpg',
    },
    {
      title: 'Lab & Sterilization',
      description: 'Autoclaves, glass bead sterilizers, dental lab benches',
      image: '/images/autoclave-sterilizer.jpg',
    },
    {
      title: 'Consumables & Materials',
      description: 'Dental plaster, composites, cements, chemical impressions',
      image: '/images/root-canal-files.jpg',
    },
    {
      title: 'Hand Instruments',
      description: 'Probes, extraction forceps, luxury syringes, scaling mirrors',
      image: '/images/handpiece-set.jpg',
    },
    {
      title: 'Endodontic Tools',
      description: 'Root canal files, apex locators, obturation systems',
      image: '/images/root-canal-files.jpg',
    },
    {
      title: 'Operatory Apparatus',
      description: 'LED curing lights, high/low-speed handpieces, micro-motors',
      image: '/images/led-curing-light.jpg',
    },
  ];

  return (
    <section
      id="products"
      ref={sectionRef}
      className="section-warm py-[20vh]"
    >
      <div className="px-5 md:px-[6vw] max-w-[1400px] mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-10 md:mb-16">
          <p className="font-body text-[12px] md:text-[14px] uppercase tracking-[0.2em] text-[#00000073] mb-3 md:mb-4">
            Complete Dental Solutions
          </p>
          <h2 className="font-display text-[clamp(1.8rem,5vw,4rem)] text-[#232325]">
            Everything Your Practice Needs
          </h2>
          <p className="font-body text-[14px] md:text-[18px] text-[#00000073] max-w-[600px] mx-auto mt-3 md:mt-4">
            From clinic setup to consumable replenishment — we bridge global
            manufacturers with local practitioners.
          </p>
        </div>

        {/* Product Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {categories.map((category) => (
            <div
              key={category.title}
              className="group relative aspect-[4/3] sm:aspect-square bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-sm cursor-pointer"
            >
              {/* Image */}
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#000000cc] via-[#00000044] to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                <h3 className="font-body text-[15px] md:text-[18px] font-semibold text-white mb-1">
                  {category.title}
                </h3>
                <p className="font-body text-[12px] md:text-[13px] text-white/70 leading-[1.5] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {category.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
