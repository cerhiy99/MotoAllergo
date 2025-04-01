'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './CatalogContent.module.css';
import NavPath from '@/app/components/NavPath/NavPath';
import { useRouter } from 'next/navigation';

interface Product {
  id: number;
  lotNumber: string;
  description: string;
  price: string;
  image: string;
  category?: string;
}


type CatalogContentClientProps = {
  dictionary: any;
  products: Product[];
  totalPages: number;
  searchParams: any; // Add this line
};
const parseQueryParam = (
  param: string | string[] | undefined,
  defaultValue: string[] = []
): string[] => {
  if (!param) return defaultValue;
  if (Array.isArray(param)) return param;
  return param.split(',');
};

const createQueryString = (
  currentParams: { [key: string]: string | string[] | undefined },
  newParams: { [key: string]: string | string[] | undefined }
) => {
  const params = new URLSearchParams();
  Object.entries(currentParams).forEach(([key, value]) => {
    if (value) {
      if (Array.isArray(value)) {
        params.set(key, value.join(','));
      } else {
        params.set(key, value);
      }
    }
  });
  Object.entries(newParams).forEach(([key, value]) => {
    if (value) {
      if (Array.isArray(value)) {
        params.set(key, value.join(','));
      } else {
        params.set(key, value);
      }
    } else {
      params.delete(key);
    }
  });
  return params.toString();
};

