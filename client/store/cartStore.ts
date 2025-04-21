'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  lotNumber: string;
  name: string;
  price: string;
  image: string;
  quantity: number;
}

export interface WishlistItem {
  id: string;
  lotNumber: string;
  name: string;
  price: string;
  image: string;
}

interface CartState {
  cart: CartItem[];
  wishlist: WishlistItem[];
  addToCart: (item: CartItem) => void;
  addToWishlist: (item: WishlistItem) => void;
  removeFromCart: (id: string) => void;
  removeFromWishlist: (id: string) => void;
  updateCartQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  clearWishlist: () => void;
}
const isBrowser = typeof window !== 'undefined';

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      wishlist: [],
      addToCart: (item) =>
        set((state) => {
          const existingItemIndex = state.cart.findIndex(
            (cartItem) => cartItem.id === item.id
          );
          let newCart;
          if (existingItemIndex >= 0) {
            newCart = state.cart.map((cartItem, index) =>
              index === existingItemIndex
                ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                : cartItem
            );
          } else {
            newCart = [...state.cart, item];
          }
          return { cart: newCart };
        }),
      addToWishlist: (item) =>
        set((state) => {
          if (state.wishlist.some((wishlistItem) => wishlistItem.id === item.id)) {
            return state;
          }
          const newWishlist = [...state.wishlist, item];
          return { wishlist: newWishlist };
        }),
      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),
      removeFromWishlist: (id) =>
        set((state) => ({
          wishlist: state.wishlist.filter((item) => item.id !== id),
        })),

      updateCartQuantity: (id, delta) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id && (delta > 0 || item.quantity > 1)
              ? { ...item, quantity: item.quantity + delta }
              : item
          ),
        })),
      clearCart: () =>
        set(() => ({
          cart: [],
        })),
      clearWishlist: () =>
        set(() => ({
          wishlist: [],
        })),
    }),
    {
      name: 'cart-storage', // Назва ключа в localStorage
      storage: {
        getItem: (name) => {
          if (!isBrowser) return null;
          const value = localStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: (name, value) => {
          if (isBrowser) {
            localStorage.setItem(name, JSON.stringify(value));
          }
        },
        removeItem: (name) => {
          if (isBrowser) {
            localStorage.removeItem(name);
          }
        },
      },
    }
  )
);