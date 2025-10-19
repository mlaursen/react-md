import { describe, expect, it } from "vitest";

import { button } from "../styles.js";

describe("button", () => {
  it("should be callable without any arguments", () => {
    expect(button()).toMatchSnapshot();
  });

  it("should force the buttonType to icon if the iconSize option exists", () => {
    expect(button({ iconSize: "small" })).toMatchSnapshot();
    expect(button({ iconSize: "normal" })).toMatchSnapshot();
    expect(button({ iconSize: "large" })).toMatchSnapshot();
    expect(button({ iconSize: "large", buttonType: "text" })).toMatchSnapshot();
  });
});
