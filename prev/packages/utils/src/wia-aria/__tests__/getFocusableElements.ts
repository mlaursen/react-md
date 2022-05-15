import { getFocusableElements } from "../getFocusableElements";
import { TAB_FOCUSABLE } from "../constants";

describe("getFocusableElements", () => {
  it("should return a list instead of a NodeList", () => {
    const div = document.createElement("div");

    expect(getFocusableElements(div)).not.toBeInstanceOf(NodeList);
    expect(getFocusableElements(div)).toBeInstanceOf(Array);
  });

  it("should call container.querySelectorAll with the TAB_FOCUSABLE query", () => {
    const div = document.createElement("div");
    const querySelectorAll = jest.spyOn(div, "querySelectorAll");

    getFocusableElements(div);
    expect(querySelectorAll).toBeCalledWith(TAB_FOCUSABLE);
  });
});
