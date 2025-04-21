'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useCartStore, CartItem, WishlistItem } from '@/store/cartStore';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import PhoneIconModal from '../PhoneIconModal/PhoneIconModal';

interface ClientWrapperProps {
  children: ReactNode;
  lang: string;
  dictionary: any;
}

export default function ClientWrapper({
  children,
  lang,
  dictionary,
}: ClientWrapperProps) {
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const updateHeaderHeight = () => {
      const isMobile = window.matchMedia('(max-width: 501px)').matches;
      const headerElement = isMobile
        ? document.querySelector('.mobileHeader')
        : document.querySelector('.header');

      if (headerElement instanceof HTMLElement) {
        console.log('Header height:', headerElement.offsetHeight);
        setHeaderHeight(headerElement.offsetHeight);
      } else {
        setHeaderHeight(isMobile ? 60 : 120); // Резервні значення: 60px для мобільного, 40px для десктопу
      }
    };

    // Оновлюємо висоту при завантаженні
    updateHeaderHeight();

    // Оновлюємо висоту при зміні розміру вікна
    const handleResize = () => {
      updateHeaderHeight();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  console.log('Dictionary in ClientWrapper:', dictionary);
  return (
    <>
      <PhoneIconModal dictionary={dictionary.modalForm} />
      <Header lang={lang} dictionary={dictionary.header} />
      <main style={{ paddingTop: `${headerHeight}px` }}>{children}</main>
      <Footer dictionary={dictionary.footer} lang={lang}/>
    </>
  );
}