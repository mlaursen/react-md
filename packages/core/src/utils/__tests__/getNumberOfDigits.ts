import { describe, expect, it } from "vitest";

import { getNumberOfDigits } from "../getNumberOfDigits.js";

describe("getNumberOfDigits", () => {
  it("should return the correct number of digits for integers", () => {
    expect(getNumberOfDigits(0)).toBe(1);
    expect(getNumberOfDigits(-0)).toBe(1);

    expect(getNumberOfDigits(1)).toBe(1);
    expect(getNumberOfDigits(-1)).toBe(1);

    expect(getNumberOfDigits(100)).toBe(3);
    expect(getNumberOfDigits(-100)).toBe(3);

    expect(getNumberOfDigits(99)).toBe(2);
    expect(getNumberOfDigits(-99)).toBe(2);
  });

  it("should return undefined if the value is undefined", () => {
    let u: undefined;

    expect(getNumberOfDigits(u)).toBe(undefined);
  });
});
