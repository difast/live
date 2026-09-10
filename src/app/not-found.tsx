import Link from 'next/link';
import type { Metadata } from 'next';
import { PROJECTS } from '@/content/projects';
import { buildMetadata } from '@/lib/seo';
import styles from './NotFound.module.css';

export const metadata: Metadata = buildMetadata({
  title: 'Страница не найдена — Дмитрий Пятаков',
  description: 'Запрошенная страница не существует.',
  path: '/404',
  noIndex: true,
});

/** Куда увести с несуществующего адреса. */
const DESTINATIONS = [
  { href: '/projects', title: 'Проекты', note: `${PROJECTS.length} действующих проекта` },
  { href: '/about', title: 'Биография', note: 'Путь и направления работы' },
  { href: '/media', title: 'Медиа', note: 'YouTube, Telegram, Instagram' },
];

export default function NotFound() {
  return (
    <section className={styles.page} aria-labelledby="notfound-title">
      <div className="container">
        <div className={styles.grid}>
          <div>
            <p className="label">Ошибка</p>
            <span className={`numeral ${styles.code}`} aria-hidden="true">
              404
            </span>
            <h1 className={styles.title} id="notfound-title">
              Страница не найдена
            </h1>
          </div>

          <div>
            <p className={styles.text}>
              Возможно, адрес изменился или содержит опечатку. Всё, что есть на
              сайте, собрано ниже.
            </p>
            <div className={styles.actions}>
              <Link href="/" className="action">
                На главную
              </Link>
              <Link href="/contact" className="action action--quiet">
                Контакты
              </Link>
            </div>
          </div>
        </div>

        <nav className={styles.index} aria-label="Разделы сайта">
          <ul className={styles.list}>
            {DESTINATIONS.map((item, i) => (
              <li key={item.href} className={styles.item}>
                <Link href={item.href} className={styles.itemLink}>
                  <span className={styles.itemNumber} aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>
                    <span className={styles.itemTitle}>{item.title}</span>
                    <span className={styles.itemNote}>{item.note}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
