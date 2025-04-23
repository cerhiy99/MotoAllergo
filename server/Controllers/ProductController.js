const ErrorApi = require('../error/ErrorApi');
const {
  Product,
  Imgs,
  CarBrand,
  CarModel,
  CategoryTypeDetail,
  ProductBrand,
  ProductModel,
  ProductTypeDetail,
} = require('../models/models');
const TypeDetail = require('../models/models').typeDetail;
const { Op, literal } = require('sequelize'); // переконайся, що імпортував literal

class ProductController {
  static GetProduct = async (req, resp, next) => {
    try {
      const { id } = req.params;
      const res = await Product.findOne({
        where: { id: parseInt(id) },
        include: [
          {
            model: Imgs,
          },
        ],
      });
      return resp.json({ product: res });
    } catch (err) {
      return next(ErrorApi.badRequest(err));
    }
  };

  static GetListProduct = async (req, resp, next) => {
    try {
      let {
        page = 1,
        limit = 10,
        brand,
        model,
        categories,
        typeDetail,
        sort,
        search,
      } = req.query;

      page = parseInt(page);
      limit = parseInt(limit);

      if (isNaN(page) || page < 1) page = 1;
      if (isNaN(limit) || limit < 1) limit = 10;

      const offset = (page - 1) * limit;

      const includes = [];

      // Сортування
      let order = [['id', 'DESC']]; // default: newest
      switch (sort) {
        case 'priceLowToHigh':
          order = [['price', 'ASC']];
          break;
        case 'priceHighToLow':
          order = [['price', 'DESC']];
          break;
        case 'popularity':
          order = [['id', 'ASC']];
          break;
        case 'newest':
        default:
          order = [['id', 'DESC']];
          break;
      }

      if (search && typeof search === 'string' && search.trim().length > 0) {
        // Очищаємо пошуковий запит і розбиваємо на окремі слова
        const trimmedSearch = search.trim();
        const searchWords = trimmedSearch.split(/\s+/); // Розбиваємо за пробілами

        // Створюємо масив умов для пошуку кожного слова окремо
        const searchConditions = searchWords.map((word) => {
          const escapedWord = word.replace(/[%_]/g, '\\$&'); // Escape символів для LIKE
          const searchPattern = `%${escapedWord}%`;

          return {
            [Op.or]: [
              { nameuk: { [Op.like]: searchPattern } }, // Пошук по назві українською
              { nameru: { [Op.like]: searchPattern } }, // Пошук по назві російською
            ],
          };
        });

        // Формуємо умови для пошуку в моделях, брендах та типах деталей
        const includesArray = [
          {
            model: ProductBrand,
            include: [
              {
                model: CarBrand,
                where: {
                  [Op.or]: searchWords.map((word) => ({
                    name: { [Op.like]: `%${word}%` }, // Пошук по полю 'name' таблиці CarBrand
                  })),
                },
                required: false, // Не фільтруємо результати без асоціацій
              },
            ],
            required: false, // Не фільтруємо результати без асоціацій
          },
          {
            model: ProductModel,
            include: [
              {
                model: CarModel,
                where: {
                  [Op.or]: searchWords.map((word) => ({
                    name: { [Op.like]: `%${word}%` }, // Пошук по полю 'name' таблиці CarModels
                  })),
                },
                required: false, // Не фільтруємо результати без асоціацій
              },
            ],
            required: false, // Не фільтруємо результати без асоціацій
          },
          {
            model: ProductTypeDetail,
            include: [
              {
                model: TypeDetail,
                where: {
                  [Op.or]: searchWords.map((word) => ({
                    nameuk: { [Op.like]: `%${word}%` }, // Пошук по назві типу деталі українською
                    nameru: { [Op.like]: `%${word}%` }, // Пошук по назві типу деталі російською
                  })),
                },
                required: false,
              },
            ],
            required: false,
          },
        ];

        // Пошуковий запит з фільтрацією та пагінацією
        const productList = await Product.findAndCountAll({
          where: {
            [Op.and]: [
              ...searchConditions, // Умови для пошуку по назві продукту
            ],
          },
          limit,
          offset,
          distinct: true, // Уникаємо дублювання результатів
          order,
          attributes: ['id', 'nameuk', 'nameru', 'price', 'priceUsd', 'cod'],
          include: [
            {
              model: Imgs,
            },
            ...includesArray, // Додаємо всі асоціації до запиту
          ],
        });

        // Пошук для обчислення загальної кількості товарів
        const productCount = await Product.count({
          where: {
            [Op.and]: [
              ...searchConditions, // Умови для пошуку по назві продукту
            ],
          },
        });

        // Повертаємо результат з пагінацією
        return resp.json({
          productList: productList.rows,
          count: productCount,
          currentPage: page,
          totalPages: Math.ceil(productCount / limit),
        });
      }

      if (brand) {
        brand = parseInt(brand);

        includes.push({
          model: ProductBrand,
          where: { CarBrandId: brand },
        });
      }
      if (model) {
        model = parseInt(model);
        includes.push({
          model: ProductModel,
          where: { carModelId: model },
        });
      }
      if (typeDetail) {
        typeDetail = parseInt(typeDetail);
        includes.push({
          model: ProductTypeDetail,
          where: { typeDetailId: TypeDetail },
        });
      }

      if (categories) {
        const listCategories = categories
          .split(',')
          .map((id) => parseInt(id))
          .filter(Boolean);
        includes.push({
          model: ProductTypeDetail,
          distinct: true,
          include: [
            {
              model: TypeDetail,
              distinct: true,
              where: {
                categoryTypeDelailId: {
                  [Op.in]: listCategories,
                },
              },
            },
          ],
        });
      }

      const productList = await Product.findAll({
        limit,
        offset,
        attributes: ['id', 'nameuk', 'nameru', 'price', 'priceUsd', 'cod'],
        include: [
          {
            model: Imgs,
          },
          ...includes,
        ],
        order,
      });

      const productCount = await Product.findAll({
        attributes: ['id', 'nameuk', 'nameru', 'price', 'priceUsd', 'cod'],
        include: [
          {
            model: Imgs,
          },
          ...includes,
        ],
        limit: 999999,
        offset: 0,
      });

      return resp.json({
        productList: productList,
        count: productCount.length,
        currentPage: page,
        totalPages: Math.ceil(productCount.length / limit),
      });
    } catch (err) {
      return next(ErrorApi.badRequest(err.message));
    }
  };

