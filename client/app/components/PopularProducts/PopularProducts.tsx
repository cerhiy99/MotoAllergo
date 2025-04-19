'use client';

import { useState, useEffect, useRef } from 'react';
import { Locale } from '@/i18n.config';
import styles from './PopularProducts.module.css';
import { useCartStore, CartItem, WishlistItem } from '@/store/cartStore';

interface ProductImage {
  id: number;
  src: string;
  createdAt: string;
  updatedAt: string;
  productId: number;
}

interface ApiProduct {
  id: number;
  nameuk: string;
  nameru: string;
  price: string;
  priceUsd: string;
  imgs: ProductImage[];
  category?: string;
}

interface Product {
  id: number;
  lotNumber: string;
  description: string;
  price: string;
  image: string;
}

interface PopularProductsProps {
  dictionary: {
    title: string;
    titleHighlight: string;
    lotNumberLabel: string;
    addToCart: string;
    loadMoreButton: string;
    noProductsMessage?: string;
    wishlist?: {
      notificationAdd: string;
      notificationRemove: string;
    };
    actions?: {
      cartNotification: string;
      cartRemovedNotification: string;
      inCart: string;
      buy: string;
    };
  };
  products: Product[];
  lang: Locale;
}

const PopularProducts: React.FC<PopularProductsProps> = ({ dictionary, products: initialProducts, lang }) => {
  const [isUa, setIsUa] = useState(true);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLLIElement[]>([]);

  const [showCartNotification, setShowCartNotification] = useState<{ [key: number]: boolean }>({});
  const [showWishlistNotification, setShowWishlistNotification] = useState<{ [key: number]: boolean }>({});

  const { cart, wishlist, addToCart, removeFromCart, addToWishlist, removeFromWishlist } = useCartStore();

  const limit = 10;

  const loadMoreProducts = async () => {
    setIsLoading(true);
    const nextPage = currentPage + 1;

    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_SERVER}product/getListProduct?page=${nextPage}&limit=${limit}`;
      console.log('[DEBUG] loadMoreProducts: Формований URL для API запиту:', apiUrl);

      const res = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(`[DEBUG] loadMoreProducts: Статус відповіді API: ${res.status} ${res.statusText}`);

      if (!res.ok) {
        throw new Error(`Не вдалося отримати продукти: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      console.log('[DEBUG] loadMoreProducts: Отримані дані від API:', data);

      if (!data || typeof data !== 'object' || !Array.isArray(data.productList)) {
        console.warn('[DEBUG] loadMoreProducts: API повернуло успішний статус, але структура даних невірна.');
        setHasMore(false);
        setIsLoading(false);
        return;
      }

      const newProducts = data.productList.map((product: ApiProduct) => ({
        id: product.id,
        lotNumber: product.id.toString(),
        description: lang === 'uk' ? product.nameuk : product.nameru,
        price: `${product.price} грн.`,
        image: product.imgs?.[0]?.src
          ? `${product.imgs[0].src}`
          : 'https://placehold.co/300x300/eee/ccc?text=Немає+фото',
      }));

      if (newProducts.length === 0) {
        setHasMore(false);
      } else {
        setProducts((prev) => [...prev, ...newProducts]);
        setCurrentPage(nextPage);
      }
    } catch (error) {
      console.error('[DEBUG] loadMoreProducts: Помилка під час завантаження продуктів:', error);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
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

  useEffect(() => {
    itemsRef.current.forEach((item) => {
      if (item) {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.9)';
        item.style.transition = 'all 0.5s ease-out';
      }
    });

    const animateItems = () => {
      itemsRef.current.forEach((item, index) => {
        if (item) {
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, index * 150);
        }
      });
    };

    const handleMouseEnter = (item: HTMLLIElement) => {
      item.style.transform = 'scale(1.03)';
      const image = item.querySelector(`.${styles.popularProductsImage}`) as HTMLElement;
      if (image) {
        image.style.transform = 'scale(1.05)';
      }
    };

    const handleMouseLeave = (item: HTMLLIElement) => {
      item.style.transform = 'scale(1)';
      const image = item.querySelector(`.${styles.popularProductsImage}`) as HTMLElement;
      if (image) {
        image.style.transform = 'scale(1)';
      }
    };

    itemsRef.current.forEach((item) => {
      if (item) {
        item.addEventListener('mouseenter', () => handleMouseEnter(item));
        item.addEventListener('mouseleave', () => handleMouseLeave(item));
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          animateItems();
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin: '-50px 0px',
        threshold: 0.1,
      }
    );

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }
    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
      itemsRef.current.forEach((item) => {
        if (item) {
          item.removeEventListener('mouseenter', () => handleMouseEnter(item));
          item.removeEventListener('mouseleave', () => handleMouseLeave(item));
        }
      });
    };
  }, [products]);

  const toggleLanguage = () => setIsUa(!isUa);

  const addToRefs = (el: HTMLLIElement) => {
    if (el && !itemsRef.current.includes(el)) {
      itemsRef.current.push(el);
    }
  };

  if (!Array.isArray(products)) {
    console.error('Products is not an array:', products);
    return (
      <div className={styles.popularProductsWrapper}>
        <h1 className={styles.popularProductsTitle}>
          {dictionary.title.split(dictionary.titleHighlight)[0]}
          <span>{dictionary.titleHighlight}</span>
          {dictionary.title.split(dictionary.titleHighlight)[1] || ''}
        </h1>
        <p>{dictionary.noProductsMessage || 'Не вдалося завантажити продукти.'}</p>
      </div>
    );
  }

  return (
    <div ref={sectionRef} className={styles.popularProductsWrapper}>
      <h1 className={styles.popularProductsTitle}>
        {dictionary.title.split(dictionary.titleHighlight)[0]}
        <span>{dictionary.titleHighlight}</span>
        {dictionary.title.split(dictionary.titleHighlight)[1] || ''}
      </h1>
      {products.length === 0 ? (
        <p>{dictionary.noProductsMessage || 'Немає продуктів для відображення.'}</p>
      ) : (
        <>
          <ul className={styles.popularProductsList}>
            {products.map((product) => {
              const productId = `${product.id}`;
              const isInWishlist = wishlist.some((item) => item.id === productId);
              const isInCart = cart.some((item) => item.id === productId);

              return (
                <li
                  key={product.id}
                  ref={addToRefs}
                  className={styles.popularProductsEL}
                >
                  <div className={styles.productImageWrapper}>
                    <img
                      className={styles.popularProductsImage}
                      src={`${process.env.NEXT_PUBLIC_SERVER}${product.image}`}
                      alt={product.description}
                    />
                    <div
                      className={styles.wishlist}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleWishlistClick(product);
                      }}
                    >
                      {showWishlistNotification[product.id] && (
                        <div className={styles.notification}>
                          {isInWishlist
                            ? dictionary.wishlist?.notificationAdd || 'Додано до списку бажань'
                            : dictionary.wishlist?.notificationRemove || 'Видалено зі списку бажань'}
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
                  <p className={styles.popularProductsPara}>
                    <span>{dictionary.lotNumberLabel}</span> {product.lotNumber}
                  </p>
                  <p className={styles.popularProductsPara}>{product.description}</p>
                  <div className={styles.popularProductsPriceWrapper}>
                    <p className={styles.pricePara}>{product.price}</p>
                    <div className={styles.buyButtonWrapper}>
                      {showCartNotification[product.id] && (
                        <div className={styles.notification}>
                          {isInCart
                            ? dictionary.actions?.cartNotification || 'Додано до кошика'
                            : dictionary.actions?.cartRemovedNotification || 'Видалено з кошика'}
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
                        <svg
                          width="24"
                          height="40"
                          viewBox="0 0 24 40"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M19.0078 14H16.9922C16.9922 13.3125 16.8672 12.6641 16.6172 12.0547C16.3516 11.4453 15.9922 10.9141 15.5391 10.4609C15.0859 10.0078 14.5547 9.64844 13.9453 9.38281C13.3359 9.13281 12.6875 9.00781 12 9.00781C11.3125 9.00781 10.6641 9.13281 10.0547 9.38281C9.44531 9.64844 8.91406 10.0078 8.46094 10.4609C8.00781 10.9141 7.64844 11.4453 7.38281 12.0547C7.13281 12.6641 7.00781 13.3125 7.00781 14H4.99219C4.44531 14 3.97656 14.1953 3.58594 14.5859C3.19531 14.9766 3 15.4453 3 15.9922V27.9922C3 28.5547 3.19531 29.0312 3.58594 29.4219C3.97656 29.8125 4.44531 30.0078 4.99219 30.0078H19.0078C19.5547 30.0078 20.0234 29.8125 20.4141 29.4219C20.8047 29.0312 21 28.5547 21 27.9922V15.9922C21 15.4453 20.8047 14.9766 20.4141 14.5859C20.0234 14.1953 19.5547 14 19.0078 14ZM12 11C12.8281 11 13.5352 11.293 14.1211 11.8789C14.707 12.4648 15 13.1719 15 14H9C9 13.1719 9.29297 12.4648 9.87891 11.8789C10.4648 11.293 11.1719 11 12 11ZM12 21.0078C11.3125 21.0078 10.6641 20.875 10.0547 20.6094C9.44531 20.3438 8.91406 19.9844 8.46094 19.5312C8.00781 19.0781 7.64844 18.5469 7.38281 17.9375C7.13281 17.3281 7.00781 16.6797 7.00781 15.9922H9C9 16.8203 9.29297 17.5273 9.87891 18.1133C10.4648 18.6992 11.1719 18.9922 12 18.9922C12.8281 18.9922 13.5352 18.6992 14.1211 18.1133C14.707 17.5273 15 16.8203 15 15.9922H16.9922C16.9922 16.6797 16.8672 17.3281 16.6172 17.9375C16.3516 18.5469 15.9922 19.0781 15.5391 19.5312C15.0859 19.9844 14.5547 20.3438 13.9453 20.6094C13.3359 20.875 12.6875 21.0078 12 21.0078Z"
                            fill="white"
                          />
                        </svg>
                        {isInCart
                          ? dictionary.actions?.inCart || 'У кошику'
                          : dictionary.actions?.buy || dictionary.addToCart}
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          {hasMore && (
            <div className={styles.loadMoreWrapper}>
              <button
                onClick={loadMoreProducts}
                className={styles.loadMoreButton}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span>Завантаження...</span>
                ) : (
                  <>
                    <i className="fa-solid fa-rotate"></i>
                    {dictionary.loadMoreButton}
                  </>
                )}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PopularProducts;