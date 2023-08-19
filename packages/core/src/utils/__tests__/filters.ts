import { describe, expect, it, jest } from "@jest/globals";
import { caseInsensitiveFilter, fuzzyFilter } from "../filters.js";

const FRUITS = ["Apple", "Banana", "Mango", "Orange"];

describe("caseInsensitiveFilter", () => {
  it("should return the list if it is empty or there is no query string", () => {
    const list1: string[] = [];
    const list2 = ["item1", "item2"];

    expect(caseInsensitiveFilter({ query: "", list: list1 })).toBe(list1);
    expect(caseInsensitiveFilter({ query: "", list: list2 })).toBe(list2);

    expect(caseInsensitiveFilter({ query: "string", list: list1 })).toBe(list1);
  });

  it("should filter out all items that do not contain the query string ignoring case", () => {
    const expected1 = ["Apple"];
    expect(caseInsensitiveFilter({ query: "ap", list: FRUITS })).toEqual(
      expected1
    );
    expect(caseInsensitiveFilter({ query: "aP", list: FRUITS })).toEqual(
      expected1
    );
    expect(caseInsensitiveFilter({ query: "AP", list: FRUITS })).toEqual(
      expected1
    );

    const expected2 = ["Banana", "Mango", "Orange"];
    expect(caseInsensitiveFilter({ query: "an", list: FRUITS })).toEqual(
      expected2
    );
    expect(caseInsensitiveFilter({ query: "AN", list: FRUITS })).toEqual(
      expected2
    );
    expect(caseInsensitiveFilter({ query: "aN", list: FRUITS })).toEqual(
      expected2
    );
  });

  it("should allow for filtering by matches that start with the query string instead of contain only", () => {
    expect(
      caseInsensitiveFilter({
        query: "ap",
        list: FRUITS,
        startsWith: true,
      })
    ).toEqual(["Apple"]);
    expect(
      caseInsensitiveFilter({
        query: "an",
        list: FRUITS,
        startsWith: true,
      })
    ).toEqual([]);

    const list = ["Item 1", "This is Item 1"];
    expect(
      caseInsensitiveFilter({
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
      caseInsensitiveFilter({
        query: "ap",
        list,
        extractor: (item) => item.name,
      })
    ).toEqual([apple]);
    expect(
      caseInsensitiveFilter({
        query: "2",
        list,
        extractor: (item) => `${item.value}`,
      })
    ).toEqual([mango]);

    expect(
      caseInsensitiveFilter({
        query: "an",
        list,
        extractor: (item) => item.name,
      })
    ).toEqual([banana, mango, orange]);
  });

  it("should allow whitespace to be trimmed", () => {
    expect(
      caseInsensitiveFilter({
        list: FRUITS,
        query: "   app",
        whitespace: "trim",
      })
    ).toEqual(["Apple"]);
    expect(
      caseInsensitiveFilter({
        list: FRUITS,
        query: "   app   ",
        whitespace: "trim",
      })
    ).toEqual(["Apple"]);
  });

  it("should throw an error if an extractor is not provided for a non-string list", () => {
    expect(() =>
      // @ts-expect-error
      caseInsensitiveFilter({ query: "q", list: [0, 1, 2] })
    ).toThrow(
      "A `TextExtractor` must be provided to `caseInsensitiveFilter` for lists that do not contain strings"
    );

    expect(() =>
      // @ts-expect-error
      caseInsensitiveFilter({ query: "q", list: [null, undefined] })
    ).toThrow(
      "A `TextExtractor` must be provided to `caseInsensitiveFilter` for lists that do not contain strings"
    );

    expect(() =>
      // @ts-expect-error
      caseInsensitiveFilter({ query: "q", list: [{ name: "Qwerty" }] })
    ).toThrow(
      "A `TextExtractor` must be provided to `caseInsensitiveFilter` for lists that do not contain strings"
    );
  });
});

describe("fuzzyFilter", () => {
  it("should return the list as-is if it is empty or there is no query string", () => {
    const list1: string[] = [];
    const list2 = ["item1", "item2"];

    expect(
      fuzzyFilter({
        list: list1,
        query: "",
      })
    ).toBe(list1);
    expect(
      fuzzyFilter({
        list: list1,
        query: "query",
      })
    ).toBe(list1);

    expect(
      fuzzyFilter({
        list: list2,
        query: "",
      })
    ).toBe(list2);
  });

  it("should filter the list by ensuring that the letters just appear in order in the string", () => {
    expect(
      fuzzyFilter({
        list: FRUITS,
        query: "ae",
      })
    ).toEqual(["Apple", "Orange"]);
    expect(
      fuzzyFilter({
        list: FRUITS,
        query: "aE",
      })
    ).toEqual(["Apple", "Orange"]);

    const nonDeprecatedStringPropertyNames = [
      "at",
      "charAt",
      "charCodeAt",
      "codePointAt",
      "concat",
      "constructor",
      "endsWith",
      "includes",
      "indexOf",
      "lastIndexOf",
      "length",
      "localeCompare",
      "match",
      "matchAll",
      "normalize",
      "padEnd",
      "padStart",
      "repeat",
      "replace",
      "replaceAll",
      "search",
      "slice",
      "split",
      "startsWith",
      "substring",
      "toLocaleLowerCase",
      "toLocaleUpperCase",
      "toLowerCase",
      "toString",
      "toUpperCase",
      "trim",
      "trimEnd",
      "trimStart",
      "valueOf",
    ];

    expect(
      fuzzyFilter({
        list: nonDeprecatedStringPropertyNames,
        query: "la",
      })
    ).toEqual([
      "lastIndexOf",
      "localeCompare",
      "replace",
      "replaceAll",
      "toLocaleLowerCase",
      "toLocaleUpperCase",
      "toLowerCase",
    ]);
  });

  it("should lazy-create the regexp", () => {
    const reg = jest.spyOn(global, "RegExp");

    const list = Array.from({ length: 100000 }, (_, i) => `${i} Item`);
    fuzzyFilter({ list, query: "1" });
    expect(reg).toHaveBeenCalledTimes(1);
  });

  it("should support ignoring whitespace", () => {
    const item1 = "Lorem ipsum";
    const item2 = "another item";
    const item3 = "in this string";
    const item4 = "not interested, mate";
    const item5 = "not in my house";
    const list = [item1, item2, item3, item4, item5];

    expect(
      fuzzyFilter({
        list,
        query: "ti",
        whitespace: "ignore",
      })
    ).toEqual([item2, item3, item4, item5]);

    expect(
      fuzzyFilter({
        list,
        query: "t i",
        whitespace: "ignore",
      })
    ).toEqual([item2, item3, item4, item5]);

    expect(
      fuzzyFilter({
        list,
        query: "rem",
        whitespace: "ignore",
      })
    ).toEqual([item1, item2]);
    expect(
      fuzzyFilter({
        list,
        query: "tem",
        whitespace: "ignore",
      })
    ).toEqual([item2]);
  });
});
