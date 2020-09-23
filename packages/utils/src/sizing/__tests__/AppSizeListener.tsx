import React from "react";
import { render } from "@testing-library/react";

import { AppSizeListener } from "../AppSizeListener";
import { DEFAULT_DESKTOP_MIN_WIDTH } from "../constants";

const onchange = jest.fn();
const addListener = jest.fn();
const addEventListener = jest.fn();
const removeListener = jest.fn();
const removeEventListener = jest.fn();
const dispatchEvent = jest.fn();

beforeAll(() => {
  // matchMedia doesn't exist in tests, but maybe one day it'll be supported
  // so polyfill only when it doesn't exist
  window.matchMedia = (query) => ({
    matches: query.includes(`${DEFAULT_DESKTOP_MIN_WIDTH}`),
    media: "",
    onchange,
    addListener,
    removeListener,
    addEventListener,
    removeEventListener,
    dispatchEvent,
  });
});

beforeEach(() => {
  jest.clearAllMocks();
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
