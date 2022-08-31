import { describe, expect, test } from "@jest/globals";
import { typeCastSignatureArgs } from "./contract";

describe("typeCastSignatureArgs", () => {
  test("String", () => {
    const output = typeCastSignatureArgs("mint(string)", ["test"]);
    expect(output[0]).toBe("test");
  });

  test("Unsigned Integers", () => {
    const output = typeCastSignatureArgs("burn(uint256)", ["15"]);
    expect(output[0]).toBe(15);
  });

  test("Booleans", () => {
    const output = typeCastSignatureArgs("example(bool,bool)", [
      "true",
      "false"
    ]);
    expect(output[0]).toBe(true);
    expect(output[1]).toBe(false);
  });
});
