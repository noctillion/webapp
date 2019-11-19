let mongodb = require("mongodb");
let MongoClient = mongodb.MongoClient;
let dbp = require("./keys").mongoURI;

let _db; // _db solo para uso interno
let mongoConnect = callback => {
  MongoClient.connect(dbp, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(client => {
      console.log("Connected to DB");
      _db = client.db();
      callback();
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};

let getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found!!!";
};

exports.mongoConnect = mongoConnect;

exports.getDb = getDb;
