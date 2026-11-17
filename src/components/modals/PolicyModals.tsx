import React from 'react';
import { X, ShieldCheck, FileText } from 'lucide-react';

interface PolicyModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#171329] border border-[#8B5CF6]/30 rounded-3xl p-6 sm:p-8 shadow-2xl my-auto max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
          <div className="flex items-center gap-2.5">
            {type === 'privacy' ? (
              <ShieldCheck className="w-5 h-5 text-[#8B5CF6]" />
            ) : (
              <FileText className="w-5 h-5 text-[#D6B77A]" />
            )}
            <h3 className="text-xl font-bold font-display text-white">
              {type === 'privacy' ? 'Privacy Policy & Confidentiality NDA' : 'Terms of Agency Engagement'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-[#09090F] text-zinc-400 hover:text-white hover:bg-[#8B5CF6] transition-colors cursor-pointer border border-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto space-y-4 text-xs text-zinc-300 leading-relaxed pr-2 font-sans">
          {type === 'privacy' ? (
            <>
              <p>
                <strong className="text-white">1. Client Confidentiality & High-Stakes PR Protection:</strong> ECHO EDIT operates under strict confidentiality protocols. Identifiable photographs, strategy documents, speeches, internal polls, and political positioning assets are published or syndicated solely upon express written authorization by the client or authorized campaign manager.
              </p>
              <p>
                <strong className="text-white">2. Media Asset Ownership:</strong> All custom photographs, video footage, sound masters, and design collateral produced during client engagements remain client property upon settlement of agreed project fees, subject to standard non-exclusive agency portfolio display rights unless an exclusive NDA waiver has been executed.
              </p>
              <p>
                <strong className="text-white">3. Data Privacy & Contact Inquiries:</strong> Personal information submitted via consultation forms (name, contact numbers, email, campaign budgets) is encrypted in transit and stored strictly for communication regarding requested agency services. We never sell, lease, or syndicate user contact details.
              </p>
              <p>
                <strong className="text-white">4. Verified Collaborations:</strong> In accordance with our professional charter, ECHO EDIT only showcases verified public collaborations and authorized event production coverage.
              </p>
            </>
          ) : (
            <>
              <p>
                <strong className="text-white">1. Scope of Retainers & Services:</strong> Monthly service packages (Digital Presence, Political Digital Growth, Complete Media Management, and Full-Service Political PR) specify deliverables as outlined in the client engagement letter.
              </p>
              <p>
                <strong className="text-white">2. Separate Expenses & Out-of-Pocket Disbursements:</strong> In accordance with agency standards, travel costs, hotel lodging, out-station shoot logistics, paid meta/digital advertising budgets, extra celebrity appearance fees, and applicable statutory GST are invoiced separately.
              </p>
              <p>
                <strong className="text-white">3. Turnaround Times & Live Event Coverage:</strong> Live event press delivery (under 3 hours) is provided when prior multi-cam crews are deployed on ground. Regular editing turnaround follows agreed 24h–48h review cycles.
              </p>
              <p>
                <strong className="text-white">4. Revisions & Approval Cycles:</strong> Each creative asset includes up to two rounds of editorial review before final broadcast scheduling.
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-white/10 mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#09090F] hover:bg-[#8B5CF6] text-white text-xs font-mono uppercase tracking-wider border border-white/10 cursor-pointer transition-colors"
          >
            I Understand & Agree
          </button>
        </div>
      </div>
    </div>
  );
};
