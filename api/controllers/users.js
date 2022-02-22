const User = require("../models/User");

async function index(req, res) {
  try {
    const users = await User.all(req.params.orgName);
    res.status(200).json({ blah: users });
  } catch (err) {
    res.status(500).json({ err });
  }
}

// -----------------I DONT KNOW---------------------------
async function show(req, res) {
  try {
    const user = await User.findByUsername(req.params.username);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ err: req.params.username });
  }
}

async function create(req, res) {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ err });
  }
}

async function destroyUser(req, res) {
  try {
    const user = await User.findByUsername(req.params.username);
    await user.destroy();
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ err });
  }
}

// async function createHabit(req, res) {
//   try {
//     const habit = await User.habits.create(req.body);
//     res.status(200).json(habit);
//   } catch (err) {
//     res.status(422).json({ err });
//   }
// }

async function updateHabit(req, res) {
  try {
    console.log(req.params.id);
    const user = await User.findByUsername(req.params.username);
    const updatedUser = await user.updateWeeklyHabits(req.body);
    // const habit_update = await habit.update();
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(404).json({ err });
  }
}

async function updateSingleHabit(req, res) {
  try {
    const user = User.findByUsername(req.params.username);
    await user.updateSingleHabit(req.params.habit);
    res.status(200).json({});
  } catch (err) {
    res.status(500).json({ err: err });
  }
}

// async function destroyHabit(req, res) {
//   try {
//     const habit = await User.habits.findByHabitId(parseInt(req.params.id));
//     await habit.destroy();
//     res.status(204).end();
//   } catch (err) {
//     res.status(404).json({ err });
//   }
// }

module.exports = {
  index,
  show,
  create,
  //   createHabit,
  updateHabit,
  updateSingleHabit,
  //   destroyHabit,
  destroyUser,
};
