/** @jest-environment node */
import { describe, expect, it } from "@jest/globals";

import { parseCssLengthUnit } from "../parseCssLengthUnit.js";

describe("parseCssLengthUnit", () => {
  it("should return the correct value for numbers and px strings", () => {
    expect(typeof document).toBe("undefined");
    expect(parseCssLengthUnit({ value: 0 })).toBe(0);
    expect(parseCssLengthUnit({ value: 1 })).toBe(1);
    expect(parseCssLengthUnit({ value: -16 })).toBe(-16);

    expect(parseCssLengthUnit({ value: "0" })).toBe(0);
    expect(parseCssLengthUnit({ value: "-4px" })).toBe(-4);
    expect(parseCssLengthUnit({ value: "16px" })).toBe(16);
  });

  it("should multiply fontSizeFallback or 16 to the value if the document is undefined for non-px strings", () => {
    expect(typeof document).toBe("undefined");
    expect(parseCssLengthUnit({ value: "1.em" })).toBe(16);
    expect(parseCssLengthUnit({ value: ".5em" })).toBe(8);
    expect(parseCssLengthUnit({ value: "1rem", fallbackFontSize: 12 })).toBe(
      12
    );
    expect(parseCssLengthUnit({ value: ".5rem", fallbackFontSize: 12 })).toBe(
      6
    );
  });
});
