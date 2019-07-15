import { cleanup } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";

import useKeyboardMovement, { loop } from "../useKeyboardMovement";

afterEach(cleanup);

describe("incrementLoop", () => {
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
});

describe("useKeyboardMovement", () => {
  it("should actually have tests at some point", () => {
    const { result } = renderHook(() => useKeyboardMovement({}));
    expect(result.current).toBeInstanceOf(Function);
  });
});
