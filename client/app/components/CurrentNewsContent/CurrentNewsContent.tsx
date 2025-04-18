import styles from './CurrentNewsContent.module.css';
import { Locale } from '@/i18n.config';
import Image from 'next/image';
import NavPath from '@/app/components/NavPath/NavPath';
import ListImgs from '../listImgs/ListImgs';

type News = {
  title: string;
  content: string;
  createdAt: string;
  imagePaths: string[];
};

type NewsDetailProps = {
  news: any;
  dictionary: any;
  lang: Locale;
};

const CurrentNewsContent: React.FC<NewsDetailProps> = ({
  news,
  dictionary,
  lang,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };
    return date.toLocaleDateString('uk-UA', options);
  };

  return (
    <div className={styles.newsDetail}>
      {
        //<NavPath />
      }
      <div className={styles.firstImgWrapper}>
        {news.blogImgs.length > 0 && (
          <img
            className={styles.firstImage}
            src={process.env.NEXT_PUBLIC_SERVER + news.blogImgs[0].src}
            alt={`${news.title} - головне фото`}
          />
        )}
      </div>
      <ListImgs news={news} />
      {/*  {additionalImages.length > 0 && (
        <div className={styles.newsImages}>
          <button
            className={`${styles.sliderButton} ${styles.prev}`}
            onClick={prevSlide}
          >
            ❮
          </button>

          <div className={styles.sliderWrapper}>
            <div
              className={styles.sliderContent}
              style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
            >
              {additionalImages.map((imagePath, index) => (
                <img
                  key={index}
                  className={styles.newsImagesImg}
                  src={imagePath}
                  alt={`${news.title} - фото ${index + 2}`}
                />
              ))}
            </div>
          </div>
          <button
            className={`${styles.sliderButton} ${styles.next}`}
            onClick={nextSlide}
          >
            ❯
          </button>
        </div>
      )}*/}

      <h1 className={styles.newsTitle}>{news[`name${lang}`]}</h1>
      <div className={styles.newsMeta}>
        <i className="fa-regular fa-calendar-days"></i>
        <p>Дата публікації: {formatDate(news.createdAt)}</p>
      </div>
      <div className={styles.newsContent}>
        <p dangerouslySetInnerHTML={{ __html: news[`description${lang}`] }} />
      </div>
    </div>
  );
};

export default CurrentNewsContent;
