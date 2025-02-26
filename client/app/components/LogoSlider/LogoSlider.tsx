'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './LogoSlider.module.css';
import carData from '@/public/car.json';

const LogoSlider = () => {
  const [position, setPosition] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [visibleItems, setVisibleItems] = useState(0);
  const sliderRef = useRef(null);
  const itemWidth = 120;
  const totalItems = carData.length;
  const totalWidth = totalItems * itemWidth;

  useEffect(() => {
    const updateVisibleItems = () => {
      setVisibleItems(Math.floor(window.innerWidth / itemWidth));
    };

    updateVisibleItems();
    window.addEventListener('resize', updateVisibleItems);

    const interval = setInterval(() => {
      if (!isAnimating) {
        setIsAnimating(true);
        setPosition((prev) => prev - itemWidth);

        setTimeout(() => {
          setPosition((prev) => {
            if (Math.abs(prev) >= totalWidth) {
              if (sliderRef.current) {
                sliderRef.current.style.transition = 'none';
                sliderRef.current.style.transform = `translateX(0px)`;
                setTimeout(() => {
                  sliderRef.current.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
                  setPosition(-itemWidth);
                }, 0);
              }
              return 0;
            }
            return prev;
          });
          setIsAnimating(false);
        }, 500);
      }
    }, 3000);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', updateVisibleItems);
    };
  }, [isAnimating, totalWidth]);

  return (
    <div className={styles.logoSliderWrapper}>
      <ul
        ref={sliderRef}
        className={`${styles.logoSliderList} ${isAnimating ? styles.animating : ''}`}
        style={{ transform: `translateX(${position}px)` }}
      >
        {[...carData, ...carData].map((logo, index) => {
          const isFirst = index % totalItems === 0;
          const isLastVisible = visibleItems > 0 && index % totalItems === visibleItems - 1;
          return (
            <li
              key={`${logo.path}-${index}`}
              className={`${styles.logoSliderEl} ${
                isFirst ? styles.first : ''
              } ${
                isLastVisible ? styles.last : ''
              }`}
            >
              <a href="#">
                <img
                  src={`/images/car/${logo.path}`}
                  alt={logo.title}
                  className={styles.logoSliderImage}
                />
                <p className={styles.logoSliderTitle}>{logo.title}</p>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LogoSlider;