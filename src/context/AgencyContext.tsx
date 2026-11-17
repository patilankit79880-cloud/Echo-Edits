import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  PortfolioItem,
  VideoProject,
  ServiceItem,
  CollaborationItem,
  PricingPackage,
  TestimonialItem,
  ContactInquiry,
  AgencySettings,
} from '../types';
import {
  initialPortfolioItems,
  initialVideoProjects,
  initialCollaborations,
  initialServices,
  initialPricingPackages,
  initialTestimonials,
  initialSettings,
} from '../data/initialData';
import { resolveMediaUrl } from '../utils/media';

const normalizePortfolio = (items: PortfolioItem[]): PortfolioItem[] =>
  items.map((item) => ({
    ...item,
    image: resolveMediaUrl(item.image),
    additionalImages: item.additionalImages?.map((img) => resolveMediaUrl(img)),
  }));

const normalizeVideos = (videos: VideoProject[]): VideoProject[] =>
  videos.map((vid) => ({
    ...vid,
    thumbnailUrl: resolveMediaUrl(vid.thumbnailUrl),
  }));

const normalizeCollaborations = (items: CollaborationItem[]): CollaborationItem[] =>
  items.map((item) => ({
    ...item,
    photograph: resolveMediaUrl(item.photograph),
  }));

interface AgencyContextType {
  // State
  portfolioItems: PortfolioItem[];
  videoProjects: VideoProject[];
  collaborations: CollaborationItem[];
  services: ServiceItem[];
  pricingPackages: PricingPackage[];
  testimonials: TestimonialItem[];
  agencySettings: AgencySettings;
  inquiries: ContactInquiry[];
  isAdmin: boolean;

  // Actions - Portfolio
  addPortfolioItem: (item: Omit<PortfolioItem, 'id'>) => void;
  updatePortfolioItem: (id: string, item: Partial<PortfolioItem>) => void;
  deletePortfolioItem: (id: string) => void;
  togglePublishPortfolio: (id: string) => void;

  // Actions - Videos
  addVideoProject: (video: Omit<VideoProject, 'id'>) => void;
  updateVideoProject: (id: string, video: Partial<VideoProject>) => void;
  deleteVideoProject: (id: string) => void;
  togglePublishVideo: (id: string) => void;

  // Actions - Collaborations
  addCollaboration: (collab: Omit<CollaborationItem, 'id'>) => void;
  updateCollaboration: (id: string, collab: Partial<CollaborationItem>) => void;
  deleteCollaboration: (id: string) => void;

  // Actions - Services
  updateService: (id: string, service: Partial<ServiceItem>) => void;

  // Actions - Pricing
  updatePricingPackage: (id: string, pkg: Partial<PricingPackage>) => void;

  // Actions - Testimonials
  addTestimonial: (item: Omit<TestimonialItem, 'id'>) => void;
  updateTestimonial: (id: string, item: Partial<TestimonialItem>) => void;
  deleteTestimonial: (id: string) => void;

  // Actions - Inquiries
  submitInquiry: (inquiry: Omit<ContactInquiry, 'id' | 'submittedAt' | 'status'>) => void;
  updateInquiryStatus: (id: string, status: ContactInquiry['status']) => void;
  deleteInquiry: (id: string) => void;

  // Actions - Settings & Auth
  updateSettings: (settings: Partial<AgencySettings>) => void;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
  resetAllToDefaults: () => void;
}

const AgencyContext = createContext<AgencyContextType | undefined>(undefined);

