import React, { useState, useEffect } from 'react';
import { Menu, X, Lock, Sparkles, MessageSquare } from 'lucide-react';
import { useAgency } from '../../context/AgencyContext';
import { BrandLogo } from '../common/BrandLogo';

interface NavbarProps {
  onOpenConsultation: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenConsultation, onOpenAdmin }) => {
  const { agencySettings, isAdmin } = useAgency();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#09090F]/90 backdrop-blur-md border-b border-[#8B5CF6]/20 py-3 shadow-2xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6">
          {/* Bespoke ECHO EDIT Brand Mark */}
          <a href="#" className="group shrink-0" aria-label="ECHO EDIT Home">
            <BrandLogo size="md" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-mono uppercase tracking-wider text-zinc-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-[#C5A3FF] transition-colors relative py-1 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#8B5CF6] transition-all group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {/* WhatsApp Quick Link */}
            <a
              href={`https://wa.me/${agencySettings.whatsapp}?text=${encodeURIComponent('Hi ECHO EDIT, I would like to inquire about your PR and media services.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-[#171329] hover:bg-[#20ba59]/20 text-[#25D366] border border-white/10 hover:border-[#25D366]/40 transition-all cursor-pointer"
              title="Connect on WhatsApp"
            >
              <MessageSquare className="w-4 h-4" />
            </a>

            {/* Admin Access Portal */}
            <button
              onClick={onOpenAdmin}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-mono ${
                isAdmin
                  ? 'bg-[#8B5CF6]/20 text-[#C5A3FF] border-[#8B5CF6]/50'
                  : 'bg-[#171329] text-zinc-400 hover:text-white border-white/10'
              }`}
              title={isAdmin ? 'Admin Dashboard (Active)' : 'Admin Login'}
            >
              <Lock className="w-4 h-4" />
              {isAdmin && <span className="hidden xl:inline text-[11px] font-semibold text-[#C5A3FF]">Admin</span>}
            </button>

            {/* Primary Action Button */}
            <button
              onClick={onOpenConsultation}
              className="px-4 py-2.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-medium text-xs font-mono uppercase tracking-wider transition-all shadow-lg shadow-[#8B5CF6]/20 hover:shadow-[#8B5CF6]/35 cursor-pointer flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D6B77A]" />
              Start Project
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-[#171329] border border-white/10 text-zinc-300 hover:text-white cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0F0D1A] border-b border-[#8B5CF6]/20 px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3 text-sm font-mono uppercase tracking-wider text-zinc-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#C5A3FF] py-2 border-b border-white/5 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-2 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full py-3 rounded-xl bg-[#8B5CF6] text-white font-semibold text-xs font-mono uppercase tracking-wider text-center cursor-pointer shadow-lg shadow-[#8B5CF6]/20"
            >
              Start A Project
            </button>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={`https://wa.me/${agencySettings.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 rounded-xl bg-[#171329] text-[#25D366] border border-white/10 text-xs font-mono text-center flex items-center justify-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                WhatsApp
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="py-2.5 px-3 rounded-xl bg-[#171329] text-zinc-300 border border-white/10 text-xs font-mono text-center flex items-center justify-center gap-1.5"
              >
                <Lock className="w-3.5 h-3.5 text-[#8B5CF6]" />
                {isAdmin ? 'Dashboard' : 'Admin'}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
