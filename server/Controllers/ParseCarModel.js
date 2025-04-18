const axios = require('axios');
const cheerio = require('cheerio');
const {
  CarBrand,
  CarModel,
  ProductBrand,
  ProductModel,
  ProductTypeDetail,
  ProductCategoryTypeDelail,
  CategoryTypeDetail,
  ProductLink,
  Product,
} = require('../models/models');
const TypeDetail = require('../models/models').typeDetail;

const $browser = require('./utils/http'); // Ти вже експортуєш axios як $browser
const { Op } = require('sequelize');
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

class ParseCarModel {
  static fetchBreadCrumbsAllProduct = async () => {
    try {
      const allProduct = await ProductLink.findAll({
        where: {
          id: {
            [Op.gt]: 11402,
          },
          isNew: true,
        },
      });
      for (let i = 0; i < allProduct.length; i++) {
        const link = `https://restauto.com.ua/ua${allProduct[i].link}`;

        const product = await Product.findOne({
          where: { productLinkId: allProduct[i].id },
        });

        if (!product) {
          console.warn(`❗️ Продукт з linkId ${allProduct[i].id} не знайдено.`);
          continue;
        }

        const productId = product.id;

        /*
        // 🔍 Перевірка: чи вже є запис у ProductBrand
        const alreadyLinked = await ProductBrand.findOne({
          where: { ProductId: productId },
        });

        if (alreadyLinked) {
          console.log(
            `⏩ Пропущено: продукт ${link} (ID: ${productId}) вже має зв'язок із брендом.`
          );
          continue;
        }*/

        console.log(
          `🔍 (${i + 1}/${allProduct.length}) Обробка продукту: ${link} (ID: ${productId})`
        );

        try {
          await this.fetchBreadcrumbs(link, productId);
          console.log(`✅ Готово: ${link}`);
        } catch (innerError) {
          console.error(`❌ Помилка для продукту ${link}:`, innerError.message);
        }
      }

      console.log('🎉 Всі продукти оброблені!');
    } catch (error) {
      console.error('❌ Глобальна помилка:', error.message);
    }
  };

  static fetchBreadcrumbs = async (productUrl, productId) => {
    try {
      await sleep(2000); // пауза 2 секунди
      const response = await $browser.get(productUrl);
      const breadcrumbs = this.extractBreadcrumbsFromHtml(response.data);
      if (breadcrumbs.length === 0) return;
      const idBrandInDB = await this.getIdBrandInDataBase(breadcrumbs[0]);
      await this.addProductBrand(productId, idBrandInDB);
      const breadCrumbsWithoutBrand = breadcrumbs.slice(1);
      for (let i = 0; i < breadCrumbsWithoutBrand.length; i++) {
        const url = breadCrumbsWithoutBrand[i].url;
        const filterUrl = this.extractLastPathSegment(url);
        const isThisModel = await this.IsThisUrlForModel(url);
        if (isThisModel) {
          const idModelInBD = await this.createModelIfNotExists(
            idBrandInDB,
            filterUrl
          );
          await this.addProductModel(productId, idModelInBD);
        } else {
          const categoryTypeDetail = await CategoryTypeDetail.findOne({
            where: { url: filterUrl },
            attributes: ['id'],
          });

          if (categoryTypeDetail) {
            console.log(
              `🔗 Знайдено CategoryTypeDetail для "${filterUrl}":`,
              categoryTypeDetail.id
            );
            await this.addProductCategoryTypeDetail(
              productId,
              categoryTypeDetail.id
            );
          } else {
            const typeDetail = await TypeDetail.findOne({
              where: { url: filterUrl },
              attributes: ['id'],
            });

            if (typeDetail) {
              console.log(
                `🔗 Знайдено TypeDetail для "${filterUrl}":`,
                typeDetail.id
              );
              await this.addProductTypeDetail(productId, typeDetail.id);
            } else {
              console.warn(`⚠️ Нічого не знайдено для "${filterUrl}"`);
            }
          }
        }
      }
    } catch (error) {
      console.error('Помилка при парсингу хлібних крихт:', error.message);
      return [];
    }
  };

  static addProductCategoryTypeDetail = async (
    productId,
    categoryTypeDetailId
  ) => {
    await ProductCategoryTypeDelail.findOrCreate({
      where: {
        productId,
        categoryTypeDetailId,
      },
    });
  };

  static addProductTypeDetail = async (productId, typeDetailId) => {
    await ProductTypeDetail.findOrCreate({
      where: {
        productId,
        typeDetailId,
      },
    });
  };

