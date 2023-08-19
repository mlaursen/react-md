import { describe, expect, it, jest } from "@jest/globals";
import {
  ABOVE_CENTER_ANCHOR,
  ABOVE_INNER_LEFT_ANCHOR,
  ABOVE_INNER_RIGHT_ANCHOR,
  ABOVE_LEFT_ANCHOR,
  ABOVE_RIGHT_ANCHOR,
  BELOW_CENTER_ANCHOR,
  BELOW_INNER_LEFT_ANCHOR,
  BELOW_INNER_RIGHT_ANCHOR,
  BELOW_LEFT_ANCHOR,
  BELOW_RIGHT_ANCHOR,
  BOTTOM_CENTER_ANCHOR,
  BOTTOM_INNER_LEFT_ANCHOR,
  BOTTOM_INNER_RIGHT_ANCHOR,
  BOTTOM_LEFT_ANCHOR,
  BOTTOM_RIGHT_ANCHOR,
  CENTER_CENTER_ANCHOR,
  CENTER_INNER_LEFT_ANCHOR,
  CENTER_INNER_RIGHT_ANCHOR,
  CENTER_LEFT_ANCHOR,
  CENTER_RIGHT_ANCHOR,
  TOP_CENTER_ANCHOR,
  TOP_INNER_LEFT_ANCHOR,
  TOP_INNER_RIGHT_ANCHOR,
  TOP_LEFT_ANCHOR,
  TOP_RIGHT_ANCHOR,
} from "../constants.js";
import {
  findSizingContainer,
  getAboveCoord,
  getBelowCoord,
  getBottomCoord,
  getCenterXCoord,
  getCenterYCoord,
  getElementRect,
  getInnerLeftCoord,
  getInnerRightCoord,
  getLeftCoord,
  getRightCoord,
  getTopCoord,
  getTransformOrigin,
  isWithinViewport,
} from "../utils.js";

const containerRect1: DOMRect = {
  left: 100,
  right: 50,
  top: 25,
  bottom: 75,
  height: 200,
  width: 100,
  x: 100,
  y: 25,
  toJSON() {},
};

const containerRect2: DOMRect = {
  left: 50,
  right: 100,
  top: 75,
  bottom: 25,
  height: 100,
  width: 200,
  x: 60,
  y: 75,
  toJSON() {},
};

describe("getLeftCoord", () => {
  it("should return a left style value that allows the element to be fixed to the outer left of a container element", () => {
    expect(
      getLeftCoord({
        xMargin: 0,
        elWidth: 100,
        containerRect: containerRect1,
      })
    ).toBe(0);
    expect(
      getLeftCoord({
        xMargin: 8,
        elWidth: 100,
        containerRect: containerRect1,
      })
    ).toBe(-8);
    expect(
      getLeftCoord({
        xMargin: 0,
        elWidth: 50,
        containerRect: containerRect1,
      })
    ).toBe(50);
    expect(
      getLeftCoord({
        xMargin: 8,
        elWidth: 50,
        containerRect: containerRect1,
      })
    ).toBe(42);

    expect(
      getLeftCoord({
        xMargin: 0,
        elWidth: 100,
        containerRect: containerRect2,
      })
    ).toBe(-50);
    expect(
      getLeftCoord({
        xMargin: 8,
        elWidth: 100,
        containerRect: containerRect2,
      })
    ).toBe(-58);
    expect(
      getLeftCoord({
        xMargin: 0,
        elWidth: 50,
        containerRect: containerRect2,
      })
    ).toBe(0);
    expect(
      getLeftCoord({
        xMargin: 8,
        elWidth: 50,
        containerRect: containerRect2,
      })
    ).toBe(-8);
  });

  it("should use the initialX value instead of the container's left if provided", () => {
    expect(
      getLeftCoord({
        xMargin: 0,
        elWidth: 100,
        initialX: 150,
        containerRect: containerRect1,
      })
    ).toBe(50);
    expect(
      getLeftCoord({
        xMargin: 8,
        elWidth: 100,
        initialX: 150,
        containerRect: containerRect1,
      })
    ).toBe(42);
    expect(
      getLeftCoord({
        xMargin: 0,
        elWidth: 50,
        initialX: 150,
        containerRect: containerRect1,
      })
    ).toBe(100);
    expect(
      getLeftCoord({
        xMargin: 8,
        elWidth: 50,
        initialX: 150,
        containerRect: containerRect1,
      })
    ).toBe(92);

    expect(
      getLeftCoord({
        xMargin: 0,
        elWidth: 100,
        initialX: 150,
        containerRect: containerRect2,
      })
    ).toBe(50);
    expect(
      getLeftCoord({
        xMargin: 8,
        elWidth: 100,
        initialX: 150,
        containerRect: containerRect2,
      })
    ).toBe(42);
    expect(
      getLeftCoord({
        xMargin: 0,
        elWidth: 50,
        initialX: 150,
        containerRect: containerRect2,
      })
    ).toBe(100);
    expect(
      getLeftCoord({
        xMargin: 8,
        elWidth: 50,
        initialX: 150,
        containerRect: containerRect2,
      })
    ).toBe(92);
  });
});

