'use client';
import NavPath from '@/app/components/NavPath/NavPath';
import styles from './OfferAgreementContent.module.css';

type Props = {
  dictionary: any;
};

const OfferAgreementContent = ({ dictionary }: Props) => {
  return (
    <section className={styles.offerAgreementSection}>
      <div className={styles.offerAgreementContent}>
        <NavPath />
        <div className={styles.offerAgreementTitle}>
          <h1>{dictionary.title}</h1>
        </div>
        <p>{dictionary.paragraph1}</p>

        <h2>{dictionary.section1Title}</h2>
        <ul className={styles.offerAgreementList}>
          <li>
            <strong>{dictionary.section1ListItem1Title}</strong> - {dictionary.section1ListItem1}
          </li>
          <li>
            <strong>{dictionary.section1ListItem2Title}</strong> – {dictionary.section1ListItem2}
          </li>
          <li>
            <strong>{dictionary.section1ListItem3Title}</strong> – {dictionary.section1ListItem3}
          </li>
          <li>
            <strong>{dictionary.section1ListItem4Title}</strong> – {dictionary.section1ListItem4}
          </li>
        </ul>

        <h2>{dictionary.section2Title}</h2>
        <ul className={styles.offerAgreementList}>
          <li>
            <strong>{dictionary.section2ListItem1Title}</strong> {dictionary.section2ListItem1}
          </li>
          <li>
            <strong>{dictionary.section2ListItem2Title}</strong> {dictionary.section2ListItem2}
          </li>
        </ul>

        <h2>{dictionary.section3Title}</h2>
        <ul className={styles.offerAgreementList}>
          <li>
            <strong>{dictionary.section3ListItem1Title}</strong> {dictionary.section3ListItem1}
          </li>
          <li>
            <strong>{dictionary.section3ListItem2Title}</strong> {dictionary.section3ListItem2}
          </li>
          <li>
            <strong>{dictionary.section3ListItem3Title}</strong> {dictionary.section3ListItem3}
            <ul className={styles.offerAgreementListNested}>
              <li>
                <strong>{dictionary.section3ListItem3Nested1Title}</strong>{' '}
                {dictionary.section3ListItem3Nested1}
              </li>
              <li>
                <strong>{dictionary.section3ListItem3Nested2Title}</strong>{' '}
                {dictionary.section3ListItem3Nested2}
              </li>
              <li>
                <strong>{dictionary.section3ListItem3Nested3Title}</strong>{' '}
                {dictionary.section3ListItem3Nested3}
              </li>
              <li>
                <strong>{dictionary.section3ListItem3Nested4Title}</strong>{' '}
                {dictionary.section3ListItem3Nested4}
              </li>
            </ul>
          </li>
          <li>
            <strong>{dictionary.section3ListItem4Title}</strong> {dictionary.section3ListItem4}
          </li>
          <li>
            <strong>{dictionary.section3ListItem5Title}</strong> {dictionary.section3ListItem5}
          </li>
          <li>
            <strong>{dictionary.section3ListItem6Title}</strong> {dictionary.section3ListItem6}
          </li>
          <li>
            <strong>{dictionary.section3ListItem7Title}</strong> {dictionary.section3ListItem7}
          </li>
          <li>
            <strong>{dictionary.section3ListItem8Title}</strong> {dictionary.section3ListItem8}
          </li>
          <li>
            <strong>{dictionary.section3ListItem9Title}</strong> {dictionary.section3ListItem9}
            <ul className={styles.offerAgreementListNested}>
              <li>
                <strong>{dictionary.section3ListItem9Nested1Title}</strong>{' '}
                {dictionary.section3ListItem9Nested1}
              </li>
              <li>
                <strong>{dictionary.section3ListItem9Nested2Title}</strong>{' '}
                {dictionary.section3ListItem9Nested2}
              </li>
            </ul>
          </li>
        </ul>

        <h2>{dictionary.section4Title}</h2>
        <ul className={styles.offerAgreementList}>
          <li>
            <strong>{dictionary.section4ListItem1Title}</strong> {dictionary.section4ListItem1}
          </li>
          <li>
            <strong>{dictionary.section4ListItem2Title}</strong> {dictionary.section4ListItem2}
          </li>
          <li>
            <strong>{dictionary.section4ListItem3Title}</strong> {dictionary.section4ListItem3}
          </li>
          <li>
            <strong>{dictionary.section4ListItem4Title}</strong> {dictionary.section4ListItem4}
          </li>
          <li>
            <strong>{dictionary.section4ListItem5Title}</strong> {dictionary.section4ListItem5}
          </li>
          <li>
            <strong>{dictionary.section4ListItem6Title}</strong> {dictionary.section4ListItem6}
          </li>
          <li>
            <strong>{dictionary.section4ListItem7Title}</strong> {dictionary.section4ListItem7}
          </li>
          <li>
            <strong>{dictionary.section4ListItem8Title}</strong> {dictionary.section4ListItem8}
          </li>
          <li>
            <strong>{dictionary.section4ListItem9Title}</strong> {dictionary.section4ListItem9}
          </li>
          <li>
            <strong>{dictionary.section4ListItem10Title}</strong> {dictionary.section4ListItem10}
          </li>
        </ul>

        <h2>{dictionary.section5Title}</h2>
        <ul className={styles.offerAgreementList}>
          <li>
            <strong>{dictionary.section5ListItem1Title}</strong>
            <ul className={styles.offerAgreementListNested}>
              <li>
                <strong>{dictionary.section5ListItem1Nested1Title}</strong>{' '}
                {dictionary.section5ListItem1Nested1}
              </li>
              <li>
                <strong>{dictionary.section5ListItem1Nested2Title}</strong>{' '}
                {dictionary.section5ListItem1Nested2}
              </li>
            </ul>
          </li>
          <li>
            <strong>{dictionary.section5ListItem2Title}</strong>
            <ul className={styles.offerAgreementListNested}>
              <li>
                <strong>{dictionary.section5ListItem2Nested1Title}</strong>{' '}
                {dictionary.section5ListItem2Nested1}
              </li>
            </ul>
          </li>
          <li>
            <strong>{dictionary.section5ListItem3Title}</strong>
            <ul className={styles.offerAgreementListNested}>
              <li>
                <strong>{dictionary.section5ListItem3Nested1Title}</strong>{' '}
                {dictionary.section5ListItem3Nested1}
              </li>
              <li>
                <strong>{dictionary.section5ListItem3Nested2Title}</strong>{' '}
                {dictionary.section5ListItem3Nested2}
              </li>
            </ul>
          </li>
        </ul>

        <h2>{dictionary.section6Title}</h2>
        <ul className={styles.offerAgreementList}>
          <li>
            <strong>{dictionary.section6ListItem1Title}</strong> {dictionary.section6ListItem1}
          </li>
          <li>
            <strong>{dictionary.section6ListItem2Title}</strong> {dictionary.section6ListItem2}
          </li>
          <li>
            <strong>{dictionary.section6ListItem3Title}</strong> {dictionary.section6ListItem3}
          </li>
          <li>
            <strong>{dictionary.section6ListItem4Title}</strong> {dictionary.section6ListItem4}
          </li>
          <li>
            <strong>{dictionary.section6ListItem5Title}</strong> {dictionary.section6ListItem5}
          </li>
          <li>
            <strong>{dictionary.section6ListItem6Title}</strong> {dictionary.section6ListItem6}
          </li>
          <li>
            <strong>{dictionary.section6ListItem7Title}</strong> {dictionary.section6ListItem7}
          </li>
          <li>
            <strong>{dictionary.section6ListItem8Title}</strong> {dictionary.section6ListItem8}
          </li>
        </ul>

        <h2>{dictionary.section7Title}</h2>
        <ul className={styles.offerAgreementList}>
          <li>
            <strong>{dictionary.section7ListItem1Title}</strong> {dictionary.section7ListItem1}
          </li>
          <li>
            <strong>{dictionary.section7ListItem2Title}</strong> {dictionary.section7ListItem2}
          </li>
          <li>
            <strong>{dictionary.section7ListItem3Title}</strong> {dictionary.section7ListItem3}
          </li>
          <li>
            <strong>{dictionary.section7ListItem4Title}</strong> {dictionary.section7ListItem4}
          </li>
        </ul>

        <h2>{dictionary.section8Title}</h2>
        <ul className={styles.offerAgreementList}>
          <li>
            <strong>{dictionary.section8ListItem1Title}</strong> {dictionary.section8ListItem1}
          </li>
          <li>
            <strong>{dictionary.section8ListItem2Title}</strong> {dictionary.section8ListItem2}
          </li>
          <li>
            <strong>{dictionary.section8ListItem3Title}</strong> {dictionary.section8ListItem3}
          </li>
        </ul>

        <h2>{dictionary.section9Title}</h2>
        <ul className={styles.offerAgreementList}>
          <li>
            <strong>{dictionary.section9ListItem1Title}</strong> {dictionary.section9ListItem1}
          </li>
          <li>
            <strong>{dictionary.section9ListItem2Title}</strong> {dictionary.section9ListItem2}
          </li>
          <li>
            <strong>{dictionary.section9ListItem3Title}</strong> {dictionary.section9ListItem3}
          </li>
        </ul>
      </div>
    </section>
  );
};

export default OfferAgreementContent;