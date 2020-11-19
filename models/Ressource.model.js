const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ressourceSchema = new Schema(
  {
    title: String,
    description: String,
    image: String,
    link: String,
    language: {
      type: String,
      enum: ["french", "english"],
    },
    technology: {
      type: [String],
      enum: [
        "all",
        "api",
        "browser",
        "css",
        "design",
        "express",
        "handlebars",
        "html",
        "javascript",
        "mongodb",
        "nodejs",
        "reactjs",
        "vscode",
      ],
    },
    type: {
      type: [String],
      enum: [
        "article",
        "blog",
        "book",
        "documentation",
        "e-learning",
        "extension",
        "interview-preparation",
        "library",
        "people",
        "tips",
        "tool",
        "training",
        "tutorial",
        "video",
      ],
    },
    level: {
      type: String,
      enum: ["every force", "padawan", "jedi", "master jedi"],
    },
    price: {
      type: String,
      enum: ["free", "paid", "freemium"],
    },
    votes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    comments: [
      {
        userId: [{ type: Schema.Types.ObjectId, ref: "User" }],
        text: String,
        timestamps: {
          createdAt: Number,
          updatedAt: Number,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
//ressourceSchema.index({ title: "text", description: "text" });

const Ressource = mongoose.model("Ressource", ressourceSchema);
module.exports = Ressource;
