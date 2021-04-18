import { isFocusable } from "../isFocusable";

describe("isFocusable", () => {
  it("should default to programmatic focus type", () => {
    const element = document.createElement("div");
    element.tabIndex = -1;

    expect(isFocusable(element)).toBe(true);
    expect(isFocusable(element, "tab")).toBe(false);
    expect(isFocusable(element, "programmatic")).toBe(true);
  });

  it("should work correctly for anchors and areas", () => {
    const anchor = document.createElement("a");
    const area = document.createElement("area");

    expect(isFocusable(anchor, "tab")).toBe(false);
    expect(isFocusable(area, "tab")).toBe(false);
    expect(isFocusable(anchor, "programmatic")).toBe(false);
    expect(isFocusable(area, "programmatic")).toBe(false);

    anchor.href = "#";
    area.href = "#";
    expect(isFocusable(anchor, "tab")).toBe(true);
    expect(isFocusable(area, "tab")).toBe(true);
    expect(isFocusable(anchor, "programmatic")).toBe(true);
    expect(isFocusable(area, "programmatic")).toBe(true);
  });

  it("should work correctly for disablable elements", () => {
    const button = document.createElement("button");
    const select = document.createElement("select");
    const textarea = document.createElement("textarea");
    const input = document.createElement("input");
    input.type = "text";

    expect(isFocusable(button, "tab")).toBe(true);
    expect(isFocusable(select, "tab")).toBe(true);
    expect(isFocusable(textarea, "tab")).toBe(true);
    expect(isFocusable(input, "tab")).toBe(true);
    expect(isFocusable(button, "programmatic")).toBe(true);
    expect(isFocusable(select, "programmatic")).toBe(true);
    expect(isFocusable(textarea, "programmatic")).toBe(true);
    expect(isFocusable(input, "programmatic")).toBe(true);

    button.disabled = true;
    select.disabled = true;
    textarea.disabled = true;
    input.disabled = true;
    expect(isFocusable(button, "tab")).toBe(false);
    expect(isFocusable(select, "tab")).toBe(false);
    expect(isFocusable(textarea, "tab")).toBe(false);
    expect(isFocusable(input, "tab")).toBe(false);
    expect(isFocusable(button, "programmatic")).toBe(false);
    expect(isFocusable(select, "programmatic")).toBe(false);
    expect(isFocusable(textarea, "programmatic")).toBe(false);
    expect(isFocusable(input, "programmatic")).toBe(false);
  });

  it("should never include hidden inputs", () => {
    const hidden = document.createElement("input");
    hidden.type = "hidden";

    expect(isFocusable(hidden, "tab")).toBe(false);
    expect(isFocusable(hidden, "programmatic")).toBe(false);
  });

  it("should allow for elements with a tab index to be focusable", () => {
    const div = document.createElement("div");

    expect(isFocusable(div, "tab")).toBe(false);
    expect(isFocusable(div, "programmatic")).toBe(false);

    div.tabIndex = -1;
    expect(isFocusable(div, "tab")).toBe(false);
    expect(isFocusable(div, "programmatic")).toBe(true);

    div.tabIndex = 0;
    expect(isFocusable(div, "tab")).toBe(true);
    expect(isFocusable(div, "programmatic")).toBe(true);
  });
});
