'use client';

import React from 'react';
import { Locale } from '@/i18n.config';
import Link from 'next/link';
import styles from './Footer.module.css';
import SubscribeForm from './SubscribeForm';

interface FooterProps {
  dictionary: any;
  lang: string; // Додаємо lang
}

const Footer = ({ dictionary, lang }: FooterProps) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerLine}></div>
      <div className={styles.footerWrapper}>
        <ul className={styles.footerList}>
          <li className={styles.footerEl}></li>
          <li className={styles.footerEl}>
            <h2 className={styles.footerElHeader}>{dictionary.companyName}</h2>
            <ul className={styles.footerElList}>
              <li>
                <Link href={`/${lang}/about`}>{dictionary.about}</Link>
              </li>
              <li>
                <Link href={`/${lang}/catalog`}>{dictionary.catalog}</Link>
              </li>
              <li>
                <Link href={`/${lang}/news`}>{dictionary.news}</Link>
              </li>
              <li>
                <Link href={`/${lang}/partnership`}>{dictionary.partnership}</Link>
              </li>
              <li>
                <Link href={`/${lang}/contacts`}>{dictionary.contacts}</Link>
              </li>
            </ul>
          </li>
          <li className={styles.footerEl}>
            <h2 className={styles.footerElHeader}>{dictionary.customerService}</h2>
            <ul className={styles.footerElList}>
              <li>
                <Link href={`/${lang}/offer_agreement`}>{dictionary.offerAgreement}</Link>
              </li>
              <li>
                <Link href={`/${lang}/privacy_policy`}>{dictionary.privacyPolicy}</Link>
              </li>
              <li>
                <Link href={`/${lang}/delivery`}>{dictionary.delivery}</Link>
              </li>
              <li>
                <Link href={`/${lang}/guarantees`}>{dictionary.guarantees}</Link>
              </li>
            </ul>
          </li>
          <li className={styles.footerEl}>
            <SubscribeForm dictionary={dictionary.subscribeForm} lang={lang} />
          </li>
          <li className={styles.footerEl}></li>
        </ul>
      </div>
      <div className={styles.lastBlock}>
        <ul className={styles.lastBlockList}>
          <li className={styles.lastBlockEl}>{dictionary.copyright}</li>
          <li className={styles.lastBlockEl}>
            {dictionary.developedBy}{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={dictionary.developerLink}
              className={styles.footerLink}
            >
              {dictionary.developerName}
            </a>
          </li>
          <li className={styles.lastBlockEl}>
            <ul>
              <li>
                <Link href={`/${lang}/offer_agreement`} target="_blank">
                  {dictionary.bottomOfferAgreement}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/privacy_policy`} target="_blank">
                  {dictionary.bottomPrivacyPolicy}
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