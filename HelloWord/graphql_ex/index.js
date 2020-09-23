const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// http://localhost:4000/graphql

// query
// const schema = buildSchema (`
//     type Query{
//         hello : String,
//         nodejs : Int
//     }
// `);

//  ! : 필수 의미 
// input 구조
// type 데이터 구조
// Query or Mutation (변수명 : 받는 인자) : return 값
const schema = buildSchema (`

    input ProductInput {
        name : String
        price : Int
        description : String
    }

    type Product {
        id : ID!
        name : String
        price : Int
        description : String
    }

    type Query{
        getProduct ( id : ID! ) : Product
    }

    type Mutation {
        addProduct( input : ProductInput ) : Product
        updateProduct( id:ID! , input : ProductInput! ) : Product
        deleteProduct( id : ID! ) : String
    }
`);

// response
// const root = {
//     hello : () => 'Hello World',
//     nodejs : () => 20
// }

// data structure temparary
const products = [{
    id : 1,
    name : '첫번째',
    price : 2000,
    description : 'lgglglgl'
},{
    id : 2,
    name : '두 번째 ',
    price : 4000,
    description : 'testtesttest'
}]

// schema 구체적인 내용
const root = {
    getProduct : ({id}) => products.find( product => product.id === parseInt(id)) ,
    addProduct : ({input}) => {
        input.id = parseInt(products.length +1);
        products.push(input);
        return root.getProduct({id : input.id})
    },
    updateProduct :({id,input}) => {
        const index = products.findIndex( product => product.id === parseInt(id))
        products[index] = {
            id : parseInt(id),
            ...input
        }
        return products[index];
    },
    deleteProduct : ({ id }) => {
        const index = products.findIndex( product => product.id === parseInt(id))
        products.splice(index, 1)
        return "removed";
    }
}
//위 // return products.find( product => product.id === parseInt(id))  // 인데 root도 접근해서 return
// addProduct -> postman test (json)
// {
//     "query": "mutation addProduct($input: ProductInput) { addProduct(input: $input) { id } }",
//     "variables": { "input" : { "name" : "세번째상품" , "price" : 3000 , "description" : "test" } }
// }
// update test
// {
//     "query": "mutation updateProduct( $id : ID! , $input: ProductInput! ) { updateProduct( id : $id  , input: $input) { id name description } }",
//     "variables": { "id" : 1 ,"input" : { "name" : "sunhwa 수정 test" , "price" : 1000 , "description" : "id 있는지 graphiql 확인 후 수정 테스트" } }
// }
// delete test


// graphiql  GUI 환경에서 query 할 수 있게
const app = express();
app.use('/graphql', graphqlHTTP({
    schema : schema,
    rootValue : root,
    graphiql : true
}));

app.use('/static', express.static('static'))

app.listen( 4000 , ()=> {
    console.log('running server port 400');
})