let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      //unique: true,
      trim: true,
      minlength: 3
    },
    email: {
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 5
    },
    avatar: {
      type: String
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true },
  { collection: "users" }
);

let User = mongoose.model("users", userSchema);

module.exports = User;