export const AgencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(() => {
    const saved = localStorage.getItem('echo_portfolio_v6');
    if (saved) {
      try { return normalizePortfolio(JSON.parse(saved)); } catch (e) { console.error(e); }
    }
    return initialPortfolioItems;
  });

  const [videoProjects, setVideoProjects] = useState<VideoProject[]>(() => {
    const saved = localStorage.getItem('echo_videos_v3');
    if (saved) {
      try { return normalizeVideos(JSON.parse(saved)); } catch (e) { console.error(e); }
    }
    return initialVideoProjects;
  });

  const [collaborations, setCollaborations] = useState<CollaborationItem[]>(() => {
    const saved = localStorage.getItem('echo_collaborations_v4');
    if (saved) {
      try { return normalizeCollaborations(JSON.parse(saved)); } catch (e) { console.error(e); }
    }
    return initialCollaborations;
  });

  // Services: Fresh 8 services without photos
  const [services, setServices] = useState<ServiceItem[]>(() => {
    const saved = localStorage.getItem('echo_services_v2');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === 8) return parsed;
      } catch (e) { console.error(e); }
    }
    return initialServices;
  });

  const [pricingPackages, setPricingPackages] = useState<PricingPackage[]>(() => {
    const saved = localStorage.getItem('echo_pricing_v2');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return initialPricingPackages;
  });

  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(() => {
    const saved = localStorage.getItem('echo_testimonials_v2');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return initialTestimonials;
  });

  const [agencySettings, setAgencySettings] = useState<AgencySettings>(() => {
    const saved = localStorage.getItem('echo_settings_v4');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return initialSettings;
  });

  const [inquiries, setInquiries] = useState<ContactInquiry[]>(() => {
    const saved = localStorage.getItem('echo_inquiries_v2');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [
      {
        id: 'inq-seed-1',
        name: 'Vikramaditya Rao',
        organization: 'Leadership & Policy Summit',
        phone: '+91 98200 11223',
        email: 'vikram@policysummit.org',
        service: 'Political PR & Digital Communication',
        budget: '₹65,000–₹90,000/month',
        description: 'Need end-to-end digital war room strategy and verified speech highlight video cuts for civic outreach.',
        submittedAt: 'Today at 10:15 AM',
        status: 'new',
      },
    ];
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return sessionStorage.getItem('echo_admin_auth') === 'true';
  });

  // Persist state updates to localStorage
  useEffect(() => {
    localStorage.setItem('echo_portfolio_v6', JSON.stringify(portfolioItems));
  }, [portfolioItems]);

  useEffect(() => {
    localStorage.setItem('echo_videos_v3', JSON.stringify(videoProjects));
  }, [videoProjects]);

  useEffect(() => {
    localStorage.setItem('echo_collaborations_v4', JSON.stringify(collaborations));
  }, [collaborations]);

  useEffect(() => {
    localStorage.setItem('echo_services_v2', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('echo_pricing_v2', JSON.stringify(pricingPackages));
  }, [pricingPackages]);

  useEffect(() => {
    localStorage.setItem('echo_testimonials_v2', JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem('echo_settings_v4', JSON.stringify(agencySettings));
  }, [agencySettings]);

  useEffect(() => {
    localStorage.setItem('echo_inquiries_v2', JSON.stringify(inquiries));
  }, [inquiries]);

  // Auth
  const loginAdmin = (password: string): boolean => {
    if (password === 'echo2026' || password === 'admin' || password === 'demo') {
      setIsAdmin(true);
      sessionStorage.setItem('echo_admin_auth', 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('echo_admin_auth');
  };

  // Portfolio Actions
  const addPortfolioItem = (item: Omit<PortfolioItem, 'id'>) => {
    const newItem: PortfolioItem = {
      ...item,
      id: `port-${Date.now()}`,
    };
    setPortfolioItems(prev => [newItem, ...prev]);
  };

  const updatePortfolioItem = (id: string, updatedFields: Partial<PortfolioItem>) => {
    setPortfolioItems(prev =>
      prev.map(item => (item.id === id ? { ...item, ...updatedFields } : item))
    );
  };

  const deletePortfolioItem = (id: string) => {
    setPortfolioItems(prev => prev.filter(item => item.id !== id));
  };

  const togglePublishPortfolio = (id: string) => {
    setPortfolioItems(prev =>
      prev.map(item => (item.id === id ? { ...item, isPublished: !item.isPublished } : item))
    );
  };

  // Video Actions
  const addVideoProject = (video: Omit<VideoProject, 'id'>) => {
    const newVideo: VideoProject = {
      ...video,
      id: `vid-${Date.now()}`,
    };
    setVideoProjects(prev => [newVideo, ...prev]);
  };

  const updateVideoProject = (id: string, updatedFields: Partial<VideoProject>) => {
    setVideoProjects(prev =>
      prev.map(video => (video.id === id ? { ...video, ...updatedFields } : video))
    );
  };

  const deleteVideoProject = (id: string) => {
    setVideoProjects(prev => prev.filter(video => video.id !== id));
  };

  const togglePublishVideo = (id: string) => {
    setVideoProjects(prev =>
      prev.map(video => (video.id === id ? { ...video, isPublished: !video.isPublished } : video))
    );
  };

  // Collaboration Actions
  const addCollaboration = (collab: Omit<CollaborationItem, 'id'>) => {
    const newCollab: CollaborationItem = {
      ...collab,
      id: `collab-${Date.now()}`,
    };
    setCollaborations(prev => [newCollab, ...prev]);
  };

  const updateCollaboration = (id: string, updatedFields: Partial<CollaborationItem>) => {
    setCollaborations(prev =>
      prev.map(collab => (collab.id === id ? { ...collab, ...updatedFields } : collab))
    );
  };

  const deleteCollaboration = (id: string) => {
    setCollaborations(prev => prev.filter(collab => collab.id !== id));
  };

  // Service Actions
  const updateService = (id: string, updatedFields: Partial<ServiceItem>) => {
    setServices(prev =>
      prev.map(srv => (srv.id === id ? { ...srv, ...updatedFields } : srv))
    );
  };

  // Pricing Actions
  const updatePricingPackage = (id: string, updatedFields: Partial<PricingPackage>) => {
    setPricingPackages(prev =>
      prev.map(pkg => (pkg.id === id ? { ...pkg, ...updatedFields } : pkg))
    );
  };

  // Testimonial Actions
  const addTestimonial = (item: Omit<TestimonialItem, 'id'>) => {
    const newItem: TestimonialItem = {
      ...item,
      id: `test-${Date.now()}`,
    };
    setTestimonials(prev => [newItem, ...prev]);
  };

  const updateTestimonial = (id: string, updatedFields: Partial<TestimonialItem>) => {
    setTestimonials(prev =>
      prev.map(t => (t.id === id ? { ...t, ...updatedFields } : t))
    );
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials(prev => prev.filter(t => t.id !== id));
  };

  // Inquiry Actions
  const submitInquiry = (inquiryData: Omit<ContactInquiry, 'id' | 'submittedAt' | 'status'>) => {
    const newInquiry: ContactInquiry = {
      ...inquiryData,
      id: `inq-${Date.now()}`,
      submittedAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      status: 'new',
    };
    setInquiries(prev => [newInquiry, ...prev]);
  };

  const updateInquiryStatus = (id: string, status: ContactInquiry['status']) => {
    setInquiries(prev =>
      prev.map(inq => (inq.id === id ? { ...inq, status } : inq))
    );
  };

  const deleteInquiry = (id: string) => {
    setInquiries(prev => prev.filter(inq => inq.id !== id));
  };

  // Settings
  const updateSettings = (updated: Partial<AgencySettings>) => {
    setAgencySettings(prev => ({ ...prev, ...updated }));
  };

  const resetAllToDefaults = () => {
    setPortfolioItems(initialPortfolioItems);
    setVideoProjects(initialVideoProjects);
    setCollaborations(initialCollaborations);
    setServices(initialServices);
    setPricingPackages(initialPricingPackages);
    setTestimonials(initialTestimonials);
    setAgencySettings(initialSettings);
    localStorage.removeItem('echo_portfolio_v6');
    localStorage.removeItem('echo_portfolio_v5');
    localStorage.removeItem('echo_portfolio_v4');
    localStorage.removeItem('echo_portfolio_v3');
    localStorage.removeItem('echo_portfolio_v2');
    localStorage.removeItem('echo_videos_v3');
    localStorage.removeItem('echo_videos_v2');
    localStorage.removeItem('echo_collaborations_v4');
    localStorage.removeItem('echo_collaborations_v3');
    localStorage.removeItem('echo_collaborations_v2');
    localStorage.removeItem('echo_services_v2');
    localStorage.removeItem('echo_pricing_v2');
    localStorage.removeItem('echo_testimonials_v2');
    localStorage.removeItem('echo_settings_v4');
    localStorage.removeItem('echo_settings_v3');
    localStorage.removeItem('echo_settings_v2');
  };

  return (
    <AgencyContext.Provider
      value={{
        portfolioItems,
        videoProjects,
        collaborations,
        services,
        pricingPackages,
        testimonials,
        agencySettings,
        inquiries,
        isAdmin,
        addPortfolioItem,
        updatePortfolioItem,
        deletePortfolioItem,
        togglePublishPortfolio,
        addVideoProject,
        updateVideoProject,
        deleteVideoProject,
        togglePublishVideo,
        addCollaboration,
        updateCollaboration,
        deleteCollaboration,
        updateService,
        updatePricingPackage,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        submitInquiry,
        updateInquiryStatus,
        deleteInquiry,
        updateSettings,
        loginAdmin,
        logoutAdmin,
        resetAllToDefaults,
      }}
    >
      {children}
    </AgencyContext.Provider>
  );
};

export const useAgency = (): AgencyContextType => {
  const context = useContext(AgencyContext);
  if (!context) {
    throw new Error('useAgency must be used within an AgencyProvider');
  }
  return context;
};
