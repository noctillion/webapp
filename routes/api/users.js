let express = require("express");
let router = express.Router();

// @route GET api/posts/test
// @desc test post route
// @acces Public

router.get("/test", (req, res) => {
  res.json({ msg: "users work" });
}); /// manda a la rura /api/users/test.. la primeraparte estaba en el server

module.exports = router;
