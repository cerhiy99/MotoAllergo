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
                <Link href="#">Про нас</Link>
              </li>
              <li>
                <Link href="#">Як замовити</Link>
              </li>
              <li>
                <Link href="#">Новини</Link>
              </li>
              <li>
                <Link href="#">Партнерство</Link>
              </li>
              <li>
                <Link href="#">Контакти</Link>
              </li>
            </ul>
          </li>
          <li className={styles.footerEl}>
            <h2 className={styles.footerElHeader}>Обслуговування клієнтів</h2>
            <ul className={styles.footerElList}>
              <li>
                <Link href="#">Файли Cookies</Link>
              </li>
              <li>
                <Link href="#">Політика конфіденційності</Link>
              </li>
              <li>
                <Link href="#">Оплата і доставка</Link>
              </li>
              <li>
                <Link href="#">Наша гарантія</Link>
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
              <li>Cookies</li>
              <li>
                <Link href="/privacy/" target="_blank">
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
