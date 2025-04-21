'use client';

import { useState, useTransition, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Header.module.css';
import Viber from '../../assets/icons/viber.svg';
import Telegram from '../../assets/icons/telegram.svg';
import Whatsapp from '../../assets/icons/whatsapp.svg';
import Facebook from '../../assets/icons/facebook.svg';
import Instagram from '../../assets/icons/inst.svg';
import Heart from '../../assets/icons/heart.svg';
import Cart from '../../assets/icons/cart.svg';
import AnimatedInput from './AnimatedInput';
import ModalForm from '../PhoneIconModal/ModalForm';
import { useCartStore,WishlistItem,CartItem } from '@/store/cartStore';

type Props = {
  lang: string;
  dictionary: any;
};

const Header = ({ lang, dictionary }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false);

  const {
    cart,
    wishlist,
    addToCart,
    removeFromCart,
    removeFromWishlist,
    updateCartQuantity,
    clearWishlist,
  } = useCartStore();

  const handleAddAllToCart = () => {
    wishlist.forEach((item: WishlistItem) => {
      const cartItem: CartItem = {
        ...item,
        quantity: 1,
      };
      addToCart(cartItem); 
    });
    clearWishlist(); 
    setIsFavoritesOpen(false); 
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const triggerPoint = 25;

      if (scrollY > triggerPoint) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const languages = [
    { code: 'uk', name: 'Українська', flag: '🇺🇦' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  ];

  const isValidLanguageCode = (code: string) => {
    return languages.some((lang) => lang.code === code);
  };

  const currentLang =
    pathname.split('/')[1] && isValidLanguageCode(pathname.split('/')[1])
      ? pathname.split('/')[1]
      : 'uk';

  const getNewPath = (langCode: string) => {
    const pathWithoutLeadingSlash = pathname.startsWith('/')
      ? pathname.slice(1)
      : pathname;
    const pathParts = pathWithoutLeadingSlash.split('/');

    if (pathParts.length > 0 && isValidLanguageCode(pathParts[0])) {
      pathParts[0] = langCode;
    } else {
      pathParts.unshift(langCode);
    }

    return '/' + pathParts.join('/');
  };

  const handleLanguageChange = (langCode: string) => {
    document.cookie = `preferred-locale=${langCode}; path=/; max-age=${60 * 60 * 24 * 30}`; // 30 days
    const newPath = getNewPath(langCode);
    startTransition(() => {
      router.replace(newPath);
      router.refresh();
    });
  };

  useEffect(() => {
    const header = document.querySelector(
      `.${styles.mobileHeader}`
    ) as HTMLElement;
    if (header) {
      if (isBurgerOpen) {
        header.style.display = 'none';
      } else {
        if (window.innerWidth <= 501) {
          header.style.display = 'flex';
        }
      }
    }
  }, [isBurgerOpen]);

  const toggleBurgerMenu = () => {
    setIsBurgerOpen(!isBurgerOpen);
  };

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  const toggleFavorites = () => {
    setIsFavoritesOpen((prev) => !prev);
  };

  const updateQuantity = (id: string, delta: number) => {
    updateCartQuantity(id, delta);
  };

  const totalPrice = cart.reduce(
    (total, item) =>
      total + parseFloat(item.price.replace(/[^0-9.]/g, '')) * item.quantity,
    0
  );

  const handleOutsideClick = (
    e: React.MouseEvent,
    type: 'cart' | 'favorites'
  ) => {
    if (e.target === e.currentTarget) {
      if (type === 'cart') {
        setIsCartOpen(false);
      } else {
        setIsFavoritesOpen(false);
      }
    }
  };

  const openCallModal = () => {
    setIsCallModalOpen(true);
  };

  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <div className={styles.contactInfo}>
          <span className={styles.location}>
            <i className="fa-solid fa-location-dot"></i>
            {dictionary.location}
          </span>
          <span className={styles.workHours}>
            <i className="fa-solid fa-clock"></i>
            {dictionary.workHours}
          </span>
          <a href="tel:+380994114414" className={styles.phone}>
            <i className="fa-solid fa-phone-volume"></i>
            {dictionary.phoneNumber}
          </a>
        </div>
        <div className={styles.socialWrapper}>
          <div className={styles.socialIcons}>
            <a
              href="viber://chat?number=%2B380994114414"
              target="_blank"
              aria-label="Viber"
            >
              <Viber />
            </a>
            <a href="https://t.me" target="_blank" aria-label="Telegram">
              <Telegram />
            </a>
            <a
              href="https://wa.me/+380994114414"
              target="_blank"
              aria-label="WhatsApp"
            >
              <Whatsapp />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              aria-label="Facebook"
            >
              <Facebook />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              aria-label="Instagram"
            >
              <Instagram />
            </a>
          </div>
          <button className={styles.callButton} onClick={openCallModal}>
            <i className="fa-regular fa-bell"></i>
            {dictionary.callBtn || 'Замовити дзвінок'}
          </button>
        </div>
      </div>
      <div className={`${styles.headerWrapper} ${isFixed ? styles.fixed : ''}`}>
        <div className={styles.mainHeader}>
          <div className={styles.logo}>
            <Link href={`/${currentLang}`}>
              <img src="/images/logotype-desctop.svg" alt="logo" />
            </Link>
          </div>
          <form className={styles.searchForm}>
            <AnimatedInput dictionary={dictionary} />
            <button type="submit" className={styles.searchButton}>
              <i className="fas fa-search"></i>
            </button>
          </form>
        </div>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li>
              <Link href={`/${currentLang}/about`}>{dictionary.about}</Link>
            </li>
            <li>
              <Link href={`/${currentLang}/catalog`}>{dictionary.catalog}</Link>
            </li>
            <li>
              <Link href={`/${currentLang}/delivery`}>
                {dictionary.delivery}
              </Link>
            </li>
            <li>
              <Link href={`/${currentLang}/guarantees`}>
                {dictionary.guarantees}
              </Link>
            </li>
            <li>
              <Link href={`/${currentLang}/news`}>{dictionary.news}</Link>
            </li>
            <li>
              <Link href={`/${currentLang}/partnership`}>
                {dictionary.partnership}
              </Link>
            </li>
            <li>
              <Link href={`/${currentLang}/contacts`}>
                {dictionary.contacts}
              </Link>
            </li>
          </ul>
          <div className={styles.TelWrapper}>
            <a href="tel:+380994114414" className={styles.phone}>
              <i className="fa-solid fa-phone-volume"></i>
              {dictionary.phoneNumber}
            </a>
          </div>
          <div className={styles.rightSectionButton}>
            <button
              className={`${styles.languageToggle} ${
                currentLang === 'uk' ? styles.uaActive : styles.ruActive
              }`}
              onClick={() =>
                handleLanguageChange(currentLang === 'uk' ? 'ru' : 'uk')
              }
              aria-label="Toggle language"
              disabled={isPending}
            >
              <span className={styles.languageText}>UA</span>
              <span className={styles.languageText}>RU</span>
            </button>
          </div>
          <div className={styles.cartIcons}>
            <div className={styles.favoritesWrapper}>
              <button onClick={toggleFavorites} aria-label="Favorites">
                <Heart />
                {wishlist.length > 0 && (
                  <span className={styles.favoritesCount}>
                    {wishlist.length}
                  </span>
                )}
              </button>
            </div>
            <div className={styles.cartWrapper}>
              <button onClick={toggleCart} aria-label="Cart">
                <Cart />
                {cart.length > 0 && (
                  <span className={styles.cartCount}>{cart.length}</span>
                )}
              </button>
            </div>
          </div>
        </nav>
      </div>
      <div className={styles.mobileHeader}>
        <div className={styles.mobileBurger} onClick={toggleBurgerMenu}>
          <img src="/images/burger.svg" alt="burger" />
        </div>
        <div className={styles.logo}>
          <Link href="/">
            <img src="/images/mobile_logo.svg" alt="logo" />
          </Link>
        </div>
        <div className={styles.cartIcons}>
          <a href="tel:+380985193009" className={styles.phone}>
            <img src="/images/mobile_phone.svg" alt="phone" />
          </a>
          <div className={styles.favoritesWrapper}>
            <button onClick={toggleFavorites} aria-label="Favorites">
              <Heart />
              {wishlist.length > 0 && (
                <span className={styles.favoritesCount}>{wishlist.length}</span>
              )}
            </button>
          </div>
          <div className={styles.cartWrapper}>
            <button onClick={toggleCart} aria-label="Cart">
              <Cart />
              {cart.length > 0 && (
                <span className={styles.cartCount}>{cart.length}</span>
              )}
            </button>
          </div>
        </div>
      </div>
      <div className={`${styles.burger} ${isBurgerOpen ? styles.active : ''}`}>
        <div className={styles.logo}>
          <Link href="/">
            <img src="/images/logotype-desctop.svg" alt="logo" />
          </Link>
          <div className={styles.rightSectionButton}>
            <button
              className={`${styles.languageToggle} ${
                currentLang === 'uk' ? styles.uaActive : styles.ruActive
              }`}
              onClick={() =>
                handleLanguageChange(currentLang === 'uk' ? 'ru' : 'uk')
              }
              aria-label="Toggle language"
              disabled={isPending}
            >
              <span className={styles.languageText}>UA</span>
              <span className={styles.languageText}>RU</span>
            </button>
          </div>
          <i className="fa-solid fa-xmark" onClick={toggleBurgerMenu}></i>
        </div>
        <form className={styles.searchForm}>
          <input type="text" className={styles.searchInput} />
          <button type="submit" className={styles.searchButton}>
            <i className="fas fa-search"></i>
          </button>
        </form>
        <div className={styles.burgerContentWrapper}>
          <ul className={styles.navList}>
            <li className={styles.navListEl}>
              <Link
                onClick={() => setIsBurgerOpen(false)}
                href="/about"
                className={styles.navListElRef}
              >
                <div className={styles.burgerElWrapper}>
                  <img src="/images/mobile_version/header/about.svg" alt="" />
                  {dictionary.about}
                </div>
                <i className="fa-solid fa-chevron-right"></i>
              </Link>
            </li>
            <li className={styles.navListEl}>
              <Link
                onClick={() => setIsBurgerOpen(false)}
                href="/catalog"
                className={styles.navListElRef}
              >
                <div className={styles.burgerElWrapper}>
                  <img src="/images/mobile_version/header/catalog.svg" alt="" />
                  {dictionary.catalog}
                </div>
                <i className="fa-solid fa-chevron-right"></i>
              </Link>
            </li>
            <li className={styles.navListEl}>
              <Link
                onClick={() => setIsBurgerOpen(false)}
                href="/delivery"
                className={styles.navListElRef}
              >
                <div className={styles.burgerElWrapper}>
                  <img
                    src="/images/mobile_version/header/payAndDelievery.svg"
                    alt=""
                  />
                  {dictionary.delivery}
                </div>
                <i className="fa-solid fa-chevron-right"></i>
              </Link>
            </li>
            <li className={styles.navListEl}>
              <Link
                onClick={() => setIsBurgerOpen(false)}
                href="/guarantees"
                className={styles.navListElRef}
              >
                <div className={styles.burgerElWrapper}>
                  <img
                    src="/images/mobile_version/header/guarantee.svg"
                    alt=""
                  />
                  {dictionary.guarantees}
                </div>
                <i className="fa-solid fa-chevron-right"></i>
              </Link>
            </li>
            <li className={styles.navListEl}>
              <Link
                onClick={() => setIsBurgerOpen(false)}
                href="/news"
                className={styles.navListElRef}
              >
                <div className={styles.burgerElWrapper}>
                  <img src="/images/mobile_version/header/news.svg" alt="" />
                  {dictionary.news}
                </div>
                <i className="fa-solid fa-chevron-right"></i>
              </Link>
            </li>
            <li className={styles.navListEl}>
              <Link
                onClick={() => setIsBurgerOpen(false)}
                href="/partnership"
                className={styles.navListElRef}
              >
                <div className={styles.burgerElWrapper}>
                  <img
                    src="/images/mobile_version/header/partnership.svg"
                    alt=""
                  />
                  {dictionary.partnership}
                </div>
                <i className="fa-solid fa-chevron-right"></i>
              </Link>
            </li>
            <li className={styles.navListEl}>
              <Link
                onClick={() => setIsBurgerOpen(false)}
                href="/contacts"
                className={styles.navListElRef}
              >
                <div className={styles.burgerElWrapper}>
                  <img
                    src="/images/mobile_version/header/contacts.svg"
                    alt=""
                  />
                  {dictionary.contacts}
                </div>
                <i className="fa-solid fa-chevron-right"></i>
              </Link>
            </li>
          </ul>
          <div className={styles.TelWrapper}>
            <a href="tel:+380994114414" className={styles.phone}>
              <i className="fa-solid fa-phone-volume"></i>
              <span>{dictionary.phoneNumber}</span>
            </a>
          </div>
          <div className={styles.socialIcons}>
            <a href="https://t.me" target="_blank" aria-label="Telegram">
              <i className="fa-brands fa-telegram"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              aria-label="Instagram"
            >
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a
              href="viber://chat?number=%2B380994114414"
              target="_blank"
              aria-label="Viber"
            >
              <i className="fa-brands fa-viber"></i>
            </a>
          </div>
        </div>
      </div>

      {isCartOpen && (
        <div
          className={`${styles.cartModal} ${isCartOpen ? styles.open : ''}`}
          onClick={(e) => handleOutsideClick(e, 'cart')}
        >
          <div className={styles.cartModalContent}>
            <div className={styles.cartHeader}>
              <h3>
                {dictionary.cartTitle} ({cart.length})
              </h3>
              <button onClick={toggleCart} className={styles.closeButton}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            {cart.length === 0 ? (
              <p>{dictionary.cartEmpty}</p>
            ) : (
              <>
                <ul className={styles.cartItems}>
                  {cart.map((item) => (
                    <li key={item.id} className={styles.cartItem}>
                      <Link
                        href={`/${currentLang}/catalog/${item.id}`}
                        onClick={() => setIsCartOpen(false)}
                      >
                        <div className={styles.cartItemLinkWrapper}>
                          <img
                            src={`${process.env.NEXT_PUBLIC_SERVER}${item.image}`}
                            alt={item.name}
                            className={styles.cartItemImage}
                          />
                          <div className={styles.cartItemDetails}>
                            <p className={styles.cartItemDescription}>
                              {item.name}
                            </p>
                            <p className={styles.cartItemPrice}>{item.price}</p>
                            <div className={styles.quantityCounter}>
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  updateQuantity(item.id, -1);
                                }}
                                disabled={item.quantity === 1}
                                className={styles.quantityButton}
                              >
                                -
                              </button>
                              <span className={styles.quantityValue}>
                                {item.quantity}
                              </span>
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  updateQuantity(item.id, 1);
                                }}
                                className={styles.quantityButton}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </Link>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFromCart(item.id);
                        }}
                        className={styles.removeButton}
                      >
                        <i className="fa-regular fa-trash-can"></i>
                      </button>
                    </li>
                  ))}
                </ul>
                <div className={styles.cartFooter}>
                  <p className={styles.totalPrice}>
                    {dictionary.cartTotal}: {totalPrice.toLocaleString()}{' '}
                    {dictionary.currency}
                  </p>
                  <Link
                    href={`/${currentLang}/cart`}
                    onClick={toggleCart}
                    className={styles.checkoutButton}
                  >
                    {dictionary.cartCheckout}
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {isFavoritesOpen && (
        <div
          className={`${styles.favoritesModal} ${
            isFavoritesOpen ? styles.open : ''
          }`}
          onClick={(e) => handleOutsideClick(e, 'favorites')}
        >
          <div className={styles.favoritesModalContent}>
            <div className={styles.favoritesHeader}>
              <h3>
                {dictionary.favoritesTitle} ({wishlist.length})
              </h3>
              <button onClick={toggleFavorites} className={styles.closeButton}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            {wishlist.length === 0 ? (
              <p>{dictionary.favoritesEmpty}</p>
            ) : (
              <ul className={styles.favoritesItems}>
                {wishlist.map((item) => (
                  <li key={item.id} className={styles.favoritesItem}>
                    <Link
                      href={`/${currentLang}/catalog/${item.id}`}
                      onClick={() => setIsFavoritesOpen(false)}
                    >
                      <div className={styles.favoritesItemLinkWrapper}>
                        <img
                          src={`${process.env.NEXT_PUBLIC_SERVER}${item.image}`}
                          alt={item.name}
                          className={styles.favoritesItemImage}
                        />
                        <div className={styles.favoritesItemDetails}>
                          <p className={styles.favoritesItemDescription}>
                            {item.name}
                          </p>
                          <p className={styles.favoritesItemPrice}>
                            {item.price}
                          </p>
                        </div>
                      </div>
                    </Link>
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className={styles.removeButton}
                    >
                      <i className="fa-regular fa-trash-can"></i>
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {wishlist.length > 0 && (
              <div className={styles.favoritesFooter}>
                <button
                  onClick={handleAddAllToCart}
                  className={styles.viewFavoritesButton}
                >
                  {dictionary.favoritesAddToCart}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      <ModalForm
        isOpen={isCallModalOpen}
        onClose={() => setIsCallModalOpen(false)}
        dictionary={dictionary.modalForm}
      />
    </header>
  );
};

export default Header;