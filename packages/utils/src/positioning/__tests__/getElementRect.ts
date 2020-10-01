import { getElementRect } from "../getElementRect";

const createTestElement = () => {
  const element = document.createElement("span");
  element.setAttribute("role", "tooltip");
  element.id = "element-id";

  const cloned = element.cloneNode(true) as HTMLElement;
  const cloneNode = jest.spyOn(element, "cloneNode");
  cloneNode.mockImplementation(() => cloned);

  return { element, cloned, cloneNode };
};

describe("getElementRect", () => {
  it("should do a deep clone of the element so that the attributes can be modified without messing up the original", () => {
    const { element, cloned, cloneNode } = createTestElement();
    getElementRect(element);

    expect(cloneNode).toBeCalledWith(true);
    expect(element.id).toBe("element-id");
    expect(cloned.id).toBe("");

    expect(element.getAttribute("role")).toBe("tooltip");
    expect(cloned.getAttribute("role")).toBe(null);

    expect(element.style.position).toBe("");
    expect(cloned.style.position).toBe("fixed");

    expect(element.style.visibility).toBe("");
    expect(cloned.style.visibility).toBe("hidden");

    expect(element.style.webkitTransform).toBe("");
    expect(cloned.style.webkitTransform).toBe("none");
    expect(element.style.transform).toBe("");
    expect(cloned.style.transform).toBe("none");
  });

  it("should try to add the cloned node to the parent element or fallback to the document.body if there isn't a parent element and then remove the cloned child from the DOM", () => {
    const parent = document.createElement("div");
    let { element, cloned } = createTestElement();
    parent.appendChild(element);

    const parentAppendChild = jest.spyOn(parent, "appendChild");
    const parentRemoveChild = jest.spyOn(parent, "removeChild");
    const bodyAppendChild = jest.spyOn(document.body, "appendChild");
    const bodyRemoveChild = jest.spyOn(document.body, "removeChild");

    getElementRect(parent.firstChild as HTMLElement);
    expect(bodyAppendChild).not.toBeCalled();
    expect(bodyRemoveChild).not.toBeCalled();
    expect(parentAppendChild).toBeCalledWith(cloned);
    expect(parentRemoveChild).toBeCalledWith(cloned);

    parentAppendChild.mockClear();
    parentRemoveChild.mockClear();
    ({ element, cloned } = createTestElement());
    getElementRect(element);
    expect(bodyAppendChild).toBeCalledWith(cloned);
    expect(bodyRemoveChild).toBeCalledWith(cloned);
    expect(parentAppendChild).not.toBeCalled();
    expect(parentRemoveChild).not.toBeCalled();
  });
});
