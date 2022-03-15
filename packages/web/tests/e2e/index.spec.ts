// tests/index.spec.ts

describe("Renders", () => {
  before(() => {
    cy.visit("http://localhost:3000/");
  });

  it("Renders", () => {
    cy.get("h1").contains("Hello World");
  });
});
