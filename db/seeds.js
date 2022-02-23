const db = connect("mongodb://localhost:27017/habits");

db.users.drop();

db.users.insertMany([
  {
    username: "noah",
    // password: "noah",
    password_digest:
      "$2a$10$4EAIUWYfI8NC4hSUDyu2R.bGW.zyfKfebOQL6QC6H39VQGK6Reke2",
    org: "Noahs_Arg",
    tracked_habits: {
      drink_water: {
        target_amount: 4,
        mon: 1,
        tues: 1,
        wed: 1,
        thurs: 0,
        fri: 0,
        weekly_count: 12,
      },
      break_from_screen: {
        target_amount: 3,
        mon: 0,
        tues: 1,
        wed: 1,
        thurs: 0,
        fri: 0,
        weekly_count: 6,
      },
      stretch: {
        target_amount: 3,
        mon: 1,
        tues: 1,
        wed: 1,
        thurs: 0,
        fri: 0,
        weekly_count: 9,
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
    last_visited: 8,
  },
  {
    username: "philip",
    // password: "philip",
    password_digest:
      "$2a$10$cX2K8p9oat9RO5dj2F4VduhN06J6qlH1M6q/v39pFh76kD/SO208q",
    org: "Noahs_Arg",
    tracked_habits: {
      drink_water: {
        target_amount: 3,
        mon: 0,
        tues: 1,
        wed: 1,
        thurs: 0,
        fri: 0,
        weekly_count: 6,
      },
      break_from_screen: {
        target_amount: 3,
        mon: 1,
        tues: 1,
        wed: 1,
        thurs: 0,
        fri: 0,
        weekly_count: 9,
      },
      stretch: {
        target_amount: 4,
        mon: 1,
        tues: 0,
        wed: 1,
        thurs: 0,
        fri: 0,
        weekly_count: 8,
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
        current: 1,
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
    last_visited: 7,
  },
  {
    username: "bojin",
    // password: "bojin",
    password_digest:
      "$2a$10$fxXsRktC6JsMsas1RfcQY.uFFg/jAKNPnYjXnYIA/otPJrwkLq0bq",
    org: "Noahs_Arg",
    tracked_habits: {
      drink_water: {
        target_amount: 3,
        mon: 0,
        tues: 0,
        wed: 0,
        thurs: 0,
        fri: 0,
        weekly_count: 0,
      },
      break_from_screen: {
        target_amount: 4,
        mon: 1,
        tues: 0,
        wed: 0,
        thurs: 0,
        fri: 0,
        weekly_count: 4,
      },
      stretch: {
        target_amount: 3,
        mon: 1,
        tues: 1,
        wed: 1,
        thurs: 0,
        fri: 0,
        weekly_count: 9,
      },
    },
    streaks: {
      drink_water: {
        highest: 6,
        current: 0,
      },
      break_from_screen: {
        highest: 8,
        current: 0,
      },
      stretch: {
        highest: 3,
        current: 3,
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
    last_visited: 6,
  },
]);
