// json 폴더 내 모든 json 파일 읽어와서 해당 json data parsing해서 mongoDB에 data 추가 로직

const path = require('path');
const fs = require('fs');
// const insert = require('./db/insert')  // 단독접근 != 전체 접근시 index 이용 예 {insert} = require('./db)
const {insert} = require('./db')
// __dirname:현재 위치와 json 폴더를  join
const dirPath = path.join(__dirname, 'json')

fs.readdir(dirPath, (err,files) => {
    if(err) {
        console.error(err);
        return
    }
// forEach 사용 않고 비동기 for문 으로 refactoring
fs.readdir(dirPath, async (err, files) => {
    if (err) {
        console.error(err);
        return
    }

    for (const file of files ){
        const {collection, data} = require(`${dirPath}\\${file}`)
        await insert(data, collection)
    }
})


/*
    files.forEach(file => {
        //  template string 내에서 '\' 표시 방법 =\\
        const { collection, data } = require(`${dirPath}\\${file}`)
        console.log(collection);  // json내에 정의된것
    })
*/
})