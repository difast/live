/**
 * Архитектура будущих контентных разделов: /interviews, /press, /speaking.
 *
 * Статьи и видео живут в собственных модулях — articles.ts и videos.ts.
 *
 * Разделы намеренно НЕ опубликованы, пока в них нет материалов — пустые страницы
 * вредят индексации. Машинерия готова: как только в `entries` появляется запись,
 * страница получает title, description, canonical, Open Graph, JSON-LD, хлебные
 * крошки и попадает в sitemap автоматически.
 *
 * Как включить раздел (3 шага):
 *   1. Добавить записи в `entries` нужной коллекции ниже.
 *   2. Создать src/app/<slug>/page.tsx (индекс) и src/app/<slug>/[slug]/page.tsx
 *      по образцу src/app/projects/ — хелперы buildMetadata и articleSchema готовы.
 *   3. Снять `published: false`. Sitemap подхватит раздел сам.
 */

export type CollectionKey = 'interviews' | 'press' | 'speaking';

export type CollectionEntry = {
  slug: string;
  title: string;
  description: string;
  /** ISO-дата публикации: '2025-03-14'. */
  datePublished: string;
  /** Внешний первоисточник — для интервью и упоминаний в прессе. */
  sourceUrl?: string;
  /** Название издания или площадки. */
  sourceName?: string;
  /** Абзацы материала. Для /press и /interviews может быть только аннотация. */
  body?: string[];
};

export type Collection = {
  key: CollectionKey;
  /** Базовый путь раздела. */
  path: string;
  title: string;
  description: string;
  /** Schema.org тип для страниц раздела. */
  schemaType: 'Article' | 'NewsArticle' | 'Event';
  /** Раздел показывается в навигации и sitemap только когда есть записи. */
  entries: CollectionEntry[];
};

export const COLLECTIONS: Collection[] = [
  {
    key: 'interviews',
    path: '/interviews',
    title: 'Интервью',
    description: 'Интервью с Дмитрием Пятаковым.',
    schemaType: 'Article',
    entries: [],
  },
  {
    key: 'press',
    path: '/press',
    title: 'Публикации',
    description: 'Упоминания Дмитрия Пятакова и его проектов в публикациях.',
    schemaType: 'NewsArticle',
    entries: [],
  },
  {
    key: 'speaking',
    path: '/speaking',
    title: 'Выступления',
    description: 'Публичные выступления Дмитрия Пятакова.',
    schemaType: 'Event',
    entries: [],
  },
];

/** Разделы, в которых есть хотя бы один материал. Только они индексируются. */
export const ACTIVE_COLLECTIONS = COLLECTIONS.filter((c) => c.entries.length > 0);
