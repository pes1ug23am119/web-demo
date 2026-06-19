import type { ChairPartData } from '../../data/operatory';

interface ChairPartProps {
  data: ChairPartData;
  progress: number; // 0 = assembled, 1 = exploded
  gyroOffset: number;
  baseScale: number;
}

export default function ChairPart({
  data,
  progress,
  gyroOffset,
  baseScale,
}: ChairPartProps) {
  const { assembled, exploded, category, label } = data;

  // Smooth eased progress
  const ease = progress < 0.5
    ? 2 * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 2) / 2;

  const x = (assembled.x + (exploded.x - assembled.x) * ease) * baseScale;
  const y = (assembled.y + (exploded.y - assembled.y) * ease) * baseScale;
  const z = (assembled.z + (exploded.z - assembled.z) * ease) * baseScale;
  const rotateX = assembled.rotateX + (exploded.rotateX - assembled.rotateX) * ease;
  const rotateY = assembled.rotateY + (exploded.rotateY - assembled.rotateY) * ease;
  const rotateZ = assembled.rotateZ + (exploded.rotateZ - assembled.rotateZ) * ease;
  const scale = 1 + (exploded.scale - 1) * ease;

  const width = assembled.width * scale * baseScale;
  const height = assembled.height * scale * baseScale;
  const depth = assembled.depth * scale * baseScale;

  const transform = `
    translate(-50%, -50%)
    translate3d(${x + gyroOffset * (x > 0 ? 1 : -1)}px, ${y}px, ${z}px)
    rotateX(${rotateX}deg)
    rotateY(${rotateY}deg)
    rotateZ(${rotateZ}deg)
    scale(${scale})
  `;

  return (
    <div
      className="chair-part"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        transform,
      }}
    >
      {/* Front face with product image */}
      <div
        className="chair-face"
        style={{
          transform: `translateZ(${depth / 2}px)`,
          width: `${width}px`,
          height: `${height}px`,
          backgroundImage: `url(${category.image})`,
        }}
      >
        <div className="blueprint-overlay" />
        {/* Category label (visible when exploded) */}
        <div
          className="absolute bottom-0 left-0 right-0 p-3 md:p-4 rounded-b-xl transition-opacity duration-500"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)',
            opacity: ease,
          }}
        >
          <p className="font-mono text-[10px] md:text-[11px] uppercase tracking-widest text-white/70 mb-1">
            {label}
          </p>
          <h3 className="font-body text-sm md:text-base font-semibold text-white leading-tight mb-1">
            {category.title}
          </h3>
          <p className="font-body text-[10px] md:text-xs text-white/70 leading-snug hidden md:block">
            {category.description}
          </p>
        </div>
      </div>

      {/* Back face */}
      <div
        className="chair-face"
        style={{
          transform: `rotateY(180deg) translateZ(${depth / 2}px)`,
          width: `${width}px`,
          height: `${height}px`,
          backgroundColor: 'var(--surface-elevated)',
          backgroundImage: 'none',
        }}
      />

      {/* Side faces */}
      <div
        className="chair-face"
        style={{
          transform: `rotateY(90deg) translateZ(${width / 2}px)`,
          width: `${depth}px`,
          height: `${height}px`,
          left: `${(width - depth) / 2}px`,
          backgroundColor: 'rgba(var(--accent-color-rgb), 0.15)',
          backgroundImage: 'none',
        }}
      />
      <div
        className="chair-face"
        style={{
          transform: `rotateY(-90deg) translateZ(${width / 2}px)`,
          width: `${depth}px`,
          height: `${height}px`,
          left: `${(width - depth) / 2}px`,
          backgroundColor: 'rgba(var(--accent-color-rgb), 0.1)',
          backgroundImage: 'none',
        }}
      />
      <div
        className="chair-face"
        style={{
          transform: `rotateX(90deg) translateZ(${height / 2}px)`,
          width: `${width}px`,
          height: `${depth}px`,
          top: `${(height - depth) / 2}px`,
          backgroundColor: 'rgba(var(--accent-color-rgb), 0.12)',
          backgroundImage: 'none',
        }}
      />
      <div
        className="chair-face"
        style={{
          transform: `rotateX(-90deg) translateZ(${height / 2}px)`,
          width: `${width}px`,
          height: `${depth}px`,
          top: `${(height - depth) / 2}px`,
          backgroundColor: 'rgba(var(--accent-color-rgb), 0.08)',
          backgroundImage: 'none',
        }}
      />

      {/* Holographic label */}
      <div className="holo-label" style={{ top: '-24px', left: '0' }}>
        {label}
      </div>
    </div>
  );
}
