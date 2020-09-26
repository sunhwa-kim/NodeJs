const client = require('./pool');

// value 가 parameter로 return 하지 않으면 data는 객체 {}로 초기화 = null
const find = async (data = {}, c ) => {
    const db = (await client).db('study');
    const collection = db.collection(c);
    // collection.find().toArray((err,item) => {console.log(item)})  // 모든 데이터 반환
    const result = await collection.find(data).toArray();
    return result
}

/*
// 검색
const find = async () => {
    const db = (await client).db('study');
    const collection = db.collection('mongo');
    // collection.find().toArray((err,item) => {console.log(item)})  // 모든 데이터 반환
    collection.find({title:'node'}).toArray((err, item) => {
        console.log(item);
    })
}
*/

module.exports = find;