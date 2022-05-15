import type { CSSTransitionClassNamesObject } from "../types";
import type { TransitionTimeoutOptions } from "../utils";
import {
  getElementSizing,
  getTransitionTimeout,
  getTransitionClassNames,
  isWithinViewport,
} from "../utils";

describe("getTransitionTimeout", () => {
  it("should always return an object", () => {
    expect(
      getTransitionTimeout({
        timeout: 0,
        appear: true,
        enter: true,
        exit: true,
      })
    ).toEqual({
      appear: 0,
      enter: 0,
      exit: 0,
    });

    expect(
      getTransitionTimeout({
        timeout: 150,
        appear: true,
        enter: true,
        exit: true,
      })
    ).toEqual({
      appear: 150,
      enter: 150,
      exit: 150,
    });

    expect(
      getTransitionTimeout({
        timeout: 150,
        appear: false,
        enter: true,
        exit: true,
      })
    ).toEqual({
      appear: 0,
      enter: 150,
      exit: 150,
    });

    expect(
      getTransitionTimeout({
        timeout: 150,
        appear: false,
        enter: false,
        exit: true,
      })
    ).toEqual({
      appear: 0,
      enter: 0,
      exit: 150,
    });

    expect(
      getTransitionTimeout({
        timeout: 150,
        appear: false,
        enter: false,
        exit: false,
      })
    ).toEqual({
      appear: 0,
      enter: 0,
      exit: 0,
    });

    expect(
      getTransitionTimeout({
        timeout: { appear: 100 },
        appear: true,
        enter: true,
        exit: true,
      })
    ).toEqual({
      appear: 100,
      enter: 0,
      exit: 0,
    });

    expect(
      getTransitionTimeout({
        timeout: { enter: 200, exit: 150 },
        appear: true,
        enter: true,
        exit: true,
      })
    ).toEqual({
      appear: 200,
      enter: 200,
      exit: 150,
    });

    expect(
      getTransitionTimeout({
        timeout: { appear: 100 },
        appear: false,
        enter: true,
        exit: true,
      })
    ).toEqual({
      appear: 0,
      enter: 0,
      exit: 0,
    });

    expect(
      getTransitionTimeout({
        timeout: { enter: 100, exit: 200 },
        appear: false,
        enter: true,
        exit: true,
      })
    ).toEqual({
      appear: 0,
      enter: 100,
      exit: 200,
    });
  });
});

describe("getElementSizing", () => {
  it("should return an empty object if there is no element", () => {
    expect(getElementSizing(null)).toEqual({});
  });

  it("should return the maxHeight, paddingTop, and paddingBottom of the element after cloning it", () => {
    const scrollHeight = 1000;
    const paddingTop = 20;
    const paddingBottom = 16;
    const container = document.createElement("div");
    const element = document.createElement("div");
    const clone = document.createElement("div");

    jest.spyOn(element, "scrollHeight", "get").mockReturnValue(scrollHeight);
    jest.spyOn(element, "cloneNode").mockReturnValue(clone);
    const setMaxHeight = jest.spyOn(clone.style, "maxHeight", "set");
    const setPadding = jest.spyOn(clone.style, "padding", "set");
    const setPaddingLeft = jest.spyOn(clone.style, "paddingLeft", "set");
    const setPaddingRight = jest.spyOn(clone.style, "paddingRight", "set");
    const setVisibility = jest.spyOn(clone.style, "visibility", "set");

    container.appendChild(element);
    const appendChild = jest.spyOn(container, "appendChild");
    const removeChild = jest.spyOn(container, "removeChild");
    const getComputedStyle = jest
      .spyOn(window, "getComputedStyle")
      .mockReturnValue({
        ...document.body.style,
        paddingTop: "20px",
        paddingBottom: "16px",
      });

    expect(getElementSizing(element)).toEqual({
      maxHeight: scrollHeight,
      paddingTop,
      paddingBottom,
    });
    // this is really just testing the implementation... but these steps are required...
    expect(setMaxHeight).toBeCalledWith("");
    expect(setPadding).toBeCalledWith("");
    expect(setPaddingLeft).toBeCalledWith(element.style.paddingLeft);
    expect(setPaddingRight).toBeCalledWith(element.style.paddingRight);
    expect(setVisibility).toBeCalledWith("hidden");
    expect(appendChild).toBeCalledWith(clone);
    expect(getComputedStyle).toBeCalledWith(clone);
    expect(removeChild).toBeCalledWith(clone);
  });
});

