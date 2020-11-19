const express = require("express");
const userRouter = express.Router();
const bcryptjs = require("bcryptjs");
const User = require("../models/User.model");
const uploader = require("../configs/cloudinary-setup.config");

// PUT SESSION
userRouter.put("/user", uploader.single("avatar"), (req, res, next) => {
  const { email, password, username, level } = req.body;
  let avatarUser;

  if (password.length < 7) {
    res.status(400).json({
      message:
        "Please make your password at least 8 characters long for security purposes.",
    });
    return;
  }

  const salt = bcryptjs.genSaltSync(10);
  const hashPass = bcryptjs.hashSync(password, salt);

  if (req.file) {
    avatarUser = req.file.path;
  } else {
    avatarUser = req.body.existingImage;
  }

  let updateUser = {
    email: email,
    password: hashPass,
    username: username,
    avatar: avatarUser,
    level: level,
    role: "user",
  };

  User.findByIdAndUpdate(req.session.user.id, updateUser, { new: true })
    .then((user) => {
      res.status(200).json(updateUser);
    })
    .catch((error) => {
      res.json(error);
    });
});

// POST FAVORIS
// user findbyId and update + add l'id de la ressources
userRouter.post("/favorites", (req, res, next) => {
  let ressourceId = req.params.id;

  User.findByIdAndDelete(req.session.id, ressourceId)
    .then((user) => {
      res.status(200).json({ favorites: ressourceId });
    })
    .catch((err) => {
      res.status(400).json({ message: "Favorite not added" });
    });
});

// GET USER PROFILE + FAVORIS
userRouter.get("/user", (req, res, next) => {
  if (!req.session.user) {
    res.status(400).json({
      message: "Please login before access the user profile",
    });
  }

  User.findById(req.session.user.id)
    .populate("favorites")
    .then((user) => {
      console.log(user.favorites);
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(400).json({ message: "No user found" });
    });
});
// dans user + populate

module.exports = userRouter;
