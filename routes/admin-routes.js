const express = require("express");
const adminRoutes = express.Router();
const Ressources = require("../models/Ressource.model");

adminRoutes.put("/ressources/:id", (req, res, next) => {
  console.log("req.session.user", req.session.user.role);
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
    res.status(400).json({ message: "You're not authorized" });
  }
});

module.exports = adminRoutes;
