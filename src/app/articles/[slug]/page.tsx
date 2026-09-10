import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { JsonLd } from '@/components/ui/JsonLd';
import { ARTICLES, getArticle, readingMinutes } from '@/content/articles';
import { PERSON } from '@/content/site';
import { buildMetadata } from '@/lib/seo';
import { formatDate } from '@/lib/format';
import {
  articleSchema,
  breadcrumbSchema,
  graph,
  webPageSchema,
  type Crumb,
} from '@/lib/schema';
import styles from './Article.module.css';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return ARTICLES.map((article) => ({ slug: article.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  return buildMetadata({
    title: `${article.title} — Дмитрий Пятаков`,
    description: article.description,
    path: `/articles/${article.slug}`,
    type: 'article',
  });
}

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const crumbs: Crumb[] = [
    { name: 'Главная', path: '/' },
    { name: 'Статьи', path: '/articles' },
    { name: article.title, path: `/articles/${article.slug}` },
  ];

  // Нумерация перечней сквозная по статье, поэтому считается при рендере.
  let listIndex = 0;

  return (
    <>
      <JsonLd
        json={graph([
          webPageSchema({
            path: `/articles/${article.slug}`,
            name: article.title,
            description: article.description,
          }),
          breadcrumbSchema(crumbs),
          articleSchema(article),
        ])}
      />

      <Breadcrumbs crumbs={crumbs} />

      <article>
        <header className={styles.head}>
          <div className="container">
            <p className={styles.meta}>
              <time dateTime={article.datePublished}>
                {formatDate(article.datePublished)}
              </time>
              <span>{readingMinutes(article)} мин чтения</span>
            </p>
            <h1 className={styles.title}>{article.title}</h1>
            <p className={styles.lead}>{article.lead}</p>
          </div>
        </header>

        <section className="section">
          <div className="container">
            <div className={styles.body}>
              {article.body.map((block, i) => {
                if (block.kind === 'h') {
                  return (
                    <h2 key={i} className={styles.subhead}>
                      {block.text}
                    </h2>
                  );
                }

                if (block.kind === 'list') {
                  listIndex = 0;
                  return (
                    <ul key={i} className={styles.list}>
                      {block.items.map((item) => {
                        listIndex += 1;
                        const number = String(listIndex).padStart(2, '0');
                        return (
                          <li key={item} className={styles.item}>
                            <span
                              className={`numeral ${styles.itemNumber}`}
                              aria-hidden="true"
                            >
                              {number}
                            </span>
                            {item}
                          </li>
                        );
                      })}
                    </ul>
                  );
                }

                return <p key={i}>{block.text}</p>;
              })}

              <p className={styles.signature}>
                <Link href="/about" className="link">
                  {PERSON.name}
                </Link>
                {' — '}
                {PERSON.role.toLowerCase()}.
              </p>
            </div>
          </div>
        </section>
      </article>

      <section className="section section--tight" aria-labelledby="article-next">
        <div className="container">
          <h2 id="article-next" className="visually-hidden">
            Дальше
          </h2>
          <div className={styles.related}>
            <Link href="/articles" className="action">
              Все статьи
            </Link>
            <Link href="/projects" className="action action--quiet">
              Проекты
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
