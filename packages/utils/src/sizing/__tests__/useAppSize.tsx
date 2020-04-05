import React from "react";
import { render } from "@testing-library/react";

import useAppSize from "../useAppSize";
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
      "Attempted to use the current `AppSizeContext` without mounting the `AppSizeListener` component beforehand."
    );
  });
});
