"use strict";

describe("Test node running properly", function () {
  it("Should exec command and run node", function () {
    cy.exec("docker-compose up").its("stdout").should("contain", "auth svc running at port 3000");
  });
});