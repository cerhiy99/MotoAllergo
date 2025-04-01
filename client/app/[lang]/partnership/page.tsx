import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import React from 'react';
import PartnershipContent from "@/app/components/PartnershipContent/PartnershipContent"
type Props = {
  params: { lang: Locale };
};

const page = async ({ params: { lang } }: Props) => {
  // const { partnership } = await getDictionary(lang);
  const dictionary: any = await getDictionary(lang);
  const partnership = dictionary.partnership;
  return (
    <main>
      <PartnershipContent dictionary={partnership} />
    </main>
  );
};

export default page;