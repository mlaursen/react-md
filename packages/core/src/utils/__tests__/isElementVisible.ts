import { describe, expect, it } from "vitest";

import { DISPLAY_NONE_CLASS, isElementVisible } from "../isElementVisible.js";

describe("isElementVisible", () => {
  it("should return false if there is no element", () => {
    expect(isElementVisible(null)).toBe(false);
  });

  it("should only check if the element contains the DISPLAY_NONE_CLASS", () => {
    const element = document.createElement("div");
    expect(isElementVisible(element)).toBe(true);

    element.classList.add(DISPLAY_NONE_CLASS);
    expect(isElementVisible(element)).toBe(false);

    element.classList.remove(DISPLAY_NONE_CLASS);
    expect(isElementVisible(element)).toBe(true);
  });

  it("should check if any parent elements have the DISPLAY_NONE_CLASS", () => {
    const container = document.createElement("div");
    const child = document.createElement("div");
    container.append(child);

    expect(isElementVisible(child)).toBe(true);
    expect(isElementVisible(container)).toBe(true);

    child.classList.add(DISPLAY_NONE_CLASS);
    expect(isElementVisible(child)).toBe(false);
    expect(isElementVisible(container)).toBe(true);

    child.classList.remove(DISPLAY_NONE_CLASS);
    container.classList.add(DISPLAY_NONE_CLASS);
    expect(isElementVisible(child)).toBe(false);
    expect(isElementVisible(container)).toBe(false);
  });
});
