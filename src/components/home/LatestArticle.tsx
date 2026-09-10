import Link from 'next/link';
import { ARTICLES_BY_DATE } from '@/content/articles';
import { formatDate } from '@/lib/format';
import styles from './LatestArticle.module.css';

/**
 * Анонс свежей статьи под обложкой. Берёт первый материал по дате,
 * поэтому при публикации новой ничего править не нужно.
 * Без статей не рендерится.
 */
export function LatestArticle() {
  const [article] = ARTICLES_BY_DATE;
  if (!article) return null;

  return (
    <aside className={styles.band} aria-label="Свежий материал">
      <div className="container">
        <Link href={`/articles/${article.slug}`} className={styles.link}>
          <span className={styles.label}>Новое</span>
          <time className={styles.date} dateTime={article.datePublished}>
            {formatDate(article.datePublished)}
          </time>
          <span className={styles.title}>{article.title}</span>
          <span className={styles.arrow} aria-hidden="true">
            →
          </span>
        </Link>
      </div>
    </aside>
  );
}
