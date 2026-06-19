import { CHAIR_PARTS } from '../../data/operatory';
import { useWindowSize } from '../../hooks/useWindowSize';
import ChairPart from './ChairPart';

interface ChairAssemblyProps {
  scrollProgress: number;
  gyroGamma: number;
}

export default function ChairAssembly({ scrollProgress, gyroGamma }: ChairAssemblyProps) {
  const { width } = useWindowSize();
  // Responsive scale: 0.45 on small phones, 1.0 on desktop
  const baseScale = Math.min(1, Math.max(0.45, width / 900));

  // 0-30%: rotate chair 0 -> 90deg
  // 25-55%: explode
  // 55-75%: hold exploded
  // 75-100%: reassemble
  const rotationProgress = Math.min(1, scrollProgress / 0.30);
  const explosionStart = 0.25;
  const explosionEnd = 0.55;
  const reassemblyStart = 0.75;

  let explosionProgress = 0;
  if (scrollProgress >= explosionStart && scrollProgress <= explosionEnd) {
    explosionProgress = (scrollProgress - explosionStart) / (explosionEnd - explosionStart);
  } else if (scrollProgress > explosionEnd && scrollProgress < reassemblyStart) {
    explosionProgress = 1;
  } else if (scrollProgress >= reassemblyStart) {
    explosionProgress = 1 - (scrollProgress - reassemblyStart) / (1 - reassemblyStart);
  }

  const clampedExplosion = Math.max(0, Math.min(1, explosionProgress));
  const assemblyRotation = rotationProgress * 90;
  const gyroOffset = gyroGamma * 0.5; // subtle parallax

  return (
    <div className="chair-stage absolute inset-0 flex items-center justify-center pointer-events-none">
      <div
        className="chair-assembly relative"
        style={{
          width: '100%',
          height: '100%',
          transform: `rotateY(${assemblyRotation}deg)`,
        }}
      >
        {CHAIR_PARTS.map((part) => (
          <ChairPart
            key={part.id}
            data={part}
            progress={clampedExplosion}
            gyroOffset={gyroOffset}
            baseScale={baseScale}
          />
        ))}
      </div>
    </div>
  );
}
