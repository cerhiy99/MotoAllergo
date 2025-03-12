'use client';
import NavPath from '@/app/components/NavPath/NavPath';
import Image from 'next/image';
import styles from './PaymentDeliveryContent.module.css';

type Props = {
  dictionary: any;
};

const PaymentDeliveryContent = ({ dictionary }: Props) => {
  return (
    <section className={styles.paymentSection}>
      <div className={styles.paymentContent}>
        <NavPath />
        <div className={styles.paymentTitle}>
          <h1>Оплата і доставка</h1>
        </div>
        <p>
          Шановні клієнти, звертаємо вашу увагу, що ми приймаємо замовлення лише через сайт та за номером, вказаним на ньому!
        </p>
        <img className={styles.paymentImg} src={"/images/delivery.jpg"} alt={""} />
        <h2>Доставка в Україні</h2>
        <ul className={styles.paymentList}>
          <li>
            Доставка по всій Україні здійснюється через кур'єрську службу Нова Пошта, яка є надійним партнером у доставці товарів. Ми обрали цю компанію завдяки її оперативності та високій якості обслуговування. З її допомогою ви можете бути впевнені, що ваше замовлення буде доставлено в найкоротші терміни та в хорошому стані. Замовлення відправляються два рази на тиждень — у середу та суботу, що дозволяє нам ефективно обробляти ваші заявки та забезпечувати швидку доставку.
          </li>
          <li>
            Оплата за доставку товару здійснюється безпосередньо покупцем. Вартість доставки визначається згідно з тарифами Нової Пошти на момент відправлення товару. Тариф залежить від ваги та габаритів товару, а також від обраного способу доставки. Ви можете самостійно розрахувати вартість доставки на сайті Нової Пошти або звернутися до нашої служби підтримки, якщо вам потрібна допомога в підрахунку.
          </li>
          <li>
            Ми забезпечуємо страхування товару на суму, еквівалентну його вартості, при відправці через Нову Пошту. Це дає додаткову гарантію на випадок, якщо товар буде пошкоджений під час транспортування. Ми хочемо, щоб ви були впевнені в безпеці вашої покупки, тому страхування є важливим елементом нашого сервісу. В разі виявлення будь-яких пошкоджень під час транспортування, ми готові допомогти вам вирішити питання з компенсацією.
          </li>
          <li>
            При отриманні товару в відділенні Нової Пошти важливо уважно оглянути його на наявність видимих пошкоджень. Якщо ви помітили будь-які дефекти або пошкодження товару, необхідно скласти акт прийому-передачі товару. Це важливий документ, який підтверджує наявність пошкоджень, що виникли під час транспортування. Без цього акта ми не зможемо оформити претензію до Нової Пошти, тому переконайтеся, що всі необхідні документи оформлені.
          </li>
          <p>
            Для того, щоб отримати компенсацію за пошкоджений товар, вам потрібно подати претензію до Нової Пошти. Вона повинна містити всі деталі пошкодження, а також копії акту прийому-передачі та чека. Якщо претензія не буде оформлена правильно або без усіх необхідних документів, компенсація за товар не буде надана. Ми радимо звертатися до нашої служби підтримки, якщо у вас виникнуть питання чи труднощі в процесі оформлення претензії, і ми з радістю допоможемо!
          </p>
        </ul>
        <h2>Термін доставки</h2>
        <ul className={styles.paymentList}>
          <li>
            Весь процес доставки займає від 3-х до 7-ми робочих днів.
          </li>

        </ul>
        <p>
          Весь процес доставки займає від 3-х до 7-ми робочих днів, залежно від місцезнаходження покупця та обраного способу доставки. Доставка автозапчастин здійснюється лише після часткової або повної оплати замовлення в розмірі 50% від вартості товару. Це забезпечує гарантію для обох сторін — продавця та покупця. Продавець отримує впевненість, що покупець серйозно налаштований, а покупець має гарантію, що товар буде зарезервовано і доставлено в обумовлені терміни. Передоплата дозволяє нам оперативно зарезервувати товар та забезпечити його доставку без затримок. Після підтвердження оплати ми плануємо відправку і гарантуємо, що товар буде доставлений вчасно, без втрат або змін у замовленні. Якщо у вас є питання або потрібна додаткова інформація щодо процесу оплати або доставки, не вагайтеся звертатися до нас!
        </p>
        <h2>Способи оплати</h2>
        <p>
          Ви можете ознайомитися зі способами оплати, які ми пропонуємо для зручності наших клієнтів.
        </p>
        <img className={styles.paymentImg} src={"/images/visa.jpg"} alt={""} />
        <ul className={styles.paymentList}>
          <li>
            На карту ПриватБанку – зручний і швидкий спосіб оплати через банківську картку.
          </li>
          <li>
            На розрахунковий рахунок компанії – оплата через банківський переказ на розрахунковий рахунок юридичної особи.
          </li>
        </ul>
        <h2>Гарантія на б/в запчастини</h2>
        <p>
          На б/в запчастини надається лише перевірочна гарантія терміном 5 робочих днів, за умови, що продавець також дає гарантію на перевірку.

        </p>
        <p>
          Повернення або обмін б/в запчастин можливий лише у таких випадках:
        </p>
        <ol className={styles.paymentNumberList}>
          <li>
            Перший випадок — це коли запчастина не справна або працює не коректно, що може бути виявлено під час перевірки її функціональності або тестування, а також експлуатації. У такому разі покупець має право повернути товар або отримати іншу запчастину в обмін, якщо проблема не була вказана в описі товару.
          </li>
          <li>
            Другий випадок, коли можливе повернення або обмін — це наявність істотних пошкоджень, які не були зазначені на фотографіях лота або в описі товару, а також недоліків, які неможливо виправити або які впливають на безпеку експлуатації. Якщо на зображеннях товар виглядав без дефектів, а при отриманні виявлені пошкодження, що суттєво впливають на його використання, покупець може вимагати повернення коштів або обміну на іншу запчастину.
          </li>
          <li>
            Третій випадок стосується ситуації, коли надана запчастина не є тією, що була вказана в оголошенні. Це може включати випадки, коли запчастина не відповідає марці, моделі або іншим характеристикам, що були зазначені продавцем при оформленні продажу. У такому разі покупець має право на повернення або заміну товару.
          </li>
          <li>
            Також можливе повернення або обмін б/в запчастин, якщо була обговорена індивідуальна гарантія на повернення, в рамках якої продавець надає можливість повернення товару або обміну. У таких випадках обговорені умови повернення або обміну повинні бути чітко зафіксовані в угоді між покупцем і продавцем.
          </li>
        </ol>
      </div>
    </section>
  );
};

export default PaymentDeliveryContent;