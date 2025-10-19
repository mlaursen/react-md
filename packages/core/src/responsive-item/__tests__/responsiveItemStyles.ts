import { describe, expect, it } from "vitest";

import { responsiveItem } from "../responsiveItemStyles.js";

describe("responsiveItem", () => {
  it("should be callable without any arguments", () => {
    expect(responsiveItem()).toMatchSnapshot();
  });
});
