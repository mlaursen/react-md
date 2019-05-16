import { CSSProperties } from "react";
import { renderHook } from "react-hooks-testing-library";

import {
  useCollapseState,
  unmountOnExit,
  isRendered,
  getElementSizing,
  createTransitionStyle,
} from "../useCollapseTransition";

describe("useCollapseState", () => {
  it("should retrun the correct defaults when starting collapsed", () => {
    const { result } = renderHook(() =>
      useCollapseState({
        collapsed: true,
        minHeight: 0,
        minPaddingTop: 1,
        minPaddingBottom: 1,
      })
    );

    expect(result.current).toEqual({
      entering: false,
      leaving: false,
      maxHeight: 0,
      paddingTop: 1,
      paddingBottom: 2,
      setState: expect.any(Function),
    });
  });

  it("should return the correct defaults when starting expanded", () => {
    const { result } = renderHook(() =>
      useCollapseState({
        collapsed: false,
        minHeight: 0,
        minPaddingTop: 1,
        minPaddingBottom: 1,
      })
    );

    expect(result.current).toEqual({
      entering: false,
      leaving: false,
      maxHeight: undefined,
      paddingTop: undefined,
      paddingBottom: undefined,
      setState: expect.any(Function),
    });
  });
});

describe("unmountOnExit", () => {
  it("should return the isEmptyCollapsed value when defined", () => {
    expect(
      unmountOnExit({
        isEmptyCollapsed: true,
        minHeight: 0,
        minPaddingTop: 0,
        minPaddingBottom: 0,
      })
    ).toBe(true);

    expect(
      unmountOnExit({
        isEmptyCollapsed: true,
        minHeight: 1,
        minPaddingTop: 1,
        minPaddingBottom: 1,
      })
    ).toBe(true);

    expect(
      unmountOnExit({
        isEmptyCollapsed: false,
        minHeight: 0,
        minPaddingTop: 0,
        minPaddingBottom: 0,
      })
    ).toBe(false);

    expect(
      unmountOnExit({
        isEmptyCollapsed: false,
        minHeight: 1,
        minPaddingTop: 1,
        minPaddingBottom: 1,
      })
    ).toBe(false);
  });

  it("should return true only if the minHeight, minPaddingTop, and minPaddingBottom values are 0", () => {
    expect(
      unmountOnExit({
        minHeight: 0,
        minPaddingTop: 0,
        minPaddingBottom: 0,
      })
    ).toBe(true);

    expect(
      unmountOnExit({
        minHeight: 1,
        minPaddingTop: 0,
        minPaddingBottom: 0,
      })
    ).toBe(false);

    expect(
      unmountOnExit({
        minHeight: 0,
        minPaddingTop: 1,
        minPaddingBottom: 0,
      })
    ).toBe(false);

    expect(
      unmountOnExit({
        minHeight: 0,
        minPaddingTop: 0,
        minPaddingBottom: 1,
      })
    ).toBe(false);

    expect(
      unmountOnExit({
        minHeight: 1,
        minPaddingTop: 1,
        minPaddingBottom: 0,
      })
    ).toBe(false);

    expect(
      unmountOnExit({
        minHeight: 1,
        minPaddingTop: 0,
        minPaddingBottom: 1,
      })
    ).toBe(false);

    expect(
      unmountOnExit({
        minHeight: 0,
        minPaddingTop: 1,
        minPaddingBottom: 1,
      })
    ).toBe(false);

    expect(
      unmountOnExit({
        minHeight: 1,
        minPaddingTop: 1,
        minPaddingBottom: 1,
      })
    ).toBe(false);
  });
});

describe("isRendered", () => {
  const defaultSizing = { minHeight: 0, minPaddingTop: 0, minPaddingBottom: 0 };
  it("should return true when not collapsed, or while transitioning", () => {
    expect(
      isRendered({
        ...defaultSizing,
        collapsed: false,
        entering: false,
        leaving: false,
      })
    ).toBe(true);

    expect(
      isRendered({
        ...defaultSizing,
        collapsed: true,
        entering: false,
        leaving: true,
      })
    ).toBe(true);

    expect(
      isRendered({
        ...defaultSizing,
        collapsed: true,
        // might not be possible
        entering: true,
        leaving: false,
      })
    ).toBe(true);
  });

  it("should return false when collapsed, not transitioning, and the element should unmount on exit", () => {
    expect(
      isRendered({
        ...defaultSizing,
        collapsed: true,
        entering: false,
        leaving: false,
      })
    ).toBe(false);

    expect(
      isRendered({
        collapsed: true,
        entering: false,
        leaving: false,
        isEmptyCollapsed: true,
        minHeight: 1,
        minPaddingTop: 1,
        minPaddingBottom: 1,
      })
    ).toBe(false);
  });
});

