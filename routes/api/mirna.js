let express = require("express");
let router = express.Router();
let Mirna = require("../../models/Mirna");

router.get("/test", (req, res) =>
  res.json({
    msg: "miRNA working"
  })
);

router.get("/target", (req, res) => {
  Mirna.findOne({ target: req.body.gene }).then(user => {
    if (user) {
      return res.json({ gene: req.body.gene });
    } else {
      return res.json({ gene: "Target no esta en la lista" });
    }
  });
});

module.exports = router;
