import { act, renderHook } from "@testing-library/react-hooks";

import { useToggle } from "../useToggle";

describe("useToggle", () => {
  it("should default the visibility to the provided defaulttoggled value", () => {
    let { result } = renderHook(() => useToggle(false));

    let [toggled] = result.current;
    expect(toggled).toBe(false);

    ({ result } = renderHook(() => useToggle(true)));
    [toggled] = result.current;
    expect(toggled).toBe(true);
  });

  it("should provided memoized handlers that do not change", () => {
    const { result } = renderHook(() => useToggle(false));
    const [, enable, disable, toggle] = result.current;

    act(() => enable());
    expect(enable).toBe(enable);
    expect(disable).toBe(disable);
    expect(toggle).toBe(toggle);
  });

  it("should set the visibility to true when the enable callback is called", () => {
    const { result } = renderHook(() => useToggle(false));
    const [, enable] = result.current;
    act(() => enable());

    const [toggled] = result.current;
    expect(toggled).toBe(true);
  });

  it("should set the visibility to false when the disable callback is called", () => {
    const { result } = renderHook(() => useToggle(true));
    const [, , disable] = result.current;
    act(() => disable());
    const [toggled] = result.current;
    expect(toggled).toBe(false);
  });

  it("should toggle the visibility to false when the toggle callback is called", () => {
    const { result } = renderHook(() => useToggle(false));
    const [, , , toggle] = result.current;
    act(() => toggle());

    let [toggled] = result.current;
    expect(toggled).toBe(true);

    act(() => toggle());
    [toggled] = result.current;
    expect(toggled).toBe(false);
  });
});
