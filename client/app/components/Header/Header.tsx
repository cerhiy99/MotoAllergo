"use client";

import { Locale } from '@/i18n.config';
import React from 'react';
import styles from "./Header.module.scss";  
import Image from 'next/image';
import Link from 'next/link';
import Icon from '../Icon/Icon';
import LanguageSwitch from '../LanguageSwitch/LanguageSwitch';

type Props = {
  lang: Locale;
};

const Header: React.FC<Props> = ({ lang }) => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        {/* Top row */}
        <div className={styles.topRow}>
          <div className={styles.contacts}>
            <ul>
              <li>
                <Icon src="/icons/area.svg" alt="Location" size={18} />
                <span>м. Львів, вул. Жовківська, 20</span>
              </li>
              <li>
                <Icon src="/icons/clock.svg" alt="Clock" size={18} />
                <span>8:00 - 22:00 Пн - Нд</span>
              </li>
              <li>
                <Icon src="/icons/phone.svg" alt="Phone" size={18} />
                <span>+38(093)-369-99-68</span>
              </li>
            </ul>
          </div>
          <div className={styles.socials}>
            {["viber", "telegram", "whatsapp", "facebook", "instagram"].map((name) => (
              <Link key={name} href="#">
                <Icon src={`/icons/${name}.svg`} alt={name} size={18} />
              </Link>
            ))}
          </div>
          <button className={styles.callBtn}>
            <Icon src="/icons/bell.svg" alt="Bell" size={16} />
            Замовити дзвінок
          </button>
        </div>

        {/* Middle row */}
        <div className={styles.middleRow}>
          <Link href="#">
            <Image src="/icons/logo.svg" alt="Logo" width={250} height={40} />
          </Link>
          <div className={styles.searchContainer}>
            <input type="text" placeholder="Пошук..." className={styles.searchInput} />
            <button className={styles.searchButton}>
              <Icon src="/icons/search.svg" alt="Search" size={20} />
            </button>
          </div>
        </div>

        {/* Bottom row + nav */}
        <div className={styles.navRow}>
          <nav className={styles.leftNav}>
            {["Про нас", "Каталог", "Оплата і доставка", "Гарантія", "Новини", "Партнерство", "Контакти"].map((item) => (
              <Link key={item} href="#">{item}</Link>
            ))}
          </nav>
          <div className={styles.rightNav}>
            <div className={styles.phone}>
              <Link href="#">
                <Icon src="/icons/phone.svg" alt="Phone" size={18} />
              </Link>
              <span>+380 98 519 3009</span>
            </div>
            <LanguageSwitch />
            <div className={styles.icons}>
              {["favorite", "basket"].map((icon) => (
                <Image key={icon} width={18} height={18} src={`/icons/${icon}.svg`} alt={icon} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
