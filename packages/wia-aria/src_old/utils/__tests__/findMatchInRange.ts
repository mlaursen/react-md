import findMatchInRange from "../findMatchInRange";

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
