import { ButtonTheme, buttonThemeClassNames } from "../buttonThemeClassNames";

describe("buttonThemeClassNames", () => {
  describe("defaults", () => {
    it("should default to applying the text button theme if the buttonType is omitted", () => {
      expect(buttonThemeClassNames({})).toContain("rmd-button--text");
    });

    it("should default to applying the flat button theme if the themeType is omitted", () => {
      const className = buttonThemeClassNames({});
      expect(className).not.toContain("rmd-button--contained");
      expect(className).not.toContain("rmd-button--outline");
    });
  });

  it("should apply the hoverable className when the disabled prop is not provided", () => {
    const emptyClassName = buttonThemeClassNames({});
    expect(emptyClassName).not.toContain("rmd-button--disabled");

    const enabledClassName = buttonThemeClassNames({ disabled: false });
    expect(enabledClassName).not.toContain("rmd-button--disabled");

    const disabledClassName = buttonThemeClassNames({ disabled: true });
    expect(disabledClassName).toContain("rmd-button--disabled");
  });

  it("should add the --contained suffix when the themeType is contained and the disabled prop is not true", () => {
    expect(buttonThemeClassNames({ themeType: "contained" })).toContain(
      "rmd-button--contained"
    );
    expect(
      buttonThemeClassNames({ themeType: "contained", disabled: true })
    ).not.toContain("rmd-button--contained");
  });

  describe("colors", () => {
    const themes: ButtonTheme[] = [
      "clear",
      "primary",
      "secondary",
      "warning",
      "error",
    ];

    const themesWithoutClear = themes.slice(1);

    it("should not apply any of the color class names when the disabled prop is enabled", () => {
      themes.forEach((themeColor) => {
        const flatClassName = buttonThemeClassNames({
          disabled: true,
          theme: themeColor,
          themeType: "flat",
        });
        const outlineClassName = buttonThemeClassNames({
          disabled: true,
          theme: themeColor,
          themeType: "outline",
        });
        const containedClassName = buttonThemeClassNames({
          disabled: true,
          theme: themeColor,
          themeType: "contained",
        });

        expect(flatClassName).not.toContain(themeColor);
        expect(outlineClassName).not.toContain(themeColor);
        expect(containedClassName).not.toContain(themeColor);
      });
    });

    it("should not apply any additional class theme suffixes when the theme prop is clear", () => {
      expect(buttonThemeClassNames({ theme: "clear" })).toBe(
        "rmd-button rmd-button--text"
      );
    });

    it("should apply the correct theme class names for flat buttons", () => {
      themesWithoutClear.forEach((themeColor) => {
        const className = buttonThemeClassNames({
          theme: themeColor,
          themeType: "flat",
        });
        expect(className).toContain(`rmd-button--text-${themeColor}`);
      });
    });

    it("should apply the correct theme class names for outline buttons", () => {
      themesWithoutClear.forEach((themeColor) => {
        const className = buttonThemeClassNames({
          theme: themeColor,
          themeType: "outline",
        });
        expect(className).toContain(`rmd-button--text-${themeColor}`);
        expect(className).toContain(`rmd-button--outline-${themeColor}`);
      });
    });

    it("should apply the correct theme class names for contained buttons", () => {
      themesWithoutClear.forEach((themeColor) => {
        const className = buttonThemeClassNames({
          theme: themeColor,
          themeType: "contained",
        });
        expect(className).toContain(`rmd-button--${themeColor}`);
      });
    });
  });
});
