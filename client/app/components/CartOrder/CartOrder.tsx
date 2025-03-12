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

export default function ClientCart({ cart, cartItems }: { cart: any; cartItems: CartItem[] }) {
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

  return (
    <div className={styles.cartPage}>
      <NavPath />
      <h1 className={styles.cartHeader}>{cart.checkoutTitle || 'ОФОРМЛЕННЯ ЗАМОВЛЕННЯ'}</h1>
      <div className={styles.cartContainer}>
        <div className={styles.formSection}>
          <div className={`${styles.formGroup} ${isContactCollapsed ? styles.collapsed : ''}`}>
            <h2 className={styles.formHeaderEditButton}>
              1. {cart.contactDetails || 'Контактні дані'}{' '}
              {isContactCollapsed && (
                <button onClick={handleEdit} className={styles.editButton}>
                  <i className="fa-solid fa-pencil"></i>
                </button>
              )}
            </h2>
            <ul className={styles.inputWrapper}>
              {!isContactCollapsed && (
                <>
                  <li>
                    <input
                      type="text"
                      id="fullName"
                      placeholder={cart.fullNamePlaceholder || 'ПІБ'}
                      value={fullName}
                      onChange={handleFullNameChange}
                      required
                    />
                    {nameError && <span className={styles.errorMessage}>{nameError}</span>}
                  </li>

                  <li>
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

                  <li>
                    <input
                      type="email"
                      id="email"
                      placeholder="E-mail"
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
                      {cart.continue || 'Продовжити'}
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
          <div className={`${styles.formGroup} ${isDeliveryCollapsed ? styles.collapsed : ''}`}>
            <h2>2. {cart.deliveryAndPayment || 'Доставка і оплата'}</h2>
            {!isDeliveryCollapsed && (
              <>
                <label htmlFor="country">{cart.country || 'Країна отримувача:'}</label>
                <div className={styles.customSelect}>
                  <div
                    className={styles.selectButton}
                    onClick={() => setActiveSelect('country')}
                  >
                    {country || (cart.countryOptions?.select || 'Виберіть країну')}
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
                        {cart.countryOptions?.select || 'Виберіть країну'}
                      </li>
                      <li
                        className={styles.option}
                        onClick={() => {
                          setCountry('Україна');
                          setActiveSelect(null);
                        }}
                      >
                        {cart.countryOptions?.ukraine || 'Україна'}
                      </li>
                    </ul>
                  )}
                </div>

                <label htmlFor="paymentMethod">{cart.paymentMethod || 'Спосіб оплати'}</label>
                <div className={styles.customSelect}>
                  <div
                    className={styles.selectButton}
                    onClick={() => setActiveSelect('paymentMethod')}
                  >
                    {paymentMethod || (cart.paymentOptions?.select || 'Виберіть спосіб')}
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
                        {cart.paymentOptions?.select || 'Виберіть спосіб'}
                      </li>
                      <li
                        className={styles.option}
                        onClick={() => {
                          setPaymentMethod('Оплата онлайн WayForPay');
                          setActiveSelect(null);
                        }}
                      >
                        {cart.paymentOptions?.cash || 'Оплата онлайн WayForPay'}
                      </li>
                      <li
                        className={styles.option}
                        onClick={() => {
                          setPaymentMethod('Оплата на рахунок ФОП');
                          setActiveSelect(null);
                        }}
                      >
                        {cart.paymentOptions?.card || 'Оплата на рахунок ФОП'}
                      </li>
                    </ul>
                  )}
                </div>

                <label htmlFor="paymentSize">{cart.paymentSize || 'Розмір платежу'}</label>
                <div className={styles.customSelect}>
                  <div
                    className={styles.selectButton}
                    onClick={() => setActiveSelect('paymentSize')}
                  >
                    {paymentSize || (cart.paymentSizeOptions?.select || 'Виберіть розмір')}
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
                        {cart.paymentSizeOptions?.select || 'Виберіть розмір'}
                      </li>
                      <li
                        className={styles.option}
                        onClick={() => {
                          setPaymentSize('Оплатити повну вартість 100%');
                          setActiveSelect(null);
                        }}
                      >
                        {cart.paymentSizeOptions?.small || 'Оплатити повну вартість 100%'}
                      </li>
                      <li
                        className={styles.option}
                        onClick={() => {
                          setPaymentSize('Оплатити тільки частину вартості (50%)');
                          setActiveSelect(null);
                        }}
                      >
                        {cart.paymentSizeOptions?.medium || 'Оплатити тільки частину вартості (50%)'}
                      </li>
                    </ul>
                  )}
                </div>

                <label htmlFor="deliveryMethod">{cart.deliveryMethod || 'Спосіб доставки'}</label>
                <div className={styles.customSelect}>
                  <div
                    className={styles.selectButton}
                    onClick={() => setActiveSelect('deliveryMethod')}
                  >
                    {deliveryMethod || (cart.deliveryMethodOptions?.select || 'Виберіть спосіб')}
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
                        {cart.deliveryMethodOptions?.select || 'Виберіть спосіб'}
                      </li>
                      <li
                        className={styles.option}
                        onClick={() => {
                          setDeliveryMethod('Нова Пошта');
                          setActiveSelect(null);
                        }}
                      >
                        {cart.deliveryMethodOptions?.novaPoshta || 'Нова Пошта'}
                      </li>
                    </ul>
                  )}
                </div>

                <label htmlFor="city">{cart.city || 'Місто доставки'}</label>
                <div className={styles.customSelect}>
                  <div
                    className={styles.selectButton}
                    onClick={() => setActiveSelect('city')}
                  >
                    {city || (cart.cityOptions?.select || 'Виберіть місто')}
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
                        {cart.cityOptions?.select || 'Виберіть місто'}
                      </li>
                      <li
                        className={styles.option}
                        onClick={() => {
                          setCity('Київ');
                          setActiveSelect(null);
                        }}
                      >
                        {cart.cityOptions?.kyiv || 'Київ'}
                      </li>
                      <li
                        className={styles.option}
                        onClick={() => {
                          setCity('Львів');
                          setActiveSelect(null);
                        }}
                      >
                        {cart.cityOptions?.lviv || 'Львів'}
                      </li>
                    </ul>
                  )}
                </div>

                <label htmlFor="branch">{cart.branch || 'Відділення'}</label>
                <div className={styles.customSelect}>
                  <div
                    className={styles.selectButton}
                    onClick={() => setActiveSelect('branch')}
                  >
                    {branch || (cart.branchOptions?.select || 'Виберіть відділення')}
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
                        {cart.branchOptions?.select || 'Виберіть відділення'}
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
                  {cart.checkout || 'Оформити замовлення'}
                </button>
              </>
            )}
          </div>
        </div>

        <div className={styles.itemsSection}>
          {cartItems.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <img src={item.image} alt={item.description} className={styles.cartItemImage} />
              <div className={styles.cartItemDetails}>
                <div className={styles.cartItemDetailsTextWrapper}>
                  <p className={styles.cartItemLot}>{cart.lotNumber || 'Номер лота'}: {item.lotNumber}</p>
                  <p className={styles.cartItemDescription}>{item.description}</p>
                </div>
                <p className={styles.cartItemPrice}>{item.price}</p>
              </div>
              <button className={styles.removeButton}>
                <i className="fa-regular fa-trash-can"></i>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}