'use client';

import { Locale } from '@/i18n.config';
import { usePathname } from 'next/navigation';
import React from 'react';
import './Header.scss';
import Link from 'next/link';
import LanguageSwitch from '../LanguageSwich/LanguageSwitch';
import Logo from '../../assets/icons/logo.svg';
import Area from '../../assets/icons/area.svg';
import Clock from '../../assets/icons/clock.svg';
import Phone from '../../assets/icons/phone.svg';
import Viber from '../../assets/icons/viber.svg';
import Telegram from '../../assets/icons/telegram.svg';
import Whatsapp from '../../assets/icons/whatsapp.svg';
import Facebook from '../../assets/icons/facebook.svg';
import Instagram from '../../assets/icons/inst.svg';
import Bell from '../../assets/icons/bell.svg';
import Search from '../../assets/icons/search.svg';
import Favorite from '../../assets/icons/favorite.svg';
import Basket from '../../assets/icons/basket.svg';

type Props = {
  lang: Locale;
  dictionary: any;
};

const Header = ({ lang, dictionary }: Props) => {
  const pathname = usePathname();

  return (
    <header className="header">
      <div className="header-container">
        <div className="topRow">
          <div className="contacts">
            <ul>
              <li>
                <Area />
                <p>м. Львів, вул. Жовковська, 20</p>
              </li>
              <li>
                <Clock />
                <p>8:00 - 22:00 Пн - Нд</p>
              </li>
              <li>
                <Phone />
                <Link href={'tel:+38(093)-369-99-68'}>+38(093)-369-99-68</Link>
              </li>
            </ul>
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
          <button className="callBtn">
            <Bell />
            {dictionary.callBtn}
          </button>
        </div>

        <div className="middleRow">
          <Link href={`/${lang}`}>
            <Logo width={300} height={40} />
          </Link>
          <div className="search-container">
            <input
              type="text"
              placeholder="Пошук..."
              className="search-input"
            />
            <button className="search-button">
              <Search />
            </button>
          </div>
        </div>

        <div className="navRow">
          <nav className="leftNav">
            {[
              { path: 'about-us', label: 'Про нас' },
              { path: 'catalog', label: 'Каталог' },
              { path: 'delivery', label: 'Оплата і доставка' },
              { path: 'warranty', label: 'Гарантія' },
              { path: 'news', label: 'Новини' },
              { path: 'partnership', label: 'Партнерство' },
              { path: 'contacts', label: 'Контакти' },
            ].map(({ path, label }) => (
              <Link
                key={path}
                href={`/${lang}/${path}`}
                className={pathname === `/${lang}/${path}` ? 'current' : ''}
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="rightNav">
            <div className="phone">
              <Phone />
              <Link href={'tel:+380985193009'}>+(380) 98 519 3009</Link>
            </div>
            <LanguageSwitch />
            <div className="icons">
              <Favorite width={27} height={25} />
              <Basket />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
