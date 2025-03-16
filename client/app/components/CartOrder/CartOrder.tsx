'use client';

import { useState } from 'react';
import styles from './CartOrder.module.css';
import Link from 'next/link';
import SuccessOrderComponent from '../SuccessOrder/SuccessOrder';
import NavPath from '@/app/components/NavPath/NavPath';

interface CartItem {
  id: number;
  lotNumber: string;
  description: string;
  price: string;
  image: string;
  quantity: number;
}

export default function ClientCart({ dictionary, cartItems }: { dictionary: any; cartItems: CartItem[] }) {
  const [isContactCollapsed, setIsContactCollapsed] = useState(false);
  const [isDeliveryCollapsed, setIsDeliveryCollapsed] = useState(true);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentSize, setPaymentSize] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('');
  const [city, setCity] = useState('');
  const [branch, setBranch] = useState('');
  const [isOrderSuccess, setIsOrderSuccess] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [nameError, setNameError] = useState('');
  const [activeSelect, setActiveSelect] = useState<string | null>(null);

  const phoneRegex = /^(?:\+?380|0)\d{9}$/;

  const isContinueButtonActive = fullName.trim() !== '' && phone.trim() !== '' && !phoneError && !nameError;

  const isCheckoutButtonActive =
    country !== '' &&
    paymentMethod !== '' &&
    paymentSize !== '' &&
    deliveryMethod !== '' &&
    city !== '' &&
    branch !== '';

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phoneValue = e.target.value;
    setPhone(phoneValue);
    if (!phoneRegex.test(phoneValue)) {
      setPhoneError('Невірний формат телефону. Введіть номер у форматі +380 або 380 і 9 цифр, або 0 і 9 цифр.');
    } else {
      setPhoneError('');
    }
  };

  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameValue = e.target.value;
    setFullName(nameValue);
    if (nameValue.trim() === '') {
      setNameError('Будь ласка, введіть ПІБ.');
    } else {
      setNameError('');
    }
  };

  const handleContinue = () => {
    if (isContinueButtonActive) {
      setIsContactCollapsed(true);
      setIsDeliveryCollapsed(false);
    }
  };

  const handleEdit = () => {
    setIsContactCollapsed(false);
    setIsDeliveryCollapsed(true);
  };

  const handleCheckout = () => {
    if (isCheckoutButtonActive) {
      setIsOrderSuccess(true);
    }
  };

  if (isOrderSuccess) {
    return <SuccessOrderComponent />;
  }

  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + parseFloat(item.price.replace(/[^0-9.]/g, '')) * item.quantity,
    0
  );

  return (
    <div className={styles.cartPage}>
      <NavPath />

      <div className={styles.cartContainer}>
        <div className={styles.formSection}>
          <h1 className={styles.cartHeader}>{dictionary.checkoutTitle}</h1>
          <div className={`${styles.formGroup} ${isContactCollapsed ? styles.collapsed : ''}`}>
            <h2 className={styles.formHeaderEditButton}>
              1. {dictionary.contactDetails}{' '}
              {isContactCollapsed && (
                <button onClick={handleEdit} className={styles.editButton}>
                  <i className="fa-solid fa-pencil"></i>
                </button>
              )}
            </h2>
            <ul className={styles.inputWrapper}>
              {!isContactCollapsed && (
                <>
                  <li className={styles.inputWithIcon}>
                    <i className="fa-regular fa-user"></i>
                    <input
                      type="text"
                      id="fullName"
                      placeholder={dictionary.fullNamePlaceholder || dictionary.fullName}
                      value={fullName}
                      onChange={handleFullNameChange}
                      required
                    />
                    {nameError && <span className={styles.errorMessage}>{nameError}</span>}
                  </li>

                  <li className={styles.inputWithIcon}>
                    <i className="fa-solid fa-phone"></i>
                    <input
                      type="tel"
                      id="phone"
                      placeholder="+380XXXXXXXXX"
                      value={phone}
                      onChange={handlePhoneChange}
                      required
                    />
                    {phoneError && <span className={styles.errorMessage}>{phoneError}</span>}
                  </li>

                  <li className={styles.inputWithIcon}>
                    <i className="fa-regular fa-envelope"></i>
                    <input
                      type="email"
                      id="email"
                      placeholder={dictionary.email}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </li>

                  <li>
                    <button
                      type="button"
                      onClick={handleContinue}
                      disabled={!isContinueButtonActive}
                      className={styles.continueButton}
                    >
                      {dictionary.continue}
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
          <div className={`${styles.formGroup} ${isDeliveryCollapsed ? styles.collapsed : ''}`}>
            <h2>2. {dictionary.deliveryAndPayment}</h2>
            {!isDeliveryCollapsed && (
              <>
                <label htmlFor="country">{dictionary.country}</label>
                <div className={styles.customSelect}>
                  <div
                    className={styles.selectButton}
                    onClick={() => setActiveSelect(activeSelect === 'country' ? null : 'country')}
                  >
                    {country || dictionary.countryOptions.select}
                    <i
                      className={`fa-solid fa-chevron-down ${
                        activeSelect === 'country' ? styles.rotateChevron : styles.rotateChevronBack
                      }`}
                    ></i>
                  </div>
                  {activeSelect === 'country' && (
                    <ul className={styles.selectOptions}>
                      <li
                        className={styles.option}
                        onClick={() => {
                          setCountry('');
                          setActiveSelect(null);
                        }}
                      >
                        {dictionary.countryOptions.select}
                      </li>
                      <li
                        className={styles.option}
                        onClick={() => {
                          setCountry(dictionary.countryOptions.ukraine);
                          setActiveSelect(null);
                        }}
                      >
                        {dictionary.countryOptions.ukraine}
                      </li>
                    </ul>
                  )}
                </div>

                <label htmlFor="paymentMethod">{dictionary.paymentMethod}</label>
                <div className={styles.customSelect}>
                  <div
                    className={styles.selectButton}
                    onClick={() => setActiveSelect(activeSelect === 'paymentMethod' ? null : 'paymentMethod')}
                  >
                    {paymentMethod || dictionary.paymentOptions.select}
                    <i
                      className={`fa-solid fa-chevron-down ${
                        activeSelect === 'paymentMethod' ? styles.rotateChevron : styles.rotateChevronBack
                      }`}
                    ></i>
                  </div>
                  {activeSelect === 'paymentMethod' && (
                    <ul className={styles.selectOptions}>
                      <li
                        className={styles.option}
                        onClick={() => {
                          setPaymentMethod('');
                          setActiveSelect(null);
                        }}
                      >
                        {dictionary.paymentOptions.select}
                      </li>
                      <li
                        className={styles.option}
                        onClick={() => {
                          setPaymentMethod(dictionary.paymentOptions.card);
                          setActiveSelect(null);
                        }}
                      >
                        {dictionary.paymentOptions.card}
                      </li>
                    </ul>
                  )}
                </div>

                <label htmlFor="paymentSize">{dictionary.paymentSize}</label>
                <div className={styles.customSelect}>
                  <div
                    className={styles.selectButton}
                    onClick={() => setActiveSelect(activeSelect === 'paymentSize' ? null : 'paymentSize')}
                  >
                    {paymentSize || dictionary.paymentSizeOptions.select}
                    <i
                      className={`fa-solid fa-chevron-down ${
                        activeSelect === 'paymentSize' ? styles.rotateChevron : styles.rotateChevronBack
                      }`}
                    ></i>
                  </div>
                  {activeSelect === 'paymentSize' && (
                    <ul className={styles.selectOptions}>
                      <li
                        className={styles.option}
                        onClick={() => {
                          setPaymentSize('');
                          setActiveSelect(null);
                        }}
                      >
                        {dictionary.paymentSizeOptions.select}
                      </li>
                      <li
                        className={styles.option}
                        onClick={() => {
                          setPaymentSize(dictionary.paymentSizeOptions.small);
                          setActiveSelect(null);
                        }}
                      >
                        {dictionary.paymentSizeOptions.small}
                      </li>
                      <li
                        className={styles.option}
                        onClick={() => {
                          setPaymentSize(dictionary.paymentSizeOptions.medium);
                          setActiveSelect(null);
                        }}
                      >
                        {dictionary.paymentSizeOptions.medium}
                      </li>
                    </ul>
                  )}
                </div>

                <label htmlFor="deliveryMethod">{dictionary.deliveryMethod}</label>
                <div className={styles.customSelect}>
                  <div
                    className={styles.selectButton}
                    onClick={() => setActiveSelect(activeSelect === 'deliveryMethod' ? null : 'deliveryMethod')}
                  >
                    {deliveryMethod || dictionary.deliveryMethodOptions.select}
                    <i
                      className={`fa-solid fa-chevron-down ${
                        activeSelect === 'deliveryMethod' ? styles.rotateChevron : styles.rotateChevronBack
                      }`}
                    ></i>
                  </div>
                  {activeSelect === 'deliveryMethod' && (
                    <ul className={styles.selectOptions}>
                      <li
                        className={styles.option}
                        onClick={() => {
                          setDeliveryMethod('');
                          setActiveSelect(null);
                        }}
                      >
                        {dictionary.deliveryMethodOptions.select}
                      </li>
                      <li
                        className={styles.option}
                        onClick={() => {
                          setDeliveryMethod(dictionary.deliveryMethodOptions.novaPoshta);
                          setActiveSelect(null);
                        }}
                      >
                        {dictionary.deliveryMethodOptions.novaPoshta}
                      </li>
                    </ul>
                  )}
                </div>

                <label htmlFor="city">{dictionary.city}</label>
                <div className={styles.customSelect}>
                  <div
                    className={styles.selectButton}
                    onClick={() => setActiveSelect(activeSelect === 'city' ? null : 'city')}
                  >
                    {city || dictionary.cityOptions.select}
                    <i
                      className={`fa-solid fa-chevron-down ${
                        activeSelect === 'city' ? styles.rotateChevron : styles.rotateChevronBack
                      }`}
                    ></i>
                  </div>
                  {activeSelect === 'city' && (
                    <ul className={styles.selectOptions}>
                      <li
                        className={styles.option}
                        onClick={() => {
                          setCity('');
                          setActiveSelect(null);
                        }}
                      >
                        {dictionary.cityOptions.select}
                      </li>
                      <li
                        className={styles.option}
                        onClick={() => {
                          setCity(dictionary.cityOptions.kyiv);
                          setActiveSelect(null);
                        }}
                      >
                        {dictionary.cityOptions.kyiv}
                      </li>
                      <li
                        className={styles.option}
                        onClick={() => {
                          setCity(dictionary.cityOptions.lviv);
                          setActiveSelect(null);
                        }}
                      >
                        {dictionary.cityOptions.lviv}
                      </li>
                    </ul>
                  )}
                </div>

                <label htmlFor="branch">{dictionary.branch}</label>
                <div className={styles.customSelect}>
                  <div
                    className={styles.selectButton}
                    onClick={() => setActiveSelect(activeSelect === 'branch' ? null : 'branch')}
                  >
                    {branch || dictionary.branchOptions.select}
                    <i
                      className={`fa-solid fa-chevron-down ${
                        activeSelect === 'branch' ? styles.rotateChevron : styles.rotateChevronBack
                      }`}
                    ></i>
                  </div>
                  {activeSelect === 'branch' && (
                    <ul className={styles.selectOptions}>
                      <li
                        className={styles.option}
                        onClick={() => {
                          setBranch('');
                          setActiveSelect(null);
                        }}
                      >
                        {dictionary.branchOptions.select}
                      </li>
                      <li
                        className={styles.option}
                        onClick={() => {
                          setBranch('№1');
                          setActiveSelect(null);
                        }}
                      >
                        №1
                      </li>
                      <li
                        className={styles.option}
                        onClick={() => {
                          setBranch('№2');
                          setActiveSelect(null);
                        }}
                      >
                        №2
                      </li>
                    </ul>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleCheckout}
                  disabled={!isCheckoutButtonActive}
                  className={styles.checkoutButton}
                >
                  {dictionary.cartCheckout}
                </button>
              </>
            )}
          </div>
        </div>

        <div className={styles.itemsSection}>
          <h1 className={styles.cartHeader}>{dictionary.itemTitle}</h1>
          <div className={styles.itemsListWrapper}>
            {cartItems.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <img src={item.image} alt={item.description} className={styles.cartItemImage} />
                <div className={styles.cartItemDetails}>
                  <div className={styles.cartItemDetailsTextWrapper}>
                    <p className={styles.cartItemLot}>
                      {dictionary.lotNumber}: {item.lotNumber}
                    </p>
                    <p className={styles.cartItemDescription}>{item.description}</p>
                    <p className={styles.cartItemDescription}>
                      {dictionary.quantityLabel}: {item.quantity}
                    </p>
                  </div>
                  <p className={styles.cartItemPrice}>{item.price}</p>
                </div>
                <button className={styles.removeButton}>
                  <i className="fa-regular fa-trash-can"></i>
                </button>
              </div>
            ))}
          </div>
          <div className={styles.orderTotal}>
            <p className={styles.orderTotalLabel}>{dictionary.orderTotal}:</p>
            <p className={styles.orderTotalAmount}>
              {totalPrice.toLocaleString()} {dictionary.currency}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}