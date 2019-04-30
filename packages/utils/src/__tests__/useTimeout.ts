import { mocked } from "ts-jest/utils";
import { cleanup, renderHook, act } from "react-hooks-testing-library";

import useTimeout from "../useTimeout";

jest.useFakeTimers();

const setTimeout = mocked(window.setTimeout);
const clearTimeout = mocked(window.clearTimeout);

afterEach(() => {
  jest.clearAllTimers();
  jest.clearAllMocks();
  cleanup();
});

describe("useTimeout", () => {
  it("should return an object containing start, stop, and restart functions", () => {
    const cb = jest.fn();
    const { result } = renderHook(() => useTimeout(cb, 300));
    expect(result.current).toEqual({
      start: expect.any(Function),
      stop: expect.any(Function),
      restart: expect.any(Function),
    });
  });

  it("should automatically clear the timeout once completed", () => {
    const cb = jest.fn();
    const { result } = renderHook(() => useTimeout(cb, 300));

    // each useEffect calls one setTimeout
    expect(setTimeout).toBeCalledTimes(1);
    expect(cb).not.toBeCalled();
    expect(clearTimeout).not.toBeCalled();

    act(() => {
      result.current.start();
    });

    expect(setTimeout).toBeCalledTimes(3);
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

    act(() => {
      result.current.start();
    });

    expect(cb).not.toBeCalled();
    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(cb).not.toBeCalled();

    act(() => {
      result.current.stop();
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

    act(() => {
      result.current.start();
    });

    expect(cb).not.toBeCalled();
    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(cb).not.toBeCalled();

    act(() => {
      result.current.restart();
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

    act(() => {
      result.current.restart();
    });
    expect(setTimeout).toBeCalledWith(expect.any(Function), 300);

    act(() => {
      jest.runAllTimers();
    });
    expect(setTimeout).toBeCalledTimes(4);
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
