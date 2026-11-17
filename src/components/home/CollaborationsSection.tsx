import React from 'react';
import { ShieldCheck, Sparkles, ExternalLink } from 'lucide-react';
import { useAgency } from '../../context/AgencyContext';
import { SafeImage } from '../common/SafeImage';

interface CollaborationsSectionProps {
  onOpenConsultation: () => void;
}

export const CollaborationsSection: React.FC<CollaborationsSectionProps> = ({ onOpenConsultation }) => {
  const { collaborations } = useAgency();

  const publishedCollaborations = collaborations.filter((c) => c.isPublished);

  return (
    <section id="collaborations" className="py-28 bg-[#09090F] border-t border-white/10 relative overflow-hidden">
      {/* Ambient Lighting */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#8B5CF6]/10 rounded-full blur-[200px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[450px] h-[450px] bg-[#D6B77A]/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#171329] border border-[#8B5CF6]/30 text-xs font-mono text-[#C5A3FF] uppercase tracking-wider mb-4">
              <span className="w-2 h-2 rounded-full bg-[#8B5CF6] animate-pulse" />
              Verified Collaborations & Partnerships
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display text-white tracking-tight">
              PEOPLE WE HAVE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#C5A3FF] to-[#D6B77A]">WORKED WITH.</span>
            </h2>
          </div>
          <p className="text-sm text-zinc-300 font-sans max-w-sm">
            Partnering with respected public personalities, artists, and political leaders under strict verification and non-disclosure standards.
          </p>
        </div>

        {/* Collaborations Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {publishedCollaborations.map((collab) => (
            <div
              key={collab.id}
              className="group rounded-3xl overflow-hidden p-5 flex flex-col justify-between bg-[#171329]/80 border border-[#8B5CF6]/20 hover:border-[#8B5CF6]/50 shadow-xl hover:shadow-[0_15px_35px_rgba(139,92,246,0.2)] transition-all duration-300"
            >
              <div>
                {/* Photo Thumbnail */}
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4 bg-black">
                  <SafeImage
                    src={collab.photograph}
                    alt={collab.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#171329] via-transparent to-transparent opacity-90" />

                  <div className="absolute bottom-3.5 left-3.5 right-3.5">
                    <span className="px-2.5 py-1 rounded bg-[#09090F]/90 border border-[#8B5CF6]/40 text-[10px] font-mono text-[#C5A3FF] uppercase font-semibold">
                      {collab.roleOrCategory}
                    </span>
                    <h3 className="text-base font-bold font-display text-white mt-1.5 leading-snug">
                      {collab.name}
                    </h3>
                  </div>
                </div>

                {/* Details */}
                <p className="text-xs text-zinc-300 leading-relaxed mb-4 font-sans">
                  {collab.projectDetails}
                </p>

                {/* Services Delivered */}
                {collab.servicesDelivered && collab.servicesDelivered.length > 0 && (
                  <div className="space-y-1.5 pt-3 border-t border-white/5">
                    <span className="text-[10px] font-mono uppercase text-zinc-400 block">
                      Services Delivered:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {collab.servicesDelivered.map((srv, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-[#09090F] border border-[#8B5CF6]/15 text-[10px] font-mono text-[#C5A3FF]"
                        >
                          {srv}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Verified Badge */}
              <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Case
                </span>
                <span className="text-[#D6B77A] text-[10px] uppercase font-semibold">
                  ECHO EDIT
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* NDA & Verification Note Banner */}
        <div className="mt-14 p-6 sm:p-7 rounded-3xl bg-[#171329]/80 border border-[#8B5CF6]/30 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-2xl backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#8B5CF6]/15 text-[#C5A3FF] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-[#8B5CF6]" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white font-display">
                Discretion & Non-Disclosure Governance
              </h4>
              <p className="text-xs text-zinc-300 font-sans mt-0.5">
                We only showcase verified public collaborations with explicit photographic consent. Sensitive political war room strategies are protected under strict legal NDAs.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenConsultation}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] hover:from-[#7C3AED] hover:to-[#6D28D9] text-white text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer shadow-lg shadow-[#8B5CF6]/30"
          >
            Inquire Confidential Retainer
          </button>
        </div>
      </div>
    </section>
  );
};
