import { getInstance } from "../getInstance";

const element1 = document.createElement("button");
const element2 = document.createElement("div");
element2.setAttribute("role", "button");
element2.setAttribute("tabindex", "0");

describe("getInstance", () => {
  describe("null or Element", () => {
    it("should work with nulls", () => {
      expect(getInstance(null)).toBe(null);
    });

    it("should work with an element", () => {
      expect(getInstance(element1)).toBe(element1);
      expect(getInstance(element2)).toBe(element2);
    });
  });

  describe("MutableRefObject", () => {
    it("should work as a mutable ref object with null or an element", () => {
      const ref1 = { current: null };
      const ref2 = { current: element1 };
      const ref3 = { current: element2 };

      expect(getInstance(ref1)).toBe(null);
      expect(getInstance(ref2)).toBe(element1);
      expect(getInstance(ref3)).toBe(element2);
    });
  });
});
