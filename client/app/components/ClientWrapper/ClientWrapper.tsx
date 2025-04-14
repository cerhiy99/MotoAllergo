'use client';

import { ReactNode, useEffect } from 'react';
import { useCartStore,CartItem, WishlistItem } from '@/store/cartStore';
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
    return (
      <>
        <PhoneIconModal dictionary={dictionary.modalForm} />
        <Header lang={lang} dictionary={dictionary.header} />
        {children}
        <Footer dictionary={dictionary.footer} />
      </>
    );
  }