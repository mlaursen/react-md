import { getProgressA11y } from "../getProgressA11y";

describe("getProgressA11y", () => {
  it("should return undefined if the progressing arg is false", () => {
    expect(getProgressA11y("", false)).toBeUndefined();
    expect(getProgressA11y("something-else", false)).toBeUndefined();
  });

  it("should return the correct a11y props when progressing", () => {
    expect(getProgressA11y("some-id", true)).toEqual({
      "aria-busy": true,
      "aria-describedby": "some-id",
    });
  });
});
