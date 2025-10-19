import { describe, expect, it } from "vitest";

import { type IconTheme, icon } from "../styles.js";

describe("icon styles", () => {
  it("should support rendering as all the theme colors", () => {
    const themes: IconTheme[] = [
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
      "currentcolor",
    ];

    themes.forEach((theme) => {
      expect(icon({ type: "svg", theme })).toMatchSnapshot();
    });
  });
});
