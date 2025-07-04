import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";

import { throttle } from "../throttle.js";

describe("throttle", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should call the function immediately on first call", () => {
    const fn = jest.fn();
    const throttled = throttle(fn, 100);
    throttled(1);
    expect(fn).toHaveBeenCalledWith(1);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("should throttle subsequent calls within wait period", () => {
    const fn = jest.fn();
    const throttled = throttle(fn, 100);
    throttled(1);
    throttled(2);
    expect(fn).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenLastCalledWith(2);
  });

  it("should call function again after wait period", () => {
    const fn = jest.fn();
    const throttled = throttle(fn, 100);
    throttled(1);
    jest.advanceTimersByTime(100);
    throttled(2);
    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenLastCalledWith(2);
  });

  it("should cancel prevents pending call", () => {
    const fn = jest.fn();
    const throttled = throttle(fn, 100);
    throttled(1);
    throttled(2);
    throttled.cancel();
    jest.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
