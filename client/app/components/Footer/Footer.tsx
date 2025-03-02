import { Locale } from '@/i18n.config';
import React from 'react';
import './Footer.scss';
import Link from 'next/link';

type Props = {
  lang: Locale;
  dictionary: any;
};

const Footer = ({ dictionary }: Props) => {
  return (
    <div className="footer-container">
      <div className="footer-content">
        <div className="footer-column"></div>
        <div className="footer-column">
          <h3>MotoAllegro</h3>
          <Link href="/about-us">{dictionary.aboutUs}</Link>
          <Link href="#">{dictionary.howToOrder}</Link>
          <Link href="#">{dictionary.news}</Link>
          <Link href="#">{dictionary.partnership}</Link>
          <Link href="#">{dictionary.contacts}</Link>
        </div>
        <div className="footer-column">
          <h3>{dictionary.customerService}</h3>
          <Link href="#">{dictionary.cookies}</Link>
          <Link href="#">{dictionary.privacyPolicy}</Link>
          <Link href="#">{dictionary.paymentAndDelivery}</Link>
          <Link href="#">{dictionary.guarantee}</Link>
        </div>
        <div className="footer-column newsletter">
          <h3>{dictionary.newsletter}</h3>
          <p>{dictionary.newsletterText}</p>
          <input type="email" />
          <div className="newsletter-checkbox">
            <input type="checkbox" id="terms" />
            <label htmlFor="terms">{dictionary.newsletterCheckbox}</label>
          </div>
          <Link href="#" className="terms-link">
            {dictionary.terms}
          </Link>
          <button>{dictionary.subscribeBtn}</button>
        </div>
        <div className="footer-column"></div>
      </div>
      <div className="footer-bottom">
        <p>© Всі права захищені 2025 «Big Master»</p>
        <p>
          Цей сайт розроблено веб-студією{' '}
          <Link href="https://fullstack-innovations.com">
            FullStack-Innovations
          </Link>
        </p>
        <div className="footer-links">
          <Link href="/cookies">Cookies</Link>
          <Link href="/privacy-policy">Політика Конфіденційності</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
