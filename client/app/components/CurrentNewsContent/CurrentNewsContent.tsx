'use client';

import { useState } from 'react';
import styles from './CurrentNewsContent.module.css';
import { Locale } from '@/i18n.config';
import Image from 'next/image';
import NavPath from '@/app/components/NavPath/NavPath';

type News = {
  title: string;
  content: string;
  createdAt: string;
  imagePaths: string[];
};

type NewsDetailProps = {
  news: News;
  dictionary: any;
  lang: Locale;
};

const CurrentNewsContent: React.FC<NewsDetailProps> = ({ news, dictionary, lang }) => {

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };
    return date.toLocaleDateString('uk-UA', options);
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  const additionalImages = news.imagePaths.slice(1); // Всі фото окрім першого
  const visibleImages = 3; // Кількість фото, які видно одночасно
  
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + visibleImages >= additionalImages.length ? 0 : prevIndex + 1
    );
  };
  
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? Math.max(0, additionalImages.length - visibleImages) : prevIndex - 1
    );
  };

  return (
    <div className={styles.newsDetail}>
      <NavPath />

      {/* Перше зображення (не входить в слайдер) */}
      <div className={styles.firstImgWrapper}>
        {news.imagePaths.length > 0 && (
          <img
            className={styles.firstImage}
            src={news.imagePaths[0]}
            alt={`${news.title} - головне фото`}
          />
        )}
      </div>
      {additionalImages.length > 0 && (
        <div className={styles.newsImages}>
          <button className={`${styles.sliderButton} ${styles.prev}`} onClick={prevSlide}>
            ❮
          </button>

          <div className={styles.sliderWrapper}>
            <div
              className={styles.sliderContent}
              style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
            >
              {additionalImages.map((imagePath, index) => (
                <img
                  key={index}
                  className={styles.newsImagesImg}
                  src={imagePath}
                  alt={`${news.title} - фото ${index + 2}`}
                />
              ))}
            </div>
          </div>
          <button className={`${styles.sliderButton} ${styles.next}`} onClick={nextSlide}>
            ❯
          </button>
        </div>
      )}

      <h1 className={styles.newsTitle}>{news.title}</h1>
      <div className={styles.newsMeta}>
        <i className="fa-regular fa-calendar-days"></i>
        <p>Дата публікації: {formatDate(news.createdAt)}</p>
      </div>
      <div className={styles.newsContent}>
        <p>{news.content}</p>
      </div>
    </div>
  );
};

export default CurrentNewsContent;
