import { renderHook, cleanup, act } from "react-hooks-testing-library";
import useVisibility from "../useVisibility";

afterEach(cleanup);
describe("useVisibility", () => {
  it("should default to setting visible to false", () => {
    const { result } = renderHook(() => useVisibility());

    expect(result.current.visible).toBe(false);
  });

  it("should default the visibility to the provided defaultVisible value", () => {
    let { result } = renderHook(() => useVisibility(false));

    expect(result.current.visible).toBe(false);

    ({ result } = renderHook(() => useVisibility(true)));
    expect(result.current.visible).toBe(true);
  });

  it("should provide show, hide, and toggle callbacks", () => {
    const { result } = renderHook(() => useVisibility());
    expect(result.current).toEqual({
      visible: false,
      show: expect.any(Function),
      hide: expect.any(Function),
      toggle: expect.any(Function),
    });
  });

  it("should provided memoized handlers that do not change", () => {
    const { result } = renderHook(() => useVisibility(false));
    const { show, hide, toggle } = result.current;

    act(() => show());
    expect(result.current.show).toBe(show);
    expect(result.current.hide).toBe(hide);
    expect(result.current.toggle).toBe(toggle);
  });

  it("should set the visibility to true when the show callback is called", () => {
    const { result } = renderHook(() => useVisibility(false));
    act(() => result.current.show());
    expect(result.current.visible).toBe(true);
  });

  it("should set the visibility to false when the hide callback is called", () => {
    const { result } = renderHook(() => useVisibility(true));
    act(() => result.current.hide());
    expect(result.current.visible).toBe(false);
  });

  it("should toggle the visibility to false when the toggle callback is called", () => {
    const { result } = renderHook(() => useVisibility(false));
    act(() => result.current.toggle());
    expect(result.current.visible).toBe(true);
    act(() => result.current.toggle());
    expect(result.current.visible).toBe(false);
  });
});
