import { describe, expect, it, vi } from "vitest";

import { deselectNode } from "../deselectNode.js";

describe("deselectNode", () => {
  const MOCK_SELECTION: Selection = {
    addRange: () => {},
    anchorNode: null,
    anchorOffset: 0,
    collapse: () => {},
    collapseToEnd: () => {},
    collapseToStart: () => {},
    containsNode: () => false,
    deleteFromDocument: () => {},
    direction: "",
    empty: vi.fn(),
    focusNode: null,
    focusOffset: 0,
    isCollapsed: false,
    rangeCount: 0,
    type: "",
    extend: () => {},
    getRangeAt: () => new Range(),
    modify: () => {},
    removeAllRanges: () => {},
    removeRange: () => {},
    selectAllChildren: () => {},
    setBaseAndExtent: () => {},
    setPosition: () => {},
    getComposedRanges: () => [],
  };

  it("should go through the deselection steps", () => {
    const range = new Range();
    const removeRange = vi.fn();
    const fakeRange: Range = {
      ...range,
      startContainer: {
        ...range.startContainer,
        contains: () => true,
      },
    };
    const getRangeAt = vi.fn(() => fakeRange);
    vi.spyOn(window, "getSelection").mockReturnValue({
      ...MOCK_SELECTION,
      rangeCount: 1,
      getRangeAt,
      removeRange,
    });

    const node = document.createElement("div");
    node.textContent = "Hello, world!";

    deselectNode(node);
    expect(removeRange).toHaveBeenCalledTimes(1);
    expect(removeRange).toHaveBeenCalledWith(fakeRange);
  });

  it("should clear all ranges", () => {
    const range = new Range();
    const removeRange = vi.fn();
    const fakeRange: Range = {
      ...range,
      startContainer: {
        ...range.startContainer,
        contains: () => true,
      },
    };
    const getRangeAt = vi.fn(() => fakeRange);
    vi.spyOn(window, "getSelection").mockReturnValue({
      ...MOCK_SELECTION,
      rangeCount: 3,
      getRangeAt,
      removeRange,
    });

    const node = document.createElement("div");
    node.textContent = "Hello, world!";

    deselectNode(node);
    expect(removeRange).toHaveBeenCalledTimes(3);
  });

  it("should only remove the range if the startContainer contains the node", () => {
    const range = new Range();
    const removeRange = vi.fn();
    const fakeRange1: Range = {
      ...range,
      startContainer: {
        ...range.startContainer,
        contains: () => true,
      },
    };
    const fakeRange2: Range = {
      ...range,
      startContainer: {
        ...range.startContainer,
        contains: () => false,
      },
    };
    const getRangeAt = vi
      .fn(() => fakeRange1)
      .mockReturnValueOnce(fakeRange1)
      .mockReturnValue(fakeRange2);
    vi.spyOn(window, "getSelection").mockReturnValue({
      ...MOCK_SELECTION,
      rangeCount: 3,
      getRangeAt,
      removeRange,
    });

    const node = document.createElement("div");
    node.textContent = "Hello, world!";

    deselectNode(node);
    expect(getRangeAt).toHaveBeenCalledTimes(3);
    expect(removeRange).toHaveBeenCalledTimes(1);
  });

  it("should do nothing without crashing if the selection returns null due to the associated document has no browsing context", () => {
    vi.spyOn(window, "getSelection").mockReturnValue(null);

    const node = document.createElement("div");
    node.textContent = "Hello, world!";
    expect(() => deselectNode(node)).not.toThrow();
  });
});
