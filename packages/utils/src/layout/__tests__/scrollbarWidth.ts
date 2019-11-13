import scrollbarWidth, { reset } from "../scrollbarWidth";

beforeEach(reset);

describe("scrollbarWidth", () => {
  it("should calculate the scrollbar width by comparing the two divs' offsetWidths with cache", () => {
    const outerDiv = document.createElement("div");
    Object.defineProperty(outerDiv, "offsetWidth", {
      value: 100,
      writable: true,
    });

    const innerDiv = document.createElement("div");
    Object.defineProperty(innerDiv, "offsetWidth", {
      value: 80,
      writable: true,
    });

    let called = 0;
    const createElement = jest.spyOn(document, "createElement");
    createElement.mockImplementation(() => {
      const div = called % 2 === 0 ? outerDiv : innerDiv;
      called += 1;
      return div;
    });

    expect(scrollbarWidth()).toBe(20);
    expect(scrollbarWidth(false)).toBe(20);
    expect(scrollbarWidth(true)).toBe(20);

    Object.defineProperty(outerDiv, "offsetWidth", {
      value: 100,
      writable: true,
    });
    Object.defineProperty(innerDiv, "offsetWidth", {
      value: 90,
      writable: true,
    });

    expect(scrollbarWidth()).toBe(20);
    expect(scrollbarWidth(false)).toBe(20);
    expect(scrollbarWidth(true)).toBe(10);
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
    expect(scrollbarWidth()).toBe(0);
    expect(outerDiv.style.visibility).toBe("hidden");
    expect(outerDiv.style.overflow).toBe("scroll");
    expect(outerDiv.style.msOverflowStyle).toBe("scrollbar");

    expect(outerDiv.firstChild).toBe(innerDiv);
    expect(bodyAppendChild).toBeCalledWith(outerDiv);
    expect(bodyRemoveChild).toBeCalledWith(outerDiv);
    createElement.mockRestore();
  });
});
