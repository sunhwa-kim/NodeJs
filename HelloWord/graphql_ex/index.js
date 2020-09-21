const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// query
const schema = buildSchema (`
    type Query{
        hello : String,
        nodejs : Int
    }
`);

// response
const root = {
    hello : () => 'Hello World',
    nodejs : () => 20
}

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