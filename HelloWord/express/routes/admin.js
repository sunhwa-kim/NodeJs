const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    res.send('admin 이후 url');
});


// view engine 출력 pacitce
router.get('/products', (req,res) => {
    // res.send('admin 이후 url');
    res.render( 'admin/products.html' ,    //  template 이후의 폴더로 적기
        {message : '<h1>hello</h1>'}  //  {{ message | safe}} safe 추가로 태그명 출력 없어지는
        // { message : "hello !!!!" } // message 란 변수를 템플릿으로 내보낸다.
    );
});

module.exports = router; // 보내주는