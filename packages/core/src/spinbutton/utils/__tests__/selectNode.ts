import { afterEach, describe, expect, it, jest } from "@jest/globals";

import { selectNode } from "../selectNode.js";

describe("selectNode", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should go through the selection steps", () => {
    const selectNodeContents = jest.spyOn(
      Range.prototype,
      "selectNodeContents"
    );
    const removeAllRanges = jest.spyOn(Selection.prototype, "removeAllRanges");
    const addRange = jest.spyOn(Selection.prototype, "addRange");
    const getSelection = jest.spyOn(window, "getSelection");
    const createRange = jest.spyOn(document, "createRange");

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
    const selectNodeContents = jest.spyOn(
      Range.prototype,
      "selectNodeContents"
    );
    const removeAllRanges = jest.spyOn(Selection.prototype, "removeAllRanges");
    const addRange = jest.spyOn(Selection.prototype, "addRange");
    const getSelection = jest
      .spyOn(window, "getSelection")
      .mockReturnValue(null);
    const createRange = jest.spyOn(document, "createRange");

    const node = document.createElement("div");
    node.textContent = "Hello, world!";

    selectNode(node);
    expect(getSelection).toHaveBeenCalledTimes(1);
    expect(createRange).not.toHaveBeenCalled();
    expect(selectNodeContents).not.toHaveBeenCalled();
    expect(removeAllRanges).not.toHaveBeenCalled();
    expect(addRange).not.toHaveBeenCalled();
  });
});