describe("getInnerLeftCoord", () => {
  it("should return a left style value that allows the element to be fixed to the inner left of a container element", () => {
    expect(
      getInnerLeftCoord({
        xMargin: 0,
        elWidth: 100,
        containerRect: containerRect1,
      })
    ).toBe(100);
    expect(
      getInnerLeftCoord({
        xMargin: 0,
        elWidth: 40,
        containerRect: containerRect1,
      })
    ).toBe(100);
    expect(
      getInnerLeftCoord({
        xMargin: 8,
        elWidth: 40,
        containerRect: containerRect1,
      })
    ).toBe(108);

    expect(
      getInnerLeftCoord({
        xMargin: 0,
        elWidth: 100,
        containerRect: containerRect2,
      })
    ).toBe(50);
    expect(
      getInnerLeftCoord({
        xMargin: 0,
        elWidth: 40,
        containerRect: containerRect2,
      })
    ).toBe(50);
    expect(
      getInnerLeftCoord({
        xMargin: 8,
        elWidth: 40,
        containerRect: containerRect2,
      })
    ).toBe(58);
  });

  it("should use the initialX value instead of the container's left if provided", () => {
    expect(
      getInnerLeftCoord({
        xMargin: 0,
        elWidth: 100,
        initialX: 150,
        containerRect: containerRect1,
      })
    ).toBe(150);
    expect(
      getInnerLeftCoord({
        xMargin: 0,
        elWidth: 40,
        initialX: 150,
        containerRect: containerRect1,
      })
    ).toBe(150);
    expect(
      getInnerLeftCoord({
        xMargin: 8,
        elWidth: 40,
        initialX: 150,
        containerRect: containerRect1,
      })
    ).toBe(158);

    expect(
      getInnerLeftCoord({
        xMargin: 0,
        elWidth: 100,
        initialX: 150,
        containerRect: containerRect2,
      })
    ).toBe(150);
    expect(
      getInnerLeftCoord({
        xMargin: 0,
        elWidth: 40,
        initialX: 150,
        containerRect: containerRect2,
      })
    ).toBe(150);
    expect(
      getInnerLeftCoord({
        xMargin: 8,
        elWidth: 40,
        initialX: 150,
        containerRect: containerRect2,
      })
    ).toBe(158);
  });
});

describe("getCenterXCoord", () => {
  it("should return a left style value that allows the element to be fixed to the horizontal center of a container element", () => {
    expect(
      getCenterXCoord({
        xMargin: 0,
        elWidth: 100,
        containerRect: containerRect1,
      })
    ).toBe(100);
    expect(
      getCenterXCoord({
        xMargin: 0,
        elWidth: 200,
        containerRect: containerRect1,
      })
    ).toBe(50);
  });

  it("should ignore any margins in the calculation", () => {
    expect(
      getCenterXCoord({
        xMargin: 20,
        elWidth: 100,
        containerRect: containerRect1,
      })
    ).toBe(100);
    expect(
      getCenterXCoord({
        xMargin: 20,
        elWidth: 200,
        containerRect: containerRect1,
      })
    ).toBe(50);
  });

  it("should use the initialX instead of any of the container sizing when provided", () => {
    expect(
      getCenterXCoord({
        xMargin: 20,
        elWidth: 100,
        initialX: 20,
        containerRect: containerRect1,
      })
    ).toBe(-30);

    expect(
      getCenterXCoord({
        xMargin: 0,
        elWidth: 100,
        initialX: 23,
        containerRect: containerRect1,
      })
    ).toBe(-27);

    expect(
      getCenterXCoord({
        xMargin: 0,
        elWidth: 100,
        initialX: 100,
        containerRect: containerRect1,
      })
    ).toBe(50);
  });
});

