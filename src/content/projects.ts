/**
 * Проекты Дмитрия Пятакова.
 * Отсюда рендерятся: /projects, /projects/[slug], JSON-LD, sitemap, llms.txt.
 * Чтобы добавить проект — добавить объект в PROJECTS. Страница, разметка и sitemap
 * подхватятся автоматически.
 */

/** Тип Schema.org, наиболее корректный для конкретного проекта. */
export type ProjectSchemaType =
  | 'Organization'
  | 'SoftwareApplication'
  | 'EducationalOrganization';

/**
 * Визуальный тон проекта — только слой представления.
 * Даёт каждому проекту собственный характер внутри общей системы сайта:
 * `tint` — фон разворота, `deep` — цвет номера и акцентов на нём.
 * Все оттенки намеренно приглушены до уровня тонированной бумаги.
 */
export type ProjectTone = { tint: string; deep: string };

export type ProjectSection = {
  heading: string;
  /** Абзацы текста. */
  body?: string[];
  /** Список пунктов — если раздел удобнее показать перечнем. */
  items?: string[];
};

export type Project = {
  slug: string;
  name: string;
  /** Порядковый номер в индексе проектов: 01, 02, ... */
  index: string;
  category: string;
  status: string;
  /** Одна строка для карточки и meta description. */
  tagline: string;
  /** Развёрнутое описание для страницы проекта и JSON-LD. */
  description: string;
  website: string;
  /** Домен без протокола — для отображения ссылки. */
  websiteLabel: string;
  /** Роль Дмитрия Пятакова в проекте. */
  role: string;
  schemaType: ProjectSchemaType;
  tone: ProjectTone;
  /** Дополнительный тип, если один тип не описывает сущность полностью. */
  additionalSchemaType?: ProjectSchemaType;
  /** Для SoftwareApplication. */
  applicationCategory?: string;
  sections: ProjectSection[];
};

