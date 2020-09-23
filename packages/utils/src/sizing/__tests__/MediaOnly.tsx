import React from "react";
import { render } from "@testing-library/react";

import { AppSizeListener } from "../AppSizeListener";
import { DEFAULT_DESKTOP_MIN_WIDTH } from "../constants";
import { DesktopOnly, MobileOnly, PhoneOnly, TabletOnly } from "../MediaOnly";

const onchange = jest.fn();
const addListener = jest.fn();
const addEventListener = jest.fn();
const removeListener = jest.fn();
const removeEventListener = jest.fn();
const dispatchEvent = jest.fn();

beforeAll(() => {
  // matchMedia doesn't exist in tests, but maybe one day it'll be supported
  // so polyfill only when it doesn't exist
  window.matchMedia =
    window.matchMedia ||
    ((query) => ({
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
});

describe("MediaOnly", () => {
  it("should throw an error if any of the components are mounted without an AppSizeListener parent", () => {
    const consoleError = jest.spyOn(console, "error");
    // hide React uncaught error message
    consoleError.mockImplementation();

    expect(() =>
      render(
        <MobileOnly>
          <span>Hello</span>
        </MobileOnly>
      )
    ).toThrow();
    expect(() =>
      render(
        <AppSizeListener>
          <MobileOnly>
            <span>Hello</span>
          </MobileOnly>
        </AppSizeListener>
      )
    ).not.toThrow();

    expect(() =>
      render(
        <PhoneOnly>
          <span>Hello</span>
        </PhoneOnly>
      )
    ).toThrow();
    expect(() =>
      render(
        <AppSizeListener>
          <PhoneOnly>
            <span>Hello</span>
          </PhoneOnly>
        </AppSizeListener>
      )
    ).not.toThrow();

    expect(() =>
      render(
        <TabletOnly>
          <span>Hello</span>
        </TabletOnly>
      )
    ).toThrow();
    expect(() =>
      render(
        <AppSizeListener>
          <TabletOnly>
            <span>Hello</span>
          </TabletOnly>
        </AppSizeListener>
      )
    ).not.toThrow();

    expect(() =>
      render(
        <DesktopOnly>
          <span>Hello</span>
        </DesktopOnly>
      )
    ).toThrow();
    expect(() =>
      render(
        <AppSizeListener>
          <DesktopOnly>
            <span>Hello</span>
          </DesktopOnly>
        </AppSizeListener>
      )
    ).not.toThrow();
  });
});