describe("getInnerRightCoord", () => {
  it("should return a left style value that allows the element to be fixed to the inner-right of a container element", () => {
    expect(
      getInnerRightCoord({
        xMargin: 0,
        elWidth: 100,
        containerRect: containerRect1,
      })
    ).toBe(100);
    expect(
      getInnerRightCoord({
        xMargin: 8,
        elWidth: 100,
        containerRect: containerRect1,
      })
    ).toBe(92);
    expect(
      getInnerRightCoord({
        xMargin: 0,
        elWidth: 25,
        containerRect: containerRect1,
      })
    ).toBe(175);
    expect(
      getInnerRightCoord({
        xMargin: 8,
        elWidth: 25,
        containerRect: containerRect1,
      })
    ).toBe(167);

    expect(
      getInnerRightCoord({
        xMargin: 0,
        elWidth: 100,
        containerRect: containerRect2,
      })
    ).toBe(150);
    expect(
      getInnerRightCoord({
        xMargin: 8,
        elWidth: 100,
        containerRect: containerRect2,
      })
    ).toBe(142);
    expect(
      getInnerRightCoord({
        xMargin: 0,
        elWidth: 25,
        containerRect: containerRect2,
      })
    ).toBe(225);
    expect(
      getInnerRightCoord({
        xMargin: 8,
        elWidth: 25,
        containerRect: containerRect2,
      })
    ).toBe(217);
  });

  it("should use the initialX instead of any of the container sizing when provided", () => {
    expect(
      getInnerRightCoord({
        xMargin: 0,
        elWidth: 100,
        initialX: 325,
        containerRect: containerRect1,
      })
    ).toBe(225);
    expect(
      getInnerRightCoord({
        xMargin: 8,
        elWidth: 100,
        initialX: 325,
        containerRect: containerRect1,
      })
    ).toBe(217);
  });
});

describe("getRightCoord", () => {
  it("should return a left style value that allows the element to be fixed to the outer-right of a container element", () => {
    expect(
      getRightCoord({
        xMargin: 0,
        elWidth: 100,
        containerRect: containerRect1,
      })
    ).toBe(200);
    expect(
      getRightCoord({
        xMargin: 8,
        elWidth: 100,
        containerRect: containerRect1,
      })
    ).toBe(208);
    expect(
      getRightCoord({
        xMargin: 0,
        elWidth: 25,
        containerRect: containerRect1,
      })
    ).toBe(200);
    expect(
      getRightCoord({
        xMargin: 8,
        elWidth: 25,
        containerRect: containerRect1,
      })
    ).toBe(208);

    expect(
      getRightCoord({
        xMargin: 0,
        elWidth: 100,
        containerRect: containerRect2,
      })
    ).toBe(250);
    expect(
      getRightCoord({
        xMargin: 8,
        elWidth: 100,
        containerRect: containerRect2,
      })
    ).toBe(258);
    expect(
      getRightCoord({
        xMargin: 0,
        elWidth: 25,
        containerRect: containerRect2,
      })
    ).toBe(250);
    expect(
      getRightCoord({
        xMargin: 8,
        elWidth: 25,
        containerRect: containerRect2,
      })
    ).toBe(258);
  });

  it("should use the initialX instead of any of the container sizing when provided", () => {
    expect(
      getRightCoord({
        xMargin: 0,
        elWidth: 100,
        initialX: 325,
        containerRect: containerRect1,
      })
    ).toBe(325);
    expect(
      getRightCoord({
        xMargin: 8,
        elWidth: 100,
        initialX: 325,
        containerRect: containerRect1,
      })
    ).toBe(333);
  });
});

