import { describe, expect, it } from "@jest/globals";
import { tableContainer } from "../tableContainerStyles.js";

describe("tableContainer", () => {
  it("should be callable without any arguments", () => {
    expect(tableContainer()).toMatchSnapshot();
  });
});
