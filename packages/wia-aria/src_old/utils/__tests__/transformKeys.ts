import transformKeys from "../transformKeys";

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
