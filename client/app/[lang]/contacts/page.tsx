import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import React from 'react';
import './Contact.scss';
import Link from 'next/link';
//import Svg from '../../assest/Contact/';

type Props = {
  params: { lang: Locale };
};

const page = async ({ params: { lang } }: Props) => {
  const { contact } = await getDictionary(lang);
  return (
    <div className="contacts-container">
      <Link href={`/${lang}/cookies`}>Contacts Page</Link>
    </div>
  );
};

export default page;
