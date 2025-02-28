'use client';

import { useState } from 'react';
import styles from './NewsContent.module.css';
import Link from 'next/link';
import NavPath from '@/app/components/NavPath/NavPath';
type NewsItem = [string, string]; // [title, content]
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

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const startIndex = (currentPage - 1) * newsPerPage;
  const currentNews = newsList.slice(startIndex, startIndex + newsPerPage);

  return (
    <div className={styles.newsWrapper}>
      <NavPath/>
      <h1 className={styles.newsTitle}>{dictionary.news.title}</h1>
      <ul className={styles.newsList}>
        {currentNews.map(([title, content], index) => (
          <li key={index} className={styles.newsEl}>
            <h2>
              <Link href={`/news/${index + 1}`}>{title}</Link> {/* Посилання на новину за ID (1, 2 тощо) */}
            </h2>
            <div className={styles.line}></div>
            <p>{content}</p>
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