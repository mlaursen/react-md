import { act, renderHook } from "@testing-library/react-hooks";
import { mocked } from "ts-jest/utils";

import { useTimeout } from "../useTimeout";

jest.useFakeTimers();

const setTimeout = mocked(window.setTimeout);
const clearTimeout = mocked(window.clearTimeout);

afterEach(() => {
  jest.clearAllMocks();
  jest.clearAllTimers();
});

describe("useTimeout", () => {
  it("should automatically clear the timeout once completed", () => {
    const cb = jest.fn();
    const { result } = renderHook(() => useTimeout(cb, 300));

    const [start] = result.current;
    expect(cb).not.toBeCalled();
    expect(setTimeout).toBeCalledTimes(1);
    expect(clearTimeout).not.toBeCalled();

    act(() => {
      start();
    });

    expect(setTimeout).toBeCalledTimes(2);
    expect(setTimeout).toBeCalledWith(expect.any(Function), 300);
    expect(clearTimeout).not.toBeCalled();
    expect(cb).not.toBeCalled();

    act(() => {
      jest.runAllTimers();
    });
    expect(cb).toBeCalled();
    expect(clearTimeout).toBeCalled();
  });

  it("should be able to stop a timer before it has completed", () => {
    const cb = jest.fn();
    const { result } = renderHook(() => useTimeout(cb, 300));

    const [start, stop] = result.current;
    act(() => {
      start();
    });

    expect(cb).not.toBeCalled();
    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(cb).not.toBeCalled();

    act(() => {
      stop();
    });
    expect(cb).not.toBeCalled();

    act(() => {
      jest.runAllTimers();
    });
    expect(cb).not.toBeCalled();
  });

  it("should be able to restart a timer before it has completed", () => {
    const cb = jest.fn();
    const { result } = renderHook(() => useTimeout(cb, 300));

    const [start, , restart] = result.current;
    act(() => {
      start();
    });

    expect(cb).not.toBeCalled();
    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(cb).not.toBeCalled();

    act(() => {
      restart();
    });
    expect(cb).not.toBeCalled();

    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(cb).not.toBeCalled();
  });

  it("should be able to start the timer by triggering the restart before the start", () => {
    const cb = jest.fn();
    const { result } = renderHook(() => useTimeout(cb, 300));

    const [, , restart] = result.current;
    act(() => {
      restart();
    });
    expect(setTimeout).toBeCalledWith(expect.any(Function), 300);

    act(() => {
      jest.runAllTimers();
    });
    expect(setTimeout).toBeCalledTimes(2);
  });

  it("should be able to start the timer immediately", () => {
    const cb = jest.fn();
    renderHook(() => useTimeout(cb, 300, true));

    expect(setTimeout).toBeCalledWith(expect.any(Function), 300);

    act(() => {
      jest.runAllTimers();
    });
    expect(cb).toBeCalled();
  });
});
