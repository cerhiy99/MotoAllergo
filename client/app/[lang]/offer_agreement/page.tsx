import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import React from 'react';
import OfferAgreementContent from "@/app/components/OfferAgreementContent/OfferAgreementContent"

import styles from './PrivacyPolicy.module.css'
type Props = {
  params: any;
};

export default async function Page({ params }: { params: any }) {
  // const { offerAgreement }= await getDictionary(params.lang);
  const dictionary: any = await getDictionary(params.lang);
  const offerAgreement = dictionary.offerAgreement;
  return (
    <main>
      <OfferAgreementContent dictionary={ offerAgreement }/>
    </main>
  );
};