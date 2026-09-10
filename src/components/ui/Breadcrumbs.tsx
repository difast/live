import Link from 'next/link';
import type { Crumb } from '@/lib/schema';
import styles from './Breadcrumbs.module.css';

/**
 * Визуальные хлебные крошки. Та же цепочка передаётся в BreadcrumbList,
 * поэтому разметка и структурированные данные всегда совпадают.
 */
export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav className={styles.nav} aria-label="Хлебные крошки">
      <div className="container">
        <ol className={styles.list}>
          {crumbs.map((crumb, i) => {
            const isLast = i === crumbs.length - 1;
            return (
              <li key={crumb.path} className={styles.item}>
                {isLast ? (
                  <span className={styles.current} aria-current="page">
                    {crumb.name}
                  </span>
                ) : (
                  <Link href={crumb.path} className={styles.link}>
                    {crumb.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
