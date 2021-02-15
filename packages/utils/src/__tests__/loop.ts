import { loop } from "../loop";

describe("loop", () => {
  it("should increase the number by 1 when the number is less than or equal to the max number", () => {
    expect(loop({ value: 0, max: 3, increment: true })).toBe(1);
    expect(loop({ value: 0, max: 1, increment: true })).toBe(1);
    expect(loop({ value: 1, max: 100, increment: true })).toBe(2);
  });

  it("should decrease the number by 1 when the number is greater than 0", () => {
    expect(loop({ value: 1, max: 3, increment: false })).toBe(0);
    expect(loop({ value: 1, max: 1, increment: false })).toBe(0);
    expect(loop({ value: 100, max: 100, increment: false })).toBe(99);
  });

  it("should correctly loop around to 0 when the number is the max value and incrementing", () => {
    expect(loop({ value: 100, max: 100, increment: true })).toBe(0);
    expect(loop({ value: 1, max: 1, increment: true })).toBe(0);
    expect(loop({ value: 20, max: 20, increment: true })).toBe(0);
  });

  it("should correctly loop around to the max value when the number is 0 and decrementing", () => {
    expect(loop({ value: 0, max: 100, increment: false })).toBe(100);
    expect(loop({ value: 0, max: 1, increment: false })).toBe(1);
    expect(loop({ value: 0, max: 20, increment: false })).toBe(20);
  });

  it("should only keep the number between 0 and the max value if the minmax arg is enabled", () => {
    expect(loop({ value: -1, max: 20, increment: true, minmax: true })).toBe(0);
    expect(loop({ value: -1, max: 20, increment: false, minmax: true })).toBe(
      0
    );
    expect(loop({ value: 100, max: 20, increment: true, minmax: true })).toBe(
      20
    );
    expect(loop({ value: 100, max: 20, increment: false, minmax: true })).toBe(
      20
    );
  });

  it("should allow for a custom min value", () => {
    expect(loop({ value: 0, min: 1, max: 10, increment: false })).toBe(10);
    expect(loop({ value: 0, min: -10, max: 10, increment: false })).toBe(-1);
    expect(loop({ value: -10, min: -10, max: 10, increment: false })).toBe(10);

    // defaults to 0
    expect(loop({ value: 0, max: 10, increment: false })).toBe(10);
  });
});
