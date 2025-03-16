import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import React from 'react';
import GuaranteesContent from "@/app/components/GuaranteesContent/GuaranteesContent"
type Props = {
  params: { lang: Locale };
};

const page = async ({ params: { lang } }: Props) => {
  const {guarantees} = await getDictionary(lang);

  return (
    <main>
      <GuaranteesContent dictionary={guarantees} />
    </main>
  );
};

export default page;