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
userRouter.post("/ressources/:id/favorites", (req, res, next) => {
  if (!req.session.user) {
    res.status(400).json({
      message: "Please login before access the user profile",
    });
    return;
  }

  User.findById(req.session.user._id)
    .then((user) => {
      user.favorites.map((favorite) => {
        if (favorite.id === req.params.id) {
          res.status(400).json({ message: "Favorite already saved" });
        } else {
          user.favorites.push(req.params.id);
        }
      });

      user
        .save()
        .then((user) => {
          res.status(200).json({ message: "Favorite added" });
        })
        .catch((err) => {
          res.status(400).json({ message: "Favorite not added" });
        });
    })
    .catch((err) => {
      res.status(400).json({ message: "user not found" });
    });
});

// DELETE FAVORITE
userRouter.delete("/favorites/:id", (req, res, next) => {
  let ressourceId = req.params.id;
  User.findById(req.session.user._id)
    .then((user) => {
      let index = user.favorites.indexOf(ressourceId);
      user.favorites.splice(index, 1);

      user
        .save()
        .then((user) => {
          res.status(200).json({ message: "Favorite deleted" });
        })
        .catch((err) => {
          res.status(400).json({ message: "Favorite not deleted" });
        });
    })
    .catch((err) => {
      res.status(400).json({ message: "user not found" });
    });
});

// GET USER PROFILE + FAVORIS
userRouter.get("/user", (req, res, next) => {
  if (!req.session.user) {
    res.status(400).json({
      message: "Please login before access the user profile",
    });
    return;
  }

  User.findById(req.session.user._id)
    .populate("favorites")
    .then((user) => {
      console.log(user.favorites);
      res.status(200).json({ user });
    })
    .catch((err) => {
      res.status(400).json({ message: "No user found" });
    });
});

// GET ONLY FAVORIS
userRouter.get("/user/favorites", (req, res, next) => {
  if (!req.session.user) {
    res.status(400).json({
      message: "Please login before access the user profile",
    });
    return;
  }

  User.findById(req.session.user._id)
    .populate("favorites")
    .then((user) => {
      console.log(user.favorites);
      res.status(200).json(user.favorites);
    })
    .catch((err) => {
      res.status(400).json({ message: "No user found" });
    });
});

module.exports = userRouter;
