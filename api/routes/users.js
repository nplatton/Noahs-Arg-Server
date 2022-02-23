const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");

const { verifyToken } = require("../middleware/auth");

router.get("/org/:orgName", verifyToken, usersController.index);
router.get("/:username", usersController.show);
router.post("/", usersController.create);
router.delete("/:username", verifyToken, usersController.destroyUser);
router.get("/:username/habits/", verifyToken, usersController.getAllHabits);
router.patch("/:username/habits/", verifyToken, usersController.updateHabits);
router.patch(
  "/:username/habits/:habit",
  verifyToken,
  usersController.updateSingleHabit
);
router.patch("/:username/yes", usersController.clearHabits);

module.exports = router;
