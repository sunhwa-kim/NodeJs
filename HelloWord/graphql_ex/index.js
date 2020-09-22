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

const root = {
    getProduct : ({id}) => products.find( product => product.id === parseInt(id)) ,
    addProduct : ({input}) => {
        input.id = parseInt(products.length +1);
        products.push(input);
        return root.getProduct({id : input.id})
    }
}
//위 // return products.find( product => product.id === parseInt(id))  // 인데 root도 접근해서 return
// addProduct -> postman test (json)
// {
//     "query": "mutation addProduct($input: ProductInput) { addProduct(input: $input) { id } }",
//     "variables": { "input" : { "name" : "세번째상품" , "price" : 3000 , "description" : "test" } }
// }



// graphiql  GUI 환경에서 query 할 수 있게
const app = express();
app.use('/graphql', graphqlHTTP({
    schema : schema,
    rootValue : root,
    graphiql : true
}));

app.listen( 4000 , ()=> {
    console.log('running server port 400');
})