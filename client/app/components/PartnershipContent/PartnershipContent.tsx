'use client';
import NavPath from '@/app/components/NavPath/NavPath';
import Image from 'next/image';
import styles from './PartnershipContent.module.css';

type Props = {
  dictionary: any;
};

const PartnershipContent = ({ dictionary }: Props) => {
  return (
    <section className={styles.partnershipSection}>
      <div className={styles.heroSection}></div>
      <div className={styles.partnershipContent}>
        <NavPath />
        <div className={styles.partnershipTitle}>
          <h1>Партнерство</h1>
        </div>
        <h2>Шановні партнери!</h2>
        <p>
            Ми, MotoAllergo, спеціалізуємося на доставці високоякісних товарів з Польщі через інтернет-магазин. Пропонуємо розпочати взаємовигідну співпрацю з вашою компанією та запровадити наші продукти до вашого асортименту. Наша мета — разом з вами забезпечити українським споживачам доступ до найкращих товарів за конкурентними цінами.
        </p>
        <h2>Що ми пропонуємо:</h2>
        <ol className={styles.partnershipNumberList}>
          <li className={styles.partnershipEl}>
            <span className={styles.highlightedText}>Якість товарів:</span> Наша компанія співпрацює з перевіреними постачальниками в Польщі, що дозволяє нам пропонувати широкий асортимент товарів у різних категоріях, від побутової техніки до модного одягу та аксесуарів.
          </li>
          <li className={styles.partnershipEl}>
            <span className={styles.highlightedText}>Швидка доставка:</span>ШЗавдяки власній логістичній системі ми здійснюємо доставку товарів безпосередньо з Польщі в Україну, забезпечуючи короткі терміни доставки та високу надійність.
          </li>
          <li className={styles.partnershipEl}>
            <span className={styles.highlightedText}>Конкурентні ціни:</span> Ми пропонуємо вигідні умови для наших партнерів. Спільно з вами ми можемо налаштувати систему знижок і спеціальних пропозицій для ваших клієнтів.          </li>
          <li className={styles.partnershipEl}>
            <span className={styles.highlightedText}>Гнучкі умови співпраці: </span>Ми готові підлаштувати умови партнерства під ваші потреби, пропонуючи варіанти як для великих магазинів, так і для малих підприємств.
          </li>
          <li className={styles.partnershipEl}>
            <span className={styles.highlightedText}>Підтримка на всіх етапах:</span> Ми надаємо повну підтримку для наших партнерів, включаючи допомогу в інтеграції наших товарів на вашій платформі, маркетингову підтримку та консультації по товарах.
          </li>
        </ol>
        <h2>Як ми можемо співпрацювати:</h2>
        <ul className={styles.partnershipList}>
          <li className={styles.partnershipEl}>
            <span className={styles.highlightedText}>Продаж товарів через ваш магазин:</span> Ви можете розміщувати наші товари на своєму сайті і продавати їх своїм клієнтам з вигодою для себе.
          </li>
          <li className={styles.partnershipEl}>
            <span className={styles.highlightedText}>Поставки на умовах дропшипінгу:</span> Ми відправляємо товар безпосередньо вашим клієнтам, а ви отримуєте комісію за кожен продаж.
          </li>
          <li className={styles.partnershipEl}>
            <span className={styles.highlightedText}>Спільні акції та маркетинг:</span> Ми можемо організувати спільні рекламні кампанії, знижки або акції, щоб привернути увагу до ваших клієнтів.
          </li>
        </ul>
      </div>
    </section>
  );
};

export default PartnershipContent;