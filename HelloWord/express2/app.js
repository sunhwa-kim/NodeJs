const express = require('express');
const nunjucks = require('nunjucks')
const logger = require('morgan')

const admin = require('./routes/admin');  // 분리 url을 폴더로, 불러오기

const app = express();
const port = 3000;
//In node, 'views' would be a path relative to the current working directory. 
//In the browser, it would be a relative URL, and you probably want it to be absolute, like '/views'.

//Using express? Simply pass your express app into configure:
// 'views' -> 'template 
nunjucks.configure('template', {
    autoescape: true,
    express: app   //  express 받은 객체
});

// 1. 미들웨어
app.use(logger('div'));  // 터미널 로그 정보


app.get('/',(req,res) => {
    res.send("Hello World");
});

// url 분리 : 폴더 별 정리
app.use('/admin',admin);


app.listen(port, () => {
    console.log('express listening on port', port);
});