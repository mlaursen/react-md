import { describe, expect, it } from "@jest/globals";
import { tableRow } from "../tableRowStyles.js";

describe("tableRow", () => {
  it("should be callable without any arguments", () => {
    expect(tableRow()).toMatchSnapshot();
  });
});
