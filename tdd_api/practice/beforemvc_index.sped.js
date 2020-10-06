'use strict'

const request = require('supertest');  // test
const should = require('should');  // 검증

// 보통 내가 만든건 아래로 가는 순서
// const app = require('../index');   // 가져오는 모듈이 express -> index.js에서 export
const app = require('./beforemvc_index');  // sh 변경 - 아직 확인 안해봄
const { response } = require('./beforemvc_index');

// supertestjs 참고, 
// 비동기 처리위한 done 콜백함수 추가
describe('GET /users', () => {
    describe('success', () => {
        it('res users-obj in array',(done)=>{
            request(app)
                .get('/users')
                .end( (err,res) => {
                    res.body.should.be.instanceOf(Array);   // assertion
                    done();
                })
            }) // end of it()


        it('res as Maximum number as the number of limit',(done)=>{
            request(app)
                .get('/users?limit=2')
                .end( (err,res) => {
                    res.body.should.lengthOf(2);   // assertion
                    done();
                })
        })
    })

    describe('failure',()=>{
        it('limit is not a Number datatype -> res 400',(done)=>{
            request(app)
            .get('/users?limit=two')
            .expect(400)
            .end(done);
            // .end((err,res) => {
            //     // res.body - should이용
            //     done();
            // })
        })
    })

})


describe('DELETE /users/id',() => {
    describe('success?',() => {
        it('check id=1',(done)=>{
            request(app)
            .get('/users/1')
            .end((err,res) => {
                res.body.should.have.property('id',1);
                done();
            });
        })
    })

    describe('failure', () => {
        it('id=NaN',(done) =>{
            request(app)
            .get('/users/one')
            .expect(400)
            .end(done);
        });
        it('not found id\'s user',(done) => {
            request(app)
            .get('/users/999')
            .expect(400)
            .end(done)
        });
    })
})

describe('DELETE /users/id', () => {
    describe('success',()=>{
        it('res 204',(done) => {
            request(app)
            .delete('/users/1')
            .expect(204)
            .end(done);
        })
    })

    describe('failure',()=>{
        it('res 400 when id is NaN', (done) => {
            request(app)
            .delete('/users/one')
            .expect(400)
            .end(done);
        })
    })
})

// post는 body로 보내주는데 send() 이용 json 형식으로 담아줘
describe('POST /users', () => {
    describe('success',() => {
        let name = 'pop',
            resBody;
        // before() : mocha 함수, textcase 동작전 미리 실행 /실행 결과 저장해놔서 코드 중복 없애고자
        before((done) => {
            request(app)
            .post('/users')
            .send({name})
            .expect(201)
            .end((err,res) => {
                resBody = res.body;
                done();
            });
        });
        // it('res 201', (done)=> {
        //     request(app)
        //     .post('/users')
        //     .send( {name : 'pop'})
        //     .expect(201)
        //     .end(done)
        // });
        // 비동기 아니니까 done 은 없이
        it('생성된 user object 반환',()=>{
            resBody.should.have.property('id');
        })
        it('입력한 name 반환',()=>{
            resBody.should.have.property('name',name);
        })
    })

    describe('failure',() =>{
        it('the empty of name parameter',(done) => {
            request(app)
            .post('/users')
            .send({})
            .expect(400)
            .end(done)
        })
        it('repitition in name',(done)=>{
            request(app)
            .post('/users')
            .send({name:'chris'})
            .expect(409)
            .end(done);
        })
    })
})


describe('PUT /users:id',()=>{
    describe('success',()=>{
        it('res changed name',(done)=>{
            const name = 'chandler';
            request(app)
            .put('/users/3')
            .send({name:name})
            .end((err,res)=>{
                res.body.should.have.property('name',name)
                done();
            })
        })
    })

    describe('failure', () => {
        it('id\'s datatype = int', (done) =>{
            request(app)
            .put('/users/three')
            .expect(400)
            .end(done)
        })
        it('name is null', (done) =>{
            request(app)
            .put('/users/1')
            .send({})
            .expect(400)
            .end(done)
        })
        it('user is not matched', (done) =>{
            request(app)
            .put('/users/999')
            .send({name:'test'})  // 이거 안해주면, name null test에서 넘어가버려서 추가
            .expect(404)
            .end(done)
        })
        it('name is repeated', (done) =>{
            request(app)
            .put('/users/2')
            .send({name:'pitt'})
            .expect(409)
            .end(done)
        })
    })


})