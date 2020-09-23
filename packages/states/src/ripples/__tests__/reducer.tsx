import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";

import {
  CREATE,
  CreateAction,
  createRippleAction,
  reducer,
  useRippleTransition,
} from "../reducer";
import { RippleEvent, RipplesState } from "../types";

describe("createRippleAction", () => {
  const target = document.createElement("span");
  const currentTarget = document.createElement("button");
  it("should create the correct action for a mouse event", () => {
    const event = {
      type: "mousedown",
      target,
      currentTarget,
      button: 0,
      pageX: 0,
      pageY: 0,
    };

    expect(createRippleAction(event, false)).toEqual({
      type: CREATE,
      disableSpacebarClick: false,
      event: {
        type: "mousedown",
        target,
        currentTarget,
        button: 0,
        pageX: 0,
        pageY: 0,
      },
    });
    expect(createRippleAction(event, true)).toEqual({
      type: CREATE,
      disableSpacebarClick: true,
      event: {
        type: "mousedown",
        target,
        currentTarget,
        button: 0,
        pageX: 0,
        pageY: 0,
      },
    });
  });

  it("should create the correct action for a touch event", () => {
    const event = {
      type: "touchstart",
      target,
      currentTarget,
      // don't know how to type as React.TouchList
      touches: [] as any,
    };

    expect(createRippleAction(event, false)).toEqual({
      type: CREATE,
      disableSpacebarClick: false,
      event: {
        type: "touchstart",
        target,
        currentTarget,
        touches: [],
      },
    });

    expect(createRippleAction(event, true)).toEqual({
      type: CREATE,
      disableSpacebarClick: true,
      event: {
        type: "touchstart",
        target,
        currentTarget,
        touches: [],
      },
    });
  });

  it("should create the correct action for a keyboard event", () => {
    const event = {
      type: "keydown",
      target,
      currentTarget,
      key: " ",
    };

    expect(createRippleAction(event, false)).toEqual({
      type: CREATE,
      disableSpacebarClick: false,
      event: {
        type: "keydown",
        target,
        currentTarget,
        key: " ",
      },
    });

    expect(createRippleAction(event, true)).toEqual({
      type: CREATE,
      disableSpacebarClick: true,
      event: {
        type: "keydown",
        target,
        currentTarget,
        key: " ",
      },
    });
  });
});

describe("reducer", () => {
  let nowSpy: jest.SpyInstance<number>;
  beforeEach(() => {
    nowSpy = jest.spyOn(Date, "now");
    nowSpy.mockImplementation(() => 1);
  });
  afterEach(() => {
    if (nowSpy) {
      nowSpy.mockRestore();
    }
  });

  it("should correctly add a new ripple", () => {
    const target = document.createElement("button");
    Object.defineProperty(target, "offsetWidth", { value: 100 });
    Object.defineProperty(target, "offsetHeight", { value: 48 });

    const action: CreateAction<HTMLElement> = {
      type: CREATE,
      disableSpacebarClick: false,
      event: {
        type: "mousedown",
        button: 0,
        pageX: 100,
        pageY: 50,
        target,
        currentTarget: target,
      },
    };

    expect(reducer([], action)).toEqual([
      {
        startTime: 1,
        style: {
          top: expect.any(Number),
          left: expect.any(Number),
          width: expect.any(Number),
          height: expect.any(Number),
        },
        type: "mouse",
        exiting: false,
        holding: true,
        entered: false,
      },
    ]);
  });
});

describe("useRippleTransition", () => {
  let nowSpy: jest.SpyInstance<number>;
  beforeEach(() => {
    nowSpy = jest.spyOn(Date, "now");
    nowSpy.mockImplementation(() => 1);
  });
  afterEach(() => {
    if (nowSpy) {
      nowSpy.mockRestore();
    }
  });

  it("should return the correct values", () => {
    let { result } = renderHook(() => useRippleTransition(false));
    expect(result.current).toEqual({
      state: [],
      create: expect.any(Function),
      release: expect.any(Function),
      entered: expect.any(Function),
      remove: expect.any(Function),
      cancel: expect.any(Function),
    });

    ({ result } = renderHook(() => useRippleTransition(true)));
    expect(result.current).toEqual({
      state: [],
      create: expect.any(Function),
      release: expect.any(Function),
      entered: expect.any(Function),
      remove: expect.any(Function),
      cancel: expect.any(Function),
    });
  });

  describe("create", () => {
    it("should correctly add a ripple after a valid mousedown event", () => {
      let state: RipplesState = [];
      let create: (event: RippleEvent<HTMLElement>) => void;
      const Test = () => {
        ({ state, create } = useRippleTransition(false));
        return (
          <button type="button" onMouseDown={create}>
            Button
          </button>
        );
      };

      const { getByText } = render(<Test />);
      const button = getByText("Button");
      expect(state).toEqual([]);

      // setting pageX and pageY still returns undefined for some reason
      fireEvent.mouseDown(button, { button: 0 });
      expect(state).toEqual([
        {
          startTime: 1,
          style: {
            top: NaN,
            left: NaN,
            width: NaN,
            height: NaN,
          },
          type: "mouse",
          holding: true,
          exiting: false,
          entered: false,
        },
      ]);
    });

    it("should not add a new ripple if the mouse button is not the left mouse", () => {
      let state: RipplesState = [];
      let create: (event: RippleEvent<HTMLElement>) => void;
      const Test = () => {
        ({ state, create } = useRippleTransition(false));
        return (
          <button type="button" onMouseDown={create}>
            Button
          </button>
        );
      };

      const { getByText } = render(<Test />);
      const button = getByText("Button");
      expect(state).toEqual([]);

      fireEvent.mouseDown(button, { button: 1 });
      fireEvent.mouseDown(button, { button: 2 });
      expect(state).toEqual([]);
    });

    it("should not add a new ripple if the mousedown event is triggered while app is in touch mode", () => {
      const spy = jest.spyOn(document, "querySelector");
      spy.mockImplementation(() => document.documentElement);
      let state: RipplesState = [];
      let create: (event: RippleEvent<HTMLElement>) => void;
      const Test = () => {
        ({ state, create } = useRippleTransition(false));
        return (
          <button type="button" onMouseDown={create}>
            Button
          </button>
        );
      };

      const { getByText } = render(<Test />);
      const button = getByText("Button");
      expect(state).toEqual([]);

      fireEvent.mouseDown(button, { button: 0 });
      expect(state).toEqual([]);

      spy.mockRestore();
    });
  });
});
