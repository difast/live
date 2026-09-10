import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { PageHeader } from '@/components/ui/PageHeader';
import { JsonLd } from '@/components/ui/JsonLd';
import { SOCIALS, YOUTUBE_BANNER, type Social } from '@/content/site';
import { buildMetadata } from '@/lib/seo';
import { hasPublicAsset } from '@/lib/assets';
import { breadcrumbSchema, graph, webPageSchema, type Crumb } from '@/lib/schema';
import styles from './Media.module.css';

const TITLE = 'Социальные сети Дмитрия Пятакова — YouTube, Telegram, Instagram';
const DESCRIPTION =
  'Официальные площадки Дмитрия Пятакова: YouTube, Telegram и Instagram. Предпринимательство, технологии, AI, стартапы и создание продуктов.';

const CRUMBS: Crumb[] = [
  { name: 'Главная', path: '/' },
  { name: 'Медиа', path: '/media' },
];

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: '/media',
});

function byKey(key: Social['key']): Social {
  const social = SOCIALS.find((s) => s.key === key);
  if (!social) throw new Error(`Не найдена площадка: ${key}`);
  return social;
}

export default function MediaPage() {
  const youtube = byKey('youtube');
  const secondary = [byKey('instagram'), byKey('telegram')];
  const pending = SOCIALS.filter((s) => s.url === null);
  const hasBanner = hasPublicAsset(YOUTUBE_BANNER.path);

  return (
    <>
      <JsonLd
        json={graph([
          webPageSchema({ path: '/media', name: TITLE, description: DESCRIPTION }),
          breadcrumbSchema(CRUMBS),
        ])}
      />

      <Breadcrumbs crumbs={CRUMBS} />

      <PageHeader
        eyebrow="Медиа"
        title="Социальные сети"
        intro="Мои основные площадки, где я рассказываю о предпринимательстве, технологиях, AI, стартапах и создании продуктов."
      />

      {/* YouTube — главный блок страницы */}
      <section className="section section--tight" aria-labelledby="youtube-heading">
        <div className="container">
          <h2 id="youtube-heading" className="visually-hidden">
            YouTube
          </h2>
          <p className="label" style={{ marginBottom: 'var(--space-s)' }}>
            Главная площадка
          </p>

          <a
            className={styles.feature}
            href={youtube.url ?? undefined}
            target="_blank"
            rel="noopener noreferrer me"
          >
            <div className={styles.bannerFrame}>
              {hasBanner ? (
                <Image
                  src={YOUTUBE_BANNER.path}
                  alt="Баннер YouTube-канала Дмитрия Пятакова"
                  fill
                  className={styles.banner}
                  sizes="(min-width: 84rem) 76rem, 100vw"
                  priority
                />
              ) : (
                // TODO(баннер): положить файл в public/images/dmitry-pyatakov/youtube-banner.jpg —
                // он подхватится автоматически, менять код не нужно.
                <div className={styles.bannerPlaceholder}>
                  <span className={styles.bannerPlaceholderTitle}>Дмитрий Пятаков</span>
                  <span className={styles.bannerPlaceholderNote}>
                    Баннер канала · youtube-banner.jpg
                  </span>
                </div>
              )}
            </div>

            <div className={styles.featureBody}>
              <span>
                <span className="label">{youtube.name}</span>
                <span className={styles.featureName}>{youtube.handleTitle}</span>
              </span>
              <span className={styles.featureText}>{youtube.description}</span>
              <span className={styles.go}>Перейти на YouTube ↗</span>
            </div>
          </a>
        </div>
      </section>

      {/* Instagram и Telegram */}
      <section className="section section--tight" aria-labelledby="secondary-heading">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="label">Ещё площадки</p>
              <h2 id="secondary-heading">Instagram и Telegram</h2>
            </div>
          </div>

          <ul className={styles.list}>
            {secondary.map((social) => (
              <li key={social.key} className={styles.item}>
                <a
                  className={styles.row}
                  href={social.url ?? undefined}
                  target="_blank"
                  rel="noopener noreferrer me"
                >
                  <span className={styles.platform}>{social.name}</span>
                  <span>
                    <span className={styles.handle}>{social.handleTitle}</span>
                    <span className={styles.description}>{social.description}</span>
                  </span>
                  <span className={styles.go}>Перейти в {social.name} ↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Площадки без подтверждённой ссылки: строка готова, ссылки нет. */}
      {pending.length > 0 && (
        <section className="section section--tight band" aria-labelledby="pending-heading">
          <div className="container">
            <div className="section-head">
              <div>
                <p className="label">Скоро</p>
                <h2 id="pending-heading">Готовятся</h2>
              </div>
            </div>

            <ul className={styles.list}>
              {pending.map((social) => (
                <li key={social.key} className={styles.item}>
                  <div className={`${styles.row} ${styles.pending}`}>
                    <span className={styles.platform}>{social.name}</span>
                    <span>
                      <span className={styles.handle}>{social.handleTitle}</span>
                      <span className={styles.description}>{social.description}</span>
                    </span>
                    <span className={styles.pendingNote}>Ссылка будет добавлена</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="section section--tight" aria-labelledby="media-next-heading">
        <div className="container">
          <h2 id="media-next-heading" className="visually-hidden">
            Дальше
          </h2>
          <div className={styles.next}>
            <Link href="/about" className="action">
              О Дмитрии Пятакове
            </Link>
            <Link href="/projects" className="action action--quiet">
              Проекты
            </Link>
            <Link href="/contact" className="action action--quiet">
              Контакты
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
