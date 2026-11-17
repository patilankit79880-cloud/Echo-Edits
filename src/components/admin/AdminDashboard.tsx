import React, { useState } from 'react';
import {
  X,
  Plus,
  Trash2,
  Edit,
  Eye,
  EyeOff,
  Video,
  Image as ImageIcon,
  Users,
  Briefcase,
  DollarSign,
  Inbox,
  Settings,
  Sparkles,
  Check,
  AlertCircle,
  ExternalLink,
  RotateCcw,
  MessageSquareQuote,
  Star,
} from 'lucide-react';
import { useAgency } from '../../context/AgencyContext';
import { PortfolioItem, VideoProject, CollaborationItem, PricingPackage, ServiceItem, TestimonialItem } from '../../types';
import { BrandLogo } from '../common/BrandLogo';
import { SafeImage } from '../common/SafeImage';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = 'portfolio' | 'videos' | 'collaborations' | 'services' | 'pricing' | 'testimonials' | 'inquiries' | 'settings';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const {
    portfolioItems,
    addPortfolioItem,
    updatePortfolioItem,
    deletePortfolioItem,
    togglePublishPortfolio,

    videoProjects,
    addVideoProject,
    updateVideoProject,
    deleteVideoProject,
    togglePublishVideo,

    collaborations,
    addCollaboration,
    updateCollaboration,
    deleteCollaboration,

    services,
    updateService,

    pricingPackages,
    updatePricingPackage,

    testimonials,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,

    inquiries,
    updateInquiryStatus,
    deleteInquiry,

    agencySettings,
    updateSettings,

    resetAllToDefaults,
    logoutAdmin,
  } = useAgency();

  const [activeTab, setActiveTab] = useState<TabType>('portfolio');
  const [notification, setNotification] = useState<string | null>(null);

  const showNotice = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // State for creating new portfolio item
  const [isAddingPortfolio, setIsAddingPortfolio] = useState(false);
  const [newPort, setNewPort] = useState({
    title: '',
    clientOrPersonality: '',
    category: 'featured-collaborations' as PortfolioItem['category'],
    description: '',
    image: '/assets/aistudio/IMG_2327_e383a340.JPG',
    workPerformed: 'Studio Cinematography, Wardrobe Direction, PR Syndication',
    projectDate: 'November 2025',
    isPublished: true,
    featured: false,
  });

  // State for creating new video project
  const [isAddingVideo, setIsAddingVideo] = useState(false);
  const [newVideo, setNewVideo] = useState({
    title: '',
    clientOrPersonality: '',
    category: 'Commercial' as VideoProject['category'],
    videoType: 'youtube' as VideoProject['videoType'],
    videoUrl: '',
    thumbnailUrl: '/assets/aistudio/IMG_7811_a83a5d4f.PNG',
    description: '',
    duration: '01:30',
    isPublished: true,
    featured: false,
  });

  // State for creating new collaboration
  const [isAddingCollab, setIsAddingCollab] = useState(false);
  const [newCollab, setNewCollab] = useState({
    name: '',
    roleOrCategory: 'Public Personality',
    photograph: '/assets/aistudio/IMG_4676_2ce60a84.JPG',
    projectDetails: '',
    servicesDelivered: 'Social Strategy, Video Editing, Digital PR',
    isPublished: true,
  });

  // State for creating new testimonial
  const [isAddingTestimonial, setIsAddingTestimonial] = useState(false);
  const [newTestimonial, setNewTestimonial] = useState({
    quote: '',
    author: '',
    role: '',
    organization: '',
    verified: true,
  });

  // Handle local image file upload into data URL
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'portfolio' | 'video' | 'collab') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        if (target === 'portfolio') setNewPort(prev => ({ ...prev, image: result }));
        if (target === 'video') setNewVideo(prev => ({ ...prev, thumbnailUrl: result }));
        if (target === 'collab') setNewCollab(prev => ({ ...prev, photograph: result }));
        showNotice('Photo file loaded and preview generated.');
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-2 sm:p-6 overflow-hidden">
      <div className="relative w-full max-w-7xl h-[94vh] bg-[#09090F] border border-[#8B5CF6]/30 rounded-3xl flex flex-col shadow-2xl overflow-hidden">
        {/* Top Bar */}
        <div className="px-6 py-4 bg-[#171329] border-b border-[#8B5CF6]/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BrandLogo size="sm" showWordmark={false} />
            <div>
              <h2 className="text-base sm:text-lg font-bold font-display text-white flex items-center gap-2">
                ECHO EDIT Control Center
                <span className="px-2.5 py-0.5 rounded-full bg-[#8B5CF6]/20 text-[#C5A3FF] text-[10px] font-mono uppercase font-semibold border border-[#8B5CF6]/30">
                  Admin Active
                </span>
              </h2>
              <p className="text-[11px] text-zinc-400 font-mono">
                Midnight Luxury Content Suite & Real-Time Deployment
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => {
                if (window.confirm('Reset all portfolio, pricing and settings back to original verified data?')) {
                  resetAllToDefaults();
                  showNotice('Reset to verified agency defaults successfully.');
                }
              }}
              title="Reset to initial data"
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-[#09090F] hover:bg-[#201a38] text-zinc-300 hover:text-white text-xs font-mono border border-white/10 flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-zinc-400" />
              <span className="hidden sm:inline">Reset Defaults</span>
            </button>

            <button
              onClick={() => {
                logoutAdmin();
                onClose();
              }}
              className="px-3 py-1.5 rounded-xl bg-red-500/15 hover:bg-red-500/25 text-red-300 text-xs font-mono border border-red-500/20 cursor-pointer"
            >
              Sign Out
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-[#09090F] hover:bg-[#8B5CF6] text-zinc-400 hover:text-white transition-colors cursor-pointer border border-white/10"
              aria-label="Close Dashboard"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Global Banner Notification */}
        {notification && (
          <div className="bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white px-6 py-2 text-xs font-mono font-medium flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4" />
              {notification}
            </span>
            <button onClick={() => setNotification(null)} className="cursor-pointer">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Left Sidebar Navigation */}
          <div className="w-full md:w-64 bg-[#171329]/80 border-b md:border-b-0 md:border-r border-[#8B5CF6]/20 p-3 flex md:flex-col gap-1.5 overflow-x-auto md:overflow-y-auto shrink-0">
            {[
              { id: 'portfolio', label: 'Portfolio Projects', icon: ImageIcon, count: portfolioItems.length },
              { id: 'videos', label: 'Video Showcase', icon: Video, count: videoProjects.length },
              { id: 'collaborations', label: 'Collaborations', icon: Users, count: collaborations.length },
              { id: 'services', label: 'Agency Services', icon: Briefcase, count: services.length },
              { id: 'pricing', label: 'Package Pricing', icon: DollarSign, count: pricingPackages.length },
              { id: 'testimonials', label: 'Testimonials', icon: MessageSquareQuote, count: testimonials.length },
              { id: 'inquiries', label: 'Client Inquiries', icon: Inbox, count: inquiries.length },
              { id: 'settings', label: 'Agency Settings', icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white shadow-md font-semibold'
                      : 'text-zinc-300 hover:bg-[#201a38] hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </div>
                  {tab.count !== undefined && (
                    <span
                      className={`text-[11px] font-mono px-2 py-0.5 rounded-md ${
                        isActive ? 'bg-white/20 text-white' : 'bg-[#09090F] text-[#C5A3FF]'
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Content Panel */}
          <div className="flex-1 bg-[#09090F] p-4 sm:p-6 overflow-y-auto">
            {/* TAB: PORTFOLIO */}
            {activeTab === 'portfolio' && (
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                  <div>
                    <h3 className="text-xl font-bold font-display text-white">
                      Portfolio Projects & Photographs
                    </h3>
                    <p className="text-xs text-zinc-400">
                      Manage authentic photographs, categories, titles, and client project deliverables.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsAddingPortfolio(!isAddingPortfolio)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] hover:brightness-110 text-white text-xs font-semibold flex items-center gap-2 cursor-pointer transition-all shadow-md self-start sm:self-auto"
                  >
                    <Plus className="w-4 h-4" />
                    {isAddingPortfolio ? 'Cancel' : 'Add Project'}
                  </button>
                </div>

                {/* Add Portfolio Form */}
                {isAddingPortfolio && (
                  <div className="p-5 rounded-2xl bg-[#171329] border border-[#8B5CF6]/40 mb-6 space-y-4">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
                      Create New Portfolio Project
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                      <div>
                        <label className="block text-zinc-400 font-mono mb-1">Project Title *</label>
                        <input
                          type="text"
                          value={newPort.title}
                          onChange={(e) => setNewPort({ ...newPort, title: e.target.value })}
                          placeholder="e.g. Cinematic Stage Lighting & Visuals"
                          className="w-full px-3 py-2 rounded-lg bg-[#09090F] border border-[#8B5CF6]/20 text-white focus:outline-none focus:border-[#8B5CF6]"
                        />
                      </div>
                      <div>
                        <label className="block text-zinc-400 font-mono mb-1">Client / Personality *</label>
                        <input
                          type="text"
                          value={newPort.clientOrPersonality}
                          onChange={(e) => setNewPort({ ...newPort, clientOrPersonality: e.target.value })}
                          placeholder="e.g. Media Icon / Political Leader"
                          className="w-full px-3 py-2 rounded-lg bg-[#09090F] border border-[#8B5CF6]/20 text-white focus:outline-none focus:border-[#8B5CF6]"
                        />
                      </div>
                      <div>
                        <label className="block text-zinc-400 font-mono mb-1">Category</label>
                        <select
                          value={newPort.category}
                          onChange={(e) => setNewPort({ ...newPort, category: e.target.value as any })}
                          className="w-full px-3 py-2 rounded-lg bg-[#09090F] border border-[#8B5CF6]/20 text-white focus:outline-none focus:border-[#8B5CF6]"
                        >
                          <option value="featured-collaborations">Featured Collaborations</option>
                          <option value="political-personalities">Political & Public Personalities</option>
                          <option value="event-coverage">Event Coverage</option>
                          <option value="photography">Photography</option>
                          <option value="promotional-videos">Promotional Videos</option>
                          <option value="behind-the-scenes">Behind the Scenes</option>
                          <option value="creative-projects">Creative Projects</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="block text-zinc-400 font-mono mb-1">
                          Photograph (Select Preset Asset or Upload)
                        </label>
                        <div className="flex gap-2">
                          <select
                            value={newPort.image}
                            onChange={(e) => setNewPort({ ...newPort, image: e.target.value })}
                            className="flex-1 px-3 py-2 rounded-lg bg-[#09090F] border border-[#8B5CF6]/20 text-white focus:outline-none focus:border-[#8B5CF6]"
                          >
                            <option value="/assets/aistudio/3499a465-6e75-4402-842f-22d7d666d9af_22df19a8.jpg">Public Leadership (Studio Chiaroscuro Portrait)</option>
                            <option value="/assets/aistudio/WhatsApp_Image_2026-11-11_at_23.25.32_31f589a2.jpeg">Outdoor Narrative (Fashion & Cinema)</option>
                            <option value="/assets/aistudio/IMG_2327_e383a340.JPG">IMG_2327 (Stage Confetti Climax)</option>
                            <option value="/assets/aistudio/IMG_7811_a83a5d4f.PNG">IMG_7811 (Artist on Chair Spotlight)</option>
                            <option value="/assets/aistudio/IMG_7808_af10a1e5.PNG">IMG_7808 (Daylight Fashion Blue Dress)</option>
                            <option value="/assets/aistudio/IMG_4676_2ce60a84.JPG">IMG_4676 (Daylight Outdoor Fashion)</option>
                            <option value="/assets/aistudio/IMG_5288_794c3911.JPG">IMG_5288 (Cinema Rigs & Gear)</option>
                            <option value="/assets/aistudio/IMG_4896_63d61a60.JPG">IMG_4896 (Script Reading BTS)</option>
                            <option value="/assets/aistudio/IMG_4898_81817a64.JPG">IMG_4898 (Warm Studio Portrait)</option>
                          </select>
                          <label className="px-3 py-2 rounded-lg bg-[#1f1938] hover:bg-[#2c2250] text-[#C5A3FF] font-mono text-[11px] cursor-pointer flex items-center gap-1 border border-white/10">
                            Upload
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleFileUpload(e, 'portfolio')}
                            />
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="block text-zinc-400 font-mono mb-1">Work Performed (comma separated)</label>
                        <input
                          type="text"
                          value={newPort.workPerformed}
                          onChange={(e) => setNewPort({ ...newPort, workPerformed: e.target.value })}
                          placeholder="Studio Lighting, Press Retouching, PR Syndication"
                          className="w-full px-3 py-2 rounded-lg bg-[#09090F] border border-[#8B5CF6]/20 text-white focus:outline-none focus:border-[#8B5CF6]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-zinc-400 font-mono mb-1 text-xs">Project Description</label>
                      <textarea
                        rows={2}
                        value={newPort.description}
                        onChange={(e) => setNewPort({ ...newPort, description: e.target.value })}
                        placeholder="Comprehensive description of creative storytelling and PR impact delivered..."
                        className="w-full px-3 py-2 rounded-lg bg-[#09090F] border border-[#8B5CF6]/20 text-white text-xs focus:outline-none focus:border-[#8B5CF6] resize-none"
                      />
                    </div>

                    {/* Image Preview */}
                    <div className="flex items-center gap-4 pt-1">
                      <div className="w-16 h-16 rounded-xl overflow-hidden border border-[#8B5CF6]/30 bg-black">
                        <SafeImage src={newPort.image} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                      <button
                        onClick={() => {
                          if (!newPort.title || !newPort.clientOrPersonality) {
                            alert('Please provide project title and client name.');
                            return;
                          }
                          addPortfolioItem({
                            title: newPort.title,
                            clientOrPersonality: newPort.clientOrPersonality,
                            category: newPort.category,
                            description: newPort.description || 'High-impact creative production by ECHO EDIT.',
                            image: newPort.image,
                            workPerformed: newPort.workPerformed.split(',').map(s => s.trim()).filter(Boolean),
                            projectDate: newPort.projectDate,
                            isPublished: true,
                            featured: newPort.featured,
                          });
                          setIsAddingPortfolio(false);
                          showNotice('New portfolio project published successfully.');
                        }}
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] hover:brightness-110 text-white font-medium text-xs cursor-pointer shadow-lg"
                      >
                        Publish to Live Website
                      </button>
                    </div>
                  </div>
                )}

                {/* Portfolio List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {portfolioItems.map((item) => (
                    <div
                      key={item.id}
                      className={`p-4 rounded-2xl border transition-all ${
                        item.isPublished
                          ? 'bg-[#171329] border-[#8B5CF6]/20'
                          : 'bg-[#100e1c] border-white/5 opacity-60'
                      }`}
                    >
                      <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-3 bg-black">
                        <SafeImage src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-black/80 text-[10px] font-mono uppercase text-[#C5A3FF] border border-[#8B5CF6]/30">
                          {item.category.replace(/-/g, ' ')}
                        </span>
                        {!item.isPublished && (
                          <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-yellow-500/80 text-[10px] font-mono text-black font-bold">
                            Unpublished
                          </span>
                        )}
                      </div>

                      <h4 className="text-sm font-bold text-white font-display line-clamp-1 mb-1">
                        {item.title}
                      </h4>
                      <p className="text-xs text-[#D6B77A] font-mono mb-2">
                        {item.clientOrPersonality}
                      </p>
                      <p className="text-[11px] text-zinc-400 line-clamp-2 mb-3">
                        {item.description}
                      </p>

                      <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
                        <button
                          onClick={() => {
                            togglePublishPortfolio(item.id);
                            showNotice(item.isPublished ? 'Project hidden.' : 'Project live.');
                          }}
                          className="flex items-center gap-1.5 text-zinc-400 hover:text-white cursor-pointer"
                        >
                          {item.isPublished ? <Eye className="w-4 h-4 text-emerald-400" /> : <EyeOff className="w-4 h-4 text-zinc-500" />}
                          <span className="text-[11px]">{item.isPublished ? 'Live' : 'Hidden'}</span>
                        </button>

                        <button
                          onClick={() => {
                            if (window.confirm(`Delete project "${item.title}"?`)) {
                              deletePortfolioItem(item.id);
                              showNotice('Project removed.');
                            }
                          }}
                          className="p-1.5 text-zinc-500 hover:text-red-400 transition-colors cursor-pointer"
                          title="Delete Project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: VIDEOS */}
            {activeTab === 'videos' && (
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                  <div>
                    <h3 className="text-xl font-bold font-display text-white">
                      Video Showcase & Showreel Projects
                    </h3>
                    <p className="text-xs text-zinc-400">
                      Add and manage YouTube URLs, Instagram Reel links, or direct MP4 video URLs.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsAddingVideo(!isAddingVideo)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] hover:brightness-110 text-white text-xs font-semibold flex items-center gap-2 cursor-pointer transition-all shadow-md self-start sm:self-auto"
                  >
                    <Plus className="w-4 h-4" />
                    {isAddingVideo ? 'Cancel' : 'Add Video Project'}
                  </button>
                </div>

                {isAddingVideo && (
                  <div className="p-5 rounded-2xl bg-[#171329] border border-[#8B5CF6]/40 mb-6 space-y-4 text-xs">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Video className="w-4 h-4 text-[#8B5CF6]" />
                      Add Video Project / Link
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-zinc-400 font-mono mb-1">Video Title *</label>
                        <input
                          type="text"
                          value={newVideo.title}
                          onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                          placeholder="e.g. Political Rally Climax Broadcast"
                          className="w-full px-3 py-2 rounded-lg bg-[#09090F] border border-[#8B5CF6]/20 text-white focus:outline-none focus:border-[#8B5CF6]"
                        />
                      </div>
                      <div>
                        <label className="block text-zinc-400 font-mono mb-1">Client / Division</label>
                        <input
                          type="text"
                          value={newVideo.clientOrPersonality}
                          onChange={(e) => setNewVideo({ ...newVideo, clientOrPersonality: e.target.value })}
                          placeholder="e.g. Campaign Unit / Public Personality"
                          className="w-full px-3 py-2 rounded-lg bg-[#09090F] border border-[#8B5CF6]/20 text-white focus:outline-none focus:border-[#8B5CF6]"
                        />
                      </div>
                      <div>
                        <label className="block text-zinc-400 font-mono mb-1">Video Platform Type</label>
                        <select
                          value={newVideo.videoType}
                          onChange={(e) => setNewVideo({ ...newVideo, videoType: e.target.value as any })}
                          className="w-full px-3 py-2 rounded-lg bg-[#09090F] border border-[#8B5CF6]/20 text-white focus:outline-none focus:border-[#8B5CF6]"
                        >
                          <option value="youtube">YouTube (URL / Shorts)</option>
                          <option value="instagram">Instagram Reel</option>
                          <option value="mp4">Direct MP4 Video Link</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-zinc-400 font-mono mb-1">
                          Video URL (YouTube link / Instagram Reel / MP4) *
                        </label>
                        <input
                          type="url"
                          value={newVideo.videoUrl}
                          onChange={(e) => setNewVideo({ ...newVideo, videoUrl: e.target.value })}
                          placeholder="https://youtube.com/watch?v=... or https://..."
                          className="w-full px-3 py-2 rounded-lg bg-[#09090F] border border-[#8B5CF6]/20 text-white focus:outline-none focus:border-[#8B5CF6]"
                        />
                      </div>
                      <div>
                        <label className="block text-zinc-400 font-mono mb-1">
                          Poster Thumbnail
                        </label>
                        <select
                          value={newVideo.thumbnailUrl}
                          onChange={(e) => setNewVideo({ ...newVideo, thumbnailUrl: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#09090F] border border-[#8B5CF6]/20 text-white focus:outline-none focus:border-[#8B5CF6]"
                        >
                          <option value="/assets/aistudio/IMG_2327_e383a340.JPG">IMG_2327 (Stage Confetti)</option>
                          <option value="/assets/aistudio/IMG_7811_a83a5d4f.PNG">IMG_7811 (Arena Spotlight)</option>
                          <option value="/assets/aistudio/IMG_7808_af10a1e5.PNG">IMG_7808 (Fashion Editorial)</option>
                          <option value="/assets/aistudio/IMG_4896_63d61a60.JPG">IMG_4896 (Script Reading BTS)</option>
                          <option value="/assets/aistudio/IMG_5288_794c3911.JPG">IMG_5288 (Cinema Rigs)</option>
                        </select>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        if (!newVideo.title || !newVideo.videoUrl) {
                          alert('Please provide title and video URL.');
                          return;
                        }
                        addVideoProject({
                          title: newVideo.title,
                          clientOrPersonality: newVideo.clientOrPersonality || 'ECHO EDIT Production',
                          category: newVideo.category,
                          videoType: newVideo.videoType,
                          videoUrl: newVideo.videoUrl,
                          thumbnailUrl: newVideo.thumbnailUrl,
                          description: newVideo.description || 'Cinema quality video project produced by ECHO EDIT.',
                          duration: newVideo.duration,
                          isPublished: true,
                          featured: true,
                        });
                        setIsAddingVideo(false);
                        showNotice('Video project added to showreel.');
                      }}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] hover:brightness-110 text-white font-medium cursor-pointer shadow-lg"
                    >
                      Save Video to Showreel
                    </button>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {videoProjects.map((vid) => (
                    <div key={vid.id} className="p-4 rounded-2xl bg-[#171329] border border-[#8B5CF6]/20 flex flex-col justify-between">
                      <div>
                        <div className="relative aspect-video rounded-xl overflow-hidden mb-3 bg-black">
                          <SafeImage src={vid.thumbnailUrl} alt={vid.title} className="w-full h-full object-cover" />
                          <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-black/80 text-[10px] font-mono text-[#C5A3FF] border border-[#8B5CF6]/30">
                            {vid.videoType.toUpperCase()}
                          </span>
                          <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-zinc-300">
                            {vid.duration}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-white font-display line-clamp-1">{vid.title}</h4>
                        <p className="text-xs text-[#D6B77A] font-mono mt-0.5">{vid.clientOrPersonality}</p>
                        <p className="text-[11px] text-zinc-400 line-clamp-2 mt-1">{vid.description}</p>
                      </div>

                      <div className="flex items-center justify-between pt-3 mt-3 border-t border-white/10 text-xs">
                        <button
                          onClick={() => togglePublishVideo(vid.id)}
                          className="flex items-center gap-1.5 text-zinc-400 hover:text-white cursor-pointer"
                        >
                          {vid.isPublished ? <Eye className="w-4 h-4 text-emerald-400" /> : <EyeOff className="w-4 h-4 text-zinc-500" />}
                          <span className="text-[11px]">{vid.isPublished ? 'Visible' : 'Hidden'}</span>
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete video "${vid.title}"?`)) {
                              deleteVideoProject(vid.id);
                              showNotice('Video removed.');
                            }
                          }}
                          className="p-1.5 text-zinc-500 hover:text-red-400 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: COLLABORATIONS */}
            {activeTab === 'collaborations' && (
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                  <div>
                    <h3 className="text-xl font-bold font-display text-white">
                      People We Have Worked With
                    </h3>
                    <p className="text-xs text-zinc-400">
                      Manage verified collaboration cards, client names, photographs, and delivered PR services.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsAddingCollab(!isAddingCollab)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] hover:brightness-110 text-white text-xs font-semibold flex items-center gap-2 cursor-pointer transition-all shadow-md self-start sm:self-auto"
                  >
                    <Plus className="w-4 h-4" />
                    {isAddingCollab ? 'Cancel' : 'Add Collaboration Card'}
                  </button>
                </div>

                {isAddingCollab && (
                  <div className="p-5 rounded-2xl bg-[#171329] border border-[#8B5CF6]/40 mb-6 space-y-4 text-xs">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#8B5CF6]" />
                      Add Collaboration Card
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-zinc-400 font-mono mb-1">Personality / Client Name *</label>
                        <input
                          type="text"
                          value={newCollab.name}
                          onChange={(e) => setNewCollab({ ...newCollab, name: e.target.value })}
                          placeholder="e.g. Public Figure & Digital Creator"
                          className="w-full px-3 py-2 rounded-lg bg-[#09090F] border border-[#8B5CF6]/20 text-white focus:outline-none focus:border-[#8B5CF6]"
                        />
                      </div>
                      <div>
                        <label className="block text-zinc-400 font-mono mb-1">Role / Industry</label>
                        <input
                          type="text"
                          value={newCollab.roleOrCategory}
                          onChange={(e) => setNewCollab({ ...newCollab, roleOrCategory: e.target.value })}
                          placeholder="e.g. Cinema Lead / Political Representative"
                          className="w-full px-3 py-2 rounded-lg bg-[#09090F] border border-[#8B5CF6]/20 text-white focus:outline-none focus:border-[#8B5CF6]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-zinc-400 font-mono mb-1">Photograph (Original Asset)</label>
                        <select
                          value={newCollab.photograph}
                          onChange={(e) => setNewCollab({ ...newCollab, photograph: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#09090F] border border-[#8B5CF6]/20 text-white focus:outline-none focus:border-[#8B5CF6]"
                        >
                          <option value="/assets/aistudio/IMG_2327_e383a340.JPG">IMG_2327 (Stage Climax)</option>
                          <option value="/assets/aistudio/IMG_7808_af10a1e5.PNG">IMG_7808 (Daylight Fashion)</option>
                          <option value="/assets/aistudio/IMG_7811_a83a5d4f.PNG">IMG_7811 (Artist on Spotlight)</option>
                          <option value="/assets/aistudio/IMG_4676_2ce60a84.JPG">IMG_4676 (Daylight Outdoor Fashion)</option>
                          <option value="/assets/aistudio/IMG_4896_63d61a60.JPG">IMG_4896 (Script Reading BTS)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-zinc-400 font-mono mb-1">Services Delivered (comma separated)</label>
                        <input
                          type="text"
                          value={newCollab.servicesDelivered}
                          onChange={(e) => setNewCollab({ ...newCollab, servicesDelivered: e.target.value })}
                          placeholder="Digital PR, Portrait Shoot, Instagram Management"
                          className="w-full px-3 py-2 rounded-lg bg-[#09090F] border border-[#8B5CF6]/20 text-white focus:outline-none focus:border-[#8B5CF6]"
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        if (!newCollab.name) {
                          alert('Please enter a name.');
                          return;
                        }
                        addCollaboration({
                          name: newCollab.name,
                          roleOrCategory: newCollab.roleOrCategory,
                          photograph: newCollab.photograph,
                          projectDetails: newCollab.projectDetails || 'Verified high-level agency collaboration.',
                          servicesDelivered: newCollab.servicesDelivered.split(',').map(s => s.trim()).filter(Boolean),
                          isPublished: true,
                        });
                        setIsAddingCollab(false);
                        showNotice('Collaboration card created.');
                      }}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] hover:brightness-110 text-white font-medium cursor-pointer shadow-lg"
                    >
                      Save Collaboration
                    </button>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {collaborations.map((collab) => (
                    <div key={collab.id} className="p-4 rounded-2xl bg-[#171329] border border-[#8B5CF6]/20 flex flex-col justify-between">
                      <div>
                        <div className="aspect-square rounded-xl overflow-hidden mb-3 bg-black">
                          <SafeImage src={collab.photograph} alt={collab.name} className="w-full h-full object-cover" />
                        </div>
                        <h4 className="text-sm font-bold text-white font-display">{collab.name}</h4>
                        <p className="text-xs text-[#C5A3FF] font-mono mt-0.5">{collab.roleOrCategory}</p>
                        <p className="text-[11px] text-zinc-400 mt-2 line-clamp-2">{collab.projectDetails}</p>
                      </div>

                      <div className="pt-3 mt-3 border-t border-white/10 flex justify-end">
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete collaboration "${collab.name}"?`)) {
                              deleteCollaboration(collab.id);
                              showNotice('Collaboration removed.');
                            }
                          }}
                          className="p-1.5 text-zinc-500 hover:text-red-400 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: SERVICES (NO PHOTOS - PROCEDURAL 3D SCULPTURES) */}
            {activeTab === 'services' && (
              <div>
                <div className="mb-6">
                  <h3 className="text-xl font-bold font-display text-white">
                    Agency Services Directory (8 Interactive 3D Disciplines)
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Services are rendered with procedural Three.js 3D sculptures. Update service scopes, deliverables, and targets below.
                  </p>
                </div>

                <div className="space-y-4">
                  {services.map((srv) => (
                    <div key={srv.id} className="p-5 rounded-2xl bg-[#171329] border border-[#8B5CF6]/20 flex flex-col lg:flex-row gap-4 items-start">
                      <div className="w-16 h-16 rounded-xl bg-[#09090F] border border-[#8B5CF6]/30 flex flex-col items-center justify-center shrink-0">
                        <span className="font-mono text-xs text-[#D6B77A] font-bold">{srv.number}</span>
                        <span className="text-[9px] font-mono text-[#C5A3FF] text-center px-1 truncate w-full">
                          {srv.sculptureShape.replace(/-/g, ' ')}
                        </span>
                      </div>

                      <div className="flex-1 w-full space-y-2">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white font-display">{srv.title}</h4>
                          <span className="px-2 py-0.5 rounded-full bg-[#8B5CF6]/15 text-[#C5A3FF] text-[10px] font-mono">
                            3D Procedural Card
                          </span>
                        </div>
                        <textarea
                          rows={2}
                          value={srv.fullDesc}
                          onChange={(e) => updateService(srv.id, { fullDesc: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#09090F] border border-[#8B5CF6]/20 text-zinc-300 text-xs focus:outline-none focus:border-[#8B5CF6]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: PRICING */}
            {activeTab === 'pricing' && (
              <div>
                <div className="mb-6">
                  <h3 className="text-xl font-bold font-display text-white">
                    Package Pricing & Retainers
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Modify package prices, taglines, and target scope. Changes reflect immediately on the live pricing section.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pricingPackages.map((pkg) => (
                    <div key={pkg.id} className="p-5 rounded-2xl bg-[#171329] border border-[#8B5CF6]/20 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-base font-bold text-white font-display">{pkg.title}</h4>
                        {pkg.badge && (
                          <span className="px-2.5 py-0.5 rounded-full bg-[#8B5CF6]/20 text-[#C5A3FF] text-[10px] font-mono border border-[#8B5CF6]/30">
                            {pkg.badge}
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div>
                          <label className="block text-zinc-400 font-mono mb-1">Price Range</label>
                          <input
                            type="text"
                            value={pkg.priceRange}
                            onChange={(e) => {
                              updatePricingPackage(pkg.id, { priceRange: e.target.value });
                              showNotice('Price range updated.');
                            }}
                            className="w-full px-3 py-2 rounded-lg bg-[#09090F] border border-[#8B5CF6]/20 text-white font-mono focus:outline-none focus:border-[#8B5CF6]"
                          />
                        </div>
                        <div>
                          <label className="block text-zinc-400 font-mono mb-1">Billing Period</label>
                          <input
                            type="text"
                            value={pkg.period}
                            onChange={(e) => updatePricingPackage(pkg.id, { period: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-[#09090F] border border-[#8B5CF6]/20 text-white font-mono focus:outline-none focus:border-[#8B5CF6]"
                          />
                        </div>
                      </div>

                      <div className="text-xs">
                        <label className="block text-zinc-400 font-mono mb-1">Tagline</label>
                        <input
                          type="text"
                          value={pkg.tagline}
                          onChange={(e) => updatePricingPackage(pkg.id, { tagline: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#09090F] border border-[#8B5CF6]/20 text-zinc-300 focus:outline-none focus:border-[#8B5CF6]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: TESTIMONIALS */}
            {activeTab === 'testimonials' && (
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                  <div>
                    <h3 className="text-xl font-bold font-display text-white">
                      Client & Leader Testimonials
                    </h3>
                    <p className="text-xs text-zinc-400">
                      Manage verified endorsements from public personalities, campaign directors, and tour producers.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsAddingTestimonial(!isAddingTestimonial)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] hover:brightness-110 text-white text-xs font-semibold flex items-center gap-2 cursor-pointer transition-all shadow-md self-start sm:self-auto"
                  >
                    <Plus className="w-4 h-4" />
                    {isAddingTestimonial ? 'Cancel' : 'Add Testimonial'}
                  </button>
                </div>

                {isAddingTestimonial && (
                  <div className="p-5 rounded-2xl bg-[#171329] border border-[#8B5CF6]/40 mb-6 space-y-4 text-xs">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Star className="w-4 h-4 text-[#D6B77A]" />
                      New Testimonial
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-zinc-400 font-mono mb-1">Author Name / Title *</label>
                        <input
                          type="text"
                          value={newTestimonial.author}
                          onChange={(e) => setNewTestimonial({ ...newTestimonial, author: e.target.value })}
                          placeholder="e.g. Senior Political Campaign Director"
                          className="w-full px-3 py-2 rounded-lg bg-[#09090F] border border-[#8B5CF6]/20 text-white focus:outline-none focus:border-[#8B5CF6]"
                        />
                      </div>
                      <div>
                        <label className="block text-zinc-400 font-mono mb-1">Role</label>
                        <input
                          type="text"
                          value={newTestimonial.role}
                          onChange={(e) => setNewTestimonial({ ...newTestimonial, role: e.target.value })}
                          placeholder="e.g. State Campaign Committee"
                          className="w-full px-3 py-2 rounded-lg bg-[#09090F] border border-[#8B5CF6]/20 text-white focus:outline-none focus:border-[#8B5CF6]"
                        />
                      </div>
                      <div>
                        <label className="block text-zinc-400 font-mono mb-1">Organization</label>
                        <input
                          type="text"
                          value={newTestimonial.organization}
                          onChange={(e) => setNewTestimonial({ ...newTestimonial, organization: e.target.value })}
                          placeholder="e.g. Regional Leadership Unit"
                          className="w-full px-3 py-2 rounded-lg bg-[#09090F] border border-[#8B5CF6]/20 text-white focus:outline-none focus:border-[#8B5CF6]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-zinc-400 font-mono mb-1">Quote *</label>
                      <textarea
                        rows={3}
                        value={newTestimonial.quote}
                        onChange={(e) => setNewTestimonial({ ...newTestimonial, quote: e.target.value })}
                        placeholder="Endorsement quote highlighting media speed, cinematic quality, or strategic results..."
                        className="w-full px-3 py-2 rounded-lg bg-[#09090F] border border-[#8B5CF6]/20 text-white focus:outline-none focus:border-[#8B5CF6] resize-none"
                      />
                    </div>

                    <button
                      onClick={() => {
                        if (!newTestimonial.author || !newTestimonial.quote) {
                          alert('Please enter an author and quote.');
                          return;
                        }
                        addTestimonial(newTestimonial);
                        setIsAddingTestimonial(false);
                        showNotice('Testimonial published.');
                      }}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white font-medium cursor-pointer shadow-lg"
                    >
                      Publish Endorsement
                    </button>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {testimonials.map((test) => (
                    <div key={test.id} className="p-5 rounded-2xl bg-[#171329] border border-[#8B5CF6]/20 flex flex-col justify-between">
                      <div>
                        <p className="text-xs text-zinc-300 italic mb-4 leading-relaxed">
                          "{test.quote}"
                        </p>
                        <h4 className="text-sm font-bold text-white font-display">{test.author}</h4>
                        <p className="text-[11px] text-[#D6B77A] font-mono mt-0.5">{test.role} • {test.organization}</p>
                      </div>

                      <div className="pt-3 mt-3 border-t border-white/10 flex justify-end">
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete testimonial by ${test.author}?`)) {
                              deleteTestimonial(test.id);
                              showNotice('Testimonial removed.');
                            }
                          }}
                          className="p-1.5 text-zinc-500 hover:text-red-400 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: INQUIRIES */}
            {activeTab === 'inquiries' && (
              <div>
                <div className="mb-6">
                  <h3 className="text-xl font-bold font-display text-white">
                    Client Inquiries & Consultation Leads
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Incoming project requests, budget specifications, and strategy consultation requests.
                  </p>
                </div>

                {inquiries.length === 0 ? (
                  <div className="p-8 text-center rounded-2xl bg-[#171329] border border-white/10 text-zinc-400 text-xs font-mono">
                    No inquiries recorded yet.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {inquiries.map((inq) => (
                      <div key={inq.id} className="p-5 rounded-2xl bg-[#171329] border border-[#8B5CF6]/20 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-white text-sm">{inq.name}</span>
                            <span className="text-zinc-500 font-mono">•</span>
                            <span className="text-zinc-400">{inq.organization}</span>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-medium ${
                              inq.status === 'new' ? 'bg-[#8B5CF6]/20 text-[#C5A3FF] border border-[#8B5CF6]/30' : 'bg-emerald-500/20 text-emerald-400'
                            }`}>
                              {inq.status.toUpperCase()}
                            </span>
                          </div>
                          <div className="text-zinc-400 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px]">
                            <span>Phone: {inq.phone}</span>
                            <span>Email: {inq.email}</span>
                            <span>Service: {inq.service}</span>
                            <span className="text-[#D6B77A]">Budget: {inq.budget}</span>
                          </div>
                          <p className="text-zinc-300 text-xs mt-2 italic bg-[#09090F] p-3 rounded-xl border border-white/5">
                            "{inq.description}"
                          </p>
                          <span className="text-[10px] text-zinc-500 font-mono mt-1 block">
                            Received {inq.submittedAt}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                          <select
                            value={inq.status}
                            onChange={(e) => updateInquiryStatus(inq.id, e.target.value as any)}
                            className="px-2.5 py-1.5 rounded-lg bg-[#09090F] border border-[#8B5CF6]/20 text-zinc-300 text-xs"
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="proposal_sent">Proposal Sent</option>
                            <option value="archived">Archived</option>
                          </select>
                          <a
                            href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-lg bg-[#25D366] text-black font-semibold text-xs"
                          >
                            WhatsApp
                          </a>
                          <button
                            onClick={() => deleteInquiry(inq.id)}
                            className="p-1.5 text-zinc-500 hover:text-red-400 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB: SETTINGS */}
            {activeTab === 'settings' && (
              <div className="max-w-2xl space-y-4 text-xs">
                <div className="mb-6">
                  <h3 className="text-xl font-bold font-display text-white">
                    Agency Global Settings
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Control contact numbers, WhatsApp connectivity, email address, and legal disclaimers.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-400 font-mono mb-1">Agency Name</label>
                    <input
                      type="text"
                      value={agencySettings.agencyName}
                      onChange={(e) => updateSettings({ agencyName: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[#09090F] border border-[#8B5CF6]/20 text-white focus:outline-none focus:border-[#8B5CF6]"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 font-mono mb-1">Tagline</label>
                    <input
                      type="text"
                      value={agencySettings.tagline}
                      onChange={(e) => updateSettings({ tagline: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[#09090F] border border-[#8B5CF6]/20 text-white focus:outline-none focus:border-[#8B5CF6]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-400 font-mono mb-1">WhatsApp Phone (International No Symbols)</label>
                    <input
                      type="text"
                      value={agencySettings.whatsapp}
                      onChange={(e) => updateSettings({ whatsapp: e.target.value })}
                      placeholder="e.g. 918545975486"
                      className="w-full px-3 py-2 rounded-lg bg-[#09090F] border border-[#8B5CF6]/20 text-white focus:outline-none focus:border-[#8B5CF6]"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 font-mono mb-1">Display Phone Number</label>
                    <input
                      type="text"
                      value={agencySettings.phone}
                      onChange={(e) => updateSettings({ phone: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[#09090F] border border-[#8B5CF6]/20 text-white focus:outline-none focus:border-[#8B5CF6]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-400 font-mono mb-1">Contact Email</label>
                    <input
                      type="email"
                      value={agencySettings.email}
                      onChange={(e) => updateSettings({ email: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[#09090F] border border-[#8B5CF6]/20 text-white focus:outline-none focus:border-[#8B5CF6]"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 font-mono mb-1">Office Location</label>
                    <input
                      type="text"
                      value={agencySettings.officeLocation}
                      onChange={(e) => updateSettings({ officeLocation: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[#09090F] border border-[#8B5CF6]/20 text-white focus:outline-none focus:border-[#8B5CF6]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-400 font-mono mb-1">Instagram Handle</label>
                    <input
                      type="text"
                      value={agencySettings.instagramHandle}
                      onChange={(e) => updateSettings({ instagramHandle: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[#09090F] border border-[#8B5CF6]/20 text-white focus:outline-none focus:border-[#8B5CF6]"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 font-mono mb-1">Instagram Profile URL</label>
                    <input
                      type="url"
                      value={agencySettings.instagramUrl}
                      onChange={(e) => updateSettings({ instagramUrl: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[#09090F] border border-[#8B5CF6]/20 text-white focus:outline-none focus:border-[#8B5CF6]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-400 font-mono mb-1">Pricing & Statutory Disclaimer</label>
                  <textarea
                    rows={3}
                    value={agencySettings.disclaimer}
                    onChange={(e) => updateSettings({ disclaimer: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#09090F] border border-[#8B5CF6]/20 text-white text-xs focus:outline-none focus:border-[#8B5CF6] resize-none"
                  />
                </div>

                <button
                  onClick={() => showNotice('Agency settings saved.')}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] hover:brightness-110 text-white font-medium cursor-pointer shadow-lg"
                >
                  Save Global Settings
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
