import Link from 'next/link';
import type { Project } from '@/content/projects';
import styles from './ProjectList.module.css';

/** Перечень проектов одной строкой на проект. Вся строка — ссылка. */
export function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <ul className={styles.list}>
      {projects.map((project) => (
        <li key={project.slug} className={styles.row}>
          <Link href={`/projects/${project.slug}`} className={styles.link}>
            <span className={`numeral ${styles.numeral}`} aria-hidden="true">
              {project.index}
            </span>

            <span>
              <span className={styles.name}>{project.name}</span>
              <span className={styles.category}>{project.category}</span>
            </span>

            <span>
              <span className={styles.tagline}>{project.tagline}</span>
              {project.achievement && (
                <span className={styles.award}>{project.achievement.short}</span>
              )}
            </span>

            <span className={styles.meta}>
              <span>{project.role}</span>
              <span className={styles.site}>{project.websiteLabel} ↗</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
