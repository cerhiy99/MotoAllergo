import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import React from 'react';
import PrivacyPolicyContent from "@/app/components/PrivacyPolicyContent/PrivacyPolicyContent"

import styles from './PrivacyPolicy.module.css'
type Props = {
  params: { lang: Locale };
};

export default async function Page({ params }: { params: { lang: string } }) {
  const dictionary = await getDictionary(params.lang);

  return (
    <main>
      <PrivacyPolicyContent dictionary={dictionary}/>
    </main>
  );
};