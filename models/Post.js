let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let PostSchema = new Schema(
  {
    /// tenemos el user asociado con los posts
    user: {
      type: Schema.Types.ObjectId,
      ref: "users"
    },
    text: {
      type: String,
      required: true
    },
    name: String,
    avatar: String,
    likes: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "users"
        }
      }
    ],
    comments: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "users"
        },
        text: String,
        name: String,
        avatar: String,
        date: {
          type: Date,
          default: Date.now
        }
      }
    ],
    date: {
      type: Date,
      default: Date.now
    }
  },
  { collection: "post" }
);

let Post = mongoose.model("post", PostSchema);

module.exports = Post;

/// igual que
/// module.exports= Post = mongoose.model("post", PostSchema)