describe("getAboveCoord", () => {
  it("should create a top style value that allows an element to be fixed completely above a container element", () => {
    expect(
      getAboveCoord({
        yMargin: 0,
        elHeight: 100,
        containerRect: containerRect1,
      })
    ).toBe(-75);
    expect(
      getAboveCoord({
        yMargin: 8,
        elHeight: 100,
        containerRect: containerRect1,
      })
    ).toBe(-83);
    expect(
      getAboveCoord({
        yMargin: 0,
        elHeight: 50,
        containerRect: containerRect1,
      })
    ).toBe(-25);
    expect(
      getAboveCoord({
        yMargin: 8,
        elHeight: 50,
        containerRect: containerRect1,
      })
    ).toBe(-33);

    expect(
      getAboveCoord({
        yMargin: 0,
        elHeight: 100,
        containerRect: containerRect2,
      })
    ).toBe(-25);
    expect(
      getAboveCoord({
        yMargin: 8,
        elHeight: 100,
        containerRect: containerRect2,
      })
    ).toBe(-33);
    expect(
      getAboveCoord({
        yMargin: 0,
        elHeight: 50,
        containerRect: containerRect2,
      })
    ).toBe(25);
    expect(
      getAboveCoord({
        yMargin: 8,
        elHeight: 50,
        containerRect: containerRect2,
      })
    ).toBe(17);
  });

  it("should use the initialY value instead of the container's top if provided", () => {
    expect(
      getAboveCoord({
        yMargin: 0,
        elHeight: 100,
        initialY: 125,
        containerRect: containerRect1,
      })
    ).toBe(25);
    expect(
      getAboveCoord({
        yMargin: 8,
        elHeight: 100,
        initialY: 125,
        containerRect: containerRect1,
      })
    ).toBe(17);
    expect(
      getAboveCoord({
        yMargin: 0,
        elHeight: 50,
        initialY: 125,
        containerRect: containerRect1,
      })
    ).toBe(75);
    expect(
      getAboveCoord({
        yMargin: 8,
        elHeight: 50,
        initialY: 125,
        containerRect: containerRect1,
      })
    ).toBe(67);

    expect(
      getAboveCoord({
        yMargin: 0,
        elHeight: 100,
        initialY: 125,
        containerRect: containerRect2,
      })
    ).toBe(25);
    expect(
      getAboveCoord({
        yMargin: 8,
        elHeight: 100,
        initialY: 125,
        containerRect: containerRect2,
      })
    ).toBe(17);
    expect(
      getAboveCoord({
        yMargin: 0,
        elHeight: 50,
        initialY: 125,
        containerRect: containerRect2,
      })
    ).toBe(75);
    expect(
      getAboveCoord({
        yMargin: 8,
        elHeight: 50,
        initialY: 125,
        containerRect: containerRect2,
      })
    ).toBe(67);
  });
});

describe("getTopCoord", () => {
  it("should create a top style value that allows an element to fixed to the top of a container element", () => {
    expect(
      getTopCoord({
        yMargin: 0,
        elHeight: 100,
        containerRect: containerRect1,
      })
    ).toBe(25);
    expect(
      getTopCoord({
        yMargin: 8,
        elHeight: 100,
        containerRect: containerRect1,
      })
    ).toBe(33);
    expect(
      getTopCoord({
        yMargin: 0,
        elHeight: 50,
        containerRect: containerRect1,
      })
    ).toBe(25);
    expect(
      getTopCoord({
        yMargin: 8,
        elHeight: 50,
        containerRect: containerRect1,
      })
    ).toBe(33);

    expect(
      getTopCoord({
        yMargin: 0,
        elHeight: 100,
        containerRect: containerRect2,
      })
    ).toBe(75);
    expect(
      getTopCoord({
        yMargin: 8,
        elHeight: 100,
        containerRect: containerRect2,
      })
    ).toBe(83);
    expect(
      getTopCoord({
        yMargin: 0,
        elHeight: 50,
        containerRect: containerRect2,
      })
    ).toBe(75);
    expect(
      getTopCoord({
        yMargin: 8,
        elHeight: 50,
        containerRect: containerRect2,
      })
    ).toBe(83);
  });

  it("should use the initialY value instead of the container's top if provided", () => {
    expect(
      getTopCoord({
        yMargin: 0,
        elHeight: 20,
        initialY: 100,
        containerRect: containerRect1,
      })
    ).toBe(100);

    expect(
      getTopCoord({
        yMargin: 0,
        elHeight: 20,
        initialY: 100,
        containerRect: containerRect2,
      })
    ).toBe(100);
  });
});

