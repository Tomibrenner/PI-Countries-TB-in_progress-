const { Router } = require("express");
const router = Router();

const {
  getActivitiesHandler,
  createActivityHandler,
  deleteActivityHandler
} = require("../handlers/activitiesHan");

router.get("/", getActivitiesHandler);
router.post("/activity", createActivityHandler);
router.delete("/:id/delete", deleteActivityHandler);

module.exports = router;
