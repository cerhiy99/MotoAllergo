const ProductController = require('../Controllers/ProductController');

const router = require('express')();

router.get('/getFull/:id', ProductController.GetProduct);
router.get('/getListProduct', ProductController.GetListProduct);
router.get('/getBrands', ProductController.GetBrand);
router.get('/getModels', ProductController.getModel);
router.get('/getCategoryTypeDetail', ProductController.getCategoryTypeDetail);
router.get('/getTypeDetail', ProductController.getTypeDetail);

module.exports = router;
