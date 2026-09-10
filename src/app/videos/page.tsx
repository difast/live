import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { PageHeader } from '@/components/ui/PageHeader';
import { JsonLd } from '@/components/ui/JsonLd';
import { VIDEOS_BY_DATE } from '@/content/videos';
import { CONFIRMED_SOCIALS, absoluteUrl } from '@/content/site';
import { buildMetadata } from '@/lib/seo';
import { formatDate } from '@/lib/format';
import {
  breadcrumbSchema,
  graph,
  itemListSchema,
  videoSchema,
  webPageSchema,
  type Crumb,
} from '@/lib/schema';
import styles from './Videos.module.css';

const TITLE = 'Видео Дмитрия Пятакова';
const DESCRIPTION =
  'Видео Дмитрия Пятакова о предпринимательстве, технологиях, стартапах и создании продуктов.';

const CRUMBS: Crumb[] = [
  { name: 'Главная', path: '/' },
  { name: 'Видео', path: '/videos' },
];

const hasVideos = VIDEOS_BY_DATE.length > 0;

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: '/videos',
  // Пока роликов нет, раздел закрыт от индексации: пустая страница в выдаче
  // работает как soft-404. Первая запись открывает её автоматически.
  noIndex: !hasVideos,
});

export default function VideosPage() {
  const youtube = CONFIRMED_SOCIALS.find((s) => s.key === 'youtube');
  const rutube = CONFIRMED_SOCIALS.find((s) => s.key === 'rutube');

  return (
    <>
      <JsonLd
        json={graph([
          webPageSchema({ path: '/videos', name: TITLE, description: DESCRIPTION }),
          breadcrumbSchema(CRUMBS),
          ...(hasVideos
            ? [
                itemListSchema({
                  path: '/videos',
                  name: 'Видео Дмитрия Пятакова',
                  items: VIDEOS_BY_DATE.map((v) => ({
                    url: absoluteUrl(`/videos/${v.slug}`),
                    name: v.title,
                  })),
                }),
                ...VIDEOS_BY_DATE.map(videoSchema),
              ]
            : []),
        ])}
      />

      <Breadcrumbs crumbs={CRUMBS} />

      <PageHeader
        eyebrow="Видео"
        title="Видео"
        intro="О предпринимательстве, технологиях, стартапах и создании продуктов."
      />

      <section className="section" aria-label="Список видео">
        <div className="container">
          {hasVideos ? (
            <ul className={styles.grid}>
              {VIDEOS_BY_DATE.map((video) => (
                <li key={video.slug}>
                  <article>
                    <div className={styles.cover}>
                      <Image
                        src={video.thumbnail}
                        alt={`Обложка видео «${video.title}»`}
                        fill
                        className={styles.coverImage}
                        sizes="(min-width: 76rem) 24rem, (min-width: 48rem) 45vw, 100vw"
                      />
                    </div>

                    <time className={styles.date} dateTime={video.datePublished}>
                      {formatDate(video.datePublished)}
                    </time>
                    <h2 className={styles.title}>{video.title}</h2>
                    <p className={styles.description}>{video.description}</p>

                    <div className={styles.links}>
                      {video.youtubeUrl && (
                        <a
                          className="action action--external"
                          href={video.youtubeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          YouTube
                        </a>
                      )}
                      {video.rutubeUrl && (
                        <a
                          className="action action--quiet action--external"
                          href={video.rutubeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Rutube
                        </a>
                      )}
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          ) : (
            <div className={styles.empty}>
              <p className={styles.emptyText}>
                Раздел готовится. Пока видео выходят на каналах — там же появятся
                и все новые.
              </p>
              <div className={styles.emptyLinks}>
                {youtube && (
                  <a
                    className="action action--external"
                    href={youtube.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    YouTube
                  </a>
                )}
                {rutube && (
                  <a
                    className="action action--quiet action--external"
                    href={rutube.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Rutube
                  </a>
                )}
                <Link href="/media" className="action action--quiet">
                  Все площадки
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
