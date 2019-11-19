let express = require("express");
let router = express.Router();

// @route GET api/profile/test
// @desc test post route
// @acces Public

router.get("/test", (req, res) => {
  res.json({ msg: "profile works" });
}); /// manda a la rura /api/users/test.. la primeraparte estaba en el server

module.exports = router;
