import { act, renderHook } from "@testing-library/react-hooks";

import { useVisibility } from "../useVisibility";

describe("useVisibility", () => {
  it("should default to the correct state", () => {
    let { result } = renderHook(() => useVisibility());
    let { visible, defaultFocus } = result.current;
    expect(visible).toBe(false);
    expect(defaultFocus).toBe("first");

    ({ result } = renderHook(() =>
      useVisibility({ defaultVisible: true, defaultFocus: "last" })
    ));
    ({ visible, defaultFocus } = result.current);
    expect(visible).toBe(true);
    expect(defaultFocus).toBe("last");
  });

  it("should never update the callback functions", () => {
    const { result } = renderHook(() => useVisibility());
    const { show, showWithFocus, hide, toggle } = result.current;

    act(() => {
      show();
    });

    expect(result.current.show).toEqual(show);
    expect(result.current.showWithFocus).toEqual(showWithFocus);
    expect(result.current.hide).toEqual(hide);
    expect(result.current.toggle).toEqual(toggle);
  });

  it("should set the visibility to true and the defaultFocus to first when the show function is called", () => {
    let { result } = renderHook(() => useVisibility());
    let { visible, defaultFocus, show } = result.current;

    act(() => {
      show();
    });

    ({ visible, defaultFocus } = result.current);
    expect(visible).toBe(true);
    expect(defaultFocus).toBe("first");

    act(() => {
      show();
    });

    ({ visible, defaultFocus } = result.current);
    expect(visible).toBe(true);
    expect(defaultFocus).toBe("first");

    ({ result } = renderHook(() =>
      useVisibility({ defaultVisible: false, defaultFocus: "last" })
    ));
    ({ visible, defaultFocus, show } = result.current);

    act(() => {
      show();
    });

    ({ visible, defaultFocus } = result.current);
    expect(visible).toBe(true);
    expect(defaultFocus).toBe("first");

    act(() => {
      show();
    });

    ({ visible, defaultFocus } = result.current);
    expect(visible).toBe(true);
    expect(defaultFocus).toBe("first");
  });

  it("should set the visibility to true and update the defaultFocus with the provided focus type for showWithFocus", () => {
    const { result } = renderHook(() => useVisibility());
    const { showWithFocus } = result.current;
    let { visible, defaultFocus } = result.current;

    act(() => {
      showWithFocus("last");
    });

    ({ visible, defaultFocus } = result.current);
    expect(visible).toBe(true);
    expect(defaultFocus).toBe("last");

    act(() => {
      showWithFocus("first");
    });

    ({ visible, defaultFocus } = result.current);
    expect(visible).toBe(true);
    expect(defaultFocus).toBe("first");
  });

  it("should toggle the visibility with the previous defaultFocus value when the toggle function is called", () => {
    const { result } = renderHook(() => useVisibility());
    act(() => {
      result.current.toggle();
    });

    expect(result.current.visible).toBe(true);
    expect(result.current.defaultFocus).toBe("first");

    act(() => {
      result.current.toggle();
    });

    expect(result.current.visible).toBe(false);
    expect(result.current.defaultFocus).toBe("first");
  });

  it("should call the onVisibilityChange correctly", () => {
    const onVisibilityChange = jest.fn();
    const { result } = renderHook(() => useVisibility({ onVisibilityChange }));
    const { show, hide } = result.current;

    expect(onVisibilityChange).not.toBeCalled();

    act(() => {
      show();
    });
    expect(onVisibilityChange).toBeCalledTimes(1);
    expect(onVisibilityChange).toBeCalledWith(true);

    act(() => {
      show();
    });
    expect(onVisibilityChange).toBeCalledTimes(1);

    act(() => {
      hide();
    });
    expect(onVisibilityChange).toBeCalledTimes(2);
    expect(onVisibilityChange).toBeCalledWith(false);
  });
});
