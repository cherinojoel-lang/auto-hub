import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxProps {
  images: string[];
  currentIndex: number;
  alt: string;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onGoTo: (index: number) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  images, currentIndex, alt, onClose, onNext, onPrev, onGoTo
}) => {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowRight') onNext();
    if (e.key === 'ArrowLeft') onPrev();
  }, [onClose, onNext, onPrev]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Bildgalerie"
    >
      <button
        className="absolute top-4 right-4 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        onClick={onClose}
        aria-label="Galerie schließen"
      >
        <X size={24} />
      </button>

      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/70 text-sm font-medium select-none">
        {currentIndex + 1} / {images.length}
      </div>

      {images.length > 1 && (
        <button
          className="absolute left-4 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          aria-label="Vorheriges Bild"
        >
          <ChevronLeft size={28} />
        </button>
      )}

      <img
        src={images[currentIndex]}
        alt={`${alt} – Bild ${currentIndex + 1}`}
        className="max-w-[92vw] max-h-[88vh] object-contain select-none"
        onClick={(e) => e.stopPropagation()}
        draggable={false}
      />

      {images.length > 1 && (
        <button
          className="absolute right-4 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          aria-label="Nächstes Bild"
        >
          <ChevronRight size={28} />
        </button>
      )}

      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 max-w-[90vw] overflow-x-auto py-1 px-2">
          {images.map((img, i) => (
            <button
              key={`${img}-${i}`}
              onClick={(e) => { e.stopPropagation(); onGoTo(i); }}
              className={`flex-shrink-0 w-12 h-9 rounded overflow-hidden border-2 transition-colors ${
                i === currentIndex ? 'border-white' : 'border-transparent opacity-60 hover:opacity-100'
              }`}
              aria-label={`Bild ${i + 1} anzeigen`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
