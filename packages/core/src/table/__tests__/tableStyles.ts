import { describe, expect, it } from "@jest/globals";
import { table } from "../tableStyles.js";

describe("table", () => {
  it("should be callable without any arguments", () => {
    expect(table()).toMatchSnapshot();
  });
});
