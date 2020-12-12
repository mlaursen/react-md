import { nearest } from "../nearest";

describe("nearest", () => {
  it("should round correctly", () => {
    expect(nearest(1, 0, 1, 1)).toBe(1);
    expect(nearest(0, 0, 100, 100)).toBe(0);

    expect(nearest(28, 0, 100, 10)).toBe(30);
    expect(nearest(28.7, 0, 100, 10)).toBe(30);
    expect(nearest(28.3, 0, 100, 100)).toBe(28);
    expect(nearest(28.7, 0, 100, 100)).toBe(29);

    expect(nearest(2.75, 0, 10, 10)).toBe(3);
    expect(nearest(5.12, 5, 6, 10)).toBe(5.1);
    expect(nearest(0.06, 0, 1, 10)).toBe(0.1);

    expect(nearest(0.12, 0, 1, 4)).toBe(0);
    expect(nearest(0.13, 0, 1, 4)).toBe(0.25);
    expect(nearest(0.24, 0, 1, 4)).toBe(0.25);
    expect(nearest(0.28, 0, 1, 4)).toBe(0.25);
    expect(nearest(0.33, 0, 1, 4)).toBe(0.25);
  });

  it("should allow for a custom range to be used with range sliders", () => {
    // to explain this a bit better, need to make sure that the slider thumbs
    // are always in order of `min -> max` so the min and max values change
    // depending on which thumb is being dragged:
    // - thumb1 -> min === min, max === thumb2Value
    // - thumb2 -> min === thumb1Value, max === max

    expect(nearest(44.3, 40, 100, 100, 100)).toBe(44);
    expect(nearest(50, 20, 50, 50, 50)).toBe(50);
    expect(nearest(22.3, 20, 50, 50, 50)).toBe(22);
    expect(nearest(12.3, 20, 50, 50, 50)).toBe(20);
    expect(nearest(0, 30, 50, 100, 100)).toBe(30);

    // it's possible for the value to be larger than the min or max for range
    // sliders now that it supports a "current drag value" vs _real_ value
    const min = 100;
    const max = 10000;
    const range = max - min;
    const steps = range;
    const minValue = 2000;
    const maxValue = 8000;
    expect(nearest(10000, min, maxValue, steps, range)).toBe(maxValue);
    expect(nearest(0, minValue, max, steps, range)).toBe(minValue);
  });
});
