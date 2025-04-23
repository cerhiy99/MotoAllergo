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

  const sortOptions = [
    { id: 'popularity', title: dictionary.sortOptions.popularity },
    { id: 'priceLowToHigh', title: dictionary.sortOptions.priceLowToHigh },
    { id: 'priceHighToLow', title: dictionary.sortOptions.priceHighToLow },
    { id: 'newest', title: dictionary.sortOptions.newest },
  ];

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
  const [dropdowns, setDropdowns] = useState<{ [key: number]: boolean }>({
    0: false,
  });
  const [isCategoriesOpen, setIsCategoriesOpen] = useState<boolean>(true);

  const updateUrl = (newParams: {
    [key: string]: string | string[] | null | undefined;
  }) => {
    const updatedParams = { ...newParams };

    if ('brand' in newParams) {
      updatedParams.model = '';
    }

    if ('categories' in newParams) {
      updatedParams.typeDetail = '';
    }

    const currentParams = new URLSearchParams(searchParams);
    const queryString = createQueryString(currentParams, updatedParams);
    const newUrl = `/${lang}/catalog/1${queryString ? `?${queryString}` : ''}`;
    router.push(newUrl, { scroll: false });
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
          // Створюємо параметр без кодування
          params.set(key, value.join(','));
        } else {
          params.delete(key);
        }
      } else {
        // Звичайне значення
        params.set(key, value);
      }
    });

    // Переконаймося, що немає подвійного кодування
    let queryString = params.toString();
    queryString = queryString.replace(/%2C/g, ','); // Виправляємо можливі закодовані коми на звичайні

    return queryString;
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

  const toggleCategories = (): void => {
    setIsCategoriesOpen((prev) => !prev);
  };

  const handleCategoryClick = (category: number | string): void => {
    const categies = searchParams.categories;

    // Якщо категорії вже існують
    if (categies) {
      let listCategories = categies.split(','); // Отримуємо масив категорій

      // Перевіряємо, чи категорія вже в списку
      if (listCategories.includes(category.toString())) {
        // Видаляємо категорію, якщо вона є в списку
        listCategories = listCategories.filter(
          (x: string) => x !== category.toString()
        );
      } else {
        // Додаємо категорію, якщо її нема в списку
        listCategories.push(category.toString());
      }

      // Оновлюємо URL з новим списком категорій
      updateUrl({ categories: listCategories.join(',') });
    } else {
      // Якщо категорії немає в searchParams, додаємо поточну категорію
      updateUrl({ categories: category.toString() });
    }
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

  const [models, setModels] = useState<{ id: number; name: string }[]>([]);
  const [typeDetail, setTypeDetail] = useState<{ id: number; name: string }[]>(
    []
  );

  const getModels = async (brandId: string) => {
    try {
      const res = await $host.get(`product/getModels?brandId=${brandId}`);
      setModels(res.data.models);
    } catch (err) {
      console.log(err);
    }
  };

  const getTypeDetail = async (categoryId: string) => {
    try {
      const res = await $host.get(
        `product/getTypeDetail?categoryTypeDelailId=${categoryId}&lang=${lang}`
      );
      setTypeDetail(res.data.res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (searchParams.brand) {
      getModels(searchParams.brand);
    } else setModels([]);
    if (searchParams.categories) {
      getTypeDetail(searchParams.categories.split(',')[0]);
    } else setTypeDetail([]);
  }, [searchParams]);

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
                { id: 'model', title: dictionary.filter2, arr: models },
                { id: 'categories', title: dictionary.filter4, arr: category },
                {
                  id: 'typeDetail',
                  title: dictionary.filter5,
                  arr: typeDetail,
                },
              ].map((x, index) => (
                <li
                  key={x.id}
                  className={`${styles.filterEl} ${
                    x.arr.length > 0 ? styles.active : ''
                  } ${chosenFilters[index] ? styles.chosen : ''}`}
                >
                  <p
                    className={`${styles.filterElPara} ${
                      x.arr.length > 0 ? styles.chosen : ''
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
                        x.arr.length > 0 ? styles.active : ''
                      } ${chosenFilters[index] ? styles.chosen : ''}`}
                    >
                      {index + 1}
                    </span>
                    {(() => {
                      const matched = x.arr.find(
                        (arrItem) =>
                          searchParams[x.id]
                            ?.split(',')
                            .some((item: string) => +item === arrItem.id)
                      );
                      return matched ? matched.name : x.title;
                    })()}
                  </p>
                  <div
                    className={`${styles.filterElIconWrapper} ${
                      x.arr.length > 0 ? styles.active : ''
                    } ${searchParams[x.id] ? styles.chosen : ''}`}
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
                        x.arr.length > 0 ? styles.active : ''
                      }`}
                    >
                      {x.arr.map((item: any, i) => (
                        <li
                          key={item.id}
                          className={styles.dropdownItem}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            updateUrl({ [x.id]: item.id });
                            setDropdowns({});
                          }}
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
              {sortOptions.map((option: any) => (
                <div
                  key={option.id}
                  onClick={() => {
                    updateUrl({ sort: option.id });
                    setSelectedSort(option.title);
                  }}
                  className={styles.filterSectionEl}
                >
                  <input
                    type="radio"
                    id={`mobile-sort-${option.title.replace(/\s+/g, '-')}`}
                    name="mobile-sort"
                    value={option}
                    checked={option.id === searchParams.sort}
                  />
                  <label
                    htmlFor={`mobile-sort-${option.title.replace(/\s+/g, '-')}`}
                  >
                    {option.title}
                  </label>
                </div>
              ))}
            </div>
          </form>
        )}
      </div>

      <div className={styles.filtersWrapper}>
        <form className={styles.filterParts} action="#">
          <ul className={styles.filterList}>
            {[
              { id: 'brand', title: dictionary.filter1, arr: brands },
              { id: 'model', title: dictionary.filter2, arr: models },
              { id: 'categories', title: dictionary.filter4, arr: category },
              { id: 'typeDetail', title: dictionary.filter5, arr: typeDetail },
            ].map((x, index) => (
              <li
                key={x.id}
                className={`${styles.filterEl} ${
                  x.arr.length > 0 ? styles.active : ''
                } ${chosenFilters[index] ? styles.chosen : ''}`}
              >
                <p
                  className={`${styles.filterElPara} ${
                    x.arr.length > 0 ? styles.chosen : ''
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
                      x.arr.length > 0 ? styles.active : ''
                    } ${chosenFilters[index] ? styles.chosen : ''}`}
                  >
                    {index + 1}
                  </span>
                  {(() => {
                    const matched = x.arr.find(
                      (arrItem) =>
                        searchParams[x.id]
                          ?.split(',')
                          .some((item: string) => +item === arrItem.id)
                    );
                    return matched ? matched.name : x.title;
                  })()}
                </p>
                <div
                  className={`${styles.filterElIconWrapper} ${
                    x.arr.length > 0 ? styles.active : ''
                  } ${searchParams[x.id] ? styles.chosen : ''}`}
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
                      x.arr.length > 0 ? styles.active : ''
                    }`}
                  >
                    {x.arr.map((item: any, i) => (
                      <li
                        key={item.id}
                        className={styles.dropdownItem}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          updateUrl({ [x.id]: item.id });
                          setDropdowns({});
                        }}
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
            {category.map((category) => (
              <li
                key={category.id}
                className={styles.categoriesEl}
                onClick={() => handleCategoryClick(category.id)}
                style={{ cursor: 'pointer' }}
              >
                <input
                  type="checkbox"
                  readOnly
                  checked={
                    searchParams.categories
                      ? searchParams.categories
                          .split(',')
                          .some(
                            (item: string) => item === category.id.toString()
                          )
                      : false
                  }
                  tabIndex={-1}
                />
                {category.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Filter;
