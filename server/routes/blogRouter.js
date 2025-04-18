const BlogController = require('../Controllers/BlogController');
const IsAdminMiddleWare = require('../middleWare/IsAdminMiddleWare');

const router = require('express')();

router.post('/add', IsAdminMiddleWare, BlogController.Add);
router.get('/getList', BlogController.GetList);
router.get('/getSelect', BlogController.GetSelect);
router.put(
  '/updateWithoutImg',
  IsAdminMiddleWare,
  BlogController.UpdateWithoutImg
);
router.put('/updateImg', IsAdminMiddleWare, BlogController.UpdateBlogImgs);

module.exports = router;
