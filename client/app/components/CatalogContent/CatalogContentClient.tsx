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

const CatalogContentClient: React.FC<CatalogContentClientProps> = ({
  dictionary,
  products,
  totalPages,
  lang,
  page,
  searchParams,
}) => {
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
              {products.map((product) => (
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
                        product.image
                          ? `${process.env.NEXT_PUBLIC_SERVER}${product.image}`
                          : 'https://placehold.co/300x300/eee/ccc?text=Немає+фото'
                      }
                      alt={product.description}
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
              ))}
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
