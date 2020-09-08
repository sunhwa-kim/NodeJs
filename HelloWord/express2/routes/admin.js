const express = require('express');
const router = express.Router();

// view engine 출력
router.get('/',(req,res) => {
    res.send('admin 이후의 url 확인');
});

router.get('/products',(req,res) => {
    // res.send('admin/products');
    res.sendFile('/products.html');
    // res.render('admin/products.html');
});

module.exports = router;