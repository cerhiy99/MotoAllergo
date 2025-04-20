'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './LogoSlider.module.css';
import carData from '@/public/car.json';
import { $host } from '@/app/http';
import Link from 'next/link';
import { Locale } from '@/i18n.config';

const LogoSlider = ({ lang }: { lang: Locale }) => {
  const [position, setPosition] = useState(0);
  const [visibleItems, setVisibleItems] = useState(5);
  const sliderRef = useRef(null);

  const desktopItemWidth = 120;
  const mobileItemWidth = window.innerWidth / 5 - 0.1;
  const itemWidth =
    window.innerWidth <= 501 ? mobileItemWidth : desktopItemWidth;
  const totalItems = carData.length;
  const totalWidth = totalItems * itemWidth;

  useEffect(() => {
    const updateVisibleItems = () => {
      setVisibleItems(
        window.innerWidth <= 501
          ? 5
          : Math.floor(window.innerWidth / desktopItemWidth)
      );
    };

    updateVisibleItems();
    window.addEventListener('resize', updateVisibleItems);

    const interval = setInterval(() => {
      setPosition((prev) =>
        Math.abs(prev) >= totalWidth ? 0 : prev - itemWidth
      );
    }, 3000);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', updateVisibleItems);
    };
  }, [totalWidth, itemWidth]);

  const [brands, setBrands] = useState([]);

  const getModels = async () => {
    const res = await $host.get('product/getBrands');
    setBrands(res.data.brands);
  };

  useEffect(() => {
    getModels();
  }, []);

  return (
    <div className={styles.logoSliderWrapper}>
      <ul
        ref={sliderRef}
        className={styles.logoSliderList}
        style={{ transform: `translateX(${position}px)` }}
      >
        {brands.map((brand: any, index) => (
          <li key={`${brand.id}-${index}`} className={styles.logoSliderEl}>
            <Link href={`/${lang}/catalog/1?brand=${brand.id}`}>
              <img
                src={process.env.NEXT_PUBLIC_SERVER + brand.image}
                alt={brand.name}
                className={styles.logoSliderImage}
              />
              <p className={styles.logoSliderTitle}>{brand.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LogoSlider;
