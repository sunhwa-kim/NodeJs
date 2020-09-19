const models = require('../../models');

exports.get_products = ( _ , res) => {
    // res.render( 'admin/products.html' , 
    //     { message : "hello" } // message 란 변수를 템플릿으로 내보낸다.
    // );

    models.Products.findAll({
        // 조회 조건
    }).then( (products) => {  // 결과 : products
        // res.render('admin/products.html', { productList : products })
        res.render('admin/products.html', { products })  //JS key=value일때, 하나만 적어줘도 OK
        // 단, 받는 products.html에 키값 맞춰주기 
    } )
}

exports.get_products_write = ( _ , res) => {
    res.render( 'admin/write.html');
}

exports.post_products_write = ( req , res ) => {
    // res.send(req.body);
    // models.Products.create({
    //     name : req.body.name,
    //     price : req.body.price,
    //     description : req.body.description,
    // }).then( ()=>{
    //     res.redirect('/admin/products');  // 리스트 페이지로
    // });

    models.Products.create(req.body).then( ()=>{
        res.redirect('/admin/products'); 
    });
};

exports.get_products_detail = ( req,res) =>{
    // req.params.id
    // models.모델명.findByPk().them(그 결과)
    //  모델명 = models > Products.js 모델명
    // models.Products.findByPk(req.params.id).then((product) => { 
    //     res.render( 'admin/detail.html', { product});  // product : product
    // });
    models.Products.findByPk(req.params.id).then( (product) => {
        res.render('admin/detail.html', { product });  
    });
}


exports.get_products_edit = (req,res) => {
    // write.html 가져와
    models.Products.findByPk(req.params.id).then((product)=> {
        res.render('admin/write.html',{product});
    });
}

exports.post_products_edit = (req,res) => {
    let id = req.params.id
    // form -> update (data , id )
    //  MySql  :  UPDATE 테이블명 SET 필드명 = "바꿀 값" WHERE 필드명= "조건 값"
    models.Products.update(req.body,
        {
            where : { id }
        }).then(()=>{
            res.redirect('/admin/products/detail/' + id );  // 수정 전 이용 페이지
    })
}

