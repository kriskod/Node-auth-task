describe("Test accesibility to Database", function () {
  it("Should GET movies from db", function () {
    cy.request("http://localhost:3000/movies").then((res) => {
      expect(res.status).to.eq(200);
      assert.isObject(res, "value is object");
    });
  });
  it("Should POST movie to db", function () {});
});
