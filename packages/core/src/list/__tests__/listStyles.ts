import { describe, it, expect } from "@jest/globals";
import { list } from "../listStyles.js";

describe("styling utility class", () => {
  it("should be callable without any arguments", () => {
    expect(list()).toMatchSnapshot();
  });
});
