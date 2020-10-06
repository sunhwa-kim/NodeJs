'use strict'


// 요청 :  curl -X GET "localhost:3000"
const express = require('express');
const morgan = require('morgan');

const app = express();

const logger = (req,res, next) => {
    console.log('Im logger');
    next();
}

const logger2 = (req,res,next) =>{
    console.log('Im logger 2');
    next();
}

// 일반 미들웨어 vs 에러 미들웨어
const commonMW = (req,res, next) => {  // 미들웨어 parameter 3개
    console.log('일반 미들 웨어');
    next(new Error('error occured')); // 이 객체를 아래 err parameter가 받아
}

const errorMW = (err,req,res,next) => { // parameter 4개
    console.log(err.message);  // 'error occured'
    // 에러 처리 가정 
    next();
} 

// 로깅 미들웨어 만들어 사용하기
app.use(logger);
app.use(logger2);
// 써드파티 미들웨서 설치해서 로깅 이용하기
app.use(morgan('dev'));

app.use(commonMW);
app.use(errorMW);

app.listen(3000, () => {
    console.log('Server is running');
})