import { describe, expect, it } from "@jest/globals";

import { getLuminance, hexToRGB, isContrastCompliant } from "../utils.js";

describe("getLuminance", () => {
  it("should return 0 for black and 1 for white", () => {
    expect(getLuminance("#000")).toBe(0);
    expect(getLuminance("#fff")).toBe(1);
  });

  it.todo("should actually have tests to validate the WCAG 2.0 tests");
});

describe("hexToRGB", () => {
  it("should return an ordered list containing the r, g, b values ignoring case and allowing shorthand", () => {
    expect(hexToRGB("#000000")).toEqual([0, 0, 0]);
    expect(hexToRGB("#000")).toEqual([0, 0, 0]);
    expect(hexToRGB("#ffffff")).toEqual([255, 255, 255]);
    expect(hexToRGB("#fff")).toEqual([255, 255, 255]);
    expect(hexToRGB("#FFFfff")).toEqual([255, 255, 255]);
    expect(hexToRGB("#ffF")).toEqual([255, 255, 255]);
  });

  it("should return the correct values if the string does not start with a '#'", () => {
    expect(hexToRGB("000000")).toEqual([0, 0, 0]);
    expect(hexToRGB("000")).toEqual([0, 0, 0]);
    expect(hexToRGB("ffffff")).toEqual([255, 255, 255]);
    expect(hexToRGB("fff")).toEqual([255, 255, 255]);
    expect(hexToRGB("FFFfff")).toEqual([255, 255, 255]);
    expect(hexToRGB("ffF")).toEqual([255, 255, 255]);
  });

  it("should throw an error for an invalid color string", () => {
    const error = new TypeError("Invalid color string.");

    expect(() => hexToRGB("")).toThrow(error);
    expect(() => hexToRGB("#")).toThrow(error);
    expect(() => hexToRGB("#fafa")).toThrow(error);
    expect(() => hexToRGB("fffa")).toThrow(error);
  });
});

describe("isContrastCompliant", () => {
  it("should always return true for white and black colors ignoring order", () => {
    expect(isContrastCompliant("#fff", "#000", "large")).toBe(true);
    expect(isContrastCompliant("#fff", "#000", "normal")).toBe(true);
    expect(isContrastCompliant("#fff", "#000", "AAA")).toBe(true);

    expect(isContrastCompliant("#000", "#fff", "large")).toBe(true);
    expect(isContrastCompliant("#000", "#fff", "normal")).toBe(true);
    expect(isContrastCompliant("#000", "#fff", "AAA")).toBe(true);
  });

  it("should default to the normal compliance level", () => {
    const rmdTeal500 = "#009688";
    expect(isContrastCompliant("#fafafa", rmdTeal500, "large")).toBe(true);
    expect(isContrastCompliant("#fafafa", rmdTeal500, "normal")).toBe(false);
    expect(isContrastCompliant("#fafafa", rmdTeal500, "AAA")).toBe(false);

    expect(isContrastCompliant("#fafafa", rmdTeal500)).toBe(false);
  });

  it("should allow for a custom compliance level that is a number", () => {
    const rmdTeal500 = "#009688";
    expect(isContrastCompliant("#fafafa", rmdTeal500, 1)).toBe(true);
    expect(isContrastCompliant("#fafafa", rmdTeal500, 3)).toBe(true);
  });
});
