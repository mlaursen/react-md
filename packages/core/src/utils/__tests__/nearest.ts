import { describe, expect, it } from "@jest/globals";

import { nearest } from "../nearest.js";

describe("nearest", () => {
  it("should round correctly", () => {
    expect(nearest({ value: 1, min: 0, max: 1, steps: 1 })).toBe(1);
    expect(nearest({ value: 0, min: 0, max: 100, steps: 100 })).toBe(0);

    expect(nearest({ value: 28, min: 0, max: 100, steps: 10 })).toBe(30);
    expect(nearest({ value: 28.7, min: 0, max: 100, steps: 10 })).toBe(30);
    expect(nearest({ value: 28.3, min: 0, max: 100, steps: 100 })).toBe(28);
    expect(nearest({ value: 28.7, min: 0, max: 100, steps: 100 })).toBe(29);

    expect(nearest({ value: 2.75, min: 0, max: 10, steps: 10 })).toBe(3);
    expect(nearest({ value: 5.12, min: 5, max: 6, steps: 10 })).toBe(5.1);
    expect(nearest({ value: 0.06, min: 0, max: 1, steps: 10 })).toBe(0.1);

    expect(nearest({ value: 0.12, min: 0, max: 1, steps: 4 })).toBe(0);
    expect(nearest({ value: 0.13, min: 0, max: 1, steps: 4 })).toBe(0.25);
    expect(nearest({ value: 0.24, min: 0, max: 1, steps: 4 })).toBe(0.25);
    expect(nearest({ value: 0.28, min: 0, max: 1, steps: 4 })).toBe(0.25);
    expect(nearest({ value: 0.33, min: 0, max: 1, steps: 4 })).toBe(0.25);
  });

  it("should allow for a custom range to be used with range sliders", () => {
    // to explain this a bit better, need to make sure that the slider thumbs
    // are always in order of `min -> max` so the min and max values change
    // depending on which thumb is being dragged:
    // - thumb1 -> min === min, max === thumb2Value
    // - thumb2 -> min === thumb1Value, max === max

    expect(
      nearest({ value: 44.3, min: 40, max: 100, steps: 100, range: 100 })
    ).toBe(44);
    expect(nearest({ value: 50, min: 20, max: 50, steps: 50, range: 50 })).toBe(
      50
    );
    expect(
      nearest({ value: 22.3, min: 20, max: 50, steps: 50, range: 50 })
    ).toBe(22);
    expect(
      nearest({ value: 12.3, min: 20, max: 50, steps: 50, range: 50 })
    ).toBe(20);
    expect(
      nearest({ value: 0, min: 30, max: 50, steps: 100, range: 100 })
    ).toBe(30);

    // it's possible for the value to be larger than the min or max for range
    // sliders now that it supports a "current drag value" vs _real_ value
    const min = 100;
    const max = 10000;
    const range = max - min;
    const steps = range;
    const minValue = 2000;
    const maxValue = 8000;
    expect(nearest({ value: 10000, min, max: maxValue, steps, range })).toBe(
      maxValue
    );
    expect(nearest({ value: 0, min: minValue, max, steps, range })).toBe(
      minValue
    );
  });

  it("should just return the min/max value if they are equal to support range sliders that have values one step apart", () => {
    expect(
      nearest({
        min: 100,
        max: 100,
        steps: 0,
        value: 100,
      })
    ).toBe(100);

    expect(
      nearest({
        min: 100,
        max: 100,
        steps: 0,
        value: 103,
      })
    ).toBe(100);
  });
});
