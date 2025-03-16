'use client';
import NavPath from '@/app/components/NavPath/NavPath';
import Image from 'next/image';
import styles from './GuaranteesContent.module.css';

type Props = {
  dictionary: any;
};

const GuaranteesContent = ({ dictionary }: Props) => {
  return (
    <section className={styles.guaranteesSection}>
      <div className={styles.heroSection}></div>
      <div className={styles.guaranteesContent}>
        <NavPath />
        <div className={styles.guaranteesTitle}>
          <h1>{dictionary.title}</h1>
        </div>
        <p>{dictionary.paragraph1}</p>
        <p>{dictionary.paragraph2}</p>
        <p>{dictionary.paragraph3}</p>
        <p>{dictionary.paragraph4}</p>
      </div>
    </section>
  );
};

export default GuaranteesContent;