describe("getTransitionClassNames", () => {
  const EMPTY_CLASSES: Readonly<CSSTransitionClassNamesObject> = {
    appear: "",
    appearActive: "",
    appearDone: "",
    enter: "",
    enterActive: "",
    enterDone: "",
    exit: "",
    exitActive: "",
    exitDone: "",
  };

  const DISABLED_TIMEOUT: TransitionTimeoutOptions = {
    timeout: 0,
    appear: true,
    enter: true,
    exit: true,
  };
  const ALL_TIMEOUT: TransitionTimeoutOptions = {
    timeout: {
      appear: 120,
      enter: 150,
      exit: 200,
    },
    appear: true,
    enter: true,
    exit: true,
  };
  const APPEAR_ONLY_TIMEOUT: TransitionTimeoutOptions = {
    timeout: 200,
    appear: true,
    enter: false,
    exit: false,
  };
  const APPEAR_ENTER_TIMEOUT: TransitionTimeoutOptions = {
    timeout: 200,
    appear: true,
    enter: true,
    exit: false,
  };
  const APPEAR_EXIT_TIMEOUT: TransitionTimeoutOptions = {
    timeout: 200,
    appear: true,
    enter: false,
    exit: true,
  };
  const ENTER_ONLY_TIMEOUT: TransitionTimeoutOptions = {
    timeout: 200,
    appear: false,
    enter: true,
    exit: false,
  };
  const ENTER_EXIT_TIMEOUT: TransitionTimeoutOptions = {
    timeout: 150,
    appear: false,
    enter: true,
    exit: true,
  };
  const EXIT_ONLY_TIMEOUT: TransitionTimeoutOptions = {
    timeout: 175,
    appear: false,
    enter: false,
    exit: true,
  };

  it("should create the correct classNames object when provided a string", () => {
    expect(
      getTransitionClassNames({ ...DISABLED_TIMEOUT, classNames: "prefix" })
    ).toEqual(EMPTY_CLASSES);

    expect(
      getTransitionClassNames({ ...ALL_TIMEOUT, classNames: "prefix" })
    ).toEqual({
      appear: "prefix--appear",
      appearActive: "prefix--appear-active",
      appearDone: "",
      enter: "prefix--enter",
      enterActive: "prefix--enter-active",
      enterDone: "",
      exit: "prefix--exit",
      exitActive: "prefix--exit-active",
      exitDone: "",
    });

    expect(
      getTransitionClassNames({ ...APPEAR_ONLY_TIMEOUT, classNames: "prefix" })
    ).toEqual({
      appear: "prefix--appear",
      appearActive: "prefix--appear-active",
      appearDone: "",
      enter: "",
      enterActive: "",
      enterDone: "",
      exit: "",
      exitActive: "",
      exitDone: "",
    });

    expect(
      getTransitionClassNames({ ...APPEAR_ENTER_TIMEOUT, classNames: "prefix" })
    ).toEqual({
      appear: "prefix--appear",
      appearActive: "prefix--appear-active",
      appearDone: "",
      enter: "prefix--enter",
      enterActive: "prefix--enter-active",
      enterDone: "",
      exit: "",
      exitActive: "",
      exitDone: "",
    });

    expect(
      getTransitionClassNames({ ...APPEAR_EXIT_TIMEOUT, classNames: "prefix" })
    ).toEqual({
      appear: "prefix--appear",
      appearActive: "prefix--appear-active",
      appearDone: "",
      enter: "",
      enterActive: "",
      enterDone: "",
      exit: "prefix--exit",
      exitActive: "prefix--exit-active",
      exitDone: "",
    });

    expect(
      getTransitionClassNames({ ...ENTER_ONLY_TIMEOUT, classNames: "prefix" })
    ).toEqual({
      appear: "",
      appearActive: "",
      appearDone: "",
      enter: "prefix--enter",
      enterActive: "prefix--enter-active",
      enterDone: "",
      exit: "",
      exitActive: "",
      exitDone: "",
    });

    expect(
      getTransitionClassNames({ ...ENTER_EXIT_TIMEOUT, classNames: "prefix" })
    ).toEqual({
      appear: "",
      appearActive: "",
      appearDone: "",
      enter: "prefix--enter",
      enterActive: "prefix--enter-active",
      enterDone: "",
      exit: "prefix--exit",
      exitActive: "prefix--exit-active",
      exitDone: "",
    });

    expect(
      getTransitionClassNames({ ...EXIT_ONLY_TIMEOUT, classNames: "prefix" })
    ).toEqual({
      appear: "",
      appearActive: "",
      appearDone: "",
      enter: "",
      enterActive: "",
      enterDone: "",
      exit: "prefix--exit",
      exitActive: "prefix--exit-active",
      exitDone: "",
    });
  });

  it("should return the correct classNames object when provided an empty object", () => {
    const classNames: CSSTransitionClassNamesObject = {};
    expect(
      getTransitionClassNames({
        ...DISABLED_TIMEOUT,
        classNames,
      })
    ).toEqual(EMPTY_CLASSES);
    expect(
      getTransitionClassNames({
        ...ALL_TIMEOUT,
        classNames,
      })
    ).toEqual(EMPTY_CLASSES);
    expect(
      getTransitionClassNames({
        ...APPEAR_ONLY_TIMEOUT,
        classNames,
      })
    ).toEqual(EMPTY_CLASSES);
    expect(
      getTransitionClassNames({
        ...APPEAR_ENTER_TIMEOUT,
        classNames,
      })
    ).toEqual(EMPTY_CLASSES);
    expect(
      getTransitionClassNames({
        ...APPEAR_EXIT_TIMEOUT,
        classNames,
      })
    ).toEqual(EMPTY_CLASSES);
    expect(
      getTransitionClassNames({
        ...ENTER_ONLY_TIMEOUT,
        classNames,
      })
    ).toEqual(EMPTY_CLASSES);
    expect(
      getTransitionClassNames({
        ...ENTER_EXIT_TIMEOUT,
        classNames,
      })
    ).toEqual(EMPTY_CLASSES);
    expect(
      getTransitionClassNames({
        ...EXIT_ONLY_TIMEOUT,
        classNames,
      })
    ).toEqual(EMPTY_CLASSES);
  });

  it("should return the classNames object if all values are defined", () => {
    const classNames: CSSTransitionClassNamesObject = {
      appear: "appear",
      appearActive: "appear-active",
      appearDone: "appear-done",
      enter: "enter",
      enterActive: "enter-active",
      enterDone: "enter-done",
      exit: "exit",
      exitActive: "exit-active",
      exitDone: "exit-done",
    };

    expect(
      getTransitionClassNames({
        ...DISABLED_TIMEOUT,
        classNames,
      })
    ).toEqual(classNames);
    expect(
      getTransitionClassNames({
        ...ALL_TIMEOUT,
        classNames,
      })
    ).toEqual(classNames);
    expect(
      getTransitionClassNames({
        ...APPEAR_ONLY_TIMEOUT,
        classNames,
      })
    ).toEqual(classNames);
    expect(
      getTransitionClassNames({
        ...APPEAR_ENTER_TIMEOUT,
        classNames,
      })
    ).toEqual(classNames);
    expect(
      getTransitionClassNames({
        ...APPEAR_EXIT_TIMEOUT,
        classNames,
      })
    ).toEqual(classNames);
    expect(
      getTransitionClassNames({
        ...ENTER_ONLY_TIMEOUT,
        classNames,
      })
    ).toEqual(classNames);
    expect(
      getTransitionClassNames({
        ...ENTER_EXIT_TIMEOUT,
        classNames,
      })
    ).toEqual(classNames);
    expect(
      getTransitionClassNames({
        ...EXIT_ONLY_TIMEOUT,
        classNames,
      })
    ).toEqual(classNames);
  });

  it("should return the classNames object and default to empty strings if a partial object was provided", () => {
    const classNames: CSSTransitionClassNamesObject = {
      exit: "exit",
      exitActive: "exit-active",
    };
    const expected: Required<CSSTransitionClassNamesObject> = {
      appear: "",
      appearActive: "",
      appearDone: "",
      enter: "",
      enterActive: "",
      enterDone: "",
      exit: "exit",
      exitActive: "exit-active",
      exitDone: "",
    };

    expect(
      getTransitionClassNames({
        ...DISABLED_TIMEOUT,
        classNames,
      })
    ).toEqual(expected);
    expect(
      getTransitionClassNames({
        ...ALL_TIMEOUT,
        classNames,
      })
    ).toEqual(expected);
    expect(
      getTransitionClassNames({
        ...APPEAR_ONLY_TIMEOUT,
        classNames,
      })
    ).toEqual(expected);
    expect(
      getTransitionClassNames({
        ...APPEAR_ENTER_TIMEOUT,
        classNames,
      })
    ).toEqual(expected);
    expect(
      getTransitionClassNames({
        ...APPEAR_EXIT_TIMEOUT,
        classNames,
      })
    ).toEqual(expected);
    expect(
      getTransitionClassNames({
        ...ENTER_ONLY_TIMEOUT,
        classNames,
      })
    ).toEqual(expected);
    expect(
      getTransitionClassNames({
        ...ENTER_EXIT_TIMEOUT,
        classNames,
      })
    ).toEqual(expected);
    expect(
      getTransitionClassNames({
        ...EXIT_ONLY_TIMEOUT,
        classNames,
      })
    ).toEqual(expected);
  });

  it("should default the appear classNames to the enter classNames if omitted and the appear timeout was enabled", () => {
    const classNames: CSSTransitionClassNamesObject = {
      enter: "custom-enter",
      enterActive: "custom-enter-active",
      enterDone: "custom-enter-done",
    };

    const expected: Required<CSSTransitionClassNamesObject> = {
      appear: "custom-enter",
      appearActive: "custom-enter-active",
      appearDone: "custom-enter-done",
      enter: "custom-enter",
      enterActive: "custom-enter-active",
      enterDone: "custom-enter-done",
      exit: "",
      exitActive: "",
      exitDone: "",
    };

    expect(
      getTransitionClassNames({
        ...APPEAR_ENTER_TIMEOUT,
        classNames,
      })
    ).toEqual(expected);
    expect(
      getTransitionClassNames({
        ...APPEAR_ONLY_TIMEOUT,
        classNames,
      })
    ).toEqual(expected);
    expect(
      getTransitionClassNames({
        ...ALL_TIMEOUT,
        classNames,
      })
    ).toEqual(expected);

    const expected2: Required<CSSTransitionClassNamesObject> = {
      appear: "",
      appearActive: "",
      appearDone: "",
      enter: "custom-enter",
      enterActive: "custom-enter-active",
      enterDone: "custom-enter-done",
      exit: "",
      exitActive: "",
      exitDone: "",
    };

    expect(
      getTransitionClassNames({
        ...ENTER_ONLY_TIMEOUT,
        classNames,
      })
    ).toEqual(expected2);
    expect(
      getTransitionClassNames({
        ...ENTER_EXIT_TIMEOUT,
        classNames,
      })
    ).toEqual(expected2);
  });
});

