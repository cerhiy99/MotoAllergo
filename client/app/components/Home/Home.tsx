'use client';

import { Locale } from '@/i18n.config';
import { usePathname } from 'next/navigation';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Home.module.css';
import LanguageSwitch from '../LanguageSwich/LanguageSwitch';
import HeroSection from '../HeroSection/HeroSection';
import LogoSlider from '../LogoSlider/LogoSlider';
import HowWeWork from '../../components/HowWeWork/HowWeWork';
import ChooseCategory from '../../components/ChooseCategory/ChooseCategory';
import { useState } from 'react';

const Home: React.FC = () => {
  const [isUa, setIsUa] = useState(true);
  const toggleLanguage = () => setIsUa(!isUa);
  return (
    <div className={styles.home}>
      <HeroSection/>
      <LogoSlider/>
      <ChooseCategory/>
      <HowWeWork/>
    </div>
  );
};

export default Home;