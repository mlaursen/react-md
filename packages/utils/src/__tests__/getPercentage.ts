import type { GetPercentageOptions } from "../getPercentage";
import { getPercentage } from "../getPercentage";

describe("getPercentage", () => {
  it("should throw a RangeError if the min is greater than the max", () => {
    const expected = new RangeError(
      "A range must have the min value less than the max value"
    );
    const options1: GetPercentageOptions = {
      min: 0,
      max: -100,
      value: 0,
    };
    const options2: GetPercentageOptions = {
      min: 0,
      max: 0,
      value: 0,
    };
    const options3: GetPercentageOptions = {
      min: 0,
      max: -100,
      value: 20,
    };
    const options4: GetPercentageOptions = {
      min: 0,
      max: 0,
      value: 20,
    };
    expect(() => getPercentage(options1)).toThrow(expected);
    expect(() => getPercentage(options2)).toThrow(expected);
    expect(() => getPercentage(options3)).toThrow(expected);
    expect(() => getPercentage(options4)).toThrow(expected);
    expect(() => getPercentage({ ...options1, validate: false })).not.toThrow(
      expected
    );
    expect(() => getPercentage({ ...options2, validate: false })).not.toThrow(
      expected
    );
    expect(() => getPercentage({ ...options3, validate: false })).not.toThrow(
      expected
    );
    expect(() => getPercentage({ ...options4, validate: false })).not.toThrow(
      expected
    );
  });

  it("should throw a RangeError if the value is not between the min anx max", () => {
    const expected = new RangeError(
      "A value must be between the min and max values"
    );
    const options1: GetPercentageOptions = {
      min: 0,
      max: 100,
      value: -1,
    };
    const options2: GetPercentageOptions = {
      min: 0,
      max: 1,
      value: -1,
    };
    const options3: GetPercentageOptions = {
      min: 0,
      max: 1,
      value: -0.5,
    };

    expect(() => getPercentage(options1)).toThrow(expected);
    expect(() => getPercentage(options2)).toThrow(expected);
    expect(() => getPercentage(options3)).toThrow(expected);
    expect(() => getPercentage({ ...options1, validate: false })).not.toThrow(
      expected
    );
    expect(() => getPercentage({ ...options2, validate: false })).not.toThrow(
      expected
    );
    expect(() => getPercentage({ ...options3, validate: false })).not.toThrow(
      expected
    );
  });

  it("should return the value as a decimal between 0 and 1 representing the current percentage", () => {
    expect(getPercentage({ min: 0, max: 100, value: 20 })).toBe(0.2);
    expect(getPercentage({ min: 0, max: 10, value: 3 })).toBe(0.3);
    expect(getPercentage({ min: 0, max: 1, value: 0.5 })).toBe(0.5);
  });

  it("should always return a positive percentage", () => {
    expect(getPercentage({ min: -100, max: 0, value: -20 })).toBe(0.8);
    expect(getPercentage({ min: -10, max: 0, value: -3 })).toBe(0.7);
    expect(getPercentage({ min: -1, max: 0, value: -0.5 })).toBe(0.5);

    expect(getPercentage({ min: -100, max: 100, value: 0 })).toBe(0.5);
    expect(getPercentage({ min: -100, max: 0, value: 0 })).toBe(1);
    expect(getPercentage({ min: -100, max: 0, value: -25 })).toBe(0.75);
  });
});
