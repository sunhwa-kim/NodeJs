const { graphql, buildSchema } = require('graphql');

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

// test  query = '{hello}'
graphql( schema , '{ nodejs }' , root ).then((response) => {
    console.log(response);
})