describe("getCenterYCoord", () => {
  it("should return a top style value that allows the element to be fixed to the vertical center of a container element", () => {
    expect(
      getCenterYCoord({
        yMargin: 0,
        elHeight: 100,
        containerRect: containerRect1,
      })
    ).toBe(75);
    expect(
      getCenterYCoord({
        yMargin: 0,
        elHeight: 50,
        containerRect: containerRect1,
      })
    ).toBe(100);
    expect(
      getCenterYCoord({
        yMargin: 8,
        elHeight: 100,
        containerRect: containerRect1,
      })
    ).toBe(83);
    expect(
      getCenterYCoord({
        yMargin: 8,
        elHeight: 50,
        containerRect: containerRect1,
      })
    ).toBe(108);

    expect(
      getCenterYCoord({
        yMargin: 0,
        elHeight: 100,
        containerRect: containerRect2,
      })
    ).toBe(75);
    expect(
      getCenterYCoord({
        yMargin: 0,
        elHeight: 50,
        containerRect: containerRect2,
      })
    ).toBe(100);
    expect(
      getCenterYCoord({
        yMargin: 8,
        elHeight: 100,
        containerRect: containerRect2,
      })
    ).toBe(83);
    expect(
      getCenterYCoord({
        yMargin: 8,
        elHeight: 50,
        containerRect: containerRect2,
      })
    ).toBe(108);
  });

  it("should use the initialY instead of any of the container element sizing when provided and ignoring margin", () => {
    expect(
      getCenterYCoord({
        yMargin: 0,
        elHeight: 80,
        initialY: 100,
        containerRect: containerRect1,
      })
    ).toBe(60);
    expect(
      getCenterYCoord({
        yMargin: 8,
        elHeight: 80,
        initialY: 100,
        containerRect: containerRect1,
      })
    ).toBe(60);

    expect(
      getCenterYCoord({
        yMargin: 0,
        elHeight: 80,
        initialY: 100,
        containerRect: containerRect2,
      })
    ).toBe(60);
    expect(
      getCenterYCoord({
        yMargin: 8,
        elHeight: 80,
        initialY: 100,
        containerRect: containerRect2,
      })
    ).toBe(60);
  });
});

describe("getBottomCoord", () => {
  it("should return a top style value that allows the element to be fixed to the bottom of a container element", () => {
    expect(
      getBottomCoord({
        yMargin: 0,
        elHeight: 100,
        containerRect: containerRect1,
      })
    ).toBe(125);
    expect(
      getBottomCoord({
        yMargin: 0,
        elHeight: 50,
        containerRect: containerRect1,
      })
    ).toBe(175);
    expect(
      getBottomCoord({
        yMargin: 8,
        elHeight: 100,
        containerRect: containerRect1,
      })
    ).toBe(117);
    expect(
      getBottomCoord({
        yMargin: 8,
        elHeight: 50,
        containerRect: containerRect1,
      })
    ).toBe(167);

    expect(
      getBottomCoord({
        yMargin: 0,
        elHeight: 100,
        containerRect: containerRect2,
      })
    ).toBe(75);
    expect(
      getBottomCoord({
        yMargin: 0,
        elHeight: 50,
        containerRect: containerRect2,
      })
    ).toBe(125);
    expect(
      getBottomCoord({
        yMargin: 8,
        elHeight: 100,
        containerRect: containerRect2,
      })
    ).toBe(67);
    expect(
      getBottomCoord({
        yMargin: 8,
        elHeight: 50,
        containerRect: containerRect2,
      })
    ).toBe(117);
  });

  it("should use the initialY instead of any of the container's sizing when provided", () => {
    expect(
      getBottomCoord({
        yMargin: 0,
        elHeight: 80,
        initialY: 100,
        containerRect: containerRect1,
      })
    ).toBe(20);
    expect(
      getBottomCoord({
        yMargin: 8,
        elHeight: 80,
        initialY: 100,
        containerRect: containerRect1,
      })
    ).toBe(12);

    expect(
      getBottomCoord({
        yMargin: 0,
        elHeight: 80,
        initialY: 100,
        containerRect: containerRect2,
      })
    ).toBe(20);
    expect(
      getBottomCoord({
        yMargin: 8,
        elHeight: 80,
        initialY: 100,
        containerRect: containerRect2,
      })
    ).toBe(12);
  });
});

