import { describe, expect, it } from "@jest/globals";

import { render } from "../test-utils/index.js";
import { useHtmlClassName } from "../useHtmlClassName.js";

describe("useHtmlClassName", () => {
  it("should apply and remove the class name to the html element", () => {
    function Test(): null {
      useHtmlClassName("custom-class-name");
      return null;
    }

    const html = document.querySelector("html");
    if (!html) {
      throw new Error("Unable to find html element");
    }
    expect(html.className).toBe("");

    const { unmount } = render(<Test />);
    expect(html.className).toBe("custom-class-name");

    unmount();
    expect(html.className).toBe("");
  });

  it("should merge with any existing class names", () => {
    function Test(): null {
      useHtmlClassName("custom-class-name");
      return null;
    }

    const html = document.querySelector("html");
    if (!html) {
      throw new Error("Unable to find html element");
    }
    expect(html.className).toBe("");
    html.className = "existing class names";
    expect(html).toHaveClass("existing");
    expect(html).toHaveClass("class");
    expect(html).toHaveClass("names");

    const { unmount } = render(<Test />);
    expect(html).toHaveClass("existing");
    expect(html).toHaveClass("class");
    expect(html).toHaveClass("names");
    expect(html).toHaveClass("custom-class-name");

    unmount();
    expect(html).toHaveClass("existing");
    expect(html).toHaveClass("class");
    expect(html).toHaveClass("names");
    expect(html).not.toHaveClass("custom-class-name");
  });
});
