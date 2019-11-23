let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
let passport = require("passport");

// loading model frofile
let Profile = require("../../models/Profile");

// loading User profile
let User = require("../../models/User");

// @route GET api/profile/test
// @desc test post route
// @acces Public

router.get("/test", (req, res) => {
  res.json({ msg: "profile works" });
}); /// manda a la rura /api/users/test.. la primeraparte estaba en el server

//// ruta privada
// @route GET api/profile
// @desc get current user profile
// @acces private
/// permite asociar el usuario con el perfil

router.get(
  "/", //// route is profile
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let errors = {};

    Profile.findOne({ user: req.user.id }) //
      .populate("user", ["user", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.nonprofile = "There is not profile for the user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

//// ruta privada
// @route POST api/profile
// @desc creates or updatethe new profile
// @acces private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    /// get fields
    let profileFields = {};
    profileFields.user = req.user.id; /// tiene avatar name y email
    if (req.body.handle) {
      profileFields.handle = req.body.handle;
    }
    if (req.body.company) {
      profileFields.company = req.body.company;
    }
    if (req.body.website) {
      profileFields.website = req.body.website;
    }
    if (req.body.location) {
      profileFields.location = req.body.location;
    }
    if (req.body.bio) {
      profileFields.bio = req.body.bio;
    }
    if (req.body.status) {
      profileFields.status = req.body.status;
    }
    if (req.body.githubusername) {
      profileFields.githubusername = req.body.githubusername;
    }
    /////skills is and array.. es diferente

    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",");
    }

    /// social es un objeto

    profileFields.social = {};

    if (req.body.youtube) {
      profileFields.social.youtube = req.body.youtube;
    }
    if (req.body.facebook) {
      profileFields.social.facebook = req.body.facebook;
    }
    if (req.body.linkedin) {
      profileFields.social.linkedin = req.body.linkedin;
    }
    if (req.body.twitter) {
      profileFields.social.twitter = req.body.twitter;
    }

    if (req.body.handle) {
      profileFields.handle = req.body.handle;
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        /// update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        /// create

        /// check if handle exsists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            return res.status(400).json({ msg: " That handle exists" }); /// cuadrar error aqui 019 video
          }

          /// save profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

module.exports = router;
