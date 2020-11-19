const express = require("express");
const adminRoutes = express.Router();
const Ressources = require("../models/Ressource.model");

// CREATE RESSOURCES ADMIN

// EDIT RESSOURCES ADMIN
adminRoutes.put("/ressources/:id", (req, res, next) => {
  if (req.session.user.role === "admin") {
    const id = req.params.id;
    const {
      title,
      description,
      image,
      link,
      language,
      technology,
      type,
      level,
      price,
    } = req.body;

    if (
      !title ||
      !description ||
      !link ||
      !language ||
      !level ||
      !technology ||
      !type ||
      !price
    ) {
      res.status(400).json({ message: "Please fill in all the fields" });
      return;
    }

    Ressources.findByIdAndUpdate(
      id,
      {
        title,
        description,
        image,
        link,
        language,
        technology,
        type,
        level,
        price,
      },
      { new: true }
    )
      .then((ressource) => {
        res.json(ressource);
      })
      .catch(next);
  } else {
    res.status(403).json({ message: "You're not authorized" });
  }
});

// DELETE RESSOURCES ADMIN
// adminRoutes.delete("/ressources/:id", (req, res, next => {
//   if (req.session.user.role === "admin") {
//     const id = req.params.id;
//   } else {
//     res.status(403).json({ message: "You're not authorized" });
//   }
// }).then().catch()

module.exports = adminRoutes;
