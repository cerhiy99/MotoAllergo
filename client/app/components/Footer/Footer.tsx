import React from 'react';
import { Locale } from '@/i18n.config';
import Link from 'next/link';
import styles from './Footer.module.css';
import SubscribeForm from './SubscribeForm'
type Props = {
  dictionary: any;
};

const Footer = ({ dictionary }: Props) => {
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
                <a href="/about">{dictionary.about}</a>
              </li>
              <li>
                <a href="/catalog">{dictionary.catalog}</a>
              </li>
              <li>
                <a href="/news">{dictionary.news}</a>
              </li>
              <li>
                <a href="/partnership">{dictionary.partnership}</a>
              </li>
              <li>
                <a href="/contacts">{dictionary.contacts}</a>
              </li>
            </ul>
          </li>
          <li className={styles.footerEl}>
            <h2 className={styles.footerElHeader}>{dictionary.customerService}</h2>
            <ul className={styles.footerElList}>
              <li>
                <Link href="/offer_agreement/">{dictionary.offerAgreement}</Link>
              </li>
              <li>
                <Link href="/privacy_policy/">{dictionary.privacyPolicy}</Link>
              </li>
              <li>
                <Link href="/delivery">{dictionary.delivery}</Link>
              </li>
              <li>
                <Link href="/guarantees">{dictionary.guarantees}</Link>
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
                <Link href="/offer_agreement/" target="_blank">
                  {dictionary.bottomOfferAgreement}
                </Link>
              </li>
              <li>
                <Link href="/privacy_policy/" target="_blank">
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
