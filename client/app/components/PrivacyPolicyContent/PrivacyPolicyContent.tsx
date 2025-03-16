'use client';
import NavPath from '@/app/components/NavPath/NavPath';
import Image from 'next/image';
import styles from './PrivacyPolicyContent.module.css';
type Props = {
    dictionary: any;
};
const PrivacyPolicyContent = ({ dictionary }: Props) => {
    return (
        <section className={styles.sectionPrivacyPolicy}>
            <div className={styles.PrivacyPolicyContent}>
                <NavPath />
                <div className={styles.titleContainer}>
                    <h1>{dictionary.title}</h1>
                </div>
                <p className={`${styles.sectionPara}`}>{dictionary.paragraph1}</p>
                <p className={`${styles.sectionPara}`}>{dictionary.paragraph2}</p>
                <p className={`${styles.sectionPara}`}>{dictionary.paragraph3}</p>
                <p className={`${styles.sectionPara}`}>{dictionary.paragraph4}</p>
                <p className={`${styles.sectionPara}`}>{dictionary.paragraph5}</p>
                <p className={`${styles.sectionPara}`}>{dictionary.paragraph6}</p>
            </div>
        </section>
    );
};

export default PrivacyPolicyContent;