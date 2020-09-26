'use strict'

const http = require('http');
const express = require('express');
// const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
// 모듈화 시킨 index.js 연결 (./db/index.js 생략 가능) => F12 로 해당 구현체 이동
// 해당함수 rename해서 정의 = delete:deleteOne (delete는 deleteOne으로 한다)
const {find, insert, insertMany, delete: deleteOne, update} = require('./db');  
// require('express-async-errors');

class ApiServer extends http.Server {  // express
    constructor(config){
        const app = express();
        super(app);
        this.config = config;
        this.app = app;
    }

    // CRUD this.app  +  .post() / .get() / .put()  / .delete()
    async start() {
        // middleware app.use()
        this.app.use(bodyParser.urlencoded({extended : false}));

        // class로 접근하기 때문에 this.app이 가능
        // this.app.use() // middleware
        // this.app.get('/:item', (req,res) => {

        // ~/:data + ? : optional (두번째 parameter 가 선택적 정의되도록)
        this.app.get('/:collection/:data?', async (req,res) => {
            const { collection, data } = req.params
            const { c } = req.query; // null 이어도 find에서 초기화 돼서 넘어오기 때문에 alright

            // const result = await find(null, collection) //(조건이 없을때 null, 조건이 있는 경우 collection에 대한 특정 data 찾으니까)
            // => 특정 조건이 있는 경우 url상 query string을 아래처럼 담아 : c (condition 조건)
            const result = await find( c , collection)   
            res.send(result)     
            // res.send('welcome');
        })

        this.app.post('/:collection/:data?', async (req,res) => {
            const { collection } = req.params;
            const { newdata } = req.body;   // parsing client's data 
            const result = await insert(newdata);
            res.send(result);
        })

        this.app.put('/:collection/:id?', async (req,res) => {
            const { collection, id } = req.params
            const { newdata } = req.body
            const result = await update(id, newdata ,collection );
            res.send(result)
        })
        this.app.delete('/:collection/:id?', async (req,res) => {
            const { collection } = req.params
            // 1. endpoint 방식은 /:id를 받아 아래 방식
            // 2. endpoint 가 아닌 특정한 데이터를 조건으로 받으면 (db.js-delete 가 json으로 했듯이)
            // const { condition } = req.body;
            const result = await deleteOne( id , collection );
            res.send(result)
        })
        return this
    }
}


// 모듈화 : 외부에서 사용할 수 있도록
module.exports = ApiServer;

// async await 비동기 코드이기 때문에 server의 생성도 비동기
async function createServer (config) {   // config : 환경설정
    const server = new ApiServer(config);
    return server.start()
}

// main 파일로 createServer활용 위해 모듈화
exports.createServer = createServer;