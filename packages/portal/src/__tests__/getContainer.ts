import getContainer from "../getContainer";

describe("getContainer", () => {
  it("should default to the document.body if the into and intoId props are not provided", () => {
    expect(getContainer()).toBe(document.body);
    expect(getContainer(undefined)).toBe(document.body);
    expect(getContainer(undefined, undefined)).toBe(document.body);
  });

  it("should apply the intoId to document.getElementById if it is a string", () => {
    const element = document.createElement("div");
    const getElementById = jest.spyOn(document, "getElementById");
    getElementById.mockImplementation(() => element);

    expect(getContainer(undefined, "some-id")).toBe(element);
    expect(getElementById).toBeCalledWith("some-id");
    getElementById.mockRestore();
  });

  it("should throw an error if there is no element in the dom with the provided id", () => {
    expect(() => getContainer(undefined, "some-id")).toThrowError(
      "Unable to find a valid HTMLElement to render a portal into with the provided id: " +
        `\`some-id\`. Please provide an id of an element that exists on the page ` +
        "at the time of the portal rendering, provide a valid `into` prop, or leave both " +
        "the `intoId` and `into` props `undefined` to render in the `document.body`."
    );
  });

  it("should use the into param as a query selector if it is a string", () => {
    const element = document.createElement("div");
    const querySelector = jest.spyOn(document, "querySelector");
    querySelector.mockImplementation(() => element);

    expect(getContainer(".query-1")).toBe(element);
    expect(getContainer(".query-1", undefined)).toBe(element);
    expect(querySelector).toBeCalledWith(".query-1");
    querySelector.mockRestore();
  });

  it("should throw an error if the query selector string does not return an element", () => {
    expect(() => getContainer(".query-string")).toThrowError(
      "Unable to find a valid HTMLElement to render a portal into with the provided " +
        `querySelector: \`.query-string\`. Please provide a querySelector that will return ` +
        "a valid HTMLElement on the page at the time of the portal rendering, an " +
        "HTMLElement, an id for an element on the page with `intoId`, or leave both the " +
        "`intoId` and `into` props `undefined` to render in the `document.body`."
    );
  });

  it("should use an into function to get an element", () => {
    const element = document.createElement("div");
    const into = jest.fn(() => element);

    expect(getContainer(into)).toBe(element);
    expect(into).toBeCalledTimes(1);
  });

  it("should use the into value if it is null or an HTMLElement", () => {
    expect(getContainer(null)).toBe(null);

    const element = document.createElement("div");
    expect(getContainer(element)).toBe(element);
  });
});
