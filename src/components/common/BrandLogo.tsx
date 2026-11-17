import React, { useId } from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showWordmark?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ size = 'md', showWordmark = true, className = '' }) => {
  const uid = useId().replace(/:/g, '');
  const frameGradId = `echoFrameGrad-${uid}`;
  const strokeGradId = `echoVioletStroke-${uid}`;
  const goldGradId = `echoGoldAccent-${uid}`;

  const iconSize = size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-11 h-11' : 'w-10 h-10';
  const textSize =
    size === 'sm'
      ? 'text-lg'
      : size === 'lg'
        ? 'text-2xl sm:text-3xl'
        : 'text-xl sm:text-[22px]';

  return (
    <div className={`inline-flex items-center gap-3 shrink-0 select-none ${className}`}>
      {/* Precision Architectural Monogram: Cinema Frame + Acoustic Echo Waves + Editorial Cut */}
      <div className={`relative ${iconSize} shrink-0 flex items-center justify-center`}>
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_4px_14px_rgba(139,92,246,0.35)] transition-transform duration-300 group-hover:scale-105"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={frameGradId} x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1F1938" />
              <stop offset="100%" stopColor="#0C0A16" />
            </linearGradient>
            <linearGradient id={strokeGradId} x1="6" y1="6" x2="42" y2="42" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#C5A3FF" />
              <stop offset="55%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#D6B77A" />
            </linearGradient>
            <linearGradient id={goldGradId} x1="12" y1="12" x2="36" y2="36" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFF2D6" />
              <stop offset="50%" stopColor="#D6B77A" />
              <stop offset="100%" stopColor="#A68240" />
            </linearGradient>
          </defs>

          {/* Outer Octagonal Luxury Studio Seal */}
          <path
            d="M14 3.5H34L44.5 14V34L34 44.5H14L3.5 34V14L14 3.5Z"
            fill={`url(#${frameGradId})`}
            stroke={`url(#${strokeGradId})`}
            strokeWidth="1.5"
          />

          {/* Inner Architectural Viewfinder Corner Brackets */}
          <path
            d="M11 15V11H15M33 11H37V15M37 33V37H33M15 37H11V33"
            stroke="#C5A3FF"
            strokeOpacity="0.4"
            strokeWidth="1.25"
            strokeLinecap="square"
          />

          {/* Sculptural Split 'E' Editorial Bars (Left) */}
          <path
            d="M14.5 16.5H25.5"
            stroke="#F5F1FF"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          <path
            d="M14.5 24H23"
            stroke={`url(#${goldGradId})`}
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          <path
            d="M14.5 31.5H25.5"
            stroke="#F5F1FF"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          <path
            d="M14.5 16.5V31.5"
            stroke="#F5F1FF"
            strokeWidth="2.6"
            strokeLinecap="round"
          />

          {/* Reverberating Acoustic Echo Arcs (Right) */}
          <path
            d="M28.5 18.5C31.2 21.5 31.2 26.5 28.5 29.5"
            stroke="#C5A3FF"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M32.8 15.2C36.8 20.1 36.8 27.9 32.8 32.8"
            stroke={`url(#${goldGradId})`}
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Editorial Two-Tone Wordmark */}
      {showWordmark && (
        <div className="flex items-baseline gap-2 whitespace-nowrap shrink-0 leading-none">
          <span className={`font-display font-extrabold ${textSize} tracking-[0.06em] text-white group-hover:text-[#F5F1FF] transition-colors`}>
            ECHO
          </span>
          <span className={`font-display font-bold ${textSize} tracking-[0.12em] text-gradient-gold`}>
            EDIT
          </span>
        </div>
      )}
    </div>
  );
};
