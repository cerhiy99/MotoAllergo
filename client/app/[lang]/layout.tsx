

import { i18n } from '@/i18n.config';
import { Locale } from '@/i18n.config';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}


export async function generateMetadata({ params }: { params: { lang: Locale } }) {
  if (!params.lang) return { title: 'My App' };
  return {
    title: `My App - ${params.lang.toUpperCase()}`,
    description: 'Multilingual Next.js App',
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  if (!params?.lang) {
    console.error('Missing lang param');
    return <div>Loading...</div>;
  }

  return (
    <html lang={params.lang}>
      <body>
        <header>
          <Header lang={params.lang} />
        </header>
        <main>{children}</main>
        <footer>
          <Footer lang={params.lang} />
        </footer>
      </body>
    </html>
  );
}
