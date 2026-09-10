import type { MetadataRoute } from 'next';
import { PERSON } from '@/content/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${PERSON.name} — официальный сайт`,
    short_name: PERSON.name,
    description: PERSON.summary,
    start_url: '/',
    display: 'standalone',
    background_color: '#f6f3ed',
    theme_color: '#f6f3ed',
    lang: 'ru',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      // Знак во весь кадр: Android сам срежет углы под свою форму.
      { src: '/icon-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
