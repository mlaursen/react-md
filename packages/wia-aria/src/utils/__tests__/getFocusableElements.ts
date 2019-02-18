import getFocusableElements from "../getFocusableElements";
import { PROGRAMATICALLY_FOCUSABLE } from "../../constants";

describe("getFocusableElements", () => {
  it("should return a list instead of a NodeList", () => {
    const div = document.createElement("div");

    expect(getFocusableElements(div)).not.toBeInstanceOf(NodeList);
    expect(getFocusableElements(div)).toBeInstanceOf(Array);
  });

  it("should call container.querySelectorAll with the PROGRAMATICALLY_FOCUSABLE query", () => {
    const div = document.createElement("div");
    div.querySelectorAll = jest.fn(div.querySelectorAll);

    getFocusableElements(div);
    expect(div.querySelectorAll).toBeCalledWith(PROGRAMATICALLY_FOCUSABLE);
  });
});
