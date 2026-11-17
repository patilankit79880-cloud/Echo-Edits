import React, { useEffect } from 'react';
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, Calendar, User, Tag, Sparkles } from 'lucide-react';
import { PortfolioItem } from '../../types';
import { SafeImage } from '../common/SafeImage';

interface LightboxModalProps {
  item: PortfolioItem | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
  onInquire?: (projectTitle: string) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  item,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
  onInquire,
}) => {
  const [zoom, setZoom] = React.useState(1);
  const [activeImageIndex, setActiveImageIndex] = React.useState(0);

  useEffect(() => {
    setZoom(1);
    setActiveImageIndex(0);
  }, [item]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev && hasPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext && hasNext) onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  if (!item) return null;

  const allImages = [item.image, ...(item.additionalImages || [])];
  const currentImage = allImages[activeImageIndex] || item.image;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-3 md:p-6 overflow-y-auto">
      {/* Close button */}
      <button
        onClick={onClose}
        className="fixed top-5 right-5 z-50 p-2.5 rounded-full bg-[#171329] text-zinc-300 hover:text-white hover:bg-[#8B5CF6] border border-[#8B5CF6]/30 transition-colors cursor-pointer"
        aria-label="Close Lightbox"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Prev / Next controls */}
      {hasPrev && (
        <button
          onClick={onPrev}
          className="fixed left-4 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-[#171329]/90 text-zinc-300 hover:text-white hover:bg-[#8B5CF6] border border-[#8B5CF6]/30 transition-colors cursor-pointer hidden md:flex items-center justify-center"
          aria-label="Previous Project"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {hasNext && (
        <button
          onClick={onNext}
          className="fixed right-4 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-[#171329]/90 text-zinc-300 hover:text-white hover:bg-[#8B5CF6] border border-[#8B5CF6]/30 transition-colors cursor-pointer hidden md:flex items-center justify-center"
          aria-label="Next Project"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Modal Dialog Content */}
      <div className="relative w-full max-w-6xl max-h-[92vh] bg-[#09090F] border border-[#8B5CF6]/30 rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row my-auto">
        {/* Left Side: Photo Viewer */}
        <div className="relative flex-1 bg-black/80 flex flex-col items-center justify-center min-h-[380px] lg:min-h-[600px] p-4 overflow-hidden">
          <div className="relative max-w-full max-h-[72vh] flex items-center justify-center overflow-hidden">
            <SafeImage
              src={currentImage}
              alt={item.title}
              style={{ transform: `scale(${zoom})` }}
              className="max-h-[68vh] w-auto object-contain rounded-xl transition-transform duration-200 select-none shadow-2xl"
            />
          </div>

          {/* Zoom & View Controls */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#171329]/90 border border-[#8B5CF6]/30 text-xs text-zinc-300">
            <button
              onClick={() => setZoom(prev => Math.max(0.8, prev - 0.2))}
              className="p-1 hover:text-white cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="font-mono text-[11px] px-1 text-[#C5A3FF]">{Math.round(zoom * 100)}%</span>
            <button
              onClick={() => setZoom(prev => Math.min(2.2, prev + 0.2))}
              className="p-1 hover:text-white cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            {zoom !== 1 && (
              <button
                onClick={() => setZoom(1)}
                className="ml-2 font-mono text-[10px] uppercase text-[#D6B77A] hover:underline cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>

          {/* Multiple Image Thumbnails if present */}
          {allImages.length > 1 && (
            <div className="absolute top-4 left-4 flex gap-2">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveImageIndex(idx);
                    setZoom(1);
                  }}
                  className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                    activeImageIndex === idx ? 'border-[#8B5CF6] scale-105' : 'border-white/20 opacity-60 hover:opacity-100'
                  }`}
                >
                  <SafeImage src={img} alt={`Angle ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Detailed Project Specs */}
        <div className="w-full lg:w-[420px] bg-[#171329] p-6 lg:p-8 flex flex-col justify-between overflow-y-auto border-t lg:border-t-0 lg:border-l border-[#8B5CF6]/20">
          <div>
            {/* Category & Badge */}
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full bg-[#09090F] border border-[#8B5CF6]/30 text-[#C5A3FF] text-xs font-mono font-medium uppercase">
                {item.category.replace(/-/g, ' ')}
              </span>
              {item.projectDate && (
                <span className="flex items-center gap-1 text-xs text-[#D6B77A] font-mono">
                  <Calendar className="w-3.5 h-3.5" />
                  {item.projectDate}
                </span>
              )}
            </div>

            {/* Title */}
            <h3 className="text-xl lg:text-2xl font-bold font-display text-white tracking-tight mb-2">
              {item.title}
            </h3>

            {/* Personality / Client */}
            <div className="flex items-center gap-2 text-sm text-[#D6B77A] font-medium mb-4 pb-4 border-b border-white/10 font-mono">
              <User className="w-4 h-4 text-[#D6B77A]" />
              <span>{item.clientOrPersonality}</span>
            </div>

            {/* Description */}
            <p className="text-sm text-zinc-300 leading-relaxed mb-6 font-sans">
              {item.description}
            </p>

            {/* Work Performed */}
            {item.workPerformed && item.workPerformed.length > 0 && (
              <div className="mb-6">
                <h4 className="text-xs uppercase tracking-wider font-mono text-zinc-400 mb-2.5 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#8B5CF6]" />
                  Work Performed & Scope
                </h4>
                <ul className="space-y-1.5">
                  {item.workPerformed.map((work, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                      <span className="text-[#8B5CF6] mt-0.5">•</span>
                      <span>{work}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Action CTA */}
          <div className="pt-4 border-t border-white/10 mt-4 flex flex-col gap-2">
            <button
              onClick={() => {
                onClose();
                if (onInquire) onInquire(item.title);
              }}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] hover:brightness-110 text-white font-medium text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#8B5CF6]/30 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              Inquire Similar Campaign
            </button>
            <p className="text-[11px] text-zinc-500 text-center font-mono">
              Original Verified Agency Photography Asset
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
