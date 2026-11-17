import {
  PortfolioItem,
  VideoProject,
  ServiceItem,
  CollaborationItem,
  PricingPackage,
  TestimonialItem,
  AgencySettings,
} from '../types';

export const initialPortfolioItems: PortfolioItem[] = [
  {
    id: 'port-1',
    title: 'Concert Stage Confetti Blast & Live Tour Climax',
    clientOrPersonality: 'National Arena Live Performance & Tour',
    category: 'event-coverage',
    description:
      'Multi-camera stage coverage capturing the peak confetti drop climax and audience energy with real-time digital dissemination across national social handles.',
    image: '/assets/aistudio/IMG_2327_e383a340.JPG',
    additionalImages: [
      '/assets/aistudio/IMG_7811_a83a5d4f.PNG',
      '/assets/aistudio/IMG_4898_81817a64.JPG',
    ],
    workPerformed: [
      'Stage Climax Moment Capture',
      'Confetti Burst High-Speed Cinematography',
      'Instant Viral Reel Turnaround (<2 hrs)',
      'Digital PR Event Amplification',
    ],
    projectDate: 'October 2025',
    isPublished: true,
    featured: true,
  },
  {
    id: 'port-2',
    title: 'Arena Spotlight & Intimate Acoustic Presence',
    clientOrPersonality: 'National Mega Tour Stage Management',
    category: 'photography',
    description:
      'Atmospheric low-light photography capturing golden volumetric lighting beams and raw stage connection with over 20,000 attendees holding lights.',
    image: '/assets/aistudio/IMG_7811_a83a5d4f.PNG',
    additionalImages: [
      '/assets/aistudio/IMG_2327_e383a340.JPG',
    ],
    workPerformed: [
      'Volumetric Beam Low-Light Cinematography',
      'Intimate Stage Atmosphere Capture',
      'Audio-Visual Storyboard Documentation',
      'Social Media Live Feed Management',
    ],
    projectDate: 'September 2025',
    isPublished: true,
    featured: true,
  },
  {
    id: 'port-3',
    title: 'Editorial Daylight Fashion & Wardrobe Narrative',
    clientOrPersonality: 'Celebrity Talent & Fashion Icon Collaboration',
    category: 'featured-collaborations',
    description:
      'Natural sunlight outdoor portraiture blending high-fashion wardrobe textures with cinematic environmental composition for brand endorsement visibility.',
    image: '/assets/aistudio/IMG_7808_af10a1e5.PNG',
    additionalImages: [
      '/assets/aistudio/IMG_4676_2ce60a84.JPG',
    ],
    workPerformed: [
      'Studio & Natural Sunlight Direction',
      'Wardrobe Texture & Silhouette Highlighting',
      'High-Resolution Portrait Retouching',
      'Syndicated Press & Social Asset Kit',
    ],
    projectDate: 'August 2025',
    isPublished: true,
    featured: true,
  },
  {
    id: 'port-4',
    title: 'Behind The Scenes: Script Reading & Production Direction',
    clientOrPersonality: 'Production House & Creative Direction Team',
    category: 'behind-the-scenes',
    description:
      'Exclusive behind-the-scenes documentation showing the pre-production workflow, talent script review, and camera crew coordination on set.',
    image: '/assets/aistudio/IMG_4896_63d61a60.JPG',
    additionalImages: [
      '/assets/aistudio/IMG_5288_794c3911.JPG',
    ],
    workPerformed: [
      'Pre-Production Workflow Documentation',
      'Candid Actor & Director Interaction Capture',
      'Set Lighting & Script Review Photography',
      'Documentary-Style Agency Social Content',
    ],
    projectDate: 'August 2025',
    isPublished: true,
    featured: true,
  },
  {
    id: 'port-5',
    title: 'Cinema & Fashion Lead: Outdoor Narrative Series',
    clientOrPersonality: 'Television & Cinema Personality',
    category: 'creative-projects',
    description:
      'Curated editorial studio shoot establishing an authoritative and modern personal brand narrative for digital and print syndication.',
    image: '/assets/aistudio/WhatsApp_Image_2026-11-11_at_23.25.32_31f589a2.jpeg',
    additionalImages: [
      '/assets/aistudio/IMG_4676_2ce60a84.JPG',
      '/assets/aistudio/IMG_7808_af10a1e5.PNG',
    ],
    workPerformed: [
      'Golden Hour Natural Sunlight Direction',
      'Bespoke Color Correction & Skin Tones',
      'Editorial Magazine & Instagram Grid Strategy',
      'Celebrity Image Architecture',
    ],
    projectDate: 'July 2025',
    isPublished: true,
    featured: true,
  },
  {
    id: 'port-6',
    title: 'High-End Cinema Camera Packages & Rig Logistics',
    clientOrPersonality: 'Cinematography & Field Engineering Division',
    category: 'promotional-videos',
    description:
      'Precision cinema-grade camera packages, anamorphic lenses, wireless focus rigs, and production workflow documentation for commercial sets.',
    image: '/assets/aistudio/IMG_5288_794c3911.JPG',
    additionalImages: [
      '/assets/aistudio/IMG_4896_63d61a60.JPG',
    ],
    workPerformed: [
      'Field Rig Configuration & Calibration',
      '4K/6K Raw Log Profile Management',
      'Short-Form Commercial Tech Lookbook',
      'Production House Brand Visibility',
    ],
    projectDate: 'June 2025',
    isPublished: true,
    featured: false,
  },
  {
    id: 'port-7',
    title: 'Public Leadership & Character Presence Studio Series',
    clientOrPersonality: 'Public Representative & Civic Speaker',
    category: 'political-personalities',
    description:
      'High-impact personality positioning and dramatic cinematic chiaroscuro portraiture engineered for modern civic representation and youth constituency resonance.',
    image: '/assets/aistudio/3499a465-6e75-4402-842f-22d7d666d9af_22df19a8.jpg',
    additionalImages: [
      '/assets/aistudio/IMG_4898_81817a64.JPG',
      '/assets/aistudio/IMG_2327_e383a340.JPG',
    ],
    workPerformed: [
      'Character & Youth Icon Identity Framing',
      'Pop-Art Set Design & Lighting Calibration',
      'Press Release Portrait Standard Pack',
      'Constituency Social Media Campaign Assets',
    ],
    projectDate: 'May 2025',
    isPublished: true,
    featured: true,
  },
];

