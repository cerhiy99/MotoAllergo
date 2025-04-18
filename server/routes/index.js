const router = require('express')();

const productRouter = require('./productRouter');
const blogRouter = require('./blogRouter');

router.use('/product', productRouter);
router.use('/blog', blogRouter);

module.exports = router;
