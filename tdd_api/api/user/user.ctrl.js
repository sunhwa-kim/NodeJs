'use strict'
// api logic

// DB대체인 users 객체는 여기서 쓸거니까 여기로 옯긴다. - DB 연동 하면서 배열 삭제
const models = require('../../models');

// let length = users.length  // delete 후 post시 unique한 id위해 temporary 

const index = (req,res) => {
    // 성공-배열 타입 확인 요청에 대한 limit 처리 추가
      // req.query.limit는 문자열로 반환됨
    req.query.limit = req.query.limit || 10;
  
    // const limit = Number(req.query.limit);  // 숫자변환으로는 안되넹
    const limit = parseInt(req.query.limit,10); // 10진수로 바꾼다
    if(Number.isNaN(limit)){
      return res.status(400).end();  // default 200
    }

    // db 연동
    models.User
      .findAll({
        limit
      })
      .then(users => {
        res.json(users);
      })

    // res.json(users.slice(0,limit));  // send() 문자열
  }

const show = (req,res)=>{
    const id = parseInt(req.params.id,10);
    if(Number.isNaN(id)) return res.status(400).end();

    // const user = users.filter((user) => user.id === id )[0];
    models.User.findOne({
      where: {id}
    }).then(user => {
      if(!user) return res.status(400).end();
      res.json(user);
    });

};

const destroy = (req,res) => {
    const id = parseInt(req.params.id,10);
    if(Number.isNaN(id)) return res.status(400).end();
    // users = users.filter(user => user.id !== id);
    models.User.destroy( {where:{id}})
      .then( () => {
        res.status(204).end();
      })
};

const create = (req,res) => {
    const name = req.body.name;
    if(!name) return res.status(400).end();
    // DB연동-중복은 models.js로
    // const isRepeated = users.find(user => user.name === name);
    // const isRepeated = users.filter(user => user.name === name).length;   // falthy : false,0,undefined,''
    // if(isRepeated) return res.status(409).end();
    // const id = Date.now(); // 현재시간
    // const id = length+1;
    // const user = {id,name};
    // users.push(user);

    models.User.create({name})
      .then(user => {
        res.status(201).json(user);
      })
      .catch( err => {
        // console.log(err);
        if (err.name === 'SequelizeUniqueConstraintError') {
          return res.status(409).end();
        }
        res.status(500).end();
      })

  };

const update = (req,res) => {
    const id = parseInt(req.params.id,10);
    if(Number.isNaN(id)) return res.status(400).end();
    
    const name = req.body.name;
    if(!name) return res.status(400).end();
    
    // const user = users.filter(user => user.id === id )[0];  // [ { id: 3, name: 'chris' } ]
    // if(!user) return res.status(404).end();
    // if(user.name === name) return res.status(409).end();
    // user.name = name
    /*
    const resUser = {id};
    users.forEach( (user) => {
      if(user.id===id) {
        user.name = name;
        resUser.name = name;
      }
    });
    */

    models.User.findOne({where:{id}})
      .then( user => {
        if (!user) return res.status(404).end();

        user.name = name;
        user.save()
            .then(_=> {
              res.json(user);
            })
            .catch(err => {
              // console.log(err);
              if (err.name === 'SequelizeUniqueConstraintError') {
                return res.status(409).end();
              }
              res.status(500).end();

            })
      })

  
  
    // const user = users.filter(user => user.id === id)[0];
  }

//   위 index를 가져다 쓸 수 있게 보내면 -> api/user/index.js에서 require() 로 받아
  module.exports = { index, show, destroy, create, update }