import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import React from 'react';
import './Contact.scss';
import Link from 'next/link';
import Map from '@/app/components/Map/Map';
import NavPath from '@/app/components/NavPath/NavPath';
import ContactForm from '@/app/components/ContactForm/ContactForm';
import PhoneBig from '../../assets/icons/phone_big.svg';
import Viber from '../../assets/icons/viber.svg';
import Telegram from '../../assets/icons/telegram.svg';
import Whatsapp from '../../assets/icons/whatsapp.svg';
import Facebook from '../../assets/icons/facebook.svg';
import Instagram from '../../assets/icons/inst.svg';
import AreaBig from '../../assets/icons/area_big.svg';

type Props = {
  params: { lang: Locale };
};

const page = async ({ params: { lang } }: Props) => {
  const { contact } = await getDictionary(lang);
  return (
    <div>
      <Map />
      <div className="contacts-container">
        <NavPath />
        <div className="contacts">
          <ContactForm dictionary={contact.ContactForm}/>
          <div className="contacts-info">
            <div className="title-container">
              <h1>{contact.title}</h1>
            </div>
            <div className="info">
              <div className="info-contacts">
                <PhoneBig />
                <div className="info-contacts-text">
                  <p>
                    <span>{contact.phone} </span>
                    <a href="tel:+380994114414">+38 (099) 411-44-14</a>
                  </p>
                  <p>
                    <span>Email: </span>
                    <a href='mailto:carfixinfo4@gmail.com'>carfixinfo4@gmail.com</a>
                  </p>
                </div>
              </div>
              <div className="socials">
                <Link href="viber://chat?number=%2B380994114414">
                  <Viber />
                </Link>
                <Link href="#">
                  <Telegram />
                </Link>
                <Link href="https://wa.me/380994114414">
                  <Whatsapp />
                </Link>
                <Link href="#">
                  <Facebook />
                </Link>
                <Link href="#">
                  <Instagram />
                </Link>
              </div>
              <div className="info-text">
                <AreaBig />
                <div className="info-text-content">
                  <span>{contact.internetShop}</span>
                  <span>{contact.graphWorkTitle}</span>
                  <p>{contact.graphWorkDescription1}</p>
                  <p>{contact.graphWorkDescription2}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;