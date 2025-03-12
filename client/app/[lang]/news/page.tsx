import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import React from 'react';
import GuaranteesContent from "@/app/components/NewsContent/NewsContent"
import NewsContent from '@/app/components/NewsContent/NewsContent';
type Props = {
  params: { lang: Locale };
};

const page = async ({ params: { lang } }: Props) => {
  const dictionary = await getDictionary(lang);

  return (
    <main>
      <NewsContent dictionary={dictionary} />
    </main>
  );
};

export default page;