const client = require('./pool');
// parameter 정의한 collection == c
const deleteOne = async (data = {}, c ) => {
    const db = (await client).db('study');
    const collection = db.collection(c);
    const result = await collection.deleteOne(data);
    return result;
}


/*
const deleteOne = async () => {
    const db = (await client).db('study');
    const collection = db.collection('mongo');
    collection.deleteOne({title:'node'},(err,item)=> {
        if(err){
            throw err;
        }
        console.log(item);
    })
}
*/
module.exports = deleteOne;
