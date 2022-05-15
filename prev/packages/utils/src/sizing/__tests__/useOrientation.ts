import { renderHook } from "@testing-library/react-hooks";

import { getOrientationType, useOrientation } from "../useOrientation";

const ORIENTATION_MOCK: ScreenOrientation = {
  angle: 0,
  type: "landscape-secondary",
  lock: () => Promise.resolve(),
  unlock: () => {},
  onchange: () => {},
  dispatchEvent: () => true,
  addEventListener: () => {},
  removeEventListener: () => {},
};

describe("getOrientationType", () => {
  it("should return the screen.orientation.type if it exists", () => {
    const mock = { ...window.screen, orientation: ORIENTATION_MOCK };
    const screen = jest.spyOn(window, "screen", "get");
    screen.mockImplementation(() => mock);

    expect(getOrientationType()).toBe("landscape-secondary");
    screen.mockImplementation(() => ({
      ...mock,
      orientation: { ...ORIENTATION_MOCK, type: "portrait-primary" },
    }));
    expect(getOrientationType()).toBe("portrait-primary");

    screen.mockRestore();
  });

  it("should use the availHeight and availWidth screen values if the orientation is not supported", () => {
    const mock = {
      ...window.screen,
      availHeight: 0,
      availWidth: 0,
      orientation: undefined as unknown as ScreenOrientation,
    };
    const screen = jest.spyOn(window, "screen", "get");
    screen.mockImplementation(() => mock);

    expect(window.screen.orientation).toBeUndefined();

    // want 0 0 to be landscape primary since it's the default values within
    // jsdom
    expect(window.screen.availHeight).toBe(0);
    expect(window.screen.availWidth).toBe(0);
    expect(getOrientationType()).toBe("landscape-primary");

    screen.mockImplementation(() => ({ ...mock, availWidth: 100 }));
    expect(getOrientationType()).toBe("landscape-primary");

    screen.mockImplementation(() => ({ ...mock, availHeight: 100 }));
    expect(getOrientationType()).toBe("portrait-primary");

    screen.mockRestore();
  });
});

describe("useOrientation", () => {
  it("should default to provided default value", () => {
    let { result } = renderHook(() => useOrientation("portrait-primary"));
    expect(result.current).toBe("portrait-primary");

    ({ result } = renderHook(() => useOrientation("portrait-secondary")));
    expect(result.current).toBe("portrait-secondary");

    ({ result } = renderHook(() => useOrientation("landscape-primary")));
    expect(result.current).toBe("landscape-primary");

    ({ result } = renderHook(() => useOrientation("landscape-secondary")));
    expect(result.current).toBe("landscape-secondary");
  });

  it("should default to the getOrientationType when the window is defined", () => {
    const { result } = renderHook(() => useOrientation());
    expect(result.current).toBe(getOrientationType());
  });
});
