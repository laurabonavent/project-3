const express = require("express");
const ressourcesRoutes = express.Router();
const Ressources = require("../models/Ressource.model");

// GET ALL RESSOURCES
ressourcesRoutes.get("/ressources", (req, res, next) => {
  //const { q, type, technology, level, price, language } = req.query;
  //let query = {};
  Ressources.find({})
    .then((ressources) => {
      res.json(ressources);
    })
    .catch(next);
  //   if (
  //     q === "" &&
  //     type === "" &&
  //     technology === "" &&
  //     level === "" &&
  //     price === "" &&
  //     language === ""
  //   ) {
  //     Ressources.find({})
  //       .then((ressources) => {
  //         console.log(ressources);
  //         res.json(ressources);
  //       })
  //       .catch(next);
  //  }
});

// GET ONE RESSOURCE
ressourcesRoutes.get("/ressources/:id", (req, res, next) => {
  const id = req.params.id;
  Ressources.findById({ _id: id })
    .then((ressource) => {
      res.json(ressource);
    })
    .catch(next);
});

// GET ENUM VALUES
ressourcesRoutes.get("/enumvalues", (req, res, next) => {
  const enumValuesTechnologies = Ressources.schema.path("technology").caster
    .enumValues;
  const enumValuesTypes = Ressources.schema.path("type").caster.enumValues;
  const enumValuesLevels = Ressources.schema.path("level").enumValues;
  const enumValuesPrices = Ressources.schema.path("price").enumValues;
  const enumValuesLanguages = Ressources.schema.path("language").enumValues;
  // console.log(
  //   enumValuesTechnologies,
  //   enumValuesTypes,
  //   enumValuesLevels,
  //   enumValuesPrices,
  //   enumValuesLanguages
  // );
  res.json({
    technology: enumValuesTechnologies,
    type: enumValuesTypes,
    level: enumValuesLevels,
    price: enumValuesPrices,
    languages: enumValuesLanguages,
  });
});

module.exports = ressourcesRoutes;