describe("getBelowCoord", () => {
  it("should return a top style value that allows the element to be fixed to the bottom of a container element", () => {
    expect(
      getBelowCoord({
        yMargin: 0,
        elHeight: 100,
        containerRect: containerRect1,
      })
    ).toBe(225);
    expect(
      getBelowCoord({
        yMargin: 0,
        elHeight: 50,
        containerRect: containerRect1,
      })
    ).toBe(225);
    expect(
      getBelowCoord({
        yMargin: 8,
        elHeight: 100,
        containerRect: containerRect1,
      })
    ).toBe(233);
    expect(
      getBelowCoord({
        yMargin: 8,
        elHeight: 50,
        containerRect: containerRect1,
      })
    ).toBe(233);

    expect(
      getBelowCoord({
        yMargin: 0,
        elHeight: 100,
        containerRect: containerRect2,
      })
    ).toBe(175);
    expect(
      getBelowCoord({
        yMargin: 0,
        elHeight: 50,
        containerRect: containerRect2,
      })
    ).toBe(175);
    expect(
      getBelowCoord({
        yMargin: 8,
        elHeight: 100,
        containerRect: containerRect2,
      })
    ).toBe(183);
    expect(
      getBelowCoord({
        yMargin: 8,
        elHeight: 50,
        containerRect: containerRect2,
      })
    ).toBe(183);
  });

  it("should use the initialY instead of any of the container's sizing when provided", () => {
    expect(
      getBelowCoord({
        yMargin: 0,
        elHeight: 50,
        initialY: 80,
        containerRect: containerRect1,
      })
    ).toBe(80);
    expect(
      getBelowCoord({
        yMargin: 8,
        elHeight: 50,
        initialY: 80,
        containerRect: containerRect1,
      })
    ).toBe(88);
  });
});

describe("getElementRect", () => {
  const createTestElement = () => {
    const element = document.createElement("span");
    element.setAttribute("role", "tooltip");
    element.id = "element-id";

    const cloned = element.cloneNode(true) as HTMLElement;
    const cloneNode = jest.spyOn(element, "cloneNode");
    cloneNode.mockImplementation(() => cloned);

    return { element, cloned, cloneNode };
  };

  it("should do a deep clone of the element so that the attributes can be modified without messing up the original", () => {
    const { element, cloned, cloneNode } = createTestElement();
    getElementRect(element);

    expect(cloneNode).toHaveBeenCalledWith(true);
    expect(element.id).toBe("element-id");
    expect(cloned.id).toBe("");

    expect(element.getAttribute("role")).toBe("tooltip");
    expect(cloned.getAttribute("role")).toBe(null);

    expect(element.style.position).toBe("");
    expect(cloned.style.position).toBe("fixed");

    expect(element.style.visibility).toBe("");
    expect(cloned.style.visibility).toBe("hidden");

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
    expect(bodyAppendChild).not.toHaveBeenCalled();
    expect(bodyRemoveChild).not.toHaveBeenCalled();
    expect(parentAppendChild).toHaveBeenCalledWith(cloned);
    expect(parentRemoveChild).toHaveBeenCalledWith(cloned);

    parentAppendChild.mockClear();
    parentRemoveChild.mockClear();
    ({ element, cloned } = createTestElement());
    getElementRect(element);
    expect(bodyAppendChild).toHaveBeenCalledWith(cloned);
    expect(bodyRemoveChild).toHaveBeenCalledWith(cloned);
    expect(parentAppendChild).not.toHaveBeenCalled();
    expect(parentRemoveChild).not.toHaveBeenCalled();
  });
});

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
    expect(treeItemQS).toHaveBeenCalledWith(query);
    expect(result1).toBe(treeItemContent);

    const listItem = document.createElement("li");
    listItem.setAttribute("role", "listitem");
    const listItemQS = jest.spyOn(listItem, "querySelector");

    const listItemContent = document.createElement("span");
    listItemContent.className = "rmd-item-text";
    listItem.appendChild(listItemContent);

    const result2 = findSizingContainer(listItem);
    expect(listItemQS).toHaveBeenCalledWith(query);
    expect(result2).toBe(listItemContent);
  });

  it("should return the label for a file input", () => {
    const label = document.createElement("label");
    label.htmlFor = "file-input";
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.id = "file-input";
    const container = document.createElement("div");
    container.appendChild(label);
    container.appendChild(label);

    document.body.appendChild(container);

    expect(findSizingContainer(fileInput)).toEqual(label);
    document.body.removeChild(container);
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
    expect(getAttribute).toHaveBeenCalledWith("data-sizing-selector");
    expect(container).toBe(child);
  });

  it("should throw an error if no child element can be found using the `data-sizing-selector`", () => {
    const element = document.createElement("span");
    element.setAttribute("data-sizing-selector", ".query");

    expect(() => findSizingContainer(element)).toThrow(
      "Unable to find a child element using the `data-sizing-selector`"
    );
  });
});

