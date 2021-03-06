const { MongoClient } = require("mongodb");

describe("insert", () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(
      `mongodb+srv://admin:@dm1n@moviesdb.w5jju.mongodb.net/<dbname>?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
      },
      { useUnifiedTopology: true }
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
