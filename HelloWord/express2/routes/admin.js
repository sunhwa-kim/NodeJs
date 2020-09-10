const express = require('express');
const router = express.Router();

// view engine 출력
router.get('/',(req,res) => {
    res.send('admin 이후의 url 확인');
});

router.get('/products',(req,res) => {
    // res.send('admin/products');
    // res.render('admin/products.html');

    res.render('admin/products.html',{message:'분리 url에서 새 폴더 파일에 메세지 전달'});
});

module.exports = router;