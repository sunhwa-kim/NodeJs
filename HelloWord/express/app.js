const express = require('express');
const admin = require('./routes/admin');   //  admin 파일 추가
const nunjucks = require('nunjucks');   // view engine (html)
const logger = require('morgan');     //  미들웨어 - 로깅정보
const bodyParser = require('body-parser');   //  express내 내장모듈이라 npm 받지 않고 바로 가져오기

const app = express();
const port = 3000;   // index.js에서 썼던것의 express 버전

// 1. view engine 셋팅
nunjucks.configure('template', {   // 폴더명
    autoescape: true,   //  보안상
    express: app   //  express() 객체로
});

// 위 -> 아래 순차적 진행 ( 미들웨어, 다른 폴더 화면 등)

// 2. 미들웨어 셋팅 : app.use()
app.use(logger('dev'));   // 터미널에 로깅 확인
app.use( bodyParser.json());    // body-parser 설정
app.use( bodyParser.urlencoded( { extended : false }));
  //  post 미들웨어 사용 예 - 라우팅 전 위치에 
  /*
app.use( (req,res,next) => {
    req.body = {

    }
});
*/



//  3. 정적 디렉토리
app.use( '/uploads',express.static('uploads'));

    // Global View Variable : 템플릿 변수 - 미들웨어 처리 후 라우팅 들어가게
app.use( (req, res, next) => {
    app.locals.isLogin = false;   //  isLogin 어디서든 사용 가능
    app.locals.req_path = req.path;   // req.path : express에서 현재 url 보내주는 변수
    next();
});


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



// 4. Routing
    //  미들웨어 = app.use( 'url'은 파일명 참고해라~)
app.use('/admin', admin);



// 4. 모든 라우팅 이후, error 처리
    // 404 페이지를 찾을 수 없음
app.use((req,res,_) => {  // next 부분 사용 안 하는 거 _ 처리 (req 등도 사용 안하면 _ ok)
    res.status(400).render('common/404.html');
})

    // 500
app.use( (err, req, res,  _ ) => {
    res.status(500).render('common/500.html')
});

app.listen(port, () =>  {
    console.log('Express listening on port', port);
});