export const FALLBACK_MEDIA_IMAGE = '/assets/aistudio/IMG_2327_e383a340.JPG';

/**
 * Normalizes asset URLs for both Vite dev and production (`dist/`) builds.
 * Vite serves files under `public/` at `/` (e.g., `/assets/aistudio/...`),
 * whereas legacy paths saved with a `/public/` prefix fail in production builds.
 */
export function resolveMediaUrl(src?: string | null): string {
  if (!src || typeof src !== 'string') {
    return FALLBACK_MEDIA_IMAGE;
  }

  const trimmed = src.trim();
  if (!trimmed) {
    return FALLBACK_MEDIA_IMAGE;
  }

  // Keep inline data URIs, blob URLs, and external HTTP(S) URLs untouched
  if (
    trimmed.startsWith('data:') ||
    trimmed.startsWith('blob:') ||
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://')
  ) {
    return trimmed;
  }

  // Strip accidental `/public/` or `public/` prefix so Vite serves from `dist/` root
  let normalized = trimmed;
  if (normalized.startsWith('/public/')) {
    normalized = normalized.slice('/public'.length);
  } else if (normalized.startsWith('public/')) {
    normalized = '/' + normalized.slice('public/'.length);
  } else if (!normalized.startsWith('/')) {
    normalized = '/' + normalized;
  }

  return normalized;
}
