'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import './Map.scss';

const Map = () => {
  const pathname = usePathname();
  const currentLang = pathname.split('/')[1] === 'ru' ? 'ru' : 'uk';

  const mapSrc = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d41204.06256860394!2d23.1496524!3d49.80009395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473b730244f4e7c5%3A0x8749ac7e99de7b14!2z0JzQvtGB0YLQuNGB0LrQsCwg0JvRjNCy0L7QstGB0LrQsNGPINC-0LHQu9Cw0YHRgtGM!5e0!3m2!1s${currentLang}!2sua!4v1740148388271!5m2!1s${currentLang}!2sua`;

  return (
    <div className="map-container">
      <iframe
        src={mapSrc}
        style={{
          width: '100%',
          height: '300px',
          border: 0,
        }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default Map;