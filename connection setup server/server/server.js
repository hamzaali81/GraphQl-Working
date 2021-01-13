const express = require('express');
const models = require('./models');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const schema = require('./schema/schema');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = express();

// Replace with your mongoLab URI
// const MONGO_URI = 'mongodb+srv://hamzaali:8FSkW3W1fQUCOU8y@cluster0.h3nbv.mongodb.net/lyricaldb?retryWrites=true&w=majority';
var uri = process.env.DATABASE || options.urls[app.env];
mongoose.connect(uri.toString());
if (!uri) {
  throw new Error('You must provide a MongoLab URI');
}


const options = {
  useMongoClient: true,
  autoIndex: false, // Don't build indexes
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0
};
mongoose.connect(uri.toString(), { useMongoClient: true }).then(() => console.log('connected to DB'))
.catch(err => console.log(err));
mongoose.Promise = global.Promise;
// mongoose.connection
//     .once('open', () => console.log('Connected to MongoLab instance.'))
//     .on('error', error => console.log('Error connecting to MongoLab:', error));
// mongoose.connect(process.env.DATABASE, options);
// mongoose.connect(process.env.Database,{useMongoClient:true});
// mongoose.connection
//     .once('open', () => console.log('Connected to MongoLab instance.'))
//     .on('error', error => console.log('Error connecting to MongoLab:', error));


// mongoose
//      .connect(process.env.DATABASE, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//     useCreateIndex: true
//   })
//   .then(con => {
//     console.log(con.connections);
//     console.log('DB is connect successful');
//   });
app.use(bodyParser.json());
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;
