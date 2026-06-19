import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CHAIR_PARTS } from '../../data/operatory';
import { useWindowSize } from '../../hooks/useWindowSize';
import ChairPart from './ChairPart';

gsap.registerPlugin(ScrollTrigger);

export default function ChairAssembly() {
  const { width } = useWindowSize();
  const baseScale = Math.min(1, Math.max(0.5, width / 850));

  const assemblyRef = useRef<HTMLDivElement>(null);
  const partRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const assembly = assemblyRef.current;
    if (!assembly) return;

    const ctx = gsap.context(() => {
      // Whole chair rotation: 0 -> 90deg over first 30% of scroll
      gsap.fromTo(
        assembly,
        { rotateY: 0 },
        {
          rotateY: 90,
          ease: 'none',
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: '30% top',
            scrub: 0.5,
          },
        }
      );

      CHAIR_PARTS.forEach((part, i) => {
        const el = partRefs.current[i];
        if (!el) return;

        const a = part.assembled;
        const e = part.exploded;

        const assembledState = transformState(a, a, 1, baseScale, 0);
        const explodedState = transformState(a, e, e.scale, baseScale, 1);

        // Set initial assembled state
        gsap.set(el, assembledState);

        // Explode: 25% -> 55%
        gsap.to(el, {
          ...explodedState,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: document.body,
            start: '25% top',
            end: '55% top',
            scrub: 0.5,
          },
        });

        // Reassemble: 75% -> 100%
        gsap.to(el, {
          ...assembledState,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: document.body,
            start: '75% top',
            end: 'bottom bottom',
            scrub: 0.5,
          },
        });

        // Label fade in/out
        const label = el.querySelector('.part-label') as HTMLElement | null;
        if (label) {
          gsap.fromTo(
            label,
            { opacity: 0 },
            {
              opacity: 1,
              scrollTrigger: {
                trigger: document.body,
                start: '30% top',
                end: '55% top',
                scrub: true,
              },
            }
          );
          gsap.fromTo(
            label,
            { opacity: 1 },
            {
              opacity: 0,
              scrollTrigger: {
                trigger: document.body,
                start: '75% top',
                end: '90% top',
                scrub: true,
              },
            }
          );
        }
      });
    }, assembly);

    return () => ctx.revert();
  }, [baseScale]);

  return (
    <div className="chair-stage absolute inset-0 flex items-center justify-center pointer-events-none z-0">
      <div
        ref={assemblyRef}
        className="chair-assembly relative"
        style={{ width: '100%', height: '100%' }}
      >
        {CHAIR_PARTS.map((part, i) => (
          <ChairPart
            key={part.id}
            ref={(el) => { partRefs.current[i] = el; }}
            data={part}
            baseScale={baseScale}
          />
        ))}
      </div>
    </div>
  );
}

function transformState(
  a: { x: number; y: number; z: number; rotateX: number; rotateY: number; rotateZ: number },
  t: { x: number; y: number; z: number; rotateX: number; rotateY: number; rotateZ: number },
  scale: number,
  baseScale: number,
  ease: number
) {
  const x = (a.x + (t.x - a.x) * ease) * baseScale;
  const y = (a.y + (t.y - a.y) * ease) * baseScale;
  const z = (a.z + (t.z - a.z) * ease) * baseScale;
  const rx = a.rotateX + (t.rotateX - a.rotateX) * ease;
  const ry = a.rotateY + (t.rotateY - a.rotateY) * ease;
  const rz = a.rotateZ + (t.rotateZ - a.rotateZ) * ease;

  return {
    xPercent: -50,
    yPercent: -50,
    x,
    y,
    z,
    rotateX: rx,
    rotateY: ry,
    rotateZ: rz,
    scale,
  };
}
