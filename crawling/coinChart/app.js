const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app).listen(80);
const mysql = require('mysql');
const bodyParser = require("body-parser");

const request = require('request');
const cheerio = require('cheerio');//웹크롤링

//post
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());//post

// const cheerio = require('cheerio');

const connection = mysql.createConnection({
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
let coinData = [];

  request.get({uri:'https://coin.zum.com/price?cm=more'}
  ,function(err,response,body){
    const $ = cheerio.load(body);
    for (let i=0; i<5; i++) {
      let subArr = []
      subArr.push($("td").parent('tr').eq(i).children('td').find('a')[0].children[0].data.replace(/\n/gi,"").replace(/ /gi,""))
      subArr.push($("td").parent('tr').eq(i).children('td').eq(1).text().replace(/\n/gi,"").replace(/ /gi,""))
      subArr.push($("td").parent('tr').eq(i).children('td').eq(2).text().replace(/\n/gi,"").replace(/ /gi,""))
      coinData.push(subArr);
    // coinName.push($("td")[i].children[0].children[0].data.replace(/\n/gi,"").replace(/ /gi,""));
    }
  	res.send(coinData);
  })
});


// 저장 버튼
app.post('/selectCoinName', function (req, res) {
  let param = JSON.parse(req.body.param);

  let selectCoinPk = `select * from coin_pk`;
  connection.query(selectCoinPk,
  function(err, rows, fields){
    if (err) throw err;
    res.send(rows);
  })//select end
});

app.post('/insertCoin', function (req, res) {
  let param = JSON.parse(req.body.param);
  // var insertCoinData = `insert into coin_data (coin_pk,upbit, upbitFluctuation, bitfinex, bitfinexFluctuation) values ("${Number(param.idx)}","${param.upbit}","${param.upbitFluctuation}","${param.bitfinex}","${param.bitfinexFluctuation}")`;
  let insertCoinData = `insert into coin_data set ? `;

  connection.query(insertCoinData,param,
  function(err, rows, fields){
    if (err) throw err;
    res.send(rows);
  })//select end

});


// 그래프 버튼
app.get('/graphCoin', function (req, res) {
	res.sendfile("coinAvg.html");
});

app.post('/selectCoinNmData', function (req, res) {
  let param = Number(req.body.idx);
  let selectCoinPk = `select * from coin_data where 1=1 and coin_pk=${param}`;
  connection.query(selectCoinPk,
  function(err, rows, fields){
    if (err) throw err;
    res.send(rows);
  })//select end
});


//  평균 그래프 버튼  selectCoinNmAvg
app.post('/selectCoinNameDaily', function (req, res) {
  let listQ = `SELECT * FROM coin_data ORDER BY saveDate ASC`;
  connection.query(listQ,
  function(err, rows, fields){
    if (err) throw err;
    res.send(rows);
  })
});
