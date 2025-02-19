"use client";

import React from 'react';
import { Locale } from '@/i18n.config';
import styles from './Footer.module.scss'
import Link from 'next/link';

type Props = {
  lang: Locale;
};

const Footer = ({ lang }: Props) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.column}>
          <h4>MotoAllergo</h4>
          <ul>
            <li>Про нас</li>
            <li>Як замовити</li>
            <li>Новини</li>
            <li>Партнерство</li>
            <li>Контакти</li>
          </ul>
        </div>
        <div className={styles.column}>
          <h4>Обслуговування клієнтів</h4>
          <ul>
            <li>Файли Cookies</li>
            <li>Політика конфіденційності</li>
            <li>Оплата і доставка</li>
            <li>Наша гарантія</li>
          </ul>
        </div>
        <div className={styles.column}>
          <h4>Інформаційний бюлетень</h4>
          <p>
            Підпишіться на нашу розсилку, щоб Ви могли першими дізнаватися про новинки та акції на автозапчастини, а також отримувати корисні поради щодо їх вибору та експлуатації!
          </p>
          <input type="email" placeholder="Ваш email" />
          <div className={styles.checkbox}>
            <input type="checkbox" id="agree" />
            <label htmlFor="agree">Прийняти умови</label>
          </div>
          <Link href="#" className={styles.Regul}>Прочитайте умови та положення</Link>
          <button className={styles.subscribeButton}>Підписатися</button>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>© Всі права захищені 2025 <Link href="#">«Big Master»</Link></p>
        <p>Цей сайт розроблено веб-студією <Link href='#'>«FullStack-Innovations»</Link></p>
        <p><Link href="#"><b>Cookies</b></Link> <Link href='#'>Політика Конфіденційності</Link></p>
      </div>
    </footer>
  );
};

export default Footer;
