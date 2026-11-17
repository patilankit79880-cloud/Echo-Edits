import React from 'react';
import { Mail, Phone, MapPin, MessageSquare, ArrowUp, ShieldCheck, FileText, Instagram } from 'lucide-react';
import { useAgency } from '../../context/AgencyContext';
import { BrandLogo } from '../common/BrandLogo';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onOpenConsultation: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacy, onOpenTerms, onOpenConsultation }) => {
  const { agencySettings } = useAgency();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#09090F] border-t border-white/10 pt-16 pb-12 text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top CTA Row */}
        <div className="pb-12 mb-12 border-b border-white/10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <span className="text-[#C5A3FF] font-mono text-xs uppercase tracking-widest block mb-2">
              Ready to Shape Public Discourse?
            </span>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display text-white tracking-tight">
              Let's engineer your digital influence today.
            </h3>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenConsultation}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#8B5CF6] via-[#7C3AED] to-[#6D28D9] hover:from-[#7C3AED] hover:to-[#5B21B6] text-white font-medium text-xs font-mono uppercase tracking-wider transition-all shadow-lg shadow-[#8B5CF6]/30 cursor-pointer"
            >
              Book Strategy Consultation
            </button>
            <a
              href={`https://wa.me/${agencySettings.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 rounded-xl bg-[#171329] hover:bg-[#231b3e] text-[#25D366] border border-[#8B5CF6]/30 font-mono text-xs flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              WhatsApp Direct
            </a>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-white/10">
          {/* Column 1: Brand & Positioning */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#" className="inline-block group" aria-label="ECHO EDIT Home">
              <BrandLogo size="md" />
            </a>

            <p className="text-sm font-medium text-[#D6B77A] italic">
              "{agencySettings.tagline}"
            </p>

            <p className="text-zinc-400 text-xs leading-relaxed max-w-md font-sans">
              ECHO EDIT is a premier Digital PR, Political Communication, Social Media Management, and Creative Media Production Agency. We partner with political personalities, public figures, businesses, brands, organizations, and influencers to establish commanding digital authority.
            </p>

            <div className="pt-2 text-[11px] font-mono text-zinc-500">
              Strict Non-Disclosure Agreement (NDA) guaranteed for all political campaigns and high-profile figures.
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 font-mono text-xs">
              <li><a href="#about" className="hover:text-[#C5A3FF] transition-colors">About Studio</a></li>
              <li><a href="#services" className="hover:text-[#C5A3FF] transition-colors">3D Services</a></li>
              <li><a href="#portfolio" className="hover:text-[#C5A3FF] transition-colors">Original Portfolio</a></li>
              <li><a href="#collaborations" className="hover:text-[#C5A3FF] transition-colors">Collaborations</a></li>
              <li><a href="#pricing" className="hover:text-[#C5A3FF] transition-colors">Retainers & Pricing</a></li>
              <li><a href="#contact" className="hover:text-[#C5A3FF] transition-colors">Contact Office</a></li>
            </ul>
          </div>

          {/* Column 3: Core Disciplines */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              Core Disciplines
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="text-zinc-300">Political Digital PR & War Rooms</li>
              <li className="text-zinc-300">Celebrity Personal Branding</li>
              <li className="text-zinc-300">Cinema 4K/6K Video Production</li>
              <li className="text-zinc-300">Viral Short-Form Architecture</li>
              <li className="text-zinc-300">Mega Stadium & Event Coverage</li>
              <li className="text-zinc-300">Constituency Sentiment Tracking</li>
            </ul>
          </div>

          {/* Column 4: Contact & Hub */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              Headquarters
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
                <span>{agencySettings.officeLocation}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#8B5CF6] shrink-0" />
                <a
                  href={`tel:${agencySettings.phone.replace(/\s+/g, '')}`}
                  className="hover:text-[#C5A3FF] transition-colors"
                >
                  {agencySettings.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#8B5CF6] shrink-0" />
                <a
                  href={`mailto:${agencySettings.email}`}
                  className="hover:text-[#D6B77A] transition-colors"
                >
                  {agencySettings.email}
                </a>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <span className="font-mono text-[11px] text-zinc-500">Instagram:</span>
              <a
                href={agencySettings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C5A3FF] hover:text-white font-mono text-xs inline-flex items-center gap-1.5 hover:underline underline-offset-4 transition-colors"
              >
                <Instagram className="w-3.5 h-3.5" />
                {agencySettings.instagramHandle}
              </a>
            </div>
          </div>
        </div>

        {/* Disclaimer Note */}
        <div className="py-4 text-[11px] text-zinc-500 font-mono border-b border-white/5">
          <p>
            <strong className="text-zinc-400 uppercase">Statutory & Disbursement Notice:</strong> {agencySettings.disclaimer}
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] font-mono text-zinc-500">
            © {new Date().getFullYear()} ECHO EDIT Agency. All rights reserved. Crafted with Midnight Luxury precision.
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenPrivacy}
              className="text-[11px] font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#8B5CF6]" />
              Privacy Policy & NDA
            </button>
            <button
              onClick={onOpenTerms}
              className="text-[11px] font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
            >
              <FileText className="w-3.5 h-3.5 text-[#8B5CF6]" />
              Terms of Engagement
            </button>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-[#171329] hover:bg-[#8B5CF6] text-zinc-400 hover:text-white transition-colors cursor-pointer border border-white/10"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
