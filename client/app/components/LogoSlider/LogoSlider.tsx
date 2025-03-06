'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './LogoSlider.module.css';
import carData from '@/public/car.json';

const LogoSlider = () => {
  const [position, setPosition] = useState(0);
  const [visibleItems, setVisibleItems] = useState(5);
  const sliderRef = useRef(null);
  
  const desktopItemWidth = 120;
  const mobileItemWidth = window.innerWidth / 5 - 0.1;
  const itemWidth = window.innerWidth <= 501 ? mobileItemWidth : desktopItemWidth;
  const totalItems = carData.length;
  const totalWidth = totalItems * itemWidth;

  useEffect(() => {
    const updateVisibleItems = () => {
      setVisibleItems(window.innerWidth <= 501 ? 5 : Math.floor(window.innerWidth / desktopItemWidth));
    };

    updateVisibleItems();
    window.addEventListener('resize', updateVisibleItems);

    const interval = setInterval(() => {
      setPosition((prev) => (Math.abs(prev) >= totalWidth ? 0 : prev - itemWidth));
    }, 3000);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', updateVisibleItems);
    };
  }, [totalWidth, itemWidth]);

  return (
    <div className={styles.logoSliderWrapper}>
      <ul
        ref={sliderRef}
        className={styles.logoSliderList}
        style={{ transform: `translateX(${position}px)` }}
      >
        {[...carData, ...carData].map((logo, index) => (
          <li key={`${logo.path}-${index}`} className={styles.logoSliderEl}>
            <a href="#">
              <img
                src={`/images/car/${logo.path}`}
                alt={logo.title}
                className={styles.logoSliderImage}
              />
              <p className={styles.logoSliderTitle}>{logo.title}</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LogoSlider;
