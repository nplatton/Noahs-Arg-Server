const User = require("../../../models/User");

const init = jest.fn();

describe("User", () => {
  let db;
  beforeEach(() => {
    jest.clearAllMocks();
    db = init();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe("all", () => {
    test("it resolves with org users on successful db query", async () => {
      // const users = { db: jest.fn().mockReturnThis(), collection: jest.fn() };
      // const cursor = {};
      // jest.spyOn(db, "collection").mockResolvedValueOnce(users);
      // jest.spyOn(users, "find").mockResolvedValueOnce(cursor);
      // jest.spyOn(cursor, "toArray").mockResolvedValueOnce([{}, {}, {}]);
      // const all = await User.all("test_org");
      // expect(all).toHaveLength(3);
    });
  });
});
