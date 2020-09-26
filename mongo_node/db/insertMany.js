const client = require('./pool');

const insertMany = async (data=[], c) => {
    const db = (await client).db('study')
    const collection = db.collection(c)
    const result = await collection.insertMany(data);
    return result;
}

/*
const insertMany = async () => {
    const db = (await client).db('study')
    const collection = db.collection('mongo')
    collection.insertMany([{type:'JSON'},{doc:'tmp-test'}], (err,result) => {
        if(err){
            throw err;
            return;
        }
        return result;
    })
}
*/

module.exports = insertMany;