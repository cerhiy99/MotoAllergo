'use client';

import { useState } from 'react';
import styles from './CatalogContent.module.css';
import NavPath from '@/app/components/NavPath/NavPath';

type Props = {
    dictionary: any;
};

const CatalogContent: React.FC = () => {
  const [isUa, setIsUa] = useState(true);
  const toggleLanguage = () => setIsUa(!isUa);

  const [activeFilters, setActiveFilters] = useState([0, 3]);
  const [dropdowns, setDropdowns] = useState({});
  const [chosenFilters, setChosenFilters] = useState({});
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);
  const [checkedCategories, setCheckedCategories] = useState<{ [key: string]: boolean }>({});


  const handleFilterClick = (index) => {
    if (!activeFilters.includes(index)) return;
    setDropdowns((prev) => {
      const newState = Object.keys(prev).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {});
      return { ...newState, [index]: !prev[index] };
    });
  };

  const handleItemClick = (index, value) => {
    setChosenFilters((prev) => ({ ...prev, [index]: value }));
    setDropdowns((prev) => ({ ...prev, [index]: false }));

    if (index === 0) setActiveFilters((prev) => [...prev, 1]);
    if (index === 1) setActiveFilters((prev) => [...prev, 2]);
    if (index === 3) setActiveFilters((prev) => [...prev, 4]);
  };

  const toggleCategories = () => {
    setIsCategoriesOpen((prev) => !prev);
  };

  const handleCategoryClick = (category: string) => {
    setCheckedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };
  

  return (
    <div className={styles.catalog}>
        <NavPath />
        <div className={styles.catalogContentWrapper}>
          <div className={styles.sidebarWrapper}>
            <div className={styles.filtersWrapper}>
              <div className={styles.filtersTitleWrapper}>
                <i className="fa-solid fa-sliders"></i>
                Фільтр
              </div>
              <form className={styles.filterParts} action="#">
                <ul className={styles.filterList}>
                  {["Виберіть марку", "Виберіть модель", "Виберіть модифікацію", "Виберіть групу", "Виберіть категорію"].map((text, index) => (
                    <li 
                      key={index} 
                      className={`${styles.filterEl} ${activeFilters.includes(index) ? styles.active : ''} ${chosenFilters[index] ? styles.chosen : ''}`}
                    >
                      <p 
                        className={`${styles.filterElPara} ${chosenFilters[index] ? styles.chosen : ''}`}
                        onClick={() => handleFilterClick(index)}
                      >
                        <span className={`${styles.filterElNumber} ${activeFilters.includes(index) ? styles.active : ''} ${chosenFilters[index] ? styles.chosen : ''}`}>{index + 1}</span>
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
                          {["Заглушка 1", "Заглушка 2", "Заглушка 3"].map((item, i) => (
                            <li key={i} className={styles.dropdownItem} onClick={() => handleItemClick(index, item)}>
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
                <button 
                  className={styles.filterElButton}>
                  <i className="fa-solid fa-magnifying-glass"></i>
                  Підібрати
                </button>
              </form>
            </div>
            <div className={styles.categoriesWrapper}>
              <div className={styles.categoriesTitleWrapper}>
                Категорії товарів:
                <i 
                  className={`fa-solid ${isCategoriesOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`} 
                  onClick={toggleCategories}
                ></i>
              </div>
              {isCategoriesOpen && (
                <ul className={styles.categoriesList}>
                  {["Категорія 1", "Категорія 2", "Категорія 3", "Категорія 4", "Категорія 5", "Категорія 6", "Категорія 7", "Категорія 8", "Категорія 9", "Категорія 10"].map((category, index) => (
                    <li 
                      key={index} 
                      className={styles.categoriesEl} 
                      onClick={() => handleCategoryClick(category)} // Обробник кліку для елементів
                    >
                    <input 
                      type="checkbox" 
                      checked={checkedCategories[category] || false} // Стан чекбоксу
                      onChange={() => {}} // Тут ми не обробляємо зміни чекбоксу
                    />
                    {category}
                  </li>
                  ))}
                </ul>              
              )}
            </div>
          </div>
          <div className={styles.catalogMainContent}>
            <div className={styles.sortByWrapper}>
              <div className={styles.activeFiltersWrapper}>
                <p>Активні фільтри</p>
                <ul className={styles.activeFiltersList}>
                    <li className={styles.activeFiltersEl}>
                      Категорія 1
                      <i className="fa-solid fa-xmark"></i>
                      </li>
                    <li className={styles.activeFiltersEl}>
                      Категорія 3
                      <i className="fa-solid fa-xmark"></i>
                      </li>
                    <li className={styles.activeFiltersEl}>
                      Категорія 7
                      <i className="fa-solid fa-xmark"></i>
                      </li>
                </ul>
              </div>
              <div className={styles.sortBy}>
                  <p>Сортувати по:</p>
                  <div className={styles.sortedByDropdown}>
                    <button>
                      Популярності
                      <i className="fa-solid fa-chevron-down"></i>
                    </button>
                    <div className={styles.sortedByDropdownMenu}>
                      <p>Популярний 1</p>
                      <p>Популярний 2</p>
                      <p>Популярний 3</p>
                    </div>
                  </div>
              </div>
            </div>
            <ul className={styles.productsList}>
              <li className={styles.productsEL}>
                  <div className={styles.productImageWrapper}>
                    <img className={styles.productsImage} src="./images/greyRectangle.png" alt="" />
                    <i className="fa-regular fa-heart"></i>
                  </div>
                  <p className={styles.productsPara}><span>Номер лота:</span> 123456789</p>
                  <p className={styles.productsPara}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est, qui.</p>
                  <div className={styles.productsPriceWrapper}>
                      <p className={styles.pricePara}>123 456 грн</p>
                      <button className={styles.priceButton}>
                          <i className="fa-solid fa-bag-shopping"></i>
                          В кошик
                          </button>
                  </div>
              </li>
              <li className={styles.productsEL}>
                  <div className={styles.productImageWrapper}>
                    <img className={styles.productsImage} src="./images/greyRectangle.png" alt="" />
                    <i className="fa-regular fa-heart"></i>
                  </div>
                  <p className={styles.productsPara}><span>Номер лота:</span> 123456789</p>
                  <p className={styles.productsPara}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est, qui.</p>
                  <div className={styles.productsPriceWrapper}>
                      <p className={styles.pricePara}>123 456 грн</p>
                      <button className={styles.priceButton}>
                          <i className="fa-solid fa-bag-shopping"></i>
                          В кошик
                          </button>
                  </div>
              </li>
              <li className={styles.productsEL}>
                  <div className={styles.productImageWrapper}>
                    <img className={styles.productsImage} src="./images/greyRectangle.png" alt="" />
                    <i className="fa-regular fa-heart"></i>
                  </div>
                  <p className={styles.productsPara}><span>Номер лота:</span> 123456789</p>
                  <p className={styles.productsPara}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est, qui.</p>
                  <div className={styles.productsPriceWrapper}>
                      <p className={styles.pricePara}>123 456 грн</p>
                      <button className={styles.priceButton}>
                          <i className="fa-solid fa-bag-shopping"></i>
                          В кошик
                          </button>
                  </div>
              </li>
              <li className={styles.productsEL}>
                  <div className={styles.productImageWrapper}>
                    <img className={styles.productsImage} src="./images/greyRectangle.png" alt="" />
                    <i className="fa-regular fa-heart"></i>
                  </div>
                  <p className={styles.productsPara}><span>Номер лота:</span> 123456789</p>
                  <p className={styles.productsPara}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est, qui.</p>
                  <div className={styles.productsPriceWrapper}>
                      <p className={styles.pricePara}>123 456 грн</p>
                      <button className={styles.priceButton}>
                          <i className="fa-solid fa-bag-shopping"></i>
                          В кошик
                          </button>
                  </div>
              </li>
              <li className={styles.productsEL}>
                  <div className={styles.productImageWrapper}>
                    <img className={styles.productsImage} src="./images/greyRectangle.png" alt="" />
                    <i className="fa-regular fa-heart"></i>
                  </div>
                  <p className={styles.productsPara}><span>Номер лота:</span> 123456789</p>
                  <p className={styles.productsPara}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est, qui.</p>
                  <div className={styles.productsPriceWrapper}>
                      <p className={styles.pricePara}>123 456 грн</p>
                      <button className={styles.priceButton}>
                          <i className="fa-solid fa-bag-shopping"></i>
                          В кошик
                          </button>
                  </div>
              </li>
              <li className={styles.productsEL}>
                  <div className={styles.productImageWrapper}>
                    <img className={styles.productsImage} src="./images/greyRectangle.png" alt="" />
                    <i className="fa-regular fa-heart"></i>
                  </div>
                  <p className={styles.productsPara}><span>Номер лота:</span> 123456789</p>
                  <p className={styles.productsPara}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est, qui.</p>
                  <div className={styles.productsPriceWrapper}>
                      <p className={styles.pricePara}>123 456 грн</p>
                      <button className={styles.priceButton}>
                          <i className="fa-solid fa-bag-shopping"></i>
                          В кошик
                          </button>
                  </div>
              </li>
            </ul>
          </div>
        </div>
    </div>
  );
};

export default CatalogContent;