/* eslint-disable no-underscore-dangle */
import React, { useRef } from "react";
import ResizeObserverPolyfill from "resize-observer-polyfill";
import { render } from "@testing-library/react";
import { mocked } from "ts-jest/utils";

import {
  isHeightChange,
  isWidthChange,
  useResizeObserver,
  ResizeObserverElementData,
} from "../useResizeObserver";

jest.mock("resize-observer-polyfill");

const ResizeObserverMock = mocked(ResizeObserverPolyfill);
const observe = jest.fn();
const unobserve = jest.fn();
const disconnect = jest.fn();

interface DOMRectReadOnly {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly top: number;
  readonly right: number;
  readonly bottom: number;
  readonly left: number;
}

const DEFAULT_DOM_RECT: DOMRectReadOnly = {
  x: 0,
  y: 0,
  height: 0,
  width: 0,
  bottom: 0,
  left: 0,
  top: 0,
  right: 0,
};

class MockedObserver implements ResizeObserver {
  public _callback: ResizeObserverCallback;

  public _elements: Element[];

  public constructor(callback: ResizeObserverCallback) {
    this._elements = [];
    this._callback = callback;
  }

  public observe(target: Element): void {
    observe(target);
    this._elements.push(target);
  }

  public unobserve(target: Element): void {
    unobserve(target);
    this._elements = this._elements.filter((el) => el !== target);
  }

  public disconnect(): void {
    disconnect();
    this._elements = [];
  }

  public trigger(contentRect: DOMRectReadOnly = DEFAULT_DOM_RECT) {
    this._callback(
      this._elements.map((target) => ({ target, contentRect })),
      this
    );
  }
}

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
  let observer: MockedObserver | undefined;
  beforeAll(() => {
    ResizeObserverMock.mockImplementation((callback) => {
      observer = new MockedObserver(callback);
      return observer;
    });
  });

  beforeEach(() => {
    observer?.disconnect();

    observe.mockClear();
    unobserve.mockClear();
    disconnect.mockClear();
  });

  afterAll(() => {
    ResizeObserverMock.mockRestore();
  });

  it("should use the v1 behavior if the first arg is an object", () => {
    const onResize = jest.fn();
    const Test = () => {
      const ref = useRef<HTMLDivElement | null>(null);
      useResizeObserver({
        onResize,
        target: ref,
      });
      return <div ref={ref} data-testid="div" />;
    };

    const { getByTestId, unmount } = render(<Test />);
    const div = getByTestId("div");
    expect(observe).toBeCalledWith(div);
    expect(observe).toBeCalledTimes(1);

    unmount();
    expect(observe).toBeCalledTimes(1);
    expect(unobserve).toBeCalledWith(div);
    expect(unobserve).toBeCalledTimes(1);
    expect(disconnect).toBeCalledTimes(1);
  });

  it("should use the ref API if the first argument is a function", () => {
    const onResize = jest.fn();
    const Test = () => {
      const [ref] = useResizeObserver<HTMLDivElement>(onResize);

      return <div data-testid="div" ref={ref} />;
    };

    const { getByTestId, unmount } = render(<Test />);
    const div = getByTestId("div");
    expect(onResize).not.toBeCalled();
    expect(observe).toBeCalledWith(div);
    expect(observe).toBeCalledTimes(1);

    unmount();
    expect(onResize).not.toBeCalled();
    expect(unobserve).toBeCalledWith(div);
    expect(unobserve).toBeCalledTimes(1);
    expect(disconnect).not.toBeCalled();
  });

  it("should handle calling the callbacks correctly", () => {
    const onResize1 = jest.fn();
    const onResize2 = jest.fn();
    const onResize3 = jest.fn();

    const Test = () => {
      // you'll really never be attaching multiple resize event handlers to the
      // same DOM node like this...

      const [, ref1] = useResizeObserver(onResize1);
      const [, ref2] = useResizeObserver(onResize2, { ref: ref1 });
      const [, ref3] = useResizeObserver(onResize3, { ref: ref2 });

      return <div data-testid="div" ref={ref3} />;
    };

    const { getByTestId, unmount } = render(<Test />);
    if (!observer) {
      throw new Error();
    }

    expect(onResize1).not.toBeCalled();
    expect(onResize2).not.toBeCalled();
    expect(onResize3).not.toBeCalled();
    observer.trigger();
    const expected: ResizeObserverElementData = {
      element: getByTestId("div"),
      height: 0,
      width: 0,
      scrollHeight: 0,
      scrollWidth: 0,
    };
    expect(onResize1).toBeCalledWith(expected);
    expect(onResize2).toBeCalledWith(expected);
    expect(onResize3).toBeCalledWith(expected);

    unmount();
  });

  it("should never initialize the observer if both disableHeight and disableWidth are enabled or there is no target", () => {
    const Test1 = () => {
      const [ref] = useResizeObserver<HTMLDivElement>(jest.fn(), {
        disableHeight: true,
        disableWidth: true,
      });

      return <div ref={ref} />;
    };
    const Test2 = () => {
      useResizeObserver(jest.fn());

      return null;
    };

    let { unmount } = render(<Test1 />);
    unmount();

    ({ unmount } = render(<Test2 />));
    unmount();

    expect(observe).not.toBeCalled();
    expect(unobserve).not.toBeCalled();
  });

  it("should not trigger the onResize callback if the height changed when the disableHeight option is enabled", () => {
    const onResize = jest.fn();
    const Test = () => {
      const [ref] = useResizeObserver<HTMLDivElement>(onResize, {
        disableHeight: true,
      });

      return <div data-testid="div" ref={ref} />;
    };

    const { getByTestId, unmount } = render(<Test />);
    if (!observer) {
      throw new Error();
    }
    const div = getByTestId("div");
    expect(onResize).not.toBeCalled();
    observer.trigger();

    expect(onResize).toBeCalledWith({
      element: div,
      height: 0,
      width: 0,
      scrollHeight: 0,
      scrollWidth: 0,
    });
    expect(onResize).toBeCalledTimes(1);

    observer.trigger({
      x: 0,
      y: 0,
      height: 100,
      width: 0,
      bottom: 0,
      left: 0,
      top: 0,
      right: 0,
    });
    expect(onResize).toBeCalledTimes(1);

    unmount();
  });

  it("should not trigger the onResize callback if the width changed when the disableWidth option is enabled", () => {
    const onResize = jest.fn();
    const Test = () => {
      const [ref] = useResizeObserver<HTMLDivElement>(onResize, {
        disableWidth: true,
      });

      return <div data-testid="div" ref={ref} />;
    };

    const { getByTestId, unmount } = render(<Test />);
    if (!observer) {
      throw new Error();
    }
    const div = getByTestId("div");
    expect(onResize).not.toBeCalled();
    observer.trigger();

    expect(onResize).toBeCalledWith({
      element: div,
      height: 0,
      width: 0,
      scrollHeight: 0,
      scrollWidth: 0,
    });
    expect(onResize).toBeCalledTimes(1);

    observer.trigger({
      x: 0,
      y: 0,
      height: 0,
      width: 1000,
      bottom: 0,
      left: 0,
      top: 0,
      right: 0,
    });
    expect(onResize).toBeCalledTimes(1);

    unmount();
  });
});
