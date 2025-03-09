import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import CatalogContentClient from '@/app/components/CatalogContent/CatalogContentClient';
import productsData from './products.json';

type Props = {
  params: { lang: Locale };
  searchParams: { [key: string]: string | string[] | undefined };
};

interface Product {
  id: number;
  lotNumber: string;
  description: string;
  price: string;
  image: string;
  category?: string;
}

const parseQueryParam = (param: string | string[] | undefined, defaultValue: string[] = []): string[] => {
  if (!param) return defaultValue;
  if (Array.isArray(param)) return param;
  return param.split(',');
};

export default async function Page({ params, searchParams }: Props) {
  const dictionary = await getDictionary(params.lang);

  const getFilteredProducts = (data: Product[], params: Props['searchParams']) => {
    let filteredProducts = [...data];
    const categories = parseQueryParam(params.categories);
    if (categories.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        categories.includes(product.category || '')
      );
    }
    const filters = params.filters
      ? Object.fromEntries(
          parseQueryParam(params.filters).map((f) => {
            const [key, value] = f.split('=');
            return [key.replace('filter', ''), value];
          })
        )
      : {};
    Object.entries(filters).forEach(([_, value]) => {
      if (value) {
        filteredProducts = filteredProducts.filter((product) =>
          product.description.toLowerCase().includes(value.toLowerCase())
        );
      }
    });
    const sort = params.sort || 'Популярності';
    switch (sort) {
      case 'Ціні: від низької до високої':
        filteredProducts.sort((a, b) => parseFloat(a.price.replace(/[^0-9.]/g, '')) - parseFloat(b.price.replace(/[^0-9.]/g, '')));
        break;
      case 'Ціні: від високої до низької':
        filteredProducts.sort((a, b) => parseFloat(b.price.replace(/[^0-9.]/g, '')) - parseFloat(a.price.replace(/[^0-9.]/g, '')));
        break;
      case 'Новизні':
        filteredProducts.sort((a, b) => b.id - a.id);
        break;
      default:
        break;
    }
    const page = parseInt(params.page as string || '1', 10);
    const productsPerPage = 24;
    const startIndex = (page - 1) * productsPerPage;
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    filteredProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

    return { products: filteredProducts, totalPages };
  };

  const { products, totalPages } = getFilteredProducts(productsData as Product[], searchParams);

  return (
    <main>
      <CatalogContentClient
        dictionary={dictionary}
        searchParams={searchParams}
        products={products}
        totalPages={totalPages}
      />
    </main>
  );
}