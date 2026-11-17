import React, { useEffect } from 'react';
import { X, Play, ExternalLink, Film } from 'lucide-react';
import { VideoProject } from '../../types';
import { resolveMediaUrl } from '../../utils/media';

interface VideoPlayerModalProps {
  video: VideoProject | null;
  onClose: () => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({ video, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!video) return null;

  // Extract YouTube ID if applicable
  const getYouTubeEmbedUrl = (url: string) => {
    try {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      if (match && match[2].length === 11) {
        return `https://www.youtube.com/embed/${match[2]}?autoplay=1&rel=0`;
      }
    } catch (e) {
      console.error(e);
    }
    return url;
  };

  const isYouTube = video.videoType === 'youtube' || video.videoUrl.includes('youtube') || video.videoUrl.includes('youtu.be');
  const isInstagram = video.videoType === 'instagram' || video.videoUrl.includes('instagram.com');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4">
      {/* Close button */}
      <button
        onClick={onClose}
        className="fixed top-5 right-5 z-50 p-2.5 rounded-full bg-[#171329] text-zinc-300 hover:text-white hover:bg-[#8B5CF6] border border-[#8B5CF6]/30 transition-colors cursor-pointer"
        aria-label="Close Player"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="w-full max-w-4xl bg-[#171329] border border-[#8B5CF6]/30 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        {/* Video Canvas Container */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center">
          {isYouTube ? (
            <iframe
              src={getYouTubeEmbedUrl(video.videoUrl)}
              title={video.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : isInstagram ? (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <p className="text-zinc-300 text-sm mb-4">Instagram Reel Embed</p>
              <a
                href={video.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white font-medium text-sm flex items-center gap-2 hover:opacity-90"
              >
                <ExternalLink className="w-4 h-4" />
                Open Reel on Instagram
              </a>
            </div>
          ) : (
            <video
              src={video.videoUrl}
              controls
              autoPlay
              playsInline
              poster={resolveMediaUrl(video.thumbnailUrl)}
              className="w-full h-full object-contain"
            >
              Your browser does not support HTML5 video playback.
            </video>
          )}
        </div>

        {/* Video Information Header */}
        <div className="p-6 bg-[#09090F] flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-[#8B5CF6]/20 text-[#C5A3FF] text-xs font-mono font-medium uppercase border border-[#8B5CF6]/30">
                {video.category}
              </span>
              <span className="text-xs text-[#D6B77A] font-mono">
                {video.clientOrPersonality}
              </span>
            </div>
            <h3 className="text-lg font-bold text-white font-display">
              {video.title}
            </h3>
            <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
              {video.description}
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <span className="text-xs font-mono text-zinc-500 bg-[#171329] px-3 py-1.5 rounded-lg border border-white/10">
              Format: {video.videoType.toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
