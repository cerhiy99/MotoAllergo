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
          Ми, компанія MotoAllergo, спеціалізуємося на доставці високоякісних автозапчастин з Польщі через інтернет-магазин. Наш асортимент включає широкий вибір автозапчастин, які відповідають найвищим стандартам якості та задовольняють вимоги сучасного автомобільного ринку України. Ми прагнемо стати надійним партнером для вашої компанії та запропонувати вигідні умови співпраці. Наші автозапчастини можуть стати важливою частиною вашого асортименту, допомагаючи залучити нових клієнтів та забезпечити високий рівень задоволення від покупки. Ми пропонуємо не тільки конкурентні ціни, але й безпечну та швидку доставку, що дозволить зберегти високу якість сервісу для кінцевого споживача. З нашими автозапчастинами ваш бізнес зможе розширити пропозицію та збільшити прибуток, при цьому підтримуючи високу репутацію завдяки відмінним продуктам. Наше завдання — спільно з вами забезпечити українських споживачів доступом до найкращих автозапчастин за конкурентними цінами, створюючи вигідну співпрацю, яка принесе користь. Ми відкриті до обговорення умов партнерства, що задовольнять потреби вашої компанії.
        </p>
        <h2>Що ми пропонуємо:</h2>
        <ol className={styles.partnershipNumberList}>
          <li className={styles.partnershipEl}>
            <span className={styles.highlightedText}>Якість товарів:</span> Наша компанія співпрацює з перевіреними постачальниками автозапчастин в Польщі, що дозволяє нам пропонувати широкий асортимент запчастин для автомобілів різних марок та моделей. Ми обираємо лише високоякісні запчастини, які відповідають міжнародним стандартам, що гарантує їхню надійність та довговічність. У нашому асортименті ви знайдете як оригінальні запчастини, так і високоякісні аналоги, що дозволяє задовольнити потреби різних категорій споживачів. Ми прагнемо забезпечити ваш бізнес усім необхідним для ремонту та обслуговування автомобілів, надаючи тільки перевірену продукцію.
          </li>
          <li className={styles.partnershipEl}>
            <span className={styles.highlightedText}>Швидка доставка:</span>Ми розуміємо, що для бізнесу та кінцевих споживачів важливо отримати автозапчастини своєчасно. Тому ми організовуємо доставку безпосередньо з Польщі в Україну, максимально скорочуючи терміни доставки. Наші логістичні партнери працюють на найвищому рівні, забезпечуючи оперативне транспортування та гарантування надійності кожної посилки. Завдяки власній логістичній системі та ретельно налагодженим маршрутам ми можемо запропонувати доставку за найкоротші строки, що дозволяє вашим клієнтам отримувати замовлення точно вчасно.
          </li>
          <li className={styles.partnershipEl}>
            <span className={styles.highlightedText}>Конкурентні ціни:</span> Ми прагнемо зробити наші запчастини доступними для різних категорій клієнтів. Спільно з вами ми можемо налаштувати систему знижок і спеціальних пропозицій, які дозволять вам пропонувати своїм покупцям найбільш вигідні умови. Наші ціни є конкурентоспроможними на ринку автозапчастин, і ми завжди готові до гнучкої співпраці, щоб забезпечити вам найкращі умови для розвитку бізнесу та залучення нових клієнтів.
            </li>
          <li className={styles.partnershipEl}>
            <span className={styles.highlightedText}>Гнучкі умови співпраці: </span>Незалежно від розміру вашого бізнесу, ми готові підлаштувати умови партнерства під ваші потреби. Для великих мереж автозапчастин ми пропонуємо спеціальні умови закупівлі, а для малих підприємств — персоналізовані пропозиції, що включають зручні умови доставки та обробки замовлень. Ми орієнтуємося на довгострокові партнерські відносини, тому завжди готові знайти рішення, яке буде максимально вигідним для вашого бізнесу.
          </li>
          <li className={styles.partnershipEl}>
            <span className={styles.highlightedText}>Підтримка на всіх етапах:</span> Ми надаємо повну підтримку нашим партнерам на кожному етапі співпраці. Починаючи від допомоги в інтеграції наших товарів на вашій платформі і до маркетингової підтримки та консультацій по товарах, ми завжди поруч, щоб забезпечити безперебійне та успішне функціонування вашого бізнесу. Наші спеціалісти готові надати професійну консультацію щодо вибору автозапчастин, а також допомогти у вирішенні будь-яких технічних питань, що можуть виникнути. Ми також пропонуємо рекламні матеріали для просування продукції, що дозволяє вам ефективно рекламувати автозапчастини та привертати увагу нових клієнтів.
          </li>
        </ol>
        <h2>Як ми можемо співпрацювати:</h2>
        <ul className={styles.partnershipList}>
          <li className={styles.partnershipEl}>
            <span className={styles.highlightedText}>Продаж товарів через ваш магазин:</span> Ви можете розміщувати наші автозапчастини на своєму сайті та продавати їх своїм клієнтам з вигодою для себе. Ми надаємо повний каталог товарів, з детальними описами та фотографіями, що дозволяє вам без проблем інтегрувати наші продукти в ваш асортимент. Завдяки високій якості нашої продукції та конкурентоспроможним цінам, ви зможете збільшити свої продажі і привабити більше покупців, які шукають надійні автозапчастини.
          </li>
          <li className={styles.partnershipEl}>
            <span className={styles.highlightedText}>Поставки на умовах дропшипінгу:</span> Ми пропонуємо модель дропшипінгу, що дозволяє вам продавати автозапчастини без необхідності зберігати їх на складі. Ви просто приймаєте замовлення від своїх клієнтів, а ми відправляємо товар безпосередньо до них. В цьому випадку ви отримуєте комісію за кожен продаж без необхідності інвестувати в складські запаси чи логістику. Це ідеальне рішення для підприємств, які хочуть розширити свій асортимент без великих витрат.
          </li>
          <li className={styles.partnershipEl}>
            <span className={styles.highlightedText}>Спільні акції та маркетинг:</span> Ми готові організувати спільні рекламні кампанії, знижки або акції для привернення уваги до вашого магазину та наших автозапчастин. Це може бути як онлайн-просування через соціальні мережі та рекламні платформи, так і офлайн-заходи або спеціальні пропозиції для ваших клієнтів. Ми також надаємо маркетингові матеріали, такі як банери, листівки, чи контент для соціальних мереж, щоб максимально ефективно популяризувати наші товари. Спільні акції допоможуть не тільки збільшити продажі, а й покращити взаємовигідну співпрацю, залучаючи нових клієнтів.
          </li>
        </ul>
      </div>
    </section>
  );
};

export default PartnershipContent;