const CatalogContentClient: React.FC<CatalogContentClientProps> = ({
  dictionary,
  searchParams,
  products,
  totalPages,
}) => {
  const router = useRouter();
  const [isUa] = useState<boolean>(true);
  const [activeFilters, setActiveFilters] = useState<number[]>([0, 3]);
  const [dropdowns, setDropdowns] = useState<{ [key: number]: boolean }>({});
  const [chosenFilters, setChosenFilters] = useState<{ [key: number]: string }>(
    searchParams.filters
      ? Object.fromEntries(
          parseQueryParam(searchParams.filters).map((f) => {
            const [key, value] = f.split('=');
            return [key.replace('filter', ''), value];
          })
        )
      : {}
  );
  const [isCategoriesOpen, setIsCategoriesOpen] = useState<boolean>(true);
  const [checkedCategories, setCheckedCategories] = useState<{
    [key: string]: boolean;
  }>({});
  const [activeCategories, setActiveCategories] = useState<string[]>(
    parseQueryParam(searchParams.categories)
  );
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState<boolean>(false);
  const [selectedSort, setSelectedSort] = useState<string>(
    searchParams.sort || dictionary.sortOptions.popularity
  );
  const [currentPage, setCurrentPage] = useState<number>(
    parseInt((searchParams.page as string) || '1', 10)
  );
  const [favoriteItems, setFavoriteItems] = useState<{
    [key: number]: boolean;
  }>({});
  const [activeSection, setActiveSection] = useState<'filter' | 'sort' | null>(null);
  const itemsRef = useRef<HTMLLIElement[]>([]);
  const categoryItemsRef = useRef<HTMLLIElement[]>([]);

  useEffect(() => {
    const handleProductMouseEnter = (item: HTMLLIElement) => {
      item.style.transform = 'scale(1.03)';
      const image = item.querySelector(`.${styles.productsImage}`) as HTMLElement;
      if (image) {
        image.style.transform = 'scale(1.05)';
      }
    };

    const handleProductMouseLeave = (item: HTMLLIElement) => {
      item.style.transform = 'scale(1)';
      const image = item.querySelector(`.${styles.productsImage}`) as HTMLElement;
      if (image) {
        image.style.transform = 'scale(1)';
      }
    };

    const handleCategoryMouseEnter = (item: HTMLLIElement) => {
      item.style.transform = 'scale(1.05)';
      const image = item.querySelector('img');
      if (image) {
        image.style.transform = 'scale(1.1)';
      }
    };

    const handleCategoryMouseLeave = (item: HTMLLIElement) => {
      item.style.transform = 'scale(1)';
      const image = item.querySelector('img');
      if (image) {
        image.style.transform = 'scale(1)';
      }
    };

    itemsRef.current.forEach((item) => {
      if (item) {
        item.addEventListener('mouseenter', () => handleProductMouseEnter(item));
        item.addEventListener('mouseleave', () => handleProductMouseLeave(item));
      }
    });

    categoryItemsRef.current.forEach((item) => {
      if (item) {
        item.addEventListener('mouseenter', () => handleCategoryMouseEnter(item));
        item.addEventListener('mouseleave', () => handleCategoryMouseLeave(item));
      }
    });

    return () => {
      itemsRef.current.forEach((item) => {
        if (item) {
          item.removeEventListener('mouseenter', () => handleProductMouseEnter(item));
          item.removeEventListener('mouseleave', () => handleProductMouseLeave(item));
        }
      });
      categoryItemsRef.current.forEach((item) => {
        if (item) {
          item.removeEventListener('mouseenter', () => handleCategoryMouseEnter(item));
          item.removeEventListener('mouseleave', () => handleCategoryMouseLeave(item));
        }
      });
    };
  }, [currentPage]);

  const handleFilterSectionClick = () => {
    setActiveSection(activeSection === 'filter' ? null : 'filter');
  };

  const handleSortSectionClick = () => {
    setActiveSection(activeSection === 'sort' ? null : 'sort');
  };

  const sortOptions: string[] = [
    dictionary.sortOptions.popularity,
    dictionary.sortOptions.priceLowToHigh,
    dictionary.sortOptions.priceHighToLow,
    dictionary.sortOptions.newest,
  ];

  const updateQueryString = (newParams: {
    [key: string]: string | string[] | undefined;
  }) => {
    const queryString = createQueryString(searchParams, newParams);
    const newUrl = `/uk/catalog${queryString ? `?${queryString}` : ''}`;
    router.replace(newUrl);
  };

  const handleFavoriteClick = (index: number): void => {
    setFavoriteItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleFilterClick = (index: number): void => {
    if (!activeFilters.includes(index)) return;
    setDropdowns((prev) => {
      const newState = Object.keys(prev).reduce(
        (acc, key) => {
          acc[key] = false;
          return acc;
        },
        {} as { [key: string]: boolean }
      );
      return { ...newState, [index]: !prev[index] };
    });
  };

  const handleItemClick = (index: number, value: string): void => {
    setChosenFilters((prev) => {
      const newFilters = { ...prev, [index]: value };
      const filtersString = Object.entries(newFilters)
        .map(([key, val]) => `filter${key}=${val}`)
        .join('&');
      updateQueryString({ filters: filtersString });
      return newFilters;
    });
    setDropdowns((prev) => ({ ...prev, [index]: false }));

    if (index === 0) setActiveFilters((prev) => [...prev, 1]);
    if (index === 1) setActiveFilters((prev) => [...prev, 2]);
    if (index === 3) setActiveFilters((prev) => [...prev, 4]);
  };

  const toggleCategories = (): void => {
    setIsCategoriesOpen((prev) => !prev);
  };

  const handleCategoryClick = (category: string): void => {
    let newCategories: string[];
    if (activeCategories.includes(category)) {
      newCategories = activeCategories.filter((cat) => cat !== category);
      setActiveCategories(newCategories);
      setCheckedCategories((prev) => ({ ...prev, [category]: false }));
    } else {
      newCategories = [...activeCategories, category];
      setActiveCategories(newCategories);
      setCheckedCategories((prev) => ({ ...prev, [category]: true }));
    }
    updateQueryString({ categories: newCategories });
  };

  const handleRemoveActiveCategory = (category: string): void => {
    const newCategories = activeCategories.filter((cat) => cat !== category);
    setActiveCategories(newCategories);
    setCheckedCategories((prev) => ({ ...prev, [category]: false }));
    updateQueryString({ categories: newCategories });
  };

  const toggleSortDropdown = (): void => {
    setIsSortDropdownOpen((prev) => !prev);
  };

  const handleSortSelect = (option: string): void => {
    setSelectedSort(option);
    setIsSortDropdownOpen(false);
    updateQueryString({ sort: option });
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      itemsRef.current = [];
      categoryItemsRef.current = [];
      updateQueryString({ page: page.toString() });
    }
  };

  const addToProductRefs = (el: HTMLLIElement) => {
    if (el && !itemsRef.current.includes(el)) {
      itemsRef.current.push(el);
    }
  };

  const addToCategoryRefs = (el: HTMLLIElement) => {
    if (el && !categoryItemsRef.current.includes(el)) {
      categoryItemsRef.current.push(el);
    }
  };

  const ITEMS_PER_PAGE = 6;
  const totalCalculatedPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const paginatedProducts = products.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className={styles.catalog}>
      <NavPath />
      <div className={styles.catalogContentWrapper}>
        <div className={styles.sidebarWrapper}>
          <div className={styles.mobileSideBarWrapper}>
            <div className={styles.filterTab}>
              <div
                className={`${styles.filterTabFilter} ${
                  activeSection === 'filter' ? styles.active : ''
                }`}
                onClick={handleFilterSectionClick}
              >
                <div className={styles.filterTabFilterWrapper}>
                  <div className={styles.filterTabFilterWrapperText}>
                    <i className="fa-solid fa-sliders"></i>
                    <span>{dictionary.filterTabFilter}</span>
                  </div>
                  <i
                    className={`fa-solid fa-chevron-down ${
                      activeSection === 'filter' ? styles.rotateChevron : styles.rotateChevronBack
                    }`}
                  ></i>
                </div>
              </div>
              <div
                className={`${styles.filterTabSort} ${
                  activeSection === 'sort' ? styles.active : ''
                }`}
                onClick={handleSortSectionClick}
              >
                <div className={styles.filterTabFilterWrapper}>
                  <div className={styles.filterTabFilterWrapperText}>
                    <img src="/images/sortIcon.svg" alt="" />
                    <span>{dictionary.filterTabSort}</span>
                  </div>
                  <i
                    className={`fa-solid fa-chevron-down ${
                      activeSection === 'sort' ? styles.rotateChevron : styles.rotateChevronBack
                    }`}
                  ></i>
                </div>
              </div>
            </div>
            {activeSection === 'filter' && (
              <form className={styles.filterPartsFilter} action="#">
                <ul className={styles.filterList}>
                  {[
                    dictionary.filter1,
                    dictionary.filter2,
                    dictionary.filter3,
                    dictionary.filter4,
                    dictionary.filter5,
                  ].map((text, index) => (
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
                        {chosenFilters[index] || text}
                      </p>
                      <div
                        className={`${styles.filterElIconWrapper} ${
                          activeFilters.includes(index) ? styles.active : ''
                        } ${chosenFilters[index] ? styles.chosen : ''}`}
                        onClick={() => handleFilterClick(index)}
                      >
                        <i
                          className={`fa-solid fa-chevron-down ${
                            dropdowns[index] ? styles.rotateChevron : styles.rotateChevronBack
                          }`}
                        ></i>
                      </div>
                      {dropdowns[index] && (
                        <ul
                          className={`${styles.dropdownMenu} ${
                            dropdowns[index] ? styles.active : ''
                          }`}
                        >
                          {['Заглушка 1', 'Заглушка 2', 'Заглушка 3'].map(
                            (item, i) => (
                              <li
                                key={i}
                                className={styles.dropdownItem}
                                onClick={() => handleItemClick(index, item)}
                              >
                                {item}
                              </li>
                            )
                          )}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
                <button
                  className={`${styles.filterElButton} ${
                    Object.keys(chosenFilters).length > 0 ? styles.chosen : ''
                  }`}
                  style={{
                    opacity: Object.keys(chosenFilters).length > 0 ? 1 : 0.7,
                  }}
                >
                  <i className="fa-solid fa-magnifying-glass"></i>
                  {dictionary.selectButton}
                </button>
              </form>
            )}
            {activeSection === 'sort' && (
              <form className={styles.filterPartsSort} action="#">
                <div className={styles.filterSection}>
                  <label>{dictionary.filterLabel}</label>
                  <div className={styles.filterSectionEl}>
                    <input
                      type="radio"
                      id="popular"
                      name="sort"
                      value="popular"
                      defaultChecked
                      onChange={() => handleSortSelect(dictionary.sortOptions.popularity)}
                    />
                    <label htmlFor="popular">{dictionary.sortPopular}</label>
                  </div>
                  <div className={styles.filterSectionEl}>
                    <input
                      type="radio"
                      id="cheapest"
                      name="sort"
                      value="cheapest"
                      onChange={() => handleSortSelect(dictionary.sortOptions.priceLowToHigh)}
                    />
                    <label htmlFor="cheapest">{dictionary.sortCheapest}</label>
                  </div>
                  <div className={styles.filterSectionEl}>
                    <input
                      type="radio"
                      id="expensive"
                      name="sort"
                      value="expensive"
                      onChange={() => handleSortSelect(dictionary.sortOptions.priceHighToLow)}
                    />
                    <label htmlFor="expensive">{dictionary.sortExpensive}</label>
                  </div>
                </div>
                <div className={styles.filterSection}>
                  <label>{dictionary.conditionLabel}</label>
                  <div className={styles.filterSectionSortWrapper}>
                    <div>
                      <div className={styles.filterSectionEl}>
                        <input
                          type="checkbox"
                          id="used"
                          name="condition"
                          value="used"
                          onChange={(e) => {
                            const newCategories = e.target.checked
                              ? [...activeCategories, 'used']
                              : activeCategories.filter((cat) => cat !== 'used');
                            setActiveCategories(newCategories);
                            setCheckedCategories((prev) => ({ ...prev, used: e.target.checked }));
                            updateQueryString({ categories: newCategories });
                          }}
                        />
                        <label htmlFor="used">{dictionary.conditionUsed}</label>
                      </div>
                    </div>
                    <div>
                      <div className={styles.filterSectionEl}>
                        <input
                          type="checkbox"
                          id="new"
                          name="condition"
                          value="new"
                          onChange={(e) => {
                            const newCategories = e.target.checked
                              ? [...activeCategories, 'new']
                              : activeCategories.filter((cat) => cat !== 'new');
                            setActiveCategories(newCategories);
                            setCheckedCategories((prev) => ({ ...prev, new: e.target.checked }));
                            updateQueryString({ categories: newCategories });
                          }}
                        />
                        <label htmlFor="new">{dictionary.conditionNew}</label>
                      </div>
                    </div>
                  </div>
                </div>
                <button className={styles.filterElButton} type="submit">
                  <i className="fa-solid fa-magnifying-glass"></i>
                  {dictionary.applyButton}
                </button>
              </form>
            )}
          </div>
          <div className={styles.filtersWrapper}>
            <form className={styles.filterParts} action="#">
              <ul className={styles.filterList}>
                {[
                  dictionary.filter1,
                  dictionary.filter2,
                  dictionary.filter3,
                  dictionary.filter4,
                  dictionary.filter5,
                ].map((text, index) => (
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
                      {chosenFilters[index] || text}
                    </p>
                    <div
                      className={`${styles.filterElIconWrapper} ${
                        activeFilters.includes(index) ? styles.active : ''
                      } ${chosenFilters[index] ? styles.chosen : ''}`}
                      onClick={() => handleFilterClick(index)}
                    >
                      <i
                        className={`fa-solid fa-chevron-down ${
                          dropdowns[index] ? styles.rotateChevron : styles.rotateChevronBack
                        }`}
                      ></i>
                    </div>
                    {dropdowns[index] && (
                      <ul
                        className={`${styles.dropdownMenu} ${
                          dropdowns[index] ? styles.active : ''
                        }`}
                      >
                        {['Заглушка 1', 'Заглушка 2', 'Заглушка 3'].map(
                          (item, i) => (
                            <li
                              key={i}
                              className={styles.dropdownItem}
                              onClick={() => handleItemClick(index, item)}
                            >
                              {item}
                            </li>
                          )
                        )}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
              <button className={styles.filterElButton}>
                <i className="fa-solid fa-magnifying-glass"></i>
                {dictionary.selectButton}
              </button>
            </form>
          </div>
          <div className={styles.categoriesWrapper}>
            <div className={styles.categoriesTitleWrapper}>
              {dictionary.categoriesTitle}
              <i
                className={`fa-solid fa-chevron-down ${
                  isCategoriesOpen ? styles.rotateChevron : styles.rotateChevronBack
                }`}
                onClick={toggleCategories}
              ></i>
            </div>
            {isCategoriesOpen && (
              <ul className={styles.categoriesList}>
                {[
                  'Категорія 1',
                  'Категорія 2',
                  'Категорія 3',
                  'Категорія 4',
                  'Категорія 5',
                  'Категорія 6',
                  'Категорія 7',
                  'Категорія 8',
                  'Категорія 9',
                  'Категорія 10',
                ].map((category) => (
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
              <p>{dictionary.activeFiltersTitle}</p>
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
              <p>{dictionary.sortBy}</p>
              <div className={styles.sortedByDropdown}>
                <button
                  onClick={toggleSortDropdown}
                  className={styles.sortButton}
                >
                  {selectedSort}
                  <i
                    className={`fa-solid fa-chevron-down ${
                      isSortDropdownOpen ? styles.rotateChevron : styles.rotateChevronBack
                    }`}
                  ></i>
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
          <div className={styles.productsByCategories}>
            <h2 className={styles.productsByCategoriesTitle}>
              {dictionary.productsByCategoriesTitle}
            </h2>
            <p className={styles.productsByCategoriesPara}>
              {dictionary.productsByCategoriesPara}
            </p>
            <ul className={styles.productsByCategoriesList}>
              <li ref={addToCategoryRefs} className={styles.productsByCategoriesEl}>
                <img src="/images/Picture.png" alt="" />
                <p>Webasto</p>
              </li>
              <li ref={addToCategoryRefs} className={styles.productsByCategoriesEl}>
                <img src="/images/Picture.png" alt="" />
                <p>Webasto</p>
              </li>
              <li ref={addToCategoryRefs} className={styles.productsByCategoriesEl}>
                <img src="/images/Picture.png" alt="" />
                <p>Webasto</p>
              </li>
              <li ref={addToCategoryRefs} className={styles.productsByCategoriesEl}>
                <img src="/images/Picture.png" alt="" />
                <p>Webasto</p>
              </li>
              <li ref={addToCategoryRefs} className={styles.productsByCategoriesEl}>
                <img src="/images/Picture.png" alt="" />
                <p>Webasto</p>
              </li>
              <li ref={addToCategoryRefs} className={styles.productsByCategoriesEl}>
                <img src="/images/Picture.png" alt="" />
                <p>Webasto</p>
              </li>
              <li ref={addToCategoryRefs} className={styles.productsByCategoriesEl}>
                <img src="/images/Picture.png" alt="" />
                <p>Webasto</p>
              </li>
              <li ref={addToCategoryRefs} className={styles.productsByCategoriesEl}>
                <img src="/images/Picture.png" alt="" />
                <p>Webasto</p>
              </li>
              <li ref={addToCategoryRefs} className={styles.productsByCategoriesEl}>
                <img src="/images/Picture.png" alt="" />
                <p>Webasto</p>
              </li>
              <li ref={addToCategoryRefs} className={styles.productsByCategoriesEl}>
                <img src="/images/Picture.png" alt="" />
                <p>Webasto</p>
              </li>
            </ul>
          </div>
          <ul className={styles.productsList}>
            {paginatedProducts.map((product) => (
              <li
                key={product.id}
                ref={addToProductRefs}
                className={styles.productsEL}
              >
                <div className={styles.productImageWrapper}>
                  <img
                    className={styles.productsImage}
                    src={product.image}
                    alt=""
                  />
                  <i
                    className={`fa-${favoriteItems[product.id] ? 'solid' : 'regular'} fa-heart ${
                      favoriteItems[product.id] ? styles.active : ''
                    }`}
                    onClick={() => handleFavoriteClick(product.id)}
                  ></i>
                </div>
                <p className={styles.productsPara}>
                  <span>{dictionary.lotNumberLabel}</span> {product.lotNumber}
                </p>
                <p className={styles.productsPara}>{product.description}</p>
                <div className={styles.productsPriceWrapper}>
                  <p className={styles.pricePara}>{product.price}</p>
                  <button className={styles.priceButton}>
                    <i className="fa-solid fa-bag-shopping"></i>
                    {dictionary.addToCart}
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

export default CatalogContentClient;