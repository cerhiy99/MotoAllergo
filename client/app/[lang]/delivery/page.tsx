import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import React from 'react';
import PaymentDeliveryContent from "@/app/components/PaymentDeliveryContent/PaymentDeliveryContent"

import styles from './About.module.css'
type Props = {
  params: { lang: Locale };
};

const page = async ({ params: { lang } }: Props) => {
  const dictionary: any = await getDictionary(lang);
  const paymentDelivery = dictionary.paymentDelivery;

  return (
    <main>
      <PaymentDeliveryContent dictionary={paymentDelivery} />
    </main>
  );
};

export default page;