  static addProductBrand = async (productId, brandId) => {
    try {
      const [record, created] = await ProductBrand.findOrCreate({
        where: {
          productId: productId,
          CarBrandId: brandId,
        },
      });
      if (created) {
        //console.log(`✅ Додано бренд до товару: ${productId} → бренд ${brandId}`);
      }
    } catch (error) {
      console.error(
        '❌ Помилка при додаванні бренду до товару:',
        productId,
        brandId,
        error.message
      );
    }
  };

  static addProductModel = async (productId, modelId) => {
    try {
      const [record, created] = await ProductModel.findOrCreate({
        where: {
          productId: productId,
          carModelId: modelId,
        },
      });
      if (created) {
        //console.log(`✅ Додано модель до товару: ${productId} → модель ${modelId}`);
      }
    } catch (error) {
      console.error(
        '❌ Помилка при додаванні моделі до товару:',
        error.message
      );
    }
  };

  static createModelIfNotExists = async (brandId, modelUrl) => {
    try {
      const modelWithDB = await CarModel.findOne({
        where: { url: modelUrl },
        attributes: ['id'],
      });

      let idModelInBD;

      if (modelWithDB) {
        idModelInBD = modelWithDB.id;
      } else {
        await sleep(2000); // пауза 2 секунди
        const resUk = await $browser.get(
          `https://restauto.com.ua/ua/auto-catalog/${modelUrl}/1/`
        );

        const $ = cheerio.load(resUk.data);
        // Знаходимо select елемент з моделями авто
        const selectedOption = $('#selectCarModel option').first();
        console.log(selectedOption.text()); // Назва моделі (наприклад: Spark)
        console.log(selectedOption.attr('data-years')); // Роки (наприклад: (1998–2025))
        // Отримуємо назву моделі
        const name = selectedOption.text().trim();

        // Отримуємо роки з атрибута data-years
        const years =
          (await selectedOption
            .attr('data-years')
            ?.replace(/[()]/g, '')
            .trim()) || null;

        const createdModel = await CarModel.findOrCreate({
          name: name,
          years: years,
          url: modelUrl,
          CarBrandId: brandId,
        });

        idModelInBD = createdModel.id;
      }

      return idModelInBD;
    } catch (error) {
      console.error('❌ Помилка при створенні моделі авто:', error.message);
      return null;
    }
  };

  static extractBreadcrumbsFromHtml = (html) => {
    try {
      const $ = cheerio.load(html);
      const breadcrumbs = [];

      $('section.breadcrumbs li.breadcrumbs__li').each((_, el) => {
        const link = $(el).find('a.breadcrumbs__link');
        const title = link.find('span[itemprop="name"]').text().trim();
        const url = link.attr('href') || null;

        breadcrumbs.push({ title, url });
      });

      return breadcrumbs.slice(1, -1); // обрізаємо перший і останній
    } catch (error) {
      console.error('Помилка при обробці HTML хлібних крихт:', error.message);
      return [];
    }
  };

  static IsThisUrlForModel = async (url) => {
    try {
      const parts = url.split('/').filter(Boolean); // Розділяємо URL на частини
      return parts.length === 6; // Якщо кількість частин (без порожніх елементів) дорівнює 6, то це модель
    } catch (error) {
      console.error('Помилка при перевірці URL:', error.message);
      return false;
    }
  };

  static getIdBrandInDataBase = async (breadcrumb) => {
    try {
      if (!breadcrumb || !breadcrumb.url) return null;

      const brandUrlParts = breadcrumb.url.split('/').filter(Boolean);
      const catalogIndex = brandUrlParts.indexOf('auto-catalog');
      const brandSlug =
        catalogIndex !== -1 ? brandUrlParts[catalogIndex + 1] : null;

      if (!brandSlug) {
        console.warn('Не вдалося знайти slug бренду в URL');
        return null;
      }

      const pureBrandSlug = brandSlug.split('-')[0]; // наприклад, "audi-a1" -> "audi"

      return (
        await CarBrand.findOne({
          where: { url: pureBrandSlug },
          attributes: ['id'],
        })
      ).id;
    } catch (err) {
      console.error('Помилка при пошуку бренду в базі:', err.message);
      return null;
    }
  };

  static extractLastPathSegment = (url) => {
    if (!url) return null;
    const segments = url.split('/').filter(Boolean);
    // передостанній елемент, бо останній — це зазвичай "1"
    return segments.length >= 2 ? segments[segments.length - 2] : null;
  };
}

module.exports = ParseCarModel;
