import React from "react";
import { render } from "@testing-library/react";
import { act, renderHook } from "@testing-library/react-hooks";
import { mocked } from "ts-jest/utils";

import { useInterval } from "../useInterval";

jest.useFakeTimers();
const setInterval = mocked(window.setInterval);
const clearInterval = mocked(window.clearInterval);
beforeEach(() => {
  setInterval.mockClear();
  clearInterval.mockClear();
});

interface TestProps {
  cb: () => void;
  delay?: number;
  defaultRunning?: boolean;
}

function Test({ cb, delay = 300, defaultRunning = false }: TestProps): null {
  useInterval(cb, delay, defaultRunning);
  return null;
}

describe("useInterval", () => {
  it("should default to not starting the interval when mounted", () => {
    const cb = jest.fn();
    const { result } = renderHook(() => useInterval(cb, 300));

    const [running] = result.current;
    expect(cb).not.toBeCalled();
    expect(running).toBe(false);
    expect(setInterval).not.toBeCalled();
    expect(clearInterval).not.toBeCalled();
  });

  it("should start the interval when mounted if the defaultRunning prop is true", () => {
    const cb = jest.fn();
    const { result } = renderHook(() => useInterval(cb, 300, true));

    const [running] = result.current;
    expect(running).toBe(true);
    expect(cb).not.toBeCalled();
    expect(setInterval).toBeCalledWith(expect.any(Function), 300);
    expect(clearInterval).not.toBeCalled();
  });

  it("should start/stop the interval when the start/stop functions are called", () => {
    const cb = jest.fn();
    const { result } = renderHook(() => useInterval(cb, 300));

    let [running] = result.current;
    const [, start, stop] = result.current;
    expect(setInterval).not.toBeCalled();
    expect(clearInterval).not.toBeCalled();
    expect(running).toBe(false);

    act(() => {
      start();
    });

    [running] = result.current;
    expect(setInterval).toBeCalledTimes(1);
    expect(clearInterval).not.toBeCalled();
    expect(running).toBe(true);

    act(() => {
      stop();
    });

    [running] = result.current;
    expect(setInterval).toBeCalledTimes(1);
    expect(clearInterval).toBeCalledTimes(1);
    expect(running).toBe(false);
  });

  it("should restart the interval if the delay changes", () => {
    const cb = jest.fn();
    const { rerender } = render(<Test cb={cb} delay={300} defaultRunning />);

    expect(setInterval).toBeCalled();
    expect(clearInterval).not.toBeCalled();
    rerender(<Test cb={cb} delay={500} defaultRunning />);

    expect(setInterval).toBeCalledTimes(2);
    expect(clearInterval).toBeCalled();
  });

  it("should not restart the interval if the callback changes before the interval completes", () => {
    const cb1 = jest.fn();
    const cb2 = jest.fn();

    const { rerender } = render(<Test cb={cb1} delay={300} defaultRunning />);

    expect(cb1).not.toBeCalled();

    // pretend like there was a dom update before the timer finishes that re-renders the component
    // and the user had used an arrow function instead of a useCallback or equiv
    jest.advanceTimersByTime(200);
    rerender(<Test cb={cb2} delay={300} defaultRunning />);

    jest.advanceTimersByTime(400);
    expect(cb1).not.toBeCalled();
    expect(cb2).toBeCalled();
  });
});
