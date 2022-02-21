const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");

router.get("/:org", usersController.index);
router.get("/:username", usersController.show);
router.post("/", usersController.create);
router.delete("/:username", usersController.destroyUser);
router.patch("/:username/habits/", usersController.updateHabit);
router.patch("/:username/habits/:habit", usersController.updateSingleHabit);
// router.delete(
//   "/:org/users/:username/habits/:habit/",
//   usersController.destroyHabit
// );

module.exports = router;
