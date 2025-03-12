import { Locale } from '@/i18n.config';
import React from 'react';
import { getDictionary } from '@/lib/dictionary';
import CurrentNewsContent from '@/app/components/CurrentNewsContent/CurrentNewsContent';

type Props = {
  params: { lang: Locale; id: string };
};

const generateStaticParams = () => {
  return [
    { id: '1' },
    { id: '2' },
  ];
};

const getData = async (id: string) => {
  const newsData = new Map([
    [
      '1',
      {
        title: 'Новина 1',
        content: 'Це текст першої новини. Тут можуть бути деталі, наприклад, дата, автор і опис події.',
        createdAt: '2023-01-15T10:00:00Z',
        imagePaths: [
          '/images/news/image.png',
          '/images/news/image.png',
          '/images/news/image.png',
          '/images/news/image.png',
          '/images/news/image.png',
          '/images/news/image.png',
          '/images/news/image.png',
        ],
      },
    ],
    [
      '2',
      {
        title: 'Новина 2',
        content: 'Це текст другої новини. Вона може містити інформацію про нові автозапчастини чи акції.',
        createdAt: '2023-02-20T14:30:00Z',
        imagePaths: [
          '/images/news/image.png',
        ],
      },
    ],
  ]);

  return newsData.get(id) || null;
};

const page = async ({ params: { lang, id } }: Props) => {
  const dictionary = await getDictionary(lang);
  const news = await getData(id);

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
export { generateStaticParams };