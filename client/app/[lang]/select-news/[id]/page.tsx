import { Locale } from '@/i18n.config';
import React from 'react';
import { getDictionary } from '@/lib/dictionary';
import CurrentNewsContent from '@/app/components/CurrentNewsContent/CurrentNewsContent';

type Props = {
  params: { lang: Locale; id: string };
};

const getData = async (id: string) => {
  let res = await fetch(
    process.env.NEXT_PUBLIC_API_SERVER + `blog/getSelect?id=${id}`,
    {
      next: { revalidate: 3600 * 6 },
    }
  );
  if (!res.ok) throw new Error('Не вдалося отримати дані1');
  const data = await res.json();
  return data.blog;
};

const page = async ({ params: { lang, id } }: Props) => {
  const dictionary = await getDictionary(lang);
  const news = await getData(id);
  console.log(432423, news);

  if (!news) {
    return <div>Новина не знайдена</div>;
  }

  return (
    <div>
      <CurrentNewsContent news={news} dictionary={dictionary} lang={lang} />
    </div>
  );
};

export default page;
