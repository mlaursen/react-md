import { describe, expect, it } from "@jest/globals";
import { getMiddleOfRange } from "../getMiddleOfRange.js";

describe("getMiddleOfRange", () => {
  it("should return the middle of the range", async () => {
    expect(getMiddleOfRange({ min: 0, max: 100, step: 1 })).toBe(50);
    expect(getMiddleOfRange({ min: 0, max: 100, step: 2 })).toBe(50);
    expect(getMiddleOfRange({ min: 0, max: 100, step: 5 })).toBe(50);

    expect(getMiddleOfRange({ min: 30, max: 80, step: 1 })).toBe(55);
  });
});
