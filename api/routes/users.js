const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");

const { verifyToken } = require("../middleware/auth");

router.get("/org/:orgName", verifyToken, usersController.index);
router.get("/:username", verifyToken, usersController.show);
router.post("/", usersController.create);
router.delete("/:username", verifyToken, usersController.destroyUser);
router.patch("/:username/habits/", verifyToken, usersController.updateHabits);
router.patch(
  "/:username/habits/:habit",
  verifyToken,
  usersController.updateSingleHabit
);
// Don't want to require verification here as I think this will be an automatic process
router.delete("/:username/habits/", usersController.clearHabits);

module.exports = router;
