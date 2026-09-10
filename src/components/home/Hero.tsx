import Link from 'next/link';
import { CONFIRMED_SOCIALS, PORTRAIT_BASE } from '@/content/site';
import { PROJECTS } from '@/content/projects';
import { Portrait } from '@/components/ui/Portrait';
import { resolveImage } from '@/lib/assets';
import styles from './Hero.module.css';

/** Указатель по сайту: короткий ответ на вопрос «что здесь есть». */
const SITE_INDEX = [
  { href: '/projects', title: 'Проекты', note: `${PROJECTS.length} действующих проекта` },
  { href: '/about', title: 'Биография', note: 'Путь и направления работы' },
  { href: '/media', title: 'Медиа', note: 'YouTube, Telegram, Instagram' },
];

export function Hero() {
  // Пока реальной фотографии нет, разворот строится на одной типографике:
  // пустая рамка под портрет выглядела бы недоделанной. Как только файл
  // появится, композиция сама переключается на текст + портрет.
  const hasPortrait = resolveImage(PORTRAIT_BASE) !== null;

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className="container">
        <div
          className={`${styles.grid} ${hasPortrait ? styles['grid--portrait'] : styles['grid--type']}`}
        >
          <div>
            <p className="label">Официальный сайт</p>

            <h1 className={styles.name} id="hero-title">
              <span className={styles.nameLine}>Дмитрий</span>
              <span className={styles.nameLine}>Пятаков</span>
            </h1>

            <div className={styles.statementRow}>
              <p className={styles.role}>
                Предприниматель и создатель технологических компаний и продуктов.
              </p>
              <p className={styles.statement}>
                Создаёт компании, продукты и системы на стыке технологий, бизнеса и AI.
              </p>
            </div>

            <div className={styles.actions}>
              <Link href="/projects" className="action">
                Проекты
              </Link>
              <Link href="/about" className="action action--quiet">
                Биография
              </Link>
            </div>

            <p className={styles.follow}>
              <span>Следить</span>
              <span className={styles.followLinks}>
                {CONFIRMED_SOCIALS.map((social) => (
                  <a
                    key={social.key}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.name}
                  </a>
                ))}
              </span>
            </p>
          </div>

          {hasPortrait && <Portrait priority sizes="(min-width: 68rem) 38rem, 100vw" />}
        </div>

        <nav className={styles.index} aria-label="Разделы сайта">
          <ul className={styles.indexList}>
            {SITE_INDEX.map((item, i) => (
              <li key={item.href} className={styles.indexItem}>
                <Link href={item.href} className={styles.indexLink}>
                  <span className={styles.indexNumber} aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>
                    <span className={styles.indexTitle}>{item.title}</span>
                    <span className={styles.indexNote}>{item.note}</span>
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
