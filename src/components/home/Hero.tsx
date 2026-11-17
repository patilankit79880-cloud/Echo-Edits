import React, { useState } from 'react';
import { ArrowRight, Sparkles, Play, ShieldCheck, ChevronDown, Video, Eye } from 'lucide-react';
import { ImmersiveHero3D } from '../three/ImmersiveHero3D';
import { CinemaLensScene } from '../three/CinemaLensScene';

interface HeroProps {
  onOpenConsultation: () => void;
  onOpenShowreel: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenConsultation, onOpenShowreel }) => {
  const [viewMode, setViewMode] = useState<'sculpture' | 'cinemaCamera'>('sculpture');

  return (
    <section className="relative min-h-screen pt-28 pb-16 flex flex-col justify-between overflow-hidden bg-[#09090F]">
      {/* Ambient Lighting Layers */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#8B5CF6]/12 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[450px] h-[450px] bg-[#D6B77A]/8 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-10 left-10 w-[350px] h-[350px] bg-[#171329] rounded-full blur-[120px] pointer-events-none" />

      {/* Cinematic Grain Overlay */}
      <div className="absolute inset-0 cinema-grain pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex-1 flex flex-col justify-center">
        {/* Top Tagline & Positioning Pill */}
        <div className="flex items-center gap-2 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#171329] border border-[#8B5CF6]/30 text-xs font-mono text-zinc-300 shadow-xl">
            <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
            <span className="text-white font-semibold tracking-wider">ECHO EDIT</span>
            <span className="text-zinc-500">•</span>
            <span className="text-[#C5A3FF] uppercase font-bold tracking-widest">
              We Capture Stories. We Create Influence.
            </span>
          </div>
        </div>

        {/* Hero Grid: Editorial Typography Left, 3D Chrome Sculpture / Cinema Camera Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading & Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <h1 className="text-[clamp(2.25rem,3.6vw,3.4rem)] font-extrabold font-display text-white leading-[1.06] tracking-tight">
              WE CREATE.{' '}
              <span className="text-gradient-violet block">WE CAPTURE.</span>{' '}
              <span className="text-gradient-gold block">WE INFLUENCE.</span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-xl font-normal">
              Creative storytelling, digital PR and visual experiences designed to make an impact.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <a
                href="#portfolio"
                className="px-6 py-3.5 rounded-xl bg-white text-black hover:bg-zinc-200 font-semibold text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-xl"
              >
                EXPLORE OUR WORK
                <ArrowRight className="w-4 h-4 text-[#8B5CF6]" />
              </a>

              <button
                onClick={onOpenConsultation}
                className="px-6 py-3.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-medium text-xs font-mono uppercase tracking-wider transition-all shadow-lg shadow-[#8B5CF6]/25 hover:shadow-[#8B5CF6]/40 flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#D6B77A]" />
                START A PROJECT
              </button>

              <button
                onClick={onOpenShowreel}
                className="px-4 py-3.5 rounded-xl bg-[#171329] hover:bg-[#231D3D] text-zinc-300 hover:text-white border border-[#8B5CF6]/30 text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 text-[#D6B77A] fill-[#D6B77A]" />
                Showreel
              </button>
            </div>

            {/* Verification Trust Pill */}
            <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400 border-t border-white/10">
              <div className="flex items-center gap-1.5 text-zinc-300">
                <ShieldCheck className="w-4 h-4 text-[#C5A3FF]" />
                <span>Verified Public Collaborations Only</span>
              </div>
              <span className="text-zinc-600 hidden sm:inline">•</span>
              <div className="flex items-center gap-1.5 text-zinc-300">
                <span className="text-[#D6B77A] font-bold">100% Original</span>
                <span>Production Assets</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 3D Luxury Visualizer */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl bg-[#120F20] border border-[#8B5CF6]/30 overflow-hidden shadow-2xl">
              {/* Header Mode Selector */}
              <div className="px-4 py-2.5 bg-[#171329] border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-violet-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                  <span className="text-[11px] font-mono text-zinc-300 ml-2">
                    {viewMode === 'sculpture'
                      ? 'Interactive 3D Chrome Sculpture'
                      : 'Three.js 3D Cinema Camera'}
                  </span>
                </div>

                <div className="flex items-center gap-1 bg-[#09090F] p-1 rounded-lg border border-white/10 text-[11px] font-mono">
                  <button
                    onClick={() => setViewMode('sculpture')}
                    className={`px-2.5 py-1 rounded transition-all cursor-pointer ${
                      viewMode === 'sculpture'
                        ? 'bg-[#8B5CF6] text-white font-semibold'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    3D Sculpture
                  </button>
                  <button
                    onClick={() => setViewMode('cinemaCamera')}
                    className={`px-2.5 py-1 rounded transition-all cursor-pointer ${
                      viewMode === 'cinemaCamera'
                        ? 'bg-[#8B5CF6] text-white font-semibold'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    3D Camera
                  </button>
                </div>
              </div>

              {/* Viewport Canvas */}
              <div className="relative min-h-[460px] sm:min-h-[520px] flex items-center justify-center bg-black/40">
                {viewMode === 'sculpture' ? (
                  <ImmersiveHero3D />
                ) : (
                  <CinemaLensScene />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Agency Statistics Bar */}
        <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <span className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
              50M<span className="text-[#8B5CF6]">+</span>
            </span>
            <p className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
              Organic Reach Generated
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
              150<span className="text-[#D6B77A]">+</span>
            </span>
            <p className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
              High-Stakes Campaigns
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
              25<span className="text-[#8B5CF6]">+</span>
            </span>
            <p className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
              Public Figures & Leaders
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
              99.4<span className="text-[#D6B77A]">%</span>
            </span>
            <p className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
              Client Retention Rate
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="hidden md:flex justify-center mt-8">
          <a
            href="#about"
            className="flex flex-col items-center gap-1.5 text-zinc-500 hover:text-white transition-colors cursor-pointer group"
          >
            <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-500 group-hover:text-[#C5A3FF]">
              SCROLL DOWN
            </span>
            <ChevronDown className="w-4 h-4 text-[#8B5CF6] animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
};
