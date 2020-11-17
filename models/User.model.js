const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: String,
    password: String,
    username: String,
    avatar: String,
    level: {
      type: String,
      enum: ["every force", "padawan", "jedi", "master jedi"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
    },
    favorites: [{ type: Schema.Types.ObjectId, ref: "Ressource" }],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;