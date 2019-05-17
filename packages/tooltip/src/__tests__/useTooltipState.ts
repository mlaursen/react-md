import { cleanup } from "react-testing-library";
import { renderHook } from "react-hooks-testing-library";

import useTooltipState, {
  useMouseState,
  useKeyboardState,
  useTouchState,
  useOtherInteractionDisable,
  useTooltipPosition,
} from "../useTooltipState";

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
        enableHoverMode: false,
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

describe("useOtherInteractionDisable", () => {
  const hideTooltip = jest.fn();
  const setInitiated = jest.fn();
  const addEventListener = jest.spyOn(window, "addEventListener");
  const removeEventListener = jest.spyOn(window, "removeEventListener");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    addEventListener.mockRestore();
    removeEventListener.mockRestore();
  });

  it("should attach a click and blur event listener when visible", () => {
    renderHook(() =>
      useOtherInteractionDisable({ visible: true, hideTooltip, setInitiated })
    );

    expect(addEventListener).toBeCalledWith(
      "click",
      expect.any(Function),
      true
    );
    expect(addEventListener).toBeCalledWith("blur", expect.any(Function));
  });

  it("should do nothing if not visible", () => {
    renderHook(() =>
      useOtherInteractionDisable({ visible: false, hideTooltip, setInitiated })
    );

    expect(addEventListener).not.toBeCalledWith(
      "click",
      expect.any(Function),
      true
    );
    expect(removeEventListener).not.toBeCalledWith(
      "click",
      expect.any(Function),
      true
    );
  });
});

describe("useTooltipPosition", () => {
  it("should set the position to the defaultPosition unless the position option was applied", () => {
    let { result } = renderHook(() =>
      useTooltipPosition({ defaultPosition: "below", threshold: 0 })
    );
    expect(result.current.position).toBe("below");

    ({ result } = renderHook(() =>
      useTooltipPosition({ defaultPosition: "above", threshold: 0 })
    ));
    expect(result.current.position).toBe("above");

    ({ result } = renderHook(() =>
      useTooltipPosition({
        position: "below",
        defaultPosition: "above",
        threshold: 0,
      })
    ));
    expect(result.current.position).toBe("below");

    ({ result } = renderHook(() =>
      useTooltipPosition({
        position: "above",
        defaultPosition: "below",
        threshold: 0,
      })
    ));
    expect(result.current.position).toBe("above");
  });
});

describe("useTooltipState", () => {
  it("should return a function to hide the tooltip, the current visibility, the current position, and handlers to show/hide the tooltip", () => {
    const { result } = renderHook(() => useTooltipState({}));
    expect(result.current).toEqual({
      hide: expect.any(Function),
      visible: false,
      position: "below",
      handlers: {
        onMouseEnter: expect.any(Function),
        onMouseLeave: expect.any(Function),
        onTouchStart: expect.any(Function),
        onTouchMove: expect.any(Function),
      },
    });
  });
});
