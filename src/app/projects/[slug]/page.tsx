import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { JsonLd } from '@/components/ui/JsonLd';
import { ProjectList } from '@/components/ui/ProjectList';
import { PROJECTS, getProject, otherProjects } from '@/content/projects';
import type { CSSProperties } from 'react';
import { PERSON } from '@/content/site';
import { buildMetadata } from '@/lib/seo';
import { hasPublicAsset } from '@/lib/assets';
import {
  breadcrumbSchema,
  graph,
  projectSchema,
  webPageSchema,
  type Crumb,
} from '@/lib/schema';
import styles from './Project.module.css';

type Params = { slug: string };

/** Все страницы проектов генерируются статически на этапе сборки. */
export function generateStaticParams(): Params[] {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export const dynamicParams = false;

function crumbsFor(name: string, slug: string): Crumb[] {
  return [
    { name: 'Главная', path: '/' },
    { name: 'Проекты', path: '/projects' },
    { name, path: `/projects/${slug}` },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  // Отдельная OG-картинка проекта, если она добавлена в /public.
  const ogPath = `/images/projects/${project.slug}-og.jpg`;

  return buildMetadata({
    title: `${project.name} — проект Дмитрия Пятакова`,
    description: project.description,
    path: `/projects/${project.slug}`,
    image: hasPublicAsset(ogPath)
      ? { path: ogPath, width: 1200, height: 630, alt: `${project.name} — проект Дмитрия Пятакова` }
      : undefined,
  });
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const crumbs = crumbsFor(project.name, project.slug);
  const pageTitle = `${project.name} — проект Дмитрия Пятакова`;
  const rest = otherProjects(project.slug);

  // Тон проекта задаётся переменными — шапка и акценты берут его из данных.
  const tone = {
    '--tone-tint': project.tone.tint,
    '--tone-deep': project.tone.deep,
  } as CSSProperties;

  return (
    <>
      <JsonLd
        json={graph([
          webPageSchema({
            path: `/projects/${project.slug}`,
            name: pageTitle,
            description: project.description,
          }),
          breadcrumbSchema(crumbs),
          projectSchema(project),
        ])}
      />

      <Breadcrumbs crumbs={crumbs} />

      <article>
        <header className={styles.head} style={tone}>
          <div className={`container ${styles.headGrid}`}>
            <div>
              <span className={`numeral ${styles.numeral}`} aria-hidden="true">
                {project.index}
              </span>
              <span className={`label ${styles.category}`}>{project.category}</span>
              <h1 className={styles.title}>{project.name}</h1>
            </div>

            <div>
              <p className={styles.tagline}>{project.tagline}</p>

              <dl className={styles.meta}>
                <div className={styles.metaRow}>
                  <dt className={styles.metaLabel}>Статус</dt>
                  <dd className={styles.metaValue}>{project.status}</dd>
                </div>
                <div className={styles.metaRow}>
                  <dt className={styles.metaLabel}>Роль</dt>
                  <dd className={styles.metaValue}>
                    {project.role},{' '}
                    <Link href="/about" className="link">
                      {PERSON.name}
                    </Link>
                  </dd>
                </div>
                <div className={styles.metaRow}>
                  <dt className={styles.metaLabel}>Сайт</dt>
                  <dd className={styles.metaValue}>
                    <a
                      className="link"
                      href={project.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {project.websiteLabel}
                    </a>
                  </dd>
                </div>
              </dl>

              <div className={styles.actions}>
                <a
                  className="action action--external"
                  href={project.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Официальный сайт
                </a>
                <Link href="/projects" className="action action--quiet">
                  Все проекты
                </Link>
              </div>
            </div>
          </div>
        </header>

        <section className="section" aria-label={`О проекте ${project.name}`}>
          <div className={`container ${styles.sections}`}>
            {project.sections.map((section) => (
              <div key={section.heading} className={styles.sectionRow}>
                <h2 className={styles.sectionTitle}>{section.heading}</h2>
                <div className={styles.sectionBody}>
                  {section.body?.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                  ))}
                  {section.items && (
                    <ul className={styles.items}>
                      {section.items.map((item, i) => (
                        <li key={item} className={styles.item}>
                          <span className={`numeral ${styles.itemNumber}`} aria-hidden="true">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section section--tight band" aria-label="Официальный сайт проекта">
          <div className="container">
            <div className={styles.site}>
              <div>
                <p className="label">Официальный сайт</p>
                <p className={styles.siteName}>{project.websiteLabel}</p>
                <p className={styles.siteText}>
                  Проект {project.name} — {project.role.toLowerCase()} Дмитрий Пятаков.
                </p>
              </div>
              <a
                className="action action--external"
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                Перейти на сайт
              </a>
            </div>
          </div>
        </section>
      </article>

      <section className="section" aria-labelledby="other-projects-heading">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="label">Другие проекты</p>
              <h2 id="other-projects-heading">Ещё в портфеле</h2>
            </div>
          </div>
          <ProjectList projects={rest} />

          {/* Связанные страницы: персона, индекс проектов, контакты. */}
          <div className={styles.relatedLinks}>
            <Link href="/about" className="action">
              {PERSON.name}
            </Link>
            <Link href="/projects" className="action action--quiet">
              Все проекты
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
