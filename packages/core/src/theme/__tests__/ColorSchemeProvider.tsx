import type { ChangeEvent, ReactElement } from "react";
import { render } from "../../test-utils";

import type { ColorScheme, SetColorSchemeMode } from "../ColorSchemeProvider";
import { ColorSchemeProvider, useColorScheme } from "../ColorSchemeProvider";
import { backgroundColorVar } from "../cssVars";

describe("ColorSchemeProvider", () => {
  it("should default to the light color scheme and allow the useColorScheme hook to change the values", () => {
    function Test(): ReactElement {
      const { colorScheme, colorSchemeMode, setColorSchemeMode } =
        useColorScheme();

      const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.currentTarget;
        if (value === "light" || value === "dark" || value === "system") {
          setColorSchemeMode(value);
        }
      };

      return (
        <>
          <span data-testid="color-scheme">{colorScheme}</span>
          <label>
            Light
            <input
              type="checkbox"
              value="light"
              checked={colorSchemeMode === "light"}
              onChange={onChange}
            />
          </label>
          <label>
            Dark
            <input
              type="checkbox"
              value="dark"
              checked={colorSchemeMode === "dark"}
              onChange={onChange}
            />
          </label>
          <label>
            System
            <input
              type="checkbox"
              value="system"
              checked={colorSchemeMode === "system"}
              onChange={onChange}
            />
          </label>
        </>
      );
    }
    const { getByRole } = render(
      <ColorSchemeProvider>
        <Test />
      </ColorSchemeProvider>
    );

    const lightTheme = getByRole("checkbox", { name: "Light" });
    const darkTheme = getByRole("checkbox", { name: "Dark" });
    const systemTheme = getByRole("checkbox", { name: "System" });
    expect(lightTheme).toBeChecked();
    expect(darkTheme).not.toBeChecked();
    expect(systemTheme).not.toBeChecked();
  });

  it("should throw an error if the setColorSchemeMode from the useColorScheme hook is used without a ColorSchemeProvider", () => {
    let setColorSchemeMode: SetColorSchemeMode | undefined;
    function Test(): null {
      ({ setColorSchemeMode } = useColorScheme());
      return null;
    }

    jest.spyOn(console, "error").mockImplementation(() => {});
    render(<Test />);

    expect(() => setColorSchemeMode?.("dark")).toThrow(
      "The `ColorSchemeProvider` has not been initialized."
    );
  });

  it("should warn the user in development if the provided mode does not match the background color", () => {
    // this is caused by next defining process.env.NODE_ENV as readonly 'development' | 'production' | 'test'
    // @ts-ignore
    process.env.NODE_ENV = "development";
    const warn = jest.spyOn(console, "warn").mockImplementation(() => {});

    const { rerender } = render(
      <ColorSchemeProvider key="system" mode="system">
        Child
      </ColorSchemeProvider>
    );
    expect(warn).not.toHaveBeenCalled();

    rerender(
      <ColorSchemeProvider key="light" mode="light">
        Child
      </ColorSchemeProvider>
    );
    expect(warn).toHaveBeenCalledWith(
      `The \`${backgroundColorVar}\` does not exist on the root element. ` +
        "This should only happen in tests or the `react-md` styles have not been loaded."
    );
    expect(warn).toHaveBeenCalledTimes(1);

    warn.mockClear();

    const defaultComputedStyle = window.getComputedStyle(
      document.documentElement
    );
    const getComputedStyle = jest.spyOn(window, "getComputedStyle");
    getComputedStyle.mockReturnValue({
      ...defaultComputedStyle,
      getPropertyValue() {
        return "#fff";
      },
    });
    rerender(
      <ColorSchemeProvider key="light" mode="light">
        Child
      </ColorSchemeProvider>
    );
    expect(warn).not.toHaveBeenCalled();

    rerender(
      <ColorSchemeProvider key="dark" mode="dark">
        Child
      </ColorSchemeProvider>
    );
    expect(warn).toHaveBeenCalledWith(
      `The \`mode\` for the \`ColorSchemeProvider\` has been set to "dark" but ` +
        `the root background color is "light". ` +
        `This prop might need to be changed to "light" or "system".`
    );

    getComputedStyle.mockReturnValue({
      ...defaultComputedStyle,
      getPropertyValue() {
        return "#000";
      },
    });
    rerender(<ColorSchemeProvider mode="light">Child</ColorSchemeProvider>);
    expect(warn).toHaveBeenCalledWith(
      `The \`mode\` for the \`ColorSchemeProvider\` has been set to "light" but ` +
        `the root background color is "dark". ` +
        `This prop might need to be changed to "dark" or "system".`
    );
  });

  it("should return dark when the mode is system and the prefers-color-scheme media query matches dark", () => {
    const onchange = jest.fn();
    const addListener = jest.fn();
    const addEventListener = jest.fn();
    const removeListener = jest.fn();
    const removeEventListener = jest.fn();
    const dispatchEvent = jest.fn();

    const baseQueryList: Omit<MediaQueryList, "matches"> = {
      media: "",
      onchange,
      addListener,
      addEventListener,
      removeEventListener,
      removeListener,
      dispatchEvent,
    };

    const matchMedia = jest
      .spyOn(window, "matchMedia")
      .mockImplementation((query) => ({
        matches: query.includes("dark"),
        ...baseQueryList,
      }));

    let colorScheme: ColorScheme | undefined;
    function Test(): null {
      ({ colorScheme } = useColorScheme());

      return null;
    }

    render(
      <ColorSchemeProvider mode="system">
        <Test />
      </ColorSchemeProvider>
    );

    expect(colorScheme).toBe("dark");
    expect(matchMedia).toHaveBeenCalledWith("(prefers-color-scheme: dark)");
    expect(matchMedia).toHaveBeenCalledTimes(2);
  });
});