export const initialVideoProjects: VideoProject[] = [
  {
    id: 'vid-1',
    title: 'ECHO EDIT Official Agency Cinema Showreel',
    clientOrPersonality: 'ECHO EDIT Signature Media',
    category: 'Showreel',
    videoType: 'mp4',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnailUrl: '/assets/aistudio/IMG_7811_a83a5d4f.PNG',
    description:
      'A cinematic showcase of high-octane stage productions, political communication campaigns, and celebrity digital branding by ECHO EDIT.',
    duration: '01:45',
    isPublished: true,
    featured: true,
  },
  {
    id: 'vid-2',
    title: 'Arena Tour Stage & Climax Moment Reel',
    clientOrPersonality: 'Concert & Festival Live Division',
    category: 'Event',
    videoType: 'mp4',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnailUrl: '/assets/aistudio/IMG_7808_af10a1e5.PNG',
    description:
      'Full live energy reel with multi-angle camera tracking, drone stage flyovers, and audience resonance.',
    duration: '02:10',
    isPublished: true,
    featured: true,
  },
  {
    id: 'vid-3',
    title: 'Political Digital Movement & Narrative Film',
    clientOrPersonality: 'Public Leadership & Regional Campaign',
    category: 'Political PR',
    videoType: 'youtube',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnailUrl: '/assets/aistudio/IMG_4896_63d61a60.JPG',
    description:
      'Strategic narrative building, speech highlight reels, and digital manifesto film engineered for grassroots social mobilization.',
    duration: '03:15',
    isPublished: true,
    featured: true,
  },
  {
    id: 'vid-4',
    title: 'High-Fashion Lookbook & Trendsetting Short-Form',
    clientOrPersonality: 'Fashion & Lifestyle Public Personality',
    category: 'Short-Form Reel',
    videoType: 'mp4',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnailUrl: '/assets/aistudio/IMG_5288_794c3911.JPG',
    description:
      'Fast-paced 9:16 vertical edit with rhythmic sound design, trending music transitions, and luxury aesthetics.',
    duration: '00:45',
    isPublished: true,
    featured: false,
  },
];

