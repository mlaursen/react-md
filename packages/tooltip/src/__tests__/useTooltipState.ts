import { cleanup } from "react-testing-library";
import { renderHook } from "react-hooks-testing-library";

import useTooltipState, {
  useOtherInteractionDisable,
} from "../useTooltipState";

afterEach(cleanup);

describe("useOtherInteractionDisable", () => {
  const hideTooltip = jest.fn();
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
      useOtherInteractionDisable({ visible: true, hideTooltip })
    );

    expect(addEventListener).toBeCalledWith(
      "click",
      expect.any(Function),
      true
    );
  });

  it("should do nothing if not visible", () => {
    renderHook(() =>
      useOtherInteractionDisable({ visible: false, hideTooltip })
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

describe("useTooltipState", () => {
  it("should return a function to hide the tooltip, the current visibility, the current position, and handlers to show/hide the tooltip", () => {
    const { result } = renderHook(() =>
      useTooltipState({ defaultPosition: "below" })
    );
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
