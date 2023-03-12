const {
  getActivities,
  createActivity,
  deleteActivity,
} = require("../controllers/activitiesCon");

const getActivitiesHandler = async (req, res) => {
  const result = await getActivities();
  try {
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createActivityHandler = async (req, res) => {
  const { name, difficulty, duration, season, countries } = req.body;
  const result = await createActivity(
    name,
    difficulty,
    duration,
    season,
    countries
  );
  try {
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteActivityHandler = async (req, res) => {
  const { id } = req.params;
  const result = await deleteActivity(id);
  try {
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getActivitiesHandler,
  createActivityHandler,
  deleteActivityHandler,
};
