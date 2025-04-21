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
  const [gap, setGap] = useState(0);
  const sliderRef = useRef(null);
  const [brands, setBrands] = useState([]);

  const logoWidth = 100; // Фіксована ширина логотипу (85px)
  const totalItems = brands.length; // Усі 60 брендів

  const calculateLayout = () => {
    const screenWidth = window.innerWidth;
    // Кількість видимих елементів: ширина екрану / 100, максимум 16
    const calculatedItems = Math.min(Math.floor(screenWidth / 100), 16);
    // Розраховуємо gap: (ширина екрану - ширина логотипів) / кількість елементів
    const calculatedGap = calculatedItems > 0 ? (screenWidth - (logoWidth * calculatedItems)) / calculatedItems : 0;
    setVisibleItems(calculatedItems);
    setGap(calculatedGap);
  };

  useEffect(() => {
    calculateLayout();
    window.addEventListener('resize', calculateLayout);

    const interval = setInterval(() => {
      setPosition((prev) => {
        const itemWidthWithGap = logoWidth + gap; // Ширина елемента з відступом
        const totalWidth = totalItems * itemWidthWithGap; // Ширина всіх 60 логотипів
        // Якщо пройшли всі 60 логотипів, скидаємо до початку
        if (Math.abs(prev) >= totalWidth) {
          return 0;
        }
        return prev - itemWidthWithGap;
      });
    }, 300);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', calculateLayout);
    };
  }, [visibleItems, gap, totalItems]);

  const getModels = async () => {
    const res = await $host.get('product/getBrands');
    setBrands(res.data.brands);
  };

  useEffect(() => {
    getModels();
  }, []);

  const duplicatedBrands = brands.concat(brands); // Дублюємо масив для безперервного слайдера
  const itemWidthWithGap = logoWidth + gap;
  const totalWidth = totalItems * itemWidthWithGap;

  return (
    <div className={styles.logoSliderWrapper}>
      <ul
        ref={sliderRef}
        className={styles.logoSliderList}
        style={{
          transform: `translateX(${position}px)`,
          transition: Math.abs(position) >= totalWidth ? 'none' : 'transform 0.5s ease',
        }}
      >
        {duplicatedBrands.map((brand: any, index) => (
          <li
            key={`${brand.id}-${index}`}
            className={styles.logoSliderEl}
            style={{ width: logoWidth, marginRight: gap }}
          >
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