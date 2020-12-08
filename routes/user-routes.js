const express = require("express");
const userRouter = express.Router();
const bcryptjs = require("bcryptjs");
const User = require("../models/User.model");
const uploader = require("../configs/cloudinary-setup.config");

// PUT SESSION
userRouter.put("/user", uploader.single("avatar"), (req, res, next) => {
  if (!req.session.user) {
    res.status(400).json({
      message: "Please login before access the user profile",
    });
    return;
  }
  const { email, password, username, level, avatar } = req.body;

  if (password.length < 7) {
    res.status(400).json({
      message:
        "Please make your password at least 8 characters long for security purposes.",
    });
    return;
  }

  let hashPass;

  if (password === req.session.user.password) {
    hashPass = req.session.user.password;
    console.log("hasPas2: ", hashPass);
  } else {
    const salt = bcryptjs.genSaltSync(10);
    hashPass = bcryptjs.hashSync(password, salt);
    console.log("hasPas3: ", hashPass);
  }

  let updateUser = {
    email: email,
    password: hashPass,
    username: username,
    avatar: avatar,
    level: level,
    role: "user",
  };

  User.findOneAndUpdate(req.session.user.id, updateUser, { new: true })
    .populate("favorites")
    .then((user) => {
      res.status(200).json(user);
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
      // if (user.favorites.includes(req.params.id)) {
      //   console.log("already saved");
      //   res.status(300).json({ message: "Favorite Already save" });
      // } else {
      user.favorites.push(req.params.id);

      user
        .save()
        .then((user) => {
          res.status(200).json({ message: "Favorite added", user });
        })
        .catch((err) => {
          res.status(400).json({ message: "Favorite not added" });
        });
      // }
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
          res.status(200).json({ message: "Favorite deleted", user });
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
