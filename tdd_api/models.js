'use strict'

const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect : 'sqlite',
    storage : './db.sqlite',
    logging : false  // default : console.log와 binding
});

// varchar 255
const User = sequelize.define('User',{
    name : {
        type : Sequelize.STRING,
        unique : true
    }
})

// 생성 코드로 다음은 db 연동 정보로 -> sync-db.js
module.exports = { Sequelize, sequelize, User }