const db = connect("mongodb://localhost:27017/habits");

db.users.drop();

db.users.insertMany([
  {
    name: "noah",
    // Password: noah
    password_digest:
      "$2a$10$4EAIUWYfI8NC4hSUDyu2R.bGW.zyfKfebOQL6QC6H39VQGK6Reke2",
    org: "Noahs Arg",
    habits: {
      drink_water: {
        target_amount: 4,
        dailyCount: 4,
        weeklyCount: 15,
        streak: 8,
        recentStreak: 8,
        highestStreak: 8,
      },
      break_from_screen: {
        target_amount: 3,
        dailyCount: 2,
        weeklyCount: 10,
        streak: 2,
        recentStreak: 3,
        highestStreak: 3,
      },
      stretch: {
        target_amount: 3,
        dailyCount: 0,
        weeklyCount: 12,
        streak: 1,
        recentStreak: 4,
        highestStreak: 6,
      },
    },
  },
  {
    name: "philip",
    // Password: philip
    password_digest:
      "$2a$10$cX2K8p9oat9RO5dj2F4VduhN06J6qlH1M6q/v39pFh76kD/SO208q",
    org: "Noahs Arg",
    habits: {
      drink_water: {
        target_amount: 3,
        dailyCount: 2,
        weeklyCount: 10,
        streak: 2,
        recentStreak: 3,
        highestStreak: 3,
      },
      break_from_screen: {
        target_amount: 3,
        dailyCount: 0,
        weeklyCount: 12,
        streak: 1,
        recentStreak: 4,
        highestStreak: 6,
      },
      stretch: {
        target_amount: 4,
        dailyCount: 4,
        weeklyCount: 15,
        streak: 8,
        recentStreak: 8,
        highestStreak: 8,
      },
    },
  },
  {
    name: "bojin",
    // Password: bojin
    password_digest:
      "$2a$10$fxXsRktC6JsMsas1RfcQY.uFFg/jAKNPnYjXnYIA/otPJrwkLq0bq",
    org: "Noahs Arg",
    habits: {
      drink_water: {
        target_amount: 3,
        dailyCount: 0,
        weeklyCount: 12,
        streak: 1,
        recentStreak: 4,
        highestStreak: 6,
      },
      break_from_screen: {
        target_amount: 4,
        dailyCount: 4,
        weeklyCount: 15,
        streak: 8,
        recentStreak: 8,
        highestStreak: 8,
      },
      stretch: {
        target_amount: 3,
        dailyCount: 2,
        weeklyCount: 10,
        streak: 2,
        recentStreak: 3,
        highestStreak: 3,
      },
    },
  },
]);
