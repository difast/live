import Link from 'next/link';
import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { PageHeader } from '@/components/ui/PageHeader';
import { JsonLd } from '@/components/ui/JsonLd';
import { PROJECTS } from '@/content/projects';
import { CONFIRMED_SOCIALS, PERSON } from '@/content/site';
import { buildMetadata } from '@/lib/seo';
import { breadcrumbSchema, graph, webPageSchema, type Crumb } from '@/lib/schema';
import styles from './Contact.module.css';

const TITLE = 'Контакты — Дмитрий Пятаков';
const DESCRIPTION =
  'Как связаться с Дмитрием Пятаковым: почта ceo@oneononehq.com, Telegram, YouTube и Instagram.';

const CRUMBS: Crumb[] = [
  { name: 'Главная', path: '/' },
  { name: 'Контакты', path: '/contact' },
];

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: '/contact',
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        json={graph([
          webPageSchema({ path: '/contact', name: TITLE, description: DESCRIPTION }),
          breadcrumbSchema(CRUMBS),
        ])}
      />

      <Breadcrumbs crumbs={CRUMBS} />

      <PageHeader
        eyebrow="Контакты"
        title="Связаться"
        intro="По вопросам проектов и сотрудничества."
      />

      <section className="section" aria-label="Контактные данные">
        <div className={`container ${styles.grid}`}>
          <div>
            <div className={styles.emailBlock}>
              <p className="eyebrow">Почта</p>
              <a className={styles.email} href={`mailto:${PERSON.email}`}>
                {PERSON.email}
              </a>
              <p className={styles.note}>
                Основной способ связи. Пишите по существу вопроса — так ответ будет
                быстрее.
              </p>
            </div>

            <div style={{ marginTop: 'var(--space-m)' }}>
              <p className="eyebrow">Социальные сети</p>
              <ul className={styles.list} style={{ marginTop: 'var(--space-s)' }}>
                {CONFIRMED_SOCIALS.map((social) => (
                  <li key={social.key}>
                    <a
                      className={styles.row}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer me"
                    >
                      <span className={styles.rowName}>{social.name}</span>
                      <span className={styles.rowMeta}>Перейти ↗</span>
                    </a>
                  </li>
                ))}
              </ul>
              <p style={{ marginTop: 'var(--space-s)' }}>
                <Link href="/media" className="arrow-link">
                  Все площадки
                </Link>
              </p>
            </div>
          </div>

          <div>
            <p className="eyebrow">Проекты</p>
            <ul className={styles.list} style={{ marginTop: 'var(--space-s)' }}>
              {PROJECTS.map((project) => (
                <li key={project.slug}>
                  <Link href={`/projects/${project.slug}`} className={styles.row}>
                    <span className={styles.rowName}>{project.name}</span>
                    <span className={styles.rowMeta}>{project.websiteLabel}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <p style={{ marginTop: 'var(--space-s)' }}>
              <Link href="/projects" className="arrow-link">
                Все проекты
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
