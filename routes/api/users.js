let express = require("express");
let router = express.Router();
let gravatar = require("gravatar");
let bcrypt = require("bcryptjs");
let User = require("../../models/User");

// @route GET api/users/test
// @desc test post route
// @acces Public

router.get("/test", (req, res) => {
  res.json({ msg: "users work" });
}); /// manda a la rura /api/users/test.. la primeraparte estaba en el server

/// creando ruta para registrar////

// @route GET api/users/register
// @desc Register user
// @access Public

router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      let avatar = gravatar.url(req.body.email, {
        s: "200", // size
        r: "pg", // rating
        d: "mm" // default
      });
      let newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        avatar: avatar,
        date: req.body.date
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

/// creando ruta para validar ////

// @route GET api/users/login
// @desc logi user // return token
// @access Public

router.post("/login", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  User.findOne({ email: email }).then(user => {
    if (!user) {
      return res
        .status(400)
        .json({ email: "Email doesnt exist user not found" });
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        res.json({ msg: "success" });
      } else {
        return res.status(400).json({ msg: "not succeded" });
      }
    });
  });
});

module.exports = router;
