import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/content/site';
import { PROJECTS } from '@/content/projects';
import { ACTIVE_COLLECTIONS } from '@/content/collections';

/**
 * Sitemap собирается из данных проекта, а не поддерживается вручную.
 * Новый проект или материал попадает в него автоматически.
 * Технические и неиндексируемые страницы (404) сюда не входят.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl('/'), lastModified, changeFrequency: 'monthly', priority: 1 },
    { url: absoluteUrl('/about'), lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: absoluteUrl('/projects'), lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: absoluteUrl('/media'), lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: absoluteUrl('/contact'), lastModified, changeFrequency: 'yearly', priority: 0.6 },
  ];

  const projectPages: MetadataRoute.Sitemap = PROJECTS.map((project) => ({
    url: absoluteUrl(`/projects/${project.slug}`),
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // Разделы контента появляются в sitemap только когда в них есть материалы.
  const collectionPages: MetadataRoute.Sitemap = ACTIVE_COLLECTIONS.flatMap((collection) => [
    {
      url: absoluteUrl(collection.path),
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    ...collection.entries.map((entry) => ({
      url: absoluteUrl(`${collection.path}/${entry.slug}`),
      lastModified: new Date(entry.datePublished),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
  ]);

  return [...staticPages, ...projectPages, ...collectionPages];
}
