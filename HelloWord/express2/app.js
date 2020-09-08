const express = require('express');
const admin = require('./routes/admin');  // 분리 url을 폴더로, 불러오기


const app = express();
const port = 3000;

app.get('/',(req,res) => {
    res.send("Hello World");
});

// url 분리 : 폴더 별 정리
app.use('/admin',admin);


app.listen(port, () => {
    console.log('express listening on port', port);
});