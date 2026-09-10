/**
 * Хронология предпринимательского пути.
 *
 * TODO(timeline): наполнить реальными датами и событиями. Ничего не выдумывать —
 * каждая запись должна быть подтверждённым фактом.
 * Пустой массив — раздел на /about не рендерится вообще.
 *
 * Пример записи:
 * { year: '2024', title: 'OneOnOne', description: 'Запуск платформы.', href: '/projects/oneonone' }
 */
export type TimelineEntry = {
  /** Год или период: '2024', '2022 — н.в.' */
  year: string;
  title: string;
  description: string;
  /** Необязательная ссылка на страницу проекта на этом сайте. */
  href?: string;
};

export const TIMELINE: TimelineEntry[] = [];
