import React, { useState } from 'react';
import { AgencyProvider, useAgency } from './context/AgencyContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/home/Hero';
import { AboutSection } from './components/home/AboutSection';
import { ServicesSection } from './components/home/ServicesSection';
import { PortfolioSection } from './components/home/PortfolioSection';
import { CreativeShowcase } from './components/home/CreativeShowcase';
import { CollaborationsSection } from './components/home/CollaborationsSection';
import { PricingSection } from './components/home/PricingSection';
import { TestimonialsSection } from './components/home/TestimonialsSection';
import { ContactSection } from './components/home/ContactSection';

import { LightboxModal } from './components/portfolio/LightboxModal';
import { VideoPlayerModal } from './components/modals/VideoPlayerModal';
import { ConsultationModal } from './components/modals/ConsultationModal';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { PolicyModal } from './components/modals/PolicyModals';

import { PortfolioItem, VideoProject, PricingPackage } from './types';

const MainApp: React.FC = () => {
  const { portfolioItems, videoProjects, isAdmin } = useAgency();

  // Modals state
  const [selectedPortfolioItem, setSelectedPortfolioItem] = useState<PortfolioItem | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<VideoProject | null>(null);
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [consultationService, setConsultationService] = useState('');
  const [consultationPackage, setConsultationPackage] = useState('');
  const [adminLoginOpen, setAdminLoginOpen] = useState(false);
  const [adminDashboardOpen, setAdminDashboardOpen] = useState(false);
  const [policyType, setPolicyType] = useState<'privacy' | 'terms' | null>(null);

  // Portfolio lightbox navigation
  const publishedPortfolio = portfolioItems.filter((i) => i.isPublished);
  const currentIdx = selectedPortfolioItem
    ? publishedPortfolio.findIndex((i) => i.id === selectedPortfolioItem.id)
    : -1;

  const handlePrevPortfolio = () => {
    if (currentIdx > 0) {
      setSelectedPortfolioItem(publishedPortfolio[currentIdx - 1]);
    }
  };

  const handleNextPortfolio = () => {
    if (currentIdx >= 0 && currentIdx < publishedPortfolio.length - 1) {
      setSelectedPortfolioItem(publishedPortfolio[currentIdx + 1]);
    }
  };

  const handleOpenAdmin = () => {
    if (isAdmin) {
      setAdminDashboardOpen(true);
    } else {
      setAdminLoginOpen(true);
    }
  };

  const handleSelectPackage = (pkg: PricingPackage) => {
    setConsultationPackage(pkg.title);
    setConsultationService(`Package: ${pkg.title}`);
    setConsultationOpen(true);
  };

  const handleInquireService = (serviceTitle: string) => {
    setConsultationService(serviceTitle);
    setConsultationPackage('');
    setConsultationOpen(true);
  };

  const handleOpenShowreelDirect = () => {
    if (videoProjects.length > 0) {
      setSelectedVideo(videoProjects[0]);
    } else {
      const el = document.getElementById('portfolio');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#09090F] text-[#F5F1FF] selection:bg-[#8B5CF6] selection:text-white relative">
      {/* Sticky Header Navigation */}
      <Navbar
        onOpenConsultation={() => {
          setConsultationService('');
          setConsultationPackage('');
          setConsultationOpen(true);
        }}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Main Sections */}
      <main>
        {/* 1. Cinematic Hero with Three.js 3D Chrome Sculpture & PBR Lighting */}
        <Hero
          onOpenConsultation={() => {
            setConsultationService('');
            setConsultationPackage('');
            setConsultationOpen(true);
          }}
          onOpenShowreel={handleOpenShowreelDirect}
        />

        {/* 2. About Section: "WE ARE MORE THAN JUST A MEDIA AGENCY." */}
        <AboutSection />

        {/* 3. 8 Interactive 3D Service Cards (All photos deleted, procedural 3D sculptures) */}
        <ServicesSection onInquireService={handleInquireService} />

        {/* 4. Portfolio Section: "OUR WORK SPEAKS LOUDER." (7 categories, 3D hover tilt) */}
        <PortfolioSection
          onSelectProject={(item) => setSelectedPortfolioItem(item)}
          onOpenShowreel={handleOpenShowreelDirect}
        />

        {/* 5. Creative Showcase: "EVERY FRAME HAS A STORY." */}
        <CreativeShowcase />

        {/* 7. Collaborations: "PEOPLE WE HAVE WORKED WITH." */}
        <CollaborationsSection
          onOpenConsultation={() => {
            setConsultationService('High-Profile Retainer');
            setConsultationOpen(true);
          }}
        />

        {/* 8. Retainers & Pricing: "INVEST IN IMPACT." */}
        <PricingSection
          onSelectPackage={handleSelectPackage}
          onOpenCustomQuote={() => {
            setConsultationService('Custom Campaign War-Room');
            setConsultationPackage('Custom Quote');
            setConsultationOpen(true);
          }}
        />

        {/* 9. Client Testimonials: "TRUSTED BY LEADERS AND CREATORS." */}
        <TestimonialsSection />

        {/* 10. Contact Section: "LET'S CREATE SOMETHING UNFORGETTABLE." */}
        <ContactSection />
      </main>

      {/* Global Agency Footer */}
      <Footer
        onOpenPrivacy={() => setPolicyType('privacy')}
        onOpenTerms={() => setPolicyType('terms')}
        onOpenConsultation={() => {
          setConsultationService('');
          setConsultationPackage('');
          setConsultationOpen(true);
        }}
      />

      {/* MODALS */}

      {/* Lightbox Modal for Original Photographs */}
      <LightboxModal
        item={selectedPortfolioItem}
        onClose={() => setSelectedPortfolioItem(null)}
        onPrev={handlePrevPortfolio}
        onNext={handleNextPortfolio}
        hasPrev={currentIdx > 0}
        hasNext={currentIdx >= 0 && currentIdx < publishedPortfolio.length - 1}
        onInquire={(title) => {
          setConsultationService(`Project Inquiry: ${title}`);
          setConsultationOpen(true);
        }}
      />

      {/* Video Player Modal */}
      <VideoPlayerModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />

      {/* Strategy Consultation & Booking Modal */}
      <ConsultationModal
        isOpen={consultationOpen}
        onClose={() => setConsultationOpen(false)}
        preselectedService={consultationService}
        preselectedPackage={consultationPackage}
      />

      {/* Admin Authentication Modal */}
      <AdminLoginModal
        isOpen={adminLoginOpen}
        onClose={() => setAdminLoginOpen(false)}
        onSuccess={() => {
          setAdminLoginOpen(false);
          setAdminDashboardOpen(true);
        }}
      />

      {/* Full Admin Management Dashboard */}
      <AdminDashboard
        isOpen={adminDashboardOpen}
        onClose={() => setAdminDashboardOpen(false)}
      />

      {/* Policy & Terms Modal */}
      <PolicyModal
        type={policyType}
        onClose={() => setPolicyType(null)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AgencyProvider>
      <MainApp />
    </AgencyProvider>
  );
}
