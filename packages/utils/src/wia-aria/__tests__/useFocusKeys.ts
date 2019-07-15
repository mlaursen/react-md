import { cleanup } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import {
  getKeyboardEventType,
  transformKeys,
  useMemoizedFocusKeys,
} from "../useFocusKeys";

describe("getKeyboardEventType", () => {
  const letterAEvent = {
    key: "A",
    altKey: false,
    metaKey: false,
    shiftKey: false,
  } as KeyboardEvent;
  const letterBEvent = {
    key: "B",
    altKey: false,
    metaKey: true,
    shiftKey: false,
  } as KeyboardEvent;
  const letterCEvent = {
    key: "C",
    altKey: true,
    metaKey: false,
    shiftKey: true,
  } as KeyboardEvent;
  const tabEvent = {
    key: "Tab",
    altKey: true,
    metaKey: true,
    shiftKey: true,
  } as KeyboardEvent;

  it("should return null if the event does not have a corresponding IKeyboardFocusKeyEvent", () => {
    expect(getKeyboardEventType(letterAEvent, [])).toBeNull();
    expect(getKeyboardEventType(letterBEvent, [])).toBeNull();
    expect(getKeyboardEventType(letterCEvent, [])).toBeNull();
    expect(getKeyboardEventType(tabEvent, [])).toBeNull();

    expect(
      getKeyboardEventType(letterAEvent, [
        {
          key: "A",
          type: "increment",
          altKey: false,
          metaKey: false,
          shiftKey: true,
        },
      ])
    ).toBeNull();

    expect(
      getKeyboardEventType(letterBEvent, [
        {
          key: "B",
          type: "increment",
          altKey: false,
          metaKey: true,
          shiftKey: true,
        },
      ])
    ).toBeNull();
  });

  it("should return the type when the key, metaKey, altKey, and shiftKey match up", () => {
    expect(
      getKeyboardEventType(letterAEvent, [
        {
          key: "A",
          type: "increment",
          altKey: false,
          metaKey: false,
          shiftKey: false,
        },
      ])
    ).toBe("increment");

    expect(
      getKeyboardEventType(letterBEvent, [
        {
          key: "B",
          type: "increment",
          altKey: false,
          metaKey: true,
          shiftKey: false,
        },
      ])
    ).toBe("increment");
  });
});

describe("transformKeys", () => {
  it("should create a list of key objects that have the shiftKey, metaKey, altKey, key, and type properties defined", () => {
    expect(transformKeys(["Tab"], "increment")).toEqual([
      {
        shiftKey: false,
        metaKey: false,
        altKey: false,
        key: "Tab",
        type: "increment",
      },
    ]);

    expect(transformKeys(["Tab"], "decrement")).toEqual([
      {
        shiftKey: false,
        metaKey: false,
        altKey: false,
        key: "Tab",
        type: "decrement",
      },
    ]);

    expect(transformKeys(["Home"], "first")).toEqual([
      {
        shiftKey: false,
        metaKey: false,
        altKey: false,
        key: "Home",
        type: "first",
      },
    ]);

    expect(transformKeys(["End"], "last")).toEqual([
      {
        shiftKey: false,
        metaKey: false,
        altKey: false,
        key: "End",
        type: "last",
      },
    ]);
  });

  it("should be able to transform multiple keys", () => {
    expect(transformKeys(["Tab", "ArrowDown"], "increment")).toEqual([
      {
        shiftKey: false,
        metaKey: false,
        altKey: false,
        key: "Tab",
        type: "increment",
      },
      {
        shiftKey: false,
        metaKey: false,
        altKey: false,
        key: "ArrowDown",
        type: "increment",
      },
    ]);
  });

  it("should correctly parse the Alt, Shift, and Meta keys from the string", () => {
    expect(transformKeys(["Shift+Tab"], "decrement")).toEqual([
      {
        shiftKey: true,
        metaKey: false,
        altKey: false,
        key: "Tab",
        type: "decrement",
      },
    ]);

    expect(transformKeys(["Meta+Tab"], "decrement")).toEqual([
      {
        shiftKey: false,
        metaKey: true,
        altKey: false,
        key: "Tab",
        type: "decrement",
      },
    ]);

    expect(transformKeys(["Alt+Tab"], "decrement")).toEqual([
      {
        shiftKey: false,
        metaKey: false,
        altKey: true,
        key: "Tab",
        type: "decrement",
      },
    ]);
  });

  it("should correctly parse multiple modifiers in a string", () => {
    const keys = [
      "Shift+Tab",
      "Alt+A",
      "Meta+Home",
      "Shift+Alt+Tab",
      "Meta+Alt+P",
      "Shift+Alt+Meta+S",
      "Alt+Meta+Shift+B",
    ];

    const expected = [
      {
        shiftKey: true,
        metaKey: false,
        altKey: false,
        key: "Tab",
        type: "decrement",
      },
      {
        shiftKey: false,
        metaKey: false,
        altKey: true,
        key: "A",
        type: "decrement",
      },
      {
        shiftKey: false,
        metaKey: true,
        altKey: false,
        key: "Home",
        type: "decrement",
      },
      {
        shiftKey: true,
        metaKey: false,
        altKey: true,
        key: "Tab",
        type: "decrement",
      },
      {
        shiftKey: false,
        metaKey: true,
        altKey: true,
        key: "P",
        type: "decrement",
      },
      {
        shiftKey: true,
        metaKey: true,
        altKey: true,
        key: "S",
        type: "decrement",
      },
      {
        shiftKey: true,
        metaKey: true,
        altKey: true,
        key: "B",
        type: "decrement",
      },
    ];

    expect(transformKeys(keys, "decrement")).toEqual(expected);
  });
});

describe("useMemoizedFocusKeys", () => {
  afterEach(cleanup);

  it("should return the correct list of keys", () => {
    const { result } = renderHook(() =>
      useMemoizedFocusKeys({
        incrementKeys: ["ArrowDown"],
        decrementKeys: ["ArrowUp"],
        jumpToFirstKeys: ["Home"],
        jumpToLastKeys: ["End"],
      })
    );

    expect(result.current).toEqual([
      {
        key: "ArrowDown",
        type: "increment",
        altKey: false,
        metaKey: false,
        shiftKey: false,
      },
      {
        key: "ArrowUp",
        type: "decrement",
        altKey: false,
        metaKey: false,
        shiftKey: false,
      },
      {
        key: "Home",
        type: "first",
        altKey: false,
        metaKey: false,
        shiftKey: false,
      },
      {
        key: "End",
        type: "last",
        altKey: false,
        metaKey: false,
        shiftKey: false,
      },
    ]);
  });
});
