'use client';

import { useState } from 'react';
import styles from './CatalogContent.module.css';
import NavPath from '@/app/components/NavPath/NavPath';

const CatalogContent: React.FC = () => {
  const [isUa] = useState<boolean>(true);
  const [activeFilters, setActiveFilters] = useState<number[]>([0, 3]);
  const [dropdowns, setDropdowns] = useState<{ [key: number]: boolean }>({});
  const [chosenFilters, setChosenFilters] = useState<{ [key: number]: string }>({});
  const [isCategoriesOpen, setIsCategoriesOpen] = useState<boolean>(true);
  const [checkedCategories, setCheckedCategories] = useState<{ [key: string]: boolean }>({});
  const [activeCategories, setActiveCategories] = useState<string[]>([]); // Стан для активних категорій
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState<boolean>(false);
  const [selectedSort, setSelectedSort] = useState<string>('Популярності');
  const [favoriteItems, setFavoriteItems] = useState<{ [key: number]: boolean }>({});
  const [currentPage, setCurrentPage] = useState(1);

  const sortOptions: string[] = [
    'Популярності',
    'Ціні: від низької до високої',
    'Ціні: від високої до низької',
    'Новизні'
  ];

  const handleFavoriteClick = (index: number): void => {
    setFavoriteItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleFilterClick = (index: number): void => {
    if (!activeFilters.includes(index)) return;
    setDropdowns((prev) => {
      const newState = Object.keys(prev).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {} as { [key: string]: boolean });
      return { ...newState, [index]: !prev[index] };
    });
  };

  const handleItemClick = (index: number, value: string): void => {
    setChosenFilters((prev) => ({ ...prev, [index]: value }));
    setDropdowns((prev) => ({ ...prev, [index]: false }));

    if (index === 0) setActiveFilters((prev) => [...prev, 1]);
    if (index === 1) setActiveFilters((prev) => [...prev, 2]);
    if (index === 3) setActiveFilters((prev) => [...prev, 4]);
  };

  const toggleCategories = (): void => {
    setIsCategoriesOpen((prev) => !prev);
  };

  // Логіка для категорій: по кліку додаємо/видаляємо категорію в/з активних фільтрів
  const handleCategoryClick = (category: string): void => {
    if (activeCategories.includes(category)) {
      setActiveCategories((prev) => prev.filter((cat) => cat !== category));
      setCheckedCategories((prev) => ({
        ...prev,
        [category]: false,
      }));
    } else {
      setActiveCategories((prev) => [...prev, category]);
      setCheckedCategories((prev) => ({
        ...prev,
        [category]: true,
      }));
    }
  };

  // Видалення активної категорії через кліки на хрестик
  const handleRemoveActiveCategory = (category: string): void => {
    setActiveCategories((prev) => prev.filter((cat) => cat !== category));
    setCheckedCategories((prev) => ({
      ...prev,
      [category]: false,
    }));
  };

  const toggleSortDropdown = (): void => {
    setIsSortDropdownOpen((prev) => !prev);
  };

  const handleSortSelect = (option: string): void => {
    setSelectedSort(option);
    setIsSortDropdownOpen(false);
    // Тут можна додати логіку сортування товарів
  };

  const productsPerPage = 4; // todo                |
  // const newsList = dictionary.news.news; // todo |
  const totalPages = 2; // todo                    \ /

  // const newsPerPage = 12;
  // const newsList = dictionary.news.news;
  // const totalPages = Math.ceil(newsList.length / newsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const startIndex = (currentPage - 1) * productsPerPage;
  const currentNews = 1;

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
                        {["Заглушка 1", "Заглушка 2", "Заглушка 3"].map((item, i) => (
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
              <button className={styles.filterElButton}>
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
                {["Категорія 1", "Категорія 2", "Категорія 3", "Категорія 4", "Категорія 5", "Категорія 6", "Категорія 7", "Категорія 8", "Категорія 9", "Категорія 10"].map((category) => (
                  <li 
                    key={category} 
                    className={styles.categoriesEl} 
                    onClick={() => handleCategoryClick(category)}
                  >
                    <input 
                      type="checkbox" 
                      checked={checkedCategories[category] || false}
                      onChange={() => {}}
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
                {activeCategories.map((category) => (
                  <li key={category} className={styles.activeFiltersEl}>
                    {category}
                    <i 
                      className="fa-solid fa-xmark" 
                      onClick={() => handleRemoveActiveCategory(category)}
                    ></i>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.sortBy}>
              <p>Сортувати по:</p>
              <div className={styles.sortedByDropdown}>
                <button 
                  onClick={toggleSortDropdown}
                  className={styles.sortButton}
                >
                  {selectedSort}
                  <i className={`fa-solid ${isSortDropdownOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                </button>
                {isSortDropdownOpen && (
                  <div className={styles.sortedByDropdownMenu}>
                    {sortOptions.map((option) => (
                      <p 
                        key={option}
                        className={`${styles.sortOption} ${selectedSort === option ? styles.activeSort : ''}`}
                        onClick={() => handleSortSelect(option)}
                      >
                        {option}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <ul className={styles.productsList}>
            {Array(6).fill(null).map((_, index) => (
              <li key={index} className={styles.productsEL}>
                <div className={styles.productImageWrapper}>
                  <img className={styles.productsImage} src="/images/Picture.png" alt="" />
                  <i 
                    className={`fa-${favoriteItems[index] ? 'solid' : 'regular'} fa-heart ${favoriteItems[index] ? styles.active : ''}`}
                    onClick={() => handleFavoriteClick(index)}
                  ></i>
                </div>
                <p className={styles.productsPara}>
                  <span>Номер лота:</span> 123456789
                </p>
                <p className={styles.productsPara}>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est, qui.
                </p>
                <div className={styles.productsPriceWrapper}>
                  <p className={styles.pricePara}>123 456 грн</p>
                  <button className={styles.priceButton}>
                    <i className="fa-solid fa-bag-shopping"></i>
                    В кошик
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.pagination}>
        <button
          className={`${styles.pageButton} ${currentPage === 1 ? styles.disabled : ''}`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          «
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={`${styles.pageNumber} ${currentPage === i + 1 ? styles.active : ''}`}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className={`${styles.pageButton} ${currentPage === totalPages ? styles.disabled : ''}`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          »
        </button>
      </div>
    </div>
  );
};

export default CatalogContent;
