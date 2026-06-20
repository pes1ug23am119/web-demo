import { CATEGORIES } from '../data/operatory';
import { X } from 'lucide-react';

interface CategoryGridProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CategoryGrid({ isOpen, onClose }: CategoryGridProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8"
      style={{
        backgroundColor: 'rgba(var(--bg-page-rgb), 0.92)',
        backdropFilter: 'blur(20px)',
      }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-[1200px] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <div>
            <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] text-[var(--accent-color)] mb-2">
              Product Categories
            </p>
            <h2 className="font-display text-[clamp(1.6rem,4vw,2.8rem)] leading-[1.1] text-[var(--text-primary)]">
              Everything Inside the Chair
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-color)] transition-colors"
            aria-label="Close categories"
          >
            <X size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {CATEGORIES.map((category) => (
            <div
              key={category.id}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer"
              style={{
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border)',
                boxShadow: '0 10px 40px var(--shadow-color)',
              }}
            >
              <img
                src={category.image}
                alt={category.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                <h3 className="font-body text-base md:text-lg font-semibold text-white mb-1">
                  {category.title}
                </h3>
                <p className="font-body text-xs md:text-sm text-white/75 leading-relaxed">
                  {category.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
