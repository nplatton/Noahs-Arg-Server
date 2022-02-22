const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");

const { verifyToken } = require("../middleware/auth");

router.get("/org/:orgName", usersController.index);
router.get("/:username", usersController.show);
router.post("/", usersController.create);
router.delete("/:username", usersController.destroyUser);
router.patch("/:username/habits/", usersController.updateHabits);
router.patch(
  "/:username/habits/:habit",
  verifyToken,
  usersController.updateSingleHabit
);
// Don't want to require verification here as I think thsi will be an automatic process
router.delete("/:username/habits/", usersController.clearHabits);

module.exports = router;
