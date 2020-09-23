import { findMatchIndex, findMatchInRange } from "../findMatchIndex";

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
    expect(findMatchInRange("s", ["s"], 0, 1)).toBe(0);
    expect(findMatchInRange("s", ["S", "s"], 0, 2)).toBe(0);
  });

  it("should return the index of the first item in the list that starts with the same values ignoring case", () => {
    expect(findMatchInRange("st", ["stars"], 0, 1)).toBe(0);
    expect(findMatchInRange("sta", ["word", "stars"], 0, 2)).toBe(1);
    expect(findMatchInRange("star", ["STars", "stars"], 0, 2)).toBe(0);
  });

  it("should return -1 if the match is not within the range proided", () => {
    expect(findMatchInRange("s", ["b"], 0, 1)).toBe(-1);
    expect(findMatchInRange("s", ["S", "v"], 1, 2)).toBe(-1);
  });
});

describe("findMatchIndex", () => {
  it("should return the index of the first match that appears after the start index ignoring case", () => {
    expect(findMatchIndex("a", lorem, 0)).toBe(1);
    expect(findMatchIndex("A", lorem, 0)).toBe(1);
    expect(findMatchIndex("C", lorem, 0)).toBe(4);

    expect(findMatchIndex("d", lorem, 1)).toBe(12);
    expect(findMatchIndex("d", lorem, 2)).toBe(12);
    expect(findMatchIndex("d", lorem, 3)).toBe(12);
    expect(findMatchIndex("d", lorem, 4)).toBe(12);
    expect(findMatchIndex("d", lorem, 5)).toBe(12);
    expect(findMatchIndex("d", lorem, 6)).toBe(12);
    expect(findMatchIndex("d", lorem, 7)).toBe(12);
    expect(findMatchIndex("d", lorem, 8)).toBe(12);
    expect(findMatchIndex("d", lorem, 9)).toBe(12);
    expect(findMatchIndex("d", lorem, 10)).toBe(12);
    expect(findMatchIndex("d", lorem, 11)).toBe(12);
    expect(findMatchIndex("d", lorem, 0)).toBe(12);
  });

  it("should loop around if the match exists before the start index", () => {
    expect(findMatchIndex("a", lorem, 2)).toBe(1);
    expect(findMatchIndex("a", lorem, 3)).toBe(1);
    expect(findMatchIndex("a", lorem, 4)).toBe(1);
    expect(findMatchIndex("a", lorem, 5)).toBe(1);
    expect(findMatchIndex("a", lorem, 6)).toBe(1);
    expect(findMatchIndex("a", lorem, 7)).toBe(1);
    expect(findMatchIndex("a", lorem, 8)).toBe(1);
    expect(findMatchIndex("a", lorem, 9)).toBe(1);
    expect(findMatchIndex("a", lorem, 10)).toBe(1);
    expect(findMatchIndex("a", lorem, 11)).toBe(1);
  });

  it("should still return the correct match index if the start index is greater than the list of values", () => {
    expect(findMatchIndex("a", lorem, 40)).toBe(1);
  });

  it("should return the start index if the isSelfMatchable is set to true", () => {
    expect(findMatchIndex("d", lorem, 12, true)).toBe(12);
    expect(findMatchIndex("d", lorem, 12, false)).toBe(-1);
  });

  it("should default to be self matchable", () => {
    expect(findMatchIndex("d", lorem, 12)).toBe(12);
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

    expect(findMatchIndex("it", list, 0)).toBe(2);
    expect(findMatchIndex("it", list, 1)).toBe(2);
    expect(findMatchIndex("in", list, 0)).toBe(1);

    expect(findMatchIndex("items", list, 1)).toBe(3);
    expect(findMatchIndex("items", list, 0)).toBe(3);
    expect(findMatchIndex("items", list, 3)).toBe(8);
  });
});
