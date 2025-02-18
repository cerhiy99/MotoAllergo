"use client";


import React from 'react';
import './Footer.scss';
import { Locale } from '@/i18n.config';
import Subcribe from './Subcribe';

type Props = {
  lang: Locale;
};

const Footer = (props: Props) => {
  return (
    <div>
      <Subcribe />
    </div>
  );
};

export default Footer;
