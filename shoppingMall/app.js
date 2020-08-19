var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app).listen(80);
var mysql = require('mysql');
var bodyParser = require("body-parser");

// post
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var connection = mysql.createConnection({
	host: 'localhost'
	, port: 3306
	, user: 'root'
	, password: 'root'
	, database: 'webui'
});

app.get('/', function (req, res) {
	res.sendfile("list.html");
});

app.post('/list', function (req, res) {
  var listQ = `select * from itemtable`;
  connection.query(listQ,
  function(err, rows, fields){
    if (err) throw err;
    res.send(rows);
  })
});

app.get('/order2', function (req, res) {
	res.sendfile("orderItem2.html");
});


// async 사용법
app.post('/oderItem2', function (req, res) {
  var no = req.body.no;
// var no = req.query.no; // get 방식

  var listNoQ = `select * from itemtable where no=${no}`;
  connection.query(listNoQ,
  function(err, rows, fields){
    if (err) throw err;
    res.send(rows);
  })//select end
});

app.post('/insertOrder', function (req, res) {
  // var insertInfo = req.body;
  var param = JSON.parse(req.body.param);
  // console.log(param);

  var insertQ = `insert into ordertable (id,itemNo,quantity) values ("${param.orderID}",
"${param.itemNo}","${param.orderAmount}")`;
  connection.query(insertQ,
  function(err, rows, fields){

    if (err) throw err;

    res.send(rows);
  })
});

app.post('/updateItemTable', function (req, res) {
  var updateInfo = req.body;

  var updateQ = `update itemtable set inventory='${updateInfo.lastAmount}' where no='${updateInfo.no}'`;
  connection.query(updateQ,
  function(err, rows, fields){
    if (err) throw err;
    res.send(rows);
  })
});

// new_async
// 1. 일단 연결되는 쿼리를 다 합쳐본다.
// 2. 버튼 눌러 호출에 응답 시 main() 실행
app.post('/insertOrder2', function (req, res) {
  var insertInfo = req.body;

  async function main() {
    var no = await orderInserFunction();
    await orderUpdateFunction();
  };
 main();

  function orderInserFunction() {
    return new Promise(function(resolve, reject) {
      var insertQ = `insert into ordertable (id,itemNo,quantity) values ("${insertInfo.orderID}",
    "${insertInfo.itemNo}","${insertInfo.orderAmount}")`;
      connection.query(insertQ,
      function(err, rows, fields){
        if (err) throw err;
        console.log("async_insertInfo",insertInfo);
        var no = insertInfo.itemNo;
        resolve(no);
      });//connection end
    })//return end
  }//function orderInserFunction end

  function orderUpdateFunction() {
    return new Promise(function (resolve, reject) {
      var updateInfo = (insertInfo.resInventory ) - (insertInfo.orderAmount);

      var updateQ = `update itemtable set inventory='${updateInfo}' where no='${insertInfo.itemNo}'`;
      connection.query(updateQ,
      function(err, rows, fields) {
        if(err) throw err;
        res.send(rows);
      }) // update connection end
    }) // return end
  } //function orderUpdateFunction end

});

app.get('/getFile', function (req, res) {
	var filename = req.query.filename;
  res.sendfile(filename);
});

app.get('/admin', function (req, res) {
	res.sendfile("admin.html");
});

app.get('/manageItem', function (req, res) {
	res.sendfile("manageItem.html");
});


app.post('/adminUpdateItemTable', function (req, res) {
  var updateInfo2 = req.body;
 console.log(updateInfo2.selectBoxx);
  var updateQ22 = `update itemtable set name='${updateInfo2.name}', price='${updateInfo2.price}', inventory='${updateInfo2.inventory}', onsale='${updateInfo2.selectBoxx}' where no='${updateInfo2.no}'`;
  connection.query(updateQ22,
  function(err, rows, fields){
    if (err) throw err;
    res.send(rows);
  })
});

app.post('/adminInsertItemTable', function (req, res) {
  // var insertInfo = req.body;
  var param = JSON.parse(req.body.param);
  // console.log(param);

async function main() {
  var no = await admInsertFunction();
  await admSelectFunction(no);
};

main();

function admInsertFunction() {
  return new Promise(function(resolve, reject){
    var insertQ22 = `insert into itemtable (name,price,inventory,onsale) values ("${param.name}",
  "${param.price}","${param.inventory}","${param.onsale}")`;
    connection.query(insertQ22,
    function(err, rows, fields){
      if (err) throw err;
        var no = rows.insertId;
        // console.log(no);
      resolve(no);
    })//connection end
  })//return end
}//function admInsertFunction end

function admSelectFunction(no) {
  return new Promise(function(resolve, reject){
    var selectQ22 = `select * from itemtable where no='${no}'`;
    connection.query(selectQ22,
    function(err, rows, fields){
      if (err) throw err;
      console.log(rows);
      res.send(rows);
    })//connection end
  })//return end
}//function admInsertFunction end

});


app.get('/orderManage', function (req, res) {
	res.sendfile("orderManage.html");
});

app.post('/admOrderSelect', function (req, res) {

  var admOrdSelectQ = `select * from ordertable where complete=0`;
  connection.query(admOrdSelectQ,
  function(err, rows, fields){
    if (err) throw err;
    res.send(rows);
  })
});

app.post('/admOrderUpdate', function (req, res) {
  var updateInfo333 = req.body;

  var admOrdUpdateQ = ` update ordertable set complete='1' where no='${updateInfo333.no}' `;
  connection.query(admOrdUpdateQ,
  function(err, rows, fields){
    if (err) throw err;
    res.send(rows);
  })
});
