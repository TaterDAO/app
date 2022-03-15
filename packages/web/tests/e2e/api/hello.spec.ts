// tests/api/hello.spec.ts

describe("/api/hello", () => {
  describe("GET", () => {
    it("200", () => {
      cy.request("http://localhost:3000/api/hello", {
        method: "GET"
      }).should((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("msg", "Hello World");
      });
    });
  });
});
