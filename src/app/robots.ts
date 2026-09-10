import type { MetadataRoute } from 'next';
import { absoluteUrl, SITE_URL } from '@/content/site';

/**
 * robots.txt. Ничего лишнего не закрывается: CSS, JS и изображения должны быть
 * доступны роботам, иначе страдает рендеринг и оценка мобильной вёрстки.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Служебные пути Next.js, не несущие содержания.
        disallow: ['/api/'],
      },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
    host: SITE_URL,
  };
}
