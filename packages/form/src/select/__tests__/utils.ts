import { createElement } from "react";
import { getOptionId, getOptionLabel } from "../utils";

describe("getOptionId", () => {
  it("should return the correct id starting from 1 instead of 0", () => {
    expect(getOptionId("base-id", 0)).toBe("base-id-option-1");
    expect(getOptionId("base-id-1", 0)).toBe("base-id-1-option-1");
    expect(getOptionId("base-id-2", 2)).toBe("base-id-2-option-3");
    expect(getOptionId("listbox-1", 199)).toBe("listbox-1-option-200");
  });
});

describe("getOptionLabel", () => {
  it("should return the option itself if it is not an object", () => {
    expect(getOptionLabel(null, "label")).toBe(null);
    expect(getOptionLabel("", "label")).toBe("");
    expect(getOptionLabel("Label", "label")).toBe("Label");

    expect(getOptionLabel(0, "label")).toBe(0);
    expect(getOptionLabel(100, "label")).toBe(100);
  });

  it("should return the labelKey if it exists and fallback to the children argument if it is an object", () => {
    const option1 = { label: "Label", value: "A" };
    const option2 = { label: 0, value: "0" };

    expect(getOptionLabel(option1, "label")).toBe("Label");
    expect(getOptionLabel(option2, "label")).toBe(0);
    expect(getOptionLabel(option1, "value")).toBe("A");
    expect(getOptionLabel(option2, "value")).toBe("0");

    const children = createElement("span", null, "Hello");
    expect(getOptionLabel({ children, value: "A" }, "label")).toBe(children);

    expect(getOptionLabel({ value: "A" }, "label")).toBe(null);
  });
});
