'use client';
import NavPath from '@/app/components/NavPath/NavPath';
import Image from 'next/image';
import styles from './PaymentDeliveryContent.module.css';

type Props = {
  dictionary: any;
};

const PaymentDeliveryContent = ({ dictionary }: Props) => {
  return (
    <section className={styles.paymentSection}>
      <div className={styles.paymentContent}>
        <NavPath />
        <div className={styles.paymentTitle}>
          <h1>{dictionary.title}</h1>
        </div>
        <p>{dictionary.paragraph1}</p>
        <img className={styles.paymentImg} src="/images/delivery.jpg" alt="" />
        <h2>{dictionary.subtitle1}</h2>
        <ul className={styles.paymentList}>
          <li>{dictionary.listItem1}</li>
          <li>{dictionary.listItem2}</li>
          <li>{dictionary.listItem3}</li>
          <li>{dictionary.listItem4}</li>
          <p>{dictionary.paragraph2}</p>
        </ul>
        <h2>{dictionary.subtitle2}</h2>
        <ul className={styles.paymentList}>
          <li>{dictionary.listItem5}</li>
        </ul>
        <p>{dictionary.paragraph3}</p>
        <h2>{dictionary.subtitle3}</h2>
        <p>{dictionary.paragraph4}</p>
        <img className={styles.paymentImg} src="/images/visa.jpg" alt="" />
        <ul className={styles.paymentList}>
          <li>{dictionary.listItem6}</li>
          <li>{dictionary.listItem7}</li>
        </ul>
        <h2>{dictionary.subtitle4}</h2>
        <p>{dictionary.paragraph5}</p>
        <p>{dictionary.paragraph6}</p>
        <ol className={styles.paymentNumberList}>
          <li>{dictionary.numberedListItem1}</li>
          <li>{dictionary.numberedListItem2}</li>
          <li>{dictionary.numberedListItem3}</li>
          <li>{dictionary.numberedListItem4}</li>
        </ol>
      </div>
    </section>
  );
};

export default PaymentDeliveryContent;