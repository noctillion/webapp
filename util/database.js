let mongodb = require("mongodb");
let MongoClient = mongodb.MongoClient;
let dbp = require("./keys").mongoURI;

let mongoConnect = callback => {
  MongoClient.connect(dbp, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(client => {
      console.log("Connected to DB");
      callback(client);
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = mongoConnect;
