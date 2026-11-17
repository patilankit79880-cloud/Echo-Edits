import React, { useState } from 'react';
import { Quote, Sparkles, CheckCircle2, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useAgency } from '../../context/AgencyContext';

export const TestimonialsSection: React.FC = () => {
  const { testimonials } = useAgency();
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : testimonials.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < testimonials.length - 1 ? prev + 1 : 0));
  };

  return (
    <section className="py-28 bg-[#09090F] border-t border-white/10 relative overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#8B5CF6]/10 rounded-full blur-[200px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-[#D6B77A]/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#171329] border border-[#8B5CF6]/30 text-xs font-mono text-[#C5A3FF] uppercase tracking-wider mb-4">
              <span className="w-2 h-2 rounded-full bg-[#D6B77A] animate-pulse" />
              Verified Collaborator Endorsements
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display text-white tracking-tight leading-tight">
              TRUSTED BY <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#C5A3FF] to-[#D6B77A]">LEADERS & CREATORS.</span>
            </h2>
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={handlePrev}
              className="p-3 rounded-xl bg-[#171329] hover:bg-[#251e44] text-[#C5A3FF] hover:text-white border border-[#8B5CF6]/30 transition-all cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-3 rounded-xl bg-[#171329] hover:bg-[#251e44] text-[#C5A3FF] hover:text-white border border-[#8B5CF6]/30 transition-all cursor-pointer"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Testimonials Grid / Carousel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => {
            const isFeatured = idx === activeIndex;
            return (
              <div
                key={item.id}
                onClick={() => setActiveIndex(idx)}
                className={`relative rounded-3xl p-8 transition-all duration-500 cursor-pointer flex flex-col justify-between ${
                  isFeatured
                    ? 'bg-[#171329] border border-[#8B5CF6]/60 shadow-[0_20px_50px_rgba(139,92,246,0.2)] -translate-y-2'
                    : 'bg-[#171329]/50 border border-white/5 hover:border-[#8B5CF6]/30 shadow-xl'
                }`}
              >
                {/* Quote Icon & Stars */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/15 text-[#8B5CF6] flex items-center justify-center">
                      <Quote className="w-5 h-5 text-[#C5A3FF]" />
                    </div>
                    <div className="flex items-center gap-1 text-[#D6B77A]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#D6B77A]" />
                      ))}
                    </div>
                  </div>

                  {/* Quote Body */}
                  <p className="text-sm sm:text-base text-zinc-200 leading-relaxed font-normal mb-8 italic">
                    "{item.quote}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold font-display text-white">
                      {item.author}
                    </h4>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      {item.role} • <span className="text-[#D6B77A]">{item.organization}</span>
                    </p>
                  </div>
                  {item.verified && (
                    <div className="flex items-center gap-1 text-[10px] font-mono text-[#C5A3FF] bg-[#09090F] px-2.5 py-1 rounded-full border border-[#8B5CF6]/20">
                      <CheckCircle2 className="w-3 h-3 text-[#8B5CF6]" />
                      Verified
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
