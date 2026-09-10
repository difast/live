import {
  absoluteUrl,
  CONFIRMED_SOCIALS,
  OG_IMAGE,
  PERSON,
  PORTRAIT_BASE,
  SITE_URL,
} from '@/content/site';
import { resolveImage } from '@/lib/assets';
import { PROJECTS, type Project } from '@/content/projects';
import type { Article } from '@/content/articles';
import type { Video } from '@/content/videos';
import { SITE_NAME } from '@/lib/seo';

/**
 * JSON-LD для сайта.
 *
 * Принцип: в разметку попадают только достоверные данные. Никаких наград,
 * должностей, дат, образования, локаций и цифр, которых нет в контенте сайта.
 *
 * Граф строится вокруг устойчивых @id, чтобы поисковые системы и LLM видели
 * одну сущность «Дмитрий Пятаков», связанную с сайтом, проектами и профилями.
 */

export const ID = {
  person: `${SITE_URL}/#person`,
  website: `${SITE_URL}/#website`,
  project: (slug: string) => `${SITE_URL}/projects/${slug}#project`,
  article: (slug: string) => `${SITE_URL}/articles/${slug}#article`,
  video: (slug: string) => `${SITE_URL}/videos/${slug}#video`,
  page: (path: string) => `${absoluteUrl(path)}#webpage`,
} as const;

type JsonLdObject = Record<string, unknown>;

/** Сущность Person — ядро entity-графа. */
export function personSchema(): JsonLdObject {
  // Фотография попадает в разметку только когда файл действительно выложен:
  // объявлять поисковым системам изображение, которого нет, вредно.
  const portrait = resolveImage(PORTRAIT_BASE);

  return {
    '@type': 'Person',
    '@id': ID.person,
    name: PERSON.name,
    alternateName: PERSON.nameLatin,
    url: SITE_URL,
    description: PERSON.summary,
    jobTitle: PERSON.role,
    email: `mailto:${PERSON.email}`,
    ...(portrait && {
      image: {
        '@type': 'ImageObject',
        url: absoluteUrl(portrait),
        caption: PERSON.portraitAlt,
      },
    }),
    // Только подтверждённые профили. Неподтверждённые в sameAs не попадают.
    sameAs: CONFIRMED_SOCIALS.map((s) => s.url),
    // Связь персоны с проектами: Дмитрий Пятаков → проекты → сайты проектов.
    founder: PROJECTS.map((p) => ({ '@id': ID.project(p.slug) })),
    mainEntityOfPage: { '@id': ID.page('/about') },
  };
}

/** Сущность WebSite. */
export function websiteSchema(): JsonLdObject {
  return {
    '@type': 'WebSite',
    '@id': ID.website,
    url: SITE_URL,
    name: SITE_NAME,
    description: PERSON.summary,
    inLanguage: 'ru-RU',
    publisher: { '@id': ID.person },
    copyrightHolder: { '@id': ID.person },
    about: { '@id': ID.person },
  };
}

/** Сущность проекта. Тип выбирается по данным проекта. */
export function projectSchema(project: Project): JsonLdObject {
  const type = project.additionalSchemaType
    ? [project.schemaType, project.additionalSchemaType]
    : project.schemaType;

  const schema: JsonLdObject = {
    '@type': type,
    '@id': ID.project(project.slug),
    name: project.name,
    description: project.description,
    url: project.website,
    // Обратная связь: проект → страница проекта на этом сайте.
    subjectOf: { '@id': ID.page(`/projects/${project.slug}`) },
    founder: { '@id': ID.person },
  };

  if (project.applicationCategory) {
    schema.applicationCategory = project.applicationCategory;
    schema.operatingSystem = 'Web';
  }

  // Награды объявляются только там, где есть подтверждённый факт.
  if (project.achievement) {
    schema.award = project.achievement.full;
  }

  // Юридическое лицо и дата основания — сильные сигналы для entity-графа.
  if (project.legalName) {
    schema.legalName = project.legalName;
  }

  if (project.foundingDate) {
    schema.foundingDate = project.foundingDate;
  }

  return schema;
}

/** WebPage — для каждой индексируемой страницы. */
export function webPageSchema(input: {
  path: string;
  name: string;
  description: string;
}): JsonLdObject {
  return {
    '@type': 'WebPage',
    '@id': ID.page(input.path),
    url: absoluteUrl(input.path),
    name: input.name,
    description: input.description,
    inLanguage: 'ru-RU',
    isPartOf: { '@id': ID.website },
    about: { '@id': ID.person },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: absoluteUrl(OG_IMAGE.path),
    },
  };
}

export type Crumb = { name: string; path: string };

/** BreadcrumbList — та же цепочка, что показана визуально. */
export function breadcrumbSchema(crumbs: Crumb[]): JsonLdObject {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${absoluteUrl(crumbs[crumbs.length - 1].path)}#breadcrumb`,
    itemListElement: crumbs.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

/** Список проектов для страницы /projects. */
export function projectListSchema(): JsonLdObject {
  return {
    '@type': 'ItemList',
    '@id': `${absoluteUrl('/projects')}#list`,
    name: 'Проекты Дмитрия Пятакова',
    itemListOrder: 'https://schema.org/ItemListUnordered',
    numberOfItems: PROJECTS.length,
    itemListElement: PROJECTS.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: absoluteUrl(`/projects/${p.slug}`),
      name: p.name,
    })),
  };
}

/** Статья: автор и издатель — одна и та же персона. */
export function articleSchema(article: Article): JsonLdObject {
  const url = absoluteUrl(`/articles/${article.slug}`);

  return {
    '@type': 'Article',
    '@id': ID.article(article.slug),
    headline: article.title,
    description: article.description,
    url,
    datePublished: article.datePublished,
    dateModified: article.dateModified ?? article.datePublished,
    inLanguage: 'ru-RU',
    author: { '@id': ID.person },
    publisher: { '@id': ID.person },
    isPartOf: { '@id': ID.website },
    mainEntityOfPage: { '@id': ID.page(`/articles/${article.slug}`) },
  };
}

/**
 * Видео. Плеер на сайте не встраивается, поэтому ссылка на ролик уходит
 * в url — источником остаётся площадка.
 */
export function videoSchema(video: Video): JsonLdObject {
  const watchUrl = video.youtubeUrl ?? video.rutubeUrl;

  return {
    '@type': 'VideoObject',
    '@id': ID.video(video.slug),
    name: video.title,
    description: video.description,
    thumbnailUrl: absoluteUrl(video.thumbnail),
    uploadDate: video.datePublished,
    inLanguage: 'ru-RU',
    ...(watchUrl && { contentUrl: watchUrl, url: watchUrl }),
    ...(video.duration && { duration: video.duration }),
    author: { '@id': ID.person },
    publisher: { '@id': ID.person },
  };
}

/** Список материалов раздела. */
export function itemListSchema(input: {
  path: string;
  name: string;
  items: { url: string; name: string }[];
}): JsonLdObject {
  return {
    '@type': 'ItemList',
    '@id': `${absoluteUrl(input.path)}#list`,
    name: input.name,
    itemListOrder: 'https://schema.org/ItemListOrderDescending',
    numberOfItems: input.items.length,
    itemListElement: input.items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: item.url,
      name: item.name,
    })),
  };
}

/** Собирает узлы в один @graph — один блок JSON-LD на страницу. */
export function graph(nodes: JsonLdObject[]): string {
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes });
}
