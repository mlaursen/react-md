import React from "react";
import { cleanup, render, act } from "react-testing-library";
import { renderHook } from "react-hooks-testing-library";

import VerticalDivider, { useVerticalDividerHeight } from "../VerticalDivider";

afterEach(cleanup);

describe("VerticalDivider", () => {
  it("should render as a div with the vertical divider class names", () => {
    const { container } = render(<VerticalDivider />);
    const divider = container.querySelector(".rmd-divider") as HTMLDivElement;

    expect(divider.tagName).toBe("DIV");
    expect(divider.className).toBe("rmd-divider rmd-divider--vertical");
  });

  describe("useVerticalDividerHeight", () => {
    it("should throw an error if the maxHeight is less than 0", () => {
      const { error } = global.console;
      global.console.error = () => {};
      expect(() => renderHook(() => useVerticalDividerHeight(-1))).toThrowError(
        "The `maxHeight` for a vertical divider height must be greater than 0"
      );

      global.console.error = error;
    });

    it("should provide a ref callback and a height", () => {
      let { result } = renderHook(() => useVerticalDividerHeight(5));
      expect(result.current).toEqual({
        ref: expect.any(Function),
        height: undefined,
      });

      ({ result } = renderHook(() => useVerticalDividerHeight(0)));
      expect(result.current).toEqual({
        ref: expect.any(Function),
        height: undefined,
      });

      ({ result } = renderHook(() => useVerticalDividerHeight(1)));
      expect(result.current).toEqual({
        ref: expect.any(Function),
        height: undefined,
      });
    });

    it("should update the height value after the ref is called with an element", () => {
      const div = document.createElement("div");
      const parentDiv = document.createElement("div");
      parentDiv.appendChild(div);
      Object.defineProperty(parentDiv, "offsetHeight", { value: 100 });

      const { result } = renderHook(() => useVerticalDividerHeight(1));
      expect(result.current.height).toBeUndefined();

      act(() => result.current.ref(div));
      expect(result.current.height).toBe(100);
    });

    it("should use the maxHeight as a multiplier if it is less than 1", () => {
      const div = document.createElement("div");
      const parentDiv = document.createElement("div");
      parentDiv.appendChild(div);
      Object.defineProperty(parentDiv, "offsetHeight", { value: 100 });

      const { result } = renderHook(() => useVerticalDividerHeight(0.6));
      expect(result.current.height).toBeUndefined();

      act(() => result.current.ref(div));
      expect(result.current.height).toBe(60);
    });

    it("should use the maxHeight as a pixel value if it is greater than 1", () => {
      const div = document.createElement("div");
      const parentDiv = document.createElement("div");
      parentDiv.appendChild(div);
      Object.defineProperty(parentDiv, "offsetHeight", {
        value: 100,
        writable: true,
      });

      const { result } = renderHook(() => useVerticalDividerHeight(80));
      expect(result.current.height).toBeUndefined();

      act(() => result.current.ref(div));
      expect(result.current.height).toBe(80);

      Object.defineProperty(parentDiv, "offsetHeight", {
        value: 40,
        writable: true,
      });
      act(() => result.current.ref(div));
      expect(result.current.height).toBe(40);
    });
  });
});
