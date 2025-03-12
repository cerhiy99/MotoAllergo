import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/i18n.config';
import CartOrder from '../../components/CartOrder/CartOrder';
interface CartItem {
  id: number;
  lotNumber: string;
  description: string;
  price: string;
  image: string;
  quantity: number;
}

export async function generateStaticParams() {
  return [{ lang: 'uk' }, { lang: 'ru' }];
}

export default async function CartPage({ params }: { params: { lang: Locale } }) {
  const { cart } = await getDictionary(params.lang);

  const cartItems: CartItem[] = [
    {
      id: 1,
      lotNumber: '123456789',
      description: 'РАДАТОР ОСНОВНИЙ AUDI Q5 80A РЕСТАЙЛ 2.0 2R ORIHINAL',
      price: '123 566 грн.',
      image: '/images/wheels.png',
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
    <div >
      <CartOrder cart={cart} cartItems={cartItems} />
    </div>
  );
}