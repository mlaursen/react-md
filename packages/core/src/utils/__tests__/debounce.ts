import { describe, expect, it, vi } from "vitest";

import { debounce } from "../debounce.js";

vi.useFakeTimers();

describe("debounce", () => {
  it("should call the function only once if invoked rapidly", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced();
    debounced();
    debounced();

    vi.advanceTimersByTime(99);
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("should call the function after the specified delay", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 200);

    debounced("a", 1);
    vi.advanceTimersByTime(200);

    expect(fn).toHaveBeenCalledWith("a", 1);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("should cancel prevents the function from being called", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced();
    debounced.cancel();

    vi.advanceTimersByTime(100);
    expect(fn).not.toHaveBeenCalled();
  });
});
