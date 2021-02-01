const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_USER, MONGO_PASSWORD } = process.env;

describe("insert", () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(
      `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@moviesdb.w5jju.mongodb.net/<dbname>?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
      }
    );
    db = await connection.db("<dbname>");
  });

  it("Should get movies from db", async () => {
    const movies = db.collection("movies");
    expect(movies).not.toBeNull();
  });
  afterAll(async () => {
    await connection.close();
    await db.close();
  });
});
