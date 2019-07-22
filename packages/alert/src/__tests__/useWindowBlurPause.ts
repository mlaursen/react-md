import { cleanup } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";

import useWindowBlurPause from "../useWindowBlurPause";

const addEventListener = jest.spyOn(window, "addEventListener");
const removeEventListener = jest.spyOn(window, "removeEventListener");
const startTimer = jest.fn();
const stopTimer = jest.fn();

afterEach(() => {
  jest.resetAllMocks();
  cleanup();
});

afterAll(() => {
  addEventListener.mockRestore();
  removeEventListener.mockRestore();
});

describe("useWindowBlurPause", () => {
  it("should call the stopTimer when the window is blurred and the startTimer when the window is refocused while there is a visible message", () => {
    const { rerender } = renderHook(() =>
      useWindowBlurPause({
        stopTimer,
        startTimer,
        visible: true,
        message: {},
      })
    );

    expect(addEventListener).toBeCalledWith("blur", expect.any(Function));
    expect(addEventListener).toBeCalledWith("focus", expect.any(Function));
    // can't just say toBeCalled() since renderHook adds window error events
    expect(removeEventListener).not.toBeCalledWith(
      "blur",
      expect.any(Function)
    );
    expect(removeEventListener).not.toBeCalledWith(
      "focus",
      expect.any(Function)
    );
    expect(startTimer).not.toBeCalled();
    expect(stopTimer).not.toBeCalled();

    window.dispatchEvent(new FocusEvent("blur"));
    expect(startTimer).not.toBeCalled();
    expect(stopTimer).toBeCalledTimes(1);

    window.dispatchEvent(new FocusEvent("focus"));
    expect(startTimer).toBeCalledTimes(1);
    expect(stopTimer).toBeCalledTimes(1);

    rerender(() =>
      useWindowBlurPause({
        stopTimer,
        startTimer,
        visible: false,
        message: {},
      })
    );

    expect(removeEventListener).toBeCalledWith("blur", expect.any(Function));
    expect(removeEventListener).toBeCalledWith("focus", expect.any(Function));
    expect(startTimer).toBeCalledTimes(1);
    expect(stopTimer).toBeCalledTimes(1);
  });

  it("should not attach the window event listeners if a message is not currently visible, there is no message, or the message disables the autohide behavior", () => {
    const { rerender } = renderHook(() =>
      useWindowBlurPause({
        stopTimer,
        startTimer,
        visible: false,
        message: {},
      })
    );
    rerender(() =>
      useWindowBlurPause({
        stopTimer,
        startTimer,
        visible: false,
        message: undefined,
      })
    );
    rerender(() =>
      useWindowBlurPause({
        stopTimer,
        startTimer,
        visible: false,
        message: undefined,
      })
    );
    rerender(() =>
      useWindowBlurPause({
        stopTimer,
        startTimer,
        visible: false,
        message: { disableAutohide: true },
      })
    );
    rerender(() =>
      useWindowBlurPause({
        stopTimer,
        startTimer,
        visible: true,
        message: { disableAutohide: true },
      })
    );

    expect(addEventListener).not.toBeCalledWith("blur", expect.any(Function));
    expect(addEventListener).not.toBeCalledWith("focus", expect.any(Function));
    expect(removeEventListener).not.toBeCalledWith(
      "blur",
      expect.any(Function)
    );
    expect(removeEventListener).not.toBeCalledWith(
      "focus",
      expect.any(Function)
    );
    expect(startTimer).not.toBeCalled();
    expect(stopTimer).not.toBeCalled();
  });
});
