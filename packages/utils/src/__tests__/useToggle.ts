import { renderHook, cleanup, act } from "react-hooks-testing-library";
import useToggle from "../useToggle";

afterEach(cleanup);
describe("useToggle", () => {
  it("should default to setting toggled to false", () => {
    const { result } = renderHook(() => useToggle());

    expect(result.current.toggled).toBe(false);
  });

  it("should default the visibility to the provided defaulttoggled value", () => {
    let { result } = renderHook(() => useToggle(false));

    expect(result.current.toggled).toBe(false);

    ({ result } = renderHook(() => useToggle(true)));
    expect(result.current.toggled).toBe(true);
  });

  it("should provide enable, disable, and toggle callbacks", () => {
    const { result } = renderHook(() => useToggle());
    expect(result.current).toEqual({
      toggled: false,
      enable: expect.any(Function),
      disable: expect.any(Function),
      toggle: expect.any(Function),
      setToggled: expect.any(Function),
    });
  });

  it("should provided memoized handlers that do not change", () => {
    const { result } = renderHook(() => useToggle(false));
    const { enable, disable, toggle } = result.current;

    act(() => enable());
    expect(result.current.enable).toBe(enable);
    expect(result.current.disable).toBe(disable);
    expect(result.current.toggle).toBe(toggle);
  });

  it("should set the visibility to true when the enable callback is called", () => {
    const { result } = renderHook(() => useToggle(false));
    act(() => result.current.enable());
    expect(result.current.toggled).toBe(true);
  });

  it("should set the visibility to false when the disable callback is called", () => {
    const { result } = renderHook(() => useToggle(true));
    act(() => result.current.disable());
    expect(result.current.toggled).toBe(false);
  });

  it("should toggle the visibility to false when the toggle callback is called", () => {
    const { result } = renderHook(() => useToggle(false));
    act(() => result.current.toggle());
    expect(result.current.toggled).toBe(true);
    act(() => result.current.toggle());
    expect(result.current.toggled).toBe(false);
  });
});
