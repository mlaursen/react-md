import React from "react";
import { render } from "@testing-library/react";

import { DEFAULT_DESKTOP_MIN_WIDTH } from "../constants";
import { useAppSize } from "../useAppSize";

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

describe("useAppSize", () => {
  it("should throw an error when not used as a child of the AppSizeListener", () => {
    // can't use renderHook for this since the error will be caught in the ErrorBoundary
    const Test = () => {
      useAppSize();
      return null;
    };

    const consoleError = jest.spyOn(console, "error");
    // hide React uncaught error message
    consoleError.mockImplementation();

    expect(() => render(<Test />)).toThrowError(
      "Unable to get the current `AppSize` from `react-md` because the `AppSizeListener` " +
        "could not be found when using the `useAppSize` hook. To fix this error, either " +
        "initialize the `AppSizeListener` component from `@react-md/utils` or the " +
        "`Configuration` component from `@react-md/layout` near the root of your app."
    );
  });
});
