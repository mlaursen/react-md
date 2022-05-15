import { caseInsensitiveFilter } from "../caseInsensitiveFilter";

const FRUITS = ["Apple", "Banana", "Mango", "Orange"];

describe("caseInsensitiveFilter", () => {
  it("should return the list if it is empty or there is no query string", () => {
    const list1: string[] = [];
    const list2 = [null];
    const list3 = [undefined];
    const list4 = ["item1", "item2"];

    expect(caseInsensitiveFilter("", list1)).toBe(list1);
    expect(caseInsensitiveFilter("", list2)).toBe(list2);
    expect(caseInsensitiveFilter("", list3)).toBe(list3);
    expect(caseInsensitiveFilter("", list4)).toBe(list4);

    expect(caseInsensitiveFilter("    ", list1)).toBe(list1);
    expect(caseInsensitiveFilter("    ", list2)).toBe(list2);
    expect(caseInsensitiveFilter("    ", list3)).toBe(list3);
    expect(caseInsensitiveFilter("    ", list4)).toBe(list4);

    expect(caseInsensitiveFilter("string", list1)).toBe(list1);
  });

  it("should filter out all items that do not contain the query string ignoring case", () => {
    const expected1 = ["Apple"];
    expect(caseInsensitiveFilter("ap", FRUITS)).toEqual(expected1);
    expect(caseInsensitiveFilter("aP", FRUITS)).toEqual(expected1);
    expect(caseInsensitiveFilter("AP", FRUITS)).toEqual(expected1);

    const expected2 = ["Banana", "Mango", "Orange"];
    expect(caseInsensitiveFilter("an", FRUITS)).toEqual(expected2);
    expect(caseInsensitiveFilter("AN", FRUITS)).toEqual(expected2);
    expect(caseInsensitiveFilter("aN", FRUITS)).toEqual(expected2);
  });

  it("should allow for filtering by matches that start with the query string instead of contain only", () => {
    expect(caseInsensitiveFilter("ap", FRUITS, { startsWith: true })).toEqual([
      "Apple",
    ]);
    expect(caseInsensitiveFilter("an", FRUITS, { startsWith: true })).toEqual(
      []
    );

    const list = ["Item 1", "This is Item 1"];
    expect(caseInsensitiveFilter("item", list, { startsWith: true })).toEqual([
      "Item 1",
    ]);
  });

  it("should work on objects", () => {
    const apple = { name: "Apple", value: 0 };
    const banana = { name: "Banana", value: 1 };
    const mango = { name: "Mango", value: 2 };
    const orange = { name: "Orange", value: 3 };
    const list = [apple, banana, mango, orange];

    expect(caseInsensitiveFilter("ap", list)).toEqual([]);
    expect(caseInsensitiveFilter("2", list)).toEqual([mango]);
    expect(caseInsensitiveFilter("an", list, { valueKey: "name" })).toEqual([
      banana,
      mango,
      orange,
    ]);
  });
});
