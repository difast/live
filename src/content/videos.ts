/**
 * Видео Дмитрия Пятакова.
 *
 * Раздел намеренно без встроенного плеера: карточка — это обложка, описание
 * и ссылки на YouTube и Rutube. Так страница остаётся быстрой и не тянет
 * сторонние скрипты и куки.
 *
 * Пока массив пуст, страница /videos помечена noindex и не попадает в
 * sitemap — пустой раздел в индексе только вредит. Первая запись включает
 * раздел целиком: он появляется в навигации, в sitemap и получает разметку.
 *
 * Пример записи:
 * {
 *   slug: 'kak-ustroen-mevratek',
 *   title: 'Как устроен Mevratek',
 *   description: 'Разбор архитектуры платформы.',
 *   datePublished: '2026-09-01',
 *   thumbnail: '/images/videos/kak-ustroen-mevratek.jpg',
 *   youtubeUrl: 'https://youtu.be/...',
 *   rutubeUrl: 'https://rutube.ru/video/...',
 * }
 */

export type Video = {
  slug: string;
  title: string;
  description: string;
  /** ISO-дата публикации. */
  datePublished: string;
  /** Обложка в /public/images/videos/. Соотношение 16:9. */
  thumbnail: string;
  /** Хотя бы одна из ссылок обязательна. */
  youtubeUrl?: string;
  rutubeUrl?: string;
  /** Длительность в формате ISO 8601, например PT8M30S. Для Schema.org. */
  duration?: string;
};

export const VIDEOS: Video[] = [];

export function getVideo(slug: string): Video | undefined {
  return VIDEOS.find((v) => v.slug === slug);
}

/** Свежие сверху. */
export const VIDEOS_BY_DATE = [...VIDEOS].sort((a, b) =>
  b.datePublished.localeCompare(a.datePublished),
);
