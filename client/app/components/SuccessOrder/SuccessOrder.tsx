'use client';

import styles from './SuccessOrder.module.css';
import Link from 'next/link';
import NavPath from '@/app/components/NavPath/NavPath';


export default function SuccessOrderComponent() {
  return (
    <div className={styles.successContainer}>
      <NavPath />
      <div className={styles.contentWrapper}>
        <div className={styles.successContent}>
          <h1 className={styles.successTitle}><span>Спасибі</span> за покупку!</h1>
          <p className={styles.orderNumber}>Замовлення №35262</p>
          <p className={styles.priceInfo}>
            У нас в магазині більш 32.000.000
            запчастин, чекаємо Вас, ще.
            З <i className="fa-solid fa-heart"></i> MotoAllegro
          </p>
          <Link href="/catalog" className={styles.continueShoppingButton}>
            Продовжити покупки
          </Link>
        </div>
        <div className={styles.carImage}>
          <img src="/images/confirm-auto.jpg" alt="" />
        </div>
      </div>
    </div>
  );
}