describe("getElementSizing", () => {
  it("should return an empty object if an element is not provided", () => {
    expect(getElementSizing(null)).toEqual({});
  });

  it("should clone the element to get the maxHeight, paddingTop, and paddingBottom values from so the main element is unmodified", () => {
    const div = document.createElement("div");
    div.cloneNode = jest.fn(div.cloneNode);

    getElementSizing(div);
    expect(div.cloneNode).toBeCalledWith(false);
  });

  it("should call window.getComputedStyle with the cloned element that has no padding and hidden visibility", () => {
    const div = document.createElement("div");
    div.style.paddingTop = "20px";
    div.style.paddingBottom = "20px";
    div.style.visibility = "visible";

    window.getComputedStyle = jest.fn(window.getComputedStyle);

    getElementSizing(div);
    const expected = document.createElement("div");
    expected.style.visibility = "hidden";
    expect(window.getComputedStyle).toBeCalledWith(expected);

    div.style.padding = "20px 12px";
    getElementSizing(div);
    const expected2 = document.createElement("div");
    expected2.style.visibility = "hidden";
    expected2.style.paddingLeft = "12px";
    expected2.style.paddingRight = "12px";
    expect(window.getComputedStyle).toBeCalledWith(expected2);
  });

  it("should add the cloned node to the parent element or the document.body to get correct styles and then remove", () => {
    const div = document.createElement("div");
    div.id = "div";

    document.body.appendChild = jest.fn(document.body.appendChild);
    document.body.removeChild = jest.fn(document.body.removeChild);
    const expected = document.createElement("div");
    expected.id = "div";
    expected.style.visibility = "hidden";

    getElementSizing(div);
    expect(document.body.appendChild).toBeCalledWith(expected);
    expect(document.body.removeChild).toBeCalledWith(expected);

    const parentDiv = document.createElement("div");
    parentDiv.id = "parentDiv";
    parentDiv.appendChild(div);
    parentDiv.appendChild = jest.fn(parentDiv.appendChild);
    parentDiv.removeChild = jest.fn(parentDiv.removeChild);
    getElementSizing(div);
    expect(parentDiv.appendChild).toBeCalledWith(expected);
    expect(parentDiv.removeChild).toBeCalledWith(expected);
  });

  it("should extract the maxHeight from the scrollHeight when there's an element", () => {
    const element = document.createElement("div");
    Object.defineProperty(element, "scrollHeight", {
      value: 1000,
    });

    expect(getElementSizing(element).maxHeight).toBe(1000);
  });

  it("should get the paddingTop and paddingBottom from the style", () => {
    const element = document.createElement("div");
    element.style.padding = "10px 0 20px";
    window.getComputedStyle = () =>
      ({
        paddingTop: "10px",
        paddingBottom: "20px",
      } as CSSStyleDeclaration);

    const result = getElementSizing(element);
    expect(result.paddingTop).toBe(10);
    expect(result.paddingBottom).toBe(20);
  });
});

describe("createTransitionStyle", () => {
  const transitionDuration = "200ms";
  it("should return the style value if the maxHeight, paddingTop, and paddingBottom values are undefined", () => {
    const style1 = undefined;
    const style2: CSSProperties = { maxWidth: "20rem" };

    expect(createTransitionStyle({ style: style1, transitionDuration })).toBe(
      style1
    );
    expect(createTransitionStyle({ style: style2, transitionDuration })).toBe(
      style2
    );
  });

  it("should return a style object with the maxHeight, paddingTop, paddingBottom, and transitionDuration when one of the sizing parts are defined", () => {
    expect(
      createTransitionStyle({
        maxHeight: 1000,
        paddingTop: 0,
        paddingBottom: 0,
        transitionDuration,
      })
    ).toEqual({
      maxHeight: 1000,
      paddingTop: 0,
      paddingBottom: 0,
      transitionDuration,
    });
  });

  it("should merge the style object with the transition styles and prefer the style object", () => {
    const style1: CSSProperties = { maxWidth: "20rem" };
    const style2: CSSProperties = { maxWidth: "20rem", maxHeight: "10rem" };
    expect(
      createTransitionStyle({
        style: style1,
        maxHeight: 1000,
        paddingTop: 0,
        paddingBottom: 0,
        transitionDuration,
      })
    ).toEqual({
      maxHeight: 1000,
      paddingTop: 0,
      paddingBottom: 0,
      transitionDuration,
      maxWidth: "20rem",
    });

    expect(
      createTransitionStyle({
        style: style2,
        maxHeight: 1000,
        paddingTop: 0,
        paddingBottom: 0,
        transitionDuration,
      })
    ).toEqual({
      paddingTop: 0,
      paddingBottom: 0,
      transitionDuration,
      maxHeight: "10rem",
      maxWidth: "20rem",
    });
  });
});
