import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import React from 'react';
import PartnershipContent from "@/app/components/PartnershipContent/PartnershipContent"
type Props = {
  params: { lang: Locale };
};

const page = async ({ params: { lang } }: Props) => {
  const dictionary = await getDictionary(lang);

  return (
    <main>
      <PartnershipContent dictionary={dictionary} />
    </main>
  );
};

export default page;