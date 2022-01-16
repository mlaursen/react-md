import { act, renderHook } from "@testing-library/react-hooks";

import { useVerticalDividerHeight } from "../useVerticalDividerHeight";

describe("useVerticalDivider", () => {
  it("should update the height value after the ref is called with an element", () => {
    const div = document.createElement("div");
    const parentDiv = document.createElement("div");
    parentDiv.appendChild(div);
    Object.defineProperty(parentDiv, "offsetHeight", { value: 100 });

    const { result } = renderHook(() =>
      useVerticalDividerHeight({ maxHeight: 1 })
    );
    expect(result.current.style?.height).toBeUndefined();

    act(() => result.current.ref(div));
    expect(result.current.style?.height).toBe(100);
  });

  it("should use the maxHeight as a multiplier if it is less than 1", () => {
    const div = document.createElement("div");
    const parentDiv = document.createElement("div");
    parentDiv.appendChild(div);
    Object.defineProperty(parentDiv, "offsetHeight", { value: 100 });

    const { result } = renderHook(() =>
      useVerticalDividerHeight({ maxHeight: 0.6 })
    );
    expect(result.current.style?.height).toBeUndefined();

    act(() => result.current.ref(div));
    expect(result.current.style?.height).toBe(60);
  });

  it("should use the maxHeight as a pixel value if it is greater than 1", () => {
    const div = document.createElement("div");
    const parentDiv = document.createElement("div");
    parentDiv.appendChild(div);
    Object.defineProperty(parentDiv, "offsetHeight", {
      value: 100,
      writable: true,
    });

    const { result } = renderHook(() =>
      useVerticalDividerHeight({ maxHeight: 80 })
    );
    expect(result.current.style?.height).toBeUndefined();

    act(() => result.current.ref(div));
    expect(result.current.style?.height).toBe(80);

    Object.defineProperty(parentDiv, "offsetHeight", {
      value: 40,
      writable: true,
    });
    act(() => result.current.ref(div));
    expect(result.current.style?.height).toBe(40);
  });
});
