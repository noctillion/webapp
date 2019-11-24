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
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.nonprofile = "There is not profile for the user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(errors)); // pilas aqui lo cambie err to errors
  }
);

//// ruta publica
// @route GET api/profile/all
// @desc get all the profiles
// @acces public
/// permite ver todos los perfiles los guarda en un array

router.get("/all", (req, res) => {
  let errors = {};

  Profile.find()
    .populate("user", ["name", "avatar"])
    .then(profiles => {
      if (!profiles) {
        errors.nonprofile = " There are not profiles available";
        return res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch(err => res.status(404).json({ profile: "Profiles not available" }));
});

//// ruta publica
// @route GET api/profile/handle/:handle
// @desc get current profile by handle
// @acces public
/// permite ver el perfil de la gente

router.get("/handle/:handle", (req, res) => {
  let errors = {};

  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.nonprofile = "There is not profile fot this user";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: "There is not profile for this user" })
    );
});

//// ruta publica
// @route GET api/profile/user/:user_id
// @desc get current profile by id
// @acces public
/// permite ver el perfil de la gente

router.get("/user/:user_id", (req, res) => {
  let errors = {};

  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.nonprofile = "There is not profile fot this user";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: "There is not profile for this user" })
    );
});

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

//// ruta privada
// @route DELETE api/experience/:exp_id
// @desc DELETE
// @acces private

router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        //get remove index
        let removeIndex = profile.experience
          .map(item => item.id)
          .indexOf(req.params.exp_id);

        //// splice out of array
        //console.log(removeIndex);
        profile.experience.splice(removeIndex, 1);

        //

        profile.save().then(profile => res.json(profile));
      })
      .catch(err =>
        res.status(404).json({ msg: "error in deleting experience" })
      );
  }
);

//// ruta privada
// @route DELETE api/ducation/:edu_id
// @desc DELETE
// @acces private

router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        //get remove index
        let removeIndex = profile.education
          .map(item => item.id)
          .indexOf(req.params.edu_id);

        //// splice out of array
        //console.log(removeIndex);
        profile.education.splice(removeIndex, 1);

        //

        profile.save().then(profile => res.json(profile));
      })
      .catch(err =>
        res.status(404).json({ msg: "error in deleting education" })
      );
  }
);

//// ruta privada
// @route POST api/
// @desc creates or updatethe new profile
// @acces private

router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      let nextExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };
      //// add experience to an array
      profile.experience.unshift(nextExp);
      profile.save().then((profile = res.json(profile)));
    });
  }
);

router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      let nextEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fieldstudy: req.body.fieldstudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };
      //// add experience to an array
      profile.education.unshift(nextEdu);
      profile.save().then((profile = res.json(profile)));
    });
  }
);

//// ruta privada
// @route DELETE api/profile
// @desc  delete user and profile
// @acces private

router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findByIdAndRemove({ user: req.user.id }).then(() => {
      User.findByIdAndRemove({ _id: req.user.id }).then(() =>
        res.json({ succes: true })
      );
    });
  }
);

module.exports = router;
