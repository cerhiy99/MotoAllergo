import type { Metadata } from 'next';
import { Locale, i18n } from '@/i18n.config';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

import { Roboto, Montserrat} from 'next/font/google';
import { getDictionary } from '@/lib/dictionary';

const roboto = Roboto({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '700'],
  variable: '--font-roboto',
});

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '700'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(params.lang);

  return (
    <html
      lang={params.lang}
      className={`${roboto.variable} ${montserrat.variable}`}
    >
      <head>
        <script src="https://kit.fontawesome.com/44ddc9fabc.js" crossOrigin="anonymous" async />
      </head>
      <body>
        <header>
          <Header lang={params.lang} dictionary={dictionary.header} />
        </header>
        <main>{children}</main>
        <footer>
          <Footer lang={params.lang} />
        </footer>
      </body>
    </html>
  );
}
