import { describe, expect, it } from "vitest";

import { tableContainer } from "../tableContainerStyles.js";

describe("tableContainer", () => {
  it("should be callable without any arguments", () => {
    expect(tableContainer()).toMatchSnapshot();
  });
});
