const { DataTypes } = require('sequelize'); // Імпортуємо DataTypes
const sequelize = require('../db'); // Імпортуємо ваш екземпляр sequelize

const ProductLink = sequelize.define('product_link', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  link: { type: DataTypes.STRING, allowNull: false, unique: true },
  isNew: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: null },
});

const Product = sequelize.define('product', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nameuk: { type: DataTypes.STRING, allowNull: false },
  nameru: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  priceUsd: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
  featuresuk: { type: DataTypes.TEXT, allowNull: false },
  featuresru: { type: DataTypes.TEXT, allowNull: false },
  descriptionuk: { type: DataTypes.TEXT, allowNull: false, defaultValue: '' },
  descriptionru: { type: DataTypes.TEXT, allowNull: false, defaultValue: '' },
});

const Imgs = sequelize.define('img', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  src: { type: DataTypes.STRING, allowNull: false },
});

ProductLink.hasMany(Product, { onDelete: 'CASCADE' });
Product.belongsTo(ProductLink);

Product.hasMany(Imgs, { onDelete: 'CASCADE' });
Imgs.belongsTo(Product);

const CarBrand = sequelize.define('CarBrand', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const CarModel = sequelize.define('carModel', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false }, //text
  url: { type: DataTypes.STRING, allowNull: false }, //id
  years: { type: DataTypes.STRING, defaultValue: '' }, //years
});

CarBrand.hasMany(CarModel);
CarModel.belongsTo(CarBrand);

const CategoryTypeDetail = sequelize.define('categoryTypeDelail', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  url: { type: DataTypes.STRING, allowNull: false, unique: true },
  nameuk: { type: DataTypes.STRING, allowNull: false },
  nameru: { type: DataTypes.STRING, allowNull: false },
});

const typeDetail = sequelize.define('typeDetail', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  url: { type: DataTypes.STRING, allowNull: false, unique: true },
  nameuk: { type: DataTypes.STRING, allowNull: false },
  nameru: { type: DataTypes.STRING, allowNull: false },
});

CategoryTypeDetail.hasMany(typeDetail);
typeDetail.belongsTo(CategoryTypeDetail);

const ProductBrand = sequelize.define('ProductBrand', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

Product.hasMany(ProductBrand);
ProductBrand.belongsTo(Product);

CarBrand.hasMany(ProductBrand);
ProductBrand.belongsTo(CarBrand);

const ProductModel = sequelize.define('productModel', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

Product.hasMany(ProductModel);
ProductModel.belongsTo(Product);

CarModel.hasMany(ProductModel);
ProductModel.belongsTo(CarModel);

const ProductCategoryTypeDelail = sequelize.define(
  'productCategoryTypeDelail',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  }
);

Product.hasMany(ProductCategoryTypeDelail);
ProductCategoryTypeDelail.belongsTo(Product);

CategoryTypeDetail.hasMany(ProductCategoryTypeDelail);
ProductCategoryTypeDelail.belongsTo(CategoryTypeDetail);

const ProductTypeDetail = sequelize.define('productTypeDetail', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

Product.hasMany(ProductTypeDetail);
ProductTypeDetail.belongsTo(Product);

typeDetail.hasMany(ProductTypeDetail);
ProductTypeDetail.belongsTo(typeDetail);

const Blog = sequelize.define('blog', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nameuk: { type: DataTypes.STRING, allowNull: false },
  nameru: { type: DataTypes.STRING, allowNull: false },
  descriptionuk: { type: DataTypes.TEXT, allowNull: false },
  descriptionru: { type: DataTypes.TEXT, allowNull: false },
});

const BlogImg = sequelize.define('blogImg', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  src: { type: DataTypes.STRING, allowNull: false },
});

Blog.hasMany(BlogImg);
BlogImg.belongsTo(Blog);

module.exports = {
  ProductLink,
  Product,
  Imgs,
  CarBrand,
  CarModel,
  Blog,
  BlogImg,
  CategoryTypeDetail,
  typeDetail,
  ProductBrand,
  ProductModel,
  ProductTypeDetail,
  ProductCategoryTypeDelail,
};
