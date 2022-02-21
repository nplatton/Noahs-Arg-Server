const express = require('express');
const router = express.Router();
const habitsController = require('../controllers/habits')
const { verifyToken } = require('../middleware/auth');

router.get('/', habitsController.index)
router.get('/:id', habitsController.showUser)
router.post('/', habitsController.createHabit)
router.patch('/:id', habitsController.updateHabit)
router.delete('/:id', habitsController.destroyHabit)

module.exports = router;