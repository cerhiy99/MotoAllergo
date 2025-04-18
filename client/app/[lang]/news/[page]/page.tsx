import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import React from 'react';
import NewsContent from '@/app/components/NewsContent/NewsContent';
import styles from './NewsContent.module.css';
import Link from 'next/link';
import Pagination from '@/app/components/Pagination/Pagination';

const limit = 12;

type Props = {
  params: { lang: Locale; page: string };
};

type NewsItem = [string, string];

type NewsDictionary = {
  news: {
    title: string;
    news: NewsItem[];
  };
};

const getData = async (page: string) => {
  let res = await fetch(
    process.env.NEXT_PUBLIC_API_SERVER +
      `blog/getList?page=${page}&limit=${limit}`,
    {
      next: { revalidate: 3600 * 6 },
    }
  );
  if (!res.ok) throw new Error('Не вдалося отримати дані1');
  const data = await res.json();
  return data;
};

const Page = async ({ params: { lang, page } }: Props) => {
  const dictionary = await getDictionary(lang);

  const blogs: {
    count: number;
    rows: {
      id: number;
      nameuk: string;
      nameru: string;
      descriptionuk: string;
      descriptionru: string;
      createdAt: string;
    }[];
  } = await getData(page);

  // Перетворюємо отримані дані у правильний формат
  const formattedNews: NewsDictionary = {
    news: {
      title: dictionary.news.title, // Витягуємо заголовок
      news: dictionary.news.news as NewsItem[], // Вказуємо, що це масив [string, string]
    },
  };

  const totalPages = Math.ceil(blogs.count / limit);
  console.log(totalPages, blogs.count);

  return (
    <main>
      <div className={styles.newsWrapper}>
        {
          //<NavPatp />
        }
        <h1 className={styles.newsTitle}>{dictionary.news.title}</h1>
        <ul className={styles.newsList}>
          {blogs.rows.map((x) => (
            <li key={x.id} className={styles.newsEl}>
              <Link href={`/${lang}/select-news/${x.id}`}>
                <h2>{x[`name${lang}`]}</h2>
                <div className={styles.line}></div>
                <p
                  dangerouslySetInnerHTML={{ __html: x[`description${lang}`] }}
                ></p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Pagination
        currentPage={parseInt(page)}
        totalPages={totalPages}
        url={`/${lang}/news/`}
        queryParams={''}
        showPages={2}
      />
    </main>
  );
};

export default Page;