describe("isWithinViewport", () => {
  it("should return true if both the fixedElement and fixedToElement are visible within the viewport", () => {
    expect(window.innerHeight).toBe(768);
    expect(window.innerWidth).toBe(1024);
    const rect: DOMRect = {
      top: 0,
      left: 0,
      bottom: 24,
      right: 48,
      height: 24,
      width: 48,
      x: 0,
      y: 0,
      toJSON() {},
    };
    const rectOutAbove: DOMRect = {
      ...rect,
      top: -40,
      bottom: -16,
      y: -40,
    };
    const rectOutBelow: DOMRect = {
      ...rect,
      top: 1025,
      bottom: 1049,
      y: 1025,
    };
    const rectOutRight: DOMRect = {
      ...rect,
      left: 1025,
      right: 1049,
      x: 1025,
    };
    const rectOutLeft: DOMRect = {
      ...rect,
      left: -50,
      right: -2,
      x: -50,
    };

    const fixedElement = document.createElement("div");
    const fixedToElement = document.createElement("div");
    const fixedElementRect = jest
      .spyOn(fixedElement, "getBoundingClientRect")
      .mockReturnValue(rect);
    const fixedToElementRect = jest
      .spyOn(fixedToElement, "getBoundingClientRect")
      .mockReturnValue(rect);

    expect(isWithinViewport({ fixedElement, fixedToElement })).toBe(true);

    // still visible since the fixedToElement is in the viewport
    fixedElementRect.mockReturnValueOnce(rectOutAbove);
    expect(isWithinViewport({ fixedElement, fixedToElement })).toBe(true);

    fixedElementRect.mockReturnValueOnce(rectOutAbove);
    fixedToElementRect.mockReturnValueOnce(rectOutAbove);
    expect(isWithinViewport({ fixedElement, fixedToElement })).toBe(false);

    fixedToElementRect.mockReturnValueOnce(rectOutBelow);
    expect(isWithinViewport({ fixedElement, fixedToElement })).toBe(true);

    fixedElementRect.mockReturnValueOnce(rectOutBelow);
    fixedToElementRect.mockReturnValueOnce(rectOutBelow);
    expect(isWithinViewport({ fixedElement, fixedToElement })).toBe(false);

    fixedToElementRect.mockReturnValueOnce(rectOutLeft);
    expect(isWithinViewport({ fixedElement, fixedToElement })).toBe(true);

    fixedElementRect.mockReturnValueOnce(rectOutLeft);
    fixedToElementRect.mockReturnValueOnce(rectOutLeft);
    expect(isWithinViewport({ fixedElement, fixedToElement })).toBe(false);

    fixedElementRect.mockReturnValueOnce(rectOutRight);
    expect(isWithinViewport({ fixedElement, fixedToElement })).toBe(true);

    fixedElementRect.mockReturnValueOnce(rectOutRight);
    fixedToElementRect.mockReturnValueOnce(rectOutRight);
    expect(isWithinViewport({ fixedElement, fixedToElement })).toBe(false);
  });
});
