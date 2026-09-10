import Link from 'next/link';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Страница не найдена — Дмитрий Пятаков',
  description: 'Запрошенная страница не существует.',
  path: '/404',
  noIndex: true,
});

export default function NotFound() {
  return (
    <section className="section" aria-labelledby="notfound-title">
      <div className="container container--text" style={{ paddingBlock: 'var(--space-xl)' }}>
        <p className="label">404</p>
        <h1 style={{ marginTop: 'var(--space-s)' }}>Страница не найдена.</h1>
        <p className="lead" style={{ marginTop: 'var(--space-s)', maxWidth: '44ch' }}>
          Возможно, адрес изменился или содержит опечатку.
        </p>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--space-m)',
            marginTop: 'var(--space-l)',
          }}
        >
          <Link href="/" className="action">
            На главную
          </Link>
          <Link href="/projects" className="action action--quiet">
            Проекты
          </Link>
        </div>
      </div>
    </section>
  );
}
