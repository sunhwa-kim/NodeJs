'use strict'

//http://expressjs.com/ko/starter/hello-world.html
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const user = require('./api/user'); // 알아서 해당 폴더 안 index.js 가져온다 
// const sh = require('./practice/beforemvc_index');

// const port = 3000;

/*
let users = [
  {   id:1,  name:'sunhwa'  },
  {   id:2,  name:'pitt'   },
  {   id:3,  name:'chris'   }
];
*/
if (process.env.NODE_ENV !== "test") {
    app.use(morgan('dev'));
}
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))  // true?
// parse application/json
app.use(bodyParser.json())

app.use('/users',user);  // users로 들어오는 모든 요청은 user폴더 담당 한다
// app.user('/users', sh);


// 라우팅
// express의 req,res ==  http의 req,res를 랩핑 한 것 (그대로 X)
app.get('/', (req, res) => {
  res.send('Hello World!')  // 문자열 출력 메서드
})
// => api/user/index.js 로 이동 (router 부분만)



// 서버 구동 : port와 완료시 실행되는 콜백함수가 parameter
// /api/bin/www.js 로 이동
// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })

module.exports = app;