'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './PopularProducts.module.css';

interface Product {
  id: number;
  lotNumber: string;
  description: string;
  price: string;
  image: string;
  category?: string;
}

interface PopularProductsProps {
  dictionary: {
    title: string;
    titleHighlight: string;
    lotNumberLabel: string;
    addToCart: string;
    loadMoreButton: string;
  };
  products: Product[];
}

const PopularProducts: React.FC<PopularProductsProps> = ({ dictionary, products }) => {
  const [isUa, setIsUa] = useState(true);
  const [favoriteItems, setFavoriteItems] = useState<{ [key: number]: boolean }>({});
  const [visibleCount, setVisibleCount] = useState(10);
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLLIElement[]>([]);

  useEffect(() => {
    itemsRef.current.forEach((item) => {
      if (item) {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.9)';
        item.style.transition = 'all 0.5s ease-out';
      }
    });

    const animateItems = () => {
      itemsRef.current.forEach((item, index) => {
        if (item) {
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, index * 150); 
        }
      });
    };

    const handleMouseEnter = (item: HTMLLIElement) => {
      item.style.transform = 'scale(1.03)';
      const image = item.querySelector(`.${styles.popularProductsImage}`);
      if (image) {
        image.style.transform = 'scale(1.05)';
      }
    };

    const handleMouseLeave = (item: HTMLLIElement) => {
      item.style.transform = 'scale(1)';
      const image = item.querySelector(`.${styles.popularProductsImage}`);
      if (image) {
        image.style.transform = 'scale(1)';
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
        threshold: 0.1
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
  }, [visibleCount]);

  const toggleLanguage = () => setIsUa(!isUa);

  const handleFavoriteClick = (index: number): void => {
    setFavoriteItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const loadMoreProducts = () => {
    setVisibleCount((prev) => prev + 10);
  };

  const addToRefs = (el: HTMLLIElement) => {
    if (el && !itemsRef.current.includes(el)) {
      itemsRef.current.push(el);
    }
  };

  const visibleProducts = products.slice(0, visibleCount);

  return (
    <div ref={sectionRef} className={styles.popularProductsWrapper}>
      <h1 className={styles.popularProductsTitle}>
        {dictionary.title.split(dictionary.titleHighlight)[0]}
        <span>{dictionary.titleHighlight}</span>
        {dictionary.title.split(dictionary.titleHighlight)[1] || ''}
      </h1>
      <ul className={styles.popularProductsList}>
        {visibleProducts.map((product) => (
          <li
            key={product.id}
            ref={addToRefs}
            className={styles.popularProductsEL}
          >
            <div className={styles.productImageWrapper}>
              <img
                className={styles.popularProductsImage}
                src={product.image}
                alt={product.description}
              />
              <i
                className={`fa-${favoriteItems[product.id] ? 'solid' : 'regular'} fa-heart ${
                  favoriteItems[product.id] ? styles.active : ''
                }`}
                onClick={() => handleFavoriteClick(product.id)}
              ></i>
            </div>
            <p className={styles.popularProductsPara}>
              <span>{dictionary.lotNumberLabel}</span> {product.lotNumber}
            </p>
            <p className={styles.popularProductsPara}>{product.description}</p>
            <div className={styles.popularProductsPriceWrapper}>
              <p className={styles.pricePara}>{product.price}</p>
              <button className={styles.priceButton}>
                <i className="fa-solid fa-bag-shopping"></i> {dictionary.addToCart}
              </button>
            </div>
          </li>
        ))}
      </ul>
      {visibleCount < products.length && (
        <div className={styles.loadMoreWrapper}>
          <button onClick={loadMoreProducts} className={styles.loadMoreButton}>
            <i className="fa-solid fa-rotate"></i>
            {dictionary.loadMoreButton}
          </button>
        </div>
      )}
    </div>
  );
};

export default PopularProducts;