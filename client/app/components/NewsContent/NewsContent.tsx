'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './NewsContent.module.css';
import Link from 'next/link';
import NavPath from '@/app/components/NavPath/NavPath';

type NewsItem = [string, string];
type NewsDictionary = {
  news: {
    title: string;
    news: NewsItem[];
  };
};

type Props = {
  dictionary: NewsDictionary;
};

const NewsContent = ({ dictionary }: Props) => {
  const newsPerPage = 12;
  const newsList = dictionary.news.news;
  const totalPages = Math.ceil(newsList.length / newsPerPage);

  const [currentPage, setCurrentPage] = useState(1);
  const [isInitialized, setIsInitialized] = useState(false); 
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLLIElement[]>([]);

  useEffect(() => {
    setIsInitialized(true);

    const animateItems = () => {
      itemsRef.current.forEach((item, index) => {
        if (item) {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.9)';
          item.style.transition = 'all 0.5s ease-out';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, index * 150);
        }
      });
    };

    const handleMouseEnter = (item: HTMLLIElement) => {
      item.style.transform = 'scale(1.03)';
      const line = item.querySelector(`.${styles.line}`);
      if (line) {
        line.style.width = '50%';
      }
    };

    const handleMouseLeave = (item: HTMLLIElement) => {
      item.style.transform = 'scale(1)';
      item.style.boxShadow = 'none';
      const line = item.querySelector(`.${styles.line}`);
      if (line) {
        line.style.width = '25%';
      }
    };

    itemsRef.current.forEach((item) => {
      if (item) {
        item.addEventListener('mouseenter', () => handleMouseEnter(item));
        item.addEventListener('mouseleave', () => handleMouseLeave(item));
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          animateItems();
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin: '-50px 0px',
        threshold: 0.1
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
      itemsRef.current.forEach((item) => {
        if (item) {
          item.removeEventListener('mouseenter', () => handleMouseEnter(item));
          item.removeEventListener('mouseleave', () => handleMouseLeave(item));
        }
      });
    };
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      itemsRef.current = [];
      setIsInitialized(false);
      setTimeout(() => setIsInitialized(true), 0); 
    }
  };

  const addToRefs = (el: HTMLLIElement) => {
    if (el && !itemsRef.current.includes(el)) {
      itemsRef.current.push(el);
    }
  };

  const startIndex = (currentPage - 1) * newsPerPage;
  const currentNews = newsList.slice(startIndex, startIndex + newsPerPage);

  return (
    <div ref={sectionRef} className={styles.newsWrapper}>
      <NavPath />
      <h1 className={styles.newsTitle}>{dictionary.news.title}</h1>
      <ul className={`${styles.newsList} ${!isInitialized ? styles.hidden : ''}`}>
        {currentNews.map(([title, content], index) => (
          <li key={index} ref={addToRefs} className={styles.newsEl}>
            <Link href={`/news/${index + 1}`}>
              <h2>{title}</h2>
              <div className={styles.line}></div>
              <p>{content}</p>
            </Link>
          </li>
        ))}
      </ul>
      <div className={styles.pagination}>
        <button
          className={`${styles.pageButton} ${currentPage === 1 ? styles.disabled : ''}`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          «
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={`${styles.pageNumber} ${currentPage === i + 1 ? styles.active : ''}`}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className={`${styles.pageButton} ${currentPage === totalPages ? styles.disabled : ''}`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          »
        </button>
      </div>
    </div>
  );
};

export default NewsContent;