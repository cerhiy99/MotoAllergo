import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import React from 'react';
import PrivacyPolicyContent from "@/app/components/PrivacyPolicyContent/PrivacyPolicyContent"

import styles from './PrivacyPolicy.module.css'
type Props = {
  params: { lang: Locale };
};

export default async function Page({ params }: { params: any }) {
  // const { privacyPolicy} = await getDictionary(params.lang);
  const dictionary: any = await getDictionary(params.lang);
  const privacyPolicy = dictionary.privacyPolicy;
  return (
    <main>
      <PrivacyPolicyContent dictionary={privacyPolicy}/>
    </main>
  );
};