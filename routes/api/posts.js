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
// add a post
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

// @route post api/like/:id
// @desc like post
// route private

router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(404)
              .json({ alreadyliked: "User aready liked this post" });
          }

          // Add user id to likes array

          post.likes.unshift({ user: require.user.id });

          post.save().then(post => res.json(post));
        })
        .catch(err =>
          res.status(404).json({ postnotfoud: " Posts not found for deleting" })
        );
    });
  }
);

/// delete like
// @route post api/unlike/:id
// @desc like post
// route private

router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(404)
              .json({ notliked: "You have not yet liked this post" });
          }

          // remove index in likes array
          //1 find and store in variable
          let removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          //2 splice out
          post.likes.splice(removeIndex, 1);

          // save
          post.save().then(post => res.json(post));
        })
        .catch(err =>
          res
            .status(404)
            .json({ postnotfound: " Posts not found for deleting" })
        );
    });
  }
);

// @route POST api/posts/comment/:id
// @desc add a comment
// @acces Private
// add a post
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        let newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        };
        /// add comments to an array
        post.comments.unshift(newComment);

        // save

        post.save().then(post => res.json(post));
      })
      .catch(err =>
        res.status(404).json({ postnotfoud: "No post found for comment" })
      );
  }
);

// @route DELETE api/posts/comment/:id/:comment_id
// @desc DELETE a comment
// @acces Private
// add a post
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        //mirar si el comentario existe
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: " comment does not exist" });
        }
        // remover el index

        let removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        // slice comment out

        post.comments.splice(removeIndex, 1);

        post.save().then(post => res.json(post));
      })
      .catch(err =>
        res.status(404).json({ postnotfoud: "No post found for comment" })
      );
  }
);

module.exports = router;
