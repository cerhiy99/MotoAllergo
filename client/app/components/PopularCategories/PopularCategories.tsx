'use client';

import { useState } from 'react';
import styles from './PopularCategories.module.css';

type Props = {
    dictionary: any;
  };

const imagePaths = {
  wheels: "/images/wheels.png",
  engine: "/images/engine.png",
  brakes: "/images/brakes.png"
};

const PopularCategories= ({ dictionary }: Props) => {
  const [isUa, setIsUa] = useState(true);
  const toggleLanguage = () => setIsUa(!isUa);
  return (
    <div className={styles.popularCategoriesWrapper}>
      <h1 className={styles.popularCategoriesTitle}><span>{dictionary.span}</span> {dictionary.title}</h1>
      <ul className={styles.popularCategoriesList}>
        {dictionary.category.map((item, i) => (
          <li key={i} className={styles.popularCategoriesEl}>
            <img src={imagePaths[item] || imagePaths.wheels} alt="" />
            <p>{item}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopularCategories;
