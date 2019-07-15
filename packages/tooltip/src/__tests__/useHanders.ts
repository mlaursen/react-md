import { cleanup } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";

import { useMouseState, useKeyboardState, useTouchState } from "../useHandlers";

afterEach(cleanup);

describe("useMouseState", () => {
  it("should return an object containg a function to stop the mouse timer and the required mouse handlers", () => {
    const { result } = renderHook(() =>
      useMouseState({
        mode: "mouse",
        showTooltip: jest.fn(),
        hideTooltip: jest.fn(),
        initiated: { current: null },
        setInitiated: jest.fn(),
        delay: 1000,
        disableHoverMode: false,
        setEstimatedPosition: jest.fn(),
      })
    );

    expect(result.current).toEqual({
      stopMouseTimer: expect.any(Function),
      mouseHandlers: {
        onMouseEnter: expect.any(Function),
        onMouseLeave: expect.any(Function),
      },
    });
  });
});

describe("useKeyboardState", () => {
  it("should return an object containing a function to stop the keyboard timer and the required keyboard handlers", () => {
    const { result } = renderHook(() =>
      useKeyboardState({
        mode: "keyboard",
        showTooltip: jest.fn(),
        hideTooltip: jest.fn(),
        initiated: { current: null },
        setInitiated: jest.fn(),
        delay: 1000,
        setEstimatedPosition: jest.fn(),
      })
    );

    expect(result.current).toEqual({
      stopKeyboardTimer: expect.any(Function),
      keyboardHandlers: {
        onBlur: expect.any(Function),
        onFocus: expect.any(Function),
        onKeyDown: expect.any(Function),
      },
    });
  });
});

describe("useTouchState", () => {
  it("should return an object containing a function to stop the touch timer and the required touch handlers", () => {
    const { result } = renderHook(() =>
      useTouchState({
        mode: "touch",
        visible: false,
        showTooltip: jest.fn(),
        hideTooltip: jest.fn(),
        initiated: { current: null },
        setInitiated: jest.fn(),
        delay: 1000,
        setEstimatedPosition: jest.fn(),
      })
    );

    expect(result.current).toEqual({
      stopTouchTimer: expect.any(Function),
      touchHandlers: {
        onTouchStart: expect.any(Function),
        onTouchMove: expect.any(Function),
        onContextMenu: expect.any(Function),
      },
    });
  });
});
