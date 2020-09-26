const assert = require('assert');
const insert = require('../db/insert');
const find = require('../db/find');
const update = require('../db/update');
const deleteOne = require('../db/delete');
const insertMany = require('../db/insertMany');

describe('mongoDB CRUD test', () => {
    it('#insert', async () => {
        const res = await insert({
            test: 'input  something else'
        })
        assert(res)
    })

    //2개 이상의 데이터 array
    it('#insertMany', async () => {
        const res = await insertMany([
            { test: 'this is new test sunhwa' },
            { anothertest: 'this is another data test sunhwa' }
        ])
    })

    it('#find ALL', async () => {
        const res = await find()
        assert(res)
    })

    it('#find Specific', async () => {
        const res = await find({
            test: 'something else'
        })
        assert(res)
    })
    // parameter 2개 something else -> new data
    it('#update', async () => {
        const res = await update({
            test: 'something else'
        }, {
            test: 'new data'
        })
        assert(res)
    })

    it('#delete', async () => {
        // json 조건으로 삭제
        const res = await deleteOne({
            test: 'new data'
        })
        assert(res)
    })

})