const express = require('express');
//const admin = require('./routes/admin');   //  admin 파일 추가
const nunjucks = require('nunjucks');   // view engine (html)
const logger = require('morgan');     //  미들웨어 - 로깅정보
const bodyParser = require('body-parser');   //  express내 내장모듈이라 npm 받지 않고 바로 가져오기

// const app = express();
// const port = 3000;   // index.js에서 썼던것의 express 버전

class App {

    constructor () {
        this.app = express();
        
        // 뷰엔진 셋팅
        this.setViewEngine();

        // 미들웨어 셋팅
        this.setMiddleWare();

        // 정적 디렉토리 추가
        this.setStatic();

        // 로컬 변수
        this.setLocals();

        // 라우팅
        this.getRouting();

        // 404 페이지를 찾을수가 없음
        this.status404();

        // 에러처리
        this.errorHandler();


    }


    setMiddleWare (){
        
        // 미들웨어 셋팅
        this.app.use(logger('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));

    }

    setViewEngine (){

        nunjucks.configure('template', {
            autoescape: true,
            express: this.app
        });

    }


    setStatic (){
        this.app.use('/uploads', express.static('uploads'));
    }

    setLocals(){

        // 템플릿 변수
        this.app.use( (req, res, next) => {
            this.app.locals.isLogin = true;
            this.app.locals.req_path = req.path;
            next();
        });

    }

    getRouting (){
        this.app.use(require('./controllers'))
    }

    status404() {        
        this.app.use( ( req , res, _ ) => {
            res.status(404).render('common/404.html')
        });
    }

    errorHandler() {

        this.app.use( (err, req, res,  _ ) => {
            console.log(err);  // 에러 정보 알려줌 
            res.status(500).render('common/500.html')
        });
    
    }

}

module.exports = new App().app;

// 4. Routing
    //  미들웨어 = app.use( 'url'은 파일명 참고해라~)
//app.use('/admin', admin);

// app.listen(port, () =>  {
//     console.log('Express listening on port', port);
// });