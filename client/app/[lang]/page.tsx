import { Locale } from '@/i18n.config';
import './Home.scss';
import dynamic from 'next/dynamic';
import HeroSection from '../components/HeroSection/HeroSection';
import ChooseCategory from '../components/ChooseCategory/ChooseCategory';
import HowWeWork from '../components/HowWeWork/HowWeWork';
import PopularCategories from '../components/PopularCategories/PopularCategories';
import PopularProducts from '../components/PopularProducts/PopularProducts';
import PhoneIconModal from '../components/PhoneIconModal/PhoneIconModal';
import { getDictionary } from '../../lib/dictionary';

// Динамічне завантаження компонентів без SSR
const LogoSlider = dynamic(
  () => import('../components/LogoSlider/LogoSlider'),
  {
    ssr: false,
  }
);
const AvtoBlog = dynamic(() => import('../components/AvtoBlog/AvtoBlog'), {
  ssr: false,
});

// Інтерфейс для зображення продукту (з вашого прикладу)
interface ProductImage {
  id: number;
  src: string;
  createdAt: string;
  updatedAt: string;
  productId: number;
}

// Інтерфейс для продукту з API (з вашого прикладу)
interface ApiProduct {
  id: number;
  nameuk: string;
  nameru: string;
  price: string;
  priceUsd: string;
  imgs: ProductImage[];
  category?: string;
}

// Інтерфейс для продукту, який передаємо в компонент
interface Product {
  id: number;
  lotNumber: string;
  description: string;
  price: string;
  image: string;
}

// Типізація пропсів для сторінки
type Props = {
  params: { lang: Locale };
};

// Функція для отримання популярних продуктів з API
async function fetchPopularProducts(lang: Locale): Promise<Product[]> {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_SERVER}product/getListProduct`;

    console.log(
      '[DEBUG] fetchPopularProducts: Формований URL для API запиту:',
      apiUrl
    );

    const res = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'force-cache', // Кешування для статичних даних
      next: { revalidate: 3600 * 6 }, // Revalidate кожні 6 годин, як у вашому прикладі
    });

    console.log(
      `[DEBUG] fetchPopularProducts: Статус відповіді API: ${res.status} ${res.statusText}`
    );

    if (!res.ok) {
      let errorBody = 'Не вдалося прочитати тіло помилки';
      try {
        errorBody = await res.text();
        console.error(
          '[DEBUG] fetchPopularProducts: Тіло помилки API:',
          errorBody
        );
      } catch (e) {
        console.error(
          '[DEBUG] fetchPopularProducts: Не вдалося прочитати тіло помилки API:',
          e
        );
      }
      throw new Error(
        `Не вдалося отримати продукти: ${res.status} ${res.statusText}. Тіло: ${errorBody}`
      );
    }

    const data = await res.json();
    console.log('[DEBUG] fetchPopularProducts: Отримані дані від API:', data);

    // Перевіряємо, чи API повернуло масив продуктів у полі productList
    if (!data || typeof data !== 'object' || !Array.isArray(data.productList)) {
      console.warn(
        '[DEBUG] fetchPopularProducts: API повернуло успішний статус, але структура даних невірна.'
      );
      return [];
    }

    // Форматуємо продукти до потрібного формату
    const formattedProducts = data.productList.map((product: ApiProduct) => ({
      id: product.id,
      lotNumber: product.id.toString(),
      description: lang === 'uk' ? product.nameuk : product.nameru,
      price: `${product.price} грн.`,
      image: product.imgs?.[0]?.src
        ? `${product.imgs[0].src}`
        : 'https://placehold.co/300x300/eee/ccc?text=Немає+фото',
    }));

    return formattedProducts;
  } catch (error) {
    console.error(
      '[DEBUG] fetchPopularProducts: Помилка під час завантаження продуктів:',
      error
    );
    return []; // Повертаємо порожній масив у разі помилки
  }
}

export default async function Page({ params }: Props) {
  const { lang } = params;
  const dictionary = await getDictionary(lang);
  const { news, howWeWork, heroSection, chooseCategory, popularProducts } =
    dictionary;

  // Отримання продуктів з API
  const products = await fetchPopularProducts(lang);

  return (
    <main>
      <HeroSection dictionary={heroSection} lang={lang} />
      <LogoSlider lang={lang} />
      <ChooseCategory dictionary={chooseCategory} />
      <HowWeWork dictionary={howWeWork} />
      <PopularProducts
        products={products}
        dictionary={popularProducts}
        lang={lang}
      />
      <AvtoBlog lang={lang} dictionary={news} />
    </main>
  );
}
