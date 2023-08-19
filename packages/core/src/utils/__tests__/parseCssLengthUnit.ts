import { describe, expect, it, jest } from "@jest/globals";
import { parseCssLengthUnit } from "../parseCssLengthUnit.js";

describe("parseCssLengthUnit", () => {
  it("should return the correct value for numbers and px strings", () => {
    expect(parseCssLengthUnit({ value: 0 })).toBe(0);
    expect(parseCssLengthUnit({ value: 1 })).toBe(1);
    expect(parseCssLengthUnit({ value: -16 })).toBe(-16);

    expect(parseCssLengthUnit({ value: "0" })).toBe(0);
    expect(parseCssLengthUnit({ value: "-4px" })).toBe(-4);
    expect(parseCssLengthUnit({ value: "16px" })).toBe(16);
  });

  it("should parse the fontSize style for em/rem units", () => {
    const defaultStyle = window.getComputedStyle(document.documentElement);
    const getComputedStyle = jest
      .spyOn(window, "getComputedStyle")
      .mockImplementation((element) => {
        if (element === document.documentElement) {
          return {
            ...defaultStyle,
            fontSize: "13px",
          };
        }

        return {
          ...defaultStyle,
          fontSize: "14px",
        };
      });

    const container = document.createElement("div");

    expect(parseCssLengthUnit({ value: "1.5em" })).toBe(19.5);
    expect(parseCssLengthUnit({ value: ".5em" })).toBe(6.5);
    expect(parseCssLengthUnit({ value: "1.5rem" })).toBe(19.5);
    expect(parseCssLengthUnit({ value: ".5rem" })).toBe(6.5);

    expect(parseCssLengthUnit({ value: "1.5em", container })).toBe(21);
    expect(parseCssLengthUnit({ value: ".5em", container })).toBe(7);
    expect(parseCssLengthUnit({ value: "1.5rem", container })).toBe(19.5);
    expect(parseCssLengthUnit({ value: ".5rem", container })).toBe(6.5);

    getComputedStyle.mockRestore();
  });
});
