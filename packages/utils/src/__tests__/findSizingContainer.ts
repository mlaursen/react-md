/* tslint:disable:max-line-length */
import findSizingContainer from "../findSizingContainer";

describe("findSizingContainer", () => {
  it("should return null if the element is null", () => {
    expect(findSizingContainer(null)).toBe(null);
  });

  describe("react-md component fixes", () => {
    it("should attempt to get the 'rmd-tree-item__content' child element if the role is a treeitem because the entire treeitem size would include nested groups which will cause invalid calclations for positioning", () => {
      const treeItem = document.createElement("li");
      treeItem.setAttribute("role", "treeitem");
      const content = document.createElement("span");
      content.className = "rmd-tree-item__content";

      treeItem.appendChild(content);

      expect(findSizingContainer(treeItem)).toBe(content);
    });

    it("should return the treeitem if the 'rmd-tree-item__content' element cannot be found as a descendant", () => {
      const treeItem = document.createElement("li");
      treeItem.setAttribute("role", "treeitem");

      treeItem.innerHTML = "<span>This is a treeitem not from react-md</span>";

      expect(findSizingContainer(treeItem)).toBe(treeItem);
    });

    it("should attempt to get the 'rmd-item-text' child element when the role is a listitem because the entire listitem size might include children that should not be included in the sizing", () => {
      const listItem = document.createElement("li");
      listItem.setAttribute("role", "listitem");
      const content = document.createElement("span");
      content.className = "rmd-item-text";
      content.innerText = "Hello, world!";

      listItem.appendChild(content);

      expect(findSizingContainer(listItem)).toBe(content);
    });

    it("should return the listitem if the 'rmd-item-text' element cannot be found as a descendant", () => {
      const listItem = document.createElement("li");
      listItem.setAttribute("role", "listitem");

      listItem.innerHTML = "<span>This is a treeitem not from react-md</span>";

      expect(findSizingContainer(listItem)).toBe(listItem);
    });
  });

  it("should return the child element matching the 'data-sizing-selector' value", () => {
    const el = document.createElement("div");
    const sizer1 = document.createElement("div");
    sizer1.className = "classname-query";

    const sizer2 = document.createElement("div");
    sizer2.id = "id-query";

    el.appendChild(sizer1);
    el.appendChild(sizer2);

    el.setAttribute("data-sizing-selector", ".classname-query");
    expect(findSizingContainer(el)).toBe(sizer1);

    el.setAttribute("data-sizing-selector", "#id-query");
    expect(findSizingContainer(el)).toBe(sizer2);
  });
});
