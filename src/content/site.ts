/**
 * Единый источник правды о сайте и о персоне.
 * Все канонические URL, метаданные, JSON-LD, sitemap и llms.txt читают отсюда.
 *
 * TODO(домен): подставить реальный продакшн-домен — здесь либо в NEXT_PUBLIC_SITE_URL.
 * Это единственное место, где домен задаётся.
 */
const FALLBACK_SITE_URL = 'https://pyatakov.com';

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_SITE_URL
).replace(/\/+$/, '');

/** Абсолютный URL из внутреннего пути. Корень отдаётся со слэшем. */
export function absoluteUrl(path = '/'): string {
  return path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}

/**
 * Базовые пути изображений — без расширения.
 * Файл ищется по этим путям с любым обычным расширением (jpg, png, webp, avif).
 * См. resolveImage в src/lib/assets.ts.
 */
export const PORTRAIT_BASE = '/images/dmitry-pyatakov/portrait';
export const YOUTUBE_BANNER_BASE = '/images/dmitry-pyatakov/youtube-banner';

export const PERSON = {
  name: 'Дмитрий Пятаков',
  /** Латиница — только там, где это технически необходимо (alternateName, en-метаданные). */
  nameLatin: 'Dmitry Pyatakov',
  role: 'Предприниматель и создатель технологических компаний и продуктов',
  summary:
    'Дмитрий Пятаков — предприниматель и создатель технологических компаний и продуктов. Создаёт компании, продукты и системы на стыке технологий, бизнеса и AI.',
  email: 'ceo@oneononehq.com',
  /** Объявленный путь портрета. Реальный файл ищется по PORTRAIT_BASE. */
  portrait: `${PORTRAIT_BASE}.jpg`,
  portraitAlt: 'Дмитрий Пятаков — предприниматель и создатель технологических компаний',
} as const;

export type SocialKey = 'youtube' | 'instagram' | 'telegram' | 'vk' | 'rutube';

export type Social = {
  key: SocialKey;
  /** Название площадки. */
  name: string;
  /** Как называется профиль на площадке. */
  handleTitle: string;
  /** Короткое описание, что там публикуется. */
  description: string;
  /**
   * Подтверждённый URL профиля.
   * null — ссылка ещё не подтверждена: карточка рендерится, но без ссылки.
   * Такие профили НЕ попадают в sameAs, чтобы не ломать entity-граф.
   */
  url: string | null;
  /** Показывать в компактных блоках (шапка, футер, главная). */
  primary: boolean;
};

export const SOCIALS: Social[] = [
  {
    key: 'youtube',
    name: 'YouTube',
    handleTitle: 'Дмитрий Пятаков',
    description: 'Создаёт технологические компании и продукты с AI.',
    url: 'https://youtube.com/@pyatakov.official',
    primary: true,
  },
  {
    key: 'telegram',
    name: 'Telegram',
    handleTitle: 'Дмитрий Пятаков',
    description:
      'Предпринимательство, технологии, стартапы, AI и путь создания бизнеса.',
    url: 'https://t.me/pyatakov_official',
    primary: true,
  },
  {
    key: 'instagram',
    name: 'Instagram',
    handleTitle: 'Дмитрий Пятаков | AI и стартапы',
    description: 'Короткие материалы о предпринимательстве, технологиях и продуктах.',
    url: 'https://instagram.com/pyatakov.official',
    primary: true,
  },
  {
    key: 'vk',
    name: 'VK',
    handleTitle: 'Дмитрий Пятаков',
    description: 'Официальная страница Дмитрия Пятакова.',
    // TODO(vk): добавить подтверждённый URL. Не подставлять предполагаемый адрес.
    url: null,
    primary: false,
  },
  {
    key: 'rutube',
    name: 'Rutube',
    handleTitle: 'Дмитрий Пятаков',
    description: 'Видео и материалы Дмитрия Пятакова.',
    // TODO(rutube): добавить подтверждённый URL. Не подставлять предполагаемый адрес.
    url: null,
    primary: false,
  },
];

/** Только подтверждённые профили — для sameAs и для ссылок в интерфейсе. */
export const CONFIRMED_SOCIALS = SOCIALS.filter(
  (s): s is Social & { url: string } => typeof s.url === 'string',
);

export const NAV = [
  { href: '/about', label: 'Биография' },
  { href: '/projects', label: 'Проекты' },
  { href: '/media', label: 'Медиа' },
  { href: '/contact', label: 'Контакты' },
] as const;

export const OG_IMAGE = {
  path: '/images/dmitry-pyatakov/og-default.jpg',
  width: 1200,
  height: 630,
} as const;

/** Пропорции баннера канала. Сам файл ищется по YOUTUBE_BANNER_BASE. */
export const YOUTUBE_BANNER = {
  width: 2560,
  height: 1440,
} as const;
