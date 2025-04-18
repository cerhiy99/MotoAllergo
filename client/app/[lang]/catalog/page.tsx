import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import CatalogContentClient from '@/app/components/CatalogContent/CatalogContentClient';
import productsData from './products.json';

type Props = {
  params: { lang: Locale };
  searchParams: any; ///{ [key: string]: string | string[] | undefined }
};

interface Product {
  id: number;
  nameuk: string;
  nameru: string;
  price: number;
  imgs: {
    id: number;
    src: string;
  };
}

const parseQueryParam = (
  param: string | string[] | undefined,
  defaultValue: string[] = []
): string[] => {
  if (!param) return defaultValue;
  if (Array.isArray(param)) return param;
  return param.split(',');
};

export default async function page({ params, searchParams }: Props) {
  const dictionary: any = await getDictionary(params.lang);
  const catalogContent = dictionary.catalogContent;
  // const { catalogContent } = await getDictionary(params.lang);
  return (
    <main>
      <CatalogContentClient
        dictionary={catalogContent}
        searchParams={searchParams}
        lang={params.lang}
      />
    </main>
  );
}
