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
          habits: {},
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

  updateDailyHabit(habit) {
    return new Promise(async (res, rej) => {
      try {
        const db = await init();
        const updatedUserData = await db.collection("users").findOneAndUpdate(
          { username: { $eq: this.username } },
          {
            $inc: {
              "tracked_habits.$[habit].daily_count": 1,
              "tracked_habits.$[habit].weekly_count": 1,
            },
          }
        );
        res("Habit Updated");
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
