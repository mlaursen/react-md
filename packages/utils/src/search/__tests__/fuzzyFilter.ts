import { fuzzyFilter } from "../fuzzyFilter";

describe("fuzzyFilter", () => {
  it("should return the list if it is empty or there is no query string", () => {
    const list1: string[] = [];
    const list2 = [null];
    const list3 = [undefined];
    const list4 = ["item1", "item2"];

    expect(fuzzyFilter("", list1)).toBe(list1);
    expect(fuzzyFilter("", list2)).toBe(list2);
    expect(fuzzyFilter("", list3)).toBe(list3);
    expect(fuzzyFilter("", list4)).toBe(list4);

    expect(fuzzyFilter("    ", list1)).toBe(list1);
    expect(fuzzyFilter("    ", list2)).toBe(list2);
    expect(fuzzyFilter("    ", list3)).toBe(list3);
    expect(fuzzyFilter("    ", list4)).toBe(list4);

    expect(fuzzyFilter("string", list1)).toBe(list1);
  });

  it("should return the correct list", () => {
    const list1 = ["Apple", "Banana", "Mango", "Orange"];
    expect(fuzzyFilter("ae", list1)).toEqual(["Apple", "Orange"]);

    const item1 = "Lorem ipsum";
    const item2 = "another item";
    const item3 = "in this string";
    const item4 = "not interested, mate";
    const item5 = "not in my house";
    const list2 = [item1, item2, item3, item4, item5];

    expect(fuzzyFilter("ti", list2)).toEqual([item3]);
    expect(fuzzyFilter("t i", list2)).toEqual([item2, item3, item4, item5]);
    expect(fuzzyFilter("rem", list2)).toEqual([item1]);
    expect(fuzzyFilter("tem", list2)).toEqual([item2]);
  });

  it("should return the correct list when whitespace is ignored", () => {
    const item1 = "Lorem ipsum";
    const item2 = "another item";
    const item3 = "in this string";
    const item4 = "not interested, mate";
    const item5 = "not in my house";
    const list = [item1, item2, item3, item4, item5];

    expect(fuzzyFilter("ti", list, { ignoreWhitespace: true })).toEqual([
      item2,
      item3,
      item4,
      item5,
    ]);
    expect(fuzzyFilter("t i", list, { ignoreWhitespace: true })).toEqual([
      item2,
      item3,
      item4,
      item5,
    ]);
    expect(fuzzyFilter("rem", list, { ignoreWhitespace: true })).toEqual([
      item1,
      item2,
    ]);
    expect(fuzzyFilter("tem", list, { ignoreWhitespace: true })).toEqual([
      item2,
    ]);
  });
});
