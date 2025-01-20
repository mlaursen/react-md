import { describe, expect, it } from "@jest/globals";

import { alphaNumericSort } from "../alphaNumericSort.js";

describe("alphaNumericSort", () => {
  it("should sort the list by creating a new list instead of mutating it", () => {
    const list = ["a", "f", "d"];
    const sorted = alphaNumericSort(list);
    expect(sorted).toEqual(["a", "d", "f"]);
    expect(sorted).not.toBe(list);
    expect(list).toEqual(["a", "f", "d"]);
  });

  it("should require an extractor if the provided list is not a list of strings", () => {
    // @ts-expect-error
    expect(() => alphaNumericSort(["a", 2])).toThrow(
      `A \`TextExtractor\` must be provided to \`alphaNumericSort\` for lists that do not contain strings`
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
    const compareDE = new Intl.Collator("de").compare;
    const compareSV = new Intl.Collator("sv").compare;

    expect(alphaNumericSort(list, { compare: compareDE })).toEqual([
      "a",
      "ä",
      "z",
      "Z",
    ]);
    expect(alphaNumericSort(list, { compare: compareSV })).toEqual([
      "a",
      "z",
      "Z",
      "ä",
    ]);

    expect(alphaNumericSort(list)).toEqual(["a", "ä", "Z", "z"]);
  });
});
