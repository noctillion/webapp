let express = require("express");
let router = express.Router();
let multer = require("multer");

// loading User profile
let Csv = require("../../models/Csv");

// @route GET api/posts/test
// @desc test post route
// @acces Public

let multerConfig = {
  storage: multer.diskStorage({
    destination: function(req, file, next) {
      next(null, "./Rplumber");
      // next(null, "./public/images");
    },
    filename: function(req, file, next) {
      console.log(file);
      let ext = file.mimetype.split("/")[1];
      console.log(ext);
      let ret = Date.now();
      console.log(ret);

      next(null, file.fieldname + "-" + ret + "." + ext);
    }
  }),
  fileFilter: function(req, file, next) {
    if (!file) {
      next();
    }
    let csvF = file.mimetype.startsWith("text/csv");
    if (csvF) {
      next(null, true);
    } else {
      next({ message: "File type not supported" }, false);
    }
  }
};

router.get("/test", (req, res) => {
  res.json({ msg: "posts works" });
}); /// manda a la rura /api/posts/test.. la primeraparte estaba en el server

///ruta publica
/// /upload
/// manda los csv a mongo db
/// metodo POST
/// en postman funciona como form-data recibiendo csvFile como keyname

router.post("/", multer(multerConfig).single("csvFile"), function(req, res) {
  res.send("this is post upload"); /// csvFile es el nombre del boton en la forma
  // check for file
  let ret;
  if (req.file) {
    console.log("numero", req.file);
    ///store file in the body
    req.body.csvFile = req.file.filename; //// esto se va a guardar en la db como csvFile
    //req.body.codeNow = req.file.ret; //// esto no existe aqui
    ret = req.file.filename;
  }
  /// save data in database
  let upload = new Csv(req.body).save();
  // sinprobar
  //.then(csv => res.json(csv))

  /*   let upload = new Csv({
    //user: req.user.id,
    csvFile: req.body.csvFile,
    codeNow: req.file.ret
  });

  upload.save().then(post => res.json(post)); */
});

/// ruta publica
/// busca el ultimo archivo generado y le devuelve un objeto json

router.get("/", (req, res) => {
  Csv.find()
    .sort({ date: -1 })
    .limit(1)
    .then(csv => res.json(csv))
    .catch(err => res.status(404).json({ nocsvfound: "Not csv list found" }));
});

module.exports = router;
