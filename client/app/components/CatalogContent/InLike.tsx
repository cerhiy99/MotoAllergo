'use client';
import React, { useEffect, useState } from 'react';
import { useCartStore, WishlistItem } from '@/store/cartStore';
import styles from './CatalogContent.module.css';

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

const InLike = ({ product, dictionary }: Props) => {
  const { wishlist, addToWishlist, removeFromWishlist } = useCartStore();
  const [showWishlistNotification, setShowWishlistNotification] = useState<{
    [key: number]: boolean;
  }>({});
  const handleWishlistClick = (product: FormattedProduct) => {
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

  const [isInWishlist, setIsInWishlist] = useState<boolean>(false);

  useEffect(() => {
    setIsInWishlist(wishlist.some((x) => x.id == product.id.toString()));
  }, [wishlist]);
  return (
    <div
      className={styles.wishlist}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleWishlistClick(product);
      }}
    >
      {showWishlistNotification[product.id] && (
        <div className={styles.notification}>
          {isInWishlist
            ? dictionary.wishlist.notificationAdd
            : dictionary.wishlist.notificationRemove}
        </div>
      )}
      <svg
        width="18"
        height="16"
        viewBox="0 0 18 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={
          isInWishlist ? styles.wishlistIconActive : styles.wishlistIcon
        }
      >
        <path
          d="M12.75 0.363281C12.0208 0.363281 11.3275 0.519531 10.6699 0.832031C10.0124 1.14453 9.45573 1.56771 9 2.10156C8.54427 1.56771 7.98763 1.14453 7.33008 0.832031C6.67253 0.519531 5.97917 0.363281 5.25 0.363281C4.61198 0.363281 4.01302 0.480469 3.45312 0.714844C2.89323 0.949219 2.4082 1.27148 1.99805 1.68164C1.58789 2.0918 1.26562 2.57682 1.03125 3.13672C0.783854 3.69661 0.660156 4.29557 0.660156 4.93359C0.660156 5.72786 0.829427 6.48958 1.16797 7.21875C1.51953 7.96094 2.00456 8.70964 2.62305 9.46484C3.24154 10.2201 3.98698 11.0143 4.85938 11.8477C5.74479 12.681 6.72135 13.5859 7.78906 14.5625L9 15.6367L10.2109 14.543C11.2786 13.5664 12.2552 12.668 13.1406 11.8477C14.013 11.0143 14.7585 10.2168 15.377 9.45508C15.9954 8.69336 16.4805 7.94792 16.832 7.21875C17.1706 6.48958 17.3398 5.72786 17.3398 4.93359C17.3398 4.29557 17.2161 3.69661 16.9688 3.13672C16.7344 2.57682 16.4121 2.0918 16.002 1.68164C15.5918 1.27148 15.1068 0.949219 14.5469 0.714844C13.987 0.480469 13.388 0.363281 12.75 0.363281ZM9.07812 13.3125L9 13.3906L8.92188 13.3125C7.93229 12.4141 7.02734 11.5872 6.20703 10.832C5.39974 10.0638 4.70964 9.3444 4.13672 8.67383C3.5638 8.00326 3.12109 7.36198 2.80859 6.75C2.49609 6.13802 2.33984 5.53255 2.33984 4.93359C2.33984 4.10026 2.61654 3.4069 3.16992 2.85352C3.72331 2.30013 4.41667 2.02344 5.25 2.02344C5.88802 2.02344 6.48698 2.20898 7.04688 2.58008C7.60677 2.95117 7.9974 3.42318 8.21875 3.99609H9.78125C10.0026 3.42318 10.3932 2.95117 10.9531 2.58008C11.513 2.20898 12.112 2.02344 12.75 2.02344C13.5833 2.02344 14.2767 2.30013 14.8301 2.85352C15.3835 3.4069 15.6602 4.10026 15.6602 4.93359C15.6602 5.53255 15.5039 6.13802 15.1914 6.75C14.8789 7.36198 14.4362 8.00326 13.8633 8.67383C13.2904 9.3444 12.6003 10.0638 11.793 10.832C10.9727 11.5872 10.0677 12.4141 9.07812 13.3125Z"
          fill={isInWishlist ? '#FF0000' : '#646464'}
        />
      </svg>
    </div>
  );
};

export default InLike;
