'use strict'
// user's api routing setting

const express = require('express');
const router = express.Router();  // Router 클래스로 router 객체 만든
const ctrl = require('./user.ctrl') 
// 변경 이력
//  1.
// 이제 app.get() -> router.get() 으로 변경
// /user url은 첫 index.js에서 미리 경로 설정 해놨기 때문에 별도 설정 내역 제거
//  2.
//  api 로직부분 = 함수 부분은 user.ctrl.js로 이동
//  ctrl로 user.ctrl.js받아와서 각 함수명을 바인딩 ex ctrl.index

// 라우팅
// express의 req,res ==  http의 req,res를 랩핑 한 것 (그대로 X)
  
  // /users -> / 로 변경
  router.get('/', ctrl.index);  // users 라우팅에 대한 ctrl 함수 바인딩 
  
  router.get('/:id',ctrl.show);
  
  
  router.delete('/:id',ctrl.destroy);
  
  // post는 body 이용, But express 는 body 제공 안함
  //  expressjs APIref 보면 body-parser, multer(이미지 같은 큰 데이터에 사용)
  router.post('/',ctrl.create);
  
  router.put('/:id',ctrl.update)
  

  // root에서 가져다 쓸 수 있게 하기 위해
  module.exports = router;