export const initialCollaborations: CollaborationItem[] = [
  {
    id: 'collab-1',
    name: 'Celebrity Talent & Media Figure',
    roleOrCategory: 'Public Personality & Digital Icon',
    photograph: '/assets/aistudio/IMG_2327_e383a340.JPG',
    projectDetails:
      'Full-spectrum image curation, studio fashion portraits, wardrobe narrative styling, and cross-platform verified digital branding.',
    servicesDelivered: [
      'Studio Portrait Cinematography',
      'Personal Branding Strategy',
      'Digital PR Syndication',
      'Reels Creation',
    ],
    isPublished: true,
  },
  {
    id: 'collab-2',
    name: 'Cinema & Fashion Lead',
    roleOrCategory: 'Actor & Public Influencer',
    photograph: '/assets/aistudio/WhatsApp_Image_2026-11-11_at_23.25.32_31f589a2.jpeg',
    projectDetails:
      'Editorial outdoor fashion shoots, high-concept lookbook carousels, and strategic Instagram feed curation yielding multi-million impressions.',
    servicesDelivered: [
      'Editorial Photography',
      'Instagram Aesthetic Management',
      'Brand Endorsement Framing',
    ],
    isPublished: true,
  },
  {
    id: 'collab-3',
    name: 'Arena Live & Concert Producers',
    roleOrCategory: 'Event Organizers & Stage Performers',
    photograph: '/assets/aistudio/IMG_7811_a83a5d4f.PNG',
    projectDetails:
      'Full stadium live-event media production, instant backstage and stage climax recap reels, and post-event press distribution.',
    servicesDelivered: [
      'Live Event Photography',
      'Multi-Camera Stage Video',
      'Viral Short-Form Delivery',
      'PR Coverage',
    ],
    isPublished: true,
  },
  {
    id: 'collab-4',
    name: 'Creative Production Crew & Directors',
    roleOrCategory: 'Pre-Production & Storyboarding Unit',
    photograph: '/assets/aistudio/IMG_4896_63d61a60.JPG',
    projectDetails:
      'Behind-the-scenes narrative documentation, script read sessions, set coordination, and director-led visual campaigns.',
    servicesDelivered: [
      'Behind-The-Scenes Video',
      'Storyboarding & Creative Direction',
      'Technical Media Production',
    ],
    isPublished: true,
  },
];

