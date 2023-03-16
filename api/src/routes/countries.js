const { Router } = require("express");
const router = Router();

const {
   //apiToDB,
  getAllCountriesHandler,
  getCountryIdHandler
} = require("../handlers/countriesHan.js");

 //router.get("/", apiToDB);
router.get("/", getAllCountriesHandler);
router.get("/:id", getCountryIdHandler);

module.exports = router;
