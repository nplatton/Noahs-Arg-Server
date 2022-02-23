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
    this.last_visited = data.last_visited;
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

        // Need to update weekly_count by the proper amount
        const amount = this.tracked_habits[`${habitName}`].target_amount;
        const currentWeekly = this.tracked_habits[`${habitName}`].weekly_count;
        const newWeekly = currentWeekly + amount;

        const updatedUserData = await db.collection("users").findOneAndUpdate(
          { username: { $eq: this.username } },
          {
            $set: {
              [`tracked_habits.${habitName}.${dayOfWeek}`]: 1,
              [`tracked_habits.${habitName}.weekly_count`]: newWeekly,
            },
          },
          { returnNewDocument: true }
        );
        const updatedUser = new User(updatedUserData.value);

        // Now we want to update the streaks
        let days = ["mon", "tues", "wed", "thurs", "fri"];
        let previousDay;
        if (dayOfWeek === "mon") {
          // IDK... hope noone notices
          previousDay = dayOfWeek;
        }
        if (dayOfWeek !== "mon") {
          let index = days.indexOf(dayOfWeek) - 1;
          previousDay = days[index];
        }
        const contStreak =
          updatedUser.tracked_habits[`${habitName}`][`${previousDay}`];
        await updatedUser.updateCurrentStreak(habitName, contStreak);

        res("Habit Updated");
      } catch (err) {
        rej(err);
      }
    });
  }

  updateCurrentStreak(habitName, contStreak) {
    return new Promise(async (res, rej) => {
      try {
        const db = await init();
        if (contStreak) {
          const updatedUserData = await db
            .collection("users")
            .findOneAndUpdate(
              { username: { $eq: this.username } },
              { $inc: { [`streaks.${habitName}.current`]: 1 } },
              { returnNewDocument: true }
            );
          const updatedUser = new User(updatedUserData.value);
          // If current > highest we want to increment highest
          const current = updatedUser.streaks[`${habitName}`].current;
          const highest = updatedUser.streaks[`${habitName}`].highest;
          if (current > highest) {
            const diff = current - highest + 1;
            await updatedUser.updateHighestStreak(habitName, diff);
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
      } catch (err) {
        rej(err);
      }
    });
  }

  updateHighestStreak(habitName, diff) {
    return new Promise(async (res, rej) => {
      try {
        const db = await init();
        await db
          .collection("users")
          .findOneAndUpdate(
            { username: { $eq: this.username } },
            { $inc: { [`streaks.${habitName}.highest`]: diff } }
          );
        res("Highest Streak Updated");
      } catch (err) {
        rej(err);
      }
    });
  }

  updateLastVisited(week) {
    return new Promise(async (res, rej) => {
      try {
        const db = await init();
        await db
          .collection("users")
          .findOneAndUpdate(
            { username: { $eq: this.username } },
            { $set: { last_visited: week } }
          );
        res("Week Updated");
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