// EXACT 8 SERVICES (No photos - purely 3D interactive sculptures & premium depth)
export const initialServices: ServiceItem[] = [
  {
    id: 'srv-1',
    number: '01',
    title: 'Political PR & Digital Communication',
    shortDesc: 'Strategic narrative engineering, election digital war rooms, perception management, and constituent outreach.',
    fullDesc:
      'We craft authoritative, credible digital footprints for political personalities and leaders. From daily press releases, crisis response strategies, and policy highlight reels to targeted regional communication campaigns, our team ensures your voice leads public discourse.',
    iconName: 'Landmark',
    sculptureShape: 'floating-monolith',
    deliverables: [
      'Narrative & Perception Auditing',
      'Speech & Manifesto Digital Adaptation',
      'Crisis PR & Real-Time Response Unit',
      'Regional Vernacular Content Strategy',
    ],
    popularFor: 'Elected Representatives, Party Leaders, Campaign Committees',
  },
  {
    id: 'srv-2',
    number: '02',
    title: 'Social Media Management',
    shortDesc: 'End-to-end multi-platform digital orchestration, algorithmic growth, community engagement, and brand dominance.',
    fullDesc:
      'Complete channel management designed for high-profile figures. We manage publishing cadence, comment governance, growth experiments, and viral distribution frameworks across all relevant networks.',
    iconName: 'Share2',
    sculptureShape: 'kinetic-sphere',
    deliverables: [
      'Multi-Platform Content Roadmaps',
      'Algorithmic Trend Capitalization',
      'Community Moderation & Sentiment Shield',
      'Weekly Data & Reach Diagnostics',
    ],
    popularFor: 'High-Growth Brands, Public Figures, Corporate Executives',
  },
  {
    id: 'srv-3',
    number: '03',
    title: 'Instagram & Facebook Management',
    shortDesc: 'Curated aesthetic feeds, viral short-form pacing, verified profile stewardship, and high-conversion stories.',
    fullDesc:
      'We architect bespoke visual identities for Meta platforms. Through hook-driven storytelling, interactive story pipelines, and grid harmonization, your social presence radiates prestige and magnetic appeal.',
    iconName: 'Instagram',
    sculptureShape: 'torus-ring',
    deliverables: [
      'Bespoke Grid & Color Harmony System',
      '15–30 High-Retention Reels Monthly',
      'Daily Interactive Story Sequences',
      'Verified Page Governance & Verification',
    ],
    popularFor: 'Celebrities, Influencers, Consumer Brands',
  },
  {
    id: 'srv-4',
    number: '04',
    title: 'Video Production & Editing',
    shortDesc: 'Cinema-grade 4K/8K camera packages, Hollywood color workflows, studio sound design, and master pacing.',
    fullDesc:
      'From scripted brand films and leadership documentaries to festival stage productions, our cinematography crews deploy high-end cinema cameras, anamorphic lenses, and professional lighting rigs.',
    iconName: 'Video',
    sculptureShape: 'gold-reel',
    deliverables: [
      'Full Cinema Camera Package (RED/ARRI/Sony FX)',
      'Multi-Point Studio & On-Location Lighting',
      'Bespoke Sound Recording & Sound Design',
      'Master Color Grading & Finishing',
    ],
    popularFor: 'Commercial Campaigns, Feature Documentaries, Event Films',
  },
  {
    id: 'srv-5',
    number: '05',
    title: 'Reels & Short-Form Content',
    shortDesc: 'Proprietary 3-second hook structures, kinetic typography, retention psychology, and viral social pacing.',
    fullDesc:
      'Dominating modern attention spans requires micro-level precision. We transform interviews, speeches, and lifestyle moments into explosive 9:16 vertical edits engineered for peak algorithmic retention.',
    iconName: 'Zap',
    sculptureShape: 'chrome-knot',
    deliverables: [
      'Proprietary 3-Second Hook Structuring',
      'Dynamic Animated Text Subtitles',
      'Sound Effects Punctuation & Foley',
      'High-Frequency Weekly Turnaround',
    ],
    popularFor: 'Public Speakers, Artists, Political Commentators',
  },
  {
    id: 'srv-6',
    number: '06',
    title: 'Photography & Event Coverage',
    shortDesc: 'Rapid turnaround live-event media crews capturing electric stage climaxes, VIP interactions, and press moments.',
    fullDesc:
      'Our seasoned photographers document high-stakes events, stadium concerts, and private summits. With same-day press delivery (<3 hours), media syndicates receive publish-ready imagery while the moment is trending.',
    iconName: 'Camera',
    sculptureShape: 'glass-prism',
    deliverables: [
      'Multi-Photographer Live Rigs',
      'Same-Day Press Photo Delivery (<3 Hours)',
      'Stage Climax & Volumetric Moment Capture',
      'High-Resolution Retouched Hero Images',
    ],
    popularFor: 'Stadium Tours, Political Rallies, Corporate Summits',
  },
  {
    id: 'srv-7',
    number: '07',
    title: 'Creative Design & Branding',
    shortDesc: 'Award-winning key art, campaign billboards, editorial carousels, and futuristic visual identity systems.',
    fullDesc:
      'We forge distinctive visual signatures that command attention. From high-impact election posters and brand manifestos to custom typography and digital collateral, every asset reinforces your strategic stature.',
    iconName: 'Palette',
    sculptureShape: 'crystal-icosa',
    deliverables: [
      'Key Art Posters & Billboard Designs',
      'Multi-Slide Educational Carousels',
      'Event Pass & Stage Backdrop Collateral',
      'Complete Brand Identity Guidelines',
    ],
    popularFor: 'Campaign Launches, Political War Rooms, Premium Ventures',
  },
  {
    id: 'srv-8',
    number: '08',
    title: 'Corporate Media Management',
    shortDesc: 'Executive aura development, crisis defense, investor communications, and strategic stakeholder PR.',
    fullDesc:
      'Guiding enterprise reputation through high-stakes environments. We provide executive media training, thought-leadership ghostwriting, press release syndication, and digital crisis mitigation.',
    iconName: 'Building2',
    sculptureShape: 'wave-artifact',
    deliverables: [
      'Executive Thought-Leadership Architecture',
      'Crisis Defense & Reputation Shield',
      'Investor & Stakeholder Video Reports',
      'National & Global Press Syndication',
    ],
    popularFor: 'Founders, C-Suite Leaders, Conglomerates',
  },
];