describe("getTransformOrigin", () => {
  const TOP_LEFT = "0 0";
  const TOP_CENTER = "50% 0";
  const TOP_RIGHT = "100% 0";

  const CENTER_LEFT = "0 50%";
  const CENTER_CENTER = "50% 50%";
  const CENTER_RIGHT = "100% 50%";

  const BOTTOM_LEFT = "0 100%";
  const BOTTOM_CENTER = "50% 100%";
  const BOTTOM_RIGHT = "100% 100%";

  it('should position the "right below", "right top", "inner-left below", and "inner-left top" anchors to the top left origin', () => {
    expect(getTransformOrigin(BELOW_RIGHT_ANCHOR)).toBe(TOP_LEFT);
    expect(getTransformOrigin(TOP_RIGHT_ANCHOR)).toBe(TOP_LEFT);
    expect(getTransformOrigin(BELOW_INNER_LEFT_ANCHOR)).toBe(TOP_LEFT);
    expect(getTransformOrigin(TOP_INNER_LEFT_ANCHOR)).toBe(TOP_LEFT);
  });

  it('should position the "center below" and "center top" anchors to the top center origin ("50% 0")', () => {
    expect(getTransformOrigin(BELOW_CENTER_ANCHOR)).toBe(TOP_CENTER);
    expect(getTransformOrigin(TOP_CENTER_ANCHOR)).toBe(TOP_CENTER);
  });

  it('should position the "inner-right below", "inner-right top", "left below", and "left top" anchors to the top right origin ("100% 0")', () => {
    expect(getTransformOrigin(BELOW_INNER_RIGHT_ANCHOR)).toBe(TOP_RIGHT);
    expect(getTransformOrigin(TOP_INNER_RIGHT_ANCHOR)).toBe(TOP_RIGHT);
    expect(getTransformOrigin(BELOW_LEFT_ANCHOR)).toBe(TOP_RIGHT);
    expect(getTransformOrigin(TOP_LEFT_ANCHOR)).toBe(TOP_RIGHT);
  });

  it('should position the "right center" and "inner-right center" anchors to the center left origin ("0 50%")', () => {
    expect(getTransformOrigin(CENTER_RIGHT_ANCHOR)).toBe(CENTER_LEFT);
    expect(getTransformOrigin(CENTER_INNER_LEFT_ANCHOR)).toBe(CENTER_LEFT);
  });

  it('should position the "center center" anchor to the absolute center origin ("50% 50%")', () => {
    expect(getTransformOrigin(CENTER_CENTER_ANCHOR)).toBe(CENTER_CENTER);
  });

  it('should position the "inner-right center" and "left center" anchors to the center right origin ("100% 50%")', () => {
    expect(getTransformOrigin(CENTER_INNER_RIGHT_ANCHOR)).toBe(CENTER_RIGHT);
    expect(getTransformOrigin(CENTER_LEFT_ANCHOR)).toBe(CENTER_RIGHT);
  });

  it('should position the "right above", "right bottom", "inner-left above", and "inner-left bottom" anchors to the bottom left origin ("0 100%")', () => {
    expect(getTransformOrigin(ABOVE_RIGHT_ANCHOR)).toBe(BOTTOM_LEFT);
    expect(getTransformOrigin(BOTTOM_RIGHT_ANCHOR)).toBe(BOTTOM_LEFT);
    expect(getTransformOrigin(ABOVE_INNER_LEFT_ANCHOR)).toBe(BOTTOM_LEFT);
    expect(getTransformOrigin(BOTTOM_INNER_LEFT_ANCHOR)).toBe(BOTTOM_LEFT);
  });

  it('should position the "center above" and "center bottom" anchors to the bottom center origin ("50% 100%")', () => {
    expect(getTransformOrigin(ABOVE_CENTER_ANCHOR)).toBe(BOTTOM_CENTER);
    expect(getTransformOrigin(BOTTOM_CENTER_ANCHOR)).toBe(BOTTOM_CENTER);
  });

  it('should position the "inner-right above", "inner-right bottom", "left above", and "left bottom" anchors to the bottom right origin ("100% 100%")', () => {
    expect(getTransformOrigin(ABOVE_INNER_RIGHT_ANCHOR)).toBe(BOTTOM_RIGHT);
    expect(getTransformOrigin(BOTTOM_INNER_RIGHT_ANCHOR)).toBe(BOTTOM_RIGHT);
    expect(getTransformOrigin(ABOVE_LEFT_ANCHOR)).toBe(BOTTOM_RIGHT);
    expect(getTransformOrigin(BOTTOM_LEFT_ANCHOR)).toBe(BOTTOM_RIGHT);
  });

  it("should default to 0 0 if an invalid anchor is provided", () => {
    // @ts-expect-error
    expect(getTransformOrigin({ x: "invalid", y: "invalid" })).toBe("0 0");
  });
});

