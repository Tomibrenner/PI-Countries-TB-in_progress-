const { Country, Activity } = require("../db");


const {
  getAllCountries,
  getCountryByName,
  getCountryId,
} = require("../controllers/contriesCon");

const getAllCountriesHandler = async (req, res) => {
  const { name } = req.query;

  const result = name ? await getCountryByName(name) : await getAllCountries();
  try {
    result.length
      ? res.status(200).json(result)
      : res.status(400).json({ error: "Country not found" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

 const getCountryIdHandler = async (req, res) => {
  const  {id}  = req.params;
  const result = await getCountryId(id);
  try {
   (result === null)
   ? res.status(400).json({ error: "Country not found" })
   : res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
 };

module.exports = { getAllCountriesHandler, getCountryIdHandler };

// const {
//   countryDB
// } = require('../api_db/countryDB')

// const apiToDB = async (req, res) => {
//   const result = await countryDB();
//   try {
//     res.status(200).json(result);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// module.exports={apiToDB}
