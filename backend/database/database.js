const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
client = new MongoClient(url,{useUnifiedTopology:true});
dbName = 'commet';
console.log('The db file is running');
module.exports = {
    client,
    dbName
}