let express = require("express");
let app = express();
//let mongoose = require("mongoose");
let mongoConnect = require("./util/database").mongoConnect;

let reloadMagic = require("./reload-magic.js");

let users = require("./routes/api/users");
let profile = require("./routes/api/profile");
let posts = require("./routes/api/posts");

reloadMagic(app);

app.use("/", express.static("build")); // Needed for the HTML and JS files
app.use("/", express.static("public")); // Needed for local assets
//use routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

//// DB config en utils

// connect to mongoDB

// Your endpoints go after this line

// Your endpoints go before this line

app.all("/*", (req, res, next) => {
  // needed for react router
  res.sendFile(__dirname + "/build/index.html");
});

mongoConnect(() => {
  app.listen(4000, "0.0.0.0", () => {
    console.log("Server running on port 4000");
  });
});
