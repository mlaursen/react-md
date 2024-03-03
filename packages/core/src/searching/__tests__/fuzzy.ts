import { describe, expect, it, jest } from "@jest/globals";
import { fuzzySearch } from "../fuzzy.js";

const FRUITS = ["Apple", "Banana", "Mango", "Orange"];
const NON_DEPRECATED_STRING_PROPERTY_NAMES = [
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

describe("fuzzySearch", () => {
  it("should return the list as-is if it is empty or there is no query string", () => {
    const list1: string[] = [];
    const list2 = ["item1", "item2"];

    expect(
      fuzzySearch({
        list: list1,
        query: "",
      })
    ).toBe(list1);
    expect(
      fuzzySearch({
        list: list1,
        query: "query",
      })
    ).toBe(list1);

    expect(
      fuzzySearch({
        list: list2,
        query: "",
      })
    ).toBe(list2);
  });

  it("should filter the list by ensuring that the letters just appear in order in the string", () => {
    expect(
      fuzzySearch({
        list: FRUITS,
        query: "ae",
      })
    ).toEqual(["Apple", "Orange"]);
    expect(
      fuzzySearch({
        list: FRUITS,
        query: "aE",
      })
    ).toEqual(["Apple", "Orange"]);

    expect(
      fuzzySearch({
        list: NON_DEPRECATED_STRING_PROPERTY_NAMES,
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
    fuzzySearch({ list, query: "1" });
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
      fuzzySearch({
        list,
        query: "ti",
        whitespace: "ignore",
      })
    ).toEqual([item2, item3, item4, item5]);

    expect(
      fuzzySearch({
        list,
        query: "t i",
        whitespace: "ignore",
      })
    ).toEqual([item2, item3, item4, item5]);

    expect(
      fuzzySearch({
        list,
        query: "rem",
        whitespace: "ignore",
      })
    ).toEqual([item1, item2]);
    expect(
      fuzzySearch({
        list,
        query: "tem",
        whitespace: "ignore",
      })
    ).toEqual([item2]);
  });

  it("should return the first match when the is set to search", () => {
    expect(
      fuzzySearch({
        list: NON_DEPRECATED_STRING_PROPERTY_NAMES,
        query: "ad",
        type: "search",
      })
    ).toBe("charCodeAt");
    expect(
      fuzzySearch({
        list: NON_DEPRECATED_STRING_PROPERTY_NAMES,
        query: "add",
        type: "search",
      })
    ).toBe("padEnd");
    expect(
      fuzzySearch({
        list: NON_DEPRECATED_STRING_PROPERTY_NAMES,
        query: "addition",
        type: "search",
      })
    ).toBe(undefined);
  });
});
