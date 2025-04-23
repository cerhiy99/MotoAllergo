import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/i18n.config';
import CartOrder from '../../components/CartOrder/CartOrder';

export async function generateStaticParams() {
  return [{ lang: 'uk' }, { lang: 'ru' }];
}

export default async function CartPage({
  params,
}: {
  params: { lang: Locale };
}) {
  const dictionary: any = await getDictionary(params.lang);
  const cart = dictionary.cart;

  return (
    <div>
      <CartOrder dictionary={cart} lang={params.lang} />
    </div>
  );
}
