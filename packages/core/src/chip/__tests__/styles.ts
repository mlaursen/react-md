import { describe, expect, it } from "vitest";

import { chip, chipContent } from "../styles.js";

describe("chip", () => {
  it("should be callable without any arguments", () => {
    expect(chip()).toMatchSnapshot();
  });
});

describe("chipContent", () => {
  it("should be callable without any arguments", () => {
    expect(chipContent()).toMatchSnapshot();
  });
});
