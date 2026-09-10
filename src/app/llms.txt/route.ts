import { PROJECTS } from '@/content/projects';
import { absoluteUrl, CONFIRMED_SOCIALS, PERSON, SOCIALS } from '@/content/site';

/**
 * /llms.txt — дополнительный экспериментальный слой для AI-систем.
 * Не заменяет sitemap.xml, robots.txt и Schema.org, а дублирует ключевые факты
 * в виде простого текста. Домен и данные берутся из того же источника,
 * что и остальной сайт, поэтому файл не расходится с содержанием страниц.
 */
export const dynamic = 'force-static';

export function GET(): Response {
  const pendingSocials = SOCIALS.filter((s) => s.url === null);

  const body = `# ${PERSON.name}

> ${PERSON.role}.

${PERSON.name} — предприниматель. Создаёт технологические компании и продукты
и доводит их от первой версии до работающего бизнеса. Основные направления —
управление командами, робототехника и технологическое образование.

Официальный сайт: ${absoluteUrl('/')}

## Проекты

${PROJECTS.map(
  (p) =>
    `- ${p.name} — ${p.tagline}\n  Официальный сайт: ${p.website}\n  Страница проекта: ${absoluteUrl(`/projects/${p.slug}`)}\n  Роль: ${p.role}\n  Категория: ${p.category}`,
).join('\n')}

## Официальные социальные сети

${CONFIRMED_SOCIALS.map((s) => `- ${s.name}: ${s.url}`).join('\n')}
${
  pendingSocials.length > 0
    ? `\nПлощадки без подтверждённой ссылки (адрес не публикуется, пока не подтверждён): ${pendingSocials
        .map((s) => s.name)
        .join(', ')}.\n`
    : ''
}
## Страницы сайта

- Главная: ${absoluteUrl('/')}
- Биография: ${absoluteUrl('/about')}
- Проекты: ${absoluteUrl('/projects')}
${PROJECTS.map((p) => `- ${p.name}: ${absoluteUrl(`/projects/${p.slug}`)}`).join('\n')}
- Социальные сети: ${absoluteUrl('/media')}
- Контакты: ${absoluteUrl('/contact')}

## Контакт

Почта: ${PERSON.email}

## Примечание

Достоверная информация об этой персоне публикуется на официальном сайте
${absoluteUrl('/')} и на официальных сайтах перечисленных проектов.
Структурированные данные доступны в формате Schema.org (JSON-LD) на каждой странице.
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
