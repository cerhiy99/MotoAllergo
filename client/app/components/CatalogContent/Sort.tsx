'use client';
import React, { useEffect, useMemo, useState } from 'react';
import styles from './CatalogContent.module.css';
import { useRouter } from 'next/navigation';
import { Locale } from '@/i18n.config';

type Props = {
  searchParams: any;
  lang: Locale;
  dictionary: any;
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

const Sort = ({ searchParams, lang, dictionary }: Props) => {
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const router = useRouter();
  const [chosenFilters, setChosenFilters] = useState<{ [key: number]: string }>(
    {}
  );
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState<boolean>(false);
  const [selectedSort, setSelectedSort] = useState<string>('');

  const sortOptions: { id: string; name: string }[] = useMemo(
    () => [
      { id: 'popularity', name: dictionary.sortOptions.popularity },
      { id: 'priceLowToHigh', name: dictionary.sortOptions.priceLowToHigh },
      { id: 'priceHighToLow', name: dictionary.sortOptions.priceHighToLow },
      { id: 'newest', name: dictionary.sortOptions.newest },
    ],
    [dictionary.sortOptions]
  );

  const updateUrl = (newParams: {
    [key: string]: string | string[] | null | undefined;
  }) => {
    const currentParams = new URLSearchParams(searchParams); // ReadonlyURLSearchParams → URLSearchParams
    const queryString = createQueryString(currentParams, newParams);
    const newUrl = `/${lang}/catalog/1${queryString ? `?${queryString}` : ''}`;
    router.push(newUrl, { scroll: false });
  };

  function createQueryString(
    params: URLSearchParams,
    updates: {
      [key: string]: string | string[] | null | undefined;
    }
  ) {
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === undefined) {
        params.delete(key);
      } else if (Array.isArray(value)) {
        params.delete(key); // спочатку видаляємо, щоб не було дублів
        value.forEach((val) => params.append(key, val));
      } else {
        params.set(key, value);
      }
    });

    return params.toString();
  }

  const handleRemoveActiveCategory = (category: string): void => {
    const newCategories = activeCategories.filter((cat) => cat !== category);
    updateUrl({ categories: newCategories.length > 0 ? newCategories : null });
  };

  const toggleSortDropdown = (): void => {
    setIsSortDropdownOpen((prev) => !prev);
  };
  const handleSortSelect = (option: string): void => {
    setIsSortDropdownOpen(false);
    const sortValue =
      option === dictionary.sortOptions.popularity ? null : option;
    updateUrl({ sort: sortValue });
  };

  useEffect(() => {
    const sort = searchParams.sort;
    if (sort) {
      const id = sortOptions.find((x) => x.id == sort)?.name;
      if (id) setSelectedSort(id);
      else setSelectedSort(dictionary.popularity);
    } else setSelectedSort(dictionary.popularity);
    //setSelectedSort()
  }, [searchParams]);

  return (
    <div className={styles.sortByWrapper}>
      <div className={styles.activeFiltersWrapper}>
        <ul className={styles.activeFiltersList}>
          {activeCategories.map((category) => (
            <li key={`active-${category}`} className={styles.activeFiltersEl}>
              {category}
              <i
                className="fa-solid fa-xmark"
                onClick={() => handleRemoveActiveCategory(category)}
                style={{ cursor: 'pointer', marginLeft: '5px' }}
              ></i>
            </li>
          ))}
          {Object.entries(chosenFilters).map(([key, value]) => (
            <li key={`active-filter-${key}`} className={styles.activeFiltersEl}>
              {`${
                dictionary[`filter${parseInt(key, 10) + 1}`] ||
                `Фільтр ${parseInt(key, 10) + 1}`
              }: ${value}`}
              <i
                className="fa-solid fa-xmark"
                onClick={() => {
                  const newChosen = { ...chosenFilters };
                  delete newChosen[parseInt(key, 10)];
                  setChosenFilters(newChosen);
                  const filtersString = Object.entries(newChosen)
                    .map(([k, v]) => `filter${k}=${v}`)
                    .join(',');
                  updateUrl({ filters: filtersString || null });
                }}
                style={{ cursor: 'pointer', marginLeft: '5px' }}
              ></i>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.sortBy}>
        <p>{dictionary.sortBy}</p>
        <div className={styles.sortedByDropdown}>
          <button onClick={toggleSortDropdown} className={styles.sortButton}>
            {selectedSort || dictionary.sortOptions.popularity}
            <i
              className={`fa-solid fa-chevron-down ${
                isSortDropdownOpen
                  ? styles.rotateChevron
                  : styles.rotateChevronBack
              }`}
            ></i>
          </button>
          {isSortDropdownOpen && (
            <div className={styles.sortedByDropdownMenu}>
              {sortOptions.map((option) => (
                <p
                  key={option.id}
                  className={`${styles.sortOption} ${
                    selectedSort === option.id ? styles.activeSort : ''
                  }`}
                  onClick={() => handleSortSelect(option.id)}
                >
                  {option.name}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sort;
