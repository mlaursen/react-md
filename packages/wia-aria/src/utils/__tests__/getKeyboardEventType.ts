import getKeyboardEventType from "../getKeyboardEventType";

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
