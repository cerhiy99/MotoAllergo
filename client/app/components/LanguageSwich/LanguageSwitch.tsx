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
      <span className="label">RU</span>
      <div className={`toggle ${language === 'UA' ? 'left' : 'right'}`}>UA</div>
    </div>
  );
}
