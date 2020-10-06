'use strict'


//http://expressjs.com/ko/starter/hello-world.html
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
// const user = require('./api/user'); // 알아서 해당 폴더 안 index.js 가져온다 

const port = 3000;


let users = [
  {   id:1,  name:'sunhwa'  },
  {   id:2,  name:'pitt'   },
  {   id:3,  name:'chris'   }
];


app.use(morgan('dev'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))  // true?
// parse application/json
app.use(bodyParser.json())

// app.use('/users',user);  // users로 들어오는 모든 요청은 user폴더 담당 한다


// 라우팅
// express의 req,res ==  http의 req,res를 랩핑 한 것 (그대로 X)

// => api/user/index.js 로 이동 (router 부분만)

// 라우팅
// express의 req,res ==  http의 req,res를 랩핑 한 것 (그대로 X)
app.get('/', (req, res) => {
    res.send('Hello World!')  // 문자열 출력 메서드
  })
  
  let length = users.length  // delete 후 post시 unique한 id위해 temporary 
  
  
  app.get('/users', (req,res) => {
    // 성공-배열 타입 확인 요청에 대한 limit 처리 추가
      // req.query.limit는 문자열로 반환됨
    req.query.limit = req.query.limit || 10;
  
    // const limit = Number(req.query.limit);  // 숫자변환으로는 안되넹
    const limit = parseInt(req.query.limit,10); // 10진수로 바꾼다
    if(Number.isNaN(limit)){
      return res.status(400).end();  // default 200
    }
    res.json(users.slice(0,limit));  // send() 문자열
  })
  
  app.get('/users/:id',(req,res)=>{
    const id = parseInt(req.params.id,10);
    if(Number.isNaN(id)) return res.status(400).end();
  
    const user = users.filter((user) => user.id === id )[0];
    if(!user) return res.status(400).end();
  
    res.json(user);
  });
  
  
  app.delete('/users/:id',(req,res) => {
    const id = parseInt(req.params.id,10);
    if(Number.isNaN(id)) return res.status(400).end();
    users = users.filter(user => user.id !== id);
    res.status(204).end();
  })
  
  // post는 body 이용, But express 는 body 제공 안함
  //  expressjs APIref 보면 body-parser, multer(이미지 같은 큰 데이터에 사용)
  app.post('/users',(req,res) => {
    const name = req.body.name;
    if(!name) return res.status(400).end();
    const isRepeated = users.find(user => user.name === name);
    // const isRepeated = users.filter(user => user.name === name).length;   // falthy : false,0,undefined,''
    if(isRepeated) return res.status(409).end();
    // const id = Date.now(); // 현재시간
    const id = length+1;
    const user = {id,name};
    users.push(user);
    res.status(201).json(user);
  })
  
  app.put('/users/:id',(req,res) => {
    const id = parseInt(req.params.id,10);
    if(Number.isNaN(id)) return res.status(400).end();
    
    const name = req.body.name;
    if(!name) return res.status(400).end();
    
    const user = users.filter(user => user.id === id )[0];  // [ { id: 3, name: 'chris' } ]
    if(!user) return res.status(404).end();
    if(user.name === name) return res.status(409).end();
    user.name = name
    /*
    const resUser = {id};
    users.forEach( (user) => {
      if(user.id===id) {
        user.name = name;
        resUser.name = name;
      }
    });
    */
    res.json(user);
  
  
    // const user = users.filter(user => user.id === id)[0];
  })
  



// port와 완료시 실행되는 콜백함수가 parameter
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = app;