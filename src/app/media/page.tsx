import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { PageHeader } from '@/components/ui/PageHeader';
import { JsonLd } from '@/components/ui/JsonLd';
import {
  CONFIRMED_SOCIALS,
  SOCIALS,
  YOUTUBE_BANNER_BASE,
  type Social,
} from '@/content/site';
import { buildMetadata } from '@/lib/seo';
import { resolveImage } from '@/lib/assets';
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

/** «Telegram, Instagram и Rutube» — заголовок собирается из самого списка. */
function joinNames(names: string[]): string {
  if (names.length < 2) return names.join('');
  return `${names.slice(0, -1).join(', ')} и ${names[names.length - 1]}`;
}

export default function MediaPage() {
  const youtube = byKey('youtube');
  // Остальные подтверждённые площадки, кроме YouTube: список ведут данные,
  // поэтому новая площадка появляется здесь без правок вёрстки.
  const secondary = CONFIRMED_SOCIALS.filter((s) => s.key !== 'youtube');
  const pending = SOCIALS.filter((s) => s.url === null);
  const banner = resolveImage(YOUTUBE_BANNER_BASE);

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
        intro="Официальные площадки, где Дмитрий Пятаков рассказывает о предпринимательстве, технологиях, AI, стартапах и создании продуктов."
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
              {banner ? (
                <Image
                  src={banner}
                  alt="Баннер YouTube-канала Дмитрия Пятакова"
                  fill
                  className={styles.banner}
                  sizes="(min-width: 84rem) 76rem, 100vw"
                  priority
                />
              ) : (
                // TODO(баннер): положить файл в public/images/dmitry-pyatakov/
                // с именем youtube-banner и любым обычным расширением
                // (jpg, png, webp, avif) — он подхватится автоматически.
                <div className={styles.bannerPlaceholder}>
                  <span className={styles.bannerPlaceholderTitle}>Дмитрий Пятаков</span>
                  <span className={styles.bannerPlaceholderNote}>
                    Баннер канала
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
              <h2 id="secondary-heading">{joinNames(secondary.map((s) => s.name))}</h2>
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
