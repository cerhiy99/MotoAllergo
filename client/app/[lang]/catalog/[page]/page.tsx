import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import CatalogContentClient from '@/app/components/CatalogContent/CatalogContentClient';
import { notFound } from 'next/navigation';

interface ProductImage {
  id: number;
  src: string;
  createdAt: string;
  updatedAt: string;
  productId: number;
}
type FormattedProduct = {
  id: number;
  lotNumber: string;
  description: string;
  price: string;
  image: string;
  category: string;
};
interface Product {
  id: number;
  nameuk: string;
  nameru: string;
  price: string;
  priceUsd: string;
  cod: string;
  imgs: ProductImage[];
  category?: string;
}

interface ApiResponse {
  productList: Product[];
  count: number;
  currentPage: number;
  totalPages: number;
}

type Props = {
  params: { lang: Locale; page: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const limit = 24;

const parseQueryParam = (
  param: string | string[] | undefined,
  defaultValue: string[] = []
): string[] => {
  if (!param) return defaultValue;
  if (Array.isArray(param)) return param;
  try {
    const parsed = JSON.parse(param);
    if (Array.isArray(parsed)) return parsed;
  } catch (e) {
    return param.split(',');
  }
  return [param];
};
const getProducts = async (
  page: string,
  searchParams: Props['searchParams']
): Promise<ApiResponse> => {
  try {
    const queryParams = new URLSearchParams(
      searchParams as Record<string, string>
    );
    queryParams.set('page', page);
    queryParams.set('limit', '24');

    const apiUrl = `${
      process.env.NEXT_PUBLIC_API_SERVER
    }product/getListProduct?${queryParams.toString()}`;
    console.log(3234234234, apiUrl);

    const res = await fetch(apiUrl, {
      next: { revalidate: 3600 * 6 },
    });

    if (!res.ok) {
      const errorBody = await res.text();
      throw new Error(
        `API error: ${res.status} ${res.statusText}. Body: ${errorBody}`
      );
    }

    const data: ApiResponse = await res.json();

    return {
      ...data,
      currentPage: Number(data.currentPage) || parseInt(page, 10) || 1,
      totalPages: Number(data.totalPages) || 1,
    };
  } catch (error) {
    console.error('getProducts error:', error);
    return {
      productList: [],
      count: 0,
      currentPage: parseInt(page, 10) || 1,
      totalPages: 1,
    };
  }
};

export default async function Page({ params, searchParams }: Props) {
  const { lang } = params;
  const page = parseInt(params.page);
  if (isNaN(page) || page < 1) return notFound();
  try {
    const dictionary = await getDictionary(lang);
    const catalogContent = dictionary.catalogContent;

    const { productList, totalPages, count } = await getProducts(
      params.page,
      searchParams
    );

    if (!productList) {
      console.error(
        '[DEBUG] Page: Функція getProducts повернула null або undefined.'
      );
      throw new Error('Не вдалося отримати дані продуктів.');
    }

    const formattedProducts = (productList || []).map((product) => ({
      id: product.id,
      lotNumber: product.id.toString(),
      description: lang === 'uk' ? product.nameuk : product.nameru,
      price: `${product.price} грн.`,
      cod: product.cod,
      image: product.imgs?.[0]?.src
        ? `${product.imgs[0].src}`
        : 'https://placehold.co/300x300/eee/ccc?text=Немає+фото',
      category: product.category || 'Без категорії',
    }));

    return (
      <CatalogContentClient
        dictionary={catalogContent}
        searchParams={searchParams}
        products={formattedProducts as FormattedProduct[]}
        totalPages={totalPages}
        lang={lang} // Передаємо lang
        page={page}
      />
    );
  } catch (error) {
    console.error('[DEBUG] Page: Помилка на сторінці каталогу:', error);
    return (
      <main className="p-4">
        <div
          className="p-4 text-red-700 bg-red-100 border border-red-400 rounded-md"
          role="alert"
        >
          <strong className="font-bold">Помилка!</strong>
          <span className="block sm:inline">
            {' '}
            Не вдалося завантажити товари. Будь ласка, спробуйте оновити
            сторінку або поверніться пізніше.
          </span>
        </div>
      </main>
    );
  }
}
