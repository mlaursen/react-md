import { describe, expect, it } from "@jest/globals";
import { button } from "../buttonStyles.js";

describe("button", () => {
  it("should be callable without any arguments", () => {
    expect(button()).toMatchSnapshot();
  });
});
