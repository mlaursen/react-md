import { findIgnoreCase } from "../findIgnoreCase";

const FRUITS = ["Apple", "Banana", "Mango", "Orange"];

describe("findIgnoreCase", () => {
  it("should always return null if the query string is the empty string or the searchable list is empty", () => {
    expect(findIgnoreCase("", FRUITS)).toBe(null);
    expect(findIgnoreCase("", [])).toBe(null);
    expect(findIgnoreCase("result", [])).toBe(null);
    expect(findIgnoreCase("", [0])).toBe(null);
  });

  it("should trim leading and trailing spaces for both the query string and item values by default", () => {
    const item1 = "    Apple";
    const item2 = "  Another";
    const item3 = "trailing     ";
    const item4 = "trailing spaces   ";
    const list = [item1, item2, item3, item4];
    expect(findIgnoreCase("a", list)).toBe(item1);
    expect(findIgnoreCase("app", list)).toBe(item1);
    expect(findIgnoreCase("an", list)).toBe(item2);
    expect(findIgnoreCase("trailing", list)).toBe(item3);
    expect(findIgnoreCase("trailing s", list)).toBe(item4);

    expect(findIgnoreCase("  a", list)).toBe(item1);
    expect(findIgnoreCase("app   ", list)).toBe(item1);
    expect(findIgnoreCase("  an  ", list)).toBe(item2);
    expect(findIgnoreCase("    trailing", list)).toBe(item3);
    expect(findIgnoreCase("  trailing s   ", list)).toBe(item4);
  });

  it("should return null if none of the strings exist in the searchable list", () => {
    expect(findIgnoreCase("dandelion", FRUITS)).toBe(null);
    expect(findIgnoreCase("d", FRUITS)).toBe(null);
    expect(findIgnoreCase("apr", FRUITS)).toBe(null);
  });

  it("should return the correct match if one of the items starts with the query string", () => {
    expect(findIgnoreCase("A", FRUITS)).toBe("Apple");
    expect(findIgnoreCase("a", FRUITS)).toBe("Apple");
    expect(findIgnoreCase("app", FRUITS)).toBe("Apple");
    expect(findIgnoreCase("aPp", FRUITS)).toBe("Apple");

    expect(findIgnoreCase("Man", FRUITS)).toBe("Mango");
  });

  it("should always return the first match even if multiple items start with the same letters", () => {
    const list = [
      "Apple 1",
      "Apple 2",
      "Apple 3",
      "apple1",
      "apple2",
      "apple3",
    ];

    expect(findIgnoreCase("app", list)).toBe("Apple 1");
    expect(findIgnoreCase("App", list)).toBe("Apple 1");
    expect(findIgnoreCase("apple", list)).toBe("Apple 1");
  });

  it("should work with numbers out of the box", () => {
    const list = [0, 1, 2, 3, 4, -5, -4];
    expect(findIgnoreCase("0", list)).toBe(0);
    expect(findIgnoreCase("1", list)).toBe(1);
    expect(findIgnoreCase("4", list)).toBe(4);
    expect(findIgnoreCase("-4", list)).toBe(-4);
  });

  it("should default to allowing objects and extracting the value key", () => {
    const item1 = { id: 1, value: "First" };
    const item2 = { id: 2, value: "Second" };
    const item3 = { id: 3, value: "Third" };
    const list = [item1, item2, item3];

    expect(findIgnoreCase("", list)).toBe(null);
    expect(findIgnoreCase("f", list)).toBe(item1);
    expect(findIgnoreCase("s", list)).toBe(item2);
    expect(findIgnoreCase("thi", list)).toBe(item3);
  });

  it("should call the value key if it is a function", () => {
    const item1 = { id: 1, value: () => "First" };
    const item2 = { id: 2, value: () => "Second" };
    const item3 = { id: 3, value: () => "Third" };
    const list = [item1, item2, item3];

    expect(findIgnoreCase("", list)).toBe(null);
    expect(findIgnoreCase("f", list)).toBe(item1);
    expect(findIgnoreCase("s", list)).toBe(item2);
    expect(findIgnoreCase("thi", list)).toBe(item3);
  });

  it("should allow for a custom getItemValue", () => {
    const getItemValue1 = (item: string) => `thing-${item}`;
    expect(
      findIgnoreCase("thing-a", FRUITS, { getItemValue: getItemValue1 })
    ).toBe("Apple");

    interface Item {
      id: string;
      name: string;
      value: string;
    }
    const getItemValue2 = (item: Item) => `${item.name}-${item.value}`;
    const item1: Item = {
      id: "item-1",
      name: "item",
      value: "10",
    };
    const item2: Item = {
      id: "item-2",
      name: "ITEM",
      value: "100",
    };
    const item3: Item = {
      id: "item-3",
      name: "IteM",
      value: "-10",
    };
    const list = [item1, item2, item3];
    expect(findIgnoreCase("item", list, { getItemValue: getItemValue2 })).toBe(
      item1
    );
    expect(findIgnoreCase("item-", list, { getItemValue: getItemValue2 })).toBe(
      item1
    );
    expect(
      findIgnoreCase("item-100", list, { getItemValue: getItemValue2 })
    ).toBe(item2);
    expect(
      findIgnoreCase("item--10", list, { getItemValue: getItemValue2 })
    ).toBe(item3);
  });

  it("should filter out null, undefined, or booleans", () => {
    const list = [null, undefined, true, false, "Thing"];
    expect(findIgnoreCase("null", list)).toBe(null);
    expect(findIgnoreCase("t", list)).toBe("Thing");
    expect(findIgnoreCase("tr", list)).toBe(null);
  });
});
