let express = require("express");
let router = express.Router();
let Goslim = require("../../models/Goslim");

router.get("/test", (req, res) =>
  res.json({
    msg: "go working"
  })
);

router.get("/goslim", (req, res) => {
  Goslim.findOne({ gene: req.body.gene }).then(user => {
    if (user) {
      return res.json({ gene: req.body.gene, GO_term: req.body.GO_term });
    } else {
      return res.json({ gene: "No esta en la lista" });
    }
  });
});

module.exports = router;
