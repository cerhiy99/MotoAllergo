const ErrorApi = require('../error/ErrorApi');
const {
  Product,
  Imgs,
  CarBrand,
  CarModel,
  CategoryTypeDetail,
  typeDetail,
} = require('../models/models');

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
      let { page = 1, limit = 10 } = req.query;
      page = parseInt(page);
      limit = parseInt(limit);

      if (isNaN(page) || page < 1) page = 1;
      if (isNaN(limit) || limit < 1) limit = 10;

      const offset = (page - 1) * limit;

      const productList = await Product.findAndCountAll({
        limit,
        distinct: true, // Ось це головне
        offset,
        attributes: ['id', 'nameuk', 'nameru', 'price', 'priceUsd'],
        include: [
          {
            model: Imgs,
          },
        ],
      });

      return resp.json({
        productList: productList.rows,
        count: productList.count,
        currentPage: page,
        totalPages: Math.ceil(productList.count / limit),
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
      console.log(lang);
      const categoryTypeDetail = await CategoryTypeDetail.findAll();
      const res = categoryTypeDetail.map((x) => ({
        id: x.id,
        name: x[`name${lang}`],
      }));
      return resp.json({ res: res });
    } catch (err) {
      return next(ErrorApi.badRequest(err));
    }
  };
  static getTypeDetail = async (req, resp, next) => {
    try {
      const { categoryTypeDelailId, lang } = req.query;
      const typedetail = await typeDetail.findAll({
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