export const initialPricingPackages: PricingPackage[] = [
  {
    id: 'price-1',
    title: 'DIGITAL PRESENCE',
    tagline: 'Foundational digital authority and regular media flow.',
    priceRange: '₹35,000–₹45,000',
    period: '/month',
    idealFor: 'Emerging personalities, boutique businesses, and growing creators.',
    features: [
      'Curated Instagram & Facebook Management',
      '8–12 High-Retention Short-Form Reels / Month',
      'Bi-Weekly Creative Posters & Graphic Assets',
      'Dedicated Social Media Manager & Copywriter',
      'Hashtag & Audience Algorithm Optimization',
      'Monthly Analytics & Growth Strategy Review',
    ],
    popular: false,
    badge: 'Starter',
  },
  {
    id: 'price-2',
    title: 'POLITICAL DIGITAL GROWTH',
    tagline: 'Targeted constituent outreach, grassroots resonance, and regional leadership.',
    priceRange: '₹65,000–₹90,000',
    period: '/month',
    idealFor: 'Aspiring candidates, regional MLAs, party spokespersons, and civic leaders.',
    features: [
      'Comprehensive Political PR & Messaging Architecture',
      '18–24 Short-Form Speech & Rally Video Edits',
      'Regional Vernacular Content (Hindi/Regional Language)',
      'Constituency Narrative & Sentiment Tracking',
      'Emergency Crisis Response Support (12hr TAT)',
      'Festive & Community Rally Digital Creatives',
      'WhatsApp Broadcast Asset Packaging',
    ],
    popular: true,
    badge: 'Popular for Leaders',
  },
  {
    id: 'price-3',
    title: 'COMPLETE MEDIA MANAGEMENT',
    tagline: 'End-to-end studio video production, event coverage, and executive branding.',
    priceRange: '₹1,25,000–₹1,75,000',
    period: '/month',
    idealFor: 'Celebrities, established brands, public figures, and multi-venture founders.',
    features: [
      'Full Studio & On-Location Shoot Days (1–2 Days/Month)',
      '25–35 Cinema-Grade Reels & Long-Form Video Cuts',
      'Event Coverage & Same-Day Photo Turnaround',
      'Senior Creative Director & Lead Video Editor Assigned',
      'Multi-Platform Syndication (IG, FB, YouTube, LinkedIn)',
      'Brand Endorsement & Collaboration Filtering',
      'Weekly Strategy War-Room Alignment Calls',
    ],
    popular: false,
    badge: 'Full Production',
  },
  {
    id: 'price-4',
    title: 'ENTERPRISE & POLITICAL PR',
    tagline: 'High-stakes campaign war-room, nationwide media syndication, and electoral dominance.',
    priceRange: 'Custom quotation from ₹2,00,000',
    period: '/month',
    idealFor: 'Sitting MPs/Ministers, major political organizations, and high-stakes election campaigns.',
    features: [
      '24/7 Dedicated Digital Campaign War Room Unit',
      'Continuous Camera Crew On-Tour Ground Support',
      'National & Regional Media Press Release Syndication',
      'Rapid Rebuttal & Narrative Defense Unit (<30 min TAT)',
      'Speechwriting, Keynote Teleprompter & Live Broadcast Rigs',
      'Mass Voter Psychographic Ad Campaign Management',
      'Bespoke Drone, Confetti Stage, and Stadium Coverage',
      'Full Executive Discretion & NDA Protection',
    ],
    popular: false,
    badge: 'Enterprise War Room',
  },
];

export const initialTestimonials: TestimonialItem[] = [
  {
    id: 'test-1',
    quote:
      'ECHO EDIT transformed our entire digital campaign strategy. Their ability to deliver cinema-quality video cuts within hours of our public rallies established our leadership narrative.',
    author: 'Senior Political Campaign Director',
    role: 'State Campaign Committee',
    organization: 'Regional Leadership Unit',
    verified: true,
  },
  {
    id: 'test-2',
    quote:
      'The visual precision and discretion ECHO EDIT brings is unmatched. Our editorial shoots and social reels generated over 15M organic impressions in under two months.',
    author: 'Celebrity Talent Manager',
    role: 'Artist Representation',
    organization: 'Leading Entertainment Agency',
    verified: true,
  },
  {
    id: 'test-3',
    quote:
      'From stadium concert coverage to instant post-event virality, their camera crews operate with extraordinary discipline. Every frame truly carries artistic weight.',
    author: 'National Tour Producer',
    role: 'Live Arena Event Director',
    organization: 'Concert Productions Ltd.',
    verified: true,
  },
];

export const initialSettings: AgencySettings = {
  agencyName: 'ECHO EDIT',
  tagline: 'We Capture Stories. We Create Influence.',
  phone: '+91 85459 75486',
  email: 'Echoedittss@gmail.com',
  whatsapp: '918545975486',
  officeLocation: 'Delhi NCR, India',
  instagramHandle: '@echoedittss',
  instagramUrl: 'https://www.instagram.com/echoedittss/',
  disclaimer:
    'Travel, lodging, advertising ad-spend budgets, additional equipment rental/shoots, and applicable statutory taxes may be charged separately based on actual campaign scope.',
};
