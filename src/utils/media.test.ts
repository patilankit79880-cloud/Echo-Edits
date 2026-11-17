import test from 'node:test';
import assert from 'node:assert/strict';
import { FALLBACK_MEDIA_IMAGE, resolveMediaUrl } from './media';

test('normalizes /public/assets paths to production root /assets paths', () => {
  assert.equal(
    resolveMediaUrl('/public/assets/aistudio/IMG_2327_e383a340.JPG'),
    '/assets/aistudio/IMG_2327_e383a340.JPG'
  );
  assert.equal(
    resolveMediaUrl('public/assets/aistudio/IMG_7811_a83a5d4f.PNG'),
    '/assets/aistudio/IMG_7811_a83a5d4f.PNG'
  );
});

test('keeps valid /assets paths and normalizes bare relative assets paths', () => {
  assert.equal(
    resolveMediaUrl('/assets/aistudio/3499a465-6e75-4402-842f-22d7d666d9af_22df19a8.jpg'),
    '/assets/aistudio/3499a465-6e75-4402-842f-22d7d666d9af_22df19a8.jpg'
  );
  assert.equal(
    resolveMediaUrl('assets/aistudio/IMG_4896_63d61a60.JPG'),
    '/assets/aistudio/IMG_4896_63d61a60.JPG'
  );
});

test('preserves data URIs, blob URLs, and external URLs untouched', () => {
  const dataUri = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAB';
  assert.equal(resolveMediaUrl(dataUri), dataUri);
  assert.equal(
    resolveMediaUrl('https://cdn.example.com/photo.jpg'),
    'https://cdn.example.com/photo.jpg'
  );
});

test('returns fallback image for empty or nullish inputs', () => {
  assert.equal(resolveMediaUrl(''), FALLBACK_MEDIA_IMAGE);
  assert.equal(resolveMediaUrl('   '), FALLBACK_MEDIA_IMAGE);
  assert.equal(resolveMediaUrl(null), FALLBACK_MEDIA_IMAGE);
  assert.equal(resolveMediaUrl(undefined), FALLBACK_MEDIA_IMAGE);
});
