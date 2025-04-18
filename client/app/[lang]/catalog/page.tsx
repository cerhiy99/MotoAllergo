import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import CatalogContentClient from '@/app/components/CatalogContent/CatalogContentClient';

interface ProductImage {
  id: number;
  src: string;
  createdAt: string;
  updatedAt: string;
  productId: number;
}

interface Product {
  id: number;
  nameuk: string;
  nameru: string;
  price: string;
  priceUsd: string;
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
  params: { lang: Locale };
  searchParams: { [key: string]: string | string[] | undefined };
};

const limit = 24;

const parseQueryParam = (param: string | string[] | undefined, defaultValue: string[] = []): string[] => {
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

const getProducts = async (page: string, searchParams: Props['searchParams'], lang: Locale): Promise<ApiResponse> => {
  console.log(`[DEBUG] getProducts: Запит продуктів для сторінки: ${page}, мова: ${lang}`);
  console.log(`[DEBUG] getProducts: Отримані searchParams:`, searchParams);

  try {
    const categories = parseQueryParam(searchParams.categories);
    const filtersInput = searchParams.filters;
    let filters: Record<string, string> = {};

    if (typeof filtersInput === 'string') {
      try {
        filters = Object.fromEntries(
          filtersInput.split(',').map((f) => {
            const [key, value] = f.split('=');
            return [key.replace(/^filter/, ''), value];
          })
        );
      } catch (e) {
        console.error("[DEBUG] getProducts: Не вдалося розпарсити фільтри:", filtersInput, e);
        filters = {};
      }
    } else if (typeof filtersInput === 'object' && filtersInput !== null) {
      filters = filtersInput as Record<string, string>;
    }

    const sort = typeof searchParams.sort === 'string' ? searchParams.sort : 'Популярності';

    const params: Record<string, string> = {
      page: page,
      limit: limit.toString(),
    };

    if (categories.length > 0) {
      params.categories = categories.join(',');
    }

    if (Object.keys(filters).length > 0) {
      Object.entries(filters).forEach(([key, value]) => {
        params[key] = value;
      });
      console.log("[DEBUG] getProducts: Додані фільтри до параметрів:", filters);
    }

    params.sort = sort;

    const queryParams = new URLSearchParams(params);
    const apiUrl = `${process.env.NEXT_PUBLIC_API_SERVER}product/getListProduct?${queryParams.toString()}`;

    console.log('[DEBUG] getProducts: Формований URL для API запиту:', apiUrl);

    const res = await fetch(apiUrl, {
      next: { revalidate: 3600 * 6 },
    });

    console.log(`[DEBUG] getProducts: Статус відповіді API: ${res.status} ${res.statusText}`);

    if (!res.ok) {
      let errorBody = 'Не вдалося прочитати тіло помилки';
      try {
        errorBody = await res.text();
        console.error('[DEBUG] getProducts: Тіло помилки API:', errorBody);
      } catch (e) {
        console.error('[DEBUG] getProducts: Не вдалося прочитати тіло помилки API:', e);
      }
      throw new Error(`Не вдалося отримати продукти: ${res.status} ${res.statusText}. Тіло: ${errorBody}`);
    }

    const data: ApiResponse = await res.json();
    console.log('[DEBUG] getProducts: Отримані дані від API:', data);

    if (!data || typeof data !== 'object' || !Array.isArray(data.productList)) {
      console.warn('[DEBUG] getProducts: API повернуло успішний статус, але структура даних невірна.');
      return { productList: [], count: 0, currentPage: parseInt(page, 10) || 1, totalPages: data?.totalPages || 1 };
    }

    data.currentPage = Number(data.currentPage) || parseInt(page, 10) || 1;
    data.totalPages = Number(data.totalPages) || 1;

    return data;
  } catch (error) {
    console.error('[DEBUG] getProducts: Помилка під час завантаження продуктів:', error);
    return { productList: [], count: 0, currentPage: parseInt(page, 10) || 1, totalPages: 1 };
  }
};

export default async function Page({ params, searchParams }: Props) {
  const { lang } = params;
  console.log(`[DEBUG] Page: Рендеринг сторінки каталогу для мови: ${lang}`);
  console.log(`[DEBUG] Page: Отримані searchParams:`, searchParams);

  try {
    const currentPage = typeof searchParams.page === 'string' && parseInt(searchParams.page, 10) > 0
      ? searchParams.page
      : '1';
    console.log(`[DEBUG] Page: Визначена поточна сторінка: ${currentPage}`);

    const dictionary = await getDictionary(lang);
    const catalogContent = dictionary.catalogContent;

    const productsData = await getProducts(currentPage, searchParams, lang);

    if (!productsData) {
      console.error('[DEBUG] Page: Функція getProducts повернула null або undefined.');
      throw new Error('Не вдалося отримати дані продуктів.');
    }

    console.log(`[DEBUG] Page: Отримано ${productsData.productList?.length ?? 0} продуктів. Загальна кількість сторінок: ${productsData.totalPages}`);

    const formattedProducts = (productsData.productList || []).map((product) => ({
      id: product.id,
      lotNumber: product.id.toString(),
      description: lang === 'uk' ? product.nameuk : product.nameru,
      price: `${product.price} грн.`,
      image: product.imgs?.[0]?.src
        ? `${process.env.NEXT_PUBLIC_SERVER}${product.imgs[0].src}`
        : 'https://placehold.co/300x300/eee/ccc?text=Немає+фото',
      category: product.category || 'Без категорії',
    }));

    return (
      <main>
        <CatalogContentClient
          dictionary={catalogContent}
          searchParams={searchParams}
          products={formattedProducts}
          totalPages={productsData.totalPages}
          lang={lang} // Передаємо lang
        />
      </main>
    );
  } catch (error) {
    console.error('[DEBUG] Page: Помилка на сторінці каталогу:', error);
    return (
      <main className="p-4">
        <div className="p-4 text-red-700 bg-red-100 border border-red-400 rounded-md" role="alert">
          <strong className="font-bold">Помилка!</strong>
          <span className="block sm:inline"> Не вдалося завантажити товари. Будь ласка, спробуйте оновити сторінку або поверніться пізніше.</span>
        </div>
      </main>
    );
  }
}