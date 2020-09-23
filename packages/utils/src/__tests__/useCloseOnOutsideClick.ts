import { renderHook } from "@testing-library/react-hooks";

import { containsElement } from "../containsElement";
import {
  CloseOnOutsideClickOptions,
  getElement,
  useCloseOnOutsideClick,
} from "../useCloseOnOutsideClick";

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
    const onOutsideClick = jest.fn();
    const addEventListener = jest.spyOn(window, "addEventListener");
    const removeEventListener = jest.spyOn(window, "removeEventListener");
    const { rerender } = renderHook(
      (options) => useCloseOnOutsideClick(options),
      {
        initialProps: { enabled: true, element: null, onOutsideClick },
      }
    );

    expect(addEventListener).toBeCalledWith("click", expect.any(Function));
    expect(removeEventListener).not.toBeCalledWith(
      "click",
      expect.any(Function)
    );

    rerender({ enabled: false, element: null, onOutsideClick });
    expect(removeEventListener).toBeCalledWith("click", expect.any(Function));

    expect(onOutsideClick).not.toBeCalled();
  });

  it("should call the onOutsideClick handler if an element is clicked and the target is null", () => {
    const onOutsideClick = jest.fn();
    const initialProps: CloseOnOutsideClickOptions<HTMLElement> = {
      enabled: true,
      element: null,
      onOutsideClick,
    };
    const { rerender } = renderHook(
      (options) => useCloseOnOutsideClick(options),
      {
        initialProps,
      }
    );

    const click = new MouseEvent("click", { bubbles: true });
    target.dispatchEvent(click);
    expect(onOutsideClick).toBeCalledWith(null, target, containsElement);

    onOutsideClick.mockClear();
    expect(onOutsideClick).not.toBeCalledWith(null, target);
    rerender({ ...initialProps, element: { current: null } });

    target.dispatchEvent(click);
    expect(onOutsideClick).toBeCalledWith(null, target, containsElement);
  });

  it("should call the onOutsideClick handler if the provided element does not contain the click target", () => {
    const onOutsideClick = jest.fn();
    const element = document.createElement("div");
    element.id = "element";

    const child = document.createElement("span");
    child.id = "child";
    element.appendChild(child);

    const initialProps: CloseOnOutsideClickOptions<HTMLElement> = {
      enabled: true,
      element,
      onOutsideClick,
    };

    const { rerender } = renderHook(
      (options) => useCloseOnOutsideClick(options),
      { initialProps }
    );

    const click = new MouseEvent("click", { bubbles: true });
    element.dispatchEvent(click);
    child.dispatchEvent(click);

    expect(onOutsideClick).not.toBeCalled();
    target.dispatchEvent(click);
    expect(onOutsideClick).toBeCalledWith(element, target, containsElement);

    onOutsideClick.mockClear();
    rerender({ ...initialProps, element: { current: element } });
    expect(onOutsideClick).not.toBeCalled();

    element.dispatchEvent(click);
    child.dispatchEvent(click);

    expect(onOutsideClick).not.toBeCalled();
    target.dispatchEvent(click);
    expect(onOutsideClick).toBeCalledWith(element, target, containsElement);
  });

  it("should not trigger the onOutsideClick behavior if the event is not bubbled", () => {
    const onOutsideClick = jest.fn();
    const element = document.createElement("div");
    element.id = "element";

    renderHook(() =>
      useCloseOnOutsideClick({ enabled: true, element, onOutsideClick })
    );

    const click = new MouseEvent("click", { bubbles: false });
    target.dispatchEvent(click);
    element.dispatchEvent(click);

    expect(onOutsideClick).not.toBeCalled();
  });
});
