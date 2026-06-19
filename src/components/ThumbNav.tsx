import { useRef } from 'react';

interface ThumbNavProps {
  onScrub?: (progress: number) => void;
}

export default function ThumbNav({ onScrub }: ThumbNavProps) {
  const arcRef = useRef<SVGSVGElement>(null);

  const handleMove = (clientX: number) => {
    if (!arcRef.current) return;
    const rect = arcRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const progress = Math.max(0, Math.min(1, x / rect.width));
    
    // Scroll to position
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: docHeight * progress, behavior: 'auto' });
    onScrub?.(progress);
  };

  const handleTouch = (e: React.TouchEvent) => {
    e.preventDefault();
    handleMove(e.touches[0].clientX);
  };

  const handleMouse = (e: React.MouseEvent) => {
    if (e.buttons === 1) handleMove(e.clientX);
  };

  const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
  if (!isTouchDevice) return null;

  return (
    <div className="thumb-nav md:hidden">
      <svg
        ref={arcRef}
        className="thumb-nav-arc"
        viewBox="0 0 280 140"
        onTouchMove={handleTouch}
        onTouchStart={handleTouch}
        onMouseMove={handleMouse}
        onMouseDown={handleMouse}
      >
        <path
          d="M 20 120 A 120 120 0 0 1 260 120"
          fill="none"
          stroke="var(--border)"
          strokeWidth="24"
          strokeLinecap="round"
          opacity="0.5"
        />
        <path
          d="M 20 120 A 120 120 0 0 1 260 120"
          fill="none"
          stroke="var(--accent-color)"
          strokeWidth="24"
          strokeLinecap="round"
          strokeDasharray="377"
          strokeDashoffset="188"
          opacity="0.3"
        />
        <text
          x="140"
          y="115"
          textAnchor="middle"
          className="font-mono text-[10px] fill-[var(--text-secondary)] uppercase tracking-widest pointer-events-none"
        >
          Scrub
        </text>
      </svg>
    </div>
  );
}
