let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let goslimSchema = new Schema(
  {
    gene: {
      type: String,
      required: true,
      trim: true
    },
    object_name: {
      type: String,
      trim: true
    },
    genel: {
      type: String,
      trim: true
    },
    relationship: {
      type: String,
      trim: true
    },
    GO_term: {
      type: String,
      trim: true
    },
    GO_ID: {
      type: String,
      trim: true
    },
    TAIR_Keyword_ID: {
      type: String,
      trim: true
    },
    Aspect: {
      type: String,
      trim: true
    },
    Goslim_term: {
      type: String,
      trim: true
    },
    evidence_code: {
      type: String,
      trim: true
    },
    Evidence_description: {
      type: String,
      trim: true
    },
    Evidence_with: {
      type: String,
      trim: true
    },
    Reference: {
      type: String,
      trim: true
    },
    Anotator: {
      type: String,
      trim: true
    },
    Anotation_date: {
      type: String,
      trim: true
    }
  },
  { collection: "slimGO" }
);

let Goslim = mongoose.model("slimGO", goslimSchema);

module.exports = Goslim;
