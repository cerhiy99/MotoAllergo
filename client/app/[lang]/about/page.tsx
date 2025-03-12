import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import React from 'react';
import AboutContent from "@/app/components/AboutContent/AboutContent"

import styles from './About.module.css'
type Props = {
  params: { lang: Locale };
};

export default async function Page({ params }: { params: { lang: string } }) {
  const dictionary = await getDictionary(params.lang);

  return (
    <main>

      <AboutContent />
    </main>
  );
};