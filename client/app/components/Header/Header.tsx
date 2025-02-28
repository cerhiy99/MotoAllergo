'use client';

import { useState, useTransition } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Header.module.css';
import Logo from '../../assets/icons/logo.svg';
import Viber from '../../assets/icons/viber.svg';
import Telegram from '../../assets/icons/telegram.svg';
import Whatsapp from '../../assets/icons/whatsapp.svg';
import Facebook from '../../assets/icons/facebook.svg';
import Instagram from '../../assets/icons/inst.svg';
import Heart from '../../assets/icons/heart.svg';
import Cart from '../../assets/icons/cart.svg';
type Props = {
  lang:any,
  dictionary: any;
};

const Header= ({ lang,dictionary }: Props) => {
  const [isUa, setIsUa] = useState(lang === 'uk');
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const toggleLanguage = () => {
    const newLang = isUa ? 'ru' : 'uk';
    setIsUa(!isUa);
  
    startTransition(() => {
      const newPath = pathname.replace(/\/(uk|ru)/, `/${newLang}`);
      router.replace(newPath);
      router.refresh();
    });
  };

  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <div className={styles.contactInfo}>
          <span className={styles.location}>
            <i className="fa-solid fa-location-dot"></i>
            м. Львів, вул. Жовківська, 20
          </span>
          <span className={styles.workHours}>
            <i className="fa-solid fa-clock"></i>
            8:00 - 22:00 Пн - Нд
          </span>
          <a href="tel:+380933699968" className={styles.phone}>
            <i className="fa-solid fa-phone-volume"></i>
            +38(093)-369-99-68
          </a>
        </div>
        <div className={styles.socialWrapper}>
          <div className={styles.socialIcons}>
            <a href="https://viber.com" target="_blank" aria-label="Viber">
              <Viber />
            </a>
            <a href="https://t.me" target="_blank" aria-label="Telegram">
              <Telegram />
            </a>
            <a href="https://whatsapp.com" target="_blank" aria-label="WhatsApp">
              <Whatsapp />
            </a>
            <a href="https://facebook.com" target="_blank" aria-label="Facebook">
              <Facebook />
            </a>
            <a href="https://instagram.com" target="_blank" aria-label="Instagram">
              <Instagram />
            </a>
          </div>
          <button className={styles.callButton}>
            <i className="fa-regular fa-bell"></i>
            {dictionary.callBtn || 'Замовити дзвінок'} {/* Використовуємо dictionary з пропсів */}
          </button>
        </div>
      </div>
      <div className={styles.mainHeader}>
        <div className={styles.logo}>
          <Logo src="logotype-desktop.svg"
              alt="Logotype"
              layout="fill" />
        </div>
        <form className={styles.searchForm}>
          <input
            type="text"
            placeholder="МОТОРЧИК ПОВІТРОДУВКИ ОБІГРІВАЧА КОНДИЦІОНЕРА КОНДИЦИОНЕРА VW AUDI SKODA SEAT КОМПЛЕКТ"
            className={styles.searchInput}
          />
          <button type="submit" className={styles.searchButton}>
            <i className="fas fa-search"></i>
          </button>
        </form>
      </div>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li>
            <Link href="/about">Про нас</Link>
          </li>
          <li>
            <Link href="/catalog">Каталог</Link>
          </li>
          <li>
            <Link href="/delivery">Оплата та доставка</Link>
          </li>
          <li>
            <Link href="/guarantees">Гарантії</Link>
          </li>
          <li>
            <Link href="/news">Новини</Link>
          </li>
          <li>
            <Link href="/partnership">Партнерство</Link>
          </li>
          <li>
            <Link href="/contacts">Контакти</Link>
          </li>
        </ul>
        <div className={styles.TelWrapper}>
          <a href="tel:+380985193009" className={styles.phone}>
            <i className="fa-solid fa-phone-volume"></i>
            +(380) 98 519 3009
          </a>
        </div>
        <div className={styles.rightSectionButton}>
          <button
            className={`${styles.languageToggle} ${isUa ? styles.uaActive : styles.ruActive}`}
            onClick={toggleLanguage}
            aria-label="Toggle language"
            disabled={isPending}
          >
            <span className={styles.languageText}>UA</span>
            <span className={styles.languageText}>RU</span>
          </button>
        </div>
        <div className={styles.cartIcons}>
          <Link href="/favorites" aria-label="Favorites">
            <Heart />
          </Link>
          <Link href="/cart" aria-label="Cart">
            <Cart />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;