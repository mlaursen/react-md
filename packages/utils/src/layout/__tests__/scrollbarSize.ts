import { reset, scrollbarSize } from "../scrollbarSize";

beforeEach(reset);

describe("scrollbarSize", () => {
  it("should calculate the scrollbar width by comparing the two divs' offsetWidths with cache", () => {
    const outerDiv = document.createElement("div");
    Object.defineProperty(outerDiv, "offsetWidth", {
      value: 100,
      writable: true,
    });
    Object.defineProperty(outerDiv, "offsetHeight", {
      value: 150,
      writable: true,
    });

    const innerDiv = document.createElement("div");
    Object.defineProperty(innerDiv, "offsetWidth", {
      value: 80,
      writable: true,
    });
    Object.defineProperty(innerDiv, "offsetHeight", {
      value: 100,
      writable: true,
    });

    let called = 0;
    const createElement = jest.spyOn(document, "createElement");
    createElement.mockImplementation(() => {
      const div = called % 2 === 0 ? outerDiv : innerDiv;
      called += 1;
      return div;
    });

    expect(scrollbarSize()).toBe(20);
    expect(scrollbarSize("width", false)).toBe(20);
    expect(scrollbarSize("width", true)).toBe(20);

    expect(scrollbarSize("height")).toBe(50);
    expect(scrollbarSize("height", false)).toBe(50);
    expect(scrollbarSize("height", true)).toBe(50);

    Object.defineProperty(outerDiv, "offsetWidth", {
      value: 100,
      writable: true,
    });
    Object.defineProperty(outerDiv, "offsetHeight", {
      value: 150,
      writable: true,
    });
    Object.defineProperty(innerDiv, "offsetWidth", {
      value: 90,
      writable: true,
    });
    Object.defineProperty(innerDiv, "offsetHeight", {
      value: 110,
      writable: true,
    });

    expect(scrollbarSize()).toBe(20);
    expect(scrollbarSize("width", false)).toBe(20);
    expect(scrollbarSize("width", true)).toBe(10);

    expect(scrollbarSize("height")).toBe(50);
    expect(scrollbarSize("height", false)).toBe(50);
    expect(scrollbarSize("height", true)).toBe(40);
    createElement.mockRestore();
  });

  it("should calculate the scrollbar width by creating two divs and attaching then removing from the body", () => {
    const outerDiv = document.createElement("div");
    const innerDiv = document.createElement("div");
    const createElement = jest.spyOn(document, "createElement");
    const bodyAppendChild = jest.spyOn(document.body, "appendChild");
    const bodyRemoveChild = jest.spyOn(document.body, "removeChild");

    createElement
      .mockImplementationOnce(() => outerDiv)
      .mockImplementationOnce(() => innerDiv);

    // jsdom doesn't initialize offsetWidths by default
    expect(outerDiv.offsetWidth).toBe(0);
    expect(innerDiv.offsetWidth).toBe(0);
    expect(scrollbarSize()).toBe(0);
    expect(outerDiv.style.visibility).toBe("hidden");
    expect(outerDiv.style.overflow).toBe("scroll");

    expect(outerDiv.firstChild).toBe(innerDiv);
    expect(bodyAppendChild).toBeCalledWith(outerDiv);
    expect(bodyRemoveChild).toBeCalledWith(outerDiv);
    createElement.mockRestore();
  });
});
