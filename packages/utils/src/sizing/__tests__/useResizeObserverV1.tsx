import React from "react";
import { render } from "@testing-library/react";

import { ResizeObserver } from "../ResizeObserver";
import {
  getResizeObserverTarget,
  isHeightChange,
  isWidthChange,
  useResizeObserverV1,
  warnedOnce,
} from "../useResizeObserverV1";

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

describe("useResizeObserver", () => {
  beforeEach(() => {
    warnedOnce.hook = false;
    warnedOnce.comp = false;
  });

  it("should log a warning in non-prod environments to switch to the new API for the ResizeObserver Component", () => {
    const { NODE_ENV } = process.env;
    process.env.NODE_ENV = "development";

    const warn = jest.spyOn(console, "warn");
    warn.mockImplementation(() => {});

    const { rerender, unmount } = render(
      <ResizeObserver onResize={jest.fn()} />
    );
    expect(warn).toBeCalledWith(
      "The `ResizeObserver` component has been deprecated in favor of the new `useResizeObserver` hook " +
        "using the `ref` API. Please see https://github.com/mlaursen/react-md/pull/940 for more details."
    );
    expect(warn).toBeCalledTimes(1);

    rerender(<ResizeObserver onResize={jest.fn()} />);
    expect(warn).toBeCalledTimes(1);
    unmount();
    expect(warn).toBeCalledTimes(1);

    process.env.NODE_ENV = NODE_ENV;
    warn.mockRestore();
  });

  it("should log a warning in non-prod environments to switch to the new API for the useResizeObserver hook", () => {
    const { NODE_ENV } = process.env;
    process.env.NODE_ENV = "development";

    const warn = jest.spyOn(console, "warn");
    warn.mockImplementation(() => {});

    const Test = () => {
      useResizeObserverV1({
        target: null,
        onResize: jest.fn(),
      });

      return null;
    };

    const { rerender, unmount } = render(<Test />);
    expect(warn).toBeCalledWith(
      "The `useResizeObserver` hook has deprecated the ability to use an object containing a `target` " +
        "and `onResize` callback. Switch to the new `ref` API by setting the `onResize` callback " +
        "as the first argument. Please see https://github.com/mlaursen/react-md/pull/940 for more details."
    );
    expect(warn).toBeCalledTimes(1);
    rerender(<Test />);
    expect(warn).toBeCalledTimes(1);

    unmount();
    expect(warn).toBeCalledTimes(1);

    process.env.NODE_ENV = NODE_ENV;
    warn.mockRestore();
  });

  it("should not log any warnings for production", () => {
    const { NODE_ENV } = process.env;
    process.env.NODE_ENV = "production";

    const warn = jest.spyOn(console, "warn");
    warn.mockImplementation(() => {});

    const Test = () => {
      useResizeObserverV1({
        target: null,
        onResize: jest.fn(),
      });

      return <ResizeObserver onResize={jest.fn()} />;
    };

    const { rerender, unmount } = render(<Test />);
    rerender(<Test />);
    unmount();

    expect(warn).not.toBeCalled();

    process.env.NODE_ENV = NODE_ENV;
    warn.mockRestore();
  });
});
