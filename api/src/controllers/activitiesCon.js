const { Op } = require("sequelize");
const { Country, Activity } = require("../db");

const getActivities = async () => {
  return (activities = await Activity.findAll({
    include: [{ model: Country, through: { attributes: [] } }],
    order: [["name", "ASC"]],
  }));
};

const createActivity = async (
  name,
  difficulty,
  duration,
  season,
  countries
) => {
  const upperCaseCountries = countries.map(country => country.toUpperCase());
  const prevActivity = await Activity.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
  });

  if (prevActivity.length) return `Activity "${name}" already exists`

  const activity = await Activity.create({
    name: name
      .split(" ")
      .map(str => str[ 0 ].toUpperCase() + str.slice(1).toLowerCase()).join(""),
    difficulty,
    duration,
    season:season
    .split(" ")
    .map((string) => string[0].toUpperCase() + string.slice(1).toLowerCase())
    .join(""),
  })

  const countryMatch = await Country.findAll({
    where:{
      id: upperCaseCountries
    }
  })
  
  countryMatch.forEach(async (coun) => {
    const country = await Country.findByPk(coun.id);
    if (country) await country.addActivities(activity)
  });
  const newActivity = await Activity.findByPk(activity.id, {
    include: [{ model: Country, through: { attributes: [] } }],
  });

  return newActivity
};

const deleteActivity = async (id) => {
  const activity = await Activity.findByPk(id);

  if (!activity) return `Activity with ID ${id} not found`;

  await activity.destroy();

  return `Activity with ID ${id} deleted successfully`;
};

module.exports = { getActivities, createActivity, deleteActivity };
