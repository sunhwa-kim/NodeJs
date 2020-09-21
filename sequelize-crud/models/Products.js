const moment = require('moment');

module.exports = function(sequelize, DataTypes){
    const Products = sequelize.define('Products',
        {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            name : { type: DataTypes.STRING },
            price : { type: DataTypes.INTEGER },
            description : { type: DataTypes.TEXT }
        }
    );

    // Products.prototype.dateFormat = (date) => {
    //     return moment(date).format('YYYY년 MM월 DD일');  // 원하는 형식대로
    // }
    // 위 코드에서 return 줄이기
    Products.prototype.dateFormat = (date) => (
        moment(date).format('YYYY-MM-DD')
    );

    return Products;
} 