import { bem } from "../bem";

describe("bem", () => {
  const block1 = bem("base");
  const block2 = bem("button");
  const block3 = bem("container");

  it("should throw an error if the user provides an empty string", () => {
    expect(() => bem("")).toThrowError(
      "bem requires a base block class but none were provided."
    );
  });

  describe("block", () => {
    it("should return the base class unmodified if called with no arguments", () => {
      expect(block1()).toBe("base");
      expect(block2()).toBe("button");
      expect(block3()).toBe("container");
    });

    it("should style the first argument as a element if it is a string", () => {
      expect(block1("thing")).toBe("base__thing");
      expect(block2("thing")).toBe("button__thing");
      expect(block3("thing")).toBe("container__thing");
    });

    it("should style the first argument as a modifier if it is an object", () => {
      expect(block2({})).toBe("button");
      expect(block2({ primary: false })).toBe("button");
      expect(block2({ primary: true })).toBe("button button--primary");
      expect(block2({ primary: true, secondary: null })).toBe(
        "button button--primary"
      );
      expect(block2({ primary: true, secondary: 1 })).toBe(
        "button button--primary button--secondary"
      );
    });

    it("should join the element and modifiers together", () => {
      expect(block2("content", {})).toBe("button__content");
      expect(block2("content", { primary: false })).toBe("button__content");
      expect(block2("content", { primary: true })).toBe(
        "button__content button__content--primary"
      );
    });

    it("should throw an error if both arguments are considered a modifier", () => {
      expect(() => block1({}, {})).toThrowError(
        "bem does not support having two modifier arguments."
      );
    });
  });
});
