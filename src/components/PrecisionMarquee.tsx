import { useScrollVelocity } from '../hooks/useScrollVelocity';

export default function PrecisionMarquee() {
  const velocity = useScrollVelocity();

  // ScaleX based on velocity — fast scroll squishes, slow scroll stretches
  const scaleX = Math.max(0.7, Math.min(1.3, 1 - velocity * 0.15));
  const skewX = Math.max(-8, Math.min(8, velocity * 2));

  return (
    <div className="fixed top-1/2 left-0 right-0 -translate-y-1/2 z-0 pointer-events-none overflow-hidden opacity-20 mix-blend-multiply">
      <div
        className="precision-marquee flex justify-center"
        style={{
          transform: `scaleX(${scaleX}) skewX(${skewX}deg)`,
          transition: 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <span className="px-8">
          Precision engineered for the dentist who accepts nothing less than perfection
        </span>
        <span className="px-8 opacity-50">
          ·
        </span>
        <span className="px-8">
          Precision engineered for the dentist who accepts nothing less than perfection
        </span>
      </div>
    </div>
  );
}
