let express = require("express");
let router = express.Router();

// @route GET api/posts/test
// @desc test post route
// @acces Public

router.get("/test", (req, res) => {
  res.json({ msg: "posts works" });
}); /// manda a la rura /api/posts/test.. la primeraparte estaba en el server

module.exports = router;
