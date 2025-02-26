'use client';

import { useState } from 'react';
import styles from '../Header/Header.module.css';

export default function LanguageSwitch() {
  const [language, setLanguage] = useState('UA');

  const handleToggle = () => {
    setLanguage(language === 'UA' ? 'RU' : 'UA');
  };

  return (
    <button
      className={`${styles.languageToggle} ${
        language === 'UA' ? styles.uaActive : styles.ruActive
      }`}
      onClick={handleToggle}
      aria-label="Toggle language"
    >
      <span className={styles.languageText}>UA</span>
      <span className={styles.languageText}>RU</span>
    </button>
  );
}
