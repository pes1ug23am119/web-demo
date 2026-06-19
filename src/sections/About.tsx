import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const left = leftRef.current;
    const right = rightRef.current;

    if (!section || !left || !right) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        left,
        { x: -50, opacity: 0 },
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

      gsap.fromTo(
        right,
        { scale: 1.05, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
          },
        }
      );

      // Stats counter animation
      const statElements = statsRef.current?.querySelectorAll('.stat-number');
      statElements?.forEach((el) => {
        const target = parseInt(el.getAttribute('data-target') || '0');
        gsap.fromTo(
          el,
          { textContent: '0' },
          {
            textContent: target,
            duration: 2,
            ease: 'power2.out',
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 80%',
            },
          }
        );
      });

      // Parallax on image
      gsap.to(right.querySelector('img'), {
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const stats = [
    { value: '2000', suffix: '+', label: 'Products Available' },
    { value: '25', suffix: '+', label: 'Years of Service' },
    { value: '500', suffix: '+', label: 'Happy Dentists' },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-warm min-h-[100dvh] flex items-center py-[12vh] md:py-[20vh]"
    >
      <div className="w-full px-5 md:px-[6vw] max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 items-center">
          {/* Left Column */}
          <div ref={leftRef} className="opacity-0 order-2 lg:order-1">
            <p className="font-body text-[12px] md:text-[14px] uppercase tracking-[0.2em] text-[#00000073] mb-4 md:mb-6">
              Our Legacy
            </p>

            <h2 className="font-display text-[clamp(2rem,7vw,4.5rem)] font-normal text-[#232325] leading-[1.1]">
              Two Decades of Dental Trust
            </h2>

            <p className="font-body text-[14px] md:text-[16px] text-[#00000073] mt-4 md:mt-6 leading-[1.7] max-w-[500px]">
              Established in 2000, Electrodent Traders has been the cornerstone of
              dental supply in Moradabad. We serve dentists, dental students, and
              laboratory technicians with the finest equipment sourced directly from
              leading global manufacturers.
            </p>

            {/* Stats */}
            <div
              ref={statsRef}
              className="grid grid-cols-3 gap-3 md:gap-6 mt-8 md:mt-12"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <p className="font-display text-[28px] md:text-[48px] text-[#2b6cb0] leading-[1]">
                    <span className="stat-number" data-target={stat.value}>
                      0
                    </span>
                    <span className="text-[18px] md:text-[32px]">{stat.suffix}</span>
                  </p>
                  <p className="font-body text-[11px] md:text-[14px] text-[#00000073] mt-1 md:mt-2">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div ref={rightRef} className="opacity-0 overflow-hidden rounded-xl md:rounded-2xl order-1 lg:order-2">
            <img
              src="/images/hero-dental-chair.jpg"
              alt="Premium dental chair in modern clinic"
              className="w-full h-[300px] md:h-[500px] lg:h-[600px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
