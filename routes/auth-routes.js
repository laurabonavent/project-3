const express = require("express");
const authRoutes = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");
const uploader = require("../configs/cloudinary-setup.config");

// POST SIGNUP
authRoutes.post("/signup", (req, res, next) => {
  const { email, password, username, level, avatar } = req.body;
  const role = "user";

  // if (req.file) {
  //   avatarUser = req.file.path;
  // } else {
  //   avatarUser =
  //     "https://www.wanimo.com/veterinaire/wp-content/uploads/2015/03/images_articles_chat_chaton-sourire@2x.jpg";
  // }

  if (!email || !password || !username || !level) {
    res.status(400).json({ message: "Provide all the information to signup" });
    return;
  }

  if (password.length < 7) {
    res.status(400).json({
      message:
        "Please make your password at least 8 characters long for security purposes.",
    });
    return;
  }

  User.findOne({ email })
    .then((foundUser) => {
      if (foundUser) {
        res.status(400).json({ message: "Email taken. Get another one." });
        return;
      }

      const salt = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(password, salt);

      const aNewUser = new User({
        email: email,
        password: hashPass,
        username: username,
        avatar: avatar,
        level: level,
        role: "user",
      });

      aNewUser
        .save()
        .then(() => {
          // Persist our new user into session
          req.session.user = aNewUser;

          res.status(200).json(aNewUser);
        })
        .catch((err) => {
          console.log("err: ", err);

          res
            .status(400)
            .json({ message: "Saving user to database went wrong." });
        });
    })
    .catch((err) => {
      res.status(500).json({ message: "Email check went bad." });
    });
});

// POST LOGIN
authRoutes.post("/login", (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .populate("favorites")
    .then((user) => {
      if (!user) {
        //res.status(400).json({ message: "No user with that email." });
        return next(new Error("No user with that email"));
      }

      // compareSync
      if (bcrypt.compareSync(password, user.password) !== true) {
        //res.status(400).json({ message: "Wrong password" });
        return next(new Error("Wrong credentials"));
      } else {
        req.session.user = user;
        //res.json(user);
        res.status(200).json(user);
      }
    })
    .catch(next);
});

// POST LOGOUT
authRoutes.post("/logout", (req, res, next) => {
  req.session.destroy();
  res.json({ message: "Your are now logged out." });
});

// GET LOGGEDIN
authRoutes.get("/loggedin", (req, res, next) => {
  // req.isAuthenticated() is defined by passport
  if (req.session.user) {
    res.status(200).json(req.session.user);
    return;
  }
  res.status(403).json({ message: "Unauthorized" });
});

// UPLOAD
authRoutes.post("/upload", uploader.single("avatar"), (req, res, next) => {
  // console.log('file is: ', req.file)
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  // get secure_url from the file object and save it in the
  // variable 'secure_url', but this can be any name, just make sure you remember to use the same in frontend
  res.json({ secure_url: req.file.path });
});

module.exports = authRoutes;

// UPLOAD IMAGE RESSOURCE
authRoutes.post("/upload/image", uploader.single("image"), (req, res, next) => {
  console.log("file is: ", req.file);
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  // get secure_url from the file object and save it in the
  // variable 'secure_url', but this can be any name, just make sure you remember to use the same in frontend
  res.json({ secure_url: req.file.path });
});
