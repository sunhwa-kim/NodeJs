const models = require('../../models');

// async await 적용 : 순서 보장, 컴퓨터 성능도 좋음, 작성도 좋음
exports.get_products = async (_,res) => {

    try {
        const products = await models.Products.findAll();
        res.render('admin/products.html', {products});
    } catch(e) {

    }
}

exports.get_products_write = ( _ , res) => {
    try{
        res.render( 'admin/write.html');
    } catch(e){
        console.log('error in get_products_write');
    }
}

exports.post_products_write = async (req, res) => {
    try{
        await models.Products.create(req.body);
        res.redirect('/admin/products');   // redirect 시 url 부분 맨 앞 / 시작 (/없으면 덧붙여짐)
    } catch(e){
        console.log('error in post_products_write');
    }
}

exports.get_products_detail = async (req, res) => {
    try {
        const product = await models.Products.findByPk(req.params.id);
        res.render('admin/detail.html',{product});
    }catch(e){
        console.log('error, get_products_detail');
    }
}

exports.get_products_edit = async(req,res) => {
    try {
        const product = await models.Products.findByPk(req.params.id);
        res.render('admin/write.html',{product});
    } catch (e){
        console.log('error, get_products_edit');
    } 
}

exports.post_products_edit = async(req,res) => {
    try {
        let id = req.params.id;
        await models.Products.update(req.body,{ where:{id} } );
        res.redirect('/admin/products/detail/'+id);
    } catch (e){
        console.log('error, post_products_edit');
    }
}

exports.get_products_delete = async (req, res) => {
    try {
        let id = req.params.id;
        await models.Products.destroy({ where : {id} })
        res.redirect('/admin/products');
    } catch(e){
        console.log('error, get_products_delete');
    }
}