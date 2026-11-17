import React, { useEffect, useState } from 'react';
import { FALLBACK_MEDIA_IMAGE, resolveMediaUrl } from '../../utils/media';

interface SafeImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src?: string | null;
  fallbackSrc?: string;
}

/**
 * Production-safe image component that:
 * 1. Normalizes any legacy `/public/assets/...` paths to `/assets/...`
 * 2. Provides smooth opacity reveal on load without hiding SSR/instant paint
 * 3. Falls back cleanly to a verified local asset or Midnight Luxury placeholder if loading fails
 */
export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt = '',
  className = '',
  fallbackSrc = FALLBACK_MEDIA_IMAGE,
  loading = 'eager',
  decoding = 'async',
  onError,
  ...rest
}) => {
  const resolvedPrimary = resolveMediaUrl(src);
  const resolvedFallback = resolveMediaUrl(fallbackSrc);

  const [currentSrc, setCurrentSrc] = useState<string>(resolvedPrimary);
  const [hasFailedCompletely, setHasFailedCompletely] = useState<boolean>(false);

  useEffect(() => {
    setCurrentSrc(resolveMediaUrl(src));
    setHasFailedCompletely(false);
  }, [src]);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (currentSrc !== resolvedFallback) {
      setCurrentSrc(resolvedFallback);
    } else {
      setHasFailedCompletely(true);
    }
    if (onError) {
      onError(e);
    }
  };

  if (hasFailedCompletely) {
    return (
      <div
        role="img"
        aria-label={alt || 'ECHO EDIT visual asset'}
        className={`flex items-center justify-center bg-gradient-to-br from-[#171329] via-[#09090F] to-[#1f1938] text-[#C5A3FF]/70 font-mono text-[10px] uppercase tracking-widest p-4 text-center ${className}`}
      >
        ECHO EDIT ARCHIVE
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      loading={loading}
      decoding={decoding}
      onError={handleError}
      className={className}
      {...rest}
    />
  );
};
