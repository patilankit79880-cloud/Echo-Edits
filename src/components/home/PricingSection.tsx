import React from 'react';
import { Check, Sparkles, ArrowRight, AlertCircle } from 'lucide-react';
import { useAgency } from '../../context/AgencyContext';
import { PricingPackage } from '../../types';

interface PricingSectionProps {
  onSelectPackage: (pkg: PricingPackage) => void;
  onOpenCustomQuote: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  onSelectPackage,
  onOpenCustomQuote,
}) => {
  const { pricingPackages, agencySettings } = useAgency();

  return (
    <section id="pricing" className="py-28 bg-[#09090F] border-t border-white/10 relative overflow-hidden">
      {/* Ambient Lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[750px] h-[450px] bg-[#8B5CF6]/10 rounded-full blur-[220px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#D6B77A]/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#171329] border border-[#8B5CF6]/30 text-xs font-mono text-[#C5A3FF] uppercase tracking-wider mb-4">
            <span className="w-2 h-2 rounded-full bg-[#8B5CF6] animate-pulse" />
            Transparent Monthly Retainers
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display text-white tracking-tight">
            INVEST IN <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#C5A3FF] to-[#D6B77A]">IMPACT.</span>
          </h2>
          <p className="text-sm text-zinc-300 font-sans mt-3 max-w-xl mx-auto">
            Choose a dedicated monthly retainer or request a custom quotation tailored to your election or media campaign.
          </p>
        </div>

        {/* 4 Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingPackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative ${
                pkg.popular
                  ? 'bg-gradient-to-b from-[#1f193a] to-[#120f24] border-2 border-[#8B5CF6] shadow-[0_20px_50px_rgba(139,92,246,0.25)] scale-[1.02]'
                  : 'bg-[#171329]/70 border border-[#8B5CF6]/20 hover:border-[#8B5CF6]/50 shadow-xl'
              }`}
            >
              {/* Popular Badge */}
              {pkg.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="px-3.5 py-1 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white text-[10px] font-mono font-bold uppercase tracking-wider shadow-lg shadow-[#8B5CF6]/40">
                    {pkg.badge}
                  </span>
                </div>
              )}

              <div>
                {/* Header */}
                <div className="mb-4">
                  <h3 className="text-base sm:text-lg font-bold font-display text-white tracking-wide">
                    {pkg.title}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1 min-h-[36px] leading-relaxed">
                    {pkg.tagline}
                  </p>
                </div>

                {/* Price */}
                <div className="py-4 border-y border-white/10 mb-5">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl sm:text-2xl font-black font-mono text-white tracking-tight">
                      {pkg.priceRange}
                    </span>
                    <span className="text-xs font-mono text-zinc-400">{pkg.period}</span>
                  </div>
                  <p className="text-[11px] font-mono text-[#D6B77A] mt-1.5">
                    {pkg.idealFor}
                  </p>
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-6">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">
                    Deliverables Checklist:
                  </span>
                  {pkg.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                      <Check className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-3">
                <button
                  onClick={() => onSelectPackage(pkg)}
                  className={`w-full py-3.5 px-4 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    pkg.popular
                      ? 'bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] hover:from-[#7C3AED] hover:to-[#6D28D9] text-white shadow-lg shadow-[#8B5CF6]/30'
                      : 'bg-[#09090F] hover:bg-[#8B5CF6] hover:text-white text-zinc-200 border border-[#8B5CF6]/30'
                  }`}
                >
                  <span>Request a Quote</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Quotation Banner */}
        <div className="mt-14 p-8 rounded-3xl bg-gradient-to-r from-[#171329] via-[#1c1735] to-[#171329] border border-[#8B5CF6]/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1.5 text-center md:text-left">
            <h4 className="text-xl font-bold font-display text-white">
              Need a Custom Campaign War-Room or One-Time Production?
            </h4>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-xl">
              We structure custom quotations for election cycles, high-frequency rally shoots, multi-city stadium tours, and documentary film productions.
            </p>
          </div>
          <button
            onClick={onOpenCustomQuote}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#D6B77A] to-[#c7a45e] text-[#09090F] hover:brightness-110 font-mono text-xs uppercase tracking-wider font-bold transition-all shadow-xl whitespace-nowrap cursor-pointer"
          >
            Request Custom Quotation
          </button>
        </div>

        {/* Important Terms & Disclaimer */}
        <div className="mt-8 p-4 rounded-xl bg-[#171329]/60 border border-white/5 flex items-start gap-3 text-xs text-zinc-400 font-mono">
          <AlertCircle className="w-4 h-4 text-[#D6B77A] shrink-0 mt-0.5" />
          <p>
            <strong className="text-zinc-200 uppercase">Important Terms:</strong> {agencySettings.disclaimer} All packages can be scaled with on-demand cinema crew deployment upon request.
          </p>
        </div>
      </div>
    </section>
  );
};
