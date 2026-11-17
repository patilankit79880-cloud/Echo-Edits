import React, { useState } from 'react';
import { Send, Phone, Mail, MapPin, MessageSquare, CheckCircle2, Sparkles, Instagram, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAgency } from '../../context/AgencyContext';

export const ContactSection: React.FC = () => {
  const { agencySettings, services, submitInquiry } = useAgency();

  const [form, setForm] = useState({
    name: '',
    organization: '',
    phone: '',
    email: '',
    service: 'Political PR & Digital Communication',
    budget: '₹50,000 – ₹1,00,000',
    description: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.email) return;

    submitInquiry({
      name: form.name,
      organization: form.organization || 'Individual / Public Figure',
      phone: form.phone,
      email: form.email,
      service: form.service,
      budget: form.budget,
      description: form.description || 'General media and PR inquiry.',
    });

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#8B5CF6', '#C5A3FF', '#D6B77A', '#F5F1FF'],
      });
    } catch (e) {
      console.error(e);
    }

    setIsSubmitted(true);
    setForm({
      name: '',
      organization: '',
      phone: '',
      email: '',
      service: 'Political PR & Digital Communication',
      budget: '₹50,000 – ₹1,00,000',
      description: '',
    });
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello ECHO EDIT! I would like to discuss representation and media production for ${form.name || 'my brand'}. Service: ${form.service}.`
    );
    window.open(`https://wa.me/${agencySettings.whatsapp}?text=${text}`, '_blank');
  };

  const handleEmail = () => {
    const subject = encodeURIComponent(`ECHO EDIT Inquiry: ${form.service}`);
    const body = encodeURIComponent(
      `Hi ECHO EDIT Team,\n\nName: ${form.name}\nOrganization: ${form.organization}\nPhone: ${form.phone}\nService: ${form.service}\nBudget: ${form.budget}\n\nProject Scope:\n${form.description}`
    );
    window.open(`mailto:${agencySettings.email}?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <section id="contact" className="py-28 bg-[#09090F] border-t border-white/10 relative overflow-hidden">
      {/* Ambient Lighting */}
      <div className="absolute bottom-0 right-0 w-[550px] h-[550px] bg-[#8B5CF6]/10 rounded-full blur-[220px] pointer-events-none" />
      <div className="absolute top-1/4 left-0 w-[450px] h-[450px] bg-[#D6B77A]/5 rounded-full blur-[200px] pointer-events-none" />

      {/* Floating 3D Geometric Accents */}
      <div className="absolute top-20 right-12 w-20 h-20 rounded-2xl border border-[#8B5CF6]/20 bg-[#171329]/30 backdrop-blur-md rotate-12 pointer-events-none hidden lg:block animate-pulse" />
      <div className="absolute bottom-24 left-10 w-16 h-16 rounded-full border border-[#D6B77A]/20 bg-[#171329]/20 backdrop-blur-md -rotate-12 pointer-events-none hidden lg:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Agency Direct Info */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#171329] border border-[#8B5CF6]/30 text-xs font-mono text-[#C5A3FF] uppercase tracking-wider mb-4">
                <span className="w-2 h-2 rounded-full bg-[#8B5CF6] animate-pulse" />
                Initiate Representation
              </div>
              <h2 className="text-[clamp(1.25rem,2.1vw,2.05rem)] font-extrabold font-display text-white tracking-tight leading-[1.15]">
                LET'S CREATE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#C5A3FF] to-[#D6B77A]">SOMETHING UNFORGETTABLE.</span>
              </h2>
              <p className="text-sm text-zinc-300 mt-4 leading-relaxed font-sans">
                Connect with ECHO EDIT's leadership for confidential campaign discussions, celebrity branding consultations, or full-scale cinema production.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-4 text-xs font-mono">
              <div className="p-4 rounded-2xl bg-[#171329]/80 border border-[#8B5CF6]/20 flex items-center gap-4 hover:border-[#8B5CF6]/50 transition-colors">
                <div className="w-11 h-11 rounded-xl bg-[#8B5CF6]/15 text-[#C5A3FF] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-[#8B5CF6]" />
                </div>
                <div>
                  <span className="text-[10px] uppercase text-zinc-400 block font-mono">Direct Telephone</span>
                  <a
                    href={`tel:${agencySettings.phone.replace(/\s+/g, '')}`}
                    className="text-white hover:text-[#C5A3FF] font-bold text-sm tracking-wide transition-colors"
                  >
                    {agencySettings.phone}
                  </a>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#171329]/80 border border-[#8B5CF6]/20 flex items-center gap-4 hover:border-[#8B5CF6]/50 transition-colors">
                <div className="w-11 h-11 rounded-xl bg-[#D6B77A]/15 text-[#D6B77A] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-[#D6B77A]" />
                </div>
                <div>
                  <span className="text-[10px] uppercase text-zinc-400 block font-mono">Executive Email</span>
                  <a href={`mailto:${agencySettings.email}`} className="text-white hover:text-[#D6B77A] font-bold text-sm tracking-wide transition-colors">
                    {agencySettings.email}
                  </a>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#171329]/80 border border-[#8B5CF6]/20 flex items-center gap-4 hover:border-[#8B5CF6]/50 transition-colors">
                <div className="w-11 h-11 rounded-xl bg-[#8B5CF6]/15 text-[#C5A3FF] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#8B5CF6]" />
                </div>
                <div>
                  <span className="text-[10px] uppercase text-zinc-400 block font-mono">Agency Studios</span>
                  <p className="text-white font-medium text-sm">
                    {agencySettings.officeLocation}
                  </p>
                </div>
              </div>

              <a
                href={agencySettings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-[#171329]/80 border border-[#8B5CF6]/20 flex items-center justify-between gap-4 hover:border-[#8B5CF6]/50 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#8B5CF6]/15 text-[#C5A3FF] flex items-center justify-center shrink-0">
                    <Instagram className="w-5 h-5 text-[#C5A3FF]" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-zinc-400 block font-mono">Instagram</span>
                    <span className="text-white group-hover:text-[#C5A3FF] font-bold text-sm tracking-wide transition-colors">
                      {agencySettings.instagramHandle}
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-[#C5A3FF] transition-colors shrink-0" />
              </a>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleWhatsApp}
                className="flex-1 py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-black font-semibold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                WhatsApp Direct
              </button>
              <button
                onClick={handleEmail}
                className="flex-1 py-3.5 px-4 rounded-xl bg-[#171329] hover:bg-[#221b3e] text-zinc-200 hover:text-white font-semibold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 border border-[#8B5CF6]/30 cursor-pointer transition-all"
              >
                <Mail className="w-4 h-4 text-[#C5A3FF]" />
                Email Executive Desk
              </button>
            </div>
          </div>

          {/* Right: Modern Interactive Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-7 sm:p-9 rounded-3xl bg-[#171329]/90 border border-[#8B5CF6]/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl relative">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-[#8B5CF6]/20 text-[#C5A3FF] flex items-center justify-center mx-auto mb-4 border border-[#8B5CF6]/40">
                    <CheckCircle2 className="w-9 h-9 text-[#8B5CF6]" />
                  </div>
                  <h3 className="text-2xl font-bold font-display text-white mb-2">
                    Inquiry Received by ECHO EDIT
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-300 max-w-md mx-auto mb-6 font-sans">
                    Our strategic media team has received your brief. A senior director will review your requirements and connect with you within 2 business hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl bg-[#09090F] hover:bg-[#8B5CF6] text-white text-xs font-mono uppercase border border-[#8B5CF6]/30 cursor-pointer transition-colors"
                  >
                    Submit Another Brief
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold font-display text-white">
                      Start Your Project
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1 font-sans">
                      Provide details below to receive a strategic proposal and tailored production timeline.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-zinc-300 mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="e.g. Vikramaditya Singh"
                        className="w-full px-4 py-3 rounded-xl bg-[#09090F] border border-[#8B5CF6]/20 text-white text-xs sm:text-sm focus:outline-none focus:border-[#8B5CF6]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-zinc-300 mb-1.5">
                        Organization / Brand / Campaign
                      </label>
                      <input
                        type="text"
                        value={form.organization}
                        onChange={(e) => setForm({ ...form, organization: e.target.value })}
                        placeholder="e.g. Parliamentary Office / Studio"
                        className="w-full px-4 py-3 rounded-xl bg-[#09090F] border border-[#8B5CF6]/20 text-white text-xs sm:text-sm focus:outline-none focus:border-[#8B5CF6]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-zinc-300 mb-1.5">
                        Phone / WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+91 85459 75486"
                        className="w-full px-4 py-3 rounded-xl bg-[#09090F] border border-[#8B5CF6]/20 text-white text-xs sm:text-sm focus:outline-none focus:border-[#8B5CF6]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-zinc-300 mb-1.5">
                        Official Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="name@organization.com"
                        className="w-full px-4 py-3 rounded-xl bg-[#09090F] border border-[#8B5CF6]/20 text-white text-xs sm:text-sm focus:outline-none focus:border-[#8B5CF6]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-zinc-300 mb-1.5">
                        Service Required
                      </label>
                      <select
                        value={form.service}
                        onChange={(e) => setForm({ ...form, service: e.target.value })}
                        className="w-full px-3.5 py-3 rounded-xl bg-[#09090F] border border-[#8B5CF6]/20 text-white text-xs sm:text-sm focus:outline-none focus:border-[#8B5CF6]"
                      >
                        {services.map((srv) => (
                          <option key={srv.id} value={srv.title} className="bg-[#171329] text-white">
                            {srv.title}
                          </option>
                        ))}
                        <option value="Complete Agency Retainer" className="bg-[#171329] text-white">Complete Agency Retainer</option>
                        <option value="Political Campaign War Room" className="bg-[#171329] text-white">Political Campaign War Room</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-zinc-300 mb-1.5">
                        Estimated Budget Range
                      </label>
                      <select
                        value={form.budget}
                        onChange={(e) => setForm({ ...form, budget: e.target.value })}
                        className="w-full px-3.5 py-3 rounded-xl bg-[#09090F] border border-[#8B5CF6]/20 text-white text-xs sm:text-sm focus:outline-none focus:border-[#8B5CF6]"
                      >
                        <option value="Below ₹50,000" className="bg-[#171329] text-white">Below ₹50,000</option>
                        <option value="₹50,000 – ₹1,00,000" className="bg-[#171329] text-white">₹50,000 – ₹1,00,000</option>
                        <option value="₹1,00,000 – ₹2,50,000" className="bg-[#171329] text-white">₹1,00,000 – ₹2,50,000</option>
                        <option value="₹2,50,000+" className="bg-[#171329] text-white">₹2,50,000+</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-300 mb-1.5">
                      Project Brief / Details
                    </label>
                    <textarea
                      rows={3}
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      placeholder="Outline target timeline, public persona goals, shooting locations, or campaign milestones..."
                      className="w-full px-4 py-3 rounded-xl bg-[#09090F] border border-[#8B5CF6]/20 text-white text-xs sm:text-sm focus:outline-none focus:border-[#8B5CF6] resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#8B5CF6] via-[#7C3AED] to-[#6D28D9] text-white font-medium text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xl shadow-[#8B5CF6]/30 hover:brightness-110 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      Submit Project Inquiry
                    </button>
                  </div>

                  <p className="text-[11px] text-zinc-500 text-center font-mono pt-1">
                    Directly encrypted and dispatched to ECHO EDIT media desk.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
