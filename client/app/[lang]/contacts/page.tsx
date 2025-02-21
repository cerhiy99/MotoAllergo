import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import React from 'react';
import './Contact.scss';
import Link from 'next/link';
import Map from '@/app/components/Map/Map';
import NavPath from '@/app/components/NavPath/NavPath';
import ContactForm from '@/app/components/ContactForm/ContactForm';

type Props = {
  params: { lang: Locale };
};

const page = async ({ params: { lang } }: Props) => {
  const { contact } = await getDictionary(lang);
  return (
    <div className="contacts-container">
      <Map />
      <NavPath />
      <div className="contacts">
        <ContactForm />
        <div className="contacts-divider"></div>
        <div className="contacts-info">
          <div className="title-container">
            <h1>КОНТАКТИ</h1>
            <div className="divider"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
