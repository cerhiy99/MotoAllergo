import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import React from 'react';
import './Contact.scss';
import Link from 'next/link';
import Map from '@/app/components/Map/Map';
import NavPath from '@/app/components/NavPath/NavPath';
import ContactForm from '@/app/components/ContactForm/ContactForm';
import PhoneBig from '../../assets/Contact/phone_big.svg';
import Viber from '../../assets/icons/viber.svg';
import Telegram from '../../assets/icons/telegram.svg';
import Whatsapp from '../../assets/icons/whatsapp.svg';
import Facebook from '../../assets/icons/facebook.svg';
import Instagram from '../../assets/icons/inst.svg';
import AreaBig from '../../assets/Contact/area_big.svg';

type Props = {
  params: { lang: Locale };
};

const page = async ({ params: { lang } }: Props) => {
  const dictionary = await getDictionary(lang);
  return (
    <div>
      <Map />

      <div className="contacts-container">
        <NavPath />
        <div className="contacts">
          <ContactForm lang={lang} dictionary={dictionary.contactForm} />
          <div className="contacts-divider"></div>
          <div className="contacts-info">
            <div className="title-container">
              <h1>Контакти</h1>
              <div className="contacts-divider-info"></div>
            </div>
            <div className="info">
              <div className="info-contacts">
                <PhoneBig />
                <div className="info-contacts-text">
                  <p>
                    <span>Телефон: </span>+38 (093) 987 31 51
                  </p>
                  <p>
                    <span>Email: </span>youarebeautiful@hitomi.com.ua
                  </p>
                </div>
              </div>
              <div className="socials">
                <Link href="#">
                  <Viber />
                </Link>
                <Link href="#">
                  <Telegram />
                </Link>
                <Link href="#">
                  <Whatsapp />
                </Link>
                <Link href="#">
                  <Facebook />
                </Link>
                <Link href="#">
                  <Instagram />
                </Link>
              </div>
              <div className="info-divider"></div>
              <div className="info-text">
                <AreaBig />
                <div className="info-text-content">
                  <span>Інтернет-магазин</span>
                  <span>Графік роботи: </span>
                  <p>Понеділок - П’ятниця 09:00 - 21:00,</p>
                  <p>Субота 09:00 - 19:00, Неділя – вихідний</p>
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
