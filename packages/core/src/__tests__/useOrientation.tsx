import { act, render } from "../test-utils";

import { useOrientation } from "../useOrientation";

describe("useOrientation", () => {
  it("should pull the orientation type from the screen if the ScreenOrientation API is available", () => {
    // it does not exist by default in jsdom
    expect(window.screen.orientation).toBeUndefined();

    let _listener: (() => void) | undefined;
    const addEventListener = jest.fn((_type, listener) => {
      _listener = listener;
    });
    const removeEventListener = jest.fn();

    Object.defineProperty(window.screen, "orientation", {
      value: {
        addEventListener,
        removeEventListener,
        type: "landscape-secondary",
      },
    });

    let orientation: OrientationType | undefined;
    function Test(): null {
      orientation = useOrientation();
      return null;
    }

    render(<Test />);

    expect(orientation).toBe("landscape-secondary");

    act(() => {
      if (!_listener) {
        throw new Error("LIstener was not set");
      }

      Object.defineProperty(window.screen.orientation, "type", {
        value: "portrait-primary",
      });

      _listener();
    });

    expect(orientation).toBe("portrait-primary");
  });

  it("should fallback to comparing the availHeight and availWidth if the ScreenOrientation API is not available", () => {
    jest.spyOn(window.screen, "availHeight", "get").mockReturnValue(760);
    jest.spyOn(window.screen, "availWidth", "get").mockReturnValue(360);

    let orientation: OrientationType | undefined;
    function Test(): null {
      orientation = useOrientation();
      return null;
    }

    render(<Test />);
    expect(orientation).toBe("portrait-primary");
  });
});
