let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let postSchema = new Schema(
  {
    /// tenemos el user asociado con los posts
    user: {
      type: Schema.Types.ObjectId,
      ref: "users"
    },
    text: String,
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
          type: Date
        }
      }
    ],
    date: {
      type: Date
      //default: true
    }
  },
  { collection: "post" }
);

let Post = mongoose.model("post", postSchema);

module.exports = Post;

/// igual que
/// module.exports= Post = mongoose.model("post", PostSchema)
