import React, { useState } from 'react';
import { X, Lock, KeyRound, AlertCircle, Sparkles } from 'lucide-react';
import { useAgency } from '../../context/AgencyContext';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { loginAdmin } = useAgency();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(password)) {
      setError(false);
      setPassword('');
      onSuccess();
    } else {
      setError(true);
    }
  };

  const handleDemoLogin = () => {
    if (loginAdmin('echo2026')) {
      setError(false);
      setPassword('');
      onSuccess();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4">
      <div className="relative w-full max-w-md bg-[#171329] border border-[#8B5CF6]/30 rounded-3xl p-6 sm:p-8 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#09090F] text-zinc-400 hover:text-white hover:bg-[#8B5CF6] transition-colors cursor-pointer border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Lock Icon */}
        <div className="w-12 h-12 rounded-2xl bg-[#8B5CF6]/15 text-[#C5A3FF] flex items-center justify-center mb-4 border border-[#8B5CF6]/30">
          <Lock className="w-6 h-6 text-[#8B5CF6]" />
        </div>

        <h3 className="text-xl font-bold font-display text-white mb-1">
          ECHO EDIT Studio Admin
        </h3>
        <p className="text-xs text-zinc-400 mb-6 font-sans">
          Access the content management suite to manage portfolio projects, video theatre, pricing retainers, testimonials, and agency settings.
        </p>

        {error && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs mb-4 font-mono">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>Invalid access key. Use password <strong className="text-white">echo2026</strong> or click 1-Click Demo Login below.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-zinc-300 mb-1.5">
              Admin Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                placeholder="Enter password..."
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#09090F] border border-[#8B5CF6]/20 text-white text-sm focus:outline-none focus:border-[#8B5CF6]"
              />
              <KeyRound className="w-4 h-4 text-[#8B5CF6] absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
            <p className="text-[11px] text-[#C5A3FF] font-mono mt-1">Default key: echo2026</p>
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] hover:brightness-110 text-white font-medium text-xs font-mono uppercase tracking-wider transition-all shadow-lg shadow-[#8B5CF6]/30 cursor-pointer"
            >
              Sign In to Admin Portal
            </button>

            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full py-3 px-4 rounded-xl bg-[#09090F] hover:bg-[#201a38] text-zinc-300 hover:text-white text-xs font-mono border border-[#8B5CF6]/30 flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D6B77A]" />
              1-Click Demo Login (echo2026)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
