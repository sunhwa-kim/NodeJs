'use strict'

const { createServer } = require("./server")

// application's start

const { createServer} = require('./server')

// createServer가 비동이 인지 확인 후 async
async function main(config) {
    // config 가 외부에 있거나, 다른  cloud에 있을 경우
    // const config = '~' // 별도로 추가
    const server = await createServer(config)
    // refactoring
    const port = config.port || 3000;
    server.listen(port, () => {
        console.log(`Running at port ${port}`);
    })
}

main()
 // config.port 가 default로 지정되 있으면 들어가고 그렇지 않으면 3000
    /*
    server.listen(config.port || 3000, () => {
        console.log(`Running at port ${config.port}`);
    })
    */