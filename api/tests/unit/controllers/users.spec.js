const usersController = require("../../../controllers/users");
const User = require("../../../models/User");

const dayjs = require("./mockDayJS");

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn((code) => ({
  send: mockSend,
  json: mockJson,
  end: jest.fn(),
}));
const mockRes = { status: mockStatus };

describe("usersController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe("Index", () => {
    test("it returns users of org with 200 status code", async () => {
      const testUsers = ["User1", "User2"];
      jest.spyOn(User, "all").mockResolvedValue(testUsers);
      const mockReq = { params: { orgName: "Test_Org" } };
      await usersController.index(mockReq, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(testUsers);
    });
    test("it responds with code 404 in case of error", async () => {
      jest.spyOn(User, "all").mockImplementation(() => {
        throw new Error();
      });
      const mockReq = { params: { orgName: "Test_Org" } };
      await usersController.index(mockReq, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(404);
    });
  });

  describe("Show", () => {
    test("it returns a user with status code 200", async () => {
      const testUser = {
        id: 1,
        username: "tester",
        org: "Test_Org",
        tracked_habits: {},
        streaks: {},
        last_visited: 9,
      };
      jest.spyOn(User, "findByUsername").mockResolvedValue(new User(testUser));
      const mockReq = { params: { username: "tester" } };
      await usersController.show(mockReq, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(new User(testUser));
    });
    test("it responds with code 404 in case of error", async () => {
      jest.spyOn(User, "findByUsername").mockImplementation(() => {
        throw new Error();
      });
      const mockReq = { params: { username: "tester" } };
      await usersController.show(mockReq, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(404);
    });
  });

  describe("create", () => {
    test("it returns new user data with 201 status code", async () => {
      const testUser = {
        id: 1,
        username: "tester",
        org: "Test_Org",
        tracked_habits: {},
        streaks: {},
        last_visited: 9,
      };
      jest
        .spyOn(User, "create")
        .mockResolvedValue(new User({ ...testUser, id: 1 }));
      const mockReq = { body: testUser };
      await usersController.create(mockReq, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(201);
      expect(mockJson).toHaveBeenCalledWith(new User({ ...testUser, id: 1 }));
    });
    test("it responds with code 500 in case of error", async () => {
      const testUser = {
        id: 1,
        username: "tester",
        org: "Test_Org",
        tracked_habits: {},
        streaks: {},
        last_visited: 9,
      };
      jest.spyOn(User, "create").mockImplementation(() => {
        throw new Error();
      });
      const mockReq = { body: testUser };
      await usersController.create(mockReq, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(500);
    });
  });

  describe("getAllHabits", () => {
    test("it returns user habits with 200 status code", async () => {
      const testUser = {
        id: 1,
        username: "tester",
        org: "Test_Org",
        tracked_habits: {
          testHabit1: {},
          testHabit2: {},
        },
        streaks: {},
        last_visited: 9,
      };
      jest.spyOn(User, "findByUsername").mockResolvedValue(new User(testUser));
      const mockReq = { params: { username: "tester" } };
      await usersController.getAllHabits(mockReq, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(new User(testUser).tracked_habits);
    });
    // test("it responds with code 500 in case of error", async () => {
    //   jest.spyOn(User, "findByUsername").mockImplementation(() => {
    //     throw new Error();
    //   });
    //   const mockReq = { params: { username: "tester" } };
    //   await usersController.getAllHabits(mockReq, mockRes);
    //   expect(mockStatus).toHaveBeenCalledWith(404);
    // });
  });

  describe("updateHabits", () => {
    test("it returns updated user with status code 200", async () => {
      const testUser = {
        id: 1,
        username: "tester",
        org: "Test_Org",
        tracked_habits: {
          testHabit1: {},
          testHabit2: {},
        },
        streaks: {},
        last_visited: 9,
      };
      jest
        .spyOn(User.prototype, "createHabits")
        .mockResolvedValue(new User(testUser));
      const mockReq = {
        body: { testHabit1: {}, testHabit2: {} },
        params: { username: "tester" },
      };
      await usersController.updateHabits(mockReq, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(
        new User({
          ...testUser,
          tracked_habits: {
            testHabit1: {},
            testHabit2: {},
          },
        })
      );
    });
    // test("it responds with code 500 in case of error", async () => {
    //   jest.spyOn(User, "findByUsername").mockImplementation(() => {
    //     throw new Error();
    //   });
    //   const mockReq = {
    //     body: { testHabit1: {}, testHabit2: {} },
    //     params: { username: "tester" },
    //   };
    //   await usersController.updateHabits(mockReq, mockRes);
    //   expect(mockStatus).toHaveBeenCalledWith(500);
    // });
  });

  describe("updateSingleHabit", () => {
    test("it returns 200 status code on success", async () => {
      const testUser = {
        id: 1,
        username: "tester",
        org: "Test_Org",
        tracked_habits: {
          testHabit1: {
            target_amount: 1,
            mon: 1,
            tues: 1,
            wed: 1,
            thurs: 0,
            fri: 0,
            weekly_count: 10,
          },
        },
        streaks: {},
        last_visited: 9,
      };
      jest
        .spyOn(User.prototype, "incrementHabit")
        .mockResolvedValue(new User(testUser));
      const mockReq = {
        body: { dayOfWeek: "wed" },
        params: { username: "tester", habit: "testHabit1" },
      };
      await usersController.updateSingleHabit(mockReq, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith("Habit Updated");
    });
    test("it responds with code 500 in case of error", async () => {
      jest.spyOn(User, "findByUsername").mockImplementation(() => {
        throw new Error();
      });
      const mockReq = {
        body: { dayOfWeek: "wed" },
        params: { username: "tester", habit: "testHabit1" },
      };
      await usersController.updateSingleHabit(mockReq, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(500);
    });
  });

  describe("clearHabits", () => {
    test("it responds with status code 204 when diff!=0", async () => {
      const testUser = {
        id: 1,
        username: "tester",
        org: "Test_Org",
        tracked_habits: {},
        streaks: {},
        last_visited: 8,
      };
      jest.spyOn(User, "findByUsername").mockResolvedValue(new User(testUser));
      jest
        .spyOn(User.prototype, "destroyHabits")
        .mockResolvedValue("Tracked Habits Cleared");
      jest
        .spyOn(User.prototype, "updateLastVisited")
        .mockResolvedValue("Week Updated");
      const mockReq = { params: { username: "tester" } };
      await usersController.clearHabits(mockReq, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(204);
    });
    test("it responds with status code 200 when diff=0", async () => {
      const testUser = {
        id: 1,
        username: "tester",
        org: "Test_Org",
        tracked_habits: {},
        streaks: {},
        last_visited: 9,
      };
      jest.spyOn(User, "findByUsername").mockResolvedValue(new User(testUser));
      const mockReq = { params: { username: "tester" } };
      await usersController.clearHabits(mockReq, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(200);
    });
    test("it responds with code 500 in case of error", async () => {
      jest.spyOn(User, "findByUsername").mockImplementation(() => {
        throw new Error();
      });
      const mockReq = { params: { username: "tester" } };
      await usersController.clearHabits(mockReq, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(500);
    });
  });
});
