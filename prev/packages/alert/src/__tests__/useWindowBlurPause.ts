import { renderHook } from "@testing-library/react-hooks";

import { useWindowBlurPause } from "../useWindowBlurPause";

const startTimer = jest.fn();
const stopTimer = jest.fn();

afterEach(() => {
  jest.resetAllMocks();
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

    expect(startTimer).not.toBeCalled();
    expect(stopTimer).not.toBeCalled();
  });
});
