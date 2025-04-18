const { Sequelize } = require('sequelize');

module.exports = new Sequelize(
  'moto',
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: 'mysql',
    host: process.env.HOST || 'localhost',
  }
);
