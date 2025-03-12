'use client';

import { useState } from 'react';
import styles from './AvtoBlog.module.css';

type Props = {
  dictionary: any;
};

const AvtoBlog = ({ dictionary }: Props) => {
  const [isUa, setIsUa] = useState(true);
  const [startIndex, setStartIndex] = useState(0);
  let newsPerPage = window.innerWidth > 501 ? 3 : 1;


  const nextNews = () => {
    if (startIndex + newsPerPage < dictionary.news.length) {
      setStartIndex(startIndex + newsPerPage);
    }
  };

  const prevNews = () => {
    if (startIndex - newsPerPage >= 0) {
      setStartIndex(startIndex - newsPerPage);
    }
  };

  return (
    <div className={styles.avtoBlogWrapper}>
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
      <ul className={styles.avtoBlogList}>
        {dictionary.news.slice(startIndex, startIndex + newsPerPage).map((item, index) => (
          <li className={styles.avtoBlogEl}>
            <h2>{item[0]}</h2>
            <div className={styles.line}></div>
            <p>{item[1]}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AvtoBlog;