describe("isWithinViewport", () => {
  it("should return true if both the fixedElement and fixedToElement are visible within the viewport", () => {
    expect(window.innerHeight).toBe(768);
    expect(window.innerWidth).toBe(1024);
    const rect: DOMRect = {
      top: 0,
      left: 0,
      bottom: 24,
      right: 48,
      height: 24,
      width: 48,
      x: 0,
      y: 0,
      toJSON() {},
    };
    const rectOutAbove: DOMRect = {
      ...rect,
      top: -40,
      bottom: -16,
      y: -40,
    };
    const rectOutBelow: DOMRect = {
      ...rect,
      top: 1025,
      bottom: 1049,
      y: 1025,
    };
    const rectOutRight: DOMRect = {
      ...rect,
      left: 1025,
      right: 1049,
      x: 1025,
    };
    const rectOutLeft: DOMRect = {
      ...rect,
      left: -50,
      right: -2,
      x: -50,
    };

    const fixedElement = document.createElement("div");
    const fixedToElement = document.createElement("div");
    const fixedElementRect = jest
      .spyOn(fixedElement, "getBoundingClientRect")
      .mockReturnValue(rect);
    const fixedToElementRect = jest
      .spyOn(fixedToElement, "getBoundingClientRect")
      .mockReturnValue(rect);

    expect(isWithinViewport({ fixedElement, fixedToElement })).toBe(true);

    // still visible since the fixedToElement is in the viewport
    fixedElementRect.mockReturnValueOnce(rectOutAbove);
    expect(isWithinViewport({ fixedElement, fixedToElement })).toBe(true);

    fixedElementRect.mockReturnValueOnce(rectOutAbove);
    fixedToElementRect.mockReturnValueOnce(rectOutAbove);
    expect(isWithinViewport({ fixedElement, fixedToElement })).toBe(false);

    fixedToElementRect.mockReturnValueOnce(rectOutBelow);
    expect(isWithinViewport({ fixedElement, fixedToElement })).toBe(true);

    fixedElementRect.mockReturnValueOnce(rectOutBelow);
    fixedToElementRect.mockReturnValueOnce(rectOutBelow);
    expect(isWithinViewport({ fixedElement, fixedToElement })).toBe(false);

    fixedToElementRect.mockReturnValueOnce(rectOutLeft);
    expect(isWithinViewport({ fixedElement, fixedToElement })).toBe(true);

    fixedElementRect.mockReturnValueOnce(rectOutLeft);
    fixedToElementRect.mockReturnValueOnce(rectOutLeft);
    expect(isWithinViewport({ fixedElement, fixedToElement })).toBe(false);

    fixedElementRect.mockReturnValueOnce(rectOutRight);
    expect(isWithinViewport({ fixedElement, fixedToElement })).toBe(true);

    fixedElementRect.mockReturnValueOnce(rectOutRight);
    fixedToElementRect.mockReturnValueOnce(rectOutRight);
    expect(isWithinViewport({ fixedElement, fixedToElement })).toBe(false);
  });
});
