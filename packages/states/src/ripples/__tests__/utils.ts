import {
  createRippleState,
  getOrigin,
  getType,
  isBubbled,
  isRippleable,
} from "../utils";

describe("isBubbled", () => {
  const createItem = (children: HTMLLIElement | null) => {
    const item = document.createElement("li");
    item.setAttribute("role", "treeitem");
    item.setAttribute("tabindex", "-1");

    const content = document.createElement("span");
    content.innerText = "Content";

    item.appendChild(content);

    if (children) {
      const group = document.createElement("ul");
      group.setAttribute("role", "group");
      group.setAttribute("aria-expanded", "true");
      group.appendChild(children);
      item.appendChild(group);
    }

    return item;
  };

  it("should return false if there are no child treeitems", () => {
    const button = document.createElement("button");
    expect(isBubbled({ target: button, currentTarget: button })).toBe(false);
  });

  it("should return true if there is a child tree item that contains the current event target", () => {
    const target = createItem(null);
    const currentTarget = createItem(target);

    expect(isBubbled({ target, currentTarget })).toBe(true);
    expect(
      isBubbled({
        target: target.querySelector("span") as HTMLSpanElement,
        currentTarget,
      })
    ).toBe(true);
  });
});

describe("getType", () => {
  it("should return the correct type", () => {
    expect(getType({ type: "mousedown" })).toBe("mouse");
    expect(getType({ type: "mouseup" })).toBe("mouse");
    expect(getType({ type: "mouseleave" })).toBe("mouse");

    expect(getType({ type: "touchstart" })).toBe("touch");
    expect(getType({ type: "touchmove" })).toBe("touch");
    expect(getType({ type: "touchend" })).toBe("touch");

    expect(getType({ type: "keydown" })).toBe("keyboard");
    expect(getType({ type: "keyup" })).toBe("keyboard");

    expect(getType({ type: "click" })).toBe("programmatic");
  });
});

describe("isRippleable", () => {
  const target = document.createElement("div");
  const targets = { target, currentTarget: target };
  const mouseDownEvent = {
    ...targets,
    type: "mousedown",
    button: 0,
  };
  const keyDownEvent = {
    ...targets,
    type: "keydown",
    key: " ",
  };
  it("should return true for a left mousedown click", () => {
    expect(isRippleable(mouseDownEvent, false)).toBe(true);
    expect(isRippleable(mouseDownEvent, true)).toBe(true);
  });

  it("should return false for a mousedown event if the app is in touch mode", () => {
    const spy = jest.spyOn(document, "querySelector");
    spy.mockImplementation(() => document.createElement("span"));

    expect(isRippleable(mouseDownEvent, false)).toBe(false);
    expect(isRippleable(mouseDownEvent, true)).toBe(false);
    expect(spy).toBeCalledWith(".rmd-states--touch");
    expect(spy).toBeCalledTimes(2);

    spy.mockRestore();
  });

  it("should return false if the mousedown button is not hte left mouse button", () => {
    expect(isRippleable({ ...mouseDownEvent, button: 1 }, false)).toBe(false);
    expect(isRippleable({ ...mouseDownEvent, button: 1 }, true)).toBe(false);
    expect(isRippleable({ ...mouseDownEvent, button: 2 }, false)).toBe(false);
    expect(isRippleable({ ...mouseDownEvent, button: 2 }, true)).toBe(false);
  });

  it("should return true if the keydown event was for the Enter key", () => {
    expect(isRippleable({ ...keyDownEvent, key: "Enter" }, false)).toBe(true);
    expect(isRippleable({ ...keyDownEvent, key: "Enter" }, true)).toBe(true);
  });

  it("should return true for a space keydown event based on the disableSpacebarClick value", () => {
    expect(isRippleable({ ...keyDownEvent, key: " " }, false)).toBe(true);
    expect(isRippleable({ ...keyDownEvent, key: " " }, true)).toBe(false);
  });

  it("should return false for all other keydown keys", () => {
    const keys = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      "Tab",
      "Escape",
      "Home",
      "End",
    ];

    keys.forEach((key) => {
      expect(isRippleable({ ...keyDownEvent, key }, false)).toBe(false);
      expect(isRippleable({ ...keyDownEvent, key }, true)).toBe(false);
    });
  });

  it("should always return true for a touchstart event", () => {
    // don't know how to provide the touches as a TouchList
    expect(isRippleable({ type: "touchstart", ...targets }, false)).toBe(true);
    expect(isRippleable({ type: "touchstart", ...targets }, true)).toBe(true);
  });

  it("should return false for all other event types", () => {
    const types = [
      "mouseup",
      "mouseenter",
      "mouseleave",
      "mouseover",
      "keyup",
      "keypress",
      "focus",
      "blur",
      "change",
      "touchend",
      "touchmove",
      "touchcancel",
    ];

    types.forEach((type) => {
      expect(isRippleable({ ...targets, type }, false)).toBe(false);
      expect(isRippleable({ ...targets, type }, true)).toBe(false);
    });
  });
});

