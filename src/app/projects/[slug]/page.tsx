import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { JsonLd } from '@/components/ui/JsonLd';
import { ProjectIndex } from '@/components/ui/ProjectIndex';
import { PROJECTS, getProject, otherProjects } from '@/content/projects';
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
        <header className={styles.head}>
          <div className={`container ${styles.headGrid}`}>
            <p className={styles.index}>{project.index}</p>
            <div>
              <h1 className={styles.title}>{project.name}</h1>
              <p className={`lead ${styles.tagline}`}>{project.tagline}</p>

              <div className={styles.meta}>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Категория</span>
                  <span className={styles.metaValue}>{project.category}</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Статус</span>
                  <span className={styles.metaValue}>{project.status}</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Роль</span>
                  <span className={styles.metaValue}>
                    {project.role},{' '}
                    <Link href="/about" className="link">
                      {PERSON.name}
                    </Link>
                  </span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Сайт</span>
                  <span className={styles.metaValue}>
                    <a
                      className="link"
                      href={project.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {project.websiteLabel}
                    </a>
                  </span>
                </div>
              </div>

              <div className={styles.actions}>
                <a
                  className="button button--primary"
                  href={project.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Официальный сайт ↗
                </a>
                <Link href="/projects" className="button button--secondary">
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
                      {section.items.map((item) => (
                        <li key={item} className={styles.item}>
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

        <section className="section section--tight" aria-label="Официальный сайт проекта">
          <div className="container">
            <div className={styles.site}>
              <div>
                <p className={styles.siteTitle}>{project.name}</p>
                <p className={styles.siteText}>
                  Официальный сайт проекта — {project.websiteLabel}.
                </p>
              </div>
              <a
                className="button button--primary"
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                Перейти на сайт ↗
              </a>
            </div>
          </div>
        </section>
      </article>

      <section className="section section--tight" aria-labelledby="related-heading">
        <div className={`container ${styles.related}`}>
          <p className="eyebrow">Связанное</p>
          <div>
            <h2 id="related-heading" className="visually-hidden">
              Связанные страницы
            </h2>
            <div className={styles.relatedLinks}>
              <Link href="/about" className="arrow-link">
                {PERSON.name}
              </Link>
              <Link href="/projects" className="arrow-link">
                Все проекты
              </Link>
              <Link href="/contact" className="arrow-link">
                Контакты
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="other-projects-heading">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Другие проекты</p>
            <h2 id="other-projects-heading">Ещё в портфеле</h2>
          </div>
          <ProjectIndex projects={rest} />
        </div>
      </section>
    </>
  );
}
