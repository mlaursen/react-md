/**
 * @jest-environment node
 */

import { unitToNumber } from "../unitToNumber";

describe("unitToNumber", () => {
  it("should return the correct value for numbers and px strings", () => {
    expect(typeof document).toBe("undefined");
    expect(unitToNumber(0)).toBe(0);
    expect(unitToNumber(1)).toBe(1);
    expect(unitToNumber(-16)).toBe(-16);

    expect(unitToNumber("0")).toBe(0);
    expect(unitToNumber("-4px")).toBe(-4);
    expect(unitToNumber("16px")).toBe(16);
  });

  it("should multiply fontSizeFallback or 16 to the value if the document is undefined for non-px strings", () => {
    expect(typeof document).toBe("undefined");
    expect(unitToNumber("1em")).toBe(16);
    expect(unitToNumber(".5em")).toBe(8);
    expect(unitToNumber("1em", { fontSizeFallback: 12 })).toBe(12);
    expect(unitToNumber(".5em", { fontSizeFallback: 12 })).toBe(6);
  });
});
