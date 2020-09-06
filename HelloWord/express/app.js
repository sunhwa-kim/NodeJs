const express = require('express');
const admin = require('./routes/admin');   //  admin 파일 추가
const nunjucks = require('nunjucks');   // view engine (html)

const app = express();
const port = 3000;   // index.js에서 썼던것의 express 버전

nunjucks.configure('template', {   // 폴더명
    autoescape: true,   //  보안상
    express: app   //  express() 객체로
});


app.get('/',(req,res) => {
    res.send('Hello Express');
});

// Routing, 미들웨어 = app.use( 'url'은 파일명 참고해라~)
app.use('/admin', admin);

app.listen(port, () =>  {
    console.log('Express listening on port', port);
});