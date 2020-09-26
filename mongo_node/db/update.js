const client = require('./pool');
// condition : update 조건, data, collection : 3가지
const update = async (condition = {}, data = {}, colclection) => {
    const db = (await client).db('study');
    const collection = db.collection(c);
    
    //  특정 조건 해당 데이터
    const result = await collection.updateOne(condition ,{'$set':data});
    return result;
}

/*
const update = async () => {
    const db = (await client).db('study');
    const collection = db.collection('mongo');
    
    //  특정 조건 해당 데이터
    collection.updateOne({name: 'node'},{'$set':{title:'react'}}, (err, result) => {
        if(err){
            throw err
        }
        console.log(result);
    })
}
*/

module.exports = update;