let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
let passport = require("passport");

let Post = require("../../models/Post");

let Profile = require("../../models/Profile");

// @route GET api/posts/test
// @desc test post route
// @acces Public

router.get("/test", (req, res) => {
  res.json({ msg: "posts works" });
}); /// manda a la rura /api/posts/test.. la primeraparte estaba en el server

// @route GET api/posts
// @desc get array of posts
// @acces Private

router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostfound: "Not post list found" }));
});

// @route GET api/posts
// @desc get array of posts by id
// @acces Private

router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ nopostfound: "Not post found for this id" })
    );
});

// @route POST api/posts
// @desc test post route
// @acces Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });

    newPost.save().then(post => res.json(post));
  }
);

// @route DELETE api/posts/:id
// @desc delete posts
// route private

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "User not autorized" });
          }

          // delete

          post.remove().then(() => res.json({ success: true }));
        })
        .catch(err =>
          res.status(404).json({ postnotfoud: " Posts not found for deleting" })
        );
    });
  }
);

module.exports = router;
