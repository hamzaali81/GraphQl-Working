const graphql = require('graphql');
// const _ = require('lodash');
const axios = require('axios');


const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema

} = graphql;

// const users =[
//     {id: '1',firstName: 'hamza', age: 31},
//     {id: '2',firstName: 'ahmed', age: 15},
//     {id: '3',firstName: 'ali', age: 10}
// ]

const CompanyType = new GraphQLObjectType({
    name: 'Company',
    fields: {
        id: {type: GraphQLString},
        name: { type: GraphQLString},
        description: {type: GraphQLString}
    }
})

const UserType =new GraphQLObjectType({
   name: 'User',
   fields: {
       id: {type: GraphQLString},
       firstName:{type: GraphQLString},
       age: {type: GraphQLInt},
       company: {
           type: CompanyType,
           resolve(parentValue,args){
               console.log('Test',parentValue,args)
               return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`)
               .then((res)=> 
               {
                   return res.data
                   console.log('check',res.data)
               })
           }
        }
   }
});

const RootQuery = new GraphQLObjectType({ 
    name : 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: {id: {type: GraphQLString}},
            resolve(parentValue, args){
                console.log(args, parentValue);
            //   return users.find((el,id)=> el.id === args.id)
            //   return _.find(users,{ id: args.id})
            // return axios.get(`http://localhost:3000/Users/${args.id}`).then((res)=> console.log(res.data)) //{data: {firstName: 'hamza'}}
            return axios.get(`http://localhost:3000/Users/${args.id}`).then((res)=> res.data)   
        }
        }
    }

})

module.exports = new GraphQLSchema({
    query: RootQuery
})