import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import React from 'react';
import GuaranteesContent from "@/app/components/GuaranteesContent/GuaranteesContent"
type Props = {
  params: { lang: Locale };
};

const page = async ({ params: { lang } }: Props) => {
  
  // const {guarantees} = await getDictionary(lang);
  const dictionary: any = await getDictionary(lang);
  const guarantees = dictionary.guarantees;
  return (
    <main>
      <GuaranteesContent dictionary={guarantees} />
    </main>
  );
};

export default page;