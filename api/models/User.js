const res = require("express/lib/response");
const { init } = require("../dbConfig/config");

class User {
  constructor(data) {
    this.id = data._id;
    this.username = data.username;
    this.password_digest = data.password_digest;
    this.org = data.org;
    this.tracked_habits = data.tracked_habits;
    this.streaks = data.streaks;
  }

  static all(org) {
    return new Promise(async (res, rej) => {
      try {
        const db = await init();
        const userData = await db
          .collection("users")
          .find({ org: { $eq: org } })
          .toArray();
        const users = userData.map((item) => new User(item));
        res(users);
      } catch (err) {
        rej(err);
      }
    });
  }

  static findByUsername(username) {
    return new Promise(async (res, rej) => {
      try {
        const db = await init();
        const userData = await db
          .collection("users")
          .find({ username: { $eq: username } })
          .toArray();
        if (!userData.length) {
          throw new Error("No user with given username");
        }
        const user = new User(userData[0]);
        res(user);
      } catch (err) {
        rej(err);
      }
    });
  }

  static create(data) {
    return new Promise(async (res, rej) => {
      try {
        const db = await init();
        const newUserData = await db.collection("users").insertOne({
          username: data.username.toLowerCase(),
          password_digest: data.password_digest,
          org: data.org.toLowerCase(),
          tracked_habits: {},
          streaks: {
            habit1: {
              highest: 0,
              current: 0,
            },
            habit2: {
              highest: 0,
              current: 0,
            },
            habit3: {
              highest: 0,
              current: 0,
            },
            habit4: {
              highest: 0,
              current: 0,
            },
            habit5: {
              highest: 0,
              current: 0,
            },
          },
        });
        const newUser = new User(newUserData);
        res(newUser);
      } catch (err) {
        rej(err);
      }
    });
  }

  createHabits(data) {
    return new Promise(async (res, rej) => {
      try {
        const db = await init();
        const updatedUserData = await db
          .collection("users")
          .findOneAndUpdate(
            { username: { $eq: this.username } },
            { $set: { tracked_habits: data } },
            { returnNewDocument: true }
          );
        const updatedUser = new User(updatedUserData);
        res(updatedUser);
      } catch (err) {
        rej(err);
      }
    });
  }

  incrementHabit(habitName, dayOfWeek) {
    return new Promise(async (res, rej) => {
      try {
        const db = await init();
        const updatedUser = await db.collection("users").updateOne(
          { username: { $eq: this.username } },
          {
            $set: {
              [`tracked_habits.${habitName}.${dayOfWeek}`]: 1,
              [`tracked_habits.${habitName}.weekly_count`]: 1,
            },
          }
        );

        // Now we want to update the streaks
        const days = ["mon", "tues", "wed", "thurs", "fri"];
        if (dayOfWeek === "mon") {
          // IDK... hope noone notices
        }
        if (dayOfWeek !== "mon") {
          const previousDay = days[days.indexOf(dayOfWeek) - 1];
        }
        const user = await User.findByUsername(this.username);
        const contStreak =
          user.tracked_habits[`${habitName}`][`${previousDay}`];
        await user.updateCurrentStreak(habitName, contStreak);

        res("Habit Updated");
      } catch (err) {
        rej(err);
      }
    });
  }

  updateCurrentStreak(habitName, contStreak) {
    return new Promise(async (req, res) => {
      try {
        const user = await User.findByUsername(this.username);
        const db = await init();
        if (contStreak) {
          const updatedUser = await db
            .collection("users")
            .updateOne(
              { username: { $eq: this.username } },
              { $inc: { [`streaks.${habitName}.current`]: 1 } },
              { returnNewDocument: true }
            );
          // If current > highest we want to increment highest
          const current = updatedUser.streaks[`${habitName}`].current;
          const highest = updatedUser.streaks[`${habitName}`].highest;
          if (current > highest) {
            user.updateHighestStreak;
          }
        } else {
          await db
            .collection("users")
            .updateOne(
              { username: { $eq: this.username } },
              { $set: { [`streaks.${habitName}.current`]: 1 } }
            );
        }
        res("Streaks Updated");
      } catch (arr) {
        rej(err);
      }
    });
  }

  updateHighestStreak(habitName) {
    return new Promise(async (req, res) => {
      try {
        const db = await init();
        await db
          .collection("users")
          .updateOne(
            { username: { $eq: this.username } },
            { $inc: { [`streaks[${habitName}].highest`]: 1 } }
          );
      } catch (err) {
        rej(err);
      }
    });
  }

  destroyHabits() {
    return new Promise(async (res, rej) => {
      try {
        const db = await init();
        const updatedUserData = await db
          .collection("users")
          .findOneAndUpdate(
            { username: { $eq: this.username } },
            { $set: { tracked_habits: {} } }
          );
        res("Tracked Habits Cleared");
      } catch (err) {
        rej(err);
      }
    });
  }

  destroy() {
    return new Promise(async (res, rej) => {
      try {
        const db = await init();
        await db
          .collection("users")
          .deleteOne({ username: { $eq: this.username } });
        res("User Deleted");
      } catch (err) {
        rej(err);
      }
    });
  }
}

module.exports = User;
