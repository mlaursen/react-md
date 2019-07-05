import { toWidthPart } from "../useWidthMediaQuery";

describe("toWidthPart", () => {
  it("should return an empty string if the value is undefined", () => {
    expect(toWidthPart(undefined, "min")).toBe("");
    expect(toWidthPart(undefined, "max")).toBe("");
  });

  it("should return the correct string for numbers", () => {
    expect(toWidthPart(10, "min")).toBe("(min-width: 10px)");
    expect(toWidthPart(100, "min")).toBe("(min-width: 100px)");
    expect(toWidthPart(10, "max")).toBe("(max-width: 10px)");
    expect(toWidthPart(100, "max")).toBe("(max-width: 100px)");
  });

  it("should return the correct string for strings", () => {
    expect(toWidthPart("10rem", "min")).toBe("(min-width: 10rem)");
    expect(toWidthPart("100rem", "min")).toBe("(min-width: 100rem)");
    expect(toWidthPart("10px", "min")).toBe("(min-width: 10px)");
    expect(toWidthPart("100px", "min")).toBe("(min-width: 100px)");

    expect(toWidthPart("10rem", "max")).toBe("(max-width: 10rem)");
    expect(toWidthPart("100rem", "max")).toBe("(max-width: 100rem)");
    expect(toWidthPart("10px", "max")).toBe("(max-width: 10px)");
    expect(toWidthPart("100px", "max")).toBe("(max-width: 100px)");
  });
});
