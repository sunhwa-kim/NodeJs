const client = require('./pool');

//  json parameter 받는 경우로 변환
//  parameter : data (null 초기화) , c (condition 조건)
const insert = async (data = {}, c) => {
    const db = (await client).db('study');   // 해당 db 없으면 생성이 default
    // const collection = db.collection('mongo');  
    const collection = db.collection(c);  
    const result = await collection.insertOne(data);
    return result;
}

// 모듈화
module.exports = insert;
/*
const insert = async (data = {}) => {
    // 최초 connection 이후 client 변경 될 이유 없으므로 상수
    const db = (await client).db('study');   // connction
    const collection = db.collection('mongo');  //  data
    // collection.insertOne( {title: 'node'}, (err, result) => {
    collection.insertOne( data, (err, result) => {
    
        if(err){
            throw err
        }
        console.log(result);
    } )
}
*/
