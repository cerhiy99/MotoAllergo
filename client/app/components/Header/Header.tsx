"use client";

import { Locale } from '@/i18n.config';
import React from 'react';
import styles from "./Header.module.scss";  
import Link from 'next/link';
import LanguageSwitch from '../LanguageSwitch/LanguageSwitch';

// Імпорт SVG-іконок
import AreaSVG from '../asset/area.svg';
import BasketSVG from '../asset/basket.svg';
import BellSVG from '../asset/bell.svg';
import ClockSVG from '../asset/clock.svg';
import FacebookSVG from '../asset/facebook.svg';
import FavoriteSVG from '../asset/favorite.svg';
import InstSVG from '../asset/inst.svg';
import LogoSVG from '../asset/logo.svg';
import PhoneSVG from '../asset/phone.svg';
import SearchSVG from '../asset/search.svg';
import TelegramSVG from '../asset/telegram.svg';
import ViberSVG from '../asset/viber.svg';
import WhatsappSVG from '../asset/whatsapp.svg';

type Props = {
  lang: Locale;
};

const Header: React.FC<Props> = ({ lang }) => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        
        {/* Верхній рядок */}
        <div className={styles.topRow}>
          <div className={styles.contacts}>
            <ul>
              <li>
                <AreaSVG />
                <span>м. Львів, вул. Жовківська, 20</span>
              </li>
              <li>
                <ClockSVG />
                <span>8:00 - 22:00 Пн - Нд</span>
              </li>
              <li>
                <PhoneSVG />
                <span>+38(093)-369-99-68</span>
              </li>
            </ul>
          </div>
          <div className={styles.socials}>
            <Link href="#"><ViberSVG /></Link>
            <Link href="#"><TelegramSVG /></Link>
            <Link href="#"><WhatsappSVG /></Link>
            <Link href="#"><FacebookSVG /></Link>
            <Link href="#"><InstSVG /></Link>
          </div>
          <button className={styles.callBtn}>
            <BellSVG />
            Замовити дзвінок
          </button>
        </div>

        {/* Середній рядок */}
        <div className={styles.middleRow}>
          <Link href="#">
            <LogoSVG />
          </Link>
          <div className={styles.searchContainer}>
            <input type="text" placeholder="Пошук..." className={styles.searchInput} />
            <button className={styles.searchButton}>
              <SearchSVG />
            </button>
          </div>
        </div>

        {/* Нижній рядок + навігація */}
        <div className={styles.navRow}>
          <nav className={styles.leftNav}>
            {["Про нас", "Каталог", "Оплата і доставка", "Гарантія", "Новини", "Партнерство", "Контакти"].map((item) => (
              <Link key={item} href="#">{item}</Link>
            ))}
          </nav>
          <div className={styles.rightNav}>
            <div className={styles.phone}>
              <Link href="#"><PhoneSVG /></Link>
              <span>+380 98 519 3009</span>
            </div>
            <LanguageSwitch />
            <div className={styles.icons}>
                <FavoriteSVG />
                <BasketSVG />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
