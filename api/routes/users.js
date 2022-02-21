const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users')

router.get('/:org/users', usersController.index)
router.get('/:org/users/:username', usersController.show)
router.post('/:org/users/', usersController.create)
router.patch('/:org/users/:username/habits/', habitsController.updateHabit)
router.delete('/:org/users/:username/habits/:habit/', habitsController.destroyHabit)


module.exports = router;