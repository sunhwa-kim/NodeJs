const app = require('./app.js');  // app.js 불러오는
const port = 3000;

app.listen(port,() => {
    console.log('Express Listening on port', port );
})