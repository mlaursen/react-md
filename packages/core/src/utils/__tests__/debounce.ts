import { describe, expect, it, jest } from "@jest/globals";

import { debounce } from "../debounce.js";

jest.useFakeTimers();

describe("debounce", () => {
  it("should call the function only once if invoked rapidly", () => {
    const fn = jest.fn();
    const debounced = debounce(fn, 100);

    debounced();
    debounced();
    debounced();

    jest.advanceTimersByTime(99);
    expect(fn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("should call the function after the specified delay", () => {
    const fn = jest.fn();
    const debounced = debounce(fn, 200);

    debounced("a", 1);
    jest.advanceTimersByTime(200);

    expect(fn).toHaveBeenCalledWith("a", 1);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("should cancel prevents the function from being called", () => {
    const fn = jest.fn();
    const debounced = debounce(fn, 100);

    debounced();
    debounced.cancel();

    jest.advanceTimersByTime(100);
    expect(fn).not.toHaveBeenCalled();
  });
});
