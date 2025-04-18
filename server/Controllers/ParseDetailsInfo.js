const axios = require('axios');
const cheerio = require('cheerio');
const {
  typeDetail,
  CategoryTypeDetail,
  CarModel,
} = require('../models/models');
const $browser = require('./utils/http');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

class ParseDetailsInfo {
  static GetAllDetailInfoWithAllModel = async () => {
    try {
      console.log('🔍 Отримуємо всі моделі авто з бази...');
      const models = await CarModel.findAll();
      console.log(`✅ Знайдено ${models.length} моделей.`);

      for (let i = 0; i < models.length; i++) {
        const model = models[i];
        const urlUk = `https://restauto.com.ua/ua/auto-catalog/${model.url}/1`;
        const urlRu = `https://restauto.com.ua/ru/auto-catalog/${model.url}/1`;

        console.log(
          `\n🚗 [${i + 1}/${models.length}] Обробка моделі: ${model.name}`
        );

        try {
          await this.getAllDetailInfo(urlUk, urlRu);
          console.log(`✅ Деталі для ${model.name} успішно оброблено`);
        } catch (error) {
          console.error(
            `❌ Помилка при обробці ${model.name}: ${urlUk} ${urlRu}`,
            error.message
          );
        }
      }

      console.log('\n🏁 Всі моделі оброблено.');
    } catch (error) {
      console.error(
        '🚨 Загальна помилка при отриманні моделей або обробці:',
        error.message
      );
    }
  };

  static getAllDetailInfo = async (urluk, urlru) => {
    try {
      const resUk = await $browser.get(urluk);
      await sleep(2000);
      const resRu = await $browser.get(urlru);
      await sleep(2000);

      const $uk = cheerio.load(resUk.data);
      const $ru = cheerio.load(resRu.data);

      const firstLevelCategoriesUk = $uk(
        'ul.related-categories__box.js--categories-scroll > li.related-categories__first-level'
      );

      for (let i = 0; i < firstLevelCategoriesUk.length; i++) {
        const el = firstLevelCategoriesUk[i];

        const categoryHref = $uk(el)
          .find('a.related-categories__link')
          .attr('href');
        const categoryUrl =
          ParseDetailsInfo.extractLastPathSegment(categoryHref);

        const categoryNameUk = $uk(el)
          .find('a.related-categories__link span.related-categories__item')
          .text()
          .trim();

        const categoryNameRu = $ru(
          'ul.related-categories__box.js--categories-scroll > li.related-categories__first-level'
        )
          .eq(i)
          .find('a.related-categories__link span.related-categories__item')
          .text()
          .trim();

        // Створюємо або знаходимо категорію
        const [category, created] = await CategoryTypeDetail.findOrCreate({
          where: { url: categoryUrl },
          defaults: {
            nameuk: categoryNameUk,
            nameru: categoryNameRu,
          },
        });

        // Парсимо підкатегорії
        const subItems = $uk(el).find(
          'ul.related-categories__second-level li.second-level__item'
        );

        for (let j = 0; j < subItems.length; j++) {
          const subEl = subItems[j];

          const subHref = $uk(subEl).find('a.second-level__link').attr('href');
          const subUrl = ParseDetailsInfo.extractLastPathSegment(subHref);
          const nameUk = $uk(subEl)
            .find('a.second-level__link')
            .text()
            .replace(/\s+/g, ' ')
            .trim();
          const nameRu = $ru(
            'ul.related-categories__box.js--categories-scroll > li.related-categories__first-level'
          )
            .eq(i)
            .find('ul.related-categories__second-level li.second-level__item')
            .eq(j)
            .find('a.second-level__link')
            .text()
            .replace(/\s+/g, ' ')
            .trim();

          // Додаємо тип деталі в базу
          await typeDetail.findOrCreate({
            where: { url: subUrl },
            defaults: {
              nameuk: nameUk,
              nameru: nameRu,
              categoryTypeDelailId: category.id,
            },
          });
        }
      }

      console.log('✅ Деталі успішно додано в базу');
    } catch (err) {
      console.error(
        '❌ Помилка при парсингу або збереженні в базу:',
        err.message
      );
    }
  };

  static extractLastPathSegment = (url) => {
    if (!url) return null;
    const segments = url.split('/').filter(Boolean);
    return segments.length >= 2 ? segments[segments.length - 2] : null;
  };
}

module.exports = ParseDetailsInfo;
