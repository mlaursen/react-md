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
});
