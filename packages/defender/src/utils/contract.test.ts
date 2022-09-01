import { describe, expect, test } from "@jest/globals";
import { typeCastSignatureArgs } from "./contract";

describe("typeCastSignatureArgs", () => {
  test("Strings", () => {
    const output = typeCastSignatureArgs("mint(string)", ["test"]);
    expect(output[0]).toBe("test");
  });

  test("Addresses", () => {
    const output = typeCastSignatureArgs("mint(address)", [
      "0xd453cb82cb70b22bbb83fe7bafb4a4144a8b9165"
    ]);
    expect(output[0]).toBe("0xd453cb82cb70b22bbb83fe7bafb4a4144a8b9165");
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
