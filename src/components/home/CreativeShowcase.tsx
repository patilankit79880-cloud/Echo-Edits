import React, { useState } from 'react';
import { Sparkles, Trophy, Flame, CheckCircle2, ArrowRight, Layers, Compass, Film } from 'lucide-react';
import { SafeImage } from '../common/SafeImage';

interface StoryCase {
  id: string;
  tag: string;
  title: string;
  client: string;
  image: string;
  context: string;
  challenge: string;
  approach: string;
  impact: string;
  metrics: { label: string; value: string }[];
}

const stories: StoryCase[] = [
  {
    id: 'case-1',
    tag: 'Stage PR & Live Tour',
    title: 'Stadium Finale Confetti Climax & Instant Virality',
    client: 'National Live Arena Tour & Performers',
    image: '/assets/aistudio/IMG_2327_e383a340.JPG',
    context:
      'Over 25,000 screaming attendees, high-decibel arena acoustics, and a single 15-second confetti blast that defined the nationwide tour finale.',
    challenge:
      'Capturing the exact peak confetti explosion with razor-sharp focus amidst dynamic moving lasers and delivering syndicated 4K reels to national press within 90 minutes of curtain call.',
    approach:
      'Deployed dual low-angle cinema rigs with high-shutter 120fps burst sensors and an on-site DIT editing station operating concurrently with the live performance.',
    impact:
      'Reel published within 75 minutes, surpassing 4.8M organic views in 24 hours, picked up by top national music publications.',
    metrics: [
      { label: 'Turnaround Time', value: '<75 mins' },
      { label: 'Organic Views', value: '4.8M+' },
      { label: 'Media Pickups', value: '35+ Outlets' },
    ],
  },
  {
    id: 'case-2',
    tag: 'Atmospheric Stage Cinematography',
    title: 'Solitary Spotlight & Acoustic Arena Resonance',
    client: 'National Mega Tour Stage Management',
    image: '/assets/aistudio/IMG_7811_a83a5d4f.PNG',
    context:
      'An intimate stripped-down acoustic segment in the middle of a massive stadium show, illuminated only by a solitary amber key light and thousands of phone torches.',
    challenge:
      'Preserving the quiet emotional gravity without over-amplifying noise in extreme low-light conditions, while framing the audience luminescence.',
    approach:
      'Ultra-fast prime lenses wide open at f/1.2, calibrated for warm skin tone separation against deep midnight arena shadows.',
    impact:
      'Became the signature tour visual, featured as the primary artwork across streaming platforms and international tour posters.',
    metrics: [
      { label: 'Dynamic Range', value: '15+ Stops' },
      { label: 'Key Art Adoption', value: '100%' },
      { label: 'Fan Reshares', value: '250K+' },
    ],
  },
  {
    id: 'case-3',
    tag: 'Celebrity Talent Architecture',
    title: 'Editorial Daylight Fashion & Wardrobe Narrative',
    client: 'Celebrity Talent & Fashion Icon Collaboration',
    image: '/assets/aistudio/IMG_7808_af10a1e5.PNG',
    context:
      'High-profile talent rebranding requiring an aesthetic shift from mainstream commercial appeal to sophisticated editorial luxury authority.',
    challenge:
      'Harmonizing complex textures—fine tweed military-cut jacket, leather corset belt, and sky-blue silk drape—under bright natural sunlight without harsh specular wash.',
    approach:
      'Art-directed environmental daylight framing with subtle soft diffusion, balancing architectural posture against organic foliage shadows.',
    impact:
      'Secured 3 high-tier luxury brand endorsement campaigns and established the talent’s verified aesthetic blueprint for the year.',
    metrics: [
      { label: 'Brand Endorsements', value: '3 Luxury Deals' },
      { label: 'Engagement Rate', value: '+340%' },
      { label: 'Press Impressions', value: '12M+' },
    ],
  },
  {
    id: 'case-4',
    tag: 'Pre-Production & Directing',
    title: 'Behind The Scenes: Script Adaptation & Floor Directing',
    client: 'Production House & Political Media Unit',
    image: '/assets/aistudio/IMG_4896_63d61a60.JPG',
    context:
      'Live script rewrite on location 20 minutes before a statewide campaign address, balancing policy precision with relatable human delivery.',
    challenge:
      'Coordinating camera operators, audio technicians, and principal talent under extreme time compression without breaking set composure.',
    approach:
      'Direct floor-level consultation, breakdown into concise teleprompter cues, and immediate rehearsal verification using wireless field monitors.',
    impact:
      'Flawless address delivered without second takes, generating record constituency engagement and positive editorial sentiment.',
    metrics: [
      { label: 'Rehearsal Turnaround', value: '18 mins' },
      { label: 'Constituency Reach', value: '8.2M' },
      { label: 'Delivery Flaws', value: 'Zero' },
    ],
  },
];

