import { TIMELINE } from '../data/operatory';

interface TimelineProps {
  progress: number;
}

export default function Timeline({ progress }: TimelineProps) {
  // Timeline is active between 15% and 85% scroll
  const timelineProgress = Math.max(0, Math.min(1, (progress - 0.15) / 0.70));
  const dashOffset = 1 - timelineProgress;

  return (
    <div className="fixed left-4 md:left-8 top-1/2 -translate-y-1/2 h-[60vh] w-12 md:w-16 z-20 pointer-events-none hidden sm:flex flex-col items-center">
      <svg
        className="h-full w-full"
        viewBox="0 0 40 400"
        preserveAspectRatio="none"
        style={{ overflow: 'visible' }}
      >
        {/* Background line */}
        <line x1="20" y1="0" x2="20" y2="400" className="timeline-line" />
        {/* Glowing progress line */}
        <line
          x1="20"
          y1="0"
          x2="20"
          y2="400"
          stroke="var(--accent-color)"
          strokeWidth="2"
          strokeDasharray="400"
          strokeDashoffset={400 * dashOffset}
          style={{ filter: 'drop-shadow(0 0 6px var(--glow-color))', transition: 'stroke-dashoffset 0.1s linear' }}
        />
        {/* Traveling node */}
        <circle
          cx="20"
          cy={400 * timelineProgress}
          r="6"
          className="timeline-node"
        />
      </svg>

      {/* Year labels */}
      <div className="absolute inset-0 flex flex-col justify-between py-2">
        {TIMELINE.map((event) => {
          const isActive = timelineProgress >= event.progress;
          return (
            <div
              key={event.year}
              className="absolute left-8 md:left-10 transition-all duration-500"
              style={{ top: `${event.progress * 100}%`, transform: 'translateY(-50%)' }}
            >
              <div
                className="font-mono text-xs md:text-sm font-bold tracking-wider"
                style={{
                  color: isActive ? 'var(--accent-color)' : 'var(--text-secondary)',
                  textShadow: isActive ? '0 0 10px var(--glow-color)' : 'none',
                }}
              >
                {event.year}
              </div>
              <div
                className="font-body text-[10px] md:text-xs text-[var(--text-secondary)] mt-0.5 max-w-[140px]"
                style={{ opacity: isActive ? 1 : 0.4 }}
              >
                {event.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
