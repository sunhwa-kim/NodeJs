const models = require('../models');


module.exports = () => {
    // return models.sequelize.sync({force:true}); // true : 기존 db 있더라도 새로 만든다 : test 모드에서!
    const options = {
        force : process.env.NODE_ENV === 'test' ? true : false
    };
    return models.sequelize.sync(options);
}
// models.sequelize.sync() 내부적으로  promise return -> 비동기처리 완료 위한, 서버 구동전인 www.js로