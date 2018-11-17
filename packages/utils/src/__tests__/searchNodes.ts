/* tslint:disable:max-line-length */
import { findMatchInRange, extractTextContent, searchNodes } from "../searchNodes";

describe("findMatchInRange", () => {
  const values = ["Apple", "Bannana", "Orange", "Pineapple"];

  it("should return the index of the first match within the range that starts with the query", () => {
    expect(findMatchInRange("A", 0, values.length, values)).toBe(0);
    expect(findMatchInRange("B", 0, values.length, values)).toBe(1);
    expect(findMatchInRange("ORAN", 0, values.length, values)).toBe(2);
    expect(findMatchInRange("PIN", 0, values.length, values)).toBe(3);
  });

  it("should return -1 if the match cannot be found within the provided range", () => {
    expect(findMatchInRange("A", 1, values.length, values)).toBe(-1);
    expect(findMatchInRange("B", 0, 1, values)).toBe(-1);
    expect(findMatchInRange("B", 2, values.length, values)).toBe(-1);
    expect(findMatchInRange("N", 0, values.length, values)).toBe(-1);
  });
});

describe("extractTextContent", () => {
  it("should return the node if it is a string instead of an HTMLElement", () => {
    expect(extractTextContent("")).toBe("");
    expect(extractTextContent("Hello")).toBe("Hello");
  });

  it("should return the HTMLElement's textContent", () => {
    const span = document.createElement("span");
    span.innerHTML = "span";

    const div = document.createElement("div");
    div.innerHTML = "div";

    const li = document.createElement("li");
    li.innerHTML = '<span class="rmd-item-text">List Item</span>';

    expect(extractTextContent(span)).toBe("span");
    expect(extractTextContent(div)).toBe("div");
    expect(extractTextContent(li)).toBe("List Item");
  });

  describe("fixing font icons", () => {
    const icon = document.createElement("i");
    icon.className = "rmd-icon rmd-icon--font";
    icon.innerHTML = "more_vert";
    const button = document.createElement("button");
    button.textContent = "Button";
    button.appendChild(icon);

    it("should get the text content without any react-md font icons in the children when the checkFontIcons param is omitted or true", () => {
      expect(extractTextContent(button)).toBe("Button");
      expect(extractTextContent(button, true)).toBe("Button");
    });

    it(
      "should return the text content including any react-md font icons when the checkFontIcons " +
        "param is false",
      () => {
        // just to be _super_ concise
        expect(extractTextContent(button, false)).not.toBe("Button");
        expect(extractTextContent(button, false)).toBe("Buttonmore_vert");
      }
    );
  });
});

describe("searchNodes", () => {
  const bannanaSpan = document.createElement("span");
  bannanaSpan.textContent = "Bannana";
  const orangeSpan = document.createElement("span");
  orangeSpan.textContent = "Orange";
  const NODES = ["Apple", bannanaSpan, orangeSpan, "Pineapple"];

  const item1 = document.createElement("li");
  item1.innerHTML = '<i class="rmd-icon rmd-icon--font">home</i>Go Home';
  const item2 = document.createElement("li");
  item2.innerHTML = '<i class="rmd-icon rmd-icon--font">menu</i>Hamburger';
  const item3 = document.createElement("li");
  item3.innerHTML = '<i class="rmd-icon rmd-icon--font">more_vert</i>Options';

  const ICON_NODES = [item1, item2, item3];

  it("should return -1 if the startIndex is the same as the matchIndex unless the includeStartIndex param is enabled", () => {
    expect(searchNodes("A", NODES, 0)).toBe(-1);
    expect(searchNodes("A", NODES, 0, extractTextContent, true)).toBe(0);

    expect(searchNodes("B", NODES, 1)).toBe(-1);
    expect(searchNodes("B", NODES, 1, extractTextContent, true)).toBe(1);
  });

  it("should correctly search text and elements", () => {
    expect(searchNodes("A", NODES, 2)).toBe(0);
    expect(searchNodes("B", NODES, 0)).toBe(1);
    expect(searchNodes("ORAN", NODES, 0)).toBe(2);
    expect(searchNodes("PIN", NODES, 0)).toBe(3);
  });

  it("should allow for a custom text extractor", () => {
    const extractor = jest.fn((value: HTMLElement | string) => extractTextContent(value));

    searchNodes("a", NODES, 0, extractor);
    expect(extractor).toBeCalledWith(NODES[0]);
    expect(extractor).toBeCalledWith(NODES[1]);
    expect(extractor).toBeCalledWith(NODES[2]);
    expect(extractor).toBeCalledWith(NODES[3]);
  });

  it("should correctly match elements that begin with a react-md font icon", () => {
    expect(searchNodes("GO", ICON_NODES, 1)).toBe(0);
    expect(searchNodes("H", ICON_NODES, 2)).toBe(1);
    expect(searchNodes("OP", ICON_NODES, 0)).toBe(2);
  });

  it("should return invalid match indexes if the custom text extractor does not remove font icons", () => {
    const extractor = (value: HTMLElement | string) => extractTextContent(value, false);
    // these return invalid results since element.textContent will also return the text within child elements
    expect(searchNodes("H", ICON_NODES, 1, extractor)).toBe(0);
    expect(searchNodes("H", ICON_NODES, 0, extractor)).toBe(-1);
  });
});
