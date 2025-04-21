'use client';

import styles from './SuccessOrder.module.css';
import Link from 'next/link';
import NavPath from '@/app/components/NavPath/NavPath';

type Props = {
  dictionary: any;
  lang: string;
};

export default function SuccessOrderComponent({ dictionary,lang}: Props) {
  return (
    <div className={styles.successContainer}>
      <NavPath />
      <div className={styles.contentWrapper}>
        <div className={styles.successContent}>
          <h1 className={styles.successTitle}>
            <span>{dictionary.thankYou}</span> {dictionary.forPurchase}
          </h1>
          <p className={styles.orderNumber}>
            {dictionary.orderNumber.replace('{number}', '35262')}
          </p>
          <p className={styles.priceInfo}>
            {/* {dictionary.storeInfo.replace('{count}', '32.000.000')} <br /> */}
            {dictionary.comeBack}
            <br />
            {dictionary.withLove} <i className="fa-solid fa-heart"></i> Car Fix Info
          </p>
          <Link href={`/${lang}/catalog`} className={styles.continueShoppingButton}>
            {dictionary.continueShopping}
          </Link>
        </div>
        <div className={styles.carImage}>
          <img src="/images/confirm-auto.jpg" alt="" />
        </div>
      </div>
    </div>
  );
}