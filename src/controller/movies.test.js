const request = require("supertest");

describe("Test GET method", () => {
  it("Should return all movies", async () => {
    return request("http://localhost:3000")
      .get("/movies")
      .expect(200)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).not.toBeNull();
      });
  });
  it(`Should returns a movie from OMDb api`, async (done) => {
    await request("http://www.omdbapi.com/?apikey=b193ae4c")
      .get("&s=starwars")
      .expect(200)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body.Search[0].Title).toBe("Starwars: Goretech");
      });
    done();
  });
});
