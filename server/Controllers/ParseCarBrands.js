const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { CarBrand } = require('../models/models'); // змінити на правильний шлях

class ParseCarBrands {
  static async fetchMainPageHtml() {
    const url = 'https://restauto.com.ua/ua/';
    const { data } = await axios.get(url);
    return data;
  }

  static extractBrandsFromHtml(html) {
    const $ = cheerio.load(html);
    const brands = [];

    $('.marks-box__box .mark-item').each((i, el) => {
      const name = $(el).find('.mark-item__title').text().trim();
      const imgTag = $(el).find('img');
      const imageSrc = imgTag.attr('src');

      if (name && imageSrc) {
        const brandUrl = name.toLowerCase(); // формуємо посилання, використовуючи назву бренду
        brands.push({ name, imageSrc, url: brandUrl });
      }
    });

    return brands;
  }

  static async downloadImage(imageSrc, name) {
    const baseUrl = 'https://restauto.com.ua';
    const imageUrl = baseUrl + imageSrc;
    const ext = path.extname(imageUrl).split('?')[0] || '.png';
    const fileName = uuidv4() + ext;
    const savePath = path.join(__dirname, '..', 'static', 'CarBrand', fileName);

    const writer = fs.createWriteStream(savePath);
    const response = await axios({
      url: imageUrl,
      method: 'GET',
      responseType: 'stream',
    });

    await new Promise((resolve, reject) => {
      response.data.pipe(writer);
      writer.on('finish', resolve);
      writer.on('error', reject);
    });

    return `CarBrand/${fileName}`;
  }

  static async saveToDatabase({ name, image, url }) {
    return CarBrand.create({ name, image, url });
  }

  static async parseAndSaveAllBrands() {
    try {
      const html = await this.fetchMainPageHtml();
      const brands = this.extractBrandsFromHtml(html);

      for (const brand of brands) {
        const imagePath = await this.downloadImage(brand.imageSrc, brand.name);
        await this.saveToDatabase({
          name: brand.name,
          image: imagePath,
          url: brand.url,
        });
        console.log(`Збережено бренд: ${brand.name}`);
      }

      console.log('Усі бренди успішно збережено');
    } catch (error) {
      console.error('Помилка при парсингу брендів:', error);
    }
  }
}

module.exports = ParseCarBrands;
