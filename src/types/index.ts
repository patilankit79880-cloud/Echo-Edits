export type PortfolioCategory =
  | 'featured-collaborations'
  | 'political-personalities'
  | 'event-coverage'
  | 'photography'
  | 'promotional-videos'
  | 'behind-the-scenes'
  | 'creative-projects';

export interface PortfolioItem {
  id: string;
  title: string;
  clientOrPersonality: string;
  category: PortfolioCategory;
  description: string;
  image: string;
  additionalImages?: string[];
  videoUrl?: string;
  workPerformed: string[];
  projectDate?: string;
  isPublished: boolean;
  featured?: boolean;
}

export interface VideoProject {
  id: string;
  title: string;
  clientOrPersonality: string;
  category: 'Commercial' | 'Political PR' | 'Event' | 'Short-Form Reel' | 'Showreel' | 'Promotional';
  videoType: 'youtube' | 'mp4' | 'instagram' | 'vimeo';
  videoUrl: string;
  thumbnailUrl: string;
  description: string;
  duration?: string;
  isPublished: boolean;
  featured?: boolean;
}

export type SculptureShape =
  | 'chrome-knot'
  | 'glass-prism'
  | 'torus-ring'
  | 'crystal-icosa'
  | 'floating-monolith'
  | 'kinetic-sphere'
  | 'gold-reel'
  | 'wave-artifact';

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  sculptureShape: SculptureShape;
  deliverables: string[];
  popularFor: string;
  image?: string; // Removed/optional - no photos on service cards
}

export interface CollaborationItem {
  id: string;
  name: string;
  roleOrCategory: string;
  photograph: string;
  projectDetails: string;
  servicesDelivered: string[];
  relatedVideoUrl?: string;
  isPublished: boolean;
}

export interface PricingPackage {
  id: string;
  title: string;
  tagline: string;
  priceRange: string;
  period: string;
  idealFor: string;
  features: string[];
  popular?: boolean;
  badge?: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  organization: string;
  verified: boolean;
}

export interface ContactInquiry {
  id: string;
  name: string;
  organization: string;
  phone: string;
  email: string;
  service: string;
  budget: string;
  description: string;
  submittedAt: string;
  status: 'new' | 'contacted' | 'proposal_sent' | 'archived';
}

export interface AgencySettings {
  agencyName: string;
  tagline: string;
  phone: string;
  email: string;
  whatsapp: string;
  officeLocation: string;
  instagramHandle: string;
  instagramUrl: string;
  disclaimer: string;
}
