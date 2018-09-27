import findOverflowContainer from "../findOverflowContainer";

describe("findOverflowContainer", () => {
  it("should return null if the element is null", () => {
    expect(findOverflowContainer(null)).toBe(null);
    expect(findOverflowContainer(null, false)).toBe(null);
    expect(findOverflowContainer(null, true)).toBe(null);
  });

  it(
    "should return the first element that does not have visible overflow and is not statically positioned when " +
      "firstMatch is true",
    () => {
      // offsetParent always returns null in testing, so we can just fake it for tests here by making
      // it always return the parent element. In reality, it would return the first element that doesn't
      // have position: static
      Object.defineProperty(HTMLElement.prototype, "offsetParent", {
        get() {
          return this.parentElement;
        },
      });

      const child = document.createElement("div");
      child.id = "child-div";
      const child2 = document.createElement("div");
      child.id = "child-div-2";
      const parent1 = document.createElement("div");
      parent1.id = "parent-1-div";
      const parent2 = document.createElement("div");
      parent2.id = "parent-2-div";
      parent2.style.position = "fixed";
      parent2.style.overflow = "auto";

      const parent3 = document.createElement("div");
      parent3.id = "parent-3-div";
      parent3.style.position = "fixed";
      parent3.style.overflow = "auto";

      parent1.appendChild(child);
      parent2.appendChild(parent1);
      parent2.appendChild(child2);
      parent3.appendChild(parent2);

      expect(findOverflowContainer(child, true)).toBe(parent2);
    }
  );

  it(
    "should return the last element that does not have visible overflow and is not statically positioned " +
      "when firstMatch is false or omitted",
    () => {
      // offsetParent always returns null in testing, so we can just fake it for tests here by making
      // it always return the parent element. In reality, it would return the first element that doesn't
      // have position: static
      Object.defineProperty(HTMLElement.prototype, "offsetParent", {
        get() {
          return this.parentElement;
        },
      });

      const child = document.createElement("div");
      child.id = "child-div";
      const child2 = document.createElement("div");
      child.id = "child-div-2";
      const parent1 = document.createElement("div");
      parent1.id = "parent-1-div";
      const parent2 = document.createElement("div");
      parent2.id = "parent-2-div";
      parent2.style.position = "fixed";
      parent2.style.overflow = "auto";

      const parent3 = document.createElement("div");
      parent3.id = "parent-3-div";
      parent3.style.position = "fixed";
      parent3.style.overflow = "auto";

      parent1.appendChild(child);
      parent2.appendChild(parent1);
      parent2.appendChild(child2);
      parent3.appendChild(parent2);

      expect(findOverflowContainer(child)).toBe(parent3);
      expect(findOverflowContainer(child, false)).toBe(parent3);
    }
  );
});
