import type { Metadata, Viewport } from 'next';
import { Golos_Text, Prata } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { JsonLd } from '@/components/ui/JsonLd';
import { graph, personSchema, websiteSchema } from '@/lib/schema';
import { rootMetadata } from '@/lib/seo';
import './globals.css';

// Обе гарнитуры с полноценной кириллицей, самохостинг через next/font:
// без внешних запросов в рантайме и без сдвига макета при загрузке.

/** Дидон для крупных заголовков. Одно начертание — так и задумано. */
const prata = Prata({
  subsets: ['cyrillic', 'latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-prata',
});

/** Кириллический гротеск для текста и интерфейса. */
const golos = Golos_Text({
  subsets: ['cyrillic', 'latin'],
  display: 'swap',
  variable: '--font-golos',
});

export const metadata: Metadata = rootMetadata;

export const viewport: Viewport = {
  themeColor: '#f6f3ed',
  colorScheme: 'light',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${prata.variable} ${golos.variable}`}>
      <body>
        {/* Person и WebSite объявляются один раз на весь сайт: устойчивые @id,
            на которые ссылаются страницы и проекты. */}
        <JsonLd json={graph([personSchema(), websiteSchema()])} />

        <a className="skip-link" href="#main">
          Перейти к содержимому
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
