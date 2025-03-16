'use client';

import Image from 'next/image';
import styles from './HowWeWork.module.css';
import ONE from '../../../public/images/icons/step-zero-first.svg';
import TWO from '../../../public/images/icons/step-zero-second.svg';
import THREE from '../../../public/images/icons/step-zero-third.svg';
import FOUR from '../../../public/images/icons/step-zero-fourth.svg';
import { useEffect, useRef } from 'react';

type Props = {
  dictionary: any;
};

const HowWeWork: React.FC<Props> = ({ dictionary }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    stepsRef.current.forEach((step) => {
      if (step) {
        step.style.opacity = '0';
        step.style.transform = 'translateX(-20px)';
        step.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
      }
    });

    const animateSteps = () => {
      stepsRef.current.forEach((step, index) => {
        if (step) {
          setTimeout(() => {
            step.style.opacity = '1';
            step.style.transform = 'translateX(0)';
          }, index * 500);
        }
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          animateSteps();
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin: '-50px 0px',
        threshold: 0.2
      }
    );

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !stepsRef.current.includes(el)) {
      stepsRef.current.push(el);
    }
  };

  return (
    <section ref={sectionRef} className={styles.howWeWork}>
      <h2 className={styles.title}>
        {dictionary.title.split(dictionary.titleHighlight)[0]}
        <span>{dictionary.titleHighlight}</span>
        {dictionary.title.split(dictionary.titleHighlight)[1] || ''}
      </h2>
      <div className={styles.steps}>
        <div className={styles.firstStep}>
          <div ref={addToRefs} className={styles.step}>
            <div className={styles.stepNumbers}>
              <ONE fill="currentColor" />
            </div>
            <div className={styles.stepIconTextWrapper}>
              <Image src="/images/icons/step-cart.svg" alt="Cart" width={50} height={50} />
              <div className={styles.stepText}>
                <p>{dictionary.step1Title}</p>
                <p>{dictionary.step1Description}</p>
              </div>
            </div>
          </div>
          <div ref={addToRefs} className={styles.step}>
            <div className={styles.stepNumbers}>
              <TWO />
            </div>
            <div className={styles.stepIconTextWrapper}>
              <Image src="/images/icons/step-operator.svg" alt="Cart" width={60} height={60} />
              <div className={styles.stepText}>
                <p>{dictionary.step2Title}</p>
                <p>{dictionary.step2Description}</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.secondStep}>
          <div ref={addToRefs} className={styles.step}>
            <div className={styles.stepNumbers}>
              <THREE />
            </div>
            <div className={styles.stepIconTextWrapper}>
              <Image src="/images/icons/step-stock.svg" alt="Cart" width={65} height={65} />
              <div className={styles.stepText}>
                <p>{dictionary.step3Title}</p>
                <p>{dictionary.step3Description}</p>
              </div>
            </div>
          </div>
          <div ref={addToRefs} className={styles.step}>
            <div className={styles.stepNumbers}>
              <FOUR />
            </div>
            <div className={styles.stepIconTextWrapper}>
              <Image src="/images/icons/step-truck.svg" alt="Cart" width={65} height={65} />
              <div className={styles.stepText}>
                <p>{dictionary.step4Title}</p>
                <p>{dictionary.step4Description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;