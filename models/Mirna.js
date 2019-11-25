let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let mirnaSchema = new Schema(
  {
    //gene: { type: Schema.Types.ObjectId, ref: "slimGO" }, // originaly string
    gene: { type: String, trim: true },
    gene_loc: String,
    consecutive: Number,
    psrnat: {
      region: String,
      mirna: String,
      genl: String,
      score: Number
    },
    psrob: {
      region: String,
      mirna: String,
      genl: String,
      score: Number
    },
    tapir: {
      region: String,
      mirna: String,
      genl: String,
      score: Number
    },
    tfinder: {
      region: String,
      mirna: String,
      genl: String,
      score: Number
    },
    na_num: Number,
    softs: Number
  },
  { collection: "genes" }
);

let Mirna = mongoose.model("genes", mirnaSchema);

module.exports = Mirna;
