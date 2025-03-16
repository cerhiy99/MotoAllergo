'use client';
import NavPath from '@/app/components/NavPath/NavPath';
import Image from 'next/image';
import styles from './AboutContent.module.css';

type Props = {
  dictionary: any;
};
const AboutContent = ({ dictionary }: Props) => {
  return (
    <section className={styles.sectionAbout}>
      <div className={styles.heroSection}></div>
      <div className={styles.aboutContent}>
        <NavPath />
        <div className={styles.titleContainer}>
          <h1>{dictionary.title}</h1>
        </div>
        <p className={`${styles.sectionPara}`}>
          {dictionary.companyIntroduction}
        </p>
        <p className={`${styles.sectionPara}`}>
          {dictionary.polishSuppliers}
        </p>
        <h2 className={`${styles.sectionSubtitle}`}>{dictionary.advantagesTitle}</h2>
        <ul className={styles.advantagesList}>
          <li className={`${styles.sectionPara}`}>
            {dictionary.certifiedProducts}
          </li>
          <li className={`${styles.sectionPara}`}>
            {dictionary.customerBenefits}
          </li>
          <li className={`${styles.sectionPara}`}>
            {dictionary.efficientLogistics}
          </li>
          <li className={`${styles.sectionPara}`}>
            {dictionary.reliableSuppliers}
          </li>
          <li className={`${styles.sectionPara}`}>
            {dictionary.easySearch}
          </li>
          <li className={`${styles.sectionPara}`}>
            {dictionary.expertConsultation}
          </li>
          <li className={`${styles.sectionPara}`}>
            {dictionary.customerSolutions}
          </li>
        </ul>
        <h2 className={`${styles.sectionSubtitle}`}>{dictionary.rulesTitle}</h2>
        <ul className={styles.rulesList}>
          <li className={`${styles.sectionPara}`}>
            {dictionary.customerFirst}
          </li>
          <li className={`${styles.sectionPara}`}>
            {dictionary.speedAndAccuracy}
          </li>
        </ul>
        <p className={`${styles.sectionPara}`}>
          {dictionary.notSellers}
        </p>
        <p className={`${styles.sectionPara}`}>
          {dictionary.reliableDelivery}
        </p>
      </div>
    </section>
  );
};

export default AboutContent;