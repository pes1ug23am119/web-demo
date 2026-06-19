import { forwardRef } from 'react';
import type { ChairPartData } from '../../data/operatory';

interface ChairPartProps {
  data: ChairPartData;
  baseScale: number;
}

const ChairPart = forwardRef<HTMLDivElement, ChairPartProps>(function ChairPart(
  { data, baseScale },
  ref
) {
  const { assembled, category, label } = data;

  const width = assembled.width * baseScale;
  const height = assembled.height * baseScale;
  const depth = assembled.depth * baseScale;

  return (
    <div
      ref={ref}
      className="chair-part"
      data-id={data.id}
      style={{
        width: `${width}px`,
        height: `${height}px`,
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
        <div className="part-label absolute bottom-0 left-0 right-0 p-3 md:p-4 rounded-b-xl">
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
        className="chair-face chair-face-solid"
        style={{
          transform: `rotateY(180deg) translateZ(${depth / 2}px)`,
          width: `${width}px`,
          height: `${height}px`,
        }}
      />

      {/* Side faces */}
      <div
        className="chair-face chair-face-side"
        style={{
          transform: `rotateY(90deg) translateZ(${width / 2}px)`,
          width: `${depth}px`,
          height: `${height}px`,
          left: `${(width - depth) / 2}px`,
        }}
      />
      <div
        className="chair-face chair-face-side"
        style={{
          transform: `rotateY(-90deg) translateZ(${width / 2}px)`,
          width: `${depth}px`,
          height: `${height}px`,
          left: `${(width - depth) / 2}px`,
        }}
      />
      <div
        className="chair-face chair-face-side"
        style={{
          transform: `rotateX(90deg) translateZ(${height / 2}px)`,
          width: `${width}px`,
          height: `${depth}px`,
          top: `${(height - depth) / 2}px`,
        }}
      />
      <div
        className="chair-face chair-face-side"
        style={{
          transform: `rotateX(-90deg) translateZ(${height / 2}px)`,
          width: `${width}px`,
          height: `${depth}px`,
          top: `${(height - depth) / 2}px`,
        }}
      />

      {/* Holographic label */}
      <div className="holo-label" style={{ top: '-24px', left: '0' }}>
        {label}
      </div>
    </div>
  );
});

export default ChairPart;
