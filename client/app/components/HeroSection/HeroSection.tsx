'use client';

import { useState, useEffect } from 'react';
import styles from './HeroSection.module.css';
import { $host } from '@/app/http';
import { Locale } from '@/i18n.config';

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
  lang: Locale;
};

const HeroSection = ({ dictionary, lang }: Props) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  // const [activeFilters, setActiveFilters] = useState([0, 3]); //старе
  // const [dropdowns, setDropdowns] = useState({});
  // const [chosenFilters, setChosenFilters] = useState({});
  const [images, setImages] = useState<string[]>([]);
  const [dropdowns, setDropdowns] = useState<Record<number, boolean>>({
    1: false,
    2: false,
    3: false,
    4: true,
  });
  const [chosenFilters, setChosenFilters] = useState<Record<number, number>>({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
  });
  const [activeFilters, setActiveFilters] = useState<number[]>([]);
  const desktopImages = [
    '/images/home-hero-image.png',
    '/images/home-hero-image-second.png',
    '/images/home-hero-image-third.png',
  ];

  const mobileImages = [
    '/images/mobile_version/home-hero.png',
    '/images/home-hero-image-second.png',
    '/images/home-hero-image-third.png',
  ];

  useEffect(() => {
    const updateImages = () => {
      const newImages = window.innerWidth <= 501 ? mobileImages : desktopImages;
      setImages(newImages);
    };
    updateImages();
    window.addEventListener('resize', updateImages);

    return () => window.removeEventListener('resize', updateImages);
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
    if (index != 0 && !activeFilters.includes(index)) return;
    setDropdowns((prev) => {
      const newState = Object.keys(prev).reduce(
        (acc, key) => {
          acc[key] = false;
          return acc;
        },
        {} as Record<string, boolean>
      );

      return { ...newState, [index]: !prev[index] };
    });
  };

  const handleItemClick = (index: number, value: number) => {
    setChosenFilters((prev) => ({ ...prev, [index]: value }));
    setDropdowns((prev) => ({ ...prev, [index]: false }));
    if (index === 0) {
      setActiveFilters((prev) => [...prev, 1]);
      setActiveFilters((prev) => [...prev, 2]);
      getModels(value);
    }
    if (index === 2) {
      setActiveFilters((prev) => [...prev, 3]);
      getTypeDetail(value);
    }
  };

  const filterLabels = [
    dictionary.filter1,
    dictionary.filter2,
    dictionary.filter4,
    dictionary.filter5,
  ];

  const [dropItems, setDropItems] = useState<
    [
      { id: number; name: string }[],
      { id: number; name: string }[],
      { id: number; name: string }[],
      { id: number; name: string }[],
    ]
  >([[], [], [], []]);

  const dropdownItems = [
    { id: 1, nameuk: 'Заглушка 1', nameru: 'Заглушка 1' },
    { id: 2, nameuk: 'Заглушка 2', nameru: 'Заглушка 2' },
    { id: 3, nameuk: 'Заглушка 3', nameru: 'Заглушка 3' },
  ];

  const getStartDropdownFilters = async () => {
    try {
      const brands = await $host.get('product/getBrands');
      const models = await $host.get(
        `product/getCategoryTypeDetail?lang=${lang}`
      );
      setDropItems([brands.data.brands, [], models.data.res, []]);
    } catch (err) {
      console.log(err);
    }
  };

  const getModels = async (value: number) => {
    try {
      const res = await $host.get(`product/getModels?brandId=${value}`);
      dropItems[1] = res.data.models;
      setDropItems(dropItems);
    } catch (err) {
      console.log(err);
    }
  };

  const getTypeDetail = async (value: number) => {
    try {
      const res = await $host.get(
        `product/getTypeDetail?categoryTypeDelailId=${value}&lang=${lang}`
      );
      dropItems[3] = res.data.res;
      setDropItems(dropItems);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getStartDropdownFilters();
  }, []);

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
        <form
          className={styles.filterParts}
          action={`/${lang}/catalog/1?${
            (chosenFilters['0'] == 0 ? '' : `brand=${chosenFilters['0']}&`) +
            (chosenFilters['1'] == 0 ? '' : `model=${chosenFilters['1']}&`) +
            (chosenFilters['2'] == 0
              ? ''
              : `categoryTypeDetail=${chosenFilters['2']}&`) +
            (chosenFilters['3'] == 0 ? '' : `typeDetail=${chosenFilters['3']}`)
          }`}
        >
          <h1 className={styles.heroSectionTitle}>{dictionary.title}</h1>
          <ul className={styles.filterList}>
            {filterLabels.map((text, index) => (
              <li
                key={index}
                className={`${styles.filterEl} ${
                  activeFilters.includes(index) ? styles.active : ''
                } ${chosenFilters[index] ? styles.chosen : ''}`}
              >
                <p
                  className={`${styles.filterElPara} ${
                    chosenFilters[index] ? styles.chosen : ''
                  }`}
                  onClick={() => handleFilterClick(index)}
                >
                  <span
                    className={`${styles.filterElNumber} ${
                      activeFilters.includes(index) ? styles.active : ''
                    } ${chosenFilters[index] ? styles.chosen : ''}`}
                  >
                    {index + 1}
                  </span>
                  {chosenFilters[index] == 0
                    ? text
                    : dropItems[index].find((x) => x.id == chosenFilters[index])
                        ?.name}
                </p>
                <div
                  className={`${styles.filterElIconWrapper} ${
                    activeFilters.includes(index) ? styles.active : ''
                  } ${chosenFilters[index] ? styles.chosen : ''}`}
                  onClick={() => handleFilterClick(index)}
                >
                  <i className="fa-solid fa-chevron-down"></i>
                </div>
                {dropdowns[index] && (
                  <ul
                    className={`${styles.dropdownMenu} ${
                      dropdowns[index] ? styles.active : ''
                    }`}
                  >
                    {dropItems[index].length > 0 &&
                      dropItems[index].map((item, i) => (
                        <li
                          key={item.id}
                          className={styles.dropdownItem}
                          onClick={() => handleItemClick(index, item.id)}
                        >
                          {item.name}
                        </li>
                      ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <button
            className={`${styles.filterElButton} ${
              Object.keys(chosenFilters).length > 0 ? styles.chosen : ''
            }`}
            style={{ opacity: Object.keys(chosenFilters).length > 0 ? 1 : 0.7 }}
            //onClick={()=>}
          >
            <i className="fa-solid fa-magnifying-glass"></i>
            {dictionary.buttonText}
          </button>
        </form>
        <div className={styles.sliderDots}>
          {images.map((_, index) => (
            <span
              key={index}
              className={`${styles.dot} ${
                index === currentSlide ? styles.active : ''
              }`}
              onClick={() => handleDotClick(index)}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
