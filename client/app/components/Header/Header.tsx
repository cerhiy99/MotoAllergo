'use client';

import { useState, useTransition, useEffect } from 'react';
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

type Props = {
  lang: any;
  dictionary: any;
  initialCartItems: CartItem[];
  initialFavoriteItems: FavoriteItem[];
};

interface CartItem {
  id: number;
  lotNumber: string;
  description: string;
  price: string;
  image: string;
  quantity: number;
}

interface FavoriteItem {
  id: number;
  lotNumber: string;
  description: string;
  price: string;
  image: string;
}

const Header = ({ lang, dictionary, initialCartItems, initialFavoriteItems }: Props) => {
  const [isUa, setIsUa] = useState(lang === 'uk');
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [favoriteItems, setFavoriteItems] = useState<FavoriteItem[]>(initialFavoriteItems);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('cartItems');
    const savedFavorites = localStorage.getItem('favoriteItems');
    if (savedCart) setCartItems(JSON.parse(savedCart));
    if (savedFavorites) setFavoriteItems(JSON.parse(savedFavorites));
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('favoriteItems', JSON.stringify(favoriteItems));
  }, [favoriteItems]);

  useEffect(() => {
    const header = document.querySelector(`.${styles.mobileHeader}`) as HTMLElement;
    if (header) {
      if (isBurgerOpen) {
        header.style.display = "none";
      } else {
        if (window.innerWidth <= 501) {
          header.style.display = "flex";
        }
      }
    }
  }, [isBurgerOpen]);

  const toggleBurgerMenu = () => {
    setIsBurgerOpen(!isBurgerOpen);
  };

  const toggleLanguage = () => {
    const newLang = isUa ? 'ru' : 'uk';
    setIsUa(!isUa);

    startTransition(() => {
      const newPath = pathname.replace(/\/(uk|ru)/, `/${newLang}`);
      router.replace(newPath);
      router.refresh();
    });
  };

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  const toggleFavorites = () => {
    setIsFavoritesOpen((prev) => !prev);
  };

  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const removeFromFavorites = (id: number) => {
    setFavoriteItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + parseFloat(item.price.replace(/[^0-9.]/g, '')) * item.quantity,
    0
  );

  const handleOutsideClick = (e: React.MouseEvent, type: 'cart' | 'favorites') => {
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
          <a href="tel:+380972439410" className={styles.phone}>
            <i className="fa-solid fa-phone-volume"></i>
            {dictionary.phoneNumber}
          </a>
        </div>
        <div className={styles.socialWrapper}>
          <div className={styles.socialIcons}>
            <a href="viber://chat?number=%2B380972439410" target="_blank" aria-label="Viber">
              <Viber />
            </a>
            <a href="https://t.me" target="_blank" aria-label="Telegram">
              <Telegram />
            </a>
            <a href="https://wa.me/380972439410" target="_blank" aria-label="WhatsApp">
              <Whatsapp />
            </a>
            <a href="https://facebook.com" target="_blank" aria-label="Facebook">
              <Facebook />
            </a>
            <a href="https://instagram.com" target="_blank" aria-label="Instagram">
              <Instagram />
            </a>
          </div>
          <button className={styles.callButton} onClick={openCallModal}>
            <i className="fa-regular fa-bell"></i>
            {dictionary.callBtn || 'Замовити дзвінок'}
          </button>
        </div>
      </div>
      <div className={styles.mainHeader}>
        <div className={styles.logo}>
          <Link href="/">
            <img src="/images/logotype-desctop.svg" alt="logo" />
          </Link>
        </div>
        <form className={styles.searchForm}>
          <AnimatedInput />
          <button type="submit" className={styles.searchButton}>
            <i className="fas fa-search"></i>
          </button>
        </form>
      </div>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li>
            <Link href="/about">{dictionary.about}</Link>
          </li>
          <li>
            <Link href="/catalog">{dictionary.catalog}</Link>
          </li>
          <li>
            <Link href="/delivery">{dictionary.delivery}</Link>
          </li>
          <li>
            <Link href="/guarantees">{dictionary.guarantees}</Link>
          </li>
          <li>
            <Link href="/news">{dictionary.news}</Link>
          </li>
          <li>
            <Link href="/partnership">{dictionary.partnership}</Link>
          </li>
          <li>
            <Link href="/contacts">{dictionary.contacts}</Link>
          </li>
        </ul>
        <div className={styles.TelWrapper}>
          <a href="tel:+380972439410" className={styles.phone}>
            <i className="fa-solid fa-phone-volume"></i>
            {dictionary.phoneNumber}
          </a>
        </div>
        <div className={styles.rightSectionButton}>
          <button
            className={`${styles.languageToggle} ${isUa ? styles.uaActive : styles.ruActive}`}
            onClick={toggleLanguage}
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
              {favoriteItems.length > 0 && (
                <span className={styles.favoritesCount}>{favoriteItems.length}</span>
              )}
            </button>
          </div>
          <div className={styles.cartWrapper}>
            <button onClick={toggleCart} aria-label="Cart">
              <Cart />
              {cartItems.length > 0 && (
                <span className={styles.cartCount}>{cartItems.length}</span>
              )}
            </button>
          </div>
        </div>
      </nav>
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
              {favoriteItems.length > 0 && (
                <span className={styles.favoritesCount}>{favoriteItems.length}</span>
              )}
            </button>
          </div>
          <div className={styles.cartWrapper}>
            <button onClick={toggleCart} aria-label="Cart">
              <Cart />
              {cartItems.length > 0 && (
                <span className={styles.cartCount}>{cartItems.length}</span>
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
              <Link href="/about" className={styles.navListElRef}>
                <div className={styles.burgerElWrapper}>
                  <img src="/images/mobile_header_icon.svg" alt="" />
                  {dictionary.about}
                </div>
                <i className="fa-solid fa-chevron-right"></i>
              </Link>
            </li>
            <li className={styles.navListEl}>
              <Link href="/catalog" className={styles.navListElRef}>
                <div className={styles.burgerElWrapper}>
                  <img src="/images/mobile_header_icon.svg" alt="" />
                  {dictionary.catalog}
                </div>
                <i className="fa-solid fa-chevron-right"></i>
              </Link>
            </li>
            <li className={styles.navListEl}>
              <Link href="/delivery" className={styles.navListElRef}>
                <div className={styles.burgerElWrapper}>
                  <img src="/images/mobile_header_icon.svg" alt="" />
                  {dictionary.delivery}
                </div>
                <i className="fa-solid fa-chevron-right"></i>
              </Link>
            </li>
            <li className={styles.navListEl}>
              <Link href="/guarantees" className={styles.navListElRef}>
                <div className={styles.burgerElWrapper}>
                  <img src="/images/mobile_header_icon.svg" alt="" />
                  {dictionary.guarantees}
                </div>
                <i className="fa-solid fa-chevron-right"></i>
              </Link>
            </li>
            <li className={styles.navListEl}>
              <Link href="/news" className={styles.navListElRef}>
                <div className={styles.burgerElWrapper}>
                  <img src="/images/mobile_header_icon.svg" alt="" />
                  {dictionary.news}
                </div>
                <i className="fa-solid fa-chevron-right"></i>
              </Link>
            </li>
            <li className={styles.navListEl}>
              <Link href="/partnership" className={styles.navListElRef}>
                <div className={styles.burgerElWrapper}>
                  <img src="/images/mobile_header_icon.svg" alt="" />
                  {dictionary.partnership}
                </div>
                <i className="fa-solid fa-chevron-right"></i>
              </Link>
            </li>
            <li className={styles.navListEl}>
              <Link href="/contacts" className={styles.navListElRef}>
                <div className={styles.burgerElWrapper}>
                  <img src="/images/mobile_header_icon.svg" alt="" />
                  {dictionary.contacts}
                </div>
                <i className="fa-solid fa-chevron-right"></i>
              </Link>
            </li>
          </ul>
          <div className={styles.TelWrapper}>
            <a href="tel:+380972439410" className={styles.phone}>
              <i className="fa-solid fa-phone-volume"></i>
              <span>{dictionary.phoneNumber}</span>
            </a>
          </div>
          <div className={styles.socialIcons}>
            <a href="https://t.me" target="_blank" aria-label="Telegram">
              <i className="fa-brands fa-telegram"></i>
            </a>
            <a href="https://instagram.com" target="_blank" aria-label="Instagram">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="viber://chat?number=%2B380972439410" target="_blank" aria-label="Viber">
              <i className="fa-brands fa-viber"></i>
            </a>
          </div>
        </div>
      </div>

      {isCartOpen && (
        <div className={`${styles.cartModal} ${isCartOpen ? styles.open : ''}`} onClick={(e) => handleOutsideClick(e, 'cart')}>
          <div className={styles.cartModalContent}>
            <div className={styles.cartHeader}>
              <h3>{dictionary.cartTitle} ({cartItems.length})</h3>
              <button onClick={toggleCart} className={styles.closeButton}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            {cartItems.length === 0 ? (
              <p>{dictionary.cartEmpty}</p>
            ) : (
              <>
                <ul className={styles.cartItems}>
                  {cartItems.map((item) => (
                    <li key={item.id} className={styles.cartItem}>
                      <img
                        src={item.image}
                        alt={item.description}
                        className={styles.cartItemImage}
                      />
                      <div className={styles.cartItemDetails}>
                        <p className={styles.cartItemLot}>
                          {dictionary.lotNumber}: {item.lotNumber}
                        </p>
                        <p className={styles.cartItemDescription}>{item.description}</p>
                        <p className={styles.cartItemPrice}>{item.price}</p>
                        <div className={styles.quantityControls}>
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            disabled={item.quantity === 1}
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
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
                  <Link href="/cart" onClick={toggleCart} className={styles.checkoutButton}>
                    {dictionary.cartCheckout}
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {isFavoritesOpen && (
        <div className={`${styles.favoritesModal} ${isFavoritesOpen ? styles.open : ''}`} onClick={(e) => handleOutsideClick(e, 'favorites')}>
          <div className={styles.favoritesModalContent}>
            <div className={styles.favoritesHeader}>
              <h3>{dictionary.favoritesTitle} ({favoriteItems.length})</h3>
              <button onClick={toggleFavorites} className={styles.closeButton}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            {favoriteItems.length === 0 ? (
              <p>{dictionary.favoritesEmpty}</p>
            ) : (
              <ul className={styles.favoritesItems}>
                {favoriteItems.map((item) => (
                  <li key={item.id} className={styles.favoritesItem}>
                    <img
                      src={item.image}
                      alt={item.description}
                      className={styles.favoritesItemImage}
                    />
                    <div className={styles.favoritesItemDetails}>
                      <p className={styles.favoritesItemLot}>
                        {dictionary.lotNumber}: {item.lotNumber}
                      </p>
                      <p className={styles.favoritesItemDescription}>{item.description}</p>
                      <p className={styles.favoritesItemPrice}>{item.price}</p>
                    </div>
                    <button
                      onClick={() => removeFromFavorites(item.id)}
                      className={styles.removeButton}
                    >
                      <i className="fa-regular fa-trash-can"></i>
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {favoriteItems.length > 0 && (
              <div className={styles.favoritesFooter}>
                <Link
                  href="#"
                  onClick={toggleFavorites}
                  className={styles.viewFavoritesButton}
                >
                  {dictionary.favoritesAddToCart}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
      <ModalForm isOpen={isCallModalOpen} onClose={() => setIsCallModalOpen(false)} />
    </header>
  );
};

export default Header;