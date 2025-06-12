import { describe, expect, it } from "@jest/globals";

import { caseInsensitiveSearch } from "../caseInsensitive.js";

const FRUITS = ["Apple", "Banana", "Mango", "Orange"];

describe("caseInsensitiveSearch", () => {
  it("should return the list if it is empty or there is no query string", () => {
    const list1: string[] = [];
    const list2 = ["item1", "item2"];

    expect(caseInsensitiveSearch({ query: "", list: list1 })).toBe(list1);
    expect(caseInsensitiveSearch({ query: "", list: list2 })).toBe(list2);

    expect(caseInsensitiveSearch({ query: "string", list: list1 })).toBe(list1);
  });

  it("should filter out all items that do not contain the query string ignoring case", () => {
    const expected1 = ["Apple"];
    expect(caseInsensitiveSearch({ query: "ap", list: FRUITS })).toEqual(
      expected1
    );
    expect(caseInsensitiveSearch({ query: "aP", list: FRUITS })).toEqual(
      expected1
    );
    expect(caseInsensitiveSearch({ query: "AP", list: FRUITS })).toEqual(
      expected1
    );

    const expected2 = ["Banana", "Mango", "Orange"];
    expect(caseInsensitiveSearch({ query: "an", list: FRUITS })).toEqual(
      expected2
    );
    expect(caseInsensitiveSearch({ query: "AN", list: FRUITS })).toEqual(
      expected2
    );
    expect(caseInsensitiveSearch({ query: "aN", list: FRUITS })).toEqual(
      expected2
    );
  });

  it("should allow for filtering by matches that start with the query string instead of contain only", () => {
    expect(
      caseInsensitiveSearch({
        query: "ap",
        list: FRUITS,
        startsWith: true,
      })
    ).toEqual(["Apple"]);
    expect(
      caseInsensitiveSearch({
        query: "an",
        list: FRUITS,
        startsWith: true,
      })
    ).toEqual([]);

    const list = ["Item 1", "This is Item 1"];
    expect(
      caseInsensitiveSearch({
        query: "item",
        list,
        startsWith: true,
      })
    ).toEqual(["Item 1"]);
  });

  it("should work on objects", () => {
    const apple = { name: "Apple", value: 0 };
    const banana = { name: "Banana", value: 1 };
    const mango = { name: "Mango", value: 2 };
    const orange = { name: "Orange", value: 3 };
    const list = [apple, banana, mango, orange];

    expect(
      caseInsensitiveSearch({
        query: "ap",
        list,
        extractor: (item) => item.name,
      })
    ).toEqual([apple]);
    expect(
      caseInsensitiveSearch({
        query: "2",
        list,
        extractor: (item) => `${item.value}`,
      })
    ).toEqual([mango]);

    expect(
      caseInsensitiveSearch({
        query: "an",
        list,
        extractor: (item) => item.name,
      })
    ).toEqual([banana, mango, orange]);
  });

  it("should allow whitespace to be trimmed", () => {
    expect(
      caseInsensitiveSearch({
        list: FRUITS,
        query: "   app",
        whitespace: "trim",
      })
    ).toEqual(["Apple"]);
    expect(
      caseInsensitiveSearch({
        list: FRUITS,
        query: "   app   ",
        whitespace: "trim",
      })
    ).toEqual(["Apple"]);
  });

  it("should throw an error if an extractor is not provided for a non-string or known object list", () => {
    expect(() =>
      // @ts-expect-error
      caseInsensitiveSearch({ query: "q", list: [0, 1, 2] })
    ).toThrow(
      "`caseInsensitiveSearch` requires the `extractor` prop for lists that do not contain strings or known object types."
    );

    expect(() =>
      // @ts-expect-error
      caseInsensitiveSearch({ query: "q", list: [null, undefined] })
    ).toThrow(
      "`caseInsensitiveSearch` requires the `extractor` prop for lists that do not contain strings or known object types."
    );

    expect(() =>
      caseInsensitiveSearch({ query: "q", list: [{ name: "Qwerty" }] })
    ).not.toThrow();
    expect(() =>
      caseInsensitiveSearch({
        query: "q",
        list: [{ name: "Qwerty" }, { label: "Another" }, "Hello!"],
      })
    ).not.toThrow();
  });

  it("should find the first match when the type is set to search", () => {
    const fruits = ["Banana", "Grape", "Apple", "Orange"];
    expect(
      caseInsensitiveSearch({
        list: fruits,
        query: "ap",
        type: "search",
      })
    ).toBe("Grape");

    expect(
      caseInsensitiveSearch({
        list: fruits,
        query: "ap",
        type: "search",
        startsWith: true,
      })
    ).toBe("Apple");

    expect(
      caseInsensitiveSearch({
        list: [],
        query: "",
        type: "search",
      })
    ).toBe(undefined);
  });
});
