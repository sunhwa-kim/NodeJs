var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app).listen(80);
var mysql = require('mysql');
var bodyParser = require("body-parser");

var request = require('request');
var cheerio = require('cheerio');//웹크롤링

//post
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());//post

// const cheerio = require('cheerio');

var connection = mysql.createConnection({
	host: 'localhost'
	, port: 3306
	, user: 'root'
	, password: 'root'
	, database: 'webui'
});
//    C:\Users\shkim\Desktop\node\webui-master\second\cheerio
app.get('/', function (req, res) {

	// res.sendfile("firstScreen.html");
  res.sendfile("coin.html");
});

app.get('/reqInfo', function (req, res) {
var coinName = [];

  request.get({uri:'https://coin.zum.com/price?cm=more'}
  ,function(err,response,body){
    const $ = cheerio.load(body);

    coinName.push($("td").find('a')[0].children[0].data.replace(/\n/gi,"").replace(/ /gi,""));

    for (var i=1; i<3; i++) {
      coinName.push($("td")[i].children[0].data.replace(/\n/gi,"").replace(/ /gi,""));
    }
  	res.send(coinName);
  })
});


app.post('/insertCoin', function (req, res) {
  // var insertInfo = req.body;
  var param = JSON.parse(req.body.param);
  console.log(param);
  // coinName은 체크 후 일단...조회 결과 전달....
  var selectCoinPk = `select idx_pk from coin_pk where 1=1 and coinName = '${param.coinName}'`;
  console.log(selectCoinPk);
  //  이게 있으면 insertCoinData 실행  -> 없으면 확인 후 insertCoinPk 실행
  var insertCoinPk = `insert into coin_pk(coinName) values ("${param.coinName}")`;
  var insertCoinData = `insert into coin_data (idx,upbit, upbitFluctuation, bitfinex, bitfinexFluctuation)
  values ("${param.idx}","${param.upbit}","${param.upbitFluctuation}","${param.bitfinex}","${param.bitfinexFluctuation}")`;
  connection.query(selectCoinPk,
  function(err, rows, fields){

    if (err) throw err;

    res.send(rows);
  })


});
