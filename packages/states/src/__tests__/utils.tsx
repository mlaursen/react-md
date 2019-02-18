import React from "react";
import { shallow, mount, ReactWrapper } from "enzyme";

import {
  isValidRippleTrigger,
  getRippleTriggerType,
  createRipple,
  addRippleFromEvent,
  disableRippleHolding,
  triggerRippleExitAnimation,
  triggerRippleExitAnimations,
  removeRippleByStartTime,
  cancelRipplesByType,
} from "../utils";
import { getRippleRadius as unmockedRippleRadius } from "../getRippleRadius";
import { RippleableEvent, IRipple } from "../types.d";

type FakeMouseEvent = React.MouseEvent<HTMLElement>;
type FakeTouchEvent = React.TouchEvent<HTMLElement>;
type FakeKeyboardEvent = React.KeyboardEvent<HTMLElement>;

jest.mock("../getRippleRadius");

const getRippleRadius = unmockedRippleRadius as jest.Mock;

const TEMP_RIPPLE: IRipple = {
  startTime: -1,
  style: {
    left: -1,
    top: -1,
    height: -1,
    width: -1,
  },
  holding: false,
  exiting: false,
  type: "programmatic",
};

describe("utils", () => {
  beforeAll(() => {
    getRippleRadius.mockReturnValue(50);
    Date.now = jest.fn(() => 1);
  });

  describe("isValidRippleTrigger", () => {
    it("should return true for click and touchstart events", () => {
      expect(isValidRippleTrigger({ type: "click" } as FakeMouseEvent)).toBe(
        true
      );
      expect(
        isValidRippleTrigger({ type: "touchstart" } as FakeTouchEvent)
      ).toBe(true);
    });

    it("should always return false for non click, touchstart, mousedown, and keydown events", () => {
      const types = [
        "mouseup",
        "mouseenter",
        "mouseleave",
        "touchmove",
        "touchend",
        "keyup",
      ];

      types.forEach(type => {
        expect(isValidRippleTrigger({ type } as RippleableEvent)).toBe(false);
      });
    });

    describe("mousedown", () => {
      it("should return true if the left mouse button was clicked", () => {
        expect(
          isValidRippleTrigger({
            type: "mousedown",
            button: 0,
          } as FakeMouseEvent)
        ).toBe(true);
      });

      it("should return false if any button except for the left button aws clicked", () => {
        expect(
          isValidRippleTrigger({
            type: "mousedown",
            button: 1,
          } as FakeMouseEvent)
        ).toBe(false);
        expect(
          isValidRippleTrigger({
            type: "mousedown",
            button: 2,
          } as FakeMouseEvent)
        ).toBe(false);
        expect(
          isValidRippleTrigger({
            type: "mousedown",
            button: 3,
          } as FakeMouseEvent)
        ).toBe(false);
      });

      it("should return false if there exists an element in the page that has a class of `.rmd-states--touch`", () => {
        const { querySelector } = document;
        document.querySelector = jest.fn(() => document.createElement("div"));

        expect(
          isValidRippleTrigger({
            type: "mousedown",
            button: 0,
          } as FakeMouseEvent)
        ).toBe(false);

        document.querySelector = querySelector;
        expect(
          isValidRippleTrigger({
            type: "mousedown",
            button: 0,
          } as FakeMouseEvent)
        ).toBe(true);
      });
    });

    describe("keydown", () => {
      it("should only return true if the keydown event key is space or enter", () => {
        expect(
          isValidRippleTrigger({
            type: "keydown",
            key: " ",
          } as FakeKeyboardEvent)
        ).toBe(true);

        expect(
          isValidRippleTrigger({
            type: "keydown",
            key: "Enter",
          } as FakeKeyboardEvent)
        ).toBe(true);

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

        keys.forEach(key => {
          expect(
            isValidRippleTrigger({ type: "keydown", key } as FakeKeyboardEvent)
          ).toBe(false);
        });
      });
    });
  });

  describe("getRippleTriggerType", () => {
    it("should return the typeOrEvent value immediately if it is a string", () => {
      expect(getRippleTriggerType("mouse")).toBe("mouse");
      expect(getRippleTriggerType("touch")).toBe("touch");
      expect(getRippleTriggerType("keyboard")).toBe("keyboard");
      expect(getRippleTriggerType("programmatic")).toBe("programmatic");
    });

    it('should return "mouse" for the different mouse events', () => {
      expect(
        getRippleTriggerType({ type: "mousedown" } as FakeMouseEvent)
      ).toBe("mouse");

      expect(getRippleTriggerType({ type: "mouseup" } as FakeMouseEvent)).toBe(
        "mouse"
      );

      expect(
        getRippleTriggerType({ type: "mouseleave" } as FakeMouseEvent)
      ).toBe("mouse");
    });

    it('should return "touch" for the different touch events', () => {
      expect(
        getRippleTriggerType({ type: "touchstart" } as FakeTouchEvent)
      ).toBe("touch");

      expect(
        getRippleTriggerType({ type: "touchmove" } as FakeTouchEvent)
      ).toBe("touch");

      expect(getRippleTriggerType({ type: "touchend" } as FakeTouchEvent)).toBe(
        "touch"
      );
    });

    it('should return "keyboard" for the supported keyboard events', () => {
      expect(
        getRippleTriggerType({ type: "keydown" } as FakeKeyboardEvent)
      ).toBe("keyboard");
    });

    it('should return "programmatic" for all other event types', () => {
      expect(getRippleTriggerType({ type: "click" } as FakeMouseEvent)).toBe(
        "programmatic"
      );
    });
  });

  describe("createRipple", () => {
    let result: IRipple = TEMP_RIPPLE;
    const setResult = (event: RippleableEvent) => {
      result = createRipple(event);
    };

    beforeEach(() => {
      result = TEMP_RIPPLE;
    });

    afterEach(() => {
      getRippleRadius.mockClear();
      getRippleRadius.mockReturnValue(50);
      Object.defineProperty(window, "pageXOffset", {
        value: 0,
      });
      Object.defineProperty(window, "pageYOffset", {
        value: 0,
      });
    });

    it("should create a ripple from the provided event", () => {
      const onKeyDown = jest.fn(setResult);
      const root = shallow(<button onKeyDown={onKeyDown}>button</button>);
      root.simulate("keyDown", {
        key: " ",
        type: "keydown",
        currentTarget: document.createElement("button"),
      });

      expect(result).toEqual({
        startTime: Date.now(),
        style: expect.objectContaining({
          left: expect.any(Number),
          top: expect.any(Number),
          height: expect.any(Number),
          width: expect.any(Number),
        }),
        type: "keyboard",
        holding: true,
        exiting: false,
      });
    });

    it("should set the holding attribute to true for every type except for programmatic", () => {
      const onKeyDown = jest.fn(setResult);
      const onMouseDown = jest.fn(setResult);
      const onTouchStart = jest.fn(setResult);
      const onClick = jest.fn(setResult);
      const root = mount(
        <button
          onKeyDown={onKeyDown}
          onClick={onClick}
          onTouchStart={onTouchStart}
          onMouseDown={onMouseDown}
        >
          button
        </button>
      );

      root.simulate("keyDown", { key: " " });
      expect(result).not.toEqual(TEMP_RIPPLE);
      expect(result.holding).toBe(true);

      result = TEMP_RIPPLE;
      root.simulate("mouseDown");
      expect(result).not.toEqual(TEMP_RIPPLE);
      expect(result.holding).toBe(true);

      result = TEMP_RIPPLE;
      root.simulate("touchStart", { touches: { item: () => ({}) } });
      expect(result).not.toEqual(TEMP_RIPPLE);
      expect(result.holding).toBe(true);

      result = TEMP_RIPPLE;
      root.simulate("click");
      expect(result).not.toEqual(TEMP_RIPPLE);
      expect(result.holding).toBe(false);
    });

    it("should use the halved dimensions for programmatic or keyboard event types", () => {
      const onKeyDown = jest.fn(setResult);
      const onClick = jest.fn(setResult);
      const root = shallow(
        <button onKeyDown={onKeyDown} onClick={onClick}>
          button
        </button>
      );

      root.simulate("keyDown", {
        key: " ",
        type: "keydown",
        currentTarget: {
          offsetHeight: 50,
          offsetWidth: 50,
        },
      });
      expect(result).not.toEqual(TEMP_RIPPLE);
      expect(getRippleRadius).toBeCalledWith(25, 25, 50, 50);

      root.simulate("click", {
        type: "click",
        currentTarget: {
          offsetHeight: 25,
          offsetWidth: 25,
        },
      });
      expect(result).not.toEqual(TEMP_RIPPLE);
      expect(getRippleRadius).toBeCalledWith(12.5, 12.5, 25, 25);
    });

    it("should use the correct dimensions if the event was a MouseEvent", () => {
      const onMouseDown = jest.fn(setResult);
      const root = shallow(<button onMouseDown={onMouseDown}>button</button>);

      root.simulate("mouseDown", {
        pageX: 50,
        pageY: 50,
        type: "mousedown",
        currentTarget: {
          offsetHeight: 25,
          offsetWidth: 25,
          getBoundingClientRect: () => ({
            left: 0,
            top: 0,
          }),
        },
      });

      expect(getRippleRadius).toBeCalledWith(50, 50, 25, 25);
    });

    it("should use the correct dimensions if the event was a TouchEvent", () => {
      const onTouchStart = jest.fn(setResult);
      const root = shallow(<button onTouchStart={onTouchStart}>button</button>);

      root.simulate("touchStart", {
        type: "touchstart",
        currentTarget: {
          offsetHeight: 25,
          offsetWidth: 25,
          getBoundingClientRect: () => ({
            left: 0,
            top: 0,
          }),
        },
        touches: {
          item: () => ({
            pageX: 50,
            pageY: 50,
          }),
        },
      });
      expect(getRippleRadius).toBeCalledWith(50, 50, 25, 25);
    });

    it("should update the result based on the getBoundingClientRect and page offsets", () => {
      const onMouseDown = jest.fn(setResult);
      const onTouchStart = jest.fn(setResult);
      const root = shallow(
        <button onMouseDown={onMouseDown} onTouchStart={onTouchStart}>
          button
        </button>
      );
      root.simulate("mouseDown", {
        pageX: 50,
        pageY: 50,
        type: "mousedown",
        currentTarget: {
          offsetHeight: 25,
          offsetWidth: 25,
          getBoundingClientRect: () => ({
            left: 10,
            top: 0,
          }),
        },
      });

      expect(getRippleRadius).toBeCalledWith(40, 50, 25, 25);

      Object.defineProperty(window, "pageYOffset", {
        value: 10,
      });

      root.simulate("mouseDown", {
        pageX: 50,
        pageY: 50,
        type: "mousedown",
        currentTarget: {
          offsetHeight: 25,
          offsetWidth: 25,
          getBoundingClientRect: () => ({
            left: 10,
            top: 0,
          }),
        },
      });
      expect(getRippleRadius).toBeCalledWith(40, 40, 25, 25);

      Object.defineProperty(window, "pageXOffset", {
        value: 10,
      });

      root.simulate("mouseDown", {
        pageX: 50,
        pageY: 50,
        type: "mousedown",
        currentTarget: {
          offsetHeight: 25,
          offsetWidth: 25,
          getBoundingClientRect: () => ({
            left: 10,
            top: 0,
          }),
        },
      });
      expect(getRippleRadius).toBeCalledWith(30, 40, 25, 25);
    });
  });

  describe("addRippleFromEvent", () => {
    let ripples: IRipple[] = [];
    let root: ReactWrapper<any, any, any>;
    const setRipples = jest.fn();
    const handler = (event: RippleableEvent) =>
      addRippleFromEvent(event, ripples, setRipples);

    beforeEach(() => {
      ripples = [];
      setRipples.mockClear();
      root = mount(
        <button
          onMouseDown={handler}
          onKeyDown={handler}
          onTouchStart={handler}
          onClick={handler}
        >
          button
        </button>
      );
    });

    it("should do nothing if the event is not valid", () => {
      root.simulate("keyDown");
      root.simulate("keyDown", { key: "A" });
      root.simulate("keyDown", { key: "Escape" });
      root.simulate("mousedown");
      root.simulate("mousedown", { button: 1 });
      expect(setRipples).not.toBeCalled();

      root.simulate("keyDown", { key: " " });
      root.simulate("keyDown", { key: "Enter" });
      root.simulate("mouseDown", { button: 0 });
      expect(setRipples.mock.calls.length).toBe(3);
    });

    it("should do nothing if the event is not a valid ripple event", () => {
      root.simulate("keyUp");
      root.simulate("mouseEnter");
      expect(setRipples).not.toBeCalled();
    });

    it("should do nothing if there is already an existing ripple of the same type that is being held", () => {
      ripples = [{ ...TEMP_RIPPLE, holding: true, type: "mouse" }];
      root.simulate("mouseDown", { button: 0 });
      expect(setRipples).not.toBeCalled();

      ripples = [{ ...TEMP_RIPPLE, holding: true, type: "keyboard" }];
      root.simulate("keyDown", { key: " " });
      expect(setRipples).not.toBeCalled();

      ripples = [{ ...TEMP_RIPPLE, holding: true, type: "touch" }];
      root.simulate("touchStart");
      expect(setRipples).not.toBeCalled();

      ripples = [{ ...TEMP_RIPPLE, holding: true, type: "programmatic" }];
      root.simulate("click");
      expect(setRipples).not.toBeCalled();
    });

    it("should remove all ripples that do not match the same type", () => {
      ripples = [
        { ...TEMP_RIPPLE, type: "touch" },
        { ...TEMP_RIPPLE, type: "keyboard" },
        { ...TEMP_RIPPLE, type: "programmatic" },
      ];

      root.simulate("mouseDown", { button: 0 });
      expect(setRipples).toBeCalledWith([
        expect.objectContaining({
          startTime: 1,
          style: expect.any(Object),
          type: "mouse",
          holding: true,
          exiting: false,
        }),
      ]);
      expect(setRipples.mock.calls[0][0].length).toBe(1);

      ripples = [
        { ...TEMP_RIPPLE, type: "mouse", holding: false, exiting: true },
        { ...TEMP_RIPPLE, type: "touch" },
        { ...TEMP_RIPPLE, type: "keyboard" },
        { ...TEMP_RIPPLE, type: "programmatic" },
      ];

      root.simulate("mouseDown", { button: 0 });
      expect(setRipples).toBeCalledWith([
        { ...TEMP_RIPPLE, type: "mouse", holding: false, exiting: true },
        expect.objectContaining({
          startTime: 1,
          style: expect.any(Object),
          type: "mouse",
          holding: true,
          exiting: false,
        }),
      ]);
      expect(setRipples.mock.calls[0][0].length).toBe(1);
    });
  });

  describe("disableRippleHolding", () => {
    let ripples: IRipple[] = [];
    let root: ReactWrapper<any, any, any>;
    const setRipples = jest.fn();
    const handler = (event: RippleableEvent) =>
      disableRippleHolding(event, ripples, setRipples);

    beforeEach(() => {
      ripples = [];
      setRipples.mockClear();
      root = mount(
        <button
          onMouseDown={handler}
          onKeyDown={handler}
          onTouchStart={handler}
          onClick={handler}
        >
          button
        </button>
      );
    });

    it("should do nothing if there are no ripples that are being held with the same ripple trigger type", () => {
      root.simulate("mouseup");
      expect(setRipples).not.toBeCalled();

      ripples = [{ ...TEMP_RIPPLE, type: "mouse", holding: false }];
      root.simulate("mouseup");
      expect(setRipples).not.toBeCalled();

      ripples = [{ ...TEMP_RIPPLE, type: "keyboard", holding: false }];
      root.simulate("keyDown", { key: " " });
      expect(setRipples).not.toBeCalled();

      ripples = [{ ...TEMP_RIPPLE, type: "touch", holding: false }];
      root.simulate("touchStart");
      expect(setRipples).not.toBeCalled();

      ripples = [{ ...TEMP_RIPPLE, type: "programmatic", holding: false }];
      root.simulate("click");
      expect(setRipples).not.toBeCalled();
    });

    it("should update the current ripple to have holding set to false", () => {
      ripples = [{ ...TEMP_RIPPLE, holding: true }];
      root.simulate("click");
      expect(setRipples).toBeCalledWith([{ ...TEMP_RIPPLE, holding: false }]);
    });

    it("should update the exiting to be true if there has been at least 300ms since the start time", () => {
      Date.now = jest.fn(() => 500);

      ripples = [{ ...TEMP_RIPPLE, holding: true, startTime: 0 }];
      root.simulate("click");
      expect(setRipples).toBeCalledWith([
        { ...TEMP_RIPPLE, startTime: 0, holding: false, exiting: true },
      ]);

      ripples = [{ ...TEMP_RIPPLE, holding: true, startTime: 199 }];
      root.simulate("click");
      expect(setRipples).toBeCalledWith([
        { ...TEMP_RIPPLE, startTime: 199, holding: false, exiting: true },
      ]);

      ripples = [{ ...TEMP_RIPPLE, holding: true, startTime: 200 }];
      root.simulate("click");
      expect(setRipples).toBeCalledWith([
        { ...TEMP_RIPPLE, startTime: 200, holding: false, exiting: false },
      ]);

      Date.now = jest.fn(() => 1);
    });

    it("should keep all the other ripples unmodified", () => {
      ripples = [
        TEMP_RIPPLE,
        TEMP_RIPPLE,
        TEMP_RIPPLE,
        {
          ...TEMP_RIPPLE,
          holding: true,
          type: "mouse",
        },
      ];

      root.simulate("mouseDown", { button: 0 });
      expect(setRipples).toBeCalledWith([
        TEMP_RIPPLE,
        TEMP_RIPPLE,
        TEMP_RIPPLE,
        { ...TEMP_RIPPLE, holding: false, type: "mouse" },
      ]);
    });
  });

  describe("triggerRippleExitAnimation", () => {
    let ripples: IRipple[] = [];
    const setRipples = jest.fn();
    beforeEach(() => {
      ripples = [];
      setRipples.mockClear();
    });

    it("should do nothing if there is no ripple being held with the provided startTime", () => {
      triggerRippleExitAnimation(0, ripples, setRipples);
      expect(setRipples).not.toBeCalled();

      ripples = [TEMP_RIPPLE];
      triggerRippleExitAnimation(0, ripples, setRipples);
      expect(setRipples).not.toBeCalled();

      ripples = [{ ...TEMP_RIPPLE, startTime: 0, holding: true }];
      triggerRippleExitAnimation(0, ripples, setRipples);
      expect(setRipples).not.toBeCalled();
    });

    it("should update the ripple to start exiting if there is a ripple found with the startTime and is being held", () => {
      ripples = [{ ...TEMP_RIPPLE, startTime: 0, holding: false }];
      triggerRippleExitAnimation(0, ripples, setRipples);
      expect(setRipples).toBeCalledWith([
        { ...TEMP_RIPPLE, startTime: 0, holding: false, exiting: true },
      ]);
    });
  });

  describe("triggerRippleExitAnimations", () => {
    let ripples: IRipple[] = [];
    const setRipples = jest.fn();
    const setRipplesCB = jest.fn(
      (cbOrRipples: IRipple[] | ((rs: IRipple[]) => IRipple[])) => {
        if (typeof cbOrRipples === "function") {
          setRipples(cbOrRipples(ripples));
        } else {
          setRipples(cbOrRipples);
        }
      }
    );

    beforeEach(() => {
      ripples = [];
      setRipples.mockClear();
    });

    it("should do nothing if there is no ripple being held with the provided startTime", () => {
      triggerRippleExitAnimations("mouse", setRipplesCB);
      expect(setRipples).toBeCalledWith(ripples);

      ripples = [TEMP_RIPPLE];
      triggerRippleExitAnimations("mouse", setRipplesCB);
      expect(setRipples).toBeCalledWith(ripples);

      ripples = [
        TEMP_RIPPLE,
        { ...TEMP_RIPPLE, exiting: false, type: "mouse" },
      ];
      triggerRippleExitAnimations("mouse", setRipplesCB);
      expect(setRipples).toBeCalledWith([
        TEMP_RIPPLE,
        { ...TEMP_RIPPLE, exiting: true, type: "mouse" },
      ]);

      ripples = [
        { ...TEMP_RIPPLE, exiting: false, type: "mouse" },
        { ...TEMP_RIPPLE, exiting: false, type: "mouse" },
        { ...TEMP_RIPPLE, exiting: false, type: "mouse" },
      ];
      triggerRippleExitAnimations("mouse", setRipplesCB);
      expect(setRipples).toBeCalledWith([
        { ...TEMP_RIPPLE, exiting: true, type: "mouse" },
        { ...TEMP_RIPPLE, exiting: true, type: "mouse" },
        { ...TEMP_RIPPLE, exiting: true, type: "mouse" },
      ]);
    });
  });

  describe("removeRippleByStartTime", () => {
    let ripples: IRipple[] = [];
    const setRipples = jest.fn();
    beforeEach(() => {
      ripples = [];
      setRipples.mockClear();
    });

    it("should do nothing if there are no ripples with the provided startTime", () => {
      removeRippleByStartTime(0, ripples, setRipples);
      removeRippleByStartTime(1, ripples, setRipples);
      removeRippleByStartTime(100, ripples, setRipples);

      ripples = [TEMP_RIPPLE, { ...TEMP_RIPPLE, startTime: 100 }];
      removeRippleByStartTime(0, ripples, setRipples);
      removeRippleByStartTime(99, ripples, setRipples);
      expect(setRipples).not.toBeCalled();
    });
  });

  describe("cancelRipplesByType", () => {
    let ripples: IRipple[] = [];
    const setRipples = jest.fn();
    const setRipplesCB = jest.fn(
      (cbOrRipples: IRipple[] | ((rs: IRipple[]) => IRipple[])) => {
        if (typeof cbOrRipples === "function") {
          setRipples(cbOrRipples(ripples));
        } else {
          setRipples(cbOrRipples);
        }
      }
    );
    beforeEach(() => {
      ripples = [];
      setRipples.mockClear();
    });

    it("should remove all ripples that have the same type", () => {
      cancelRipplesByType("mouse", setRipplesCB);
      expect(setRipples).toBeCalledWith(ripples);

      const mouse: IRipple = { ...TEMP_RIPPLE, type: "mouse" };
      const touch: IRipple = { ...TEMP_RIPPLE, type: "touch" };
      const keyboard: IRipple = { ...TEMP_RIPPLE, type: "keyboard" };
      const programmatic: IRipple = { ...TEMP_RIPPLE, type: "programmatic" };
      ripples = [mouse, touch, keyboard, programmatic];

      cancelRipplesByType("mouse", setRipplesCB);
      expect(setRipples).toBeCalledWith([touch, keyboard, programmatic]);

      cancelRipplesByType("touch", setRipplesCB);
      expect(setRipples).toBeCalledWith([mouse, keyboard, programmatic]);

      cancelRipplesByType("keyboard", setRipplesCB);
      expect(setRipples).toBeCalledWith([mouse, touch, programmatic]);

      cancelRipplesByType("programmatic", setRipplesCB);
      expect(setRipples).toBeCalledWith([mouse, touch, keyboard]);
    });
  });
});
