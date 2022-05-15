import { hexToRGB } from "../hexToRGB";

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

    expect(() => hexToRGB("")).toThrowError(error);
    expect(() => hexToRGB("#")).toThrowError(error);
    expect(() => hexToRGB("#fafa")).toThrowError(error);
    expect(() => hexToRGB("fffa")).toThrowError(error);
  });
});
