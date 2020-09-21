const models = require('./models');

async function getProducts() {

    // models.Products.findByPk(req.params.id).then( (product) => {
    //     res.render('admin/detail.html', { product });  
    // });
    // admin.ctrl.js 에서 위의 방식이 await = .then()~ 
    // await 로  promist 객체 받음
    try{
        const productA = await models.Products.findByPk(1);
        const productB = await models.Products.findByPk(2);

        // template 으로 넘길때 res.render 썼는데 여기는 cmd 로
        console.log(productA.dataValues);
        console.log(productB.dataValues);
        console.log(productB.dataValues.id);
    } catch(err) {
        console.log(err);
    }
}

getProducts();