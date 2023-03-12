const axios = require("axios");
const { Country } = require("../db");

const countryDB = async () => {
  const api = (await axios.get("https://restcountries.com/v3/all")).data;

  const model = api.map((element) => {
    return {
      id: element.cca3,
      name: element.name.common,
      flags: element.flags[1],
      continents: element.continents[0],
      capital: element.capital ? element.capital[0] : "N/A",
      subregion: element.subregion? element.subregion : "N/A",
      area: element.area,
      population: element.population,
    };
  });
  const dbCountries = model.forEach(async (el) => {
    await Country.findOrCreate({
      where: {
        id: el.id,
        name: el.name,
        flags: el.flags,
        continents: el.continents,
        capital: el.capital,
        subregion: el.subregion,
        area: el.area,
        population: el.population,
      },
    });
  });

  return dbCountries;
};

module.exports = { countryDB };
