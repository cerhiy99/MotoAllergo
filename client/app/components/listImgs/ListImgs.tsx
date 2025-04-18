'use client';
import React, { useState } from 'react';
import styles from './CurrentNewsContent.module.css';

type Props = {
  news: any;
};

const ListImgs = ({ news }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const additionalImages = news.blogImgs.slice(1);
  const visibleImages = 3;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + visibleImages >= additionalImages.length ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0
        ? Math.max(0, additionalImages.length - visibleImages)
        : prevIndex - 1
    );
  };

  return additionalImages.length > 0 ? (
    <div className={styles.newsImages}>
      <button
        className={`${styles.sliderButton} ${styles.prev}`}
        onClick={prevSlide}
      >
        ❮
      </button>

      <div className={styles.sliderWrapper}>
        <div
          className={styles.sliderContent}
          style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
        >
          {additionalImages.map((x: any, index: number) => (
            <img
              key={index}
              className={styles.newsImagesImg}
              src={process.env.NEXT_PUBLIC_SERVER + x.src}
              alt={`${news.title} - фото ${index + 2}`}
            />
          ))}
        </div>
      </div>
      <button
        className={`${styles.sliderButton} ${styles.next}`}
        onClick={nextSlide}
      >
        ❯
      </button>
    </div>
  ) : (
    <></>
  );
};

export default ListImgs;
