import { getItemValue, getSearchString } from "../utils";

describe("getSearchString", () => {
  it("should default to just returning the value unmodified", () => {
    expect(getSearchString("")).toBe("");
    expect(getSearchString("This is a string")).toBe("This is a string");
  });

  it("should lowercase the string when the lowercase parameter is true", () => {
    expect(getSearchString("", true)).toBe("");
    expect(getSearchString("THIS IS A STRING", true)).toBe("this is a string");
  });

  it("should trim the leading and trailing spaces if the trim parameter is true", () => {
    expect(getSearchString("", false, true)).toBe("");
    expect(getSearchString("    ", false, true)).toBe("");
    expect(getSearchString("  string  ", false, true)).toBe("string");
    expect(getSearchString("  string with spaces  ", false, true)).toBe(
      "string with spaces"
    );
  });

  it("should remove all whitespace when the ignoreWhitespace parameter is true", () => {
    expect(getSearchString("", false, false, true)).toBe("");
    expect(getSearchString("    ", false, false, true)).toBe("");
    expect(getSearchString("  string  ", false, false, true)).toBe("string");
    expect(getSearchString("  string with spaces  ", false, false, true)).toBe(
      "stringwithspaces"
    );
  });

  it("should remove all whitespace when the ignoreWhitespace parameter is true even if the trim parameter is true", () => {
    expect(getSearchString("  string with spaces  ", false, true, true)).toBe(
      "stringwithspaces"
    );
  });
});

describe("getItemValue", () => {
  it("should return the item if it is a string", () => {
    expect(getItemValue("string")).toBe("string");
    expect(getItemValue("")).toBe("");
    expect(getItemValue("0")).toBe("0");
  });

  it("should return the item as a stringified number if it is a number", () => {
    expect(getItemValue(0)).toBe("0");
    expect(getItemValue(1)).toBe("1");
    expect(getItemValue(-1)).toBe("-1");
  });

  it("should return the empty string if the number is not a number", () => {
    expect(getItemValue(Number.NaN)).toBe("");
  });

  it("should call the value if it is a function", () => {
    expect(getItemValue(() => "Hello")).toBe("Hello");
    expect(getItemValue(() => "")).toBe("");
    expect(getItemValue(() => 1)).toBe("1");
  });

  it("should use the valueKey if it is an object", () => {
    expect(getItemValue({ value: "" })).toBe("");
    expect(getItemValue({ value: "Hello" })).toBe("Hello");
    expect(getItemValue({ value: 0 })).toBe("0");
    expect(getItemValue({ value: () => "Value" })).toBe("Value");

    expect(getItemValue({})).toBe("");
    expect(getItemValue({ value: "Value" }, "fakeKey")).toBe("");
    expect(getItemValue({ value: "Value", anotherKey: 1 }, "anotherKey")).toBe(
      "1"
    );
  });
});
