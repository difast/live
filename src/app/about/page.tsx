import Link from 'next/link';
import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { PageHeader } from '@/components/ui/PageHeader';
import { Portrait } from '@/components/ui/Portrait';
import { JsonLd } from '@/components/ui/JsonLd';
import { ProjectList } from '@/components/ui/ProjectList';
import { PROJECTS } from '@/content/projects';
import { CONFIRMED_SOCIALS, PERSON } from '@/content/site';
import { TIMELINE } from '@/content/timeline';
import { buildMetadata } from '@/lib/seo';
import { hasPublicAsset } from '@/lib/assets';
import { breadcrumbSchema, graph, webPageSchema, type Crumb } from '@/lib/schema';
import styles from './About.module.css';

const TITLE = 'Дмитрий Пятаков — предприниматель и создатель технологических компаний';
const DESCRIPTION =
  'Дмитрий Пятаков — предприниматель. Создаёт технологические компании и продукты: OneOnOne, Mevratek, ТехФабрика, Panteon Chess. Технологии, AI, управление и образование.';

const CRUMBS: Crumb[] = [
  { name: 'Главная', path: '/' },
  { name: 'Обо мне', path: '/about' },
];

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: '/about',
  type: 'profile',
  image: {
    path: PERSON.portrait,
    width: 1200,
    height: 1500,
    alt: PERSON.portraitAlt,
  },
});

export default function AboutPage() {
  const hasPortrait = hasPublicAsset(PERSON.portrait);

  return (
    <>
      <JsonLd
        json={graph([
          webPageSchema({ path: '/about', name: TITLE, description: DESCRIPTION }),
          breadcrumbSchema(CRUMBS),
        ])}
      />

      <Breadcrumbs crumbs={CRUMBS} />

      <PageHeader
        eyebrow="Обо мне"
        title="О Дмитрии Пятакове"
        intro="Предприниматель и создатель технологических компаний и продуктов."
      />

      <section className="section" aria-labelledby="bio-heading">
        <div className={`container ${hasPortrait ? styles.intro : ''}`}>
          <div>
            <h2 id="bio-heading" className="visually-hidden">
              Биография
            </h2>
            <p className={styles.bioLead}>
              <strong>Дмитрий Пятаков</strong> — предприниматель. Создаёт технологические
              компании и продукты и доводит их от первой версии до работающего бизнеса.
            </p>
            <div
              className={`${styles.bioRest} ${hasPortrait ? '' : styles['bioRest--wide']}`}
            >
              <p>
                В портфеле четыре действующих проекта. OneOnOne — AI-платформа для
                управления, развития и эффективности команд. Mevratek — технологическая
                платформа для управления автономными роботизированными системами.
                ТехФабрика — онлайн-школа программирования для детей и школьников.
                Panteon Chess — школа шахмат.
              </p>
              <p>
                Общий принцип в работе: технологии и AI применяются там, где они меняют
                устройство продукта, а не там, где их можно добавить. Отсюда и состав
                портфеля — управление командами, робототехника и образование, а не одна
                узкая тема.
              </p>
            </div>
          </div>

          {/* Портрет появляется, когда в проект добавлена реальная фотография. */}
          {hasPortrait && <Portrait sizes="(min-width: 66rem) 30rem, 100vw" />}
        </div>
      </section>

      {/*
        Фактическая справка: чистые пары «поле — значение».
        Помогает поиску и LLM-системам корректно собрать сущность.
      */}
      <section className="section band" aria-labelledby="facts-heading">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="label">Справка</p>
              <h2 id="facts-heading">Коротко и по делу</h2>
            </div>
          </div>

          <dl className={styles.facts}>
            <div className={styles.factRow}>
              <dt className={styles.factLabel}>Имя</dt>
              <dd className={styles.factValue}>{PERSON.name}</dd>
            </div>
            <div className={styles.factRow}>
              <dt className={styles.factLabel}>Деятельность</dt>
              <dd className={styles.factValue}>{PERSON.role}</dd>
            </div>
            <div className={styles.factRow}>
              <dt className={styles.factLabel}>Проекты</dt>
              <dd className={`${styles.factValue} ${styles.inlineList}`}>
                {PROJECTS.map((p) => (
                  <Link key={p.slug} href={`/projects/${p.slug}`} className="link">
                    {p.name}
                  </Link>
                ))}
              </dd>
            </div>
            <div className={styles.factRow}>
              <dt className={styles.factLabel}>Социальные сети</dt>
              <dd className={`${styles.factValue} ${styles.inlineList}`}>
                {CONFIRMED_SOCIALS.map((s) => (
                  <a
                    key={s.key}
                    href={s.url}
                    className="link"
                    target="_blank"
                    rel="noopener noreferrer me"
                  >
                    {s.name}
                  </a>
                ))}
              </dd>
            </div>
            <div className={styles.factRow}>
              <dt className={styles.factLabel}>Почта</dt>
              <dd className={styles.factValue}>
                <a className="link" href={`mailto:${PERSON.email}`}>
                  {PERSON.email}
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Хронология рендерится только когда наполнена реальными событиями. */}
      {TIMELINE.length > 0 && (
        <section className="section" aria-labelledby="timeline-heading">
          <div className="container">
            <div className="section-head">
              <div>
                <p className="label">Хронология</p>
                <h2 id="timeline-heading">Путь</h2>
              </div>
            </div>
            <ol className={styles.timeline}>
              {TIMELINE.map((entry) => (
                <li key={`${entry.year}-${entry.title}`} className={styles.timelineItem}>
                  <span className={styles.timelineYear}>{entry.year}</span>
                  <div>
                    <h3 className={styles.timelineTitle}>
                      {entry.href ? (
                        <Link href={entry.href} className="link">
                          {entry.title}
                        </Link>
                      ) : (
                        entry.title
                      )}
                    </h3>
                    <p className={styles.timelineText}>{entry.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      <section className="section" aria-labelledby="about-projects-heading">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="label">Проекты</p>
              <h2 id="about-projects-heading">Что я создаю</h2>
            </div>
          </div>
          <ProjectList projects={PROJECTS} />
          <div className={styles.next}>
            <Link href="/projects" className="action">
              Все проекты
            </Link>
            <Link href="/media" className="action action--quiet">
              Социальные сети
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
