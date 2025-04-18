const axios = require('axios');
const cheerio = require('cheerio');
const { ProductLink, Product, Imgs } = require('../models/models');
const ParseSelectGoods = require('./ParseSelectGoods');
const ErrorApi = require('../error/ErrorApi');

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

class ParseController {
  static async fetchHtml(url) {
    try {
      const { data: html } = await axios.get(url);
      return html;
    } catch (err) {
      console.error('Помилка при завантаженні сторінки:', err);
      return null;
    }
  }

  static extractProductLinks(html) {
    const $ = cheerio.load(html);
    const productLinks = [];

    $('.card-box.js-append-items.card-box--catalog a.card').each(
      (_, element) => {
        const link = $(element).attr('href');
        if (link && link.includes('/ru/product/')) {
          productLinks.push(link);
        }
      }
    );

    return productLinks;
  }

  static isLastPage = async (url) => {
    try {
      const response = await axios.get(url, {
        maxRedirects: 0, // Забороняємо автоматичний редірект
        validateStatus: (status) => true, // Приймаємо всі статуси
      });

      // Якщо отримали статус 301/302 (редірект) і є заголовок "location"
      if ([301, 302].includes(response.status) && response.headers.location) {
        return response.headers.location.endsWith('/1/'); // Перевіряємо чи редірект на першу сторінку
      }

      return false; // Інакше сторінка існує
    } catch (err) {
      console.error('Помилка при перевірці останньої сторінки:', err);
      return true; // Якщо сталася помилка, вважаємо, що сторінки немає
    }
  };

  static async getAllProductLinks() {
    try {
      let page = 1;
      let newLinksCount = 0; // Лічильник нових записів
      let productLinks = []; // Масив для всіх посилань
      let baseUrl = 'https://restauto.com.ua/ru/auto-catalog/'; // Базовий URL (незалежно від мови)

      while (true) {
        const url = `${baseUrl}${page}/`;

        if ((await ParseController.isLastPage(url)) && page != 1) {
          console.log('Досягнуто останньої сторінки.');
          break;
        }

        console.log(`Обробляється сторінка ${page}`);
        const html = await ParseController.fetchHtml(url);
        if (!html) break;

        const links = ParseController.extractProductLinks(html);
        productLinks = productLinks.concat(links); // Додаємо знайдені посилання в масив

        // Перевірка на нові посилання в базі даних
        for (let link of links) {
          // Обрізаємо посилання до формату /product/{id}-{slug}/
          const trimmedLink = link.match(/(\/product\/[a-z0-9\-]+\/)/);
          if (trimmedLink) {
            const finalLink = trimmedLink[0]; // Отримуємо обрізане посилання

            const [product, created] = await ProductLink.findOrCreate({
              where: { link: finalLink },
            });

            if (created) {
              newLinksCount++; // Збільшуємо лічильник нових записів
              console.log(`Додано новий товар: ${finalLink}`);
            }
          }
        }

        page++;
      }

      console.log(`Загалом додано нових посилань: ${newLinksCount}`);
    } catch (err) {
      console.error('Помилка при отриманні всіх сторінок:', err);
    }
  }

  static AddAllProduct = async () => {
    try {
      const urls = await ProductLink.findAll({
        attributes: ['link'],
        where: { isNew: null },
      });

      for (const [idx, x] of urls.entries()) {
        console.log(`Обробка №${idx + 1} url: ${x.link}`);
        await this.AddProduct(x.link); // чекаємо на завершення кожного запиту
        await delay(2500);
      }
    } catch (err) {
      console.log(err);
    }
  };

  static async AddProduct(url) {
    try {
      const baseUrl = 'https://restauto.com.ua';

      // Завантажуємо HTML для української та російської версії сторінки товару
      const [ukraineHtml, russiaHtml] = await Promise.all([
        ParseSelectGoods.fetchPageHtml(`${baseUrl}/ua${url}`),
        ParseSelectGoods.fetchPageHtml(`${baseUrl}/ru${url}`),
      ]);

      const nameUa = ParseSelectGoods.extractProductNameFromHtml(ukraineHtml);
      // Перевіряємо, чи товар Б/В (якщо назва починається з "Б/В")
      const isUsed = nameUa && nameUa.includes('Б/В');

      // Оновлюємо isNew у ProductLink, якщо запис існує
      const productLink = await ProductLink.findOne({ where: { link: url } });
      if (productLink) {
        await productLink.update({ isNew: !isUsed });
      }
      if (isUsed) {
        //якщо товар бв то не потрібно його записувати у базу
        return;
      }

      // Парсимо HTML верстку для обох мов
      const ukraineImages = ParseSelectGoods.extractImagesFromHtml(ukraineHtml);
      const price = ParseSelectGoods.extractProductPriceFromHtml(ukraineHtml);
      const priceUsd =
        ParseSelectGoods.extractProductPriceUsdFromHtml(ukraineHtml);
      const featuresUa =
        ParseSelectGoods.extractProductFeaturesFromHtml(ukraineHtml);
      const descriptionUa =
        ParseSelectGoods.extractDescriptionFromHtml(ukraineHtml);

      const nameRu = ParseSelectGoods.extractProductNameFromHtml(russiaHtml);
      const featuresRu =
        ParseSelectGoods.extractProductFeaturesFromHtml(russiaHtml);
      const descriptionRu =
        ParseSelectGoods.extractDescriptionFromHtml(russiaHtml);

      // Видаляємо дублікати перед збереженням
      const uniqueImages = [...new Set(ukraineImages)];

      // Зберігаємо тільки унікальні зображення
      const savedImages = (
        await Promise.all(uniqueImages.map(ParseSelectGoods.saveImage))
      ).filter((img) => img !== null); // Видаляємо null, якщо якесь фото не збереглося

      if (!nameUa) {
        console.log(`назва=null в: ${url}`);
        return;
      }

      // Додаємо продукт у базу
      const product = await Product.create({
        nameuk: nameUa,
        nameru: nameRu,
        price: parseFloat(price),
        priceUsd: parseFloat(priceUsd),
        featuresuk: featuresUa,
        featuresru: featuresRu,
        descriptionuk: descriptionUa,
        descriptionru: descriptionRu,
        productLinkId: productLink.id,
      });

      // Додаємо зображення у базу
      await Promise.all(
        savedImages.map((src) => Imgs.create({ src, productId: product.id }))
      );

      console.log(`Продукт успішно збережено: ${nameUa}`);
    } catch (err) {
      console.error('Помилка при обробці товару:', url, err);
    }
  }
}

module.exports = ParseController;