export const PROJECTS: Project[] = [
  {
    slug: 'oneonone',
    name: 'OneOnOne',
    index: '01',
    category: 'Управление командами · AI',
    status: 'Действующий проект',
    tagline: 'AI-платформа для управления, развития и эффективности команд.',
    description:
      'OneOnOne — AI-платформа для управления, развития и эффективности команд. Объединяет встречи один на один, задачи, развитие сотрудников и аналитику состояния команды в один инструмент руководителя.',
    website: 'https://oneononehq.com',
    websiteLabel: 'oneononehq.com',
    role: 'Основатель',
    tone: { tint: '#e7e9e8', deep: '#2f3a3c' },
    schemaType: 'SoftwareApplication',
    additionalSchemaType: 'Organization',
    applicationCategory: 'BusinessApplication',
    sections: [
      {
        heading: 'Задача',
        body: [
          'Работа руководителя с командой распадается на несвязанные части. Встречи один на один проходят в календаре, договорённости остаются в заметках, задачи живут в трекере, а развитие сотрудников обсуждается раз в полгода.',
          'В результате у руководителя нет цельной картины: что обсуждали, к чему пришли, что изменилось в команде и на что нужно реагировать сейчас.',
        ],
      },
      {
        heading: 'Решение',
        body: [
          'OneOnOne собирает управленческий контур в одном месте: встречи, договорённости, задачи, развитие сотрудников и аналитику состояния команды.',
          'AI работает не как отдельная функция, а как слой поверх этих данных — помогает готовиться к встречам, удерживать контекст и видеть, что происходит в команде.',
        ],
      },
      {
        heading: 'Ключевые направления',
        items: [
          'Команды и структура',
          'Встречи один на один',
          'Задачи и договорённости',
          'Развитие сотрудников',
          'Аналитика',
          'Состояние команды',
          'AI-инструменты для руководителей',
        ],
      },
    ],
  },
  {
    slug: 'mevratek',
    name: 'Mevratek',
    index: '02',
    category: 'Робототехника · Инфраструктура',
    status: 'Действующий проект',
    tagline:
      'Технологическая платформа для управления автономными роботизированными системами.',
    description:
      'Mevratek — технологическая платформа для управления автономными роботизированными системами. Серверная платформа выступает как «мозг» системы, локальная программа на устройстве — как «тело».',
    website: 'https://mevratek.ru',
    websiteLabel: 'mevratek.ru',
    role: 'Основатель',
    tone: { tint: '#e6e4e0', deep: '#343330' },
    schemaType: 'SoftwareApplication',
    additionalSchemaType: 'Organization',
    applicationCategory: 'DeveloperApplication',
    sections: [
      {
        heading: 'Концепция',
        body: [
          'Mevratek построен вокруг разделения вычислений и исполнения. Платформа выступает как «мозг» роботизированной системы, а локальная программа на устройстве выполняет роль «тела».',
          'Взаимодействие происходит через интернет: серверная платформа принимает решения и хранит логику, локальное программное обеспечение отвечает за исполнение на конкретном устройстве.',
        ],
      },
      {
        heading: 'Архитектура',
        items: [
          'Серверная платформа — логика, состояние и управление',
          'Локальное программное обеспечение на устройстве — исполнение',
          'Обмен через интернет между платформой и устройством',
          'Единый контур управления для автономных систем',
        ],
      },
      {
        heading: 'Назначение',
        body: [
          'Такое разделение позволяет развивать логику управления независимо от конкретного устройства и обновлять её централизованно, не переписывая программное обеспечение на стороне робота.',
        ],
      },
    ],
  },
  {
    slug: 'tech-fabrika',
    name: 'ТехФабрика',
    index: '03',
    category: 'Технологическое образование',
    status: 'Действующий проект',
    tagline: 'Онлайн-школа программирования для детей и школьников.',
    description:
      'ТехФабрика — онлайн-школа программирования для детей и школьников. Обучение программированию, в том числе на Python.',
    website: 'https://tech-fabrika.ru',
    websiteLabel: 'tech-fabrika.ru',
    role: 'Основатель',
    tone: { tint: '#efe7d7', deep: '#5b4626' },
    schemaType: 'EducationalOrganization',
    additionalSchemaType: 'Organization',
    sections: [
      {
        heading: 'Направление',
        body: [
          'ТехФабрика — онлайн-школа программирования для детей и школьников. Формат обучения — онлайн.',
        ],
      },
      {
        heading: 'Чему учат',
        items: ['Программирование', 'Python', 'Технологическое образование'],
      },
      {
        heading: 'Место в портфеле',
        body: [
          'ТехФабрика отвечает за образовательное направление: работу с технологиями на входе, до профессионального уровня.',
        ],
      },
    ],
  },
  {
    slug: 'panteon-chess',
    name: 'Panteon Chess',
    index: '04',
    category: 'Образование',
    status: 'Действующий проект',
    tagline: 'Школа шахмат.',
    description:
      'Panteon Chess — школа шахмат. Обучение шахматам и развитие игроков.',
    website: 'https://panteonchess.ru',
    websiteLabel: 'panteonchess.ru',
    role: 'Основатель',
    tone: { tint: '#e4e8e2', deep: '#2f3a2d' },
    schemaType: 'EducationalOrganization',
    additionalSchemaType: 'Organization',
    sections: [
      {
        heading: 'Направление',
        body: [
          'Panteon Chess — школа шахмат. Проект занимается шахматным образованием и обучением.',
        ],
      },
      {
        heading: 'Обучение и развитие',
        body: [
          // TODO(panteon-chess): дополнить форматами занятий, уровнями подготовки
          // и составом преподавателей, когда информация будет подтверждена.
          'Направление школы — последовательное обучение шахматам и развитие игроков.',
        ],
      },
      {
        heading: 'Место в портфеле',
        body: [
          'Panteon Chess дополняет образовательное направление портфеля: развитие мышления и подготовка вне технологической области.',
        ],
      },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function otherProjects(slug: string): Project[] {
  return PROJECTS.filter((p) => p.slug !== slug);
}
