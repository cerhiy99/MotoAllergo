'use client';
import React, { useEffect, useState } from 'react';
import styles from './CatalogContent.module.css';
import { useCartStore, CartItem } from '@/store/cartStore';

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

type FormattedProduct = {
  id: number;
  lotNumber: string;
  description: string;
  price: string;
  image: string;
  category: string;
};

type Props = {
  product: FormattedProduct;
  dictionary: any;
};

const InBasket = ({ product, dictionary }: Props) => {
  const { cart, addToCart, removeFromCart } = useCartStore();
  const [showCartNotification, setShowCartNotification] = useState<{
    [key: number]: boolean;
  }>({});
  const handleAddToCart = (product: FormattedProduct) => {
    const productId = `${product.id}`;

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

  const [isInCart, setIsInCart] = useState<boolean>(false);

  useEffect(() => {
    setIsInCart(cart.some((x) => x.id == product.id.toString()));
  }, [cart]);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        return false;
      }}
      className={styles.productsPriceWrapper}
    >
      <p className={styles.pricePara}>{product.price}</p>
      <div className={styles.buyButtonWrapper}>
        {showCartNotification[product.id] && (
          <div className={styles.notification}>
            {isInCart
              ? dictionary.actions.cartNotification
              : dictionary.actions.cartRemovedNotification}
          </div>
        )}
        <button
          className={`${styles.priceButton} ${isInCart ? styles.inCart : ''}`}
          onClick={(e) => {
            e.preventDefault();
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
          {isInCart ? dictionary.actions.inCart : dictionary.actions.buy}
        </button>
      </div>
    </div>
  );
};

export default InBasket;
