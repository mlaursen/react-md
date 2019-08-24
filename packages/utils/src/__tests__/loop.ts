import loop from "../loop";

describe("loop", () => {
  it("should increase the number by 1 when the number is less than or equal to the max number", () => {
    expect(loop(0, 3, true)).toBe(1);
    expect(loop(0, 1, true)).toBe(1);
    expect(loop(1, 100, true)).toBe(2);
  });

  it("should decrease the number by 1 when the number is greater than 0", () => {
    expect(loop(1, 3, false)).toBe(0);
    expect(loop(1, 1, false)).toBe(0);
    expect(loop(100, 100, false)).toBe(99);
  });

  it("should correctly loop around to 0 when the number is the max value and incrementing", () => {
    expect(loop(100, 100, true)).toBe(0);
    expect(loop(1, 1, true)).toBe(0);
    expect(loop(20, 20, true)).toBe(0);
  });

  it("should correctly loop around to the max value when the number is 0 and decrementing", () => {
    expect(loop(0, 100, false)).toBe(100);
    expect(loop(0, 1, false)).toBe(1);
    expect(loop(0, 20, false)).toBe(20);
  });

  it("should only keep the number between 0 and the max value if the minmax arg is enabled", () => {
    expect(loop(-1, 20, true, true)).toBe(0);
    expect(loop(-1, 20, false, true)).toBe(0);
    expect(loop(100, 20, true, true)).toBe(20);
    expect(loop(100, 20, false, true)).toBe(20);
  });
});
