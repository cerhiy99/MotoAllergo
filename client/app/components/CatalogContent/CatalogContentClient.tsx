'use client';
import styles from './CatalogContent.module.css';
import NavPath from '@/app/components/NavPath/NavPath';
import Pagination from '../Pagination/Pagination';
import Link from 'next/link';
import InBasket from './InBasket';
import InLike from './InLike';
import Filter from './Filter';
import { Locale } from '@/i18n.config';
import Sort from './Sort';

type FormattedProduct = {
  id: number;
  lotNumber: string;
  description: string;
  price: string;
  image: string;
  category: string;
};
type CatalogContentClientProps = {
  dictionary: any;
  products: FormattedProduct[];
  totalPages: number;
  lang: Locale;
  searchParams: any;
  page: number;
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
  page,
  searchParams,
}) => {
  /*
  const router = useRouter();
  const searchParams = useSearchParams();

  const sortOptions: string[] = useMemo(
    () => [
      dictionary.sortOptions.popularity,
      dictionary.sortOptions.priceLowToHigh,
      dictionary.sortOptions.priceHighToLow,
      dictionary.sortOptions.newest,
    ],
    [dictionary.sortOptions]
  );

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [chosenFilters, setChosenFilters] = useState<{ [key: number]: string }>(
    {}
  );
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState<string>('');
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState<boolean>(false);

  const itemsRef = useRef<HTMLLIElement[]>([]);
  const categoryItemsRef = useRef<HTMLLIElement[]>([]);

  const {
    cart,
    wishlist,
    addToCart,
    removeFromCart,
    addToWishlist,
    removeFromWishlist,
  } = useCartStore();

  const updateUrl = (newParams: { [key: string]: string | string[] | null | undefined }) => {
    const resetPage = Object.keys(newParams).some(key => key !== 'page');
    const paramsToUpdate = { ...newParams };
    if (resetPage) {
      paramsToUpdate.page = '1';
    }
    const queryString = createQueryString(new URLSearchParams(searchParams.toString()), paramsToUpdate);
    const newUrl = `/${lang}/catalog${queryString ? `?${queryString}` : ''}`;
    router.push(newUrl, { scroll: false });
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
  }, [products]);*/

  return (
    <div className={styles.catalog}>
      <NavPath />
      <div className={styles.catalogContentWrapper}>
        <Filter
          dictionary={dictionary}
          lang={lang}
          searchParams={searchParams}
        />
        <div className={styles.catalogMainContent}>
          <Sort
            lang={lang}
            dictionary={dictionary}
            searchParams={searchParams}
          />

          {products && products.length > 0 ? (
            <ul className={styles.productsList}>
              {products.map((product) => {
                return (
                  <li
                    key={product.id}
                    className={styles.productsEL}
                    //onClick={() => handleProductClick(product.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <Link
                      href={`/${lang}/select-goods/${product.id}`}
                      className={styles.productImageWrapper}
                    >
                      <img
                        className={styles.productsImage}
                        src={
                          `${process.env.NEXT_PUBLIC_SERVER}${product.image}` ||
                          'https://placehold.co/300x300/eee/ccc?text=Немає+фото'
                        }
                        alt={product.description}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src =
                            'https://placehold.co/300x300/eee/ccc?text=Помилка';
                        }}
                      />
                      <InLike dictionary={dictionary} product={product} />
                      <p
                        className={styles.productsPara}
                        title={product.description}
                      >
                        {product.description.length > 100
                          ? `${product.description.substring(0, 97)}...`
                          : product.description}
                      </p>
                      <div>
                        <InBasket dictionary={dictionary} product={product} />
                      </div>
                    </Link>
                    {/* <p className={styles.productsPara}><span>{dictionary.lotNumberLabel}</span> {product.lotNumber}</p> */}
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className={styles.noProducts}>
              <p>
                {dictionary.noProductsFound ||
                  'Товарів не знайдено за вашим запитом.'}
              </p>
            </div>
          )}

          <Pagination
            queryParams={searchParams}
            currentPage={page}
            totalPages={totalPages}
            showPages={2}
            url={`/${lang}/catalog/`}
          />
        </div>
      </div>
    </div>
  );
};

export default CatalogContentClient;
