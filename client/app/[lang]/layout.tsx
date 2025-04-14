import type { Metadata } from 'next';
import { Locale, i18n } from '@/i18n.config';
import { Roboto, Montserrat } from 'next/font/google';
import { getDictionary } from '@/lib/dictionary';
import './Home.scss';
import ClientWrapper from '../components/ClientWrapper/ClientWrapper';

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
    <html lang={params.lang} className={`${roboto.variable} ${montserrat.variable}`}>
      <head>
        <script
          src="https://kit.fontawesome.com/44ddc9fabc.js"
          crossOrigin="anonymous"
          async
        />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
          rel="stylesheet"
        />
      </head>
      <body>
        <ClientWrapper lang={params.lang} dictionary={dictionary}>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}