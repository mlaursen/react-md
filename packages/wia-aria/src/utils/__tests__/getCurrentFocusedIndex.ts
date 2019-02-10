import getCurrentFocusedIndex from "../getCurrentFocusedIndex";
import { ACTIVE_DESCENDANT } from "../../constants";

const create = (id: string, type: string = "button") => {
  const e = document.createElement(type);
  e.id = id;
  if (type !== "button") {
    e.tabIndex = -1;
    e.setAttribute("role", "button");
  }
  return e;
};

const FOCUSABLES = [
  create("element-1"),
  create("element-2", "div"),
  create("element-3", "div"),
  create("element-4"),
];
describe("getCurrentFocusedIndex", () => {
  it("should return -1 if there are no focusable elements", () => {
    const div = document.createElement("div");
    expect(getCurrentFocusedIndex(div, [], div)).toBe(-1);
  });

  it("should return the correct index wen the container does not have the aria-activedescendant attribute", () => {
    const div = document.createElement("div");
    expect(getCurrentFocusedIndex(div, FOCUSABLES, FOCUSABLES[1])).toBe(1);
    expect(getCurrentFocusedIndex(div, FOCUSABLES, FOCUSABLES[3])).toBe(3);
  });

  it("should return the correct index when the container has the aria-activedescendant attribute", () => {
    const div = document.createElement("div");
    div.setAttribute(ACTIVE_DESCENDANT, "element-1");
    expect(getCurrentFocusedIndex(div, FOCUSABLES, FOCUSABLES[1])).toBe(0);
    expect(getCurrentFocusedIndex(div, FOCUSABLES, FOCUSABLES[3])).toBe(0);

    div.setAttribute(ACTIVE_DESCENDANT, "element-3");
    expect(getCurrentFocusedIndex(div, FOCUSABLES, FOCUSABLES[1])).toBe(2);
    expect(getCurrentFocusedIndex(div, FOCUSABLES, FOCUSABLES[3])).toBe(2);
  });

  it("should return -1 if there the target is not one of the focusable elements", () => {
    const div = document.createElement("div");
    expect(getCurrentFocusedIndex(div, FOCUSABLES, div)).toBe(-1);
  });

  it("should return -1 if there the target is not one of the focusable elements", () => {
    const div = document.createElement("div");
    div.setAttribute(ACTIVE_DESCENDANT, "fake-element");
    expect(getCurrentFocusedIndex(div, FOCUSABLES, FOCUSABLES[0])).toBe(-1);
  });
});
