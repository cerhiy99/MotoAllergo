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
      description: 'Lorem ipsum dolor sit amet',
      price: '123 456 грн',
      image: '/images/Picture.png',
      quantity: 1,
    },
    {
      id: 2,
      lotNumber: '987654321',
      description: 'Consectetur adipiscing elit',
      price: '89 000 грн',
      image: '/images/Picture.png',
      quantity: 2,
    },
    {
      id: 3,
      lotNumber: '555555555',
      description: 'Favorite item 1',
      price: '45 000 грн',
      image: '/images/Picture.png',
      quantity: 2,
    },
    {
      id: 4,
      lotNumber: '666666666',
      description: 'Favorite item 2',
      price: '67 000 грн',
      image: '/images/Picture.png',
      quantity: 2,
    },
  ];

  return (
    <div >
      <CartOrder dictionary={cart} cartItems={cartItems} />
    </div>
  );
}