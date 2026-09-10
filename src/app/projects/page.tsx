import Link from 'next/link';
import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { PageHeader } from '@/components/ui/PageHeader';
import { ProjectSpreads } from '@/components/ui/ProjectSpreads';
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

      <section aria-label="Список проектов">
        <ProjectSpreads projects={PROJECTS} headingLevel="h2" />
        <div className="container" style={{ paddingBlock: 'var(--space-l)' }}>
          <Link href="/about" className="action">
            О Дмитрии Пятакове
          </Link>
        </div>
      </section>
    </>
  );
}
