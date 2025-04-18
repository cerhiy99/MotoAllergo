import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import React from 'react';
import AboutContent from '@/app/components/AboutContent/AboutContent';
import styles from './About.module.css';

type Props = {
  params: { lang: Locale };
};

const Page = async ({ params: { lang } }: Props) => {
  // const {about} = await getDictionary(lang);
  const dictionary: any = await getDictionary(lang);
  const about = dictionary.about;

  return (
    <main>
      <AboutContent dictionary={about} />
    </main>
  );
};
export default Page;
