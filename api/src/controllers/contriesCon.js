const { Country, Activity } = require("../db");
const { Op } = require("sequelize");

const getAllCountries = async () => {
  return (alCountries = await Country.findAll({ include: Activity }));
};

const getCountryByName = async (name) => {
  return (modelDB = await Country.findAll({
    where: { name: { [Op.iLike]: `${name}%` } },
    include: [{ model: Activity, through: { attributes: [] } }],
    order: [["name", "ASC"]],
  }));
};

const getCountryId = async (id) => {
  return (country = await Country.findByPk(id.toUpperCase(), {
    include: {
      model: Activity,
    },
  }));
};

module.exports = { getAllCountries, getCountryByName, getCountryId };
