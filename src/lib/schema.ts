import {
  absoluteUrl,
  CONFIRMED_SOCIALS,
  OG_IMAGE,
  PERSON,
  SITE_URL,
} from '@/content/site';
import { PROJECTS, type Project } from '@/content/projects';
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
  page: (path: string) => `${absoluteUrl(path)}#webpage`,
} as const;

type JsonLdObject = Record<string, unknown>;

/** Сущность Person — ядро entity-графа. */
export function personSchema(): JsonLdObject {
  return {
    '@type': 'Person',
    '@id': ID.person,
    name: PERSON.name,
    alternateName: PERSON.nameLatin,
    url: SITE_URL,
    description: PERSON.summary,
    jobTitle: PERSON.role,
    email: `mailto:${PERSON.email}`,
    image: {
      '@type': 'ImageObject',
      url: absoluteUrl(PERSON.portrait),
      caption: PERSON.portraitAlt,
    },
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

/** Собирает узлы в один @graph — один блок JSON-LD на страницу. */
export function graph(nodes: JsonLdObject[]): string {
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes });
}
