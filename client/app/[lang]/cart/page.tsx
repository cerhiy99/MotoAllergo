import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/i18n.config';
import styles from './Cart.module.css';
import NavPath from '@/app/components/NavPath/NavPath';
interface CartItem {
  id: number;
  lotNumber: string;
  description: string;
  price: string;
  image: string;
  quantity: number;
}

export async function generateStaticParams() {
  return [{ lang: 'uk' }, { lang: 'ru' }]; // Ваші локалі
}

export default async function CartPage({ params }: { params: { lang: Locale } }) {
  const { cart } = await getDictionary(params.lang);

  // Приклад завантаження даних кошика (замініть на реальний API або контекст)
  const cartItems: CartItem[] = [
    {
      id: 1,
      lotNumber: '123456789',
      description: 'РАДАТОР ОСНОВНИЙ AUDI Q5 80A РЕСТАЙЛ 2.0 2R ORIHINAL',
      price: '123 566 грн.',
      image: '/images/wheels.png', // Замініть на реальне зображення
      quantity: 1,
    },
    {
      id: 2,
      lotNumber: '123456789',
      description: 'КОМПЛЕКТНИЙ АБСОРБЕР AUDI Q5 80A РЕСТАЙЛ 2.0 2R ORIHINAL',
      price: '123 566 грн.',
      image: '/images/wheels.png',
      quantity: 2,
    },
  ];

  return (
    <div className={styles.cartPage}>
      <NavPath/>
      <h1>{cart.checkoutTitle || 'ОФОРМЛЕННЯ ЗАМОВЛЕННЯ'}</h1>
      <div className={styles.cartContainer}>
        <div className={styles.formSection}>
          <div className={styles.formGroup}>
            <h2>1. {cart.contactDetails || 'Контактні дані'}</h2>
            <input type="text" id="fullName" placeholder={cart.fullNamePlaceholder || 'ПІБ'} />
            <input type="tel" id="phone" placeholder="+38 (0__) ___-__-__" />
            <input type="email" id="email" placeholder="E-mail" />
            <button type="button">{cart.continue || 'Продовжити'}</button>
          </div>
          <div className={styles.formGroup}>
            <h2>2. {cart.deliveryAndPayment || 'Доставка і оплата'}</h2>
            <label htmlFor="country">{cart.country || 'Країна отримувача:'}</label>
            <select id="country" name="country">
                <option value="ukraine">{cart.countryOptions?.ukraine || 'Україна'}</option>
            </select>
            <label htmlFor="paymentMethod">{cart.paymentMethod || 'Спосіб оплати'}</label>
            <select id="paymentMethod" name="paymentMethod">
                <option value="cash">{cart.paymentOptions?.cash || 'Готівкою'}</option>
                <option value="card">{cart.paymentOptions?.card || 'Карткою'}</option>
                <option value="bankTransfer">{cart.paymentOptions?.bankTransfer || 'Банківський переказ'}</option>
            </select>
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