let express = require("express");
let app = express();
let mongoose = require("mongoose");
let bodyParser = require("body-parser");
//let mongoConnect = require("./util/database").mongoConnect;
let dbp = require("./util/keys").mongoURI;
let passport = require("passport");

let reloadMagic = require("./reload-magic.js");

let users = require("./routes/api/users");
let profile = require("./routes/api/profile");
let posts = require("./routes/api/posts");
let mirna = require("./routes/api/mirna");
let go = require("./routes/api/go");

reloadMagic(app);

// bodyparser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//

app.use("/", express.static("build")); // Needed for the HTML and JS files
app.use("/", express.static("public")); // Needed for local assets
//use routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);
app.use("/api/mirna", mirna);
app.use("/api/go", go);

//// DB config en utils

// connect to mongoDB

// Your endpoints go after this line

// Your endpoints go before this line

app.all("/*", (req, res, next) => {
  // needed for react router
  res.sendFile(__dirname + "/build/index.html");
});

mongoose
  .connect(dbp, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB conected"))
  .catch(err => console.log(err));

// passport middleware

app.use(passport.initialize());
require("./util/passport")(passport);

app.listen(4000, "0.0.0.0", () => {
  console.log("Server running on port 4000");
});

/* mongoConnect(() => {
  app.listen(4000, "0.0.0.0", () => {
    console.log("Server running on port 4000");
  });
}); */
