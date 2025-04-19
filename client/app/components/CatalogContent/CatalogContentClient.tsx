'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import styles from './CatalogContent.module.css';
import NavPath from '@/app/components/NavPath/NavPath';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCartStore, CartItem, WishlistItem } from '@/store/cartStore';

interface Product {
  id: number;
  nameuk: string;
  nameru: string;
  price: number;
  imgs: {
    id: number;
    src: string;
  }[];
}

type CatalogContentClientProps = {
  dictionary: any;
  products: Product[];
  totalPages: number;
  lang: string;
};

const parseQueryParam = (
  param: string | null,
  defaultValue: string[] = []
): string[] => {
  if (!param) return defaultValue;
  return param.split(',');
};

const createQueryString = (
  currentParams: URLSearchParams,
  newParams: { [key: string]: string | string[] | null | undefined }
): string => {
  const params = new URLSearchParams(currentParams);
  Object.entries(newParams).forEach(([key, value]) => {
    if (value === null || value === undefined || value === '') {
      params.delete(key);
    } else if (Array.isArray(value)) {
      if (value.length > 0) {
        params.set(key, value.join(','));
      } else {
        params.delete(key);
      }
    } else {
      params.set(key, value);
    }
  });
  return params.toString();
};

const CatalogContentClient: React.FC<CatalogContentClientProps> = ({
  dictionary,
  products,
  totalPages,
  lang,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [chosenFilters, setChosenFilters] = useState<{ [key: number]: string }>({});
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState<string>('');
  const [showCartNotification, setShowCartNotification] = useState<{ [key: number]: boolean }>({});
  const [showWishlistNotification, setShowWishlistNotification] = useState<{ [key: number]: boolean }>({});

  const [activeFilters, setActiveFilters] = useState<number[]>([0, 3]);
  const [dropdowns, setDropdowns] = useState<{ [key: number]: boolean }>({});
  const [isCategoriesOpen, setIsCategoriesOpen] = useState<boolean>(true);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<'filter' | 'sort' | null>(null);

  const itemsRef = useRef<HTMLLIElement[]>([]);
  const categoryItemsRef = useRef<HTMLLIElement[]>([]);

  const { cart, wishlist, addToCart, removeFromCart, addToWishlist, removeFromWishlist } = useCartStore();

  useEffect(() => {
    const pageFromUrl = parseInt(searchParams.get('page') || '1', 10);
    setCurrentPage(pageFromUrl);
    setActiveCategories(parseQueryParam(searchParams.get('categories')));
    setSelectedSort(searchParams.get('sort') || dictionary.sortOptions.popularity);

    const filtersFromUrl = searchParams.get('filters');
    if (filtersFromUrl) {
      try {
        const parsedFilters = Object.fromEntries(
          filtersFromUrl.split(',').map((f) => {
            const [key, value] = f.split('=');
            const index = parseInt(key.replace('filter', ''), 10);
            return [index, value];
          }).filter(([index]) => !isNaN(index))
        );
        setChosenFilters(parsedFilters);
        const newActiveFilters = [0, 3];
        Object.keys(parsedFilters).forEach(keyStr => {
          const key = parseInt(keyStr, 10);
          if (key === 0 && !newActiveFilters.includes(1)) newActiveFilters.push(1);
          if (key === 1 && !newActiveFilters.includes(2)) newActiveFilters.push(2);
          if (key === 3 && !newActiveFilters.includes(4)) newActiveFilters.push(4);
        });
        setActiveFilters([...new Set(newActiveFilters)]);
      } catch (e) {
        console.error("Помилка парсингу фільтрів з URL:", e);
        setChosenFilters({});
        setActiveFilters([0, 3]);
      }
    } else {
      setChosenFilters({});
      setActiveFilters([0, 3]);
    }

    itemsRef.current = [];
    categoryItemsRef.current = [];
  }, [searchParams, dictionary.sortOptions.popularity]);

  const updateUrl = (newParams: { [key: string]: string | string[] | null | undefined }) => {
    const resetPage = Object.keys(newParams).some(key => key !== 'page');
    const paramsToUpdate = { ...newParams };
    if (resetPage) {
      paramsToUpdate.page = '1';
    }
    const queryString = createQueryString(searchParams, paramsToUpdate);
    const newUrl = `/${lang}/catalog${queryString ? `?${queryString}` : ''}`;
    router.push(newUrl, { scroll: false });
  };

  const handleProductClick = (productId: number) => {
    const productUrl = `/${lang}/catalog/${productId}`;
    router.push(productUrl);
  };

  const handleWishlistClick = (product: Product) => {
    const productId = `${product.id}`;
    const isInWishlist = wishlist.some((item) => item.id === productId);

    if (isInWishlist) {
      removeFromWishlist(productId);
    } else {
      const wishlistItem: WishlistItem = {
        id: productId,
        lotNumber: product.lotNumber,
        name: product.description,
        price: product.price,
        image: product.image,
      };
      addToWishlist(wishlistItem);
    }

    setShowWishlistNotification((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setShowWishlistNotification((prev) => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  const handleAddToCart = (product: Product) => {
    const productId = `${product.id}`;
    const isInCart = cart.some((item) => item.id === productId);

    if (isInCart) {
      removeFromCart(productId);
    } else {
      const cartItem: CartItem = {
        id: productId,
        lotNumber: product.lotNumber,
        name: product.description,
        price: product.price,
        image: product.image,
        quantity: 1,
      };
      addToCart(cartItem);
    }

    setShowCartNotification((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setShowCartNotification((prev) => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  const handleFilterClick = (index: number): void => {
    if (!activeFilters.includes(index)) return;
    setDropdowns((prev) => {
      const newState = Object.keys(prev).reduce(
        (acc, key) => {
          acc[parseInt(key, 10)] = false;
          return acc;
        },
        {} as { [key: number]: boolean }
      );
      return { ...newState, [index]: !prev[index] };
    });
  };

  const handleItemClick = (filterIndex: number, value: string): void => {
    const newChosenFilters = { ...chosenFilters, [filterIndex]: value };
    setChosenFilters(newChosenFilters);
    setDropdowns((prev) => ({ ...prev, [filterIndex]: false }));

    if (filterIndex === 0) setActiveFilters((prev) => [...new Set([...prev, 1])]);
    if (filterIndex === 1) setActiveFilters((prev) => [...new Set([...prev, 2])]);
    if (filterIndex === 3) setActiveFilters((prev) => [...new Set([...prev, 4])]);

    const filtersString = Object.entries(newChosenFilters)
      .map(([key, val]) => `filter${key}=${val}`)
      .join(',');

    updateUrl({ filters: filtersString || null });
  };

  const toggleCategories = (): void => {
    setIsCategoriesOpen((prev) => !prev);
  };

  const handleCategoryClick = (category: string): void => {
    const newCategories = activeCategories.includes(category)
      ? activeCategories.filter((cat) => cat !== category)
      : [...activeCategories, category];
    updateUrl({ categories: newCategories.length > 0 ? newCategories : null });
  };

  const handleRemoveActiveCategory = (category: string): void => {
    const newCategories = activeCategories.filter((cat) => cat !== category);
    updateUrl({ categories: newCategories.length > 0 ? newCategories : null });
  };

  const toggleSortDropdown = (): void => {
    setIsSortDropdownOpen((prev) => !prev);
  };

  const handleSortSelect = (option: string): void => {
    setIsSortDropdownOpen(false);
    const sortValue = option === dictionary.sortOptions.popularity ? null : option;
    updateUrl({ sort: sortValue });
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      updateUrl({ page: page.toString() });
    }
  };

  const handleFilterSectionClick = () => {
    setActiveSection(activeSection === 'filter' ? null : 'filter');
  };

  const handleSortSectionClick = () => {
    setActiveSection(activeSection === 'sort' ? null : 'sort');
  };

  const getPaginationItems = () => {
    const delta = 1;
    const range = [];
    const rangeWithDots: (number | string)[] = [];
    range.push(1);
    let left = Math.max(2, currentPage - delta);
    let right = Math.min(totalPages - 1, currentPage + delta);
    if (currentPage - delta <= 2) right = Math.min(totalPages - 1, 1 + 2 * delta + 1);
    if (currentPage + delta >= totalPages - 1) left = Math.max(2, totalPages - 2 * delta - 1);
    for (let i = left; i <= right; i++) range.push(i);
    if (totalPages > 1 && !range.includes(totalPages)) range.push(totalPages);
    let last: number | null = null;
    for (const page of range) {
      if (last !== null && page - last > 1) rangeWithDots.push('...');
      rangeWithDots.push(page);
      last = page;
    }
    return rangeWithDots;
  };
  const paginationItems = useMemo(getPaginationItems, [currentPage, totalPages]);

  const addToProductRefs = (el: HTMLLIElement | null) => { if (el && !itemsRef.current.includes(el)) itemsRef.current.push(el); };
  const addToCategoryRefs = (el: HTMLLIElement | null) => { if (el && !categoryItemsRef.current.includes(el)) categoryItemsRef.current.push(el); };

  useEffect(() => {
    const handleProductMouseEnter = (item: HTMLLIElement) => { item.style.transform = 'scale(1.03)'; const image = item.querySelector(`.${styles.productsImage}`) as HTMLElement; if (image) image.style.transform = 'scale(1.05)'; };
    const handleProductMouseLeave = (item: HTMLLIElement) => { item.style.transform = 'scale(1)'; const image = item.querySelector(`.${styles.productsImage}`) as HTMLElement; if (image) image.style.transform = 'scale(1)'; };
    const handleCategoryMouseEnter = (item: HTMLLIElement) => { item.style.transform = 'scale(1.05)'; const image = item.querySelector('img'); if (image) image.style.transform = 'scale(1.1)'; };
    const handleCategoryMouseLeave = (item: HTMLLIElement) => { item.style.transform = 'scale(1)'; const image = item.querySelector('img'); if (image) image.style.transform = 'scale(1)'; };

    const currentProductItems = itemsRef.current;
    const currentCategoryItems = categoryItemsRef.current;

    currentProductItems.forEach((item) => { if (item) { item.addEventListener('mouseenter', () => handleProductMouseEnter(item)); item.addEventListener('mouseleave', () => handleProductMouseLeave(item)); } });
    currentCategoryItems.forEach((item) => { if (item) { item.addEventListener('mouseenter', () => handleCategoryMouseEnter(item)); item.addEventListener('mouseleave', () => handleCategoryMouseLeave(item)); } });

    return () => {
      currentProductItems.forEach((item) => { if (item) { item.removeEventListener('mouseenter', () => handleProductMouseEnter(item)); item.removeEventListener('mouseleave', () => handleProductMouseLeave(item)); } });
      currentCategoryItems.forEach((item) => { if (item) { item.removeEventListener('mouseenter', () => handleCategoryMouseEnter(item)); item.removeEventListener('mouseleave', () => handleCategoryMouseLeave(item)); } });
    };
  }, [products]);

  const sortOptions: string[] = useMemo(() => [
    dictionary.sortOptions.popularity,
    dictionary.sortOptions.priceLowToHigh,
    dictionary.sortOptions.priceHighToLow,
    dictionary.sortOptions.newest,
  ], [dictionary.sortOptions]);

  return (
    <div className={styles.catalog}>
      <NavPath />
      <div className={styles.catalogContentWrapper}>
        <div className={styles.sidebarWrapper}>
          <div className={styles.mobileSideBarWrapper}>
            <div className={styles.filterTab}>
              <div
                className={`${styles.filterTabFilter} ${activeSection === 'filter' ? styles.active : ''}`}
                onClick={handleFilterSectionClick}
              >
                <div className={styles.filterTabFilterWrapper}>
                  <div className={styles.filterTabFilterWrapperText}>
                    <i className="fa-solid fa-sliders"></i>
                    <span>{dictionary.filterTabFilter}</span>
                  </div>
                  <i className={`fa-solid fa-chevron-down ${activeSection === 'filter' ? styles.rotateChevron : styles.rotateChevronBack}`}></i>
                </div>
              </div>
              <div
                className={`${styles.filterTabSort} ${activeSection === 'sort' ? styles.active : ''}`}
                onClick={handleSortSectionClick}
              >
                <div className={styles.filterTabFilterWrapper}>
                  <div className={styles.filterTabFilterWrapperText}>
                    <img src="/images/sortIcon.svg" alt="" />
                    <span>{dictionary.filterTabSort}</span>
                  </div>
                  <i className={`fa-solid fa-chevron-down ${activeSection === 'sort' ? styles.rotateChevron : styles.rotateChevronBack}`}></i>
                </div>
              </div>
            </div>
            {activeSection === 'filter' && (
              <form className={styles.filterPartsFilter} action="#">
                <ul className={styles.filterList}>
                  {[
                    dictionary.filter1, dictionary.filter2, dictionary.filter3,
                    dictionary.filter4, dictionary.filter5,
                  ].map((text, index) => (
                    <li
                      key={index}
                      className={`${styles.filterEl} ${activeFilters.includes(index) ? styles.active : ''} ${chosenFilters[index] ? styles.chosen : ''}`}
                    >
                      <p
                        className={`${styles.filterElPara} ${chosenFilters[index] ? styles.chosen : ''}`}
                        onClick={() => handleFilterClick(index)}
                        style={{ cursor: activeFilters.includes(index) ? 'pointer' : 'default' }}
                      >
                        <span className={`${styles.filterElNumber} ${activeFilters.includes(index) ? styles.active : ''} ${chosenFilters[index] ? styles.chosen : ''}`}>
                          {index + 1}
                        </span>
                        {chosenFilters[index] || text}
                      </p>
                      <div
                        className={`${styles.filterElIconWrapper} ${activeFilters.includes(index) ? styles.active : ''} ${chosenFilters[index] ? styles.chosen : ''}`}
                        onClick={() => handleFilterClick(index)}
                        style={{ cursor: activeFilters.includes(index) ? 'pointer' : 'default' }}
                      >
                        <i className={`fa-solid fa-chevron-down ${dropdowns[index] ? styles.rotateChevron : styles.rotateChevronBack}`}></i>
                      </div>
                      {dropdowns[index] && (
                        <ul className={`${styles.dropdownMenu} ${dropdowns[index] ? styles.active : ''}`}>
                          {['Заглушка 1', 'Заглушка 2', 'Заглушка 3'].map((item, i) => (
                            <li key={i} className={styles.dropdownItem} onClick={() => handleItemClick(index, item)}>
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </form>
            )}
            {activeSection === 'sort' && (
              <form className={styles.filterPartsSort} action="#">
                <div className={styles.filterSection}>
                  <label>{dictionary.filterLabel}</label>
                  {sortOptions.map(option => (
                    <div key={option} className={styles.filterSectionEl}>
                      <input
                        type="radio"
                        id={`mobile-sort-${option.replace(/\s+/g, '-')}`}
                        name="mobile-sort"
                        value={option}
                        checked={selectedSort === option}
                        onChange={() => handleSortSelect(option)}
                      />
                      <label htmlFor={`mobile-sort-${option.replace(/\s+/g, '-')}`}>{option}</label>
                    </div>
                  ))}
                </div>
                <div className={styles.filterSection}>
                  <label>{dictionary.conditionLabel}</label>
                  <div className={styles.filterSectionSortWrapper}>
                    {['used', 'new'].map(condition => (
                      <div key={condition} className={styles.filterSectionEl}>
                        <input
                          type="checkbox"
                          id={`mobile-condition-${condition}`}
                          name="mobile-condition"
                          value={condition}
                          checked={activeCategories.includes(condition)}
                          onChange={() => handleCategoryClick(condition)}
                        />
                        <label htmlFor={`mobile-condition-${condition}`}>
                          {condition === 'used' ? dictionary.conditionUsed : dictionary.conditionNew}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </form>
            )}
          </div>

          <div className={styles.filtersWrapper}>
            <form className={styles.filterParts} action="#">
              <ul className={styles.filterList}>
                {[
                  dictionary.filter1, dictionary.filter2, dictionary.filter3,
                  dictionary.filter4, dictionary.filter5,
                ].map((text, index) => (
                  <li
                    key={index}
                    className={`${styles.filterEl} ${activeFilters.includes(index) ? styles.active : ''} ${chosenFilters[index] ? styles.chosen : ''}`}
                  >
                    <p
                      className={`${styles.filterElPara} ${chosenFilters[index] ? styles.chosen : ''}`}
                      onClick={() => handleFilterClick(index)}
                      style={{ cursor: activeFilters.includes(index) ? 'pointer' : 'default' }}
                    >
                      <span className={`${styles.filterElNumber} ${activeFilters.includes(index) ? styles.active : ''} ${chosenFilters[index] ? styles.chosen : ''}`}>
                        {index + 1}
                      </span>
                      {chosenFilters[index] || text}
                    </p>
                    <div
                      className={`${styles.filterElIconWrapper} ${activeFilters.includes(index) ? styles.active : ''} ${chosenFilters[index] ? styles.chosen : ''}`}
                      onClick={() => handleFilterClick(index)}
                      style={{ cursor: activeFilters.includes(index) ? 'pointer' : 'default' }}
                    >
                      <i className={`fa-solid fa-chevron-down ${dropdowns[index] ? styles.rotateChevron : styles.rotateChevronBack}`}></i>
                    </div>
                    {dropdowns[index] && (
                      <ul className={`${styles.dropdownMenu} ${dropdowns[index] ? styles.active : ''}`}>
                        {['Заглушка 1', 'Заглушка 2', 'Заглушка 3'].map((item, i) => (
                          <li key={i} className={styles.dropdownItem} onClick={() => handleItemClick(index, item)}>
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </form>
          </div>

          <div className={styles.categoriesWrapper}>
            <div className={styles.categoriesTitleWrapper} onClick={toggleCategories} style={{ cursor: 'pointer' }}>
              {dictionary.categoriesTitle}
              <i className={`fa-solid fa-chevron-down ${isCategoriesOpen ? styles.rotateChevron : styles.rotateChevronBack}`}></i>
            </div>
            {isCategoriesOpen && (
              <ul className={styles.categoriesList}>
                {[
                  'Категорія 1', 'Категорія 2', 'Категорія 3', 'Категорія 4',
                  'Категорія 5', 'Категорія 6', 'Категорія 7', 'Категорія 8',
                  'Категорія 9', 'Категорія 10',
                ].map((category) => (
                  <li
                    key={category}
                    className={styles.categoriesEl}
                    onClick={() => handleCategoryClick(category)}
                    style={{ cursor: 'pointer' }}
                  >
                    <input
                      type="checkbox"
                      readOnly
                      checked={activeCategories.includes(category)}
                      tabIndex={-1}
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
              <ul className={styles.activeFiltersList}>
                {activeCategories.map((category) => (
                  <li key={`active-${category}`} className={styles.activeFiltersEl}>
                    {category}
                    <i className="fa-solid fa-xmark" onClick={() => handleRemoveActiveCategory(category)} style={{ cursor: 'pointer', marginLeft: '5px' }}></i>
                  </li>
                ))}
                {Object.entries(chosenFilters).map(([key, value]) => (
                  <li key={`active-filter-${key}`} className={styles.activeFiltersEl}>
                    {`${dictionary[`filter${parseInt(key, 10) + 1}`] || `Фільтр ${parseInt(key, 10) + 1}`}: ${value}`}
                    <i className="fa-solid fa-xmark" onClick={() => {
                      const newChosen = { ...chosenFilters };
                      delete newChosen[parseInt(key, 10)];
                      setChosenFilters(newChosen);
                      const filtersString = Object.entries(newChosen).map(([k, v]) => `filter${k}=${v}`).join(',');
                      updateUrl({ filters: filtersString || null });
                    }} style={{ cursor: 'pointer', marginLeft: '5px' }}></i>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.sortBy}>
              <p>{dictionary.sortBy}</p>
              <div className={styles.sortedByDropdown}>
                <button onClick={toggleSortDropdown} className={styles.sortButton}>
                  {selectedSort || dictionary.sortOptions.popularity}
                  <i className={`fa-solid fa-chevron-down ${isSortDropdownOpen ? styles.rotateChevron : styles.rotateChevronBack}`}></i>
                </button>
                {isSortDropdownOpen && (
                  <div className={styles.sortedByDropdownMenu}>
                    {sortOptions.map((option) => (
                      <p key={option} className={`${styles.sortOption} ${selectedSort === option ? styles.activeSort : ''}`} onClick={() => handleSortSelect(option)}>
                        {option}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className={styles.productsByCategories}>
            <h2 className={styles.productsByCategoriesTitle}>{dictionary.productsByCategoriesTitle}</h2>
            <p className={styles.productsByCategoriesPara}>{dictionary.productsByCategoriesPara}</p>
            <ul className={styles.productsByCategoriesList}>
              {[...Array(10)].map((_, index) => (
                <li key={index} ref={addToCategoryRefs} className={styles.productsByCategoriesEl}>
                  <img src="/images/Picture.png" alt={`Категорія ${index + 1}`} />
                  <p>Webasto {index + 1}</p>
                </li>
              ))}
            </ul>
          </div>

          {products && products.length > 0 ? (
            <ul className={styles.productsList}>
              {products.map((product) => {
                const productId = `${product.id}`;
                const isInWishlist = wishlist.some((item) => item.id === productId);
                const isInCart = cart.some((item) => item.id === productId);

                return (
                  <li
                    key={product.id}
                    ref={addToProductRefs}
                    className={styles.productsEL}
                    onClick={() => handleProductClick(product.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className={styles.productImageWrapper}>
                      <img
                        className={styles.productsImage}
                        src={`${process.env.NEXT_PUBLIC_SERVER}${product.image}` || 'https://placehold.co/300x300/eee/ccc?text=Немає+фото'}
                        alt={product.description}
                        onError={(e) => { const target = e.target as HTMLImageElement; target.onerror = null; target.src = 'https://placehold.co/300x300/eee/ccc?text=Помилка'; }}
                      />
                      <div className={styles.wishlist} onClick={(e) => { e.stopPropagation(); handleWishlistClick(product); }}>
                        {showWishlistNotification[product.id] && (
                          <div className={styles.notification}>
                            {isInWishlist ? dictionary.wishlist.notificationAdd : dictionary.wishlist.notificationRemove}
                          </div>
                        )}
                        <svg
                          width="18"
                          height="16"
                          viewBox="0 0 18 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className={isInWishlist ? styles.wishlistIconActive : styles.wishlistIcon}
                        >
                          <path
                            d="M12.75 0.363281C12.0208 0.363281 11.3275 0.519531 10.6699 0.832031C10.0124 1.14453 9.45573 1.56771 9 2.10156C8.54427 1.56771 7.98763 1.14453 7.33008 0.832031C6.67253 0.519531 5.97917 0.363281 5.25 0.363281C4.61198 0.363281 4.01302 0.480469 3.45312 0.714844C2.89323 0.949219 2.4082 1.27148 1.99805 1.68164C1.58789 2.0918 1.26562 2.57682 1.03125 3.13672C0.783854 3.69661 0.660156 4.29557 0.660156 4.93359C0.660156 5.72786 0.829427 6.48958 1.16797 7.21875C1.51953 7.96094 2.00456 8.70964 2.62305 9.46484C3.24154 10.2201 3.98698 11.0143 4.85938 11.8477C5.74479 12.681 6.72135 13.5859 7.78906 14.5625L9 15.6367L10.2109 14.543C11.2786 13.5664 12.2552 12.668 13.1406 11.8477C14.013 11.0143 14.7585 10.2168 15.377 9.45508C15.9954 8.69336 16.4805 7.94792 16.832 7.21875C17.1706 6.48958 17.3398 5.72786 17.3398 4.93359C17.3398 4.29557 17.2161 3.69661 16.9688 3.13672C16.7344 2.57682 16.4121 2.0918 16.002 1.68164C15.5918 1.27148 15.1068 0.949219 14.5469 0.714844C13.987 0.480469 13.388 0.363281 12.75 0.363281ZM9.07812 13.3125L9 13.3906L8.92188 13.3125C7.93229 12.4141 7.02734 11.5872 6.20703 10.832C5.39974 10.0638 4.70964 9.3444 4.13672 8.67383C3.5638 8.00326 3.12109 7.36198 2.80859 6.75C2.49609 6.13802 2.33984 5.53255 2.33984 4.93359C2.33984 4.10026 2.61654 3.4069 3.16992 2.85352C3.72331 2.30013 4.41667 2.02344 5.25 2.02344C5.88802 2.02344 6.48698 2.20898 7.04688 2.58008C7.60677 2.95117 7.9974 3.42318 8.21875 3.99609H9.78125C10.0026 3.42318 10.3932 2.95117 10.9531 2.58008C11.513 2.20898 12.112 2.02344 12.75 2.02344C13.5833 2.02344 14.2767 2.30013 14.8301 2.85352C15.3835 3.4069 15.6602 4.10026 15.6602 4.93359C15.6602 5.53255 15.5039 6.13802 15.1914 6.75C14.8789 7.36198 14.4362 8.00326 13.8633 8.67383C13.2904 9.3444 12.6003 10.0638 11.793 10.832C10.9727 11.5872 10.0677 12.4141 9.07812 13.3125Z"
                            fill={isInWishlist ? '#FF0000' : '#646464'}
                          />
                        </svg>
                      </div>
                    </div>
                    {/* <p className={styles.productsPara}><span>{dictionary.lotNumberLabel}</span> {product.lotNumber}</p> */}
                    <p className={styles.productsPara} title={product.description}>
                      {product.description.length > 100 ? `${product.description.substring(0, 97)}...` : product.description}
                    </p>
                    <div className={styles.productsPriceWrapper}>
                      <p className={styles.pricePara}>{product.price}</p>
                      <div className={styles.buyButtonWrapper}>
                        {showCartNotification[product.id] && (
                          <div className={styles.notification}>
                            {isInCart ? dictionary.actions.cartNotification : dictionary.actions.cartRemovedNotification}
                          </div>
                        )}
                        <button
                          className={`${styles.priceButton} ${isInCart ? styles.inCart : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(product);
                          }}
                          disabled={isInCart}
                        >
                          <svg width="24" height="40" viewBox="0 0 24 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M19.0078 14H16.9922C16.9922 13.3125 16.8672 12.6641 16.6172 12.0547C16.3516 11.4453 15.9922 10.9141 15.5391 10.4609C15.0859 10.0078 14.5547 9.64844 13.9453 9.38281C13.3359 9.13281 12.6875 9.00781 12 9.00781C11.3125 9.00781 10.6641 9.13281 10.0547 9.38281C9.44531 9.64844 8.91406 10.0078 8.46094 10.4609C8.00781 10.9141 7.64844 11.4453 7.38281 12.0547C7.13281 12.6641 7.00781 13.3125 7.00781 14H4.99219C4.44531 14 3.97656 14.1953 3.58594 14.5859C3.19531 14.9766 3 15.4453 3 15.9922V27.9922C3 28.5547 3.19531 29.0312 3.58594 29.4219C3.97656 29.8125 4.44531 30.0078 4.99219 30.0078H19.0078C19.5547 30.0078 20.0234 29.8125 20.4141 29.4219C20.8047 29.0312 21 28.5547 21 27.9922V15.9922C21 15.4453 20.8047 14.9766 20.4141 14.5859C20.0234 14.1953 19.5547 14 19.0078 14ZM12 11C12.8281 11 13.5352 11.293 14.1211 11.8789C14.707 12.4648 15 13.1719 15 14H9C9 13.1719 9.29297 12.4648 9.87891 11.8789C10.4648 11.293 11.1719 11 12 11ZM12 21.0078C11.3125 21.0078 10.6641 20.875 10.0547 20.6094C9.44531 20.3438 8.91406 19.9844 8.46094 19.5312C8.00781 19.0781 7.64844 18.5469 7.38281 17.9375C7.13281 17.3281 7.00781 16.6797 7.00781 15.9922H9C9 16.8203 9.29297 17.5273 9.87891 18.1133C10.4648 18.6992 11.1719 18.9922 12 18.9922C12.8281 18.9922 13.5352 18.6992 14.1211 18.1133C14.707 17.5273 15 16.8203 15 15.9922H16.9922C16.9922 16.6797 16.8672 17.3281 16.6172 17.9375C16.3516 18.5469 15.9922 19.0781 15.5391 19.5312C15.0859 19.9844 14.5547 20.3438 13.9453 20.6094C13.3359 20.875 12.6875 21.0078 12 21.0078Z"
                              fill="white"
                            />
                          </svg>
                          {isInCart ? dictionary.actions.inCart : dictionary.actions.buy}
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className={styles.noProducts}><p>{dictionary.noProductsFound || 'Товарів не знайдено за вашим запитом.'}</p></div>
          )}

          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button className={`${styles.pageButton} ${currentPage === 1 ? styles.disabled : ''}`} onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} aria-label="Попередня сторінка">«</button>
              {paginationItems.map((item, index) => typeof item === 'number' ? (
                <button key={index} className={`${styles.pageNumber} ${currentPage === item ? styles.active : ''}`} onClick={() => handlePageChange(item)} aria-label={`Сторінка ${item}`} aria-current={currentPage === item ? 'page' : undefined}>{item}</button>
              ) : (<span key={index} className={styles.pageDots}>{item}</span>))}
              <button className={`${styles.pageButton} ${currentPage === totalPages ? styles.disabled : ''}`} onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} aria-label="Наступна сторінка">»</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CatalogContentClient;
