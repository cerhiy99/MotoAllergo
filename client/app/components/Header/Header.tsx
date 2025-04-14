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
import { useCartStore } from '@/store/cartStore';

type Props = {
  lang: string;
  dictionary: any;
};

const Header = ({ lang, dictionary }: Props) => {
  const [isUa, setIsUa] = useState(lang === 'uk');
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);

  const {
    cart,
    wishlist,
    removeFromCart,
    removeFromWishlist,
    updateCartQuantity,
  } = useCartStore();

  useEffect(() => {
    const header = document.querySelector(`.${styles.mobileHeader}`) as HTMLElement;
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

  const updateQuantity = (id: string, delta: number) => {
    updateCartQuantity(id, delta);
  };

  const totalPrice = cart.reduce(
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
        <div
          className={`${styles.cartModal} ${isCartOpen ? styles.open : ''}`}
          onClick={(e) => handleOutsideClick(e, 'cart')}
        >
          <div className={styles.cartModalContent}>
            <div className={styles.cartHeader}>
              <h3>{dictionary.cartTitle} ({cart.length})</h3>
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
                      <Link href={`/catalog/${item.id}`} onClick={() => setIsCartOpen(false)}>
                        <div className={styles.cartItemLinkWrapper}>
                          <img
                            src={`http://45.94.156.193:9085/${item.image}`}
                            alt={item.name}
                            className={styles.cartItemImage}
                          />
                          <div className={styles.cartItemDetails}>
                            <p className={styles.cartItemDescription}>{item.name}</p>
                            <p className={styles.cartItemPrice}>{item.price}</p>
                            <div className={styles.quantityControls}>
                              <button
                                onClick={(e) => {
                                  e.preventDefault(); // Запобігаємо переходу
                                  e.stopPropagation(); // Зупиняємо поширення події
                                  updateQuantity(item.id, -1); // Зменшуємо кількість
                                }}
                                disabled={item.quantity === 1}
                              >
                                -
                              </button>
                              <span>{item.quantity}</span>
                              <button
                                onClick={(e) => {
                                  e.preventDefault(); // Запобігаємо переходу
                                  e.stopPropagation(); // Зупиняємо поширення події
                                  updateQuantity(item.id, 1); // Збільшуємо кількість
                                }}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </Link>
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Зупиняємо поширення для кнопки видалення
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
        <div
          className={`${styles.favoritesModal} ${isFavoritesOpen ? styles.open : ''}`}
          onClick={(e) => handleOutsideClick(e, 'favorites')}
        >
          <div className={styles.favoritesModalContent}>
            <div className={styles.favoritesHeader}>
              <h3>{dictionary.favoritesTitle} ({wishlist.length})</h3>
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
                    <Link href={`/catalog/${item.id}`} onClick={() => setIsFavoritesOpen(false)}>
                      <div className={styles.favoritesItemLinkWrapper}>
                        <img
                          src={`http://45.94.156.193:9085/${item.image}`}
                          alt={item.name}
                          className={styles.favoritesItemImage}
                        />
                        <div className={styles.favoritesItemDetails}>
                          <p className={styles.favoritesItemDescription}>{item.name}</p>
                          <p className={styles.favoritesItemPrice}>{item.price}</p>
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