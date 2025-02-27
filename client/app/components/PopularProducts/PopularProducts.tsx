'use client';

import { useState } from 'react';
import styles from './PopularProducts.module.css';

const PopularProducts: React.FC = () => {
  const [isUa, setIsUa] = useState(true);
  const toggleLanguage = () => setIsUa(!isUa);
  return (
    <div className={styles.popularProductsWrapper}>
      <h1 className={styles.popularProductsTitle}><span>Популярні</span> товари</h1>
      <ul className={styles.popularProductsList}>
        <li className={styles.popularProductsEL}>
            <img className={styles.popularProductsImage} src="./images/greyRectangle.png" alt="" />
            <p className={styles.popularProductsPara}><span>Номер лота:</span> 123456789</p>
            <p className={styles.popularProductsPara}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est, qui.</p>
            <div className={styles.popularProductsPriceWrapper}>
                <p className={styles.pricePara}>123 456 грн</p>
                <button className={styles.priceButton}>
                    <i className="fa-solid fa-bag-shopping"></i>
                    В кошик
                    </button>
            </div>
        </li>
        <li className={styles.popularProductsEL}>
            <img className={styles.popularProductsImage} src="./images/greyRectangle.png" alt="" />
            <p className={styles.popularProductsPara}><span>Номер лота:</span> 123456789</p>
            <p className={styles.popularProductsPara}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est, qui.</p>
            <div className={styles.popularProductsPriceWrapper}>
                <p className={styles.pricePara}>123 456 грн</p>
                <button className={styles.priceButton}>
                    <i className="fa-solid fa-bag-shopping"></i>
                    В кошик
                    </button>
            </div>
        </li>
        <li className={styles.popularProductsEL}>
            <img className={styles.popularProductsImage} src="./images/greyRectangle.png" alt="" />
            <p className={styles.popularProductsPara}><span>Номер лота:</span> 123456789</p>
            <p className={styles.popularProductsPara}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est, qui.</p>
            <div className={styles.popularProductsPriceWrapper}>
                <p className={styles.pricePara}>123 456 грн</p>
                <button className={styles.priceButton}>
                    <i className="fa-solid fa-bag-shopping"></i>
                    В кошик
                    </button>
            </div>
        </li>
        <li className={styles.popularProductsEL}>
            <img className={styles.popularProductsImage} src="./images/greyRectangle.png" alt="" />
            <p className={styles.popularProductsPara}><span>Номер лота:</span> 123456789</p>
            <p className={styles.popularProductsPara}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est, qui.</p>
            <div className={styles.popularProductsPriceWrapper}>
                <p className={styles.pricePara}>123 456 грн</p>
                <button className={styles.priceButton}>
                    <i className="fa-solid fa-bag-shopping"></i>
                    В кошик
                    </button>
            </div>
        </li>
        <li className={styles.popularProductsEL}>
            <img className={styles.popularProductsImage} src="./images/greyRectangle.png" alt="" />
            <p className={styles.popularProductsPara}><span>Номер лота:</span> 123456789</p>
            <p className={styles.popularProductsPara}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est, qui.</p>
            <div className={styles.popularProductsPriceWrapper}>
                <p className={styles.pricePara}>123 456 грн</p>
                <button className={styles.priceButton}>
                    <i className="fa-solid fa-bag-shopping"></i>
                    В кошик
                    </button>
            </div>
        </li>
        <li className={styles.popularProductsEL}>
            <img className={styles.popularProductsImage} src="./images/greyRectangle.png" alt="" />
            <p className={styles.popularProductsPara}><span>Номер лота:</span> 123456789</p>
            <p className={styles.popularProductsPara}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est, qui.</p>
            <div className={styles.popularProductsPriceWrapper}>
                <p className={styles.pricePara}>123 456 грн</p>
                <button className={styles.priceButton}>
                    <i className="fa-solid fa-bag-shopping"></i>
                    В кошик
                    </button>
            </div>
        </li>
      </ul>
      <div className={styles.loadMoreWrapper}>
        <i className="fa-solid fa-rotate"></i>
        Показати ще
      </div>
    </div>
  );
};

export default PopularProducts;
