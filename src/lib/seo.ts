import type { Metadata } from 'next';
import { absoluteUrl, OG_IMAGE, PERSON, SITE_URL } from '@/content/site';

export const SITE_NAME = 'Дмитрий Пятаков';

type BuildMetadataInput = {
  title: string;
  description: string;
  /** Внутренний путь страницы: '/', '/about', '/projects/oneonone'. */
  path: string;
  /** Своя OG-картинка. По умолчанию — общая для сайта. */
  image?: { path: string; width?: number; height?: number; alt?: string };
  type?: 'website' | 'profile' | 'article';
  /** Служебные страницы, которые не должны индексироваться. */
  noIndex?: boolean;
};

/**
 * Единая точка сборки метаданных: title, description, canonical, Open Graph,
 * Twitter/X card. Ни одна страница не задаёт эти поля вручную.
 */
export function buildMetadata({
  title,
  description,
  path,
  image,
  type = 'website',
  noIndex = false,
}: BuildMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const img = image ?? { path: OG_IMAGE.path, width: OG_IMAGE.width, height: OG_IMAGE.height };
  const imageUrl = absoluteUrl(img.path);
  const alt = img.alt ?? title;

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
        },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: 'ru_RU',
      type,
      images: [
        {
          url: imageUrl,
          width: img.width ?? OG_IMAGE.width,
          height: img.height ?? OG_IMAGE.height,
          alt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

/** Метаданные, общие для всего сайта. Задаются один раз в корневом layout. */
export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  authors: [{ name: PERSON.name, url: SITE_URL }],
  creator: PERSON.name,
  publisher: PERSON.name,
  formatDetection: { email: false, address: false, telephone: false },
};
