import { describe, expect, it } from "@jest/globals";
import { type TextColor, type ThemeColor } from "../../cssUtils.js";
import { icon } from "../styles.js";

describe("icon styles", () => {
  it("should support rendering as all the theme colors", () => {
    const themes: (ThemeColor | TextColor)[] = [
      "primary",
      "secondary",
      "warning",
      "success",
      "error",
      "on-primary",
      "on-secondary",
      "on-warning",
      "on-success",
      "on-error",
      "text-primary",
      "text-secondary",
      "text-hint",
      "text-disabled",
    ];

    themes.forEach((theme) => {
      expect(icon({ type: "svg", theme })).toMatchSnapshot();
    });
  });
});
