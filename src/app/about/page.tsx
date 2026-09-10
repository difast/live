import Link from 'next/link';
import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { PageHeader } from '@/components/ui/PageHeader';
import { Portrait } from '@/components/ui/Portrait';
import { JsonLd } from '@/components/ui/JsonLd';
import { ProjectIndex } from '@/components/ui/ProjectIndex';
import { PROJECTS } from '@/content/projects';
import { CONFIRMED_SOCIALS, PERSON } from '@/content/site';
import { TIMELINE } from '@/content/timeline';
import { buildMetadata } from '@/lib/seo';
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
        <div className={`container ${styles.intro}`}>
          <div className={styles.body}>
            <h2 id="bio-heading" className="visually-hidden">
              Биография
            </h2>
            <p>
              <strong>Дмитрий Пятаков</strong> — предприниматель. Создаёт технологические
              компании и продукты и доводит их от первой версии до работающего бизнеса.
            </p>
            <p>
              В портфеле четыре действующих проекта. OneOnOne — AI-платформа для
              управления, развития и эффективности команд. Mevratek — технологическая
              платформа для управления автономными роботизированными системами.
              ТехФабрика — онлайн-школа программирования для детей и школьников. Panteon
              Chess — школа шахмат.
            </p>
            <p>
              Общий принцип в работе: технологии и AI применяются там, где они меняют
              устройство продукта, а не там, где их можно добавить. Отсюда и состав
              портфеля — управление командами, робототехника и образование, а не одна
              узкая тема.
            </p>

            {/* Фактическая справка: чистые пары «поле — значение».
                Помогает поиску и LLM-системам корректно собрать сущность. */}
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

          <Portrait sizes="(min-width: 62rem) 22rem, 100vw" />
        </div>
      </section>

      {/* Хронология рендерится только когда наполнена реальными событиями. */}
      {TIMELINE.length > 0 && (
        <section className="section" aria-labelledby="timeline-heading">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow">Хронология</p>
              <h2 id="timeline-heading">Путь</h2>
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
            <p className="eyebrow">Проекты</p>
            <h2 id="about-projects-heading">Что я создаю</h2>
          </div>
          <ProjectIndex projects={PROJECTS} />
          <div className={styles.next}>
            <Link href="/projects" className="arrow-link">
              Все проекты
            </Link>
            <Link href="/media" className="arrow-link">
              Социальные сети
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
