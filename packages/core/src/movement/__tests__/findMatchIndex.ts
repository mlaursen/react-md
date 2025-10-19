import { describe, expect, it } from "vitest";

import { findMatchInRange, findMatchIndex } from "../findMatchIndex.js";

const lorem = [
  "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
  "Aliquam tincidunt mauris eu risus.",
  "Vestibulum auctor dapibus neque.",
  "Nunc dignissim risus id metus.",
  "Cras ornare tristique elit.",
  "Vivamus vestibulum ntulla nec ante.",
  "Praesent placerat risus quis eros.",
  "Fusce pellentesque suscipit nibh.",
  "Integer vitae libero ac risus egestas placerat.",
  "Vestibulum commodo felis quis tortor.",
  "Ut aliquam sollicitudin leo.",
  "Cras iaculis ultricies nulla.",
  "Donec quis dui at dolor tempor interdum.",
];

describe("findMatchInRange", () => {
  it("should compare ignoring case", () => {
    expect(
      findMatchInRange({
        value: "s",
        values: ["s"],
        startIndex: 0,
        endIndex: 1,
      })
    ).toBe(0);
    expect(
      findMatchInRange({
        value: "s",
        values: ["S", "s"],
        startIndex: 0,
        endIndex: 2,
      })
    ).toBe(0);
  });

  it("should return the index of the first item in the list that starts with the same values ignoring case", () => {
    expect(
      findMatchInRange({
        value: "st",
        values: ["stars"],
        startIndex: 0,
        endIndex: 1,
      })
    ).toBe(0);
    expect(
      findMatchInRange({
        value: "sta",
        values: ["word", "stars"],
        startIndex: 0,
        endIndex: 2,
      })
    ).toBe(1);
    expect(
      findMatchInRange({
        value: "star",
        values: ["STars", "stars"],
        startIndex: 0,
        endIndex: 2,
      })
    ).toBe(0);
  });

  it("should return -1 if the match is not within the range provided", () => {
    expect(
      findMatchInRange({
        value: "s",
        values: ["b"],
        startIndex: 0,
        endIndex: 1,
      })
    ).toBe(-1);
    expect(
      findMatchInRange({
        value: "s",
        values: ["S", "v"],
        startIndex: 1,
        endIndex: 2,
      })
    ).toBe(-1);
  });
});

describe("findMatchIndex", () => {
  it("should return the index of the first match that appears after the start index ignoring case", () => {
    expect(findMatchIndex({ value: "a", values: lorem, startIndex: 0 })).toBe(
      1
    );
    expect(findMatchIndex({ value: "A", values: lorem, startIndex: 0 })).toBe(
      1
    );
    expect(findMatchIndex({ value: "C", values: lorem, startIndex: 0 })).toBe(
      4
    );

    expect(findMatchIndex({ value: "d", values: lorem, startIndex: 1 })).toBe(
      12
    );
    expect(findMatchIndex({ value: "d", values: lorem, startIndex: 2 })).toBe(
      12
    );
    expect(findMatchIndex({ value: "d", values: lorem, startIndex: 3 })).toBe(
      12
    );
    expect(findMatchIndex({ value: "d", values: lorem, startIndex: 4 })).toBe(
      12
    );
    expect(findMatchIndex({ value: "d", values: lorem, startIndex: 5 })).toBe(
      12
    );
    expect(findMatchIndex({ value: "d", values: lorem, startIndex: 6 })).toBe(
      12
    );
    expect(findMatchIndex({ value: "d", values: lorem, startIndex: 7 })).toBe(
      12
    );
    expect(findMatchIndex({ value: "d", values: lorem, startIndex: 8 })).toBe(
      12
    );
    expect(findMatchIndex({ value: "d", values: lorem, startIndex: 9 })).toBe(
      12
    );
    expect(findMatchIndex({ value: "d", values: lorem, startIndex: 10 })).toBe(
      12
    );
    expect(findMatchIndex({ value: "d", values: lorem, startIndex: 11 })).toBe(
      12
    );
    expect(findMatchIndex({ value: "d", values: lorem, startIndex: 0 })).toBe(
      12
    );
  });

  it("should loop around if the match exists before the start index", () => {
    expect(findMatchIndex({ value: "a", values: lorem, startIndex: 2 })).toBe(
      1
    );
    expect(findMatchIndex({ value: "a", values: lorem, startIndex: 3 })).toBe(
      1
    );
    expect(findMatchIndex({ value: "a", values: lorem, startIndex: 4 })).toBe(
      1
    );
    expect(findMatchIndex({ value: "a", values: lorem, startIndex: 5 })).toBe(
      1
    );
    expect(findMatchIndex({ value: "a", values: lorem, startIndex: 6 })).toBe(
      1
    );
    expect(findMatchIndex({ value: "a", values: lorem, startIndex: 7 })).toBe(
      1
    );
    expect(findMatchIndex({ value: "a", values: lorem, startIndex: 8 })).toBe(
      1
    );
    expect(findMatchIndex({ value: "a", values: lorem, startIndex: 9 })).toBe(
      1
    );
    expect(findMatchIndex({ value: "a", values: lorem, startIndex: 10 })).toBe(
      1
    );
    expect(findMatchIndex({ value: "a", values: lorem, startIndex: 11 })).toBe(
      1
    );
  });

  it("should still return the correct match index if the start index is greater than the list of values", () => {
    expect(findMatchIndex({ value: "a", values: lorem, startIndex: 40 })).toBe(
      1
    );
  });

  it("should return the start index if the isSelfMatchable is set to true", () => {
    expect(
      findMatchIndex({
        value: "d",
        values: lorem,
        startIndex: 12,
        isSelfMatchable: true,
      })
    ).toBe(12);
    expect(
      findMatchIndex({
        value: "d",
        values: lorem,
        startIndex: 12,
        isSelfMatchable: false,
      })
    ).toBe(-1);
  });

  it("should default to be self matchable", () => {
    expect(findMatchIndex({ value: "d", values: lorem, startIndex: 12 })).toBe(
      12
    );
  });

  it("should return the next best match when there are multiple letters in common", () => {
    const list = [
      "Item 1",
      "Inbetween 1",
      "Item 2",
      "Items 1",
      "Inbetween 2",
      "Item 3",
      "Inbetween 3",
      "Item 4",
      "Items 2",
    ];

    expect(findMatchIndex({ value: "it", values: list, startIndex: 0 })).toBe(
      2
    );
    expect(findMatchIndex({ value: "it", values: list, startIndex: 1 })).toBe(
      2
    );
    expect(findMatchIndex({ value: "in", values: list, startIndex: 0 })).toBe(
      1
    );

    expect(
      findMatchIndex({ value: "items", values: list, startIndex: 1 })
    ).toBe(3);
    expect(
      findMatchIndex({ value: "items", values: list, startIndex: 0 })
    ).toBe(3);
    expect(
      findMatchIndex({ value: "items", values: list, startIndex: 3 })
    ).toBe(8);
  });

  it("should not error if there are no values provided", () => {
    expect(findMatchIndex({ value: "a", values: [], startIndex: 0 })).toBe(-1);
    expect(findMatchIndex({ value: "app", values: [], startIndex: 0 })).toBe(
      -1
    );
    expect(findMatchIndex({ value: "items", values: [], startIndex: 0 })).toBe(
      -1
    );
  });
});
