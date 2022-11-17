const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  comments: String,
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
  },
});

commentSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
const Comments = mongoose.model("Comments", commentSchema);
module.exports = Comments
