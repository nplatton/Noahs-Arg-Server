require("dotenv").config();

const { MongoClient } = require("mongodb");

const connectionUrl = process.env.DB_MONGODB_URI;
const dbName = "habits";

const init = async () => {
  let client = await MongoClient.connect(connectionUrl);
  console.log(`Connected to database ${dbName}.`);
  return client.db(dbName);
};

module.exports = { init };
