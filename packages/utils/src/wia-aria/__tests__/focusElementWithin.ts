import { mocked } from "ts-jest/utils";

import { scrollIntoView as scrollIntoView_ } from "../../scrollIntoView";
import { focusElementWithin } from "../focusElementWithin";
import { getFocusableElements as getFocusableElements_ } from "../getFocusableElements";

jest.mock("../getFocusableElements");
jest.mock("../../scrollIntoView");

const getFocusableElements = mocked(getFocusableElements_);
const scrollIntoView = mocked(scrollIntoView_);
const ELEMENT = document.createElement("div");
const element1 = document.createElement("button");
element1.className = "element element--1";
const focus1 = jest.spyOn(element1, "focus");

const element2 = document.createElement("button");
element2.className = "element element--2";
const focus2 = jest.spyOn(element2, "focus");

const element3 = document.createElement("button");
element3.className = "element element--3";
const focus3 = jest.spyOn(element3, "focus");

const elements = [element1, element2, element3];

describe("focusElementWithin", () => {
  afterEach(() => {
    focus1.mockClear();
    focus2.mockClear();
    focus3.mockClear();
    getFocusableElements.mockClear();
    scrollIntoView.mockClear();
  });

  it("should throw an error if it can not find a focusable element", () => {
    getFocusableElements.mockImplementationOnce(() => []);
    expect(() => focusElementWithin(ELEMENT, "first")).toThrowError(
      "Unable to find a focusable element"
    );
  });

  it("should get all the focusable elements in the container if the elements list is empty or nor provided", () => {
    const element1 = document.createElement("button");
    element1.className = "element";
    getFocusableElements.mockImplementation(() => [element1]);
    const querySelector = jest.spyOn(ELEMENT, "querySelector");
    querySelector.mockImplementation(() => element1);

    focusElementWithin(ELEMENT, "first");
    focusElementWithin(ELEMENT, "last");
    focusElementWithin(ELEMENT, ".element");
    expect(getFocusableElements).toBeCalledWith(ELEMENT, false);
    expect(getFocusableElements).toBeCalledTimes(3);

    getFocusableElements.mockClear();
    focusElementWithin(ELEMENT, "first", false, false, [element1]);
    focusElementWithin(ELEMENT, "last", false, false, [element1]);
    focusElementWithin(ELEMENT, ".element", false, false, [element1]);
    expect(getFocusableElements).not.toBeCalled();

    querySelector.mockRestore();
  });

  it('should focus the first element in the list if the focus is "first"', () => {
    getFocusableElements.mockImplementationOnce(() => elements);
    focusElementWithin(ELEMENT, "first");
    expect(focus1).toBeCalled();
    expect(focus2).not.toBeCalled();
    expect(focus3).not.toBeCalled();

    focus1.mockClear();
    focusElementWithin(ELEMENT, "first", false, false, elements);
    expect(focus1).toBeCalled();
    expect(focus2).not.toBeCalled();
    expect(focus3).not.toBeCalled();
  });

  it('should focus the last element in the list if the focus is "last"', () => {
    getFocusableElements.mockImplementationOnce(() => elements);
    focusElementWithin(ELEMENT, "last");
    expect(focus1).not.toBeCalled();
    expect(focus2).not.toBeCalled();
    expect(focus3).toBeCalled();

    focus3.mockClear();
    focusElementWithin(ELEMENT, "last", false, false, elements);
    expect(focus1).not.toBeCalled();
    expect(focus2).not.toBeCalled();
    expect(focus3).toBeCalled();
  });

  it('should focus the result of the query selector string if it is not "first" or "last"', () => {
    const querySelector = jest.spyOn(ELEMENT, "querySelector");
    querySelector
      .mockImplementationOnce(() => element1)
      .mockImplementationOnce(() => element1)
      .mockImplementationOnce(() => element2)
      .mockImplementationOnce(() => element2)
      .mockImplementationOnce(() => element3)
      .mockImplementationOnce(() => element3);

    getFocusableElements.mockImplementation(() => elements);

    focusElementWithin(ELEMENT, ".query");
    expect(focus1).toBeCalled();
    expect(focus2).not.toBeCalled();
    expect(focus3).not.toBeCalled();

    focus1.mockClear();
    focusElementWithin(ELEMENT, ".query", false, false, elements);
    expect(focus1).toBeCalled();
    expect(focus2).not.toBeCalled();
    expect(focus3).not.toBeCalled();

    focus1.mockClear();
    focusElementWithin(ELEMENT, ".query");
    expect(focus1).not.toBeCalled();
    expect(focus2).toBeCalled();
    expect(focus3).not.toBeCalled();

    focus2.mockClear();
    focusElementWithin(ELEMENT, ".query", false, false, elements);
    expect(focus1).not.toBeCalled();
    expect(focus2).toBeCalled();
    expect(focus3).not.toBeCalled();

    focus2.mockClear();
    focusElementWithin(ELEMENT, ".query");
    expect(focus1).not.toBeCalled();
    expect(focus2).not.toBeCalled();
    expect(focus3).toBeCalled();

    focus3.mockClear();
    focusElementWithin(ELEMENT, ".query", false, false, elements);
    expect(focus1).not.toBeCalled();
    expect(focus2).not.toBeCalled();
    expect(focus3).toBeCalled();
  });

  it("should call scrollIntoView if preventScroll is false and the container element is not the document", () => {
    elements.forEach((element) => {
      document.body.appendChild(element);
    });
    focusElementWithin(document, "first", false, false, elements);
    focusElementWithin(document, "last", false, false, elements);
    focusElementWithin(document, ".element", false, false, elements);
    focusElementWithin(document, "first", true, false, elements);
    focusElementWithin(document, "last", true, false, elements);
    focusElementWithin(document, ".element", true, false, elements);
    focusElementWithin(document, "first", false, true, elements);
    focusElementWithin(document, "last", false, true, elements);
    focusElementWithin(document, ".element", false, true, elements);
    focusElementWithin(document, "first", true, true, elements);
    focusElementWithin(document, "last", true, true, elements);
    focusElementWithin(document, ".element", true, true, elements);
    elements.forEach((element) => {
      document.body.removeChild(element);
    });

    expect(scrollIntoView).not.toBeCalled();

    const container = document.createElement("div");
    elements.forEach((element) => {
      container.appendChild(element);
    });

    focusElementWithin(container, "first", false, false, elements);
    expect(scrollIntoView).toBeCalledWith(container, elements[0]);

    focusElementWithin(container, "last", false, false, elements);
    expect(scrollIntoView).toBeCalledWith(container, elements[2]);

    focusElementWithin(
      container,
      ".element:nth-child(2)",
      false,
      false,
      elements
    );
    expect(scrollIntoView).toBeCalledWith(container, elements[1]);

    scrollIntoView.mockClear();
    focusElementWithin(container, "first", false, true, elements);
    focusElementWithin(container, "last", false, true, elements);
    focusElementWithin(
      container,
      ".element:nth-child(2)",
      false,
      true,
      elements
    );
    expect(scrollIntoView).not.toBeCalled();
  });

  it("should fallback to focusing the container element if it is focusable", () => {
    const div = document.createElement("div");
    div.tabIndex = -1;

    expect(() => focusElementWithin(div, "first", true)).not.toThrow();
  });
});
