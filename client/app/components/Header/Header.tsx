import { Locale } from '@/i18n.config';
import React from 'react';
import './Header.scss';
import Image from 'next/image';
import Link from 'next/link';
import Icon from '../Icon/Icon';
import LanguageSwitch from '../LanguageSwich/LanguageSwitch';

type Props = {
  lang: Locale;
};

const Header = (props: Props) => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="topRow">
          <div className="contacts">
            <ul>
              <li>
                <Icon src="/icons/area.svg" alt="Area" size={18} />
                <p>м. Львів, вул. Жовковська, 20</p>
              </li>
              <li>
                <Icon src="/icons/clock.svg" alt="Clock" size={18} />
                <p>8:00 - 22:00 Пн - Нд</p>
              </li>
              <li>
                <Icon src="/icons/phone.svg" alt="Phone" size={18} />
                <p>+38(093)-369-99-68</p>
              </li>
            </ul>
          </div>
          <div className="socials">
            <Link href="#">
              <Icon src="/icons/viber.svg" alt="Viber" size={18} />
            </Link>
            <Link href="#">
              <Icon src="/icons/telegram.svg" alt="Telegram" size={18} />
            </Link>
            <Link href="#">
              <Icon src="/icons/whatsapp.svg" alt="Whatsapp" size={18} />
            </Link>
            <Link href="#">
              <Icon src="/icons/facebook.svg" alt="Facebook" size={18} />
            </Link>
            <Link href="#">
              <Icon src="/icons/instagram.svg" alt="Instagram" size={18} />
            </Link>
          </div>
          <button className="callBtn">
            <Icon src="/icons/bell.svg" alt="Bell" size={16} />
            Замовити дзвінок
          </button>
        </div>

        <div className="middleRow">
          <Link href="#">
            <Image src="/icons/logo.svg" alt="Logo" width={300} height={40} />
          </Link>
          <div className="search-container">
            <input
              type="text"
              placeholder="Пошук..."
              className="search-input"
            />
            <button className="search-button">
              <Icon src="/icons/search.svg" alt="Search" size={20} />
            </button>
          </div>
        </div>

        <div className="navRow">
          <nav className="leftNav">
            <Link href="#">Про нас</Link>
            <Link href="#">Каталог</Link>
            <Link href="#">Оплата і доставка</Link>
            <Link href="#">Гарантія</Link>
            <Link href="#">Новини</Link>
            <Link href="#">Партнерство</Link>
            <Link href="#">Контакти</Link>
          </nav>
          <div className="rightNav">
            <div className="phone">
              <Link href="#">
                <Icon src="/icons/phone.svg" alt="Phone" size={18} />
              </Link>

              <p>+380 98 519 3009</p>
            </div>
            <LanguageSwitch />
            <div className="icons">
              <Image
                width={18}
                height={18}
                src="/icons/favorite.svg"
                alt="Favorite"
              />
              <Image
                width={18}
                height={18}
                src="/icons/basket.svg"
                alt="Basket"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
