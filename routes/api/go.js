let express = require("express");
let router = express.Router();
//let User = require("../models/user.model");

router.get("/test", (req, res) =>
  res.json({
    msg: "go working"
  })
);

module.exports = router;