import { MutableRefObject } from "react";

import { containsElement } from "../containsElement";

describe("containsElement", () => {
  it("should return false if either the element or target are null", () => {
    const div = document.createElement("div");
    expect(containsElement(null, null)).toBe(false);
    expect(containsElement(div, null)).toBe(false);
    expect(containsElement(null, div)).toBe(false);
  });

  it("should return true if the element contains the target", () => {
    const parent = document.createElement("div");
    parent.setAttribute("id", "parent");

    const child = document.createElement("span");
    child.setAttribute("id", "child");
    parent.appendChild(child);

    const outside = document.createElement("div");
    outside.setAttribute("id", "outside");

    expect(containsElement(parent, child)).toBe(true);
    expect(containsElement(parent, parent)).toBe(true);
    expect(containsElement(child, parent)).toBe(false);
    expect(containsElement(parent, outside)).toBe(false);
  });

  it("should work for RefObject", () => {
    const container = document.createElement("div");
    const child = document.createElement("div");
    const containerRef: MutableRefObject<HTMLElement | null> = {
      current: null,
    };
    expect(containsElement(containerRef, child)).toBe(false);

    containerRef.current = container;
    expect(containsElement(containerRef, child)).toBe(false);

    container.appendChild(child);
    expect(containsElement(containerRef, child)).toBe(true);
  });
});
