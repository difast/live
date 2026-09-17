import Link from 'next/link';
import type { Metadata } from 'next';
import { Hero } from '@/components/home/Hero';
import { LatestArticle } from '@/components/home/LatestArticle';
import { ProjectSpreads } from '@/components/ui/ProjectSpreads';
import { JsonLd } from '@/components/ui/JsonLd';
import { FOCUS_AREAS } from '@/content/focus';
import { PROJECTS } from '@/content/projects';
import { CONFIRMED_SOCIALS, PERSON } from '@/content/site';
import { ARTICLES_BY_DATE } from '@/content/articles';
import { formatDate } from '@/lib/format';
import { buildMetadata } from '@/lib/seo';
import { graph, projectListSchema, webPageSchema } from '@/lib/schema';
import styles from '@/components/home/Blocks.module.css';

const TITLE = 'Дмитрий Пятаков — предприниматель и создатель технологических компаний';
const DESCRIPTION =
  'Официальный сайт Дмитрия Пятакова. Предприниматель и создатель технологических компаний и продуктов: OneOnOne, Mevratek, ТехФабрика, Panteon Chess.';

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: '/',
  type: 'profile',
});

export default function HomePage() {
  return (
    <>
      <JsonLd
        json={graph([
          webPageSchema({ path: '/', name: TITLE, description: DESCRIPTION }),
          projectListSchema(),
        ])}
      />

      <Hero />

      <LatestArticle />

      {/* Кратко о Дмитрии Пятакове */}
      <section className="section band" aria-labelledby="about-heading">
        <div className={`container ${styles.about}`}>
          <div className={styles.aboutBody}>
            <h2 id="about-heading" className="visually-hidden">
              Кратко о Дмитрии Пятакове
            </h2>
            <p>
              Дмитрий Пятаков — предприниматель. Создаёт технологические компании и
              продукты: от первой версии до работающего бизнеса.
            </p>
            <p>
              Основные направления — управление командами, робототехника и
              технологическое образование. AI применяется там, где он меняет суть
              продукта, а не добавляет ещё одну функцию.
            </p>
          </div>
          <div className={styles.aboutSide}>
            <p className="label">Кратко</p>
            <div className={styles.aboutLinks}>
              <Link href="/about" className="action">
                Биография
              </Link>
              <Link href="/projects" className="action action--quiet">
                Все проекты
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Проекты — развороты */}
      <section aria-labelledby="projects-heading">
        <div className="container section--tight">
          <div className="section-head">
            <div>
              <p className="label">Проекты</p>
              <h2 id="projects-heading">Компании и продукты</h2>
            </div>
            <p className="lead">
              Четыре действующих проекта в технологиях, робототехнике и образовании.
            </p>
          </div>
        </div>

        <ProjectSpreads projects={PROJECTS} />

        <div className="container" style={{ paddingBlock: 'var(--space-l)' }}>
          <Link href="/projects" className="action">
            Все проекты
          </Link>
        </div>
      </section>

      {/* Направления работы */}
      <section className="section" aria-labelledby="focus-heading">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="label">Направления</p>
              <h2 id="focus-heading">Направления работы</h2>
            </div>
          </div>
          <ol className={styles.focusList}>
            {FOCUS_AREAS.map((area, i) => (
              <li key={area.title} className={styles.focusItem}>
                <span className={`numeral ${styles.focusNumber}`} aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className={styles.focusTitle}>{area.title}</h3>
                <p className={styles.focusText}>{area.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Тексты — появляются, когда есть хотя бы одна статья */}
      {ARTICLES_BY_DATE.length > 0 && (
        <section className="section" aria-labelledby="articles-heading">
          <div className="container">
            <div className="section-head">
              <div>
                <p className="label">Тексты</p>
                <h2 id="articles-heading">Статьи</h2>
              </div>
              <p className="lead">
                О создании компаний и продуктов, управлении командами и применении
                технологий.
              </p>
            </div>

            <ul className={styles.articleList}>
              {ARTICLES_BY_DATE.slice(0, 3).map((article) => (
                <li key={article.slug} className={styles.articleItem}>
                  <Link href={`/articles/${article.slug}`} className={styles.articleLink}>
                    <time className={styles.articleDate} dateTime={article.datePublished}>
                      {formatDate(article.datePublished)}
                    </time>
                    <span>
                      <span className={styles.articleTitle}>{article.title}</span>
                      <span className={styles.articleExcerpt}>{article.description}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <p style={{ marginTop: 'var(--space-m)' }}>
              <Link href="/articles" className="action">
                Все статьи
              </Link>
            </p>
          </div>
        </section>
      )}

      {/* Медиа и социальные сети */}
      <section className="section band" aria-labelledby="social-heading">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="label">Медиа</p>
              <h2 id="social-heading">Социальные сети</h2>
            </div>
            <p className="lead">
              О предпринимательстве, технологиях, стартапах и создании продуктов.
            </p>
          </div>

          <ul className={styles.socialList}>
            {CONFIRMED_SOCIALS.map((social) => (
              <li key={social.key} className={styles.socialItem}>
                <a
                  className={styles.socialLink}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className={styles.socialName}>{social.name}</span>
                  <span className={styles.socialText}>{social.description}</span>
                  <span className={styles.socialGo}>Перейти ↗</span>
                </a>
              </li>
            ))}
          </ul>

          <p style={{ marginTop: 'var(--space-m)' }}>
            <Link href="/media" className="action">
              Все площадки
            </Link>
          </p>
        </div>
      </section>

      {/* Контакт */}
      <section className="section" aria-labelledby="contact-heading">
        <div className={`container ${styles.contact}`}>
          <div>
            <p className="label">Контакт</p>
            <h2 id="contact-heading" className="visually-hidden">
              Связаться
            </h2>
            <a className={styles.email} href={`mailto:${PERSON.email}`}>
              {PERSON.email}
            </a>
          </div>
          <div>
            <p className={styles.contactText}>
              По вопросам проектов и сотрудничества — почта. Чтобы следить за новыми
              проектами, мыслями и материалами — Telegram.
            </p>
            <div className={styles.contactLinks}>
              <Link href="/contact" className="action">
                Все контакты
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
