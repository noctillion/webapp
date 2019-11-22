let express = require("express");
let router = express.Router();
let gravatar = require("gravatar");
let bcrypt = require("bcryptjs");
let User = require("../../models/User");
let jwt = require("jsonwebtoken");
let keys = require("../../util/keys").secretOrKey;
let passport = require("passport");

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
    /// este user tiene toda la informacion en mongo db.. puede ser cualquier nombre
    if (!user) {
      return res
        .status(400)
        .json({ email: "Email doesnt exist user not found" });
    }
    bcrypt.compare(password, user.password).then(Matched => {
      if (Matched) {
        ///res.json({ msg: "success" });
        // user match
        // jwt necesita payload y key que es un secreto
        let payload = { id: user.id, name: user.username };
        jwt.sign(payload, keys, { expiresIn: 4000 }, (err, token) => {
          res.json({ msg: "success token", token: "Bearer " + token });
        });
      } else {
        return res.status(400).json({ msg: "not succeded" });
      }
    });
  });
});

/// creando ruta privada////

// @route GET api/users/current
// @desc Register current user
// @access Private

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ msg: "successs" });
  }
);

module.exports = router;
