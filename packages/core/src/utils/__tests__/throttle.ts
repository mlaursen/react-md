import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { throttle } from "../throttle.js";

describe("throttle", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should call the function immediately on first call", () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 100);
    throttled(1);
    expect(fn).toHaveBeenCalledWith(1);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("should throttle subsequent calls within wait period", () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 100);
    throttled(1);
    throttled(2);
    expect(fn).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenLastCalledWith(2);
  });

  it("should call function again after wait period", () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 100);
    throttled(1);
    vi.advanceTimersByTime(100);
    throttled(2);
    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenLastCalledWith(2);
  });

  it("should cancel prevents pending call", () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 100);
    throttled(1);
    throttled(2);
    throttled.cancel();
    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
