import type { Metadata, Viewport } from 'next';
import { Inter, Source_Serif_4 } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { JsonLd } from '@/components/ui/JsonLd';
import { graph, personSchema, websiteSchema } from '@/lib/schema';
import { rootMetadata } from '@/lib/seo';
import './globals.css';

// Две гарнитуры, самохостинг через next/font: без внешних запросов в рантайме
// и без сдвига макета при загрузке шрифта.
const inter = Inter({
  subsets: ['cyrillic', 'latin'],
  display: 'swap',
  variable: '--font-inter',
});

const sourceSerif = Source_Serif_4({
  subsets: ['cyrillic', 'latin'],
  display: 'swap',
  variable: '--font-serif',
});

export const metadata: Metadata = rootMetadata;

export const viewport: Viewport = {
  themeColor: '#fbfaf8',
  colorScheme: 'light',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${inter.variable} ${sourceSerif.variable}`}>
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
