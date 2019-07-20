import {
  getResizeObserverTarget,
  isHeightChange,
  isWidthChange,
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

describe("isHeightChange", () => {
  it("should return true if the previous size is undefined", () => {
    const nextSize = {
      height: 100,
      width: 100,
      scrollHeight: 100,
      scrollWidth: 100,
    };

    expect(isHeightChange(undefined, nextSize)).toBe(true);
  });

  it("should return true if the height or scroll height changed", () => {
    const prevSize = {
      height: 100,
      width: 100,
      scrollHeight: 100,
      scrollWidth: 100,
    };

    expect(
      isHeightChange(prevSize, {
        height: 101,
        width: 100,
        scrollHeight: 100,
        scrollWidth: 100,
      })
    ).toBe(true);

    expect(
      isHeightChange(prevSize, {
        height: 100,
        width: 100,
        scrollHeight: 101,
        scrollWidth: 100,
      })
    ).toBe(true);

    expect(
      isHeightChange(prevSize, {
        height: 105,
        width: 100,
        scrollHeight: 105,
        scrollWidth: 100,
      })
    ).toBe(true);

    expect(
      isHeightChange(prevSize, {
        height: 100,
        width: 105,
        scrollHeight: 100,
        scrollWidth: 100,
      })
    ).toBe(false);

    expect(
      isHeightChange(prevSize, {
        height: 100,
        width: 100,
        scrollHeight: 100,
        scrollWidth: 100,
      })
    ).toBe(false);
  });
});

describe("isWidthChange", () => {
  it("should return true if the previous size is undefined", () => {
    const nextSize = {
      height: 100,
      width: 100,
      scrollHeight: 100,
      scrollWidth: 100,
    };

    expect(isWidthChange(undefined, nextSize)).toBe(true);
  });

  it("should return true if the width or scroll width changed", () => {
    const prevSize = {
      height: 100,
      width: 100,
      scrollHeight: 100,
      scrollWidth: 100,
    };

    expect(
      isWidthChange(prevSize, {
        height: 100,
        width: 101,
        scrollHeight: 100,
        scrollWidth: 100,
      })
    ).toBe(true);

    expect(
      isWidthChange(prevSize, {
        height: 100,
        width: 100,
        scrollHeight: 100,
        scrollWidth: 101,
      })
    ).toBe(true);

    expect(
      isWidthChange(prevSize, {
        height: 100,
        width: 105,
        scrollHeight: 100,
        scrollWidth: 105,
      })
    ).toBe(true);

    expect(
      isWidthChange(prevSize, {
        height: 105,
        width: 100,
        scrollHeight: 100,
        scrollWidth: 100,
      })
    ).toBe(false);

    expect(
      isWidthChange(prevSize, {
        height: 100,
        width: 100,
        scrollHeight: 100,
        scrollWidth: 100,
      })
    ).toBe(false);
  });
});
