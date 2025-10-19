import { describe, expect, it } from "vitest";

import { tableRow } from "../tableRowStyles.js";

describe("tableRow", () => {
  it("should be callable without any arguments", () => {
    expect(tableRow()).toMatchSnapshot();
  });
});
