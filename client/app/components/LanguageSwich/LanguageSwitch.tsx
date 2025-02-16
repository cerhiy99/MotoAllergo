'use client';

import { useState } from 'react';
import './LanguageSwitch.scss';

export default function LanguageSwitch() {
  const [language, setLanguage] = useState('UA');

  return (
    <div
      className="language-switch"
      onClick={() => setLanguage(language === 'UA' ? 'RU' : 'UA')}
    >
      <div className={`toggle ${language === 'RU' ? 'right' : 'left'}`}></div>
      <span className={`label ${language === 'UA' ? 'active' : ''}`}>UA</span>
      <span className={`label ${language === 'RU' ? 'active' : ''}`}>RU</span>
    </div>
  );
}
