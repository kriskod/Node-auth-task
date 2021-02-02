const request = require("supertest");

describe("Test GET method", () => {
  it("Should return all movies", () => {
    return request("http://localhost:3000")
      .get("/movies")
      .expect(200)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).not.toBeNull();
        expect(response.body.movies[0].Title).toBe("Lupin");
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

  it(`test POST method`, async (done) => {
    const user = {
      username: "basic-thomas",
      password: "sR-_pcoow-27-6PAwCD8",
    };
    try {
      await request("http://localhost:3000")
        .post("/auth")
        .send(user)
        .expect(200)
        .then((response) => {
          expect(response.status).toBe(200);
          expect(response.body.token).not.toBeNull;
        });
      done();
    } catch (error) {
      console.log(error);
    }
  });
});
