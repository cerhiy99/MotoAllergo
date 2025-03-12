'use client';

import styles from './HowWeWork.module.css';
import Image from 'next/image';
import ONE from '../../../public/images/icons/step-zero-first.svg'
import TWO from '../../../public/images/icons/step-zero-second.svg'
import THREE from '../../../public/images/icons/step-zero-third.svg'
import FOUR from '../../../public/images/icons/step-zero-fourth.svg'

const HowWeWork: React.FC = () => {
  return (
    <section className={styles.howWeWork}>
      <h2 className={styles.title}>Як <span> ми</span> працюємо?</h2>
      <div className={styles.steps}>
        <div className={styles.firstStep}>
          <div className={styles.step}>
            <div className={styles.stepNumbers}>
              <ONE fill="currentColor" />
            </div>
            <div className={styles.stepIconTextWrapper}>
              <Image src="/images/icons/step-cart.svg" alt="Cart" width={50} height={50} />
              <div className={styles.stepText}>
                <p>Оформлення замовлення</p>
                <p>Виберіть відповідний товар для себе на сайті і зробіть замовлення.</p>
              </div>
            </div>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNumbers}>
              <TWO />
            </div>
            <div className={styles.stepIconTextWrapper}>
              <Image src="/images/icons/step-operator.svg" alt="Cart" width={60} height={60} />
              <div className={styles.stepText}>
                <p>Зворотній зв’язок</p>
                <p>Протягом 20 хвилин ми зв'яжемось з Вами, для деталізації замовлення.</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.secondStep}>
          <div className={styles.step}>
            <div className={styles.stepNumbers}>
              <THREE />
            </div>
            {/* <Image src="/images/icons/step-zero-third.svg" alt="Cart" width={150} height={95} /> */}
            <div className={styles.stepIconTextWrapper}>
              <Image src="/images/icons/step-stock.svg" alt="Cart" width={65} height={65} />
              <div className={styles.stepText}>
                <p>Замовлення товару</p>
                <p>Замовляється даний товар в Польщі на базі. Перевіряється на якість.</p>
              </div>
            </div>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNumbers}>
              <FOUR />
            </div>
            {/* <Image src="/images/icons/step-zero-fourth.svg" alt="Cart" width={150} height={95} /> */}
            <div className={styles.stepIconTextWrapper}>
              <Image src="/images/icons/step-truck.svg" alt="Cart" width={65} height={65} />
              <div className={styles.stepText}>
                <p>Доставка товару</p>
                <p>Відповідний товар доставляється на склад, а потім до покупця.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;