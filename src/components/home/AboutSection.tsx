import React from 'react';
import { Sparkles, Target, Video, ShieldCheck, Megaphone, Compass, Eye, Award } from 'lucide-react';
import { SafeImage } from '../common/SafeImage';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-28 bg-[#09090F] border-t border-white/10 relative overflow-hidden">
      {/* Ambient Lighting & Glow */}
      <div className="absolute top-1/3 -left-20 w-[500px] h-[500px] bg-[#8B5CF6]/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[450px] h-[450px] bg-[#D6B77A]/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Decorative 3D Wireframe Grid lines */}
      <div className="absolute inset-0 bg-[radial-gradient(#8B5CF6_1px,transparent_1px)] [background-size:36px_36px] opacity-[0.04] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Pill & Heading */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#171329] border border-[#8B5CF6]/30 text-xs font-mono text-[#C5A3FF] uppercase tracking-wider mb-5">
            <span className="w-2 h-2 rounded-full bg-[#8B5CF6] animate-pulse" />
            About ECHO EDIT
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display text-white tracking-tight leading-[1.1]">
            WE ARE MORE THAN JUST A <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#C5A3FF] to-[#D6B77A]">MEDIA AGENCY.</span>
          </h2>
        </div>

        {/* Narrative & Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Narrative Column */}
          <div className="lg:col-span-7 space-y-6">
            <p className="text-xl sm:text-2xl font-light text-[#F5F1FF] leading-relaxed">
              ECHO EDIT is a creative digital media and public relations agency specializing in professional storytelling, political communication, social media management, video production and creative media solutions.
            </p>

            <p className="text-base text-zinc-400 leading-relaxed font-normal">
              We bridge the gap between creative artistry and strategic influence, helping political leaders, brands and public figures build enduring digital authority. Our mission is to create meaningful digital experiences through cinematic media production and strategic communication.
            </p>

            {/* 4 Brand Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
              <div className="p-5 rounded-2xl bg-[#171329]/70 border border-[#8B5CF6]/20 hover:border-[#8B5CF6]/50 transition-all duration-300 space-y-2.5 backdrop-blur-md group">
                <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/15 text-[#C5A3FF] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Megaphone className="w-5 h-5 text-[#8B5CF6]" />
                </div>
                <h4 className="text-sm font-bold font-display text-white tracking-wide">
                  Strategic Storytelling
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Crafting authentic personal and institutional narratives that resonate across diverse demographics and drive measurable trust.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#171329]/70 border border-[#8B5CF6]/20 hover:border-[#8B5CF6]/50 transition-all duration-300 space-y-2.5 backdrop-blur-md group">
                <div className="w-10 h-10 rounded-xl bg-[#D6B77A]/15 text-[#D6B77A] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Video className="w-5 h-5 text-[#D6B77A]" />
                </div>
                <h4 className="text-sm font-bold font-display text-white tracking-wide">
                  Cinematic Media Production
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Cinema-grade optics, high-speed camera rigs, Hollywood color grading, and dynamic soundscapes that hold viewers spellbound.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#171329]/70 border border-[#8B5CF6]/20 hover:border-[#8B5CF6]/50 transition-all duration-300 space-y-2.5 backdrop-blur-md group">
                <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/15 text-[#C5A3FF] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Target className="w-5 h-5 text-[#8B5CF6]" />
                </div>
                <h4 className="text-sm font-bold font-display text-white tracking-wide">
                  High-Impact Digital PR
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Fast-turnaround perception engineering, election war-room coordination, crisis mitigation, and syndicated press distribution.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#171329]/70 border border-[#8B5CF6]/20 hover:border-[#8B5CF6]/50 transition-all duration-300 space-y-2.5 backdrop-blur-md group">
                <div className="w-10 h-10 rounded-xl bg-[#D6B77A]/15 text-[#D6B77A] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-5 h-5 text-[#D6B77A]" />
                </div>
                <h4 className="text-sm font-bold font-display text-white tracking-wide">
                  Brand Perception Architecture
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Full aesthetic curation, verified cross-platform presence, and ironclad reputation defense with 100% executive confidentiality.
                </p>
              </div>
            </div>
          </div>

          {/* Visual Editorial Column with 3D Accents & Authentic Photography */}
          <div className="lg:col-span-5 relative">
            {/* Ambient Backing Glow */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#8B5CF6]/20 via-[#171329]/30 to-[#D6B77A]/15 rounded-3xl blur-2xl -z-10" />

            <div className="relative rounded-2xl overflow-hidden border border-[#8B5CF6]/25 bg-[#171329]/80 shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-3.5 backdrop-blur-xl">
              <div className="aspect-[4/5] rounded-xl overflow-hidden relative bg-[#09090F]">
                <SafeImage
                  src="/assets/aistudio/IMG_4896_63d61a60.JPG"
                  alt="ECHO EDIT on set directing and script review"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#09090F] via-transparent to-transparent opacity-90" />
                
                <div className="absolute bottom-5 left-5 right-5 text-xs font-mono text-white">
                  <span className="px-2.5 py-1 rounded bg-[#8B5CF6] text-[10px] font-bold uppercase tracking-wider mb-2 inline-block shadow-md shadow-[#8B5CF6]/30">
                    Behind The Lens
                  </span>
                  <p className="text-base font-bold font-display text-white">
                    Directing & Real-Time Narrative Strategy
                  </p>
                  <p className="text-xs text-zinc-300 mt-1 font-sans">
                    Aligning visual aesthetics with strategic influence on location.
                  </p>
                </div>
              </div>

              {/* Floating Glassmorphic Pill */}
              <div className="absolute -bottom-4 -left-3 px-4 py-3 rounded-xl bg-[#09090F]/90 border border-[#8B5CF6]/30 shadow-2xl flex items-center gap-3 backdrop-blur-md">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#8B5CF6] to-[#171329] border border-[#C5A3FF]/30 flex items-center justify-center text-white font-black text-sm">
                  100%
                </div>
                <div>
                  <p className="text-xs font-bold text-white font-display">Authentic Original Work</p>
                  <p className="text-[10px] font-mono text-[#C5A3FF]">Zero Stock Substitutes</p>
                </div>
              </div>

              {/* Top-Right Decorative Floating 3D Geometric Tag */}
              <div className="absolute -top-3 -right-3 px-3 py-1.5 rounded-lg bg-[#171329] border border-[#D6B77A]/40 text-[#D6B77A] text-[10px] font-mono tracking-widest uppercase shadow-lg">
                EST. 2024
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
