import { cleanup } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";

import useCloseOnOutsideClick, {
  contains,
  getElement,
  Options,
} from "../useCloseOnOutsideClick";

afterEach(cleanup);

describe("contains", () => {
  it("should return false if either the element or target are null", () => {
    const div = document.createElement("div");
    expect(contains(null, null)).toBe(false);
    expect(contains(div, null)).toBe(false);
    expect(contains(null, div)).toBe(false);
  });

  it("should return true if the element contains the target", () => {
    const parent = document.createElement("div");
    parent.setAttribute("id", "parent");

    const child = document.createElement("span");
    child.setAttribute("id", "child");
    parent.appendChild(child);

    const outside = document.createElement("div");
    outside.setAttribute("id", "outside");

    expect(contains(parent, child)).toBe(true);
    expect(contains(parent, parent)).toBe(true);
    expect(contains(child, parent)).toBe(false);
    expect(contains(parent, outside)).toBe(false);
  });
});

describe("getElement", () => {
  it("should return null when the provided element is null", () => {
    expect(getElement(null)).toBe(null);
    expect(getElement({ current: null })).toBe(null);
  });

  it("should return the HTMLElement for both MutableRefObject and provided value", () => {
    const div = document.createElement("div");
    const span = document.createElement("span");
    const button = document.createElement("button");

    expect(getElement(div)).toBe(div);
    expect(getElement(span)).toBe(span);
    expect(getElement(button)).toBe(button);
    expect(getElement({ current: div })).toBe(div);
    expect(getElement({ current: span })).toBe(span);
    expect(getElement({ current: button })).toBe(button);
  });
});

describe("useCloseOnOutsideClick", () => {
  const target = document.createElement("div");
  target.id = "target";

  beforeEach(() => {
    document.body.appendChild(target);
  });

  afterEach(() => {
    document.body.removeChild(target);
  });

  it("should add a window click event listener when enabled", () => {
    const onOutideClick = jest.fn();
    const addEventListener = jest.spyOn(window, "addEventListener");
    const removeEventListener = jest.spyOn(window, "removeEventListener");
    const { rerender } = renderHook(
      options => useCloseOnOutsideClick(options),
      {
        initialProps: { enabled: true, element: null, onOutideClick },
      }
    );

    expect(addEventListener).toBeCalledWith("click", expect.any(Function));
    expect(removeEventListener).not.toBeCalledWith(
      "click",
      expect.any(Function)
    );

    rerender({ enabled: false, element: null, onOutideClick });
    expect(removeEventListener).toBeCalledWith("click", expect.any(Function));

    expect(onOutideClick).not.toBeCalled();
  });

  it("should call the onOutideClick handler if an element is clicked and the target is null", () => {
    const onOutideClick = jest.fn();
    const initialProps: Options<HTMLElement> = {
      enabled: true,
      element: null,
      onOutideClick,
    };
    const { rerender } = renderHook(
      options => useCloseOnOutsideClick(options),
      {
        initialProps,
      }
    );

    const click = new MouseEvent("click", { bubbles: true });
    target.dispatchEvent(click);
    expect(onOutideClick).toBeCalledWith(null, target, contains);

    onOutideClick.mockClear();
    expect(onOutideClick).not.toBeCalledWith(null, target);
    rerender({ ...initialProps, element: { current: null } });

    target.dispatchEvent(click);
    expect(onOutideClick).toBeCalledWith(null, target, contains);
  });

  it("should call the onOutsideClick handler if the provided element does not contain the click target", () => {
    const onOutideClick = jest.fn();
    const element = document.createElement("div");
    element.id = "element";

    const child = document.createElement("span");
    child.id = "child";
    element.appendChild(child);

    const initialProps: Options<HTMLElement> = {
      enabled: true,
      element,
      onOutideClick,
    };

    const { rerender } = renderHook(
      options => useCloseOnOutsideClick(options),
      { initialProps }
    );

    const click = new MouseEvent("click", { bubbles: true });
    element.dispatchEvent(click);
    child.dispatchEvent(click);

    expect(onOutideClick).not.toBeCalled();
    target.dispatchEvent(click);
    expect(onOutideClick).toBeCalledWith(element, target, contains);

    onOutideClick.mockClear();
    rerender({ ...initialProps, element: { current: element } });
    expect(onOutideClick).not.toBeCalled();

    element.dispatchEvent(click);
    child.dispatchEvent(click);

    expect(onOutideClick).not.toBeCalled();
    target.dispatchEvent(click);
    expect(onOutideClick).toBeCalledWith(element, target, contains);
  });

  it("should not trigger the onOutsideClick behavior if the event is not bubbled", () => {
    const onOutideClick = jest.fn();
    const element = document.createElement("div");
    element.id = "element";

    renderHook(() =>
      useCloseOnOutsideClick({ enabled: true, element, onOutideClick })
    );

    const click = new MouseEvent("click", { bubbles: false });
    target.dispatchEvent(click);
    element.dispatchEvent(click);

    expect(onOutideClick).not.toBeCalled();
  });
});
