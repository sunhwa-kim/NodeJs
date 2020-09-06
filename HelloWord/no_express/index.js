const http = require('http');   // express 모듈 불러오기(내장모듈.. 아직 다운로드 받은거 없는 상태)

http.createServer( (request, response) => {  // 요청 받아 응답 보낸다
    response.writeHead(200, {'Content-Type' : 'text/plain'});// HTTP상태코드와 문서 형태(excel도 적어서 보내줄 수 있어)
    response.write('Hello Server');
    response.end();
}).listen(3000);  // port 3000번인걸로 웹서버 띄우는 : url에 localhost:3000 쓰면 뜨는