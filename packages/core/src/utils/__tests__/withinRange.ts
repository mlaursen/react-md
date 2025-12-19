import { describe, expect, it } from "vitest";

import { withinRange } from "../withinRange.js";

describe("withinRange", () => {
  it("should return the value if the min or max values are undefined", () => {
    expect(withinRange({ value: 100, min: undefined, max: undefined })).toBe(
      100
    );
    expect(withinRange({ value: 0, min: undefined, max: undefined })).toBe(0);
    expect(withinRange({ value: -100, min: undefined, max: undefined })).toBe(
      -100
    );
  });

  it("should return the correct value based on the min and max values", () => {
    expect(withinRange({ value: 0, min: 0, max: 10 })).toBe(0);
    expect(withinRange({ value: -1, min: 0, max: 10 })).toBe(0);
    expect(withinRange({ value: -0.000_000_01, min: 0, max: 10 })).toBe(0);
    expect(withinRange({ value: 20, min: 0, max: 20 })).toBe(20);
    expect(withinRange({ value: 20, min: 0, max: 19 })).toBe(19);
    expect(withinRange({ value: 10.5, min: 10, max: 11 })).toBe(10.5);
    expect(withinRange({ value: 10.5, min: 9, max: 10 })).toBe(10);
  });
});
