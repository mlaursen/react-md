import { describe, expect, it } from "@jest/globals";

import { appBar } from "../styles.js";

describe("styling utils", () => {
  it("should be callback without any arguments", () => {
    expect(appBar()).toMatchSnapshot();
  });
});
