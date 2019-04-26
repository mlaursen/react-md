import React from "react";
import { mocked } from "ts-jest/utils";
import { cleanup, render } from "react-testing-library";
import { renderHook } from "react-hooks-testing-library";

import getFocusableElements_ from "../getFocusableElements";
import useFocusableElementsCache from "../useFocusableElementsCache";

jest.mock("../getFocusableElements");
const getFocusableElements = mocked(getFocusableElements_);

afterEach(() => {
  cleanup();
  getFocusableElements.mockClear();
});

describe("useFocusableElementsCache", () => {
  it("should not do anything if there is no ref or instance", () => {
    let { result } = renderHook(() => useFocusableElementsCache(null));
    expect(result.current).toEqual({ current: [] });
    expect(getFocusableElements).not.toBeCalled();

    ({ result } = renderHook(() =>
      useFocusableElementsCache({ current: null })
    ));
    expect(result.current).toEqual({ current: [] });
    expect(getFocusableElements).not.toBeCalled();
  });

  it("should throw an error if no focusable elements can be found", () => {
    getFocusableElements.mockImplementationOnce(() => []);
    const element = document.createElement("div");

    const consoleError = jest.spyOn(console, "error");
    // hide React uncaught error message
    consoleError.mockImplementation();

    const Test = () => {
      useFocusableElementsCache(element);
      return null;
    };

    expect(() => render(<Test />)).toThrowError(
      "There are no focusable elements"
    );

    consoleError.mockRestore();
  });

  it("should update the ref to contain all the focusable elements", () => {
    const rootElement = document.createElement("div");
    const element1 = document.createElement("div");
    const element2 = document.createElement("div");
    const element3 = document.createElement("div");
    const elements = [element1, element2, element3];
    getFocusableElements.mockImplementation(() => elements);

    let { result } = renderHook(() => useFocusableElementsCache(rootElement));
    expect(result.current).toEqual({ current: elements });
    ({ result } = renderHook(() => useFocusableElementsCache(null)));
    expect(result.current).toEqual({ current: [] });

    ({ result } = renderHook(() =>
      useFocusableElementsCache({ current: rootElement })
    ));
    expect(result.current).toEqual({ current: elements });
    ({ result } = renderHook(() =>
      useFocusableElementsCache({ current: null })
    ));
    expect(result.current).toEqual({ current: [] });
  });
});
