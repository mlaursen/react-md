import { findSizingContainer } from "../findSizingContainer";

describe("findSizingContainer", () => {
  it("should return null if no element was provided", () => {
    expect(findSizingContainer(null)).toBe(null);
  });

  it("should check the element for a treeitem or listitem role since it is known to have different sizing with nested groups", () => {
    const query = ".rmd-tree-item__content, .rmd-item-text";
    const treeItem = document.createElement("li");
    treeItem.setAttribute("role", "treeitem");
    const treeItemQS = jest.spyOn(treeItem, "querySelector");

    const treeItemContent = document.createElement("span");
    treeItemContent.className = "rmd-tree-item__content";
    treeItem.appendChild(treeItemContent);

    const result1 = findSizingContainer(treeItem);
    expect(treeItemQS).toBeCalledWith(query);
    expect(result1).toBe(treeItemContent);

    const listItem = document.createElement("li");
    listItem.setAttribute("role", "listitem");
    const listItemQS = jest.spyOn(listItem, "querySelector");

    const listItemContent = document.createElement("span");
    listItemContent.className = "rmd-item-text";
    listItem.appendChild(listItemContent);

    const result2 = findSizingContainer(listItem);
    expect(listItemQS).toBeCalledWith(query);
    expect(result2).toBe(listItemContent);
  });

  it("should return the treeitem or listitem if the query has no matches", () => {
    const treeItem = document.createElement("li");
    treeItem.setAttribute("role", "treeitem");
    const listItem = document.createElement("li");
    listItem.setAttribute("role", "listitem");

    expect(findSizingContainer(treeItem)).toBe(treeItem);
    expect(findSizingContainer(listItem)).toBe(listItem);
  });

  it("should check if the element has a `data-sizing-selector` value and use it as a query selector on the element if it does", () => {
    const element = document.createElement("span");
    element.setAttribute("data-sizing-selector", ".query");

    const child = document.createElement("span");
    child.className = "query";
    element.appendChild(child);

    const getAttribute = jest.spyOn(element, "getAttribute");

    const container = findSizingContainer(element);
    expect(getAttribute).toBeCalledWith("data-sizing-selector");
    expect(container).toBe(child);
  });

  it("should throw an error if no child element can be found using the `data-sizing-selector`", () => {
    const element = document.createElement("span");
    element.setAttribute("data-sizing-selector", ".query");

    expect(() => findSizingContainer(element)).toThrowError(
      "Unable to find a child element using the `data-sizing-selector`"
    );
  });
});
