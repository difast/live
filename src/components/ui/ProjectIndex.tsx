import Link from 'next/link';
import type { Project } from '@/content/projects';
import styles from './ProjectIndex.module.css';

/**
 * Индекс проектов. Одна строка — один проект: номер, название, категория,
 * краткое описание, роль и домен. Вся строка — ссылка на страницу проекта.
 */
export function ProjectIndex({ projects }: { projects: Project[] }) {
  return (
    <ul className={styles.list}>
      {projects.map((project) => (
        <li key={project.slug} className={styles.row}>
          <Link href={`/projects/${project.slug}`} className={styles.link}>
            <span className={styles.index} aria-hidden="true">
              {project.index}
            </span>

            <span>
              <span className={styles.name}>{project.name}</span>
              <span className={styles.category}>{project.category}</span>
            </span>

            <span className={styles.tagline}>{project.tagline}</span>

            <span className={styles.meta}>
              <span className={styles.role}>{project.role}</span>
              <span className={styles.site}>{project.websiteLabel} ↗</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
