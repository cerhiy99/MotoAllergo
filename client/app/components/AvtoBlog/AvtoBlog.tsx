'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './AvtoBlog.module.css';
import Link from 'next/link';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

type DictionaryType = {
  title: string;
  news: string[][];
};

type Props = {
  dictionary: DictionaryType;
};

const AvtoBlog = ({ dictionary }: Props) => {
  const [isUa, setIsUa] = useState(true);
  const [startIndex, setStartIndex] = useState(0);
  const [direction, setDirection] = useState('right');
  const ref = useRef<HTMLDivElement>(null);

  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLLIElement[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  let newsPerPage = window.innerWidth > 501 ? 3 : 1;




  useEffect(() => {
    itemsRef.current.forEach((item) => {
      if (item) {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
        item.style.transition = 'all 0.5s ease-out';
      }
    });

    const animateItems = () => {
      itemsRef.current.forEach((item, index) => {
        if (item) {
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
          }, index * 150);
        }
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          animateItems();
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const nextNews = () => {
    if (startIndex + newsPerPage < dictionary.news.length) {
      setDirection('right');
      setStartIndex(startIndex + newsPerPage);
    }
  };

  const prevNews = () => {
    if (startIndex - newsPerPage >= 0) {
      setDirection('left');
      setStartIndex(startIndex - newsPerPage);
    }
  };

  const getTransitionClasses = () => {
    return direction === 'right'
      ? {
          enter: styles.fadeInRight,
          enterActive: styles.fadeInRightActive,
          exit: styles.fadeOut,
          exitActive: styles.fadeOutActive,
        }
      : {
          enter: styles.fadeInLeft,
          enterActive: styles.fadeInLeftActive,
          exit: styles.fadeOut,
          exitActive: styles.fadeOutActive,
        };
  };




  return (
    <div ref={sectionRef} className={styles.avtoBlogWrapper}>
      <h1 className={styles.avtoBlogTitle}>{dictionary.title}</h1>
      <div className={styles.navigationIcons}>
        <i
          className={`fa-solid fa-chevron-left ${startIndex === 0 ? styles.disabled : ''}`}
          onClick={prevNews}
        ></i>
        <i
          className={`fa-solid fa-chevron-right ${(startIndex + newsPerPage >= dictionary.news.length) ? styles.disabled : ''}`}
          onClick={nextNews}
        ></i>
      </div>
      <TransitionGroup component="ul" className={styles.avtoBlogList}>
        {dictionary.news.slice(startIndex, startIndex + newsPerPage).map((item, index) => (
          <CSSTransition
            key={startIndex + index}
            timeout={{ enter: 500, exit: 0 }}
            classNames={getTransitionClasses()}
          >
            <li ref={(el) => (itemsRef.current[index] = el!)} className={styles.avtoBlogEl}>
              <Link href={`/news/${startIndex + index + 1}`}>
                <h2>{item[0]}</h2>
                <div className={styles.line}></div>
                <p>{item[1]}</p>
              </Link>
            </li>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default AvtoBlog;