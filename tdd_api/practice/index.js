'use strict'

const http = require('http');

const hostname = '127.0.0.1';  // 내 컴퓨터 주소 IP
const port = 3000;   // 내 컴퓨터내 port중 열어놓은것


// express의 라우팅 부분
const server = http.createServer((req, res) => {
    // 요청정보 
    console.log(req.url);  // url 변수에 사용자 요청정소 담긴
    if (req.url === '/'){  // root 경로이면
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hello, World!\n');
    } else if(req.url === '/users'){
        res.statusCode = 200;
        res.setHeader('Content_Type', 'test/plain');
        res.end('User list');
    } else {
        res.statusCode = 400;
        res.end('Not Found');
    }
    // 중복되어지는 코드들 => expressjs 사용 (expressjs.com)
});

// listen() :  서버 요청 대기 상태로 : 요청 받기 위해 상시 대기 상태
// 가장 마지막에 콜백함수 넣어놔서 listen완료시 출력 나가게
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});