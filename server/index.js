require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./db.js');
const fileUpload = require('express-fileupload');
const path = require('path');
const router = require('./routes/index.js');
require('./models/models.js');
const errorMiddlawere = require('./middleWare/ErrorMiddleWare');
const ParseController = require('./Controllers/Parse.js');
const ParseCarBrands = require('./Controllers/ParseCarBrands.js');
const ParseCarModel = require('./Controllers/ParseCarModel.js');
const ParseDetailsInfo = require('./Controllers/ParseDetailsInfo.js');
const ParseSelectGoods = require('./Controllers/ParseSelectGoods.js');
//const Scheduler = require('.//ScheControllersduler.js');

const app = express(router);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(fileUpload({}));
app.use('/api', router);
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(errorMiddlawere);

const PORT = process.env.PORT || 4444;

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log('server started on port:' + PORT);
    });
  } catch (error) {
    console.log(error);
  }
};

//ParseController.AddAllProduct('/product/250902-12811469085/');
//ParseController.AddProduct('/product/260616-12767825293/');
//ParseCarBrands.parseAndSaveAllBrands();

//ParseCarModel.fetchCarModels('acura', '1**acura').then(console.log);
/*ParseCarModel.fetchBreadcrumbs(
  'https://restauto.com.ua/ua/product/250427-12767827161/',
  2074
);*/

//ParseCarModel.fetchBreadCrumbsAllProduct();

/*ParseDetailsInfo.getAllDetailInfo(
  'https://restauto.com.ua/ua/auto-catalog/bmw-2-f22/1/',
  'https://restauto.com.ua/ru/auto-catalog/bmw-2-f22/1/'
);*/

//ParseDetailsInfo.GetAllDetailInfoWithAllModel();
//ParseSelectGoods.ParseAllCod();

start();
