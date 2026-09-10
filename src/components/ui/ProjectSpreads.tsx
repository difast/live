import Link from 'next/link';
import type { CSSProperties } from 'react';
import type { Project } from '@/content/projects';
import styles from './ProjectSpreads.module.css';

type ToneStyle = CSSProperties & { '--tone-tint': string; '--tone-deep': string };

type Props = {
  projects: Project[];
  /**
   * Уровень заголовка названия проекта.
   * На /projects развороты идут сразу после h1 — там нужен h2.
   * На главной они вложены в раздел со своим h2 — там h3.
   */
  headingLevel?: 'h2' | 'h3';
};

/**
 * Развороты проектов: полоса на весь экран в тоне проекта.
 * Используется на главной и на /projects — там, где проекты являются
 * главным содержанием страницы.
 */
export function ProjectSpreads({ projects, headingLevel = 'h3' }: Props) {
  const Heading = headingLevel;

  return (
    <ul>
      {projects.map((project) => {
        const tone: ToneStyle = {
          '--tone-tint': project.tone.tint,
          '--tone-deep': project.tone.deep,
        };

        return (
          <li key={project.slug} className={styles.spread} style={tone}>
            <div className={`container ${styles.grid}`}>
              <div className={styles.headSide}>
                <Link href={`/projects/${project.slug}`} className={styles.link}>
                  <span className={`numeral ${styles.numeral}`} aria-hidden="true">
                    {project.index}
                  </span>
                  <span className={`label ${styles.category}`}>{project.category}</span>
                  <Heading className={styles.name}>{project.name}</Heading>
                </Link>
              </div>

              <div className={styles.bodySide}>
                <p className={styles.tagline}>{project.tagline}</p>

                <div className={styles.metaBlock}>
                  <dl className={styles.meta}>
                    <div className={styles.metaRow}>
                      <dt className={styles.metaLabel}>Роль</dt>
                      <dd className={styles.metaValue}>{project.role}</dd>
                    </div>
                    <div className={styles.metaRow}>
                      <dt className={styles.metaLabel}>Статус</dt>
                      <dd className={styles.metaValue}>{project.status}</dd>
                    </div>
                    {project.achievement && (
                      <div className={styles.metaRow}>
                        <dt className={styles.metaLabel}>Признание</dt>
                        <dd className={`${styles.metaValue} ${styles.award}`}>
                          {project.achievement.short}
                        </dd>
                      </div>
                    )}
                    <div className={styles.metaRow}>
                      <dt className={styles.metaLabel}>Сайт</dt>
                      <dd className={styles.metaValue}>
                        <a
                          className={`link ${styles.site}`}
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
                    <Link href={`/projects/${project.slug}`} className="action">
                      О проекте
                    </Link>
                    <a
                      className="action action--quiet action--external"
                      href={project.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Официальный сайт
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
