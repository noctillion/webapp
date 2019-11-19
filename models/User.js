let getDb = require("../util/database").getDb;

class User {
  constructor(name, email, password, avatar, date) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.avatar = avatar;
    this.date = date;
  }
  save() {
    let db = getDb();
    db.collection("users")
      .insertOne(this)
      .then(result => console.log(result))
      .catch(err => {
        console.log(err);
      });
  }
}
module.exports = User;