  static GetBrand = async (req, resp, next) => {
    try {
      const brands = await CarBrand.findAll();
      return resp.json({ brands });
    } catch (err) {
      return next(ErrorApi.badRequest(err));
    }
  };
  static getModel = async (req, resp, next) => {
    try {
      const CarBrandId = req.query.brandId;
      const models = await CarModel.findAll({ where: { CarBrandId } });
      return resp.json({ models });
    } catch (err) {
      return next(ErrorApi.badRequest(err));
    }
  };
  static getCategoryTypeDetail = async (req, resp, next) => {
    try {
      const { lang } = req.query;
      const categoryTypeDetail = await CategoryTypeDetail.findAll();
      const res = categoryTypeDetail.map((x) => ({
        id: x.id,
        name: x[`name${lang}`],
        img: x.img,
      }));
      return resp.json({ res: res });
    } catch (err) {
      return next(ErrorApi.badRequest(err));
    }
  };
  static getTypeDetail = async (req, resp, next) => {
    try {
      const { categoryTypeDelailId, lang } = req.query;
      const typedetail = await TypeDetail.findAll({
        where: { categoryTypeDelailId },
      });
      const res = typedetail.map((x) => ({ id: x.id, name: x[`name${lang}`] }));
      return resp.json({ res: res });
    } catch (err) {
      return next(ErrorApi.badRequest(err));
    }
  };
}

module.exports = ProductController;
