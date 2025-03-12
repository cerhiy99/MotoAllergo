'use client';
import NavPath from '@/app/components/NavPath/NavPath';
import styles from './OfferAgreementContent.module.css';

type Props = {
  dictionary: any;
};

const OfferAgreementContent = ({ dictionary }: Props) => {
  return (
    <section className={styles.offerAgreementSection}>
      <div className={styles.offerAgreementContent}>
        <NavPath />
        <div className={styles.offerAgreementTitle}>
          <h1>ПУБЛІЧНИЙ ДОГОВІР (ОФЕРТА)</h1>
        </div>
        <p>
          Цей договір є офіційною та публічною пропозицією Продавця укласти договір купівлі-продажу Товару, представленого на сайті __________________. Даний договір є публічним, тобто відповідно до статті 633 Цивільного кодексу України, його умови є однаковими для всіх покупців незалежно від їх статусу (фізична особа, юридична особа, фізична особа-підприємець) без надання переваги одному покупцеві перед іншим. Шляхом укладення цього Договору покупець в повному обсязі приймає умови та порядок оформлення замовлення, оплати товару, доставки товару, повернення товару, відповідальності за недобросовісне замовлення та усі інші умови договору. Договір вважається укладеним з моменту натискання кнопки «Підтвердити Замовлення» на сторінці оформлення замовлення в Розділі «Кошик» і отримання Покупцем від Продавця підтвердження замовлення в електронному вигляді.
        </p>
        <h2>1. Визначення термінів</h2>
        <ul className={styles.offerAgreementList}>
          <li>
            <strong>1.1. Публічна оферта (далі - «Оферта»)</strong> - публічна пропозиція Продавця, адресована невизначеному колу осіб, укласти з Продавцем договір купівлі-продажу товару дистанційним способом (далі - «Договір») на умовах, що містяться в цій Оферті.
          </li>
          <li>
            <strong>1.2. Товар або Послуга</strong> – об'єкт угоди сторін, який був обраний покупцем на сайті Інтернет-магазину та поміщений у кошик, або вже придбаний Покупцем у Продавця дистанційним способом.
          </li>
          <li>
            <strong>1.3. Інтернет-магазин</strong> – сайт Продавця за адресою www. _____________ створений для укладення договорів роздрібної та оптової купівлі-продажу на підставі ознайомлення Покупця із запропонованим Продавцем описом Товару за допомогою мережі Інтернет.
          </li>
          <li>
            <strong>1.4. Покупець</strong> – дієздатна фізична особа, яка досягла 18 років, отримує інформацію від Продавця, розміщує замовлення щодо купівлі товару, що представлений на сайті Інтернет-магазину для цілей, що не пов'язані зі здійсненням підприємницької діяльності, або юридична особа чи фізична особа-підприємець.
          </li>
          <li>
            <strong>1.5. Продавець</strong> – Товариство з обмеженою відповідальністю «_______________» (ідентифікаційний код ____________), юридична особа, яка створена і діє відповідно до чинного законодавства України, місцезнаходження якої: ____, м. ________, вул. ____________, буд._____.
          </li>
        </ul>

        <h2>2. Предмет Договору</h2>
        <ul className={styles.offerAgreementList}>
          <li>
            <strong>2.1.</strong> Продавець зобов’язується передати у власність Покупцю Товар, а Покупець зобов’язується оплатити і прийняти Товар на умовах цього Договору.
          </li>
          <li>
            <strong>2.2.</strong> Датою укладення Договору-оферти (акцептом оферти) та моментом повного й беззаперечного прийняттям Покупцем умов Договору вважається дата заповнення Покупцем форми замовлення, розташованої на сайті Інтернет-магазину, за умови отримання Покупцем від Продавця підтвердження замовлення в електронному вигляді. У разі необхідності, за бажанням Покупця, Договір може бути оформлений у письмовій формі.
          </li>
        </ul>

        <h2>3. Оформлення Замовлення</h2>
        <ul className={styles.offerAgreementList}>
          <li>
            <strong>3.1.</strong> Покупець самостійно оформлює замовлення в Інтернет-магазині через форму «Кошика», або зробивши замовлення електронною поштою чи за номером телефону, вказаним в розділі контактів Інтернет-магазину.
          </li>
          <li>
            <strong>3.2.</strong> Продавець має право відмовитися від передання замовлення Покупцеві у випадку, якщо відомості, вказані Покупцем під час оформлення замовлення, є неповними або викликають підозру щодо їх дійсності.
          </li>
          <li>
            <strong>3.3.</strong> При оформленні замовлення на сайті Інтернет-магазину Покупець зобов'язується надати наступну обов’язкову інформацію, необхідну Продавцю для виконання замовлення:
            <ul className={styles.offerAgreementListNested}>
              <li>
                <strong>3.3.1.</strong> прізвище, ім'я Покупця;
              </li>
              <li>
                <strong>3.3.2.</strong> адреса, за якою слід доставити Товар (якщо доставка до адреси Покупця);
              </li>
              <li>
                <strong>3.3.3.</strong> контактний телефон.
              </li>
              <li>
                <strong>3.3.4.</strong> Ідентифікаційний код для юридичної особи або фізичної-особи підприємця.
              </li>
            </ul>
          </li>
          <li>
            <strong>3.4.</strong> Найменування, кількість, артикул, ціна обраного Покупцем Товару вказуються в кошику Покупця на сайті Інтернет-магазину.
          </li>
          <li>
            <strong>3.5.</strong> Якщо будь-якої із Сторін договору необхідна додаткова інформація, він має право запросити її у іншій Стороні. У разі ненадання необхідної інформації Покупцем, Продавець не несе відповідальності за надання якісної послуги Покупцю при покупці товару в інтернет-магазині.
          </li>
          <li>
            <strong>3.6.</strong> При оформленні замовлення через оператора Продавця (п. 3.1. Цієї Оферти) Покупець зобов'язується надати інформацію, зазначену в п. 3.3 – 3.4. цієї Оферти.

          </li>
          <li>
            <strong>3.7.</strong> Ухвалення Покупцем умов цієї Оферти здійснюється за допомогою внесення Покупцем відповідних даних в реєстраційну форму на сайті Інтернет-магазину або при оформленні Замовлення через оператора. Після оформлення Замовлення через Оператора дані про Покупця вносяться до бази даних Продавця.
          </li>
          <li>
            <strong>3.8.</strong> Покупець несе відповідальність за достовірність наданої інформації при оформленні Замовлення.
          </li>
          <li>
            <strong>3.9.</strong> Укладаючи Договір, тобто акцептуючи умови даної пропозиції (запропоновані умови придбання Товару), шляхом оформлення Замовлення, Покупець підтверджує наступне:
            <ul className={styles.offerAgreementListNested}>
              <li>
              <strong>а)</strong> Покупець цілком і повністю ознайомлений, і згоден з умовами цієї пропозиції (оферти);
              </li>
              <li>
              <strong>б)</strong> він дає дозвіл на збір, обробку та передачу персональних даних, дозвіл на обробку персональних даних діє протягом усього терміну дії Договору, а також протягом необмеженого терміну після закінчення його дії. Крім цього, укладенням договору Покупець підтверджує, що він повідомлений (без додаткового повідомлення) про права, встановлених Законом України "Про захист персональних даних", про цілі збору даних, а також про те, що його персональні дані передаються Продавцеві з метою можливості виконання умов цього Договору, можливості проведення взаєморозрахунків, а також для отримання рахунків, актів та інших документів. Покупець також погоджується з тим, що Продавець має право надавати доступ та передавати його персональні дані третім особам без будь-яких додаткових повідомлень Покупця з метою виконання замовлення Покупця. Обсяг прав Покупця, як суб'єкта персональних даних відповідно до Закону України "Про захист персональних даних" йому відомий і зрозумілий.
              </li>
            </ul>
          </li>
        </ul>

        <h2>4. Ціна і Доставка Товару</h2>
        <ul className={styles.offerAgreementList}>
          <li>
            <strong>4.1.</strong> Ціни на Товари та послуги визначаються Продавцем самостійно та вказані на сайті Інтернет-магазину. Всі ціни на Товари та послуги вказані на сайті у гривнях з урахуванням ПДВ.
          </li>
          <li>
            <strong>4.2.</strong> Ціни на Товари та послуги можуть змінюватися Продавцем в односторонньому порядку залежно від кон'юнктури ринку. При цьому ціна окремої одиниці Товару, вартість якої оплачена Покупцем в повному обсязі, не може бути змінена Продавцем в односторонньому порядку.
          </li>
          <li>
            <strong>4.3.</strong> Вартість Товару, яка вказана на сайті Інтернет-магазину не включає в себе вартість доставки Товару Покупцю. Вартість доставки Товару Покупець сплачує відповідно до діючих тарифів служб доставки (перевізників) безпосередньо обраній ним службі доставки (перевізнику).
          </li>
          <li>
            <strong>4.4.</strong> Вартість Товару яка вказана на сайті Інтернет-магазину не включає в себе вартість доставки Товару на адресу Покупця.
          </li>
          <li>
            <strong>4.5.</strong> Продавець може вказати орієнтовну вартість доставки Товару на адресу Покупця під час звернення Покупця із відповідним запитом до Продавця шляхом надіслання листа на електронну пошту або при оформленні замовлення через оператора інтернет-магазину.
          </li>
          <li>
            <strong>4.6.</strong> Зобов'язання Покупця по оплаті Товару вважаються виконаними з моменту надходження Продавцю коштів на його рахунок.
          </li>
          <li>
            <strong>4.7.</strong> Розрахунки між Продавцем і Покупцем за Товар здійснюються способами, зазначеними на сайті Інтернет-магазину в розділі «Оплата і Доставка».
          </li>
          <li>
            <strong>4.8.</strong> При отриманні товару Покупець повинен у присутності представника служби доставки (перевізника) перевірити відповідність Товару якісним і кількісним характеристикам (найменування товару, кількість, комплектність, термін придатності).
          </li>
          <li>
            <strong>4.9.</strong> Покупець або його представник під час приймання Товару підтверджує своїм підписом в товарному чеку/або в замовленні/або в транспортній накладній на доставку товарів, що не має претензій до кількості товару, зовнішнім виглядом і комплектності товару.
          </li>
          <li>
            <strong>4.10.</strong> Право власності та ризик випадкової втрати або пошкодження Товару переходить до Покупця або його Представника з моменту отримання Товару Покупцем в місті поставки Товару при самостійній доставки Товару від Продавця, чи під час передачі Продавцем товару службі доставки (перевізнику) обраної Покупцем.
          </li>
        </ul>

        <h2>5. Права та обов’язки Сторін</h2>
        <ul className={styles.offerAgreementList}>
          <li>
            <strong>5.1. Продавець зобов’язаний:</strong>
            <ul className={styles.offerAgreementListNested}>
              <li>
                <strong>5.1.1.</strong> Передати Покупцеві товар у відповідності до умов цього Договору та замовлення Покупця.
              </li>
              <li>
                <strong>5.1.2.</strong> Не розголошувати будь-яку приватну інформацію про Покупця і не надавати доступ до цієї інформації третім особам, за винятком випадків, передбачених законодавством та під час виконання Замовлення Покупця.
              </li>
            </ul>
          </li>
          <li>
            <strong>5.2. Продавець має право:</strong>
            <ul className={styles.offerAgreementListNested}>
              <li>
                <strong>5.2.1.</strong> Змінювати умови цього Договору, а також ціни на Товари та послуги, в односторонньому порядку, розміщуючи їх на сайті Інтернет-магазину. Всі зміни набувають чинності з моменту їх публікації.
              </li>
            </ul>
          </li>
          <li>
            <strong>5.3. Покупець зобов'язується:</strong>
            <ul className={styles.offerAgreementListNested}>
              <li>
                <strong>5.3.1.</strong> До моменту укладення Договору ознайомитися зі змістом Договору, умовами Договору і цінами, запропонованими Продавцем на сайті Інтернет-магазину.
              </li>
              <li>
                <strong>5.3.2.</strong> На виконання Продавцем своїх зобов'язань перед Покупцем останній повинен повідомити всі необхідні дані, що однозначно ідентифікують його як Покупця, і достатні для доставки Покупцеві замовленого Товару.
              </li>
            </ul>
          </li>
        </ul>

        <h2>6. Повернення Товару</h2>
        <ul className={styles.offerAgreementList}>
          <li>
            <strong>6.1.</strong> Покупець має право на повернення Продавцеві непродовольчого товару належної якості, якщо товар не задовольнив його за формою, габаритами, фасоном, кольором, розміром або з інших причин не може бути ним використаний за призначенням. Покупець має право на повернення товару належної якості протягом 14 (чотирнадцяти) днів, не враховуючи дня купівлі. Повернення товару належної якості проводиться, якщо він не використовувався і якщо збережено його товарний вигляд, споживчі властивості, упаковка, пломби, ярлики, а також розрахунковий документ, виданий Покупцю за оплату Товару. Перелік товарів, що не підлягають поверненню на підставах, передбачених у цьому пункті, затверджується Кабінетом Міністрів України.
          </li>
          <li>
            <strong>6.2.</strong> Повернення Покупцеві вартості товару належної якості здійснюється протягом 30 (тридцяти) календарних днів з моменту отримання такого Товару Продавцем за умови дотримання вимог, передбачених п. 6.1. Договору, чинним законодавством України.
          </li>
          <li>
            <strong>6.3.</strong> Вартість товару підлягає поверненню шляхом банківського переказу на рахунок Покупця.
          </li>
          <li>
            <strong>6.4.</strong> Повернення Товару належної якості за адресою Продавця, здійснюється за рахунок Покупця та Продавцем Покупцеві не відшкодовується.
          </li>
          <li>
            <strong>6.5.</strong> У разі виявлення протягом встановленого гарантійного строку недоліків у Товарі, Покупець особисто, в порядку та у строки, що встановлені законодавством України, має право пред'явити Продавцеві вимоги, передбачені Законом України «Про захист прав споживачів». При пред’явленні вимог про безоплатне усунення недоліків, строк на їх усунення відраховується з дати отримання Товару Продавцем в своє розпорядження та фізичного доступу до такого Товару.
          </li>
          <li>
            <strong>6.6.</strong> Розгляд вимог, передбачених Законом України «Про захист прав споживачів», провадиться Продавцем за умови надання Покупцем документів, передбачених чинним законодавством України. Продавець не відповідає за недоліки Товару, які виникли після його передання Покупцеві внаслідок порушення Покупцем правил користування або зберігання Товару, дій третіх осіб або непереборної сили.
          </li>
          <li>
            <strong>6.7.</strong> Покупець не має права відмовитися від товару належної якості, що має індивідуально-визначені властивості, якщо зазначений товар може бути використаний виключно Покупцем, який його придбав, (в т.ч. за за бажанням Покупця не стандартні розміри, характеристики, зовнішній вигляд, комплектація та інше). Підтвердженням того, що товар має індивідуально-визначені властивості, є відмінність розмірів товару та інших характеристик, що вказані в інтернет-магазині.
          </li>
          <li>
            <strong>6.8.</strong> Повернення товару, у випадках, передбачених законом та цим Договором, здійснюється за адресою, вказаною на сайті в розділі «Контакти».
          </li>
        </ul>

        <h2>7. Відповідальність</h2>
        <ul className={styles.offerAgreementList}>
          <li>
            <strong>7.1.</strong> Продавець не несе відповідальності за шкоду, заподіяну Покупцеві або третім особам внаслідок неналежного монтажу, використання, зберігання Товару придбаного у Продавця.
          </li>
          <li>
            <strong>7.2.</strong> Продавець не несе відповідальності за неналежне, несвоєчасне виконання Замовлень і своїх зобов’язань у випадку надання Покупцем недостовірної або помилкової інформації.
          </li>
          <li>
            <strong>7.3.</strong> Продавець і Покупець несуть відповідальність за виконання своїх зобов'язань відповідно до чинного законодавства України і положень цього Договору.
          </li>
          <li>
            <strong>7.4.</strong> Продавець або Покупець звільняються від відповідальності за повне або часткове невиконання своїх зобов'язань, якщо невиконання є наслідком форс-мажорних обставин як: війна або військові дії, землетрус, повінь, пожежа та інші стихійні лиха, що виникли незалежно від волі Продавця і / або Покупця після укладення цього договору. Сторона, яка не може виконати свої зобов'язання, негайно повідомляє про це іншу Сторону.
          </li>
        </ul>

        <h2>8. Конфіденційність і захист персональних даних</h2>
        <ul className={styles.offerAgreementList}>
          <li>
            <strong>8.1.</strong> Надаючи свої персональні дані на сайті Інтернет-магазину при реєстрації або оформленні Замовлення, Покупець надає Продавцеві свою добровільну згоду на обробку, використання (у тому числі і передачу) своїх персональних даних, а також вчинення інших дій, передбачених Законом України «Про захист персональних даних», без обмеження терміну дії такої згоди.
          </li>
          <li>
            <strong>8.2.</strong> Продавець зобов'язується не розголошувати отриману від Покупця інформацію. Не вважається порушенням надання Продавцем інформації контрагентам і третім особам, що діють на підставі договору з Продавцем, в тому числі і для виконання зобов'язань перед Покупцем, а також у випадках, коли розкриття такої інформації встановлено вимогами чинного законодавства України.
          </li>
          <li>
            <strong>8.3.</strong> Покупець несе відповідальність за підтримання своїх персональних даних в актуальному стані. Продавець не несе відповідальності за неякісне виконання або невиконання своїх зобов'язань у зв'язку з неактуальністю інформації про Покупця або невідповідністю її дійсності.
          </li>
        </ul>

        <h2>9. Інші умови</h2>
        <ul className={styles.offerAgreementList}>
          <li>
            <strong>9.1.</strong> Цей договір укладено на території України і діє відповідно до чинного законодавства України.
          </li>
          <li>
            <strong>9.2.</strong> Усі спори, що виникають між Покупцем і Продавцем, вирішуються шляхом переговорів. У випадку недосягнення врегулювання спірного питання шляхом переговорів, Покупець та/або Продавець мають право звернутися за вирішенням спору до судових органів відповідно до чинного законодавства України.
          </li>
          <li>
            <strong>9.3.</strong> Продавець має право вносити зміни до цього Договору в односторонньому порядку, передбаченому п. 5.2.1. Договору. Крім того, зміни до Договору також можуть бути внесені за взаємною згодою Сторін в порядку, передбаченому чинним законодавством України.
          </li>
        </ul>

        <h2>Адреса та реквізити Продавця</h2>
        <p>
          ТОВ «___________________»<br />
          ___, м. __________, вул. __________, буд. ____<br />
          п/р ______________ в АТ «__________»<br />
          МФО ____________<br />
          Код _____________<br />
          ІПН _____________<br />
          Св. ПДВ _________<br />
          тел. (___) ________
        </p>
      </div>
    </section>
  );
};

export default OfferAgreementContent;