import React, { useState } from 'react';
import { X, Send, Sparkles, CheckCircle2, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAgency } from '../../context/AgencyContext';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
  preselectedPackage?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  preselectedService = '',
  preselectedPackage = '',
}) => {
  const { submitInquiry, agencySettings, services } = useAgency();

  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    phone: '',
    email: '',
    service: preselectedService || (preselectedPackage ? `Package: ${preselectedPackage}` : 'Political PR & Digital Communication'),
    budget: preselectedPackage ? 'As per package' : '₹50,000 – ₹1,00,000',
    description: '',
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) return;

    submitInquiry({
      name: formData.name,
      organization: formData.organization || 'Individual / Public Figure',
      phone: formData.phone,
      email: formData.email,
      service: formData.service,
      budget: formData.budget,
      description: formData.description || 'Requesting consultation call regarding PR & Media strategy.',
    });

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#8B5CF6', '#C5A3FF', '#D6B77A', '#F5F1FF'],
      });
    } catch (e) {
      console.error(e);
    }

    setSubmitted(true);
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hello ECHO EDIT! I am ${formData.name || 'interested'} from ${formData.organization || 'my brand'}. I want to inquire about: ${formData.service || 'PR & Media Production Services'}.`
    );
    window.open(`https://wa.me/${agencySettings.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#171329] border border-[#8B5CF6]/30 rounded-3xl p-6 sm:p-8 shadow-2xl my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#09090F] text-zinc-400 hover:text-white hover:bg-[#8B5CF6] transition-colors cursor-pointer border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-[#8B5CF6]/20 text-[#C5A3FF] flex items-center justify-center mx-auto mb-4 border border-[#8B5CF6]/40">
              <CheckCircle2 className="w-9 h-9 text-[#8B5CF6]" />
            </div>
            <h3 className="text-2xl font-bold font-display text-white mb-2">
              Inquiry Dispatched to ECHO EDIT
            </h3>
            <p className="text-sm text-zinc-300 max-w-md mx-auto mb-6 font-sans">
              Thank you, <span className="text-white font-semibold">{formData.name}</span>. Our senior media strategist will connect with you within 2 business hours.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleWhatsAppDirect}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-black font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg font-mono uppercase tracking-wider"
              >
                <MessageSquare className="w-4 h-4" />
                Connect on WhatsApp
              </button>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#09090F] hover:bg-[#201a38] text-zinc-300 hover:text-white text-xs font-mono border border-white/10 cursor-pointer uppercase tracking-wider"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-[#8B5CF6] animate-pulse" />
                <span className="text-xs uppercase font-mono tracking-wider text-[#C5A3FF]">
                  Confidential Consultation
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
                Book a Strategy Session
              </h3>
              <p className="text-xs text-zinc-400 mt-1 font-sans">
                Tell us about your public persona, campaign timeline, or production scope.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Arjun Sharma"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#09090F] border border-[#8B5CF6]/20 text-white text-sm focus:outline-none focus:border-[#8B5CF6]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-zinc-300 mb-1">
                    Organization / Title
                  </label>
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="e.g. Public Figure / Media Office"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#09090F] border border-[#8B5CF6]/20 text-white text-sm focus:outline-none focus:border-[#8B5CF6]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-300 mb-1">
                    WhatsApp / Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 85459 75486"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#09090F] border border-[#8B5CF6]/20 text-white text-sm focus:outline-none focus:border-[#8B5CF6]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-zinc-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@domain.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#09090F] border border-[#8B5CF6]/20 text-white text-sm focus:outline-none focus:border-[#8B5CF6]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-300 mb-1">
                    Service Area
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#09090F] border border-[#8B5CF6]/20 text-white text-xs sm:text-sm focus:outline-none focus:border-[#8B5CF6]"
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
                  <label className="block text-xs font-mono text-zinc-300 mb-1">
                    Budget Range
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#09090F] border border-[#8B5CF6]/20 text-white text-xs sm:text-sm focus:outline-none focus:border-[#8B5CF6]"
                  >
                    <option value="Below ₹50,000" className="bg-[#171329] text-white">Below ₹50,000</option>
                    <option value="₹50,000 – ₹1,00,000" className="bg-[#171329] text-white">₹50,000 – ₹1,00,000</option>
                    <option value="₹1,00,000 – ₹2,50,000" className="bg-[#171329] text-white">₹1,00,000 – ₹2,50,000</option>
                    <option value="₹2,50,000+" className="bg-[#171329] text-white">₹2,50,000+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-300 mb-1">
                  Brief Project Objectives
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Outline key dates, target audience, speech schedules, or brand challenges..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#09090F] border border-[#8B5CF6]/20 text-white text-xs sm:text-sm focus:outline-none focus:border-[#8B5CF6] resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#8B5CF6] via-[#7C3AED] to-[#6D28D9] text-white font-medium text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-[#8B5CF6]/30 hover:brightness-110 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  Schedule Strategy Discussion
                </button>
              </div>

              <div className="pt-1 flex items-center justify-center">
                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  className="text-xs font-mono text-[#25D366] hover:underline flex items-center gap-1.5 cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  Or chat with senior partner on WhatsApp
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
