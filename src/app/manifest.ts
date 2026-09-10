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
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  };
}
