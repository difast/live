import type { ReactNode } from 'react';
import styles from './PageHeader.module.css';

type Props = {
  eyebrow: string;
  title: string;
  intro?: ReactNode;
};

/** Единая шапка внутренних страниц. Ровно один h1 на страницу. */
export function PageHeader({ eyebrow, title, intro }: Props) {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.grid}`}>
        <div>
          <p className="label">{eyebrow}</p>
          <h1 className={styles.title}>{title}</h1>
        </div>
        {intro && <p className={`lead ${styles.intro}`}>{intro}</p>}
      </div>
    </header>
  );
}
