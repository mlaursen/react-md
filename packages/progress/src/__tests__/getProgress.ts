import getProgress from "../getProgress";

describe("getProgress", () => {
  it("should throw a RangeError if the min is greater than the max", () => {
    const expected = new RangeError(
      "A progress range must have the min value less than the max value"
    );
    expect(() => getProgress(0, -100)).toThrow(expected);
    expect(() => getProgress(0, 0)).toThrow(expected);
    expect(() => getProgress(0, -100, undefined)).toThrow(expected);
    expect(() => getProgress(0, 0, undefined)).toThrow(expected);
    expect(() => getProgress(0, -100, 20)).toThrow(expected);
    expect(() => getProgress(0, 0, 20)).toThrow(expected);
  });

  it("should throw a RangeError if the value is not between the min anx max", () => {
    const expected = new RangeError(
      "A progress value must be between the min and max values"
    );
    expect(() => getProgress(0, 100, -1)).toThrow(expected);
    expect(() => getProgress(0, 1, -1)).toThrow(expected);
    expect(() => getProgress(0, 1, -0.5)).toThrow(expected);
  });

  it("should return undefined if no value is provided", () => {
    expect(getProgress(0, 100)).toBe(undefined);
    expect(getProgress(0, 100, undefined)).toBe(undefined);
  });

  it("should return the value as a decimal between 0 and 1 representing the current percentage", () => {
    expect(getProgress(0, 100, 20)).toBe(0.2);
    expect(getProgress(0, 10, 3)).toBe(0.3);
    expect(getProgress(0, 1, 0.5)).toBe(0.5);
  });

  it("should always return a positive percentage", () => {
    expect(getProgress(-100, 0, -20)).toBe(0.2);
    expect(getProgress(-10, 0, -3)).toBe(0.3);
    expect(getProgress(-1, 0, -0.5)).toBe(0.5);
  });
});
