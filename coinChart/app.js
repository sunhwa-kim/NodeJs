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
var coinData = [];

  request.get({uri:'https://coin.zum.com/price?cm=more'}
  ,function(err,response,body){
    const $ = cheerio.load(body);
    for (var i=0; i<5; i++) {
      var subArr = []
      subArr.push($("td").parent('tr').eq(i).children('td').find('a')[0].children[0].data.replace(/\n/gi,"").replace(/ /gi,""))
      subArr.push($("td").parent('tr').eq(i).children('td').eq(1).text().replace(/\n/gi,"").replace(/ /gi,""))
      subArr.push($("td").parent('tr').eq(i).children('td').eq(2).text().replace(/\n/gi,"").replace(/ /gi,""))
      coinData.push(subArr);
    // coinName.push($("td")[i].children[0].children[0].data.replace(/\n/gi,"").replace(/ /gi,""));
    }
  	res.send(coinData);
  })
});
app.post('/selectCoinName', function (req, res) {
  var param = JSON.parse(req.body.param);

  var selectCoinPk = `select * from coin_pk`;
  connection.query(selectCoinPk,
  function(err, rows, fields){
    if (err) throw err;
    res.send(rows);
  })//select end
});

app.post('/insertCoin', function (req, res) {
  var param = JSON.parse(req.body.param);
  // var insertCoinData = `insert into coin_data (coin_pk,upbit, upbitFluctuation, bitfinex, bitfinexFluctuation) values ("${Number(param.idx)}","${param.upbit}","${param.upbitFluctuation}","${param.bitfinex}","${param.bitfinexFluctuation}")`;
  var insertCoinData = `insert into coin_data set ? `;

  connection.query(insertCoinData,param,
  function(err, rows, fields){
    if (err) throw err;
    res.send(rows);
  })//select end

});
