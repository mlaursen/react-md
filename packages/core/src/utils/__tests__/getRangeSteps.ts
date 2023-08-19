import { describe, expect, it } from "@jest/globals";
import { getRangeSteps } from "../getRangeSteps.js";

describe("getRangeSteps", () => {
  it("should work as expected", () => {
    expect(getRangeSteps({ min: 0, max: 100, step: 1 })).toBe(100);
    expect(getRangeSteps({ min: 0, max: 100, step: 10 })).toBe(10);
    expect(getRangeSteps({ min: 0, max: 10, step: 1 })).toBe(10);
    expect(getRangeSteps({ min: 0, max: 100, step: 10 })).toBe(10);
    expect(getRangeSteps({ min: -10, max: 10, step: 1 })).toBe(20);
    expect(getRangeSteps({ min: -10, max: 10, step: 0.5 })).toBe(40);
    expect(getRangeSteps({ min: 0.1, max: 0.9, step: 0.05 })).toBe(16);
  });
});
