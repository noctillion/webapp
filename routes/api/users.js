let express = require("express");
let router = express.Router();
let gravatar = require("gravatar");
let bcrypt = require("bcryptjs");
let User = require("../../models/User");
let jwt = require("jsonwebtoken");
let keys = require("../../util/keys").secretOrKey;
let passport = require("passport");

///load imput validation

let validateRegisterInput = require("../../validation/register");

/// load login validation

let validateLoginInput = require("../../validation/login");

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
  let { errors, isValid } = validateRegisterInput(req.body);
  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      let avatar = gravatar.url(req.body.email, {
        s: "200", // size
        r: "pg", // rating
        d: "mm" // default
      });
      let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password, /// password2
        password: req.body.password2,
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
  let { errors, isValid } = validateLoginInput(req.body);
  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  let email = req.body.email;
  let password = req.body.password;
  User.findOne({ email: email }).then(user => {
    /// este user tiene toda la informacion en mongo db.. puede ser cualquier nombre
    if (!user) {
      errors.email = "Email doesnt exist user not found";
      return res.status(400).json(errors);
    }
    bcrypt.compare(password, user.password).then(Matched => {
      if (Matched) {
        ///res.json({ msg: "success" });
        // user match
        // jwt necesita payload y key que es un secreto
        let payload = { id: user.id, name: user.name };
        jwt.sign(payload, keys, { expiresIn: 4000 }, (err, token) => {
          res.json({ msg: "success token", token: "Bearer " + token });
        });
      } else {
        errors.password = "Password incorrect!!";
        return res.status(400).json(errors);
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
    //res.json({ msg: "successs" });
    //res.json(req.user);
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      avatar: req.user.avatar
    });
  }
);

module.exports = router;
