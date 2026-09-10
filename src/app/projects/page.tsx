import Link from 'next/link';
import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { PageHeader } from '@/components/ui/PageHeader';
import { ProjectIndex } from '@/components/ui/ProjectIndex';
import { JsonLd } from '@/components/ui/JsonLd';
import { PROJECTS } from '@/content/projects';
import { buildMetadata } from '@/lib/seo';
import {
  breadcrumbSchema,
  graph,
  projectListSchema,
  projectSchema,
  webPageSchema,
  type Crumb,
} from '@/lib/schema';

const TITLE = 'Проекты Дмитрия Пятакова — OneOnOne, Mevratek и другие';
const DESCRIPTION =
  'Проекты Дмитрия Пятакова: OneOnOne — AI-платформа для управления командами, Mevratek — платформа для роботизированных систем, ТехФабрика и Panteon Chess.';

const CRUMBS: Crumb[] = [
  { name: 'Главная', path: '/' },
  { name: 'Проекты', path: '/projects' },
];

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: '/projects',
});

export default function ProjectsPage() {
  return (
    <>
      <JsonLd
        json={graph([
          webPageSchema({ path: '/projects', name: TITLE, description: DESCRIPTION }),
          breadcrumbSchema(CRUMBS),
          projectListSchema(),
          // Каждый проект объявляется здесь же — страница индекса связывает
          // персону со всеми сущностями портфеля.
          ...PROJECTS.map(projectSchema),
        ])}
      />

      <Breadcrumbs crumbs={CRUMBS} />

      <PageHeader
        eyebrow="Проекты"
        title="Компании и продукты"
        intro="Действующие проекты Дмитрия Пятакова в технологиях, робототехнике и образовании."
      />

      <section className="section" aria-label="Список проектов">
        <div className="container">
          <ProjectIndex projects={PROJECTS} />
          <p style={{ marginTop: 'var(--space-m)' }}>
            <Link href="/about" className="arrow-link">
              О Дмитрии Пятакове
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
