import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Phone } from 'lucide-react';

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
  angle: number;
  rotationSpeed: number;
  life: number;
  maxLife: number;
  age: number;
  pulse: number;
  pulseSpeed: number;
}

const EnamelCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize particles
    const particleCount = window.innerWidth < 768 ? 500 : 1200;
    const colors = [
      'rgba(200, 210, 230, ',
      'rgba(180, 200, 220, ',
      'rgba(220, 225, 235, ',
      'rgba(160, 180, 200, ',
      'rgba(190, 195, 205, ',
    ];

    particlesRef.current = Array.from({ length: particleCount }, () => {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      return {
        x,
        y,
        originX: x,
        originY: y,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.6 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        angle: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.01,
        life: Math.random() * 300 + 200,
        maxLife: Math.random() * 300 + 200,
        age: Math.random() * 200,
        pulse: 0,
        pulseSpeed: Math.random() * 0.02 + 0.01,
      };
    });

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const drawEnamelShard = (p: Particle, ctx: CanvasRenderingContext2D, _w: number, _h: number) => {
      const fadeIn = Math.min(p.age / 30, 1);
      const fadeOut = Math.max(0, 1 - p.age / p.maxLife);
      const alpha = p.opacity * fadeIn * fadeOut;

      if (alpha < 0.01) return;

      p.pulse += p.pulseSpeed;
      const pulseScale = 1 + Math.sin(p.pulse) * 0.2;
      const size = p.size * pulseScale;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);

      // Draw teardrop/enamel shard shape
      ctx.beginPath();
      ctx.moveTo(0, -size * 2);
      ctx.bezierCurveTo(size * 1.5, -size, size, size * 0.5, 0, size * 2);
      ctx.bezierCurveTo(-size, size * 0.5, -size * 1.5, -size, 0, -size * 2);
      ctx.closePath();

      // Gradient fill
      const gradient = ctx.createRadialGradient(0, -size * 0.5, 0, 0, 0, size * 2.5);
      gradient.addColorStop(0, p.color + (alpha * 0.9) + ')');
      gradient.addColorStop(0.5, p.color + (alpha * 0.4) + ')');
      gradient.addColorStop(1, p.color + '0)');
      ctx.fillStyle = gradient;
      ctx.fill();

      // Small bright core
      ctx.beginPath();
      ctx.arc(0, -size * 0.3, size * 0.3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.8})`;
      ctx.fill();

      ctx.restore();
    };

    const animate = () => {
      timeRef.current += 0.016;
      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.clearRect(0, 0, w, h);

      // Draw dark gradient background
      const bgGradient = ctx.createRadialGradient(w * 0.5, h * 0.5, 0, w * 0.5, h * 0.5, w * 0.8);
      bgGradient.addColorStop(0, '#0e0e12');
      bgGradient.addColorStop(1, '#080809');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, w, h);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      particles.forEach((p) => {
        p.age += 1;
        p.angle += p.rotationSpeed;

        // Noise-based drift
        const noiseX = Math.sin(p.originX * 0.005 + timeRef.current * 0.3) * 0.5;
        const noiseY = Math.cos(p.originY * 0.005 + timeRef.current * 0.2) * 0.5;

        p.x += p.speedX + noiseX;
        p.y += p.speedY + noiseY;

        // Mouse attraction (subtle)
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          p.x += dx * 0.001;
          p.y += dy * 0.001;
        }

        // Respawn
        if (p.age > p.maxLife || p.x < -50 || p.x > w + 50 || p.y < -50 || p.y > h + 50) {
          p.x = Math.random() * w;
          p.y = Math.random() * h;
          p.originX = p.x;
          p.originY = p.y;
          p.age = 0;
          p.maxLife = Math.random() * 300 + 200;
        }

        drawEnamelShard(p, ctx, w, h);
      });

      // Draw subtle connection lines between nearby particles
      ctx.strokeStyle = 'rgba(150, 180, 210, 0.03)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i += 3) {
        for (let j = i + 1; j < particles.length; j += 3) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 80) {
            const alpha = (1 - dist / 80) * 0.05;
            ctx.strokeStyle = `rgba(150, 180, 210, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
      }}
    />
  );
};

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const companyRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

    tl.fromTo(
      companyRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.3 }
    )
      .fromTo(
        titleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.4'
      )
      .fromTo(
        headingRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, delay: 0.1 },
        '-=0.3'
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1 },
        '-=0.6'
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.4'
      );
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full min-h-[100dvh] overflow-hidden bg-[#080809]"
      style={{ minHeight: '700px' }}
    >
      <EnamelCanvas />

      {/* Content overlay */}
      <div className="relative z-10 min-h-[100dvh] flex flex-col justify-end px-5 md:px-[6vw] pb-[8vh] md:pb-[12vh] pt-[80px] md:pt-0">
        {/* Main content */}
        <div className="max-w-[800px]">
          {/* Company Name */}
          <div ref={companyRef} className="opacity-0 mb-4 md:mb-6">
            <h1 className="font-display text-[clamp(2.2rem,12vw,7rem)] font-normal text-[#fdfdfd] leading-[0.95] tracking-[-0.02em]">
              ELECTRODENT
              <br />
              <span className="text-[#63b3ed]">TRADERS</span>
            </h1>
          </div>

          <div ref={titleRef} className="opacity-0">
            <p className="font-body text-[13px] md:text-[18px] font-medium uppercase tracking-[0.15em] md:tracking-[0.2em] text-[#ffffff99] mb-3 md:mb-4">
              House of Dental Excellence
            </p>
          </div>

          <h1
            ref={headingRef}
            className="font-display text-[clamp(1.5rem,6vw,5rem)] font-normal text-[#fdfdfd] leading-[1.15] md:leading-[1.1] opacity-0"
          >
            Serving Dentists, Students &amp; Lab Technicians Across Moradabad Since 2000
          </h1>

          <p
            ref={subtitleRef}
            className="font-body text-[14px] md:text-[16px] font-medium text-[#ffffff99] max-w-[600px] mt-4 md:mt-6 opacity-0"
          >
            Wholesale &amp; Retail Dental Equipment — Chairs, X-Rays, Handpieces,
            Sterilizers &amp; More
          </p>

          <div ref={ctaRef} className="mt-6 md:mt-8 flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 opacity-0">
            <a href="tel:9219635447" className="btn-primary inline-flex items-center justify-center gap-2 text-[14px] md:text-[16px] py-2.5 md:py-3 px-5 md:px-8">
              <Phone size={16} />
              <span className="sm:hidden">Call: 9219635447</span>
              <span className="hidden sm:inline">Call Now: 9219635447</span>
            </a>
            <a
              href="https://wa.me/919219635447"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline inline-flex items-center justify-center gap-2 text-[14px] md:text-[16px] py-2.5 md:py-3 px-5 md:px-8"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      {/* Gradient overlay at bottom for smooth transition */}
      <div className="absolute bottom-0 left-0 w-full h-[150px] md:h-[200px] bg-gradient-to-t from-[#080809] to-transparent z-[5] pointer-events-none" />
    </section>
  );
};

export default Hero;
