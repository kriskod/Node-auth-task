describe("Test user account", function () {
  it("Should login an user", function () {
    cy.request({
      method: "POST",
      url: "/user/register",
      form: true,
      body: {
        username: "basic-thomas",
        password: "GBLtTyq3E_UNjFnpo9m6",
      },
    });
    cy.getCookie("cypress-session-cookie").should("exist");
  });
  it("Has invalid username", function () {});
  it("Has invalid password", function () {});
});
