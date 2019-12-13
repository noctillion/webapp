let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let csvSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users"
    },
    name: String,
    csvFile: String,
    codeNow: String,
    date: { type: Date, default: Date.now }
  },
  { collection: "csv" }
);

let Csv = mongoose.model("csv", csvSchema);

module.exports = Csv;
