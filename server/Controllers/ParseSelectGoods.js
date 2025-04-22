const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const $browser = require('./utils/http');
const { Product, ProductLink } = require('../models/models');
const { Op } = require('sequelize');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

class ParseSelectGoods {
  // Метод для збереження картинок
  static async saveImage(imageUrl) {
    try {
      // Робимо запит на отримання зображення
      const response = await axios({
        method: 'get',
        url: imageUrl,
        responseType: 'arraybuffer', // Отримуємо бінарні дані
      });

      // Генеруємо унікальне ім'я для файлу
      const imageName = `${uuidv4()}.jpg`;
      const staticDir = path.resolve(__dirname, '../static');

      // Створюємо папку, якщо її ще немає
      if (!fs.existsSync(staticDir)) {
        fs.mkdirSync(staticDir, { recursive: true });
      }

      const filePath = path.join(staticDir, imageName);
      fs.writeFileSync(filePath, response.data);
      return imageName; // Повертаємо ім'я збереженого файлу
    } catch (error) {
      console.error('Помилка при збереженні фото:', error);
      return null;
    }
  }

  // Метод для отримання посилань на зображення з HTML
  static extractImagesFromHtml(html) {
    try {
      // Завантажуємо HTML в cheerio
      const $ = cheerio.load(html);

      // Отримуємо всі посилання на зображення
      const images = [];
      $('.slick-list.draggable a[data-fancybox="gallery"]').each(
        (index, element) => {
          const href = $(element).attr('href');
          if (href && href.startsWith('http')) {
            images.push(href);
          }
        }
      );

      return images;
    } catch (err) {
      console.error('Помилка при обробці HTML для зображень:', err);
      return [];
    }
  }

  // Метод для отримання назви товару з HTML
  static extractProductNameFromHtml(html) {
    try {
      // Завантажуємо HTML в cheerio
      const $ = cheerio.load(html);

      // Отримуємо текст з h1.name-product__title
      const productName = $('h1.name-product__title').text().trim();

      return productName || null;
    } catch (error) {
      console.error('Помилка при отриманні назви товару з HTML:', error);
      return null;
    }
  }

  // Метод для отримання ціни товару з HTML
  static extractProductPriceFromHtml(html) {
    try {
      // Завантажуємо HTML в cheerio
      const $ = cheerio.load(html);

      // Отримуємо ціну, що знаходиться в span всередині div.price--ua
      const price = $('.price--ua .price__sum')
        .first() // Беремо перший елемент, якщо їх кілька
        .text() // Отримуємо текст з цього span
        .trim() // Обрізаємо зайві пробіли
        .replace(/\s+/g, ''); // Видаляємо зайві пробіли між цифрами

      return price || null; // Повертаємо ціну або null, якщо її немає
    } catch (error) {
      console.error('Помилка при отриманні ціни товару з HTML:', error);
      return null;
    }
  }

  // Метод для отримання ціни в доларах з HTML
  static extractProductPriceUsdFromHtml(html) {
    try {
      // Завантажуємо HTML в cheerio
      const $ = cheerio.load(html);

      // Отримуємо ціну в доларах
      const priceUsd = $('.price--usd .price__sum')
        .text()
        .trim()
        .replace(/\s+/g, '');

      return priceUsd || null;
    } catch (error) {
      console.error('Помилка при отриманні ціни в доларах з HTML:', error);
      return null;
    }
  }

  // Метод для отримання таблиці характеристик з HTML
  static extractProductFeaturesFromHtml(html) {
    try {
      // Завантажуємо HTML в cheerio
      const $ = cheerio.load(html);

      // Отримуємо таблицю характеристик
      const table = $('.feature--info table');
      if (table.length === 0) return ''; // Якщо таблиця не знайдена, повертаємо порожній рядок

      // Повертаємо HTML код таблиці
      return table.toString();
    } catch (error) {
      console.error('Помилка при отриманні характеристик з HTML:', error);
      return ''; // Повертаємо порожній рядок у разі помилки
    }
  }

  // Метод для отримання верстки section з класом description
  static extractDescriptionFromHtml(html) {
    try {
      // Завантажуємо HTML в cheerio
      const $ = cheerio.load(html);

      // Знаходимо секцію з класом 'description'
      const descriptionSection = $('section.description');

      // Перевіряємо, чи містить секція span з відповідним текстом
      const hasOriginalDescription = descriptionSection
        .find('span')
        .toArray()
        .some((el) => {
          const text = $(el).text().trim();
          return (
            text === 'Оригінальний опис' || text === 'Оригинальное описание'
          );
        });

      // Якщо відповідного span немає, повертаємо порожній рядок
      if (!hasOriginalDescription) return '';

      // Видаляємо div з класом description__slogan
      descriptionSection.find('div.description__slogan').remove();

      // Повертаємо всю верстку секції
      return descriptionSection.html() || '';
    } catch (error) {
      console.error('Помилка при отриманні верстки з HTML:', error);
      return '';
    }
  }

  // Метод для завантаження HTML сторінки за допомогою Puppeteer або іншого інструменту
  static async fetchPageHtml(url) {
    // Логіка для завантаження HTML-верстки сторінки
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const html = await page.content();
    await browser.close();
    return html;
  }

  static parseCod = async (url) => {
    try {
      await sleep(2000); // Затримка для обережного парсингу
      const res = await $browser.get(url);
      const $ = cheerio.load(res.data);

      // Спроба 1: атрибут data-url
      const codAttr = $('.name-product__article').attr('data-url');

      // Спроба 2: з тексту span
      const codText = $('.name-product__article .name-product__number')
        .text()
        .trim();

      console.log(codAttr, codText);

      const finalCod = codAttr || codText || null;

      if (!finalCod || finalCod === '') return null;

      return finalCod;
    } catch (err) {
      console.error('❌ Помилка при парсингу коду товару:', url, err.message);
      return null;
    }
  };

  static ParseAllCod = async () => {
    try {
      const products = await Product.findAll({
        attributes: ['id', 'productLinkId'],
        include: [{ model: ProductLink }],
        where: {
          cod: {
            [Op.is]: null, // Це означає "NULL"
          },
        },
      });
      for (let i = 0; i < 2; i++) {
        console.log(4234324, products[i].product_link.link);
        const cod = await this.parseCod(
          `https://restauto.com.ua/ua${products[i].product_link.link}`
        );
        console.log(3434, cod);
      }
    } catch (err) {
      console.log('❌ Помилка при парсингу коду всіх товарів');
    }
  };
}

module.exports = ParseSelectGoods;
