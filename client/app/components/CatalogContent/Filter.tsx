'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from './CatalogContent.module.css';
import { useRouter } from 'next/navigation';
import { Locale } from '@/i18n.config';
import { $host } from '@/app/http';

type Props = {
  dictionary: any;
  searchParams: any;
  lang: Locale;
};

const parseQueryParam = (
  param: string | null,
  defaultValue: string[] = []
): string[] => {
  if (!param) return defaultValue;
  return param.split(',');
};

const Filter = ({ dictionary, searchParams, lang }: Props) => {
  const router = useRouter();

  const sortOptions: string[] = useMemo(
    () => [
      dictionary.sortOptions.popularity,
      dictionary.sortOptions.priceLowToHigh,
      dictionary.sortOptions.priceHighToLow,
      dictionary.sortOptions.newest,
    ],
    [dictionary.sortOptions]
  );

  const [activeSection, setActiveSection] = useState<'filter' | 'sort' | null>(
    null
  );
  const [chosenFilters, setChosenFilters] = useState<{ [key: number]: string }>(
    {}
  );
  const [showCartNotification, setShowCartNotification] = useState<{
    [key: number]: boolean;
  }>({});

  const [activeFilters, setActiveFilters] = useState<number[]>([0, 2]);
  const [dropdowns, setDropdowns] = useState<{ [key: number]: boolean }>({});
  const [isCategoriesOpen, setIsCategoriesOpen] = useState<boolean>(true);

  const updateUrl = (newParams: {
    [key: string]: string | string[] | null | undefined;
  }) => {
    const currentParams = new URLSearchParams(searchParams); // ReadonlyURLSearchParams → URLSearchParams
    const queryString = createQueryString(currentParams, newParams);
    const newUrl = `/${lang}/catalog/1${queryString ? `?${queryString}` : ''}`;
    router.push(newUrl, { scroll: false });
  };

  const handleFilterSectionClick = () => {
    setActiveSection(activeSection === 'filter' ? null : 'filter');
  };

  const handleSortSectionClick = () => {
    setActiveSection(activeSection === 'sort' ? null : 'sort');
  };
  const [activeCategories, setActiveCategories] = useState<string[]>([]);

  const [selectedSort, setSelectedSort] = useState<string>('');

  const itemsRef = useRef<HTMLLIElement[]>([]);
  const categoryItemsRef = useRef<HTMLLIElement[]>([]);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState<boolean>(false);

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

  const handleItemClick = (
    filterIndex: number,
    key: string,
    value: string
  ): void => {
    const newChosenFilters = { ...chosenFilters, [filterIndex]: value };
    setChosenFilters(newChosenFilters);
    setDropdowns((prev) => ({ ...prev, [filterIndex]: false }));

    if (filterIndex === 0)
      setActiveFilters((prev) => Array.from(new Set([...prev, 1])));
    if (filterIndex === 1)
      setActiveFilters((prev) => Array.from(new Set([...prev, 2])));
    if (filterIndex === 3)
      setActiveFilters((prev) => Array.from(new Set([...prev, 4])));

    const filtersString = Object.entries(newChosenFilters)
      .map(([key, val]) => `${key}=${val}`)
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

  const handleSortSelect = (option: string): void => {
    setIsSortDropdownOpen(false);
    const sortValue =
      option === dictionary.sortOptions.popularity ? null : option;
    updateUrl({ sort: sortValue });
  };

  const [brands, setBrands] = useState<{ id: number; name: string }[]>([]);
  const [category, setCategory] = useState<{ id: number; name: string }[]>([]);

  const getBrands = async () => {
    const res = await $host.get('product/getBrands');
    setBrands(res.data.brands);
  };

  const getCategory = async () => {
    const res = await $host.get(`product/getCategoryTypeDetail?lang=${lang}`);
    setCategory(res.data.res);
  };

  useEffect(() => {
    getBrands();
    getCategory();
  }, []);

  console.log(brands, category);

  return (
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
                  activeSection === 'filter'
                    ? styles.rotateChevron
                    : styles.rotateChevronBack
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
                  activeSection === 'sort'
                    ? styles.rotateChevron
                    : styles.rotateChevronBack
                }`}
              ></i>
            </div>
          </div>
        </div>
        {activeSection === 'filter' && (
          <form className={styles.filterPartsFilter} action="#">
            <ul className={styles.filterList}>
              {[
                { id: 'brand', title: dictionary.filter1, arr: brands },
                { id: 'model', title: dictionary.filter2, arr: [] },
                { id: 'category', title: dictionary.filter4, arr: category },
                { id: 'typeDetail', title: dictionary.filter5, arr: [] },
              ].map((x, index) => (
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
                    style={{
                      cursor: activeFilters.includes(index)
                        ? 'pointer'
                        : 'default',
                    }}
                  >
                    <span
                      className={`${styles.filterElNumber} ${
                        activeFilters.includes(index) ? styles.active : ''
                      } ${chosenFilters[index] ? styles.chosen : ''}`}
                    >
                      {index + 1}
                    </span>
                    {x.arr.find((item: any) => item.id === chosenFilters[index])
                      ?.name || x.title}
                  </p>
                  <div
                    className={`${styles.filterElIconWrapper} ${
                      activeFilters.includes(index) ? styles.active : ''
                    } ${chosenFilters[index] ? styles.chosen : ''}`}
                    onClick={() => handleFilterClick(index)}
                    style={{
                      cursor: activeFilters.includes(index)
                        ? 'pointer'
                        : 'default',
                    }}
                  >
                    <i
                      className={`fa-solid fa-chevron-down ${
                        dropdowns[index]
                          ? styles.rotateChevron
                          : styles.rotateChevronBack
                      }`}
                    ></i>
                  </div>
                  {dropdowns[index] && (
                    <ul
                      className={`${styles.dropdownMenu} ${
                        dropdowns[index] ? styles.active : ''
                      }`}
                    >
                      {x.arr.map((item: any) => (
                        <li
                          key={item.id}
                          className={styles.dropdownItem}
                          onClick={() => handleItemClick(index, x.id, item.id)}
                        >
                          {item.name}
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
              {sortOptions.map((option) => (
                <div key={option} className={styles.filterSectionEl}>
                  <input
                    type="radio"
                    id={`mobile-sort-${option.replace(/\s+/g, '-')}`}
                    name="mobile-sort"
                    value={option}
                    checked={selectedSort === option}
                    onChange={() => handleSortSelect(option)}
                  />
                  <label htmlFor={`mobile-sort-${option.replace(/\s+/g, '-')}`}>
                    {option}
                  </label>
                </div>
              ))}
            </div>
            <div className={styles.filterSection}>
              <label>{dictionary.conditionLabel}</label>
              <div className={styles.filterSectionSortWrapper}>
                {['used', 'new'].map((condition) => (
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
                      {condition === 'used'
                        ? dictionary.conditionUsed
                        : dictionary.conditionNew}
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
              { id: 'brand', title: dictionary.filter1, arr: brands },
              { id: 'model', title: dictionary.filter2, arr: [] },
              { id: 'category', title: dictionary.filter4, arr: category },
              { id: 'typeDetail', title: dictionary.filter5, arr: [] },
            ].map((x, index) => (
              <li
                key={x.id}
                className={`${styles.filterEl} ${
                  activeFilters.includes(index) ? styles.active : ''
                } ${chosenFilters[index] ? styles.chosen : ''}`}
              >
                <p
                  className={`${styles.filterElPara} ${
                    chosenFilters[index] ? styles.chosen : ''
                  }`}
                  onClick={() => handleFilterClick(index)}
                  style={{
                    cursor: activeFilters.includes(index)
                      ? 'pointer'
                      : 'default',
                  }}
                >
                  <span
                    className={`${styles.filterElNumber} ${
                      activeFilters.includes(index) ? styles.active : ''
                    } ${chosenFilters[index] ? styles.chosen : ''}`}
                  >
                    {index + 1}
                  </span>
                  {x.arr.find((item: any) => item.id === chosenFilters[index])
                    ?.name || x.title}{' '}
                </p>
                <div
                  className={`${styles.filterElIconWrapper} ${
                    activeFilters.includes(index) ? styles.active : ''
                  } ${chosenFilters[index] ? styles.chosen : ''}`}
                  onClick={() => handleFilterClick(index)}
                  style={{
                    cursor: activeFilters.includes(index)
                      ? 'pointer'
                      : 'default',
                  }}
                >
                  <i
                    className={`fa-solid fa-chevron-down ${
                      dropdowns[index]
                        ? styles.rotateChevron
                        : styles.rotateChevronBack
                    }`}
                  ></i>
                </div>
                {dropdowns[index] && (
                  <ul
                    className={`${styles.dropdownMenu} ${
                      dropdowns[index] ? styles.active : ''
                    }`}
                  >
                    {x.arr.map((item: any, i) => (
                      <li
                        key={item.id}
                        className={styles.dropdownItem}
                        onClick={() => handleItemClick(index, x.id, item.id)}
                      >
                        {item.name}
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
        <div
          className={styles.categoriesTitleWrapper}
          onClick={toggleCategories}
          style={{ cursor: 'pointer' }}
        >
          {dictionary.categoriesTitle}
          <i
            className={`fa-solid fa-chevron-down ${
              isCategoriesOpen ? styles.rotateChevron : styles.rotateChevronBack
            }`}
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
  );
};

export default Filter;
