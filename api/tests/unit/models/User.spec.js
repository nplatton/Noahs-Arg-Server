// const User = require("../../../models/User");

// // const { init } = require("../../../dbConfig/config");
// // jest.mock("../../../dbConfig/config");

// const init = jest.fn();

// describe("User", () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   afterAll(() => {
//     jest.resetAllMocks();
//   });

//   describe("all", () => {
//     test("it resolves with org users on successful db query", async () => {
//       // jest.setTimeout(async () => {
//       const db = jest.fn().mockReturnThis();
//       const collection = jest.fn();
//       const users = { db: jest.fn().mockReturnThis(), collection: jest.fn() };
//       const cursor = {};
//       console.log(db);
//       jest.spyOn(db, "collection").mockResolvedValueOnce(users);
//       jest.spyOn(users, "find").mockResolvedValueOnce(cursor);
//       jest.spyOn(cursor, "toArray").mockResolvedValueOnce([{}, {}, {}]);
//       const all = await User.all("test_org");
//       expect(all).toHaveLength(3);
//       // }, 10000);
//     });
//   });
// });

const { MongoClient } = require("mongodb");

describe("insert", () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db(global.__MONGO_DB_NAME__);
  });

  afterAll(async () => {
    await connection.close();
    await db.close();
  });

  it("should insert a doc into collection", async () => {
    const users = db.collection("users");

    const mockUser = { _id: "some-user-id", name: "John" };
    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({ _id: "some-user-id" });
    expect(insertedUser).toEqual(mockUser);
  });
});
