let express = require("express");
let router = express.Router();
let Mirna = require("../../models/Mirna");

//nuevo
let Goslim = require("../../models/Goslim");

router.get("/test3", (req, res) => {
  Mirna.find({}, { gene: 1 }).then(user => {
    res.json(user);
  });
});

/// retrieve gen filling gene box
router.get("/test4", (req, res) => {
  let gene = req.body.gen; /// AT1G01440
  Mirna.aggregate([{ $match: { gene: gene } }]).then(gene => {
    res.json(gene);
  });
});

/// retrieve gen filling gene box
router.get("/test5", (req, res) => {
  //let gene = req.body.gene; /// AT1G01440
  Mirna.find({ gene: ["AT1G01440", "AT1G01560"] }).then(gene => {
    res.json(gene);
  });
});

router.get("/test", (req, res) =>
  res.json({
    msg: "miRNA working"
  })
);

router.get("/target", (req, res) => {
  Mirna.findOne({ gene: req.body.gene }).then(user => {
    if (user) {
      return res.json({ gene: req.body.gene });
    } else {
      return res.json({ gene: "Target no esta en la lista" });
    }
  });
});

router.get("/target2", (req, res) => {
  Mirna.find().then(user => {
    res.json(user);
  });
});

module.exports = router;
