const express = require('express');
const router = express.Router();

// router.get('/', (req,res) => {
//     res.send('admin 이후 url');
// });

function testMiddleWare( req, res, next ){   // 인자 3개
    console.log('첫번째 미들웨어');   // 터미널에 뜨는 정보
    next();   // 제어권 넘긴다
}

function testMiddleWare2( req, res, next ){
    console.log('두번째 미들웨어');
    next();
}
router.get('/', testMiddleWare, testMiddleWare2 , (req,res) => {  // /admin 페이지
    res.send('admin url 이후 -  미들웨어 테스트( morgan - 로깅정보 ) - next()로 제어권 넘겨받은 이후 ');	    // 화면
});
/*
//  미들웨어 실제 사용 예시
function loginRequired(req,res,next) {
    if ('로그인 되어 있지 않으면'){
        res.redirect('로그인 창');
    } else {
        next();
    }
}
//  loginRequired 을 분기점으로 로그인 창 또는 요청 창으로 이동하게
router.get('/',loginRequired, (req,res) => {
    res.send('admin 이후 url');
});
*/


// view engine 출력 pacitce
router.get('/products', (req,res) => {
    // res.send('admin 이후 url');
    res.render( 'admin/products.html' ,    //  template 이후의 폴더로 적기
        {message : '<h1>hello</h1>'}  //  {{ message | safe}} safe 추가로 태그명 출력 없어지는
        // { message : "hello !!!!" } // message 란 변수를 템플릿으로 내보낸다.
    );
});

module.exports = router; // 보내주는