describe("getOrigin", () => {
  const element = document.createElement("button");
  Object.defineProperty(element, "offsetWidth", { value: 100 });
  Object.defineProperty(element, "offsetHeight", { value: 32 });

  it("should return the height and width halved for keyboard events", () => {
    expect(getOrigin({ type: "keyboard" }, element)).toEqual({ x: 50, y: 16 });
  });

  it("should return the height and width halved for programmatic events", () => {
    expect(getOrigin({ type: "click" }, element)).toEqual({ x: 50, y: 16 });
  });

  it("should create an origin for a mouse event based on the click location relative to the element", () => {
    Object.defineProperty(window, "pageXOffset", { value: 0 });
    Object.defineProperty(window, "pageYOffset", { value: 0 });
    const spy = jest.spyOn(element, "getBoundingClientRect");
    spy.mockImplementation(() => ({
      left: 0,
      top: 0,
      right: 300,
      bottom: 300,
      height: 32,
      width: 32,
      x: 0,
      y: 0,
      toJSON: () => "",
    }));

    expect(
      getOrigin({ type: "mousedown", pageX: 0, pageY: 0 }, element)
    ).toEqual({
      x: 0,
      y: 0,
    });
    expect(
      getOrigin({ type: "mousedown", pageX: 42, pageY: 0 }, element)
    ).toEqual({
      x: 42,
      y: 0,
    });
    expect(
      getOrigin({ type: "mousedown", pageX: 42, pageY: 100 }, element)
    ).toEqual({
      x: 42,
      y: 100,
    });

    Object.defineProperty(window, "pageXOffset", { value: 10 });
    Object.defineProperty(window, "pageYOffset", { value: 20 });
    expect(
      getOrigin({ type: "mousedown", pageX: 42, pageY: 100 }, element)
    ).toEqual({
      x: 32,
      y: 80,
    });

    Object.defineProperty(window, "pageXOffset", { value: 0 });
    Object.defineProperty(window, "pageYOffset", { value: 0 });
    spy.mockImplementation(() => ({
      left: 20,
      top: 30,
      right: 300,
      bottom: 300,
      height: 32,
      width: 32,
      x: 0,
      y: 0,
      toJSON: () => "",
    }));
    expect(
      getOrigin({ type: "mousedown", pageX: 0, pageY: 0 }, element)
    ).toEqual({
      x: -20,
      y: -30,
    });
    expect(
      getOrigin({ type: "mousedown", pageX: 42, pageY: 0 }, element)
    ).toEqual({
      x: 22,
      y: -30,
    });
    expect(
      getOrigin({ type: "mousedown", pageX: 42, pageY: 100 }, element)
    ).toEqual({
      x: 22,
      y: 70,
    });

    Object.defineProperty(window, "pageXOffset", { value: 10 });
    Object.defineProperty(window, "pageYOffset", { value: 20 });
    expect(
      getOrigin({ type: "mousedown", pageX: 42, pageY: 100 }, element)
    ).toEqual({
      x: 12,
      y: 50,
    });

    spy.mockRestore();
  });

  it("should create an origin for a touch event based on the click location relative to the element", () => {
    Object.defineProperty(window, "pageXOffset", { value: 0 });
    Object.defineProperty(window, "pageYOffset", { value: 0 });
    const spy = jest.spyOn(element, "getBoundingClientRect");
    spy.mockImplementation(() => ({
      left: 0,
      top: 0,
      right: 300,
      bottom: 300,
      height: 32,
      width: 32,
      x: 0,
      y: 0,
      toJSON: () => "",
    }));

    const makeGetItem =
      ({ pageX = 0, pageY = 0 } = {}) =>
      () => ({
        identifier: 0,
        altitudeAngle: 0,
        azimuthAngle: 0,
        clientX: 0,
        clientY: 0,
        force: 0,
        pageX,
        pageY,
        radiusX: 0,
        radiusY: 0,
        rotationAngle: 0,
        screenX: 0,
        screenY: 0,
        target: element,
        touchType: "direct",
      });

    const createTouches = ({ pageX = 0, pageY = 0 } = {}) => ({
      length: 1,
      item: makeGetItem({ pageX, pageY }),
      identifiedTouch: makeGetItem({ pageX, pageY }),
    });

    let touches = createTouches();

    expect(getOrigin({ type: "touchstart", touches }, element)).toEqual({
      x: 0,
      y: 0,
    });

    touches = createTouches({ pageX: 42 });
    expect(getOrigin({ type: "touchstart", touches }, element)).toEqual({
      x: 42,
      y: 0,
    });

    touches = createTouches({ pageX: 42, pageY: 100 });
    expect(getOrigin({ type: "touchstart", touches }, element)).toEqual({
      x: 42,
      y: 100,
    });

    Object.defineProperty(window, "pageXOffset", { value: 10 });
    Object.defineProperty(window, "pageYOffset", { value: 20 });
    expect(getOrigin({ type: "touchstart", touches }, element)).toEqual({
      x: 32,
      y: 80,
    });

    Object.defineProperty(window, "pageXOffset", { value: 0 });
    Object.defineProperty(window, "pageYOffset", { value: 0 });
    spy.mockImplementation(() => ({
      left: 20,
      top: 30,
      right: 300,
      bottom: 300,
      height: 32,
      width: 32,
      x: 0,
      y: 0,
      toJSON: () => "",
    }));

    touches = createTouches();
    expect(getOrigin({ type: "touchstart", touches }, element)).toEqual({
      x: -20,
      y: -30,
    });

    touches = createTouches({ pageX: 42 });
    expect(getOrigin({ type: "touchstart", touches }, element)).toEqual({
      x: 22,
      y: -30,
    });

    touches = createTouches({ pageX: 42, pageY: 100 });
    expect(getOrigin({ type: "touchstart", touches }, element)).toEqual({
      x: 22,
      y: 70,
    });

    Object.defineProperty(window, "pageXOffset", { value: 10 });
    Object.defineProperty(window, "pageYOffset", { value: 20 });
    expect(getOrigin({ type: "touchstart", touches }, element)).toEqual({
      x: 12,
      y: 50,
    });

    spy.mockRestore();
  });
});

