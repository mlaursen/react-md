import React from "react";

import { isEmpty } from "../isEmpty";

describe("isEmpty", () => {
  it('should return true whent he disableNullOnZero is false and the children is 0, "0", or null', () => {
    expect(isEmpty(0, false)).toBe(true);
    expect(isEmpty("0", false)).toBe(true);
    expect(isEmpty(null, false)).toBe(true);
    expect(isEmpty("hello", false)).toBe(false);
    expect(isEmpty(false, false)).toBe(false);
    expect(isEmpty(true, false)).toBe(false);
    expect(isEmpty(<span />, false)).toBe(false);
  });

  it("should return false if the disableNullOnZero is true", () => {
    expect(isEmpty(0, true)).toBe(false);
    expect(isEmpty("0", true)).toBe(false);
    expect(isEmpty(null, true)).toBe(false);
  });
});
