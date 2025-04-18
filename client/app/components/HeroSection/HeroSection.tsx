'use client';

import { useState, useEffect } from 'react';
import styles from './HeroSection.module.css';

type Props = {
  dictionary: {
    title: string;
    filter1: string;
    filter2: string;
    filter3: string;
    filter4: string;
    filter5: string;
    buttonText: string;
  };
};

const HeroSection = ({ dictionary }: Props) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  // const [activeFilters, setActiveFilters] = useState([0, 3]); //старе
  // const [dropdowns, setDropdowns] = useState({});
  // const [chosenFilters, setChosenFilters] = useState({});
  const [images, setImages] = useState<string[]>([]);
  const [dropdowns, setDropdowns] = useState<Record<number, boolean>>({});
  const [chosenFilters, setChosenFilters] = useState<Record<number, string>>({});
  const [activeFilters, setActiveFilters] = useState<number[]>([]);
  const desktopImages = [
    "/images/home-hero-image.png",
    "/images/home-hero-image-second.png",
    "/images/home-hero-image-third.png",
  ];

  const mobileImages = [
    "/images/mobile_version/home-hero.png",
    "/images/home-hero-image-second.png",
    "/images/home-hero-image-third.png",
  ];

  useEffect(() => {
    const updateImages = () => {
      const newImages = window.innerWidth <= 501 ? mobileImages : desktopImages;
      setImages(newImages);
    };
    updateImages();
    window.addEventListener("resize", updateImages);

    return () => window.removeEventListener("resize", updateImages);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images]);

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };

  const handleFilterClick = (index: number) => {
    if (!activeFilters.includes(index)) return;
    setDropdowns((prev) => {
      const newState = Object.keys(prev).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {} as Record<string, boolean>);
      return { ...newState, [index]: !prev[index] };
    });
  };

  const handleItemClick = (index: number, value: string) => {
    setChosenFilters((prev) => ({ ...prev, [index]: value }));
    setDropdowns((prev) => ({ ...prev, [index]: false }));

    if (index === 0) setActiveFilters((prev) => [...prev, 1]);
    if (index === 1) setActiveFilters((prev) => [...prev, 2]);
    if (index === 3) setActiveFilters((prev) => [...prev, 4]);
  };

  const filterLabels = [
    dictionary.filter1,
    dictionary.filter2,
    dictionary.filter3,
    dictionary.filter4,
    dictionary.filter5,
  ];

  const dropdownItems = ["Заглушка 1", "Заглушка 2", "Заглушка 3"];

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
          <h1 className={styles.heroSectionTitle}>{dictionary.title}</h1>
          <ul className={styles.filterList}>
            {filterLabels.map((text, index) => (
              <li
                key={index}
                className={`${styles.filterEl} ${activeFilters.includes(index) ? styles.active : ''} ${chosenFilters[index] ? styles.chosen : ''}`}
              >
                <p
                  className={`${styles.filterElPara} ${chosenFilters[index] ? styles.chosen : ''}`}
                  onClick={() => handleFilterClick(index)}
                >
                  <span className={`${styles.filterElNumber} ${activeFilters.includes(index) ? styles.active : ''} ${chosenFilters[index] ? styles.chosen : ''}`}>
                    {index + 1}
                  </span>
                  {chosenFilters[index] || text}
                </p>
                <div
                  className={`${styles.filterElIconWrapper} ${activeFilters.includes(index) ? styles.active : ''} ${chosenFilters[index] ? styles.chosen : ''}`}
                  onClick={() => handleFilterClick(index)}
                >
                  <i className="fa-solid fa-chevron-down"></i>
                </div>
                {dropdowns[index] && (
                  <ul className={`${styles.dropdownMenu} ${dropdowns[index] ? styles.active : ''}`}>
                    {dropdownItems.map((item, i) => (
                      <li
                        key={i}
                        className={styles.dropdownItem}
                        onClick={() => handleItemClick(index, item)}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <button
            className={`${styles.filterElButton} ${Object.keys(chosenFilters).length > 0 ? styles.chosen : ''}`}
            style={{ opacity: Object.keys(chosenFilters).length > 0 ? 1 : 0.7 }}
          >
            <i className="fa-solid fa-magnifying-glass"></i>
            {dictionary.buttonText}
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