describe("createRippleState", () => {
  const target = document.createElement("button");
  Object.defineProperty(target, "offsetWidth", { value: 100 });
  Object.defineProperty(target, "offsetHeight", { value: 32 });

  let dateSpy: jest.SpyInstance<number>;
  beforeEach(() => {
    dateSpy = jest.spyOn(Date, "now");
    dateSpy.mockImplementation(() => 1);
  });

  afterEach(() => {
    if (dateSpy) {
      dateSpy.mockRestore();
    }
  });

  it("should return the correct state for a mousedown event", () => {
    const event1 = {
      type: "mousedown",
      button: 0,
      pageX: 50,
      pageY: 100,
      target,
      currentTarget: target,
    };
    const event2 = {
      type: "keydown",
      key: " ",
      target,
      currentTarget: target,
    };
    const makeGetItem =
      ({ pageX = 0, pageY = 0 } = {}) =>
      () => ({
        identifier: 0,
        altitudeAngle: 0,
        azimuthAngle: 0,
        clientX: 0,
        clientY: 0,
        force: 0,
        pageX,
        pageY,
        radiusX: 0,
        radiusY: 0,
        rotationAngle: 0,
        screenX: 0,
        screenY: 0,
        target,
        touchType: "direct",
      });

    const createTouches = ({ pageX = 0, pageY = 0 } = {}) => ({
      length: 1,
      item: makeGetItem({ pageX, pageY }),
      identifiedTouch: makeGetItem({ pageX, pageY }),
    });
    const event3 = {
      type: "touchstart",
      touches: createTouches(),
      target,
      currentTarget: target,
    };

    const state1 = createRippleState(event1);
    const state2 = createRippleState(event2);
    const state3 = createRippleState(event3);
    expect(state1).toEqual({
      startTime: 1,
      style: {
        left: expect.any(Number),
        top: expect.any(Number),
        height: expect.any(Number),
        width: expect.any(Number),
      },
      type: "mouse",
      holding: true,
      exiting: false,
      entered: false,
    });
    expect(state2).toEqual({
      startTime: 1,
      style: {
        left: expect.any(Number),
        top: expect.any(Number),
        height: expect.any(Number),
        width: expect.any(Number),
      },
      type: "keyboard",
      holding: true,
      exiting: false,
      entered: false,
    });
    expect(state3).toEqual({
      startTime: 1,
      style: {
        left: expect.any(Number),
        top: expect.any(Number),
        height: expect.any(Number),
        width: expect.any(Number),
      },
      type: "touch",
      holding: true,
      exiting: false,
      entered: false,
    });
  });
});
