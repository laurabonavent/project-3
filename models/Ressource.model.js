const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ressourceSchema = new Schema(
  {
    title: String,
    description: String,
    image: String,
    link: String,
    technology: {
      type: String,
      enum: [
        "all",
        "html",
        "css",
        "javascript",
        "reactjs",
        "nodejs",
        "Express",
        "VSCode",
        "API",
      ],
    },
    type: {
      type: String,
      enum: [
        "video",
        "tutorial",
        "book",
        "blog",
        "e-learning",
        "articles",
        "tips",
        "extensions",
        "people",
        "creation",
        "tools",
        "library",
      ],
    },
    level: {
      type: String,
      enum: ["Every force the galaxy", "Padawan", "Jedi", "Master Jedi"],
    },
    votes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    comments: [
      {
        userId: [{ type: Schema.Types.ObjectId, ref: "User" }],
        text: String,
        date: {
          timestamps: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Ressource = mongoose.model("Ressource", ressourceSchema);
module.exports = Ressource;
