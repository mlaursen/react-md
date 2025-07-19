import { afterEach, describe, expect, it, vi } from "vitest";

import { selectNode } from "../selectNode.js";

describe("selectNode", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should go through the selection steps", () => {
    const selectNodeContents = vi.spyOn(Range.prototype, "selectNodeContents");
    const removeAllRanges = vi.spyOn(Selection.prototype, "removeAllRanges");
    const addRange = vi.spyOn(Selection.prototype, "addRange");
    const getSelection = vi.spyOn(window, "getSelection");
    const createRange = vi.spyOn(document, "createRange");

    const node = document.createElement("div");
    node.textContent = "Hello, world!";

    selectNode(node);
    expect(getSelection).toHaveBeenCalledTimes(1);
    expect(createRange).toHaveBeenCalledTimes(1);
    expect(selectNodeContents).toHaveBeenCalledWith(node);
    expect(removeAllRanges).toHaveBeenCalledTimes(1);
    expect(addRange).toHaveBeenCalledTimes(1);
  });

  it("should do nothing if there are no window selections", () => {
    const selectNodeContents = vi.spyOn(Range.prototype, "selectNodeContents");
    const removeAllRanges = vi.spyOn(Selection.prototype, "removeAllRanges");
    const addRange = vi.spyOn(Selection.prototype, "addRange");
    const getSelection = vi.spyOn(window, "getSelection").mockReturnValue(null);
    const createRange = vi.spyOn(document, "createRange");

    const node = document.createElement("div");
    node.textContent = "Hello, world!";

    selectNode(node);
    expect(getSelection).toHaveBeenCalledTimes(1);
    expect(createRange).not.toHaveBeenCalled();
    expect(selectNodeContents).not.toHaveBeenCalled();
    expect(removeAllRanges).not.toHaveBeenCalled();
    expect(addRange).not.toHaveBeenCalled();
  });

  it("should be able to select text", () => {
    const node = document.createElement("div");
    node.textContent = "Hello, world!";
    document.body.appendChild(node);

    selectNode(node);
    expect(node).toHaveSelection("Hello, world!");
    document.body.removeChild(node);
  });
});
