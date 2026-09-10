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
      <div className="container container--narrow" style={{ paddingBlock: 'var(--space-xl)' }}>
        <p className="eyebrow">404</p>
        <h1 style={{ marginTop: 'var(--space-s)' }}>Страница не найдена.</h1>
        <p className="lead" style={{ marginTop: 'var(--space-s)', maxWidth: '44ch' }}>
          Возможно, адрес изменился или содержит опечатку.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-xs)', marginTop: 'var(--space-m)' }}>
          <Link href="/" className="button button--primary">
            На главную
          </Link>
          <Link href="/projects" className="button button--secondary">
            Проекты
          </Link>
        </div>
      </div>
    </section>
  );
}
