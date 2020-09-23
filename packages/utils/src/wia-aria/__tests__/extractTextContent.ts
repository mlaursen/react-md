import { extractTextContent } from "../extractTextContent";

describe("extractTextContent", () => {
  it('should return a "node" that is a string unmodified', () => {
    expect(extractTextContent("")).toBe("");
    expect(extractTextContent("word")).toBe("word");
    expect(extractTextContent("hello")).toBe("hello");
  });

  it("should return the HTMLElement's textContent without whitespace", () => {
    const span = document.createElement("span");
    span.innerHTML = "span";

    const div = document.createElement("div");
    div.innerHTML = "div";

    const li = document.createElement("li");
    li.innerHTML = '<span class="rmd-item-text">List Item</span>';

    expect(extractTextContent(span)).toBe("span");
    expect(extractTextContent(div)).toBe("div");
    expect(extractTextContent(li)).toBe("ListItem");
  });

  describe("fixing font icons", () => {
    const icon = document.createElement("i");
    icon.className = "rmd-icon rmd-icon--font";
    icon.innerHTML = "more_vert";
    const button = document.createElement("button");
    button.textContent = "Button";
    button.appendChild(icon);

    it("should get the text content without the specified class name's text value", () => {
      expect(extractTextContent(button, ".rmd-icon--font")).toBe("Button");
      expect(extractTextContent(button, ".rmd-icon")).toBe("Button");
    });

    it("should default to removing rmd-icon--font", () => {
      expect(extractTextContent(button)).toBe("Button");
    });

    it("should remove all elements that match the provided query selector", () => {
      const div = document.createElement("div");
      div.appendChild(document.createTextNode("Div value"));

      const div2 = document.createElement("div");
      div2.className = "remove-me";
      div2.textContent = "This should be removed";
      div.appendChild(div2);
      div.appendChild(div2);
      expect(extractTextContent(div, ".remove-me")).toBe("Divvalue");
    });
  });
});
