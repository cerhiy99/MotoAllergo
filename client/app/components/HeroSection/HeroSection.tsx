'use client';

import { useState } from 'react';
import styles from './HeroSection.module.css';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeFilters, setActiveFilters] = useState([]);
  const [dropdowns, setDropdowns] = useState({});

  const images = [
    "/images/home-hero-image.png",
    "/images/image.png",
    "/images/home-hero-image.png"
  ];

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  const handleFilterClick = (index) => {
    setActiveFilters((prev) => (
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    ));
    setDropdowns((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className={styles.heroSection}>
      <div className={styles.imageContainer}>
        <img 
          src={images[currentSlide]} 
          alt="Hero Slide" 
          className={styles.heroImage} 
        />
      </div>
      <div className={styles.heroWrapper}>
        <form className={styles.filterParts} action="#">
          <h1 className={styles.heroSectionTitle}>Підбір автозапчастин</h1>
          <ul className={styles.filterList}>
            {['Виберіть марку', 'Виберіть модель', 'Виберіть модифікацію', 'Виберіть групу', 'Виберіть категорію'].map((text, index) => (
              <li 
                key={index} 
                className={`${styles.filterEl} ${activeFilters.includes(index) ? styles.active : ''}`}
              >
                <p 
                  className={`${styles.filterElPara} ${activeFilters.includes(index) ? styles.active : ''}`}
                  onClick={() => handleFilterClick(index)}
                >
                  <span className={`${styles.filterElNumber} ${activeFilters.includes(index) ? styles.active : ''}`}>{index + 1}</span>{text}
                </p>
                <div 
                  className={`${styles.filterElIconWrapper} ${activeFilters.includes(index) ? styles.active : ''}`}
                  onClick={() => handleFilterClick(index)}
                >
                  <i className="fa-solid fa-chevron-down"></i>
                </div>
                {dropdowns[index] && (
                  <ul className={`${styles.dropdownMenu} ${styles.active}`}>
                    <li className={styles.dropdownItem}>Заглушка 1</li>
                    <li className={styles.dropdownItem}>Заглушка 2</li>
                    <li className={styles.dropdownItem}>Заглушка 3</li>
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <button className={styles.filterElButton}>
            <i className="fa-solid fa-magnifying-glass"></i>
            Підібрати
          </button>
        </form>
        <div className={styles.sliderDots}>
          {images.map((_, index) => (
            <span
              key={index}
              className={`${styles.dot} ${index === currentSlide ? styles.active : ''}`}
              onClick={() => handleDotClick(index)}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
