const User = require("../models/User");

async function index(req, res) {
  try {
    const users = await User.all(req.params.orgName);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ err });
  }
}

async function show(req, res) {
  try {
    const user = await User.findByUsername(req.params.username.toLowerCase());
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

async function updateHabits(req, res) {
  try {
    console.log(req.params.id);
    const user = await User.findByUsername(req.params.username);
    const updatedUser = await user.createHabits(req.body);
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

async function clearHabits(req, res) {
  try {
    const user = await User.findByUsername(req.params.username);
    await user.destroyHabits();
    res.status(204).end();
  } catch (err) {
    res.status(404).json({ err: err });
  }
}

module.exports = {
  index,
  show,
  create,
  updateHabits,
  updateSingleHabit,
  clearHabits,
  destroyUser,
};
