import { IncrementMovementKey, JumpMovementKey, KeyConfig } from "../types";
import {
  getItemId,
  getKeyboardConfig,
  getStringifiedKeyConfig,
  transformKeys,
} from "../utils";

describe("getItemId", () => {
  it("should return a list with the base id concatenated with the index + 1 since DOM nodes should normally start at 1 instead of 0", () => {
    expect(getItemId("base-id", 0)).toBe("base-id-item-1");
    expect(getItemId("base-id", 1)).toBe("base-id-item-2");
    expect(getItemId("base-id", 2)).toBe("base-id-item-3");
    expect(getItemId("base-id", 100)).toBe("base-id-item-101");

    expect(getItemId("id", 0)).toBe("id-item-1");
    expect(getItemId("id", 1)).toBe("id-item-2");
    expect(getItemId("id", 2)).toBe("id-item-3");
    expect(getItemId("id", 100)).toBe("id-item-101");
  });

  it("should throw an error if the provided index is less than 0", () => {
    expect(() => getItemId("base-id", -1)).toThrowError(
      "The provided index must be greater than 0"
    );
    expect(() => getItemId("base-id", -2)).toThrowError(
      "The provided index must be greater than 0"
    );
    expect(() => getItemId("base-id", -100)).toThrowError(
      "The provided index must be greater than 0"
    );
  });

  it("should throw an error if the provided id is the empty string", () => {
    expect(() => getItemId("", 0)).toThrowError(
      "The id must be a string with a length greater than 0"
    );
    expect(() => getItemId("", 1)).toThrowError(
      "The id must be a string with a length greater than 0"
    );
    expect(() => getItemId("", 100)).toThrowError(
      "The id must be a string with a length greater than 0"
    );
  });
});

describe("getKeyboardConfig", () => {
  const letterAEvent = {
    key: "A",
    altKey: false,
    ctrlKey: false,
    metaKey: false,
    shiftKey: false,
  } as KeyboardEvent;
  const letterBEvent = {
    key: "B",
    altKey: false,
    ctrlKey: false,
    metaKey: true,
    shiftKey: false,
  } as KeyboardEvent;
  const letterCEvent = {
    key: "C",
    altKey: true,
    ctrlKey: false,
    metaKey: false,
    shiftKey: true,
  } as KeyboardEvent;
  const tabEvent = {
    key: "Tab",
    altKey: true,
    ctrlKey: false,
    metaKey: true,
    shiftKey: true,
  } as KeyboardEvent;

  it("should return null if the event does not have a corresponding IKeyboardFocusKeyEvent", () => {
    expect(getKeyboardConfig(letterAEvent, [])).toBeNull();
    expect(getKeyboardConfig(letterBEvent, [])).toBeNull();
    expect(getKeyboardConfig(letterCEvent, [])).toBeNull();
    expect(getKeyboardConfig(tabEvent, [])).toBeNull();

    expect(
      getKeyboardConfig(letterAEvent, [
        {
          key: "A",
          type: "increment",
          altKey: false,
          ctrlKey: false,
          metaKey: false,
          shiftKey: true,
        },
      ])
    ).toBeNull();

    expect(
      getKeyboardConfig(letterBEvent, [
        {
          key: "B",
          type: "increment",
          altKey: false,
          ctrlKey: false,
          metaKey: true,
          shiftKey: true,
        },
      ])
    ).toBeNull();
  });

  it("should return the type when the key, metaKey, altKey, and shiftKey match up", () => {
    const key1: KeyConfig = {
      key: "A",
      type: "increment",
      altKey: false,
      ctrlKey: false,
      metaKey: false,
      shiftKey: false,
    };
    const key2: KeyConfig = {
      key: "B",
      type: "increment",
      altKey: false,
      ctrlKey: false,
      metaKey: true,
      shiftKey: false,
    };

    expect(getKeyboardConfig(letterAEvent, [key1])).toEqual(key1);
    expect(getKeyboardConfig(letterBEvent, [key2])).toEqual(key2);
  });
});

