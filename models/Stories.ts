const { Schema, model } = require("mongoose");

const storiesSchema = new Schema(
  {
    name: String,
    email: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      trim: true,
      match: /.+\@.+\..+/,
    },
    password: { type: String, required: true },
    
  },
  /**
   * The { timestamps: true } tells Mongoose to automatically add createdAt and updatedAt properties to the schema. By default, createdAt and updatedAt are of type "Date".
   * When you update a document, Mongoose automatically increments updatedAt.
   * */
  { timestamps: true }
);

module.exports = model("User", userSchema);