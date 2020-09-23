import { isContrastCompliant } from "../isContrastCompliant";

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
