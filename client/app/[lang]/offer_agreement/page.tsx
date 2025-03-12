import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import React from 'react';
import OfferAgreementContent from "@/app/components/OfferAgreementContent/OfferAgreementContent"

import styles from './PrivacyPolicy.module.css'
type Props = {
  params: { lang: Locale };
};

export default async function Page({ params }: { params: { lang: string } }) {
  const dictionary = await getDictionary(params.lang);

  return (
    <main>
      <OfferAgreementContent dictionary={dictionary}/>
    </main>
  );
};