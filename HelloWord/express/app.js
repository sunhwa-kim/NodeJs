const express = require('express');
const admin = require('./routes/admin');   //  admin 파일 추가
const nunjucks = require('nunjucks');   // view engine (html)
const logger = require('morgan');     //  미들웨어 - 로깅정보

const app = express();
const port = 3000;   // index.js에서 썼던것의 express 버전

nunjucks.configure('template', {   // 폴더명
    autoescape: true,   //  보안상
    express: app   //  express() 객체로
});

// 위 -> 아래 순차적 진행 ( 미들웨어, 다른 폴더 화면 등)
// 미들웨어 셋팅 : app.use()
app.use(logger('dev'));   // 터미널에 로깅 확인


app.get('/',(req,res) => {
    res.send('Hello Express');
});

/*
// 테스트용 admin.js의 testMiddleware1,2 와 연결성으로 순서 이해
function vipMiddleware(req,res, next){
    console.log('최우선 미들웨어 테스트');
    next();
}
app.use('/admin',vipMiddleware, admin);
*/

// Routing, 미들웨어 = app.use( 'url'은 파일명 참고해라~)
app.use('/admin', admin);

app.listen(port, () =>  {
    console.log('Express listening on port', port);
});