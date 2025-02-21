import React from 'react';
import './Footer.scss';
import { Locale } from '@/i18n.config';
import './Footer.scss';

type Props = {
  lang: Locale;
};

const Footer = (props: Props) => {
  return (
    <div className="footer-container">
      <div className="footer-divider"></div>
    </div>
  );
};

export default Footer;
