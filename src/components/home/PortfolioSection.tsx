import React, { useState, useMemo, useRef } from 'react';
import { Sparkles, Maximize2, Calendar, User, Eye, ArrowUpRight } from 'lucide-react';
import { useAgency } from '../../context/AgencyContext';
import { PortfolioItem } from '../../types';
import { SafeImage } from '../common/SafeImage';

interface PortfolioSectionProps {
  onSelectProject: (item: PortfolioItem) => void;
  onOpenShowreel: () => void;
}

// 3D Tilt Card Component for Authentic Photography
const TiltPortfolioCard: React.FC<{
  item: PortfolioItem;
  onSelect: () => void;
}> = ({ item, onSelect }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState<string>(
    'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
  );
  const [glare, setGlare] = useState<{ x: number; y: number; opacity: number }>({
    x: 50,
    y: 50,
    opacity: 0,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6; // max 6 deg
    const rotateY = ((x - centerX) / centerX) * 6;

    setTransform(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`
    );
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.15,
    });
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onSelect}
      style={{
        transform,
        transition: 'transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.25s ease',
      }}
      className="group relative rounded-2xl overflow-hidden cursor-pointer flex flex-col justify-between bg-[#171329]/80 border border-[#8B5CF6]/20 hover:border-[#8B5CF6]/60 shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_45px_rgba(139,92,246,0.25)] transition-colors will-change-transform"
    >
      {/* Glare effect */}
      <div
        className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300 rounded-2xl"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}) 0%, transparent 60%)`,
        }}
      />

      <div>
        {/* Photo Thumbnail Container */}
        <div className="relative aspect-[4/5] overflow-hidden bg-[#09090F]">
          <SafeImage
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
            loading="eager"
          />

          {/* Vignette & Midnight Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#171329] via-transparent to-black/40 opacity-80 group-hover:opacity-60 transition-opacity" />

          {/* Category Tag Badge */}
          <div className="absolute top-3.5 left-3.5 z-20">
            <span className="px-3 py-1 rounded-full bg-[#09090F]/85 backdrop-blur-md border border-[#8B5CF6]/30 text-[10px] font-mono uppercase tracking-wider text-[#C5A3FF] font-semibold shadow-md">
              {item.category.replace(/-/g, ' ')}
            </span>
          </div>

          {/* Fullscreen Inspect Icon */}
          <div className="absolute top-3.5 right-3.5 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
            <div className="p-2.5 rounded-full bg-[#8B5CF6] text-white shadow-lg shadow-[#8B5CF6]/40 hover:scale-110 transition-transform">
              <Maximize2 className="w-4 h-4" />
            </div>
          </div>

          {/* Bottom Title inside Image Area */}
          <div className="absolute bottom-4 left-4 right-4 z-20 text-left">
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#D6B77A] mb-1.5">
              <User className="w-3.5 h-3.5 text-[#D6B77A]" />
              <span className="truncate tracking-wide">{item.clientOrPersonality}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold font-display text-white group-hover:text-[#C5A3FF] transition-colors leading-snug line-clamp-2">
              {item.title}
            </h3>
          </div>
        </div>

        {/* Narrative Description & Tags */}
        <div className="p-5 space-y-3.5 bg-[#171329]/90">
          <p className="text-xs text-zinc-300 leading-relaxed line-clamp-2 font-normal">
            {item.description}
          </p>

          {/* Work Performed Pills */}
          {item.workPerformed && item.workPerformed.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {item.workPerformed.slice(0, 2).map((work, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-0.5 rounded-md bg-[#09090F] border border-[#8B5CF6]/15 text-[10px] font-mono text-[#C5A3FF]"
                >
                  {work}
                </span>
              ))}
              {item.workPerformed.length > 2 && (
                <span className="px-2 py-0.5 rounded-md bg-[#09090F] border border-white/5 text-[10px] font-mono text-zinc-400">
                  +{item.workPerformed.length - 2}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-5 pb-4 pt-2.5 flex items-center justify-between text-xs font-mono text-zinc-400 border-t border-white/5 bg-[#171329]/90">
        <span className="flex items-center gap-1.5 text-[11px]">
          <Calendar className="w-3 h-3 text-[#D6B77A]" />
          {item.projectDate || 'Verified Production'}
        </span>
        <span className="text-[#C5A3FF] group-hover:text-white font-medium flex items-center gap-1 transition-colors">
          Inspect Case <ArrowUpRight className="w-3.5 h-3.5 text-[#8B5CF6] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </span>
      </div>
    </div>
  );
};

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  onSelectProject,
  onOpenShowreel,
}) => {
  const { portfolioItems } = useAgency();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Works' },
    { id: 'featured-collaborations', label: 'Featured Collaborations' },
    { id: 'political-personalities', label: 'Political & Public Personalities' },
    { id: 'event-coverage', label: 'Event Coverage' },
    { id: 'photography', label: 'Photography' },
    { id: 'promotional-videos', label: 'Promotional Videos' },
    { id: 'behind-the-scenes', label: 'Behind the Scenes' },
    { id: 'creative-projects', label: 'Creative Projects' },
  ];

  const filteredItems = useMemo(() => {
    return portfolioItems.filter((item) => {
      if (!item.isPublished) return false;
      if (activeCategory === 'all') return true;
      return item.category === activeCategory;
    });
  }, [portfolioItems, activeCategory]);

  return (
    <section id="portfolio" className="py-28 bg-[#09090F] border-t border-white/10 relative overflow-hidden">
      {/* Background Ambient Violet Glow */}
      <div className="absolute top-1/4 left-1/3 w-[650px] h-[650px] bg-[#8B5CF6]/10 rounded-full blur-[220px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#D6B77A]/5 rounded-full blur-[190px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#171329] border border-[#8B5CF6]/30 text-xs font-mono text-[#C5A3FF] uppercase tracking-wider mb-4">
              <span className="w-2 h-2 rounded-full bg-[#8B5CF6] animate-pulse" />
              Verified Portfolio Archive
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display text-white tracking-tight">
              OUR WORK <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#C5A3FF] to-[#D6B77A]">SPEAKS LOUDER.</span>
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-sm text-zinc-300 leading-relaxed font-sans">
              Authentic original photographs and video productions with public personalities, stadium arenas, fashion icons, and political media units.
            </p>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 no-scrollbar">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4.5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white font-bold shadow-lg shadow-[#8B5CF6]/30 border border-[#C5A3FF]/40'
                    : 'bg-[#171329]/80 text-zinc-400 hover:text-white hover:bg-[#1f1938] border border-white/10'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Portfolio 3D Grid */}
        {filteredItems.length === 0 ? (
          <div className="py-20 text-center bg-[#171329]/50 rounded-2xl border border-white/10 p-8 backdrop-blur-md">
            <p className="text-sm text-zinc-400 font-mono mb-4">
              {activeCategory === 'promotional-videos'
                ? 'Looking for our motion pictures and showreels?'
                : 'No projects currently in this category.'}
            </p>
            {activeCategory === 'promotional-videos' && (
              <button
                onClick={onOpenShowreel}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white font-mono text-xs uppercase tracking-wider cursor-pointer shadow-lg shadow-[#8B5CF6]/30"
              >
                Open Full Video Showreel
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8">
            {filteredItems.map((item) => (
              <TiltPortfolioCard
                key={item.id}
                item={item}
                onSelect={() => onSelectProject(item)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
