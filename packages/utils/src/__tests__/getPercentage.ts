import { getPercentage } from "../getPercentage";

describe("getPercentage", () => {
  it("should throw a RangeError if the min is greater than the max", () => {
    const expected = new RangeError(
      "A range must have the min value less than the max value"
    );
    expect(() => getPercentage(0, -100, 0)).toThrow(expected);
    expect(() => getPercentage(0, 0, 0)).toThrow(expected);
    expect(() => getPercentage(0, -100, 20)).toThrow(expected);
    expect(() => getPercentage(0, 0, 20)).toThrow(expected);
  });

  it("should throw a RangeError if the value is not between the min anx max", () => {
    const expected = new RangeError(
      "A value must be between the min and max values"
    );
    expect(() => getPercentage(0, 100, -1)).toThrow(expected);
    expect(() => getPercentage(0, 1, -1)).toThrow(expected);
    expect(() => getPercentage(0, 1, -0.5)).toThrow(expected);
  });

  it("should return the value as a decimal between 0 and 1 representing the current percentage", () => {
    expect(getPercentage(0, 100, 20)).toBe(0.2);
    expect(getPercentage(0, 10, 3)).toBe(0.3);
    expect(getPercentage(0, 1, 0.5)).toBe(0.5);
  });

  it("should always return a positive percentage", () => {
    expect(getPercentage(-100, 0, -20)).toBe(0.8);
    expect(getPercentage(-10, 0, -3)).toBe(0.7);
    expect(getPercentage(-1, 0, -0.5)).toBe(0.5);

    expect(getPercentage(-100, 100, 0)).toBe(0.5);
    expect(getPercentage(-100, 0, 0)).toBe(1);
    expect(getPercentage(-100, 0, -25)).toBe(0.75);
  });
});
