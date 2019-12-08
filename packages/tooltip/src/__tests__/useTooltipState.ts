import { renderHook } from "@testing-library/react-hooks";

import useTooltipState, {
  useOtherInteractionDisable,
} from "../useTooltipState";

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

  it("should attach a click and blur initiated value is not null", () => {
    renderHook(() => useOtherInteractionDisable("mouse", hideTooltip));

    expect(addEventListener).toBeCalledWith(
      "click",
      expect.any(Function),
      true
    );
  });

  it("should do nothing the initiated value is null", () => {
    renderHook(() => useOtherInteractionDisable(null, hideTooltip));

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
