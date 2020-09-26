const { MongoClient } = require('mongodb')
const url = 'mongodb://localhost:27017'

// 비동기
const client = new Promise ((resolve,reject) => {
    MongoClient.connect(url, {
        useNewUrlParser : true,
        useUnifiedTopology : true
    }),(err, client) => {
        //  첫번째 오류, 두번째 실제 데이터 순서
        if(err) {
            reject(err)
            return
        }
        resolve(client)
    }
})

module.exports = client