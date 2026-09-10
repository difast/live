import Link from 'next/link';
import type { Metadata } from 'next';
import { Hero } from '@/components/home/Hero';
import { ProjectIndex } from '@/components/ui/ProjectIndex';
import { JsonLd } from '@/components/ui/JsonLd';
import { FOCUS_AREAS } from '@/content/focus';
import { PROJECTS } from '@/content/projects';
import { CONFIRMED_SOCIALS, PERSON } from '@/content/site';
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

      {/* Кратко обо мне */}
      <section className="section" aria-labelledby="about-heading">
        <div className={`container ${styles.aboutGrid}`}>
          <p className="eyebrow">Кратко</p>
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
          <div className={styles.aboutLinks}>
            <Link href="/about" className="arrow-link">
              Подробно обо мне
            </Link>
            <Link href="/projects" className="arrow-link">
              Все проекты
            </Link>
          </div>
        </div>
      </section>

      {/* Избранные проекты */}
      <section className="section" aria-labelledby="projects-heading">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Проекты</p>
            <div>
              <h2 id="projects-heading">Компании и продукты</h2>
              <p className="lead measure" style={{ marginTop: 'var(--space-s)' }}>
                Четыре действующих проекта в технологиях, робототехнике и образовании.
              </p>
            </div>
          </div>
          <ProjectIndex projects={PROJECTS} />
          <p style={{ marginTop: 'var(--space-m)' }}>
            <Link href="/projects" className="arrow-link">
              Все проекты
            </Link>
          </p>
        </div>
      </section>

      {/* Направления работы */}
      <section className="section" aria-labelledby="focus-heading">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Направления</p>
            <div>
              <h2 id="focus-heading">Чем занимаюсь</h2>
            </div>
          </div>
        </div>
        <div className="container">
          <ul className={styles.focusGrid}>
            {FOCUS_AREAS.map((area) => (
              <li key={area.title} className={styles.focusItem}>
                <h3 className={styles.focusTitle}>{area.title}</h3>
                <p className={styles.focusText}>{area.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Медиа и социальные сети */}
      <section className="section" aria-labelledby="social-heading">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Медиа</p>
            <div>
              <h2 id="social-heading">Я в социальных сетях</h2>
              <p className="lead measure" style={{ marginTop: 'var(--space-s)' }}>
                Рассказываю о предпринимательстве, технологиях, стартапах и создании
                продуктов.
              </p>
            </div>
          </div>
        </div>
        <div className="container">
          <ul className={styles.socialGrid}>
            {CONFIRMED_SOCIALS.map((social) => (
              <li key={social.key}>
                <a
                  className={styles.socialItem}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className={styles.socialName}>
                    {social.name}
                    <span className={styles.socialArrow} aria-hidden="true">
                      ↗
                    </span>
                  </span>
                  <span className={styles.socialText}>{social.description}</span>
                </a>
              </li>
            ))}
          </ul>
          <p style={{ marginTop: 'var(--space-m)' }}>
            <Link href="/media" className="arrow-link">
              Все площадки
            </Link>
          </p>
        </div>
      </section>

      {/* Контакт */}
      <section className="section" aria-labelledby="contact-heading">
        <div className={`container ${styles.contact}`}>
          <div>
            <p className="eyebrow">Контакт</p>
            <h2 id="contact-heading" className={styles.contactTitle} style={{ marginTop: 'var(--space-s)' }}>
              Связаться
            </h2>
            <p className={styles.contactText}>
              По вопросам проектов и сотрудничества — почта. Чтобы следить за новыми
              проектами, мыслями и материалами — Telegram.
            </p>
          </div>
          <div className={styles.contactActions}>
            <a href={`mailto:${PERSON.email}`} className="button button--primary">
              {PERSON.email}
            </a>
            <Link href="/contact" className="button button--secondary">
              Все контакты
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
