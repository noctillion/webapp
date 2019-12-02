let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let profileSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users"
    },
    handle: {
      type: String,
      required: true, /// con validaciones se requiere
      max: 40
    },
    company: String,
    website: String,
    location: String,
    bio: String,
    status: String, /// is originaly required
    skills: {
      type: [String]
    },
    githubusername: String,
    experience: [
      {
        title: String,
        company: String,
        location: String,
        from: Date,
        to: Date,
        description: String
      }
    ],
    education: [
      {
        school: String,
        degree: String,
        fieldstudy: String,
        from: Date,
        to: Date,
        description: String
      }
    ],
    social: {
      youtube: String,
      facebook: String,
      linkedin: String,
      twitter: String
    },
    date: { type: Date, default: Date.now }
  },
  { collection: "profile" }
);

let Profile = mongoose.model("profile", profileSchema);

module.exports = Profile;
