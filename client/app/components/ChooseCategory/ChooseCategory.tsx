'use client';

import Image from 'next/image';
import styles from './ChooseCategory.module.css';
import { useEffect, useRef, useState } from 'react';
import { Locale } from '@/i18n.config';
import { $host } from '@/app/http';
import Link from 'next/link';

type Props = {
  dictionary: any;
  lang: Locale;
};

interface ChooseCategory {
  id: number;
  name: string;
  image: string;
}

const ChooseCategory: React.FC<Props> = ({ dictionary, lang }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  const categories: ChooseCategory[] = [
    { id: 1, name: 'Webasto', image: '/images/categories/Webasto.jpg' },
    {
      id: 2,
      name: 'Аксесуари для авто',
      image: '/images/categories/CarAccessories.jpg',
    },
    {
      id: 3,
      name: 'Вентиляційна система',
      image: '/images/categories/VentilationSystem.jpg',
    },
    {
      id: 4,
      name: 'Вихлопна система',
      image: '/images/categories/ExhaustSystem.jpg',
    },
    {
      id: 5,
      name: 'Гальмівна система',
      image: '/images/categories/BrakeSystem.jpg',
    },
    {
      id: 6,
      name: 'Двигун і деталі двигуна',
      image: '/images/categories/EngineParts.jpg',
    },
    { id: 7, name: 'Трансмісія', image: '/images/categories/Transmission.jpg' },
    { id: 8, name: 'Диски', image: '/images/categories/CarRims.jpg' },
    {
      id: 9,
      name: 'Електрична система',
      image: '/images/categories/ElectricalSystem.jpg',
    },
    { id: 10, name: 'Колеса', image: '/images/categories/Wheels.jpg' },
    {
      id: 11,
      name: 'Кузовні запчастини',
      image: '/images/categories/BodyParts.jpg',
    },
    { id: 12, name: 'Освітлення', image: '/images/categories/Lighting.jpg' },
    {
      id: 13,
      name: 'Охолодження двигуна',
      image: '/images/categories/EngineCooling.jpg',
    },
    {
      id: 14,
      name: 'Паливна система',
      image: '/images/categories/FuelSystem.jpg',
    },
    { id: 15, name: 'Підвіска', image: '/images/categories/Suspension.jpg' },
    {
      id: 16,
      name: 'Рульове управління',
      image: '/images/categories/Steering.jpg',
    },
    {
      id: 17,
      name: 'Система кліматизації',
      image: '/images/categories/ClimateControl.jpg',
    },
    {
      id: 18,
      name: 'Склоочисники та омивачі',
      image: '/images/categories/WindshieldWiper.jpg',
    },
    {
      id: 19,
      name: 'Тюнінг механіки',
      image: '/images/categories/TuningMechanics.jpg',
    },
    { id: 20, name: 'Фільтри', image: '/images/categories/Filters.jpg' },
    { id: 21, name: 'Шини', image: '/images/categories/Tires.jpg' },
  ];

  useEffect(() => {
    itemsRef.current.forEach((item) => {
      if (item) {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.5s ease-out';
      }
    });

    const animateItems = () => {
      itemsRef.current.forEach((item, index) => {
        if (item) {
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, index * 100);
        }
      });
    };

    const handleMouseEnter = (item: HTMLDivElement) => {
      item.style.transform = 'translateY(-5px)';
      const imageWrapper = item.querySelector(
        `.${styles.imageWrapper}`
      ) as HTMLElement;
      if (imageWrapper) {
        imageWrapper.style.transform = 'scale(1.05)';
      }
    };

    const handleMouseLeave = (item: HTMLDivElement) => {
      item.style.transform = 'translateY(0)';
      const imageWrapper = item.querySelector(
        `.${styles.imageWrapper}`
      ) as HTMLElement;
      if (imageWrapper) {
        imageWrapper.style.transform = 'scale(1)';
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
        threshold: 0.2,
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
  }, []);

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !itemsRef.current.includes(el)) {
      itemsRef.current.push(el);
    }
  };

  const [categoryTypeDetail, setCategoryTypeDetails] = useState([]);

  const getCategoryTypeDetail = async () => {
    const categoryTypeDetail = await $host.get(
      `product/getCategoryTypeDetail?lang=${lang}`
    );
    console.log(categoryTypeDetail.data.res);
    setCategoryTypeDetails(categoryTypeDetail.data.res);
  };

  useEffect(() => {
    getCategoryTypeDetail();
  }, []);

  return (
    <section ref={sectionRef} className={styles.ChooseCategory}>
      <h2 className={styles.title}>
        {dictionary.title.split(dictionary.titleHighlight)[0]}
        <span>{dictionary.titleHighlight}</span>
        {dictionary.title.split(dictionary.titleHighlight)[1] || ''}
      </h2>
      <div className={styles.grid}>
        {categoryTypeDetail.map((category: any) => (
          <Link
            key={category.id}
            href={`/${lang}/catalog/1?categoryTypeDetail=${category.id}`}
            className={styles.categoryItem}
          >
            <div className={styles.imageWrapper}>
              <Image
                src={
                  category.img
                    ? process.env.NEXT_PUBLIC_SERVER + category.img
                    : process.env.NEXT_PUBLIC_SERVER +
                      'categoryTypeDetail/kpp.jpeg'
                }
                alt={category.name}
                width={150}
                height={150}
                layout="responsive"
                style={{ objectFit: 'contain', aspectRatio: 1 }}
              />
            </div>
            <p className={styles.categoryName}>{category.name}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ChooseCategory;
