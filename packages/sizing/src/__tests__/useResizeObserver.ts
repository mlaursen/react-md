import { act, cleanup, renderHook } from "react-hooks-testing-library";
import {
  getResizeObserverTarget,
  isSizeChange,
  useMeasure,
} from "../useResizeObserver";

describe("getResizeObserverTarget", () => {
  it("should return null if the target is null", () => {
    expect(getResizeObserverTarget(null)).toBe(null);
  });

  it("should call document.querySelector with the target if it is a string", () => {
    const querySelector = jest.spyOn(document, "querySelector");

    getResizeObserverTarget(".example-1");
    getResizeObserverTarget("#example-1");
    expect(querySelector).toBeCalledWith(".example-1");
    expect(querySelector).toBeCalledWith("#example-1");
  });

  it("should return the result of the callback function", () => {
    const div = document.createElement("div");
    const get1 = () => null;
    const get2 = () => div;
    const get3 = () => document.querySelector<HTMLElement>(".example-2");

    expect(getResizeObserverTarget(get1)).toBe(null);
    expect(getResizeObserverTarget(get2)).toBe(div);
    expect(getResizeObserverTarget(get3)).toBe(null);
  });

  it("should return the element if it is not a function, string, or null", () => {
    const element1 = document.createElement("table");
    const element2 = document.createElement("div");

    expect(getResizeObserverTarget(element1)).toBe(element1);
    expect(getResizeObserverTarget(element2)).toBe(element2);
  });
});

describe("isSizeChange", () => {
  it("should return true if the previous size was null", () => {
    const nextSize = {
      height: 100,
      width: 100,
      scrollHeight: 100,
      scrollWidth: 100,
    };

    expect(isSizeChange(null, nextSize, false, false)).toBe(true);
    expect(isSizeChange(null, nextSize, true, false)).toBe(true);
    expect(isSizeChange(null, nextSize, false, true)).toBe(true);
    expect(isSizeChange(null, nextSize, true, true)).toBe(true);
  });

  it("should return true if there was a height change and disableHeight is not true", () => {
    const prevSize = {
      height: 100,
      width: 100,
      scrollHeight: 100,
      scrollWidth: 100,
    };

    expect(
      isSizeChange(prevSize, { ...prevSize, scrollHeight: 102 }, false, false)
    ).toBe(true);
    expect(
      isSizeChange(
        prevSize,
        {
          ...prevSize,
          height: 102,
          scrollHeight: 102,
        },
        false,
        false
      )
    ).toBe(true);
    expect(
      isSizeChange(prevSize, { ...prevSize, height: 101 }, false, false)
    ).toBe(true);

    expect(
      isSizeChange(prevSize, { ...prevSize, scrollHeight: 102 }, true, false)
    ).toBe(false);
    expect(
      isSizeChange(
        prevSize,
        {
          ...prevSize,
          height: 102,
          scrollHeight: 102,
        },
        true,
        false
      )
    ).toBe(false);
    expect(
      isSizeChange(prevSize, { ...prevSize, height: 101 }, true, false)
    ).toBe(false);
  });

  it("should return true if there was a width change and disableWidth is not true", () => {
    const prevSize = {
      height: 100,
      width: 100,
      scrollHeight: 100,
      scrollWidth: 100,
    };

    expect(
      isSizeChange(prevSize, { ...prevSize, scrollWidth: 102 }, false, false)
    ).toBe(true);
    expect(
      isSizeChange(
        prevSize,
        {
          ...prevSize,
          width: 102,
          scrollWidth: 102,
        },
        false,
        false
      )
    ).toBe(true);
    expect(
      isSizeChange(prevSize, { ...prevSize, width: 101 }, false, false)
    ).toBe(true);

    expect(
      isSizeChange(prevSize, { ...prevSize, scrollWidth: 102 }, false, true)
    ).toBe(false);
    expect(
      isSizeChange(
        prevSize,
        {
          ...prevSize,
          width: 102,
          scrollWidth: 102,
        },
        false,
        true
      )
    ).toBe(false);

    expect(
      isSizeChange(prevSize, { ...prevSize, width: 101 }, false, true)
    ).toBe(false);
  });
});

describe("useMeasure", () => {
  afterEach(cleanup);

  it("should trigger the onResize argument after an element changed sizes", () => {
    const onResize = jest.fn();
    const { result } = renderHook(() => useMeasure({ onResize }));
    const createElement = (
      config: {
        height?: number;
        width?: number;
        scrollHeight?: number;
        scrollWidth?: number;
      } = {}
    ) => {
      const {
        height = 50,
        width = 100,
        scrollHeight = 150,
        scrollWidth = 200,
      } = config;
      const element = document.createElement("div");
      Object.defineProperty(element, "height", { value: height });
      Object.defineProperty(element, "width", { value: width });
      Object.defineProperty(element, "scrollHeight", { value: scrollHeight });
      Object.defineProperty(element, "scrollWidth", { value: scrollWidth });

      const entries: ResizeObserverEntry[] = [
        {
          target: element,
          contentRect: {
            x: 0,
            y: 0,
            height,
            width,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          },
        },
      ];
      return { element, entries };
    };

    let { element, entries } = createElement();
    act(() => result.current(entries));

    expect(onResize).toBeCalledWith({
      height: 50,
      width: 100,
      scrollHeight: 150,
      scrollWidth: 200,
      element,
    });

    // didn't change, so shouldn't call again
    act(() => result.current(entries));
    expect(onResize).toBeCalledTimes(1);

    ({ element, entries } = createElement({ scrollWidth: 400 }));
    act(() => result.current(entries));
    expect(onResize).toBeCalledTimes(2);
    expect(onResize).toBeCalledWith({
      height: 50,
      width: 100,
      scrollHeight: 150,
      scrollWidth: 400,
      element,
    });
  });
});
