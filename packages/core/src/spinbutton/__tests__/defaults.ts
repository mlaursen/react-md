import { describe, expect, it } from "vitest";

import {
  defaultGetSpinButtonTextContent,
  defaultSpinButtonGetValueText,
} from "../defaults.js";

describe("defaultSpinButtonGetValueText", () => {
  it("should return undefined for numeric values", () => {
    expect(defaultSpinButtonGetValueText(-100)).toBe(undefined);
    expect(defaultSpinButtonGetValueText(-1)).toBe(undefined);
    expect(defaultSpinButtonGetValueText(0)).toBe(undefined);
    expect(defaultSpinButtonGetValueText(93)).toBe(undefined);
  });

  it('should return "No value selected" if the spinbutton value is null', () => {
    expect(defaultSpinButtonGetValueText(null)).toBe("No value selected");
  });
});

describe("defaultGetSpinButtonTextContent", () => {
  describe("no value", () => {
    it("should return the fallback string when defined", () => {
      expect(
        defaultGetSpinButtonTextContent({ value: null, fallback: "" })
      ).toBe("");
    });

    it("should return an empty string if the fallback is not defined and there are no min digits", () => {
      expect(defaultGetSpinButtonTextContent({ value: null })).toBe("");
      expect(
        defaultGetSpinButtonTextContent({ value: null, fallback: "fallback" })
      ).toBe("fallback");
    });

    it("should return hyphens for the number of digits", () => {
      expect(defaultGetSpinButtonTextContent({ value: null, min: 0 })).toBe(
        "-"
      );
      expect(defaultGetSpinButtonTextContent({ value: null, min: 1 })).toBe(
        "-"
      );
      expect(defaultGetSpinButtonTextContent({ value: null, min: 10 })).toBe(
        "--"
      );
      expect(
        defaultGetSpinButtonTextContent({ value: null, minDigits: 1 })
      ).toBe("-");
      expect(
        defaultGetSpinButtonTextContent({ value: null, minDigits: 4 })
      ).toBe("----");
    });
  });

  describe("valued", () => {
    it("should return the stringified value if there are no min digits", () => {
      expect(defaultGetSpinButtonTextContent({ value: 0 })).toBe("0");
      expect(defaultGetSpinButtonTextContent({ value: 1 })).toBe("1");
      expect(defaultGetSpinButtonTextContent({ value: 100 })).toBe("100");
    });

    it("should pad the start of the string with leading zeros when min digits are available", () => {
      expect(defaultGetSpinButtonTextContent({ value: 0, min: 0 })).toBe("0");
      expect(defaultGetSpinButtonTextContent({ value: 0, min: 10 })).toBe("00");
      expect(defaultGetSpinButtonTextContent({ value: 0, minDigits: 4 })).toBe(
        "0000"
      );

      expect(defaultGetSpinButtonTextContent({ value: 1, min: 0 })).toBe("1");
      expect(defaultGetSpinButtonTextContent({ value: 1, min: 10 })).toBe("01");
      expect(defaultGetSpinButtonTextContent({ value: 1, minDigits: 4 })).toBe(
        "0001"
      );
    });

    it("should allow for a custom placeholderChar instead of 0s", () => {
      expect(
        defaultGetSpinButtonTextContent({
          value: 1,
          minDigits: 4,
          placeholderChar: "y",
        })
      ).toBe("yyy1");
    });
  });
});
