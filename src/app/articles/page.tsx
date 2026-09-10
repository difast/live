import Link from 'next/link';
import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { PageHeader } from '@/components/ui/PageHeader';
import { JsonLd } from '@/components/ui/JsonLd';
import { ARTICLES_BY_DATE, readingMinutes } from '@/content/articles';
import { absoluteUrl } from '@/content/site';
import { buildMetadata } from '@/lib/seo';
import {
  breadcrumbSchema,
  graph,
  itemListSchema,
  webPageSchema,
  type Crumb,
} from '@/lib/schema';
import { formatDate } from '@/lib/format';
import styles from './Articles.module.css';

const TITLE = 'Статьи Дмитрия Пятакова — о предпринимательстве и технологиях';
const DESCRIPTION =
  'Тексты Дмитрия Пятакова о создании компаний и продуктов, управлении командами, технологиях и применении AI.';

const CRUMBS: Crumb[] = [
  { name: 'Главная', path: '/' },
  { name: 'Статьи', path: '/articles' },
];

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: '/articles',
});

export default function ArticlesPage() {
  return (
    <>
      <JsonLd
        json={graph([
          webPageSchema({ path: '/articles', name: TITLE, description: DESCRIPTION }),
          breadcrumbSchema(CRUMBS),
          itemListSchema({
            path: '/articles',
            name: 'Статьи Дмитрия Пятакова',
            items: ARTICLES_BY_DATE.map((a) => ({
              url: absoluteUrl(`/articles/${a.slug}`),
              name: a.title,
            })),
          }),
        ])}
      />

      <Breadcrumbs crumbs={CRUMBS} />

      <PageHeader
        eyebrow="Статьи"
        title="Тексты"
        intro="О создании компаний и продуктов, управлении командами и о том, где технологии действительно меняют дело."
      />

      <section className="section" aria-label="Список статей">
        <div className="container">
          <ul className={styles.list}>
            {ARTICLES_BY_DATE.map((article) => (
              <li key={article.slug} className={styles.row}>
                <Link href={`/articles/${article.slug}`} className={styles.link}>
                  <time className={styles.date} dateTime={article.datePublished}>
                    {formatDate(article.datePublished)}
                  </time>

                  <span>
                    <span className={styles.title}>{article.title}</span>
                    <span className={styles.excerpt}>{article.description}</span>
                  </span>

                  <span className={styles.meta}>{readingMinutes(article)} мин</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className={styles.next}>
            <Link href="/about" className="action">
              О Дмитрии Пятакове
            </Link>
            <Link href="/projects" className="action action--quiet">
              Проекты
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