describe("getStringifiedKeyConfig", () => {
  it("should return the correct strings", () => {
    const homeKey: KeyConfig = {
      key: "Home",
      type: "first",
      altKey: false,
      ctrlKey: false,
      metaKey: false,
      shiftKey: false,
    };

    expect(getStringifiedKeyConfig(homeKey)).toBe("first-Home");
    expect(getStringifiedKeyConfig({ ...homeKey, ctrlKey: true })).toBe(
      "first-Control+Home"
    );
    expect(
      getStringifiedKeyConfig({ ...homeKey, ctrlKey: true, metaKey: true })
    ).toBe("first-Meta+Control+Home");
    expect(
      getStringifiedKeyConfig({ ...homeKey, ctrlKey: true, altKey: true })
    ).toBe("first-Control+Alt+Home");
    expect(
      getStringifiedKeyConfig({ ...homeKey, shiftKey: true, altKey: true })
    ).toBe("first-Shift+Alt+Home");
  });
});

describe("transformKeys", () => {
  it("should create a list of key objects that have the shiftKey, metaKey, altKey, key, and type properties defined", () => {
    expect(
      transformKeys([IncrementMovementKey.ArrowDown], "increment")
    ).toEqual([
      {
        shiftKey: false,
        metaKey: false,
        ctrlKey: false,
        altKey: false,
        key: "ArrowDown",
        type: "increment",
      },
    ]);

    expect(
      transformKeys([IncrementMovementKey.ArrowDown], "decrement")
    ).toEqual([
      {
        shiftKey: false,
        metaKey: false,
        ctrlKey: false,
        altKey: false,
        key: "ArrowDown",
        type: "decrement",
      },
    ]);

    expect(transformKeys([JumpMovementKey.Home], "first")).toEqual([
      {
        shiftKey: false,
        metaKey: false,
        ctrlKey: false,
        altKey: false,
        key: "Home",
        type: "first",
      },
    ]);

    expect(transformKeys([JumpMovementKey.End], "last")).toEqual([
      {
        shiftKey: false,
        metaKey: false,
        ctrlKey: false,
        altKey: false,
        key: "End",
        type: "last",
      },
    ]);
  });

  it("should be able to transform multiple keys", () => {
    expect(
      transformKeys(
        [IncrementMovementKey.ArrowDown, IncrementMovementKey.ArrowUp],
        "increment"
      )
    ).toEqual([
      {
        shiftKey: false,
        metaKey: false,
        ctrlKey: false,
        altKey: false,
        key: "ArrowDown",
        type: "increment",
      },
      {
        shiftKey: false,
        metaKey: false,
        ctrlKey: false,
        altKey: false,
        key: "ArrowUp",
        type: "increment",
      },
    ]);
  });

  it("should correctly parse the Alt, Shift, and Meta keys from the string", () => {
    expect(
      transformKeys([IncrementMovementKey.ShiftArrowDown], "decrement")
    ).toEqual([
      {
        shiftKey: true,
        metaKey: false,
        ctrlKey: false,
        altKey: false,
        key: "ArrowDown",
        type: "decrement",
      },
    ]);

    expect(
      transformKeys([IncrementMovementKey.AltArrowDown], "decrement")
    ).toEqual([
      {
        shiftKey: false,
        metaKey: false,
        ctrlKey: false,
        altKey: true,
        key: "ArrowDown",
        type: "decrement",
      },
    ]);
  });

  it("should correctly parse multiple modifiers in a string", () => {
    const keys = [
      JumpMovementKey.ControlShiftHome,
      JumpMovementKey.ControlShiftEnd,
    ];

    const expected = [
      {
        shiftKey: true,
        metaKey: false,
        ctrlKey: true,
        altKey: false,
        key: "Home",
        type: "decrement",
      },
      {
        shiftKey: true,
        metaKey: false,
        ctrlKey: true,
        altKey: false,
        key: "End",
        type: "decrement",
      },
    ];

    expect(transformKeys(keys, "decrement")).toEqual(expected);
  });
});
