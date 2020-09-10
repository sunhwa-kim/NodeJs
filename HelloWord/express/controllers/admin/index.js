const { Router } = require('express');
const router = Router();
const ctrl = require('./admin.ctrl');
// index.js는 url과 미들웨어만
// 각 get_products 부분은 admin.ctrl.js(라우팅)에서 처리
router.get('/products', ctrl.get_products );  

router.get('/products/write', ctrl.get_products_write );

router.post('/products/write', ctrl.post_products_write );

module.exports = router;