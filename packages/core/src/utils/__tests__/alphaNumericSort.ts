import { describe, expect, it } from "vitest";

import { alphaNumericSort } from "../alphaNumericSort.js";

describe("alphaNumericSort", () => {
  it("should sort the list by creating a new list instead of mutating it", () => {
    const list = ["a", "f", "d"];
    const sorted = alphaNumericSort(list);
    expect(sorted).toEqual(["a", "d", "f"]);
    expect(sorted).not.toBe(list);
    expect(list).toEqual(["a", "f", "d"]);
  });

  it("should require an extractor if the provided list is not a list of strings or known object types", () => {
    // @ts-expect-error
    expect(() => alphaNumericSort(["a", 2])).toThrowError(
      "`alphaNumericSort` requires the `extractor` prop for lists that do not contain strings or known object types."
    );

    expect(
      alphaNumericSort(["a", 2], {
        extractor: (a) => (typeof a === "number" ? `${a}` : a),
      })
    ).toEqual([2, "a"]);
  });

  it("should support a list of objects", () => {
    const list = [{ name: "Hello" }, { name: "World!" }, { name: "Another!" }];
    expect(
      alphaNumericSort(list, {
        extractor: (a) => a.name,
      })
    ).toEqual([{ name: "Another!" }, { name: "Hello" }, { name: "World!" }]);
  });

  it("should allow for a custom compare function", () => {
    const list = ["Z", "a", "z", "ä"];
    const compareDE = new Intl.Collator("de", {
      numeric: true,
      caseFirst: "upper",
    }).compare;
    const compareSV = new Intl.Collator("sv", {
      numeric: true,
      caseFirst: "upper",
    }).compare;

    expect(alphaNumericSort(list, { compare: compareDE })).toEqual([
      "a",
      "ä",
      "Z",
      "z",
    ]);
    expect(alphaNumericSort(list, { compare: compareSV })).toEqual([
      "a",
      "Z",
      "z",
      "ä",
    ]);

    expect(alphaNumericSort(list)).toEqual(["a", "ä", "Z", "z"]);
  });

  it("should be able to sort the list in descending order", () => {
    const list = ["a", "f", "d"];
    const sorted = alphaNumericSort(list, { descending: true });
    expect(sorted).toEqual(["f", "d", "a"]);
  });
});
