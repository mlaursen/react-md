import { getLuminance } from "../getLuminance";

describe("getLuminance", () => {
  it("should return 0 for black and 1 for white", () => {
    expect(getLuminance("#000")).toBe(0);
    expect(getLuminance("#fff")).toBe(1);
  });

  it.todo("should actually have tests to validate the WCAG 2.0 tests");
});
