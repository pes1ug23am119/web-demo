import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ProductData {
  id: number;
  title: string;
  description: string;
  specs: string[];
  image: string;
}

const products: ProductData[] = [
  {
    id: 1,
    title: 'Hydraulic Dental Chair',
    description: 'Complete clinic setup with premium hydraulic chair unit, LED operating light, and multi-function foot control. Engineered for comfort and precision.',
    specs: ['Hydraulic lift system', 'LED operating light included', 'Multi-function foot control', 'Premium upholstery'],
    image: '/images/product-dental-chair.jpg',
  },
  {
    id: 2,
    title: 'Digital X-Ray Machine',
    description: 'High-resolution digital radiography system with RVG sensor technology. Instant imaging with minimal radiation exposure.',
    specs: ['RVG digital sensor', 'Instant image display', 'Low radiation dose', 'Wall-mount design'],
    image: '/images/xray-machine.jpg',
  },
  {
    id: 3,
    title: 'Class B Autoclave',
    description: 'Medical-grade Class B autoclave sterilizer with vacuum technology. Ensures complete sterilization of all instrument types.',
    specs: ['Class B vacuum cycle', 'Digital LCD display', 'Stainless steel chamber', '12L capacity'],
    image: '/images/autoclave-sterilizer.jpg',
  },
  {
    id: 4,
    title: 'LED Curing Light',
    description: 'Wireless pen-style LED curing light with ergonomic grip and high-intensity blue light output for rapid composite curing.',
    specs: ['Wireless rechargeable', 'High-intensity LED', 'Ergonomic pen design', '20-second cure mode'],
    image: '/images/led-curing-light.jpg',
  },
  {
    id: 5,
    title: 'High-Speed Handpiece',
    description: 'Precision-engineered high-speed dental handpiece with titanium body and ceramic bearings for smooth, vibration-free operation.',
    specs: ['400,000 RPM max speed', 'Titanium body', 'Ceramic bearings', 'Fiber optic illumination'],
    image: '/images/handpiece-set.jpg',
  },
  {
    id: 6,
    title: 'Root Canal File Set',
    description: 'Color-coded NiTi rotary file system with progressive taper design for efficient and safe root canal preparation.',
    specs: ['NiTi superelastic alloy', 'Color-coded sizes', 'Progressive taper', 'Assorted 6-file set'],
    image: '/images/root-canal-files.jpg',
  },
];

const Gallery = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (selectedProduct && overlayRef.current) {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: 'power2.out' }
      );
      gsap.fromTo(
        overlayRef.current.querySelector('.overlay-content'),
        { y: 40, scale: 0.95 },
        { y: 0, scale: 1, duration: 0.5, ease: 'power2.out', delay: 0.1 }
      );
    }
  }, [selectedProduct]);

  const closeOverlay = () => {
    if (overlayRef.current) {
      gsap.to(overlayRef.current.querySelector('.overlay-content'), {
        y: 40,
        scale: 0.95,
        duration: 0.3,
        ease: 'power2.in',
      });
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        delay: 0.1,
        onComplete: () => setSelectedProduct(null),
      });
    } else {
      setSelectedProduct(null);
    }
  };

  return (
    <>
      <section
        id="gallery"
        ref={sectionRef}
        className="section-accent py-[15vh]"
      >
        <div className="px-4 md:px-[6vw] max-w-[1400px] mx-auto">
          {/* Header */}
          <div ref={headerRef} className="text-center mb-10 md:mb-16">
            <p className="font-body text-[12px] md:text-[14px] uppercase tracking-[0.2em] text-[#00000073] mb-3 md:mb-4">
              Product Showcase
            </p>
            <h2 className="font-display text-[clamp(1.8rem,5vw,4rem)] text-[#232325]">
              Featured Equipment
            </h2>
            <p className="font-body text-[14px] md:text-[18px] text-[#00000073] max-w-[600px] mx-auto mt-3 md:mt-4">
              Click on any product to view detailed specifications and features.
            </p>
          </div>

          {/* Gallery Grid */}
          <div
            ref={gridRef}
            className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-[2vw]"
          >
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                className="group relative aspect-[4/5] rounded-lg overflow-hidden cursor-pointer bg-[#232325]"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#000000cc] via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <h3 className="font-body text-[14px] md:text-[18px] font-semibold text-white flex items-center gap-2">
                    {product.title}
                    <ChevronRight
                      size={16}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Detail Overlay */}
      {selectedProduct && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[200] bg-[#080809]/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
          onClick={closeOverlay}
        >
          <div
            className="overlay-content bg-[#141417] rounded-2xl overflow-hidden max-w-[1000px] w-full max-h-[90vh] flex flex-col md:flex-row shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <div className="w-full md:w-1/2 aspect-square md:aspect-auto">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col overflow-y-auto">
              <button
                onClick={closeOverlay}
                className="self-end text-white/60 hover:text-white transition-colors mb-4"
              >
                <X size={24} />
              </button>

              <p className="font-body text-[12px] uppercase tracking-[0.2em] text-[#63b3ed] mb-2">
                Product Details
              </p>
              <h3 className="font-display text-[clamp(1.5rem,3vw,2.5rem)] text-white mb-4">
                {selectedProduct.title}
              </h3>
              <p className="font-body text-[15px] text-white/70 leading-[1.7] mb-6">
                {selectedProduct.description}
              </p>

              <div className="mb-8">
                <p className="font-body text-[12px] uppercase tracking-[0.15em] text-white/50 mb-3">
                  Specifications
                </p>
                <ul className="space-y-2">
                  {selectedProduct.specs.map((spec, i) => (
                    <li
                      key={i}
                      className="font-body text-[14px] text-white/80 flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2b6cb0] flex-shrink-0" />
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto flex flex-wrap gap-3">
                <a
                  href="tel:9219635447"
                  className="btn-primary text-sm py-2.5 px-5"
                >
                  Enquire Now
                </a>
                <a
                  href="https://wa.me/919219635447"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline text-sm py-2.5 px-5"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;
