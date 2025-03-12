import React from 'react';
import { Locale } from '@/i18n.config';
import Link from 'next/link';
import styles from './Footer.module.css';
import SubscribeForm from './SubscribeForm'
type Props = {
  lang: Locale;
};

const Footer = (props: Props) => {
  return (

    <footer className={styles.footer}>
      <div className={styles.footerLine}></div>
      <div className={styles.footerWrapper}>
        <ul className={styles.footerList}>
          <li className={styles.footerEl}></li>
          <li className={styles.footerEl}>
            <h2 className={styles.footerElHeader}>MotoAllergo</h2>
            <ul className={styles.footerElList}>
              <li>
                <a href="/about">Про нас</a>
              </li>
              <li>
                <a href="/catalog">Каталог</a>
              </li>
              <li>
                <a href="/news">Новини</a>
              </li>
              <li>
                <a href="/partnership">Партнерство</a>
              </li>
              <li>
                <a href="/contacts">Контакти</a>
              </li>
            </ul>
          </li>
          <li className={styles.footerEl}>
            <h2 className={styles.footerElHeader}>Обслуговування клієнтів</h2>
            <ul className={styles.footerElList}>
              <li>
                <Link href="/offer_agreement/">
                  Договір оферти
                </Link>
              </li>
              <li>
                <Link href="/privacy_policy/">Політика конфіденційності</Link>
              </li>
              <li>
                <Link href="/delivery">Оплата і доставка</Link>
              </li>
              <li>
                <Link href="/guarantees">Наша гарантія</Link>
              </li>
            </ul>
          </li>
          <li className={styles.footerEl}>
            <SubscribeForm />
          </li>
          <li className={styles.footerEl}></li>
        </ul>
      </div>
      <div className={styles.lastBlock}>
        <ul className={styles.lastBlockList}>
          <li className={styles.lastBlockEl}>© Всі права захищені 2025 «Big Master»</li>
          <li className={styles.lastBlockEl}>
            Цей сайт розроблено веб-студією{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://fullstack-innovation.com/"
              className={styles.footerLink}
            >
              «FullStack-Innovations»
            </a>
          </li>
          <li className={styles.lastBlockEl}>
            <ul>
              <li>
                <Link href="/offer_agreement/" target="_blank">
                  Договір оферти
                </Link>
              </li>
              <li>
                <Link href="/privacy_policy/" target="_blank">
                  Політика Конфіденційності
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
