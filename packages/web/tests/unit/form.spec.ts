import { expect } from "chai";
import { escapeQuotes } from "../../src/utils/form";

const testString = `This ‘bnb listing is too good to not make a Tater out of it.  From the listing "If you love the fluffy feeling you get when you eat Idaho potatoes, you’ll love staying in a giant potato turned cozy, “grown-up” getaway for two!`;

describe("Form Utilities", () => {
  describe("escapeQuotes", () => {
    it("Escapes double quotes", () => {
      expect(escapeQuotes(testString)).not.to.contain(`"`);
    });

    it("Escapes left single quotation mark", () => {
      expect(escapeQuotes(testString)).not.to.contain(`‘`);
    });

    it("Escapes right single quotation mark", () => {
      expect(escapeQuotes(testString)).not.to.contain(`’`);
    });

    it("Escapes left double quotation mark", () => {
      expect(escapeQuotes(testString)).not.to.contain(`“`);
    });

    it("Escapes right double quotation mark", () => {
      expect(escapeQuotes(testString)).not.to.contain(`”`);
    });
  });
});
