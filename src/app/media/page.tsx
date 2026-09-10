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
                  sizes="(min-width: 76rem) 70rem, 100vw"
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
              <div>
                <span className={styles.featurePlatform}>{youtube.name}</span>
                <p className={styles.featureName}>{youtube.handleTitle}</p>
                <p className={styles.featureText}>{youtube.description}</p>
              </div>
              <span className={styles.cta}>Перейти на YouTube</span>
            </div>
          </a>
        </div>
      </section>

      {/* Instagram и Telegram */}
      <section className="section section--tight" aria-labelledby="secondary-heading">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Ещё площадки</p>
            <h2 id="secondary-heading">Instagram и Telegram</h2>
          </div>
          <ul className={styles.grid}>
            {secondary.map((social) => (
              <li key={social.key}>
                <a
                  className={styles.card}
                  href={social.url ?? undefined}
                  target="_blank"
                  rel="noopener noreferrer me"
                >
                  <span className={styles.cardHead}>
                    <span className={styles.cardPlatform}>{social.name}</span>
                    <span className={styles.cardName}>{social.handleTitle}</span>
                    <span className={styles.cardText}>{social.description}</span>
                  </span>
                  <span className={styles.cta}>Перейти в {social.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Площадки без подтверждённой ссылки: карточка готова, ссылки нет. */}
      {pending.length > 0 && (
        <section className="section section--tight" aria-labelledby="pending-heading">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow">Скоро</p>
              <h2 id="pending-heading">Готовятся</h2>
            </div>
            <ul className={styles.grid}>
              {pending.map((social) => (
                <li key={social.key}>
                  <div className={`${styles.card} ${styles.cardPending}`}>
                    <div className={styles.cardHead}>
                      <span className={styles.cardPlatform}>{social.name}</span>
                      <p className={styles.cardName}>{social.handleTitle}</p>
                      <p className={styles.cardText}>{social.description}</p>
                    </div>
                    <p className={styles.pendingNote}>Ссылка будет добавлена</p>
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
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-m)' }}>
            <Link href="/about" className="arrow-link">
              О Дмитрии Пятакове
            </Link>
            <Link href="/projects" className="arrow-link">
              Проекты
            </Link>
            <Link href="/contact" className="arrow-link">
              Контакты
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
