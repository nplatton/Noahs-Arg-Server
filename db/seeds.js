const db = connect("mongodb://localhost:27017/habits");

db.users.drop();

db.users.insertMany([
  {
    username: "noah",
    // Password: noah
    password_digest:
      "$2a$10$4EAIUWYfI8NC4hSUDyu2R.bGW.zyfKfebOQL6QC6H39VQGK6Reke2",
    org: "Noahs_Arg",
    tracked_habits: {
      drink_water: {
        target_amount: 4,
        dailyCount: 4,
        weeklyCount: 15,
      },
      break_from_screen: {
        target_amount: 3,
        dailyCount: 2,
        weeklyCount: 10,
      },
      stretch: {
        target_amount: 3,
        dailyCount: 0,
        weeklyCount: 12,
      },
    },
    streaks: {
      drink_water: {
        highest: 8,
        current: 8,
      },
      break_from_screen: {
        highest: 3,
        current: 2,
      },
      stretch: {
        highest: 6,
        current: 4,
      },
      task4: {
        highest: 0,
        current: 0,
      },
      task5: {
        highest: 0,
        current: 0,
      },
    },
  },
  {
    username: "philip",
    // Password: philip
    password_digest:
      "$2a$10$cX2K8p9oat9RO5dj2F4VduhN06J6qlH1M6q/v39pFh76kD/SO208q",
    org: "Noahs_Arg",
    tracked_habits: {
      drink_water: {
        target_amount: 3,
        dailyCount: 2,
        weeklyCount: 10,
      },
      break_from_screen: {
        target_amount: 3,
        dailyCount: 0,
        weeklyCount: 12,
      },
      stretch: {
        target_amount: 4,
        dailyCount: 4,
        weeklyCount: 15,
      },
    },
    streaks: {
      drink_water: {
        highest: 3,
        current: 2,
      },
      break_from_screen: {
        highest: 6,
        current: 4,
      },
      stretch: {
        highest: 8,
        current: 8,
      },
      task4: {
        highest: 0,
        current: 0,
      },
      task5: {
        highest: 0,
        current: 0,
      },
    },
  },
  {
    username: "bojin",
    // Password: bojin
    password_digest:
      "$2a$10$fxXsRktC6JsMsas1RfcQY.uFFg/jAKNPnYjXnYIA/otPJrwkLq0bq",
    org: "Noahs_Arg",
    tracked_habits: {
      drink_water: {
        target_amount: 3,
        dailyCount: 0,
        weeklyCount: 12,
      },
      break_from_screen: {
        target_amount: 4,
        dailyCount: 4,
        weeklyCount: 15,
      },
      stretch: {
        target_amount: 3,
        dailyCount: 2,
        weeklyCount: 10,
      },
    },
    streaks: {
      drink_water: {
        highest: 6,
        current: 4,
      },
      break_from_screen: {
        highest: 8,
        current: 8,
      },
      stretch: {
        highest: 3,
        current: 2,
      },
      task4: {
        highest: 0,
        current: 0,
      },
      task5: {
        highest: 0,
        current: 0,
      },
    },
  },
]);