export const CreativeShowcase: React.FC = () => {
  const [selectedCaseIndex, setSelectedCaseIndex] = useState(0);
  const activeCase = stories[selectedCaseIndex];

  return (
    <section className="py-28 bg-[#09090F] border-t border-white/10 relative overflow-hidden">
      {/* Ambient Lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#8B5CF6]/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#D6B77A]/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#171329] border border-[#8B5CF6]/30 text-xs font-mono text-[#C5A3FF] uppercase tracking-wider mb-4">
            <span className="w-2 h-2 rounded-full bg-[#D6B77A] animate-pulse" />
            Visual Storytelling
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display text-white tracking-tight leading-tight">
            EVERY FRAME <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#C5A3FF] to-[#D6B77A]">HAS A STORY.</span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-3 font-normal max-w-xl">
            A deeper look into our high-stakes productions—the challenges, the strategic approach, and the cultural influence delivered.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex gap-2.5 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {stories.map((story, idx) => {
            const isSelected = idx === selectedCaseIndex;
            return (
              <button
                key={story.id}
                onClick={() => setSelectedCaseIndex(idx)}
                className={`px-5 py-3 rounded-xl text-xs font-mono uppercase tracking-wider text-left transition-all cursor-pointer whitespace-nowrap flex items-center gap-2.5 ${
                  isSelected
                    ? 'bg-[#171329] text-white border border-[#8B5CF6] shadow-lg shadow-[#8B5CF6]/20'
                    : 'bg-[#171329]/40 text-zinc-400 hover:text-white hover:bg-[#171329]/80 border border-white/5'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    isSelected ? 'bg-[#8B5CF6]' : 'bg-zinc-600'
                  }`}
                />
                <span>0{idx + 1}. {story.tag}</span>
              </button>
            );
          })}
        </div>

        {/* Storytelling Showcase Panel */}
        <div className="rounded-3xl bg-[#171329]/80 border border-[#8B5CF6]/25 shadow-2xl p-6 sm:p-10 backdrop-blur-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Authentic Photography */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-black border border-white/10 shadow-2xl">
                <SafeImage
                  src={activeCase.image}
                  alt={activeCase.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#09090F] via-transparent to-black/20" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-[#09090F]/90 backdrop-blur-md text-[10px] font-mono text-[#D6B77A] font-semibold border border-[#D6B77A]/30">
                    {activeCase.tag}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-xs font-mono text-zinc-400">{activeCase.client}</p>
                  <p className="text-base font-bold font-display text-white mt-0.5">{activeCase.title}</p>
                </div>
              </div>
            </div>

            {/* Right: Narrative Breakdown */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#8B5CF6]">
                  Production Case Study
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white mt-1">
                  {activeCase.title}
                </h3>
              </div>

              {/* Three-stage Narrative */}
              <div className="space-y-4 text-xs sm:text-sm text-zinc-300">
                <div className="p-4 rounded-xl bg-[#09090F]/70 border border-white/5 space-y-1">
                  <p className="text-[10px] font-mono text-[#D6B77A] uppercase tracking-wider font-semibold">
                    1. Context & Setting
                  </p>
                  <p className="text-zinc-300 leading-relaxed font-normal">{activeCase.context}</p>
                </div>

                <div className="p-4 rounded-xl bg-[#09090F]/70 border border-white/5 space-y-1">
                  <p className="text-[10px] font-mono text-[#C5A3FF] uppercase tracking-wider font-semibold">
                    2. The Challenge & Creative Approach
                  </p>
                  <p className="text-zinc-300 leading-relaxed font-normal">{activeCase.approach}</p>
                </div>

                <div className="p-4 rounded-xl bg-[#09090F]/70 border border-[#8B5CF6]/20 space-y-1">
                  <p className="text-[10px] font-mono text-[#8B5CF6] uppercase tracking-wider font-semibold">
                    3. Cultural Impact & Strategic Result
                  </p>
                  <p className="text-zinc-200 leading-relaxed font-normal">{activeCase.impact}</p>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                {activeCase.metrics.map((metric, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-[#09090F] border border-white/10 text-center"
                  >
                    <p className="text-lg sm:text-2xl font-black font-display text-[#D6B77A]">
                      {metric.value}
                    </p>
                    <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mt-0.5">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
