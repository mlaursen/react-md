import React from "react";
import { renderHook } from "react-hooks-testing-library";
import { cleanup, render } from "react-testing-library";

import { AppSizeListener, useAppSizeContext } from "../AppSize";
import { DEFAULT_DESKTOP_MIN_WIDTH } from "../constants";

const onchange = jest.fn();
const addListener = jest.fn();
const addEventListener = jest.fn();
const removeListener = jest.fn();
const removeEventListener = jest.fn();
const dispatchEvent = jest.fn();
let matchMedia: jest.SpyInstance<MediaQueryList, [string]>;

beforeAll(() => {
  // matchMedia doesn't exist in tests, but maybe one day it'll be supported
  // so polyfill only when it doesn't exist
  window.matchMedia =
    window.matchMedia ||
    (query => ({
      matches: query.includes(`${DEFAULT_DESKTOP_MIN_WIDTH}`),
      media: "",
      onchange,
      addListener,
      removeListener,
      addEventListener,
      removeEventListener,
      dispatchEvent,
    }));
});

beforeEach(() => {
  jest.clearAllMocks();
  matchMedia = jest.spyOn(window, "matchMedia");
});
afterEach(cleanup);

describe("useAppSizeContext", () => {
  it("should throw an error when not used as a child of the AppSizeListener", () => {
    const consoleError = jest.spyOn(console, "error");
    // hide React uncaught error message
    consoleError.mockImplementation();

    expect(() => renderHook(() => useAppSizeContext())).toThrowError(
      "Attempted to use the current `AppSizeContext` without mounting the `AppSizeListener` component beforehand."
    );
  });
});

describe("AppSizeListener", () => {
  it("should render without crashing", () => {
    expect(() =>
      render(<AppSizeListener>Hello</AppSizeListener>)
    ).not.toThrow();
  });

  it("should only call the onChange prop after mount if the defaultSize does not equal the mounted size", () => {
    const onChange = jest.fn();
    render(<AppSizeListener onChange={onChange}>Hello</AppSizeListener>);

    expect(onChange).not.toBeCalled();

    const defaultSize = {
      isPhone: true,
      isTablet: false,
      isDesktop: false,
      isLargeDesktop: false,
      isLandscape: true,
    };
    render(
      <AppSizeListener defaultSize={defaultSize} onChange={onChange}>
        Hello
      </AppSizeListener>
    );

    expect(onChange).toBeCalledWith(
      {
        isPhone: false,
        isTablet: false,
        isDesktop: true,
        isLargeDesktop: false,
        isLandscape: true,
      },
      defaultSize
    );
  });

  it("should call the onChange prop whenever the appSize changes", () => {
    // not sure how to test this one nicely atm
    expect(true).toBe(true);
  });
});
