import React, { useState } from 'react';
import {
  Landmark,
  Share2,
  Instagram,
  Video,
  Zap,
  Camera,
  Palette,
  Building2,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { useAgency } from '../../context/AgencyContext';
import { ServiceItem } from '../../types';
import { ServiceSculpture3D } from '../three/ServiceSculpture3D';

interface ServicesSectionProps {
  onSelectService?: (service: ServiceItem) => void;
  onInquireService?: (serviceTitle: string) => void;
  onOpenConsultation?: () => void;
}

// Icon mapper for service disciplines
const getServiceIcon = (iconName: string) => {
  switch (iconName) {
    case 'Landmark':
      return <Landmark className="w-5 h-5 text-[#8B5CF6]" />;
    case 'Share2':
      return <Share2 className="w-5 h-5 text-[#8B5CF6]" />;
    case 'Instagram':
      return <Instagram className="w-5 h-5 text-[#8B5CF6]" />;
    case 'Video':
      return <Video className="w-5 h-5 text-[#D6B77A]" />;
    case 'Zap':
      return <Zap className="w-5 h-5 text-[#8B5CF6]" />;
    case 'Camera':
      return <Camera className="w-5 h-5 text-[#D6B77A]" />;
    case 'Palette':
      return <Palette className="w-5 h-5 text-[#8B5CF6]" />;
    case 'Building2':
    default:
      return <Building2 className="w-5 h-5 text-[#D6B77A]" />;
  }
};

// 3D Tilt Card Component
interface TiltCardProps {
  service: ServiceItem;
  onSelect: () => void;
}

const ServiceTiltCard: React.FC<TiltCardProps> = ({ service, onSelect }) => {
  const [hovered, setHovered] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle 3D tilt calculation
    const rotX = ((y - centerY) / centerY) * -10;
    const rotY = ((x - centerX) / centerX) * 10;

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${
          hovered ? 'scale3d(1.02, 1.02, 1.02)' : 'scale3d(1, 1, 1)'
        }`,
        transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className={`group relative rounded-2xl bg-gradient-to-b from-[#171329]/90 to-[#09090F]/95 border transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl ${
        hovered
          ? 'border-[#8B5CF6]/60 shadow-[0_20px_50px_-15px_rgba(139,92,246,0.3)]'
          : 'border-white/10 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.8)]'
      }`}
    >
      {/* Ambient background glow on hover */}
      <div
        className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[80px] pointer-events-none transition-opacity duration-500 ${
          hovered ? 'opacity-40 bg-[#8B5CF6]' : 'opacity-0 bg-[#8B5CF6]'
        }`}
      />

      <div className="p-6 relative z-10 flex flex-col flex-1">
        {/* Top Header: Badge, Icon & Number */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#1F1A38] border border-[#8B5CF6]/30 flex items-center justify-center shadow-inner">
              {getServiceIcon(service.iconName)}
            </div>
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
              DISCIPLINE
            </span>
          </div>

          <span className="text-sm font-mono font-bold text-zinc-500 group-hover:text-[#C5A3FF] transition-colors">
            {service.number}
          </span>
        </div>

        {/* Real Interactive 3D Sculpture Canvas (No Photos!) */}
        <div className="relative my-2 rounded-xl bg-gradient-to-b from-[#130F24]/80 to-[#0C0A14]/90 border border-white/5 flex items-center justify-center">
          <ServiceSculpture3D shape={service.sculptureShape} isHovered={hovered} />
          
          <div className="absolute bottom-2 right-2.5 px-2 py-0.5 rounded bg-black/60 border border-white/10 text-[10px] font-mono text-zinc-400">
            3D Artifact
          </div>
        </div>

        {/* Title & Short Description */}
        <div className="space-y-2 mt-3 flex-1">
          <h3 className="text-lg font-bold text-white group-hover:text-gradient-violet transition-colors tracking-tight">
            {service.title}
          </h3>
          <p className="text-xs text-zinc-400 leading-relaxed font-normal">
            {service.shortDesc}
          </p>
        </div>

        {/* Revealed Additional Information on Hover */}
        <div
          className={`space-y-2.5 pt-4 mt-3 border-t border-white/10 transition-all duration-300 ${
            hovered ? 'opacity-100 max-h-48' : 'opacity-85 max-h-48'
          }`}
        >
          <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-[#D6B77A]" />
            <span>Key Deliverables:</span>
          </div>

          <div className="space-y-1.5">
            {service.deliverables.slice(0, 3).map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-zinc-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0" />
                <span className="truncate">{item}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 text-[11px] text-zinc-400">
            <span className="text-zinc-500 font-mono">Ideal for: </span>
            <span className="text-[#C5A3FF]">{service.popularFor}</span>
          </div>
        </div>
      </div>

      {/* Action Footer: View Service */}
      <div className="px-6 py-3.5 bg-[#120F20] border-t border-white/10 flex items-center justify-between mt-auto">
        <button
          onClick={onSelect}
          className="w-full flex items-center justify-between text-xs font-mono uppercase tracking-wider text-zinc-300 group-hover:text-white transition-colors cursor-pointer py-1"
        >
          <span className="flex items-center gap-1.5">
            <span>View Service Details</span>
            <span className="text-[#8B5CF6]">•</span>
            <span className="text-[11px] text-zinc-400 capitalize">Inquire</span>
          </span>
          <div className="w-7 h-7 rounded-lg bg-[#1F1A38] border border-[#8B5CF6]/30 flex items-center justify-center group-hover:bg-[#8B5CF6] group-hover:text-white transition-all">
            <ArrowUpRight className="w-4 h-4 text-zinc-300 group-hover:text-white transition-colors" />
          </div>
        </button>
      </div>
    </div>
  );
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectService,
  onInquireService,
  onOpenConsultation,
}) => {
  const { services } = useAgency();

  const handleCardClick = (service: ServiceItem) => {
    if (onSelectService) {
      onSelectService(service);
    } else if (onInquireService) {
      onInquireService(service.title);
    }
  };

  return (
    <section id="services" className="relative py-28 bg-[#09090F] overflow-hidden">
      {/* Ambient background lighting */}
      <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-[#8B5CF6]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#D6B77A]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Cinematic subtle grain */}
      <div className="absolute inset-0 cinema-grain pointer-events-none opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#171329] border border-[#8B5CF6]/30 text-xs font-mono text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
              <span className="text-[#C5A3FF] uppercase font-bold tracking-wider">
                Our Capabilities & Disciplines
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white tracking-tight leading-[1.1]">
              CRAFTED WITH PRECISION.{' '}
              <span className="text-gradient-violet">DELIVERED WITH IMPACT.</span>
            </h2>

            <p className="text-base text-zinc-400 font-normal leading-relaxed">
              8 interactive 3D service cards featuring real-time procedural Three.js artifacts. No static stock photos—pure artistic depth, realistic lighting, and tactile mouse physics.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (onOpenConsultation) {
                  onOpenConsultation();
                } else if (onInquireService) {
                  onInquireService('General Retainer Inquiry');
                }
              }}
              className="px-5 py-3 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-mono text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#8B5CF6]/20 flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#D6B77A]" />
              Inquire Custom Scope
            </button>
          </div>
        </div>

        {/* 8 Interactive 3D Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <ServiceTiltCard
              key={service.id}
              service={service}
              onSelect={() => handleCardClick(service)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
