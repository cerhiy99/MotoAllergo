import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import React from 'react';
import NewsContent from '@/app/components/NewsContent/NewsContent';

type Props = {
  params: { lang: Locale };
};

type NewsItem = [string, string];

type NewsDictionary = {
  news: {
    title: string;
    news: NewsItem[];
  };
};

const Page = async ({ params: { lang } }: Props) => {
  const dictionary = await getDictionary(lang);

  // Перетворюємо отримані дані у правильний формат
  const formattedNews: NewsDictionary = {
    news: {
      title: dictionary.news.title, // Витягуємо заголовок
      news: dictionary.news.news as NewsItem[], // Вказуємо, що це масив [string, string]
    },
  };

  return (
    <main>
      <NewsContent dictionary={formattedNews} />
    </main>
  );
};

export default Page;