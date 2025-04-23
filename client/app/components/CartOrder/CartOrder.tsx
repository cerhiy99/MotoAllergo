'use client';

import { useEffect, useState } from 'react';
import styles from './CartOrder.module.css';
import Link from 'next/link';
import SuccessOrderComponent from '../SuccessOrder/SuccessOrder';
import NavPath from '@/app/components/NavPath/NavPath';
import { useCartStore } from '@/store/cartStore';
import axios from 'axios';

interface CartItem {
  id: string; // Змінено на string, щоб відповідати useCartStore
  lotNumber: string;
  name: string; // Змінено description на name для відповідності useCartStore
  price: string;
  image: string;
  quantity: number;
}
interface CartOrderProps {
  dictionary: any;
  lang: string; // Додаємо lang
}
export default function CartOrder({ dictionary, lang }: CartOrderProps) {
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

  // Отримуємо товари та методи з useCartStore
  const { cart, removeFromCart } = useCartStore();

  const phoneRegex = /^(?:\+?380|0)\d{9}$/;

  const isContinueButtonActive =
    fullName.trim() !== '' && phone.trim() !== '' && !phoneError && !nameError;

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phoneValue = e.target.value;
    setPhone(phoneValue);
    if (!phoneRegex.test(phoneValue)) {
      setPhoneError(
        dictionary.phoneError ||
          'Невірний формат телефону. Введіть номер у форматі +380 або 380 і 9 цифр, або 0 і 9 цифр.'
      );
    } else {
      setPhoneError('');
    }
  };

  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameValue = e.target.value;
    setFullName(nameValue);
    if (nameValue.trim() === '') {
      setNameError(dictionary.nameError || 'Будь ласка, введіть ПІБ.');
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

  const handleCheckout = async () => {
    if (isCheckoutButtonActive) {
      const cityName = selectCity.Description;
      const warehouseName = selectedWarehouse?.Description;
      const tgToken = process.env.NEXT_PUBLIC_TG_TOKEN;
      const chatId = process.env.NEXT_PUBLIC_CHAT_ID;
      const message = `Привіт!🙌
Хтось залишив Вам одне нове замовлення🤑

💆‍♂️ПІБ: ${fullName}
📲Телефон: ${phone}
📧Email: ${email}
Тип оплати: ${paymentSize}
🚚 Доставка:
Населений пункт: ${cityName}
Відділення: ${warehouseName}
${cart
  .map(
    (x) => `
🏪 Кількість товару: ${x.quantity}

🔗 Посилання на товар: ${process.env.NEXT_PUBLIC_URL}/ul/select-goods/${x.id}
💳 Сума: ${parseFloat(x.price) * x.quantity} грн

----------------------------------------`
  )
  .join('\n')}
      

Загальна сума: ${totalPrice} грн`;

      try {
        await axios.post(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
          chat_id: chatId,
          text: message,
          parse_mode: 'HTML',
        });

        setIsOrderSuccess(true);
      } catch (error) {
        console.error(
          '❌ Не вдалося надіслати повідомлення в Telegram:',
          error
        );
      }
    }
  };

  const totalPrice = cart.reduce(
    (total, item) =>
      total + parseFloat(item.price.replace(/[^0-9.]/g, '')) * item.quantity,
    0
  );

  const [allCities, setAllCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [query, setQuery] = useState('');
  const [selectCity, setSelectCity] = useState<
    undefined | { Ref: string; Description: string }
  >(undefined);

  useEffect(() => {
    const getCities = async () => {
      try {
        const res = await axios.post('https://api.novaposhta.ua/v2.0/json/', {
          apiKey: process.env.NEXT_PUBLIC_NP_API_KEY,
          modelName: 'Address',
          calledMethod: 'getCities',
        });
        console.log(res);

        setAllCities(res.data.data);
      } catch (e) {
        console.error('Помилка завантаження міст:', e);
      }
    };

    getCities();
  }, []);

  useEffect(() => {
    if (selectCity !== undefined) {
      setFilteredCities([]);
      return;
    }

    try {
      const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // екранування для RegExp
      const startsWithRegex = new RegExp(`^${escapedQuery}`, 'i');
      const containsRegex = new RegExp(escapedQuery, 'i');

      const startsWith = allCities.filter(
        (city: any) =>
          startsWithRegex.test(city.Description) ||
          startsWithRegex.test(city.DescriptionRu)
      );

      const contains = allCities.filter(
        (city: any) =>
          !startsWithRegex.test(city.Description) &&
          !startsWithRegex.test(city.DescriptionRu) &&
          (containsRegex.test(city.Description) ||
            containsRegex.test(city.DescriptionRu))
      );

      // Уникнути дублів
      const uniqueCities: any = Array.from(
        new Map(
          [...startsWith, ...contains].map((city: any) => [city.Ref, city])
        ).values()
      );

      setFilteredCities(uniqueCities);
    } catch (e) {
      setFilteredCities([]);
    }
  }, [query, allCities, selectCity]);

  const [warehouseQuery, setWarehouseQuery] = useState('');
  const [filteredWarehouses, setFilteredWarehouses] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState<
    undefined | { Description: string }
  >(undefined);

  useEffect(() => {
    if (selectCity === undefined || !selectCity?.Ref) return;

    const fetchWarehouses = async () => {
      try {
        const res = await axios.post('https://api.novaposhta.ua/v2.0/json/', {
          apiKey: process.env.NEXT_PUBLIC_NP_API_KEY,
          modelName: 'Address',
          calledMethod: 'getWarehouses',
          methodProperties: {
            CityRef: selectCity.Ref,
          },
        });

        setWarehouses(res.data.data);
      } catch (error) {
        console.error('Помилка при завантаженні відділень:', error);
      }
    };

    fetchWarehouses();
  }, [selectCity]);

  const [warehouses, setWarehouses] = useState([]);

  useEffect(() => {
    if (selectedWarehouse !== undefined) {
      setFilteredWarehouses([]);
      return;
    }
    if (!warehouseQuery) {
      setFilteredWarehouses(warehouses); // по замовчуванню обмежуємо
      return;
    }

    try {
      const escapedQuery = warehouseQuery.replace(
        /[.*+?^${}()|[\]\\]/g,
        '\\$&'
      );
      const startsWithRegex = new RegExp(`^${escapedQuery}`, 'i');
      const containsRegex = new RegExp(escapedQuery, 'i');

      const startsWith = warehouses.filter((w: any) =>
        startsWithRegex.test(w.Description)
      );

      const contains = warehouses.filter(
        (w: any) =>
          !startsWithRegex.test(w.Description) &&
          containsRegex.test(w.Description)
      );

      setFilteredWarehouses([...startsWith, ...contains].slice(0, 10));
    } catch (e) {
      setFilteredWarehouses([]);
    }
  }, [warehouseQuery, warehouses]);

  const isCheckoutButtonActive =
    country !== '' &&
    paymentMethod !== '' &&
    paymentSize !== '' &&
    deliveryMethod !== '' &&
    selectCity !== undefined;
  selectedWarehouse !== undefined;

  if (isOrderSuccess) {
    return <SuccessOrderComponent dictionary={dictionary.successOrder} />;
  }

  return (
    <div className={styles.cartPage}>
      <NavPath />

      <div className={styles.cartContainer}>
        <div className={styles.formSection}>
          <h1 className={styles.cartHeader}>{dictionary.checkoutTitle}</h1>
          <div
            className={`${styles.formGroup} ${
              isContactCollapsed ? styles.collapsed : ''
            }`}
          >
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
                      placeholder={
                        dictionary.fullNamePlaceholder || dictionary.fullName
                      }
                      value={fullName}
                      onChange={handleFullNameChange}
                      required
                    />
                    {nameError && (
                      <span className={styles.errorMessage}>{nameError}</span>
                    )}
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
                    {phoneError && (
                      <span className={styles.errorMessage}>{phoneError}</span>
                    )}
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
          <div
            className={`${styles.formGroup} ${
              isDeliveryCollapsed ? styles.collapsed : ''
            }`}
          >
            <h2>2. {dictionary.deliveryAndPayment}</h2>
            {!isDeliveryCollapsed && (
              <>
                <label htmlFor="country">{dictionary.country}</label>
                <div className={styles.customSelect}>
                  <div
                    className={styles.selectButton}
                    onClick={() =>
                      setActiveSelect(
                        activeSelect === 'country' ? null : 'country'
                      )
                    }
                  >
                    {country || dictionary.countryOptions.select}
                    <i
                      className={`fa-solid fa-chevron-down ${
                        activeSelect === 'country'
                          ? styles.rotateChevron
                          : styles.rotateChevronBack
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

                <label htmlFor="paymentMethod">
                  {dictionary.paymentMethod}
                </label>
                <div className={styles.customSelect}>
                  <div
                    className={styles.selectButton}
                    onClick={() =>
                      setActiveSelect(
                        activeSelect === 'paymentMethod'
                          ? null
                          : 'paymentMethod'
                      )
                    }
                  >
                    {paymentMethod || dictionary.paymentOptions.select}
                    <i
                      className={`fa-solid fa-chevron-down ${
                        activeSelect === 'paymentMethod'
                          ? styles.rotateChevron
                          : styles.rotateChevronBack
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
                    onClick={() =>
                      setActiveSelect(
                        activeSelect === 'paymentSize' ? null : 'paymentSize'
                      )
                    }
                  >
                    {paymentSize || dictionary.paymentSizeOptions.select}
                    <i
                      className={`fa-solid fa-chevron-down ${
                        activeSelect === 'paymentSize'
                          ? styles.rotateChevron
                          : styles.rotateChevronBack
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

                <label htmlFor="deliveryMethod">
                  {dictionary.deliveryMethod}
                </label>
                <div className={styles.customSelect}>
                  <div
                    className={styles.selectButton}
                    onClick={() =>
                      setActiveSelect(
                        activeSelect === 'deliveryMethod'
                          ? null
                          : 'deliveryMethod'
                      )
                    }
                  >
                    {deliveryMethod || dictionary.deliveryMethodOptions.select}
                    <i
                      className={`fa-solid fa-chevron-down ${
                        activeSelect === 'deliveryMethod'
                          ? styles.rotateChevron
                          : styles.rotateChevronBack
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
                          setDeliveryMethod(
                            dictionary.deliveryMethodOptions.novaPoshta
                          );
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
                  <div style={{ position: 'relative', width: '100%' }}>
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => {
                        setQuery(e.target.value);
                        setSelectCity(undefined);
                        setWarehouseQuery('');
                        setSelectedWarehouse(undefined);
                      }}
                      style={{ paddingLeft: '15px' }}
                      placeholder={dictionary.city}
                      className="p-2 border w-full"
                    />

                    {filteredCities.length > 0 && (
                      <div className={styles.dropdownCities}>
                        {filteredCities.map((city: any) => (
                          <div
                            key={city.Ref}
                            className={styles.cityItem}
                            onClick={() => {
                              setQuery(
                                lang == 'ru'
                                  ? city.DescriptionRu
                                  : city.Description
                              );
                              setSelectCity(city);
                            }}
                          >
                            {lang == 'ru'
                              ? city.DescriptionRu
                              : city.Description}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                {selectCity !== undefined && (
                  <>
                    <label htmlFor="branch">{dictionary.branch}</label>
                    <div
                      style={{ position: 'relative' }}
                      className={styles.customSelect}
                    >
                      <input
                        type="text"
                        value={warehouseQuery}
                        style={{ paddingLeft: '15px' }}
                        onChange={(e) => {
                          setWarehouseQuery(e.target.value);
                          setSelectedWarehouse(undefined);
                        }}
                        placeholder="Пошук відділення..."
                      />

                      <div className={styles.dropdownCities}>
                        {filteredWarehouses.map((w: any) => (
                          <div
                            key={w.Ref}
                            className={styles.cityItem}
                            onClick={() => {
                              setWarehouseQuery(w.Description);
                              setSelectedWarehouse(w);
                            }}
                          >
                            {w.Description}
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
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
            {cart.length === 0 ? (
              <p>{dictionary.cartEmpty || 'Кошик порожній'}</p>
            ) : (
              cart.map((item) => (
                <div key={item.id} className={styles.cartItem}>
                  <Link href={`/${lang}/catalog/${item.id}`}>
                    <img
                      src={`${process.env.NEXT_PUBLIC_SERVER}${item.image}`}
                      alt={item.name}
                      className={styles.cartItemImage}
                    />
                  </Link>
                  <div className={styles.cartItemDetails}>
                    <div className={styles.cartItemDetailsTextWrapper}>
                      <p className={styles.cartItemLot}>
                        {dictionary.lotNumber}: {item.lotNumber}
                      </p>
                      <p className={styles.cartItemDescription}>{item.name}</p>
                      <p className={styles.cartItemDescription}>
                        {dictionary.quantityLabel}: {item.quantity}
                      </p>
                    </div>
                    <p className={styles.cartItemPrice}>{item.price}</p>
                  </div>
                  <button
                    className={styles.removeButton}
                    onClick={() => removeFromCart(item.id)}
                  >
                    <i className="fa-regular fa-trash-can"></i>
                  </button>
                </div>
              ))
            )}
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
