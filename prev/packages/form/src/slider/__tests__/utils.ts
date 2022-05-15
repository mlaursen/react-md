import { getSteps, getJumpValue } from "../utils";

describe("getSteps", () => {
  it("should work as expected", () => {
    expect(getSteps(0, 100, 1)).toBe(100);
    expect(getSteps(0, 100, 10)).toBe(10);
    expect(getSteps(0, 10, 1)).toBe(10);
    expect(getSteps(0, 100, 10)).toBe(10);
    expect(getSteps(-10, 10, 1)).toBe(20);
    expect(getSteps(-10, 10, 0.5)).toBe(40);
    expect(getSteps(0.1, 0.9, 0.05)).toBe(16);
  });
});

describe("getJumpValue", () => {
  it("should default to jumping by 1/10 of the number of steps in the range", () => {
    expect(getJumpValue(0, 100, 1, undefined)).toBe(10);
    expect(getJumpValue(0, 50, 1, undefined)).toBe(5);
    expect(getJumpValue(-10, 10, 1, undefined)).toBe(2);

    expect(getJumpValue(0, 0.5, 0.05, undefined)).toBe(0.05);
    expect(getJumpValue(0, 1, 0.05, undefined)).toBe(0.1);
  });

  it("should allow for a provided jump value", () => {
    expect(getJumpValue(0, 100, 1, 15)).toBe(15);
    expect(getJumpValue(0, 100, 1, 10)).toBe(10);
    expect(getJumpValue(-10, 10, 1, 10)).toBe(10);
  });
});
