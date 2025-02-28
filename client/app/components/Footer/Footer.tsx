// import React from 'react';
// import './Footer.scss';
// import { Locale } from '@/i18n.config';
// import './Footer.scss';

// type Props = {
//   lang: Locale;
// };

// const Footer = (props: Props) => {
//   return (
//     <div className="footer-container">
//       <div className="footer-divider"></div>
//     </div>
//   );
// };

// export default Footer;

import React from 'react';
import './Footer.scss';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-content">
        <div className="footer-column"></div>
        <div className="footer-column">
          <h3>MotoAllegro</h3>
          <Link href="/about-us">Про нас</Link>
          <Link href="#">Як замовити</Link>
          <Link href="#">Новини</Link>
          <Link href="#">Партнерство</Link>
          <Link href="#">Контакти</Link>
        </div>
        <div className="footer-column">
          <h3>Обслуговування клієнтів</h3>
          <Link href="#">Файли Cookies</Link>
          <Link href="#">Політика конфіденційності</Link>
          <Link href="#">Оплата і доставка</Link>
          <Link href="#">Наша гарантія</Link>
        </div>
        <div className="footer-column newsletter">
          <h3>Інформаційний бюлетень</h3>
          <p>
            Підпишіться на нашу розсилку, щоб Ви могли першими дізнаватися про
            новинки та акції на автозапчастини, а також отримувати корисні
            поради щодо їх вибору та експлуатації!
          </p>
          <input type="email" placeholder="Ваш email" />
          <button>Підписатися</button>
        </div>
        <div className="footer-column"></div>
      </div>
    </div>
  );
};

export default Footer;
