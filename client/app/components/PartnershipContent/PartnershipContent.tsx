'use client';
import NavPath from '@/app/components/NavPath/NavPath';
import Image from 'next/image';
import styles from './PartnershipContent.module.css';

type Props = {
  dictionary: any;
};

const PartnershipContent = ({ dictionary }: Props) => {
  return (
    <section className={styles.partnershipSection}>
      <div className={styles.heroSection}></div>
      <div className={styles.partnershipContent}>
        <NavPath />
        <div className={styles.partnershipTitle}>
          <h1>{dictionary.title}</h1>
        </div>
        <h2>{dictionary.subtitle1}</h2>
        <p>{dictionary.paragraph1}</p>
        <h2>{dictionary.subtitle2}</h2>
        <ol className={styles.partnershipNumberList}>
          <li className={styles.partnershipEl}>
            <span className={styles.highlightedText}>{dictionary.numberedListItem1Title}</span>{' '}
            {dictionary.numberedListItem1}
          </li>
          <li className={styles.partnershipEl}>
            <span className={styles.highlightedText}>{dictionary.numberedListItem2Title}</span>{' '}
            {dictionary.numberedListItem2}
          </li>
          <li className={styles.partnershipEl}>
            <span className={styles.highlightedText}>{dictionary.numberedListItem3Title}</span>{' '}
            {dictionary.numberedListItem3}
          </li>
          <li className={styles.partnershipEl}>
            <span className={styles.highlightedText}>{dictionary.numberedListItem4Title}</span>{' '}
            {dictionary.numberedListItem4}
          </li>
          <li className={styles.partnershipEl}>
            <span className={styles.highlightedText}>{dictionary.numberedListItem5Title}</span>{' '}
            {dictionary.numberedListItem5}
          </li>
        </ol>
        <h2>{dictionary.subtitle3}</h2>
        <ul className={styles.partnershipList}>
          <li className={styles.partnershipEl}>
            <span className={styles.highlightedText}>{dictionary.listItem1Title}</span>{' '}
            {dictionary.listItem1}
          </li>
          <li className={styles.partnershipEl}>
            <span className={styles.highlightedText}>{dictionary.listItem2Title}</span>{' '}
            {dictionary.listItem2}
          </li>
          <li className={styles.partnershipEl}>
            <span className={styles.highlightedText}>{dictionary.listItem3Title}</span>{' '}
            {dictionary.listItem3}
          </li>
        </ul>
      </div>
    </section>
  );
};

export default PartnershipContent;