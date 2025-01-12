import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import lodash from "lodash";
import { render } from "test-utils";

import {
  DEFAULT_DARK_THEME,
  DEFAULT_LIGHT_THEME,
  ThemeProvider,
  useTheme,
  type ConfigurableThemeColors,
} from "../ThemeProvider.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("ThemeProvider", () => {
  it("should throw an error if the useTheme hook is called without initializing the ThemeProvider", () => {
    function Test(): null {
      useTheme();
      return null;
    }

    const error = jest.spyOn(console, "error");
    // hide React uncaught error message
    error.mockImplementation(() => {});

    expect(() => render(<Test />)).toThrow(
      "The `ThemeProvider` has not been initialized."
    );
  });

  it("should attempt to derive the theme from the documentElement if the theme prop is not provided", () => {
    const defaultComputedStyle = window.getComputedStyle(
      document.documentElement
    );
    const getComputedStyle = jest
      .spyOn(window, "getComputedStyle")
      .mockReturnValue({
        ...defaultComputedStyle,
        getPropertyValue(property) {
          const name = lodash.camelCase(
            property.replace("--rmd-", "")
          ) as "backgroundColor";
          return DEFAULT_LIGHT_THEME[name] ?? "";
        },
      });

    let theme: ConfigurableThemeColors | undefined;
    function Test(): null {
      theme = useTheme();
      return null;
    }

    render(
      <ThemeProvider>
        <Test />
      </ThemeProvider>
    );

    expect(getComputedStyle).toHaveBeenCalledTimes(1);
    expect(theme).toEqual({
      ...DEFAULT_LIGHT_THEME,
      derived: true,
      setDerivedTheme: expect.any(Function),
    });
  });

  it("should use the provided theme if it was provided", () => {
    const getComputedStyle = jest.spyOn(window, "getComputedStyle");
    let theme: ConfigurableThemeColors | undefined;
    function Test(): null {
      theme = useTheme();
      return null;
    }

    render(
      <ThemeProvider theme={DEFAULT_DARK_THEME}>
        <Test />
      </ThemeProvider>
    );

    expect(getComputedStyle).not.toHaveBeenCalled();
    expect(theme).toEqual({
      ...DEFAULT_DARK_THEME,
      derived: false,
      setDerivedTheme: expect.any(Function),
    